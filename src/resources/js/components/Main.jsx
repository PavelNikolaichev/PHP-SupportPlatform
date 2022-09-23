import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Ticket} from "./Ticket";
import {AddTicket} from "./AddTicket";
import {Registration} from "./Registration";
import {Login} from "./Login";
import {Logout} from "./Logout";

class Main extends Component {
    constructor(props) {
        super(props);

        this.currentTicket = React.createRef();
        this.token = localStorage.getItem('accessToken');

        this.state = {
            error: null,
            isLoaded: false,
            tickets: []
        };
    }

    componentDidMount() {
        if (this.token !== null) {
            fetch('/api/tickets/', {
                    headers: {
                        'Authorization': 'Bearer ' + this.token
                    }
                }).then(
                response => response.json()
            ).then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        tickets: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );
        }
    }

    renderTickets(tickets)
    {
        return tickets.map(ticket => {
            return (
                <ul>
                    <button onClick={() => this.handleClick(ticket)}
                        className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none">
                        <div className="w-full pb-2">
                            <div className="flex justify-between">
                                <span className="block ml-2 font-semibold text-gray-600">{ticket.title}</span>
                                <span className="block ml-2 text-sm text-gray-600">{ticket.username}</span>
                            </div>
                            <span className="block ml-2 text-sm text-gray-600">{ticket.status}</span>
                        </div>
                    </button>
                </ul>
            // <tr key={ticket.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            //     <th scope="row">{ticket.id}</th>
            //     <th>{ticket.title}</th>
            //     <th>{ticket.status}</th>
            //     <th>{ticket.user_id}</th>
            //     <th>{new Date(ticket.created_at).toLocaleDateString("en-US", {
            //         year: 'numeric',
            //         month: 'numeric',
            //         day: 'numeric',
            //     })}</th>
            //     <th>{new Date(ticket.updated_at).toLocaleDateString("en-US", {
            //         year: 'numeric',
            //         month: 'numeric',
            //         day: 'numeric',
            //     })}</th>
            //     <th><button onClick={() => this.handleClick(ticket)}>View</button></th>
            // </tr>
            );
        });
    }

    handleClick(ticket)
    {
        this.currentTicket.current.setState({
            ticket: ticket,
            isLoaded: false
        });
    }

    addTicket(ticket)
    {
        if (ticket) {
            this.setState((prevState) => ({
                tickets: prevState.tickets.concat(ticket)
            }));
            this.handleClick(ticket);
        }
    }

    handleAddTicket(ticket) {
        fetch( 'api/tickets/', {
            method:'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.token
            },

            body: JSON.stringify(ticket)
        }).then(response => {
            return response.json();
        }).then(data => {
            if(!data['message'])
                this.addTicket(data);
        });
    }

    handleDelete() {
        const delProduct = this.currentTicket.current
        fetch( 'api/tickets/' + this.currentTicket.current.state.ticket.id,
            { method: 'delete' })
            .then(response => {
                const newItems = this.state.tickets.filter(function (item) {
                    return item !== delProduct
                });
                this.setState({tickets: newItems});
                this.handleClick(null);
            });
    }

    handleUpdate(ticket) {
        const updTicket = this.currentTicket.current;
        fetch( 'api/tickets/' + updTicket.state.ticket.id, {
            method:'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.token
            },
            body: JSON.stringify(ticket)
        })
            .then(response => {
                return response.json();
            })
            .then( data => {
                const newItems = this.state.tickets.filter(function(item) {
                    return item.id !== data.id
                });

                this.setState({tickets: newItems});

                this.addTicket(data);
            })
    }

    handleLogin(loginData)
    {
        fetch('api/user/login', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.token
            },
            body: JSON.stringify(loginData)
        }).then(res => {
            return res.json();
        })
            .then((result) => {
                if (result === "Invalid credentials") {
                    alert(result);
                }
                if (result['accessToken'] != null) {
                    localStorage.setItem('accessToken', result['plainTextToken']);
                    if (result['isAdmin'] === true) {
                        localStorage.setItem('admin', result['isAdmin']);
                    }
                    this.token = result['plainTextToken'];
                    this.componentDidMount();
                }
            });
    }

    handleRegister(registrationData)
    {
        fetch('api/user/register', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.token
            },
            body: JSON.stringify(registrationData)
        }).then(res => {
            return res.json();
        })
            .then((result) => {
                if (result['accessToken'] != null) {
                    localStorage.setItem('accessToken', result['plainTextToken']);
                    this.token = result['plainTextToken'];
                    this.componentDidMount();
                }
            });
    }

    handleLogout()
    {
        if (this.token != null) {
            localStorage.removeItem('accessToken');
            this.token = null;
            this.setState({
                isLoaded: false,
                tickets: [],
                currentTicket: null,
            });
            this.componentDidMount();
        }
    }

    render()
    {
        const { error, isLoaded, tickets } = this.state;

        if (this.token == null) {
            return(
                <div>
                    <Login onLogin={this.handleLogin.bind(this)}/>
                    <Registration onRegister={this.handleRegister.bind(this)}/>
                </div>
            )
        }

        if (error) {
            return <div>Error: {error.message}</div>;
        }
        if (!isLoaded) {
            return <div>Loading...</div>;
        }
        return (
            <div>
                <Logout onLogout={this.handleLogout.bind(this)}/>

                <h3>All Tickets</h3>
                <div className="min-w-full border rounded lg:grid lg:grid-cols-3">
                    <div className="border-r border-gray-300 lg:col-span-1">
                        {this.renderTickets(tickets)}
                    </div>

                    <Ticket ref={this.currentTicket} deleteCallback={(function (obj) {
                        return function (ticket) {
                            obj.handleDelete(ticket);
                        }
                    })(this)} updateCallback={(function (obj) {
                        return function (ticket) {
                            obj.handleUpdate(ticket);
                        }
                    })(this)}/>
                </div>
                {/*<table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">*/}
                {/*    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">*/}
                {/*    <tr>*/}
                {/*        <th scope="col">Id</th>*/}
                {/*        <th scope="col">Title</th>*/}
                {/*        <th scope="col">Status</th>*/}
                {/*        <th scope="col">Username</th>*/}
                {/*        <th scope="col">Creation Date</th>*/}
                {/*        <th scope="col">Modification Date</th>*/}
                {/*        <th scope="col">Actions</th>*/}
                {/*    </tr>*/}
                {/*    </thead>*/}
                {/*    <tbody>*/}
                {/*    <ul className="overflow-auto h-[32rem]">*/}
                {/*        {this.renderTickets(tickets)}*/}
                {/*    </ul>*/}
                {/*    </tbody>*/}
                {/*</table>*/}
                <AddTicket onAdd={this.handleAddTicket.bind(this)}/>
            </div>
        );
    }
}

export default Main;

if (document.getElementById('root')) {
    ReactDOM.render(<Main />, document.getElementById('root'));
}
