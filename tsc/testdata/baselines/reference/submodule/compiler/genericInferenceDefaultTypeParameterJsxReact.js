//// [tests/cases/compiler/genericInferenceDefaultTypeParameterJsxReact.tsx] ////

//// [genericInferenceDefaultTypeParameterJsxReact.tsx]
/// <reference path="/.lib/react16.d.ts" />

// Repro from #50858

import React, { ComponentPropsWithRef, ElementType, ReactNode } from 'react';

type ButtonBaseProps<T extends ElementType> = ComponentPropsWithRef<T> & { children?: ReactNode };

function Component<T extends ElementType = 'span'>(props: ButtonBaseProps<T>) {
    return <></>;
}

const v1 = <Component onClick={e => e.preventDefault()} />;


//// [genericInferenceDefaultTypeParameterJsxReact.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Component(props) {
    return <></>;
}
const v1 = <Component onClick={e => e.preventDefault()}/>;
