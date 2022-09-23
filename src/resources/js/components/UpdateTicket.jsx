import React, {Component} from "react";

export class UpdateTicket extends Component {
    style = {};

    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            title: null,
            status: null
        };

        this.onUpdate = this.props.onUpdate;
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInput(key, e)
    {
        this.setState({[key]: e.target.value});
    };

    handleSubmit(e)
    {
        e.preventDefault();
        let data = this.onUpdate({
            title: this.state.title,
            status: this.state.status
        });
    };

    render() {
        return(
            <div>
                <h2> Update this product </h2>
                <div style={this.style}>
                    <form onSubmit={this.handleSubmit}>
                        <label> Title:
                            <input type="text" onChange={(e)=>this.handleInput('title',e)} />
                        </label>
                        <label> Status:
                            <input type="text" onChange={(e)=>this.handleInput('status',e)} />
                        </label>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit">
                            Update ticket
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}
