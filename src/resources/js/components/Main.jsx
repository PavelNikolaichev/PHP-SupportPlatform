import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Ticket} from "./Ticket";
import {AddTicket} from "./AddTicket";

class Main extends Component {
    constructor(props) {
        super(props);

        this.currentTicket = React.createRef();

        this.state = {
            error: null,
            isLoaded: false,
            tickets: [],
            currentTicket: null,
        };
    }

    componentDidMount() {
        fetch('/api/tickets/').then(
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

    renderTickets(tickets)
    {
        return tickets.map(ticket => {
            return (
            <tr key={ticket.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row">{ticket.id}</th>
                <th>{ticket.title}</th>
                <th>{ticket.status}</th>
                <th>{ticket.user_id}</th>
                <th>{new Date(ticket.created_at).toLocaleDateString("en-US", {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                })}</th>
                <th>{new Date(ticket.updated_at).toLocaleDateString("en-US", {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                })}</th>
                <th><button onClick={() => this.handleClick(ticket)}>View</button></th>
            </tr>
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
        this.setState((prevState) => ({
            tickets: prevState.tickets.concat(ticket)
        }));
        this.handleClick(ticket);
    }

    handleAddTicket(ticket) {
        fetch( 'api/tickets/', {
            method:'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(ticket)
        }).then(response => {
                return response.json();
        }).then(data => {
            this.callMainAddTicket(data);
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
                'Content-Type': 'application/json'
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

    render()
    {
        const { error, isLoaded, tickets } = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        }
        if (!isLoaded) {
            return <div>Loading...</div>;
        }

        return (
            <div>
                <h3>All Tickets</h3>
                <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Title</th>
                        <th scope="col">Status</th>
                        <th scope="col">Username</th>
                        <th scope="col">Creation Date</th>
                        <th scope="col">Modification Date</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.renderTickets(tickets)}
                    </tbody>
                </table>

                <Ticket ref={this.currentTicket} deleteCallback={(function (obj) {
                    return function (ticket) {
                        obj.handleDelete(ticket);
                    }
                })(this)} updateCallback={(function (obj) {
                    return function (ticket) {
                        obj.handleUpdate(ticket);
                    }
                })(this)}/>
                <AddTicket onAdd={this.handleAddTicket} callMainAddTicket={(function (obj) {
                    return function (ticket) {
                        obj.addTicket(ticket);
                    }
                })(this)}/>
            </div>
        );
    }
}

export default Main;

if (document.getElementById('root')) {
    ReactDOM.render(<Main />, document.getElementById('root'));
}
