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
        if (this.state.ticket === null || prevState.ticket === null || this.state.ticket.id !== prevState.ticket.id) {
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
            let newTicket = this.state.ticket;
            newTicket.messages.push(data);
            this.setState({ticket: newTicket});
        });
    }

    render() {
        const {error, isLoaded, ticket} = this.state;
        let updateTicket = null;

        if (!ticket) {
            return <div>Please, choose a ticket</div>;
        }
        if (error) {
            return <div>Error: {error.message}</div>;
        }
        if (!isLoaded) {
            return <div>Loading...</div>;
        }

        if( localStorage.getItem('admin') === true) {
            updateTicket = <UpdateTicket ticket={ticket} onUpdate={this.updateCallback}/>;
        }

        return (
            <div>
                <div className="hidden lg:col-span-2 lg:block">
                    <div className="w-full">
                        <div className="relative flex items-center p-3 border-b border-gray-300">
                            {/*<span className="block ml-2 font-bold text-gray-600">{ticket.username}</span>*/}
                            <span className="block ml-2 font-bold text-gray-600">User: {ticket.username.name}</span>
                            <span className="block ml-2 font-bold text-gray-600">Ticket status: {ticket.status}</span>
                        </div>
                        <div className="relative w-full p-6 overflow-y-auto h-[40rem]">
                            <ul className="space-y-2">
                                {/*Messages - yours are justify-start, others - end*/}
                                {/*<li className="flex justify-start">*/}
                                {/*    <div className="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">*/}
                                {/*        <span className="block">Hi</span>*/}
                                {/*    </div>*/}
                                {/*</li>*/}
                                {/*<li className="flex justify-end">*/}
                                {/*    <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">*/}
                                {/*        <span className="block">Hiiii</span>*/}
                                {/*    </div>*/}
                                {/*</li>*/}
                                {ticket.messages.map(message => {
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

                        {/*<div className="flex items-center justify-between w-full p-3 border-t border-gray-300">*/}
                            {/*<input type="text" placeholder="Message"*/}
                            {/*       className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"*/}
                            {/*       name="message" required/>*/}
                            <SendMessage ticket={ticket} onSend={(function (obj) {
                                return function (ticket) {
                                    obj.handleSend(ticket);
                                }
                            })(this)}/>
                            {/*<button type="submit">*/}
                            {/*    <svg className="w-5 h-5 text-gray-500 origin-center transform rotate-90"*/}
                            {/*         xmlns="http://www.w3.org/2000/svg"*/}
                            {/*         viewBox="0 0 20 20" fill="currentColor">*/}
                            {/*        <path*/}
                            {/*            d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>*/}
                            {/*    </svg>*/}
                            {/*</button>*/}
                        {/*</div>*/}
                    </div>
                </div>
                {/*{updateTicket}*/}
            </div>
            // <div className="card" style={this.style}>
            //     <div className="card-header">
            //         <h5 className="card-title">{ticket.title}</h5>
            //     </div>
            //     <div className="card-body">
            //         <ul>
            //             {ticket.messages.map(message => {
            //                 return (
            //                     <li key={message.id}>
            //                         <p>{message.text}</p>
            //                         <p>{message.created_at}</p>
            //                     </li>
            //                 );
            //             })}
            //         </ul>
            //
            //         <SendMessage ticket={ticket} onSend={(function (obj) {
            //             return function (ticket) {
            //                 obj.handleSend(ticket);
            //             }
            //         })(this)}/>
            //         <button onClick={this.deleteCallback}>Delete</button>
            //     </div>
            // </div>
        );
    }
}
