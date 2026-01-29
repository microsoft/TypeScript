//// [tests/cases/compiler/tsxStatelessComponentDefaultProps.tsx] ////

//// [tsxStatelessComponentDefaultProps.tsx]
/// <reference path="/.lib/react16.d.ts" />

import React from 'react';
interface Props {
    text: string;
}

function BackButton(_props: Props) {
    return <div />
}
BackButton.defaultProps = {
    text: 'Go Back',
};
let a = <BackButton />


//// [tsxStatelessComponentDefaultProps.js]
/// <reference path="/.lib/react16.d.ts" />
import React from 'react';
function BackButton(_props) {
    return React.createElement("div", null);
}
BackButton.defaultProps = {
    text: 'Go Back',
};
let a = React.createElement(BackButton, null);
