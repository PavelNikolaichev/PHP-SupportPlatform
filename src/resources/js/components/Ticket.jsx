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

        this.interval = null;

        this.deleteCallback = this.props.deleteCallback;
        this.updateCallback = this.props.updateCallback;
    }

    componentDidMount() {
        if (this.state.ticket === null) {
            return;
        }

        this.interval = setInterval(() => {
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
                });
        }, 10000);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.ticket === null || prevState.ticket === null || this.state.ticket.id !== prevState.ticket.id) {
            clearInterval(this.interval);
            this.componentDidMount();
        }
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
            if (data.error) {
                this.setState({error: data.error});
                return;
            }

            let newTicket = this.state.ticket;
            newTicket.messages.push(data);
            this.setState({ticket: newTicket});
        });
    }

    render() {
        const {error, isLoaded, ticket} = this.state;
        let updateTicket = null;
        let userId = localStorage.getItem('user_id');

        if (!ticket) {
            return null;
        }
        if (error) {
            return <div
                className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                role="alert">
                <span className="font-medium">Error: </span> { error }.
            </div>
        }
        if (!isLoaded) {
            return (
                <div role="status" className="flex justify-center items-center h-[32rem] lg:col-span-2">
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

        if(localStorage.getItem('isSupport') == true) {
            updateTicket = <UpdateTicket ticket={ticket} onUpdate={this.updateCallback}/>;
        }

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
                <div className="hidden lg:col-span-2 lg:block">
                    <div className="w-full">
                        <div className="relative flex items-center p-3 border-b border-gray-300">
                            <span className="block ml-2 font-bold text-gray-600">User: {ticket.username.name}</span>
                            <span className="block ml-2 font-bold text-gray-600">Ticket name: {ticket.title}</span>
                            <span className={`block ml-2 font-bold ${color}`}>Ticket status: {ticket.status}</span>
                        </div>
                        <div className="relative w-full p-6 overflow-y-auto h-[30rem]">
                            <ul className="space-y-2">
                                {ticket.messages.map(message => {
                                    if (message.user_id != userId) {
                                        return (
                                            <li className="flex justify-start">
                                                <div className="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
                                                    <span className="block">{message.text}</span>
                                                </div>
                                            </li>
                                        );
                                    }

                                    return (
                                        <li className="flex justify-end">
                                            <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                                                <span className="block">{message.text}</span>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                        <SendMessage ticket={ticket} onSend={(function (obj) {
                            return function (ticket) {
                                obj.handleSend(ticket);
                            }
                        })(this)}/>
                    </div>
                    {updateTicket}
                </div>
        );
    }
}
