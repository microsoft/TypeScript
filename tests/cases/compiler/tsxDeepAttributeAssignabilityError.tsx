// @jsx: react
// @noLib: true
// @skipLibCheck: true
// @libFiles: react.d.ts,lib.d.ts

// @Filename: my-component.tsx
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
