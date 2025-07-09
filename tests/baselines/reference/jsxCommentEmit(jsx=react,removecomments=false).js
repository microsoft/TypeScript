//// [tests/cases/compiler/jsxCommentEmit.ts] ////

//// [file.tsx]
let x = "hi";
const eg1 = <div>{x}/*mid*/{x}</div>;
const eg2 = <div>/*pre*/{x}/*post*/</div>;
const eg3 = <div>/*pre*/{x}/*mid*/{x}/*post*/</div>;
const eg4 = <div>/*pre*/<span/>*post*/</div>;
const eg5 = <div>/*pre*/{/*keep me*/}/*post*/</div>;


//// [file.js]
var x = "hi";
var eg1 = React.createElement("div", null,
    x,
    "/*mid*/",
    x);
var eg2 = React.createElement("div", null,
    "/*pre*/",
    x,
    "/*post*/");
var eg3 = React.createElement("div", null,
    "/*pre*/",
    x,
    "/*mid*/",
    x,
    "/*post*/");
var eg4 = React.createElement("div", null,
    "/*pre*/",
    React.createElement("span", null),
    "*post*/");
var eg5 = React.createElement("div", null,
    "/*pre*/",
    "/*post*/");
