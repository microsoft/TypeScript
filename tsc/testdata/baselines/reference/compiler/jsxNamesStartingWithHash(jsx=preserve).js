//// [tests/cases/compiler/jsxNamesStartingWithHash.tsx] ////

//// [jsxNamesStartingWithHash.tsx]
declare const React: any;
declare namespace JSX {
    interface IntrinsicElements {
        [name: string]: any;
    }
}

const a = <#a></#a>;
const b = <div #b />;
const c = <div #c="" />;
const d = <div #d:e />;
const e = <a:#f />;
const f = <a.#g />;
const g = <#h:i />;
const h = <div j:#k />;
const i = <div #l #m="" n="" />;
const j = <# />;


//// [jsxNamesStartingWithHash.jsx]
"use strict";
const a = <></>;
const b = <div />;
const c = <div =""/>;
const d = <div :e/>;
const e = <a: />;
const f = <a. />;
const g = <:i />;
const h = <div j:/>;
const i = <div  ="" n=""/>;
const j = < />;
