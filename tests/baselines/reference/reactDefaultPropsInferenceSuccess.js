//// [reactDefaultPropsInferenceSuccess.tsx]
/// <reference path="/.lib/react16.d.ts" />

import React from 'react';

interface BaseProps {
  when?: ((value: string) => boolean) | "a" | "b";
  error?: boolean;
}

interface Props extends BaseProps {
}

class FieldFeedback<P extends Props = BaseProps> extends React.Component<P> {
  static defaultProps = {
    when: () => true
  };

  render() {
    return <div>Hello</div>;
  }
}

// OK
const Test1 = () => <FieldFeedback when={value => !!value} />;

// Error: Void not assignable to boolean
const Test2 = () => <FieldFeedback when={value => console.log(value)} />;

class FieldFeedbackBeta<P extends Props = BaseProps> extends React.Component<P> {
  static defaultProps: BaseProps = {
    when: () => true
  };

  render() {
    return <div>Hello</div>;
  }
}

// OK
const Test1a = () => <FieldFeedbackBeta when={value => !!value} error>Hah</FieldFeedbackBeta>;

// Error: Void not assignable to boolean
const Test2a = () => <FieldFeedbackBeta when={value => console.log(value)} error>Hah</FieldFeedbackBeta>;

interface MyPropsProps extends Props {
  when: (value: string) => boolean;
}

class FieldFeedback2<P extends MyPropsProps = MyPropsProps> extends FieldFeedback<P> {
  static defaultProps = {
    when: () => true
  };

  render() {
    this.props.when("now"); // OK, always defined
    return <div>Hello</div>;
  }
}

// OK
const Test3 = () => <FieldFeedback2 when={value => !!value} />;

// Error: Void not assignable to boolean
const Test4 = () => <FieldFeedback2 when={value => console.log(value)} />;

// OK
const Test5 = () => <FieldFeedback2 />;


//// [reactDefaultPropsInferenceSuccess.js]
"use strict";
/// <reference path="react16.d.ts" />
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var FieldFeedback = /** @class */ (function (_super) {
    __extends(FieldFeedback, _super);
    function FieldFeedback() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FieldFeedback.prototype.render = function () {
        return react_1["default"].createElement("div", null, "Hello");
    };
    FieldFeedback.defaultProps = {
        when: function () { return true; }
    };
    return FieldFeedback;
}(react_1["default"].Component));
// OK
var Test1 = function () { return react_1["default"].createElement(FieldFeedback, { when: function (value) { return !!value; } }); };
// Error: Void not assignable to boolean
var Test2 = function () { return react_1["default"].createElement(FieldFeedback, { when: function (value) { return console.log(value); } }); };
var FieldFeedbackBeta = /** @class */ (function (_super) {
    __extends(FieldFeedbackBeta, _super);
    function FieldFeedbackBeta() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FieldFeedbackBeta.prototype.render = function () {
        return react_1["default"].createElement("div", null, "Hello");
    };
    FieldFeedbackBeta.defaultProps = {
        when: function () { return true; }
    };
    return FieldFeedbackBeta;
}(react_1["default"].Component));
// OK
var Test1a = function () { return react_1["default"].createElement(FieldFeedbackBeta, { when: function (value) { return !!value; }, error: true }, "Hah"); };
// Error: Void not assignable to boolean
var Test2a = function () { return react_1["default"].createElement(FieldFeedbackBeta, { when: function (value) { return console.log(value); }, error: true }, "Hah"); };
var FieldFeedback2 = /** @class */ (function (_super) {
    __extends(FieldFeedback2, _super);
    function FieldFeedback2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FieldFeedback2.prototype.render = function () {
        this.props.when("now"); // OK, always defined
        return react_1["default"].createElement("div", null, "Hello");
    };
    FieldFeedback2.defaultProps = {
        when: function () { return true; }
    };
    return FieldFeedback2;
}(FieldFeedback));
// OK
var Test3 = function () { return react_1["default"].createElement(FieldFeedback2, { when: function (value) { return !!value; } }); };
// Error: Void not assignable to boolean
var Test4 = function () { return react_1["default"].createElement(FieldFeedback2, { when: function (value) { return console.log(value); } }); };
// OK
var Test5 = function () { return react_1["default"].createElement(FieldFeedback2, null); };
