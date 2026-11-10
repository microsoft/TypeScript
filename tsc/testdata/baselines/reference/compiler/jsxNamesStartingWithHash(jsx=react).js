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
const a = React.createElement(, null);
const b = React.createElement("div", { "": true });
const c = React.createElement("div", { "": "" });
const d = React.createElement("div", { ":e": true });
const e = React.createElement("a:", null);
const f = React.createElement(a., null);
const g = React.createElement(":i", null);
const h = React.createElement("div", { "j:": true });
const i = React.createElement(, null);
const j = React.createElement("div", { "": 1 });
const k = React.createElement("div", { "": true, "": "", r: "" });
const l = React.createElement(, null);
