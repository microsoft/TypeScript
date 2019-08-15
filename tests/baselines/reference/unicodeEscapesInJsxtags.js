//// [file.tsx]
import * as React from "react";
declare global {
    namespace JSX {
        interface IntrinsicElements {
            "a-b": any;
            "a-c": any;
        }
    }
}
const Compa = (x: {x: number}) => <div>{"" + x}</div>;

let a = <\u0061></a>; // works
let ab = <\u0061-b></a-b>; // works
let ac = <a-\u0063></a-c>; // works
let compa = <Comp\u0061 x={12} />; // works

let a2 = <\u{0061}></a>; // works
let ab2 = <\u{0061}-b></a-b>; // works
let ac2 = <a-\u{0063}></a-c>; // works
let compa2 = <Comp\u{0061} x={12} />; // works


//// [file.js]
import * as React from "react";
const Compa = (x) => React.createElement("div", null, "" + x);
let a = React.createElement("a", null); // works
let ab = React.createElement("a-b", null); // works
let ac = React.createElement("a-c", null); // works
let compa = React.createElement(Comp\u0061, { x: 12 }); // works
let a2 = React.createElement("a", null); // works
let ab2 = React.createElement("a-b", null); // works
let ac2 = React.createElement("a-c", null); // works
let compa2 = React.createElement(Comp\u{0061}, { x: 12 }); // works
