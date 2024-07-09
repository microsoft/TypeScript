//// [tests/cases/compiler/doubleUnderscoreReactNamespace.ts] ////

//// [index.tsx]
declare global {
    function __make (params: object): any;
}

declare var __foot: any;

const thing = <__foot />;

export {}


//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var thing = __make(__foot, null);
