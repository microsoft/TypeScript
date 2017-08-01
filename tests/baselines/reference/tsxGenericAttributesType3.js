//// [file.tsx]
import React = require('react');

class B1<T extends { x: string } = { x:string } > extends React.Component<T, {}> {
    render() {
        return <div>hi</div>; 
    }
}
class B<U> extends React.Component<U, {}> {
    render() {
        return <B1 {...this.props} x="hi" />;
    }
}

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
exports.__esModule = true;
var React = require("react");
var B1 = (function (_super) {
    __extends(B1, _super);
    function B1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    B1.prototype.render = function () {
        return <div>hi</div>;
    };
    return B1;
}(React.Component));
var B = (function (_super) {
    __extends(B, _super);
    function B() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    B.prototype.render = function () {
        return <B1 {...this.props} x="hi"/>;
    };
    return B;
}(React.Component));
