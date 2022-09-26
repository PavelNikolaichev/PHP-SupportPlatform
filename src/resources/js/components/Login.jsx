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
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 m-5" onSubmit={this.handleLogin}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email" type="text" placeholder="example@mail.com" onChange={(e) => this.handleInput('email', e)}/>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    {/*border-red-500 to input class if error*/}
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password" type="password" placeholder="******************" onChange={(e) => this.handleInput('password', e)}/>
                        {/*<p className="text-red-500 text-xs italic invisible">Please choose a password.</p>*/}
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit">
                        Sign In
                    </button>
                </div>
            </form>
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
