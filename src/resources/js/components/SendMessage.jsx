import React, {Component} from "react";

export class SendMessage extends Component {
    style = {};

    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            text: null,
            ticket_id: null,
            user_id: null,
        };

        this.onSend = this.props.onSend;
        this.callMainAddTicket=this.props.callMainAddTicket;
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInput(key, e)
    {
        this.setState({[key]: e.target.value});
    };

    handleSubmit(e)
    {
        e.preventDefault();

        let data = this.onSend({
            text: this.state.text,
            user_id: this.state.user_id
        });
    };

    render() {
        return(
            <div>
                <h2>Send new message</h2>
                <div style={this.style}>
                    <form onSubmit={this.handleSubmit}>
                        <label> Text:
                            <input type="text" onChange={(e)=>this.handleInput('text',e)} />
                        </label>
                        <label> User id:
                            <input type="text" onChange={(e)=>this.handleInput('user_id',e)} />
                        </label>

                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        );
    }
}
