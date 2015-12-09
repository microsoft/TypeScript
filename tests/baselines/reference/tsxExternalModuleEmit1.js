//// [tests/cases/conformance/jsx/tsxExternalModuleEmit1.tsx] ////

//// [react.d.ts]

declare module 'react' {
	class Component<T, U> { }
}

//// [app.tsx]
import * as React from 'react';

// Should see var button_1 = require('./button') here
import { Button } from './button';

export class App extends React.Component<any, any> {

    render() {
        return <Button />;
    }

}

//// [button.tsx]
import * as React from 'react';

export class Button extends React.Component<any, any> {

    render() {
        return <button>Some button</button>;
    }

}

//// [button.jsx]
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var Button = (function (_super) {
    __extends(Button, _super);
    function Button() {
        _super.apply(this, arguments);
    }
    Button.prototype.render = function () {
        return <button>Some button</button>;
    };
    return Button;
})(React.Component);
exports.Button = Button;
//// [app.jsx]
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
// Should see var button_1 = require('./button') here
var button_1 = require('./button');
var App = (function (_super) {
    __extends(App, _super);
    function App() {
        _super.apply(this, arguments);
    }
    App.prototype.render = function () {
        return <button_1.Button />;
    };
    return App;
})(React.Component);
exports.App = App;
