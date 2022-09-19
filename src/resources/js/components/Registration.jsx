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
            <div>
                <h2> Registration </h2>
                <form onSubmit={this.handleRegister}>
                    <div className="form-group">
                        <label htmlFor="email" className="col-form-label-lg">Email</label>
                        <input className="form-control" type="text" placeholder="example@gmail.com"
                               onChange={(e) => this.handleInput('email', e)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="name" className="col-form-label-lg">Name</label>
                        <input className="form-control" type="text" placeholder="Username"
                               onChange={(e) => this.handleInput('name', e)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="col-form-label-lg">Password</label>
                        <input className="form-control" type="password" placeholder="Password"
                               onChange={(e) => this.handleInput('password', e)}/>
                    </div>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
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
