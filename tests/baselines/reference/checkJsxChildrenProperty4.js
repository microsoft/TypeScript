//// [tests/cases/conformance/jsx/checkJsxChildrenProperty4.tsx] ////

//// [file.tsx]
/// <reference path="/.lib/react.d.ts" />

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

// Error
function UserName() {
    return (
        <FetchUser>
            { user => (
                <h1>{ user.NAme }</h1>
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
            { user => (
                <h1>{ user.Name }</h1>
            ) }
        </FetchUser>
    );
}

//// [file.jsx]
"use strict";
/// <reference path="/.lib/react.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class FetchUser extends React.Component {
    render() {
        return this.state
            ? this.props.children(this.state.result)
            : null;
    }
}
// Error
function UserName() {
    return (<FetchUser>
            {user => (<h1>{user.NAme}</h1>)}
        </FetchUser>);
}
function UserName1() {
    return (<FetchUser>


            
            {user => (<h1>{user.Name}</h1>)}
            {user => (<h1>{user.Name}</h1>)}
        </FetchUser>);
}
