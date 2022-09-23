import React, {Component} from "react";

export class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            email: null,
            password: null,
        };

        this.onLogin = this.props.onLogin;
        this.handleLogin = this.handleLogin.bind(this);
    }

    render() {
        return (
            <div>
                <h2> Login </h2>
                <form onSubmit={this.handleLogin}>
                    <div className="form-group">
                        <label htmlFor="email" className="col-form-label-lg">Email</label>
                        <input className="form-control" type="text" placeholder="example@gmail.com"
                               onChange={(e) => this.handleInput('email', e)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="col-form-label-lg">Password</label>
                        <input className="form-control" type="password" placeholder="Password"
                               onChange={(e) => this.handleInput('password', e)}/>
                    </div>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit">
                        Sign In
                    </button>
                </form>
            </div>
        )
    }

    handleInput(key, e) {
        this.setState({[key]: e.target.value});
    };

    handleLogin(e) {
        e.preventDefault();
        let data = {email: this.state.email, password: this.state.password};

        this.onLogin(data);
    }
}
