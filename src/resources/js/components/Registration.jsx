import React, {Component} from "react";

export class Registration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            email: null,
            password: null,
            name: null,
        };

        this.onLogin = this.props.onRegister;
        this.handleRegister = this.handleRegister.bind(this);
    }

    render() {
        return (
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 m-5" onSubmit={this.handleRegister}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email" type="text" placeholder="example@mail.com" onChange={(e) => this.handleInput('email', e)}/>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    {/*border-red-500 to input class if error*/}
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="name" type="text" placeholder="John" onChange={(e) => this.handleInput('name', e)}/>
                    {/*<p className="text-red-500 text-xs italic invisible">Please choose a password.</p>*/}
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
                        Register
                    </button>
                </div>
            </form>
                // <form onSubmit={this.handleRegister}>
                //     <div className="form-group">
                //         <label htmlFor="email" className="col-form-label-lg">Email</label>
                //         <input className="form-control" type="text" placeholder="example@gmail.com"
                //                onChange={(e) => this.handleInput('email', e)}/>
                //     </div>
                //     <div className="form-group">
                //         <label htmlFor="name" className="col-form-label-lg">Name</label>
                //         <input className="form-control" type="text" placeholder="Username"
                //                onChange={(e) => this.handleInput('name', e)}/>
                //     </div>
                //     <div className="form-group">
                //         <label htmlFor="password" className="col-form-label-lg">Password</label>
                //         <input className="form-control" type="password" placeholder="Password"
                //                onChange={(e) => this.handleInput('password', e)}/>
                //     </div>
                //     <button
                //         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                //         type="submit">
                //         Register
                //     </button>
                // </form>
        )
    }

    handleInput(key, e) {
        this.setState({[key]: e.target.value});
    };

    handleRegister(e) {
        e.preventDefault();
        let data = {email: this.state.email, password: this.state.password, name: this.state.name};

        this.onLogin(data);
    }
}
