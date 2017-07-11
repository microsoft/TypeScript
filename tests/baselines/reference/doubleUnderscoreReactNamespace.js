//// [index.tsx]
declare global {
    namespace JSX {
        interface IntrinsicElements {
            __foot: any;
        }
    }
    function __make (params: object): any;
}


const thing = <__foot></__foot>;

export {}

//// [index.js]
"use strict";
exports.__esModule = true;
var thing = __make("__foot", null);
