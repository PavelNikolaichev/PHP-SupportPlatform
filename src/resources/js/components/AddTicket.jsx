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
                    <form className="w-full max-w-sm" onSubmit={this.handleSubmit}>
                        <div className="flex items-center border-b border-blue-500 py-2">
                            <input
                                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                type="text" placeholder="Help me" aria-label="Full name" onChange={(e)=>this.handleInput('title',e)} />
                                <button
                                    className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded"
                                    type="submit">
                                    Create ticket
                                </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
