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
                <div style={this.style}>
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 m-5" onSubmit={this.handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">Title</label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="title" type="text" onChange={(e) => this.handleInput('title', e)}/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">Status</label>
                            <select id="status" className="shadow border py-1 w-full text-sm bg-white rounded" onChange={(e) => this.handleInput('status', e)}>
                                <option className="block py-2 px-4"
                                        value="in progress">In progress
                                </option>
                                <option className="block py-2 px-4"
                                        value="freezed">Freezed
                                </option>
                                <option className="block py-2 px-4"
                                        value="solved">Solved
                                </option>
                            </select>
                        </div>

                        <div className="flex items-center justify-between">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit">
                                Update ticket
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
