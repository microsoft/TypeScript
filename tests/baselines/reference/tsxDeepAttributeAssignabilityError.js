//// [tests/cases/compiler/tsxDeepAttributeAssignabilityError.tsx] ////

//// [my-component.tsx]
/// <reference path="/.lib/react.d.ts" />
import * as React from 'react'

interface MyProps {
    x: string;
    y: MyInnerProps;
}

interface MyInnerProps {
    value: string;
}

export function MyComponent(_props: MyProps) {
    return <span>my component</span>;
}

//// [file1.tsx]
import * as React from 'react'
import { MyComponent } from './my-component'

export const result = <MyComponent x="yes" y={{
    value: 42
}} />;


//// [my-component.js]
/// <reference path="/.lib/react.d.ts" />
import * as React from 'react';
export function MyComponent(_props) {
    return React.createElement("span", null, "my component");
}
//// [file1.js]
import * as React from 'react';
import { MyComponent } from './my-component';
export const result = React.createElement(MyComponent, { x: "yes", y: {
        value: 42
    } });
