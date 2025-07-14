/// <reference path='fourslash.ts'/>

// @jsx: react

// @Filename: /Component.tsx
////import React from 'react';
////import { useState } from 'react';
////
////export const ComponentA = () => {
////    const [count, setCount] = useState(0);
////    return <div onClick={() => setCount(count + 1)}>Component A: {count}</div>;
////};
////
////[|export const ComponentB = () => {
////    const [text, setText] = useState('Hello');
////    return <div><input value={text} onChange={(e) => setText(e.target.value)} /><span>{text}</span></div>;
////};|]

verify.moveToNewFile({
    newFileContents: {
        "/Component.tsx":
`import React from 'react';
import { useState } from 'react';

export const ComponentA = () => {
    const [count, setCount] = useState(0);
    return <div onClick={() => setCount(count + 1)}>Component A: {count}</div>;
};`,

        "/ComponentB.tsx":
`import React from 'react';
import { useState } from 'react';

export const ComponentB = () => {
    const [text, setText] = useState('Hello');
    return <div><input value={text} onChange={(e) => setText(e.target.value)} /><span>{text}</span></div>;
};`,
    },
});