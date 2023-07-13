//// [tests/cases/conformance/jsx/tsxSpreadAttributesResolution7.tsx] ////

//// [file.tsx]
import React = require('react');

type TextProps = { editable: false }
               | { editable: true, onEdit: (newText: string) => void };

class TextComponent extends React.Component<TextProps, {}> {
    render() {
        return <span>Some Text..</span>;
    }
}

// OK
const textPropsFalse: TextProps = {
    editable: false
};

let y1 = <TextComponent {...textPropsFalse} />

const textPropsTrue: TextProps = {
    editable: true,
    onEdit: () => {}
};

let y2 = <TextComponent {...textPropsTrue} />

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
// OK
var textPropsFalse = {
    editable: false
};
var y1 = <TextComponent {...textPropsFalse}/>;
var textPropsTrue = {
    editable: true,
    onEdit: function () { }
};
var y2 = <TextComponent {...textPropsTrue}/>;
