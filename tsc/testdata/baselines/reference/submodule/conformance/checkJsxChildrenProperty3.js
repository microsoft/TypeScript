//// [tests/cases/conformance/jsx/checkJsxChildrenProperty3.tsx] ////

//// [file.tsx]
import React = require('react');

interface IUser {
    Name: string;
}

interface IFetchUserProps {
    children: (user: IUser) => JSX.Element;
}

class FetchUser extends React.Component<IFetchUserProps, any> {
    render() {
        return this.state
            ? this.props.children(this.state.result)
            : null;
    }
}

// Ok
function UserName0() {
    return (
        <FetchUser>
            { user => (
                <h1>{ user.Name }</h1>
            ) }
        </FetchUser>
    );
}

function UserName1() {
    return (
        <FetchUser>

            { user => (
                <h1>{ user.Name }</h1>
            ) }
        </FetchUser>
    );
}

//// [file.jsx]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class FetchUser extends React.Component {
    render() {
        return this.state
            ? this.props.children(this.state.result)
            : null;
    }
}
function UserName0() {
    return (<FetchUser>
            {user => (<h1>{user.Name}</h1>)}
        </FetchUser>);
}
function UserName1() {
    return (<FetchUser>

            {user => (<h1>{user.Name}</h1>)}
        </FetchUser>);
}
