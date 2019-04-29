// @jsx: react
// @strict: true
// @esModuleInterop: true
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
