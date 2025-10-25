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
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class TextComponent extends React.Component {
    render() {
        return <span>Some Text..</span>;
    }
}
// Error
let x = <TextComponent editable={true}/>;
const textProps = {
    editable: false
};
