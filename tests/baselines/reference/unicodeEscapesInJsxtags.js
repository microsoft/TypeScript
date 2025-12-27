//// [tests/cases/conformance/jsx/unicodeEscapesInJsxtags.tsx] ////

//// [file.tsx]
import * as React from "react";
declare global {
    namespace JSX {
        interface IntrinsicElements {
            "a-b": any;
            "a-c": any;
            "abcde:abcde": any;
            "namespace-name:tagname-tag": any;
        }
    }
}
const Compa = (x: {x: number}) => <div>{"" + x}</div>;
const x = { video: () => null }

// unicode escape sequence is not allowed in tag name or JSX attribute name.
// tag name:
; <\u0061></a>
; <\u0061-b></a-b>
; <a-\u0063></a-c>
; <Comp\u0061 x={12} />
; <x.\u0076ideo />
; <\u{0061}></a>
; <\u{0061}-b></a-b>
; <a-\u{0063}></a-c>
; <Comp\u{0061} x={12} />
; <a\u0062c\u0064e:a\u{62}c\u{64}e x={12}></abcde:abcde>
; <n\u0061me\u{73}pa\u0063e-\u{6e}a\u006de:\u{74}a\u0067n\u{61}me-\u0074\u{61}\u0067 x={12}></namespace-name:tagname-tag>

// attribute name
;<video data-\u0076ideo />
;<video \u0073rc="" />
;<video m\u0075t\u0065d />
;<video m\u{75}t\u{65}d />


//// [file.js]
import * as React from "react";
const Compa = (x) => React.createElement("div", null, "" + x);
const x = { video: () => null };
React.createElement("a", null);
React.createElement("a-b", null);
React.createElement("a-c", null);
React.createElement(Comp\u0061, { x: 12 });
React.createElement(x.\u0076ideo, null);
React.createElement("a", null);
React.createElement("a-b", null);
React.createElement("a-c", null);
React.createElement(Comp\u{0061}, { x: 12 });
React.createElement("abcde:abcde", { x: 12 });
React.createElement("namespace-name:tagname-tag", { x: 12 });
React.createElement("video", { "data-video": true });
React.createElement("video", { \u0073rc: "" });
React.createElement("video", { m\u0075t\u0065d: true });
React.createElement("video", { m\u{75}t\u{65}d: true });
