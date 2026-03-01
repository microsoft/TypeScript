/// <reference path='fourslash.ts' />

// @jsx: preserve

// @Filename: /node_modules/react/index.d.ts
////export = React;
////export as namespace React;
////declare namespace React {
////    class Component {}
////}

// @Filename: /src/main.tsx
//// import * as React from 'react';
//// 
//// export const main = () => {};
//// 
//// [|interface SProps {
//// 	children: string;
//// }
//// 
//// function SidebarSection({children}: SProps) {
//// 	return <div>{children}</div>;
//// }|]


verify.moveToNewFile({
    newFileContents: {
        "/src/main.tsx":
`
export const main = () => {};

`,
        "/src/SProps.tsx":
`import * as React from 'react';

interface SProps {
    children: string;
}
function SidebarSection({ children }: SProps) {
    return <div>{children}</div>;
}
`
    }
});
