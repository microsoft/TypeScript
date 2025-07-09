//// [tests/cases/compiler/jsxCommentEmit.ts] ////

//// [file.tsx]
let x = "hi";
const eg1 = <div>{x}/*mid*/{x}</div>;
const eg2 = <div>/*pre*/{x}/*post*/</div>;
const eg3 = <div>/*pre*/{x}/*mid*/{x}/*post*/</div>;
const eg4 = <div>/*pre*/<span/>*post*/</div>;
const eg5 = <div>/*pre*/{/*keep me*/}/*post*/</div>;


//// [file.jsx]
var x = "hi";
var eg1 = <div>{x}/*mid*/{x}</div>;
var eg2 = <div>/*pre*/{x}/*post*/</div>;
var eg3 = <div>/*pre*/{x}/*mid*/{x}/*post*/</div>;
var eg4 = <div>/*pre*/<span />*post*/</div>;
var eg5 = <div>/*pre*//*post*/</div>;
