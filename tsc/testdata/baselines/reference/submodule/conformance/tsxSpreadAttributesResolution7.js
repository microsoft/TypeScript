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
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class TextComponent extends React.Component {
    render() {
        return <span>Some Text..</span>;
    }
}
const textPropsFalse = {
    editable: false
};
let y1 = <TextComponent {...textPropsFalse}/>;
const textPropsTrue = {
    editable: true,
    onEdit: () => { }
};
let y2 = <TextComponent {...textPropsTrue}/>;
