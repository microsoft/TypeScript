/// <reference path='fourslash.ts'/>

// @jsx: react

// @Filename: /Component.tsx
////import React from 'react';
////
////export const ComponentA = () => {
////    return <div>Component A</div>;
////};
////
////[|export const ComponentB = () => {
////    return <div>Component B</div>;
////};|]

verify.moveToNewFile({
    newFileContents: {
        "/Component.tsx":
`import React from 'react';

export const ComponentA = () => {
    return <div>Component A</div>;
};
`,

        "/ComponentB.tsx":
`import React from 'react';

export const ComponentB = () => {
    return <div>Component B</div>;
};
`,
    },
});