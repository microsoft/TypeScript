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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var React = require("react");
var FetchUser = /** @class */ (function (_super) {
    __extends(FetchUser, _super);
    function FetchUser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FetchUser.prototype.render = function () {
        return this.state
            ? this.props.children(this.state.result)
            : null;
    };
    return FetchUser;
}(React.Component));
// Ok
function UserName0() {
    return (<FetchUser>
            {function (user) { return (<h1>{user.Name}</h1>); }}
        </FetchUser>);
}
function UserName1() {
    return (<FetchUser>

            {function (user) { return (<h1>{user.Name}</h1>); }}
        </FetchUser>);
}
