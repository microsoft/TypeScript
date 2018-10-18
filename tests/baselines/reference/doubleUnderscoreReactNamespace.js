//// [index.tsx]
declare global {
    function __make (params: object): any;
}

declare var __foot: any;

const thing = <__foot />;

export {}


//// [index.js]
"use strict";
exports.__esModule = true;
var thing = __make(__foot, null);
