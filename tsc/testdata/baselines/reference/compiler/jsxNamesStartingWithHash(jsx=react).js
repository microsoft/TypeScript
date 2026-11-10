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
const i = <#l-m></#l-m>;
const j = <div #n-o={1} />;
const k = <div #p #q="" r="" />;
const l = <# />;


//// [jsxNamesStartingWithHash.js]
"use strict";
const a = React.createElement(#a, null);
const b = React.createElement("div", { "#b": true });
const c = React.createElement("div", { "#c": "" });
const d = React.createElement("div", { "#d:e": true });
const e = React.createElement("a:#f", null);
const f = React.createElement(a., null);
const g = React.createElement("#h:i", null);
const h = React.createElement("div", { "j:#k": true });
const i = React.createElement("#l-m", null);
const j = React.createElement("div", { "#n-o": 1 });
const k = React.createElement("div", { "#p": true, "#q": "", r: "" });
const l = React.createElement(#, null);
