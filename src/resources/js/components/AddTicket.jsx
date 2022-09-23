import React, {Component} from "react";

export class AddTicket extends Component {
    style = {};

    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            title: null,
        };

        this.onAdd = this.props.onAdd;
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
            title: this.state.title
        });
    };

    render() {
        return(
            <div>
                <div style={this.style}>
                    <form onSubmit={this.handleSubmit}>
                        <label> Title:
                            <input type="text" onChange={(e)=>this.handleInput('title',e)} />
                        </label>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit">
                            Create ticket
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}
