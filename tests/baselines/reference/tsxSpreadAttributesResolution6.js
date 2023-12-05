//// [tests/cases/conformance/jsx/tsxSpreadAttributesResolution6.tsx] ////

//// [file.tsx]
import React = require('react');

type TextProps = { editable: false }
               | { editable: true, onEdit: (newText: string) => void };

class TextComponent extends React.Component<TextProps, {}> {
    render() {
        return <span>Some Text..</span>;
    }
}

// Error
let x = <TextComponent editable={true} />

const textProps: TextProps = {
    editable: false
};

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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var TextComponent = /** @class */ (function (_super) {
    __extends(TextComponent, _super);
    function TextComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextComponent.prototype.render = function () {
        return <span>Some Text..</span>;
    };
    return TextComponent;
}(React.Component));
// Error
var x = <TextComponent editable={true}/>;
var textProps = {
    editable: false
};
