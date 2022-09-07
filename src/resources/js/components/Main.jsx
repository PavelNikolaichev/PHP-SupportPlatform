import React, { Component, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

class Ticket extends Component {
    style = {};

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            ticket: props.ticket
        };
    }

    componentDidMount() {
        fetch('/api/tickets/' + this.state.ticket.id).then(
            response => response.json()
        ).then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    ticket: result
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

    render() {
        const { error, isLoaded, ticket } = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        }
        if (!isLoaded) {
            return <div>Loading...</div>;
        }

        return (
            <div className="card" style={this.style}>
                <div className="card-header">
                    <h5 className="card-title">{ticket.title}</h5>
                </div>
                <div className="card-body">
                    <ul>
                        {ticket.messages.map(message => {
                            return (
                                <li key={message.id}>
                                    <p>{message.text}</p>
                                    <p>{message.created_at}</p>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}

class Main extends Component {
    constructor(props) {
        super(props);

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
        this.setState({
            currentTicket: ticket
        });
    }

    render()
    {
        const { error, isLoaded, tickets, currentTicket } = this.state;
        let ticket;

        if (error) {
            return <div>Error: {error.message}</div>;
        }
        if (!isLoaded) {
            return <div>Loading...</div>;
        }

        if (currentTicket) {
            ticket = <Ticket ticket={currentTicket} />;
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

                {ticket}
            </div>
        );
    }
}

export default Main;

if (document.getElementById('root')) {
    ReactDOM.render(<Main />, document.getElementById('root'));
}
