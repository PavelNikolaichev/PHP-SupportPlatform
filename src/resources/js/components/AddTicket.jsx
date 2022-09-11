import React, {Component} from "react";

export class AddTicket extends Component {
    style = {};

    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            title: null,
            status: null,
            user_id: null,
        };

        this.onAdd = this.props.onAdd;
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
        let data = this.onAdd({
            title: this.state.title,
            status: this.state.status,
            user_id: this.state.user_id
        });
    };

    render() {
        return(
            <div>
                <h2> Add new product </h2>
                <div style={this.style}>
                    <form onSubmit={this.handleSubmit}>
                        <label> Title:
                            <input type="text" onChange={(e)=>this.handleInput('title',e)} />
                        </label>
                        <label> Status:
                            <input type="text" onChange={(e)=>this.handleInput('status',e)} />
                        </label>
                        <label> user_id:
                            <input type="text" onChange={(e)=>this.handleInput('user_id',e)} />
                        </label>

                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        );
    }
}
