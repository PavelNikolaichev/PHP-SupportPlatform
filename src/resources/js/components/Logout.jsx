import React, {Component} from "react";

export class Logout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
        };

        this.onLogout = this.props.onLogout;
        this.handleLogout = this.handleLogout.bind(this);
    }

    render() {
        return (
            <form onSubmit={this.handleLogout}>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit">
                    Logout
                </button>
            </form>
        )
    }

    handleLogout(e) {
        e.preventDefault();
        this.onLogout();
    }
}
