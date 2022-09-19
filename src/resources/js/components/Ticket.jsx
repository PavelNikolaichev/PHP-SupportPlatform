import React, {Component} from "react";
import {UpdateTicket} from "./UpdateTicket";
import {SendMessage} from "./SendMessage";

export class Ticket extends Component {
    style = {};

    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            ticket: null
        };

        this.deleteCallback = this.props.deleteCallback;
        this.updateCallback = this.props.updateCallback;
    }

    componentDidMount() {
        if (this.state.ticket === null) {
            return;
        }

        fetch('/api/tickets/' + this.state.ticket.id,
            {
                method: 'get',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
                }
            }).then(
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

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.componentDidMount();
    }

    handleSend(message)
    {
        message['ticket_id'] = this.state.ticket.id;

        fetch( 'api/messages/', {
            method:'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            },

            body: JSON.stringify(message)
        }).then(response => {
            return response.json();
        }).then(data => {
            let newTicket = this.state.ticket;
            newTicket.messages.push(data);

            this.setState({ticket: newTicket});
        });
    }

    render() {
        const {error, isLoaded, ticket} = this.state;

        if (!ticket) {
            return <div>Please, choose a ticket</div>;
        }
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

                    <SendMessage ticket={ticket} onSend={(function (obj) {
                        return function (ticket) {
                            obj.handleSend(ticket);
                        }
                    })(this)}/>
                    <button onClick={this.deleteCallback}>Delete</button>
                    <UpdateTicket ticket={ticket} onUpdate={this.updateCallback}/>
                </div>
            </div>
        );
    }
}
