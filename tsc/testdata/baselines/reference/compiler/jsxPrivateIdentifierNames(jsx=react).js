//// [tests/cases/compiler/jsxPrivateIdentifierNames.tsx] ////

//// [jsxPrivateIdentifierNames.tsx]
declare const React: any;
declare namespace JSX {
    interface IntrinsicElements {
        [name: string]: any;
    }
}

const a = <#a></#a>;
const b = <#b />;
const c = <div #c />;
const d = <div #d="d" />;
const e = <div #e:f />;
const f = <div f:#g />;
const g = <a:#h />;
const h = <#i:j />;
const i = <a.#k />;


//// [jsxPrivateIdentifierNames.js]
"use strict";
const a = React.createElement(#a, null);
const b = React.createElement(#b, null);
const c = React.createElement("div", { "#c": true });
const d = React.createElement("div", { "#d": "d" });
const e = React.createElement("div", { "#e:f": true });
const f = React.createElement("div", { "f:#g": true });
const g = React.createElement("a:#h", null);
const h = React.createElement("#i:j", null);
const i = React.createElement(a., null);
