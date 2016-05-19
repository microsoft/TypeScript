//// [file.tsx]

import React = require('react');

interface ComponentProps {
    AnyComponent: React.StatelessComponent<any> | React.ComponentClass<any>;
}

class MyComponent extends React.Component<ComponentProps, {}> {
    render() {
        const { AnyComponent } = this.props;
        const someProps = {};
        const button = <AnyComponent {...someProps}/>
        return (<div>{button}</div>);
    }
}

<MyComponent AnyComponent={() => <button>test</button>}/>

class MyButtonComponent extends React.Component<{},{}> {
}

<MyComponent AnyComponent={MyButtonComponent} />

type Invalid = string | React.ComponentClass<any>;

var X: Invalid = "";

<X /> // Should fail


//// [file.js]
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var React = require('react');
var MyComponent = (function (_super) {
    __extends(MyComponent, _super);
    function MyComponent() {
        _super.apply(this, arguments);
    }
    MyComponent.prototype.render = function () {
        var AnyComponent = this.props.AnyComponent;
        var someProps = {};
        var button = React.createElement(AnyComponent, __assign({}, someProps));
        return (React.createElement("div", null, button));
    };
    return MyComponent;
}(React.Component));
React.createElement(MyComponent, {AnyComponent: function () { return React.createElement("button", null, "test"); }});
var MyButtonComponent = (function (_super) {
    __extends(MyButtonComponent, _super);
    function MyButtonComponent() {
        _super.apply(this, arguments);
    }
    return MyButtonComponent;
}(React.Component));
React.createElement(MyComponent, {AnyComponent: MyButtonComponent});
var X = "";
React.createElement(X, null); // Should fail
