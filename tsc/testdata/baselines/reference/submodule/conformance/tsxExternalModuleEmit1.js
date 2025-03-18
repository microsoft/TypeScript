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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = void 0;
const React = require("react");
class Button extends React.Component {
    render() {
        return <button>Some button</button>;
    }
}
exports.Button = Button;
//// [app.jsx]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const React = require("react");
const button_1 = require("./button");
class App extends React.Component {
    render() {
        return <button_1.Button />;
    }
}
exports.App = App;
