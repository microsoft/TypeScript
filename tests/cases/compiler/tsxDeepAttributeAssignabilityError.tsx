// @target: es2015
// @jsx: react
// @skipLibCheck: true

// @Filename: my-component.tsx
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

// @Filename: file1.tsx

import * as React from 'react'
import { MyComponent } from './my-component'

export const result = <MyComponent x="yes" y={{
    value: 42
}} />;
