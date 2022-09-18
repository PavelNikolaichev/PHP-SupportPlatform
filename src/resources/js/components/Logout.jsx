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
                <input type="submit" value="Submit"/>
            </form>
        )
    }

    handleLogout(e) {
        e.preventDefault();
        this.onLogout();
    }
}
