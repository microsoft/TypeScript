//// [tests/cases/conformance/jsx/unicodeEscapesInJsxtags.tsx] ////

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

// attribute name
;<video data-\u0076ideo />
;<video \u0073rc="" />


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
React.createElement("video", { "data-video": true });
React.createElement("video", { \u0073rc: "" });
