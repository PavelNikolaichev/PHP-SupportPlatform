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
                        error: error
                    });
                }
            );
        }
    }

    renderTickets(tickets)
    {
        return tickets.map(ticket => {
            let color = 'text-gray-600';

            if (ticket.status === 'in progress') {
                color = 'text-yellow-600';
            }
            if (ticket.status === 'closed') {
                color = 'text-green-600';
            }
            if (ticket.status === 'freezed') {
                color = 'text-red-600';
            }

            return (
                <li>
                    <a onClick={() => this.handleClick(ticket)}
                        className="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none w-100">
                        <div className="w-full pb-2">
                            <div className="flex justify-between">
                                <span className="block ml-2 font-bold text-gray-600">{ticket.title}</span>
                                <span className="block ml-2 text-sm text-gray-600">{ticket.username.name}</span>
                            </div>

                            <span className={`block ml-2 text-sm ${color}`}>{ticket.status}</span>
                        </div>
                    </a>
                </li>
            );
        });
    }

    handleClick(ticket)
    {
        let currentTicket = this.currentTicket.current.state.ticket;
        if (!currentTicket || currentTicket.id !== ticket.id) {
            this.currentTicket.current.setState({
                ticket: ticket,
                isLoaded: false
            });
        }
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
            if (data['message']) {
                this.setState({
                    error: data['message']
                });
                return;
            }
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
                if (result['message']) {
                    this.setState({
                        error: result['message']
                    });
                    return;
                }

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
                if (result['message']) {
                    this.setState({
                        error: result['message']
                    });
                    return;
                }
                if (result === "Invalid credentials") {
                    this.setState({
                        error: result
                    });
                    result;
                }

                if (result['token']['accessToken'] != null) {
                    localStorage.setItem('accessToken', result['token']['plainTextToken']);
                    localStorage.setItem('isSupport', result['is_support']);
                    localStorage.setItem('user_id', result['token']['accessToken']['tokenable_id']);

                    this.token = result['token']['plainTextToken'];
                    this.setState({
                        error: null
                    })
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
                if (result['token']['accessToken'] != null) {
                    localStorage.setItem('accessToken', result['token']['plainTextToken']);
                    localStorage.setItem('isSupport', result['is_support']);
                    localStorage.setItem('user_id', result['token']['accessToken']['tokenable_id']);

                    this.token = result['token']['plainTextToken'];
                    this.setState({
                        error: null
                    })
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
        let ticketList = null;
        let errors = null;
        if (error) {
            errors = <div
                className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                role="alert">
                <span className="font-medium">Error: </span> { error }.
            </div>;
        }

        if (this.token == null) {
            return(
                <div>
                    {errors}
                    <div className="flex h-screen justify-center items-center">
                        <Login onLogin={this.handleLogin.bind(this)}/>
                        <Registration onRegister={this.handleRegister.bind(this)}/>
                    </div>
                </div>
            )
        }

        if (!isLoaded) {
            return (
                <div role="status" className="flex h-screen justify-center items-center">
                    <svg aria-hidden="true"
                         className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                         viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"/>
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"/>
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            );
        }
        if (tickets.length === 0) {
            ticketList = (
                <p className="grid h-[32rem] place-items-center">The ticket list is empty - add a new one.</p>
            );
        } else {
            ticketList = <ul className="overflow-auto h-[32rem]">
                {this.renderTickets(tickets)}
            </ul>;
        }

        return (
            <div>
                {errors}
                <div className="flex justify-end mt-5 w-100">
                    <Logout onLogout={this.handleLogout.bind(this)}/>
                </div>
                <div className="min-w-full border rounded lg:grid lg:grid-cols-3 mt-5">
                    <div className="border-r border-gray-300 lg:col-span-1">
                        {ticketList}
                        <div className="ml-5 mb-1 mr-2">
                            <AddTicket onAdd={this.handleAddTicket.bind(this)}/>
                        </div>
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
            </div>
        );
    }
}

export default Main;

if (document.getElementById('root')) {
    ReactDOM.render(<Main />, document.getElementById('root'));
}
