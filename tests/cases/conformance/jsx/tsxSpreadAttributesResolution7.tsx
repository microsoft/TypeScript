// @filename: file.tsx
// @jsx: preserve
// @noLib: true
// @skipLibCheck: true
// @libFiles: react.d.ts,lib.d.ts

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