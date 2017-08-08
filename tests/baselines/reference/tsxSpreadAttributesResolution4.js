//// [file.tsx]
import React = require('react');

interface PoisonedProp {
    x: string;
    y: 2;
}

class Poisoned extends React.Component<PoisonedProp, {}> {
    render() {
        return <div>Hello</div>;
    }
}

const obj: PoisonedProp = {
    x: "hello world",
    y: 2
};

// OK
let p = <Poisoned {...obj} />;

class EmptyProp extends React.Component<{}, {}> {
    render() {
        return <div>Default hi</div>;
    }
}

// OK
let j: any;
let e1 = <EmptyProp {...{}} />;
let e2 = <EmptyProp {...j} />
let e3 = <EmptyProp {...{ ref: (input) => { this.textInput = input; } }} />
let e4 = <EmptyProp data-prop />
let e5 = <EmptyProp {...{ "data-prop": true}} />

//// [file.jsx]
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true, writable: false, enumerable: false
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
var _this = this;
exports.__esModule = true;
var React = require("react");
var Poisoned = (function (_super) {
    __extends(Poisoned, _super);
    function Poisoned() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Poisoned.prototype.render = function () {
        return <div>Hello</div>;
    };
    __names(Poisoned.prototype, ["render"]);
    return Poisoned;
}(React.Component));
var obj = {
    x: "hello world",
    y: 2
};
// OK
var p = <Poisoned {...obj}/>;
var EmptyProp = (function (_super) {
    __extends(EmptyProp, _super);
    function EmptyProp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EmptyProp.prototype.render = function () {
        return <div>Default hi</div>;
    };
    __names(EmptyProp.prototype, ["render"]);
    return EmptyProp;
}(React.Component));
// OK
var j;
var e1 = <EmptyProp {...{}}/>;
var e2 = <EmptyProp {...j}/>;
var e3 = <EmptyProp {...{ ref: function (input) { _this.textInput = input; } }}/>;
var e4 = <EmptyProp data-prop/>;
var e5 = <EmptyProp {...{ "data-prop": true }}/>;
