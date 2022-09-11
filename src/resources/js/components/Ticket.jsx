import React, {Component} from "react";

export class Ticket extends Component {
    style = {};

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            ticket: null
        };
    }

    componentDidMount() {
        if (this.state.ticket === null) {
            return;
        }

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

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.ticket === null) {
            this.componentDidMount();
            return;
        }

        if (this.state.ticket.id !== prevState.ticket.id) {
            this.componentDidMount();
        }
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
                </div>
            </div>
        );
    }
}
