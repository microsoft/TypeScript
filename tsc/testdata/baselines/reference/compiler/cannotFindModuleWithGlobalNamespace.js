//// [tests/cases/compiler/cannotFindModuleWithGlobalNamespace.ts] ////

//// [globals.d.ts]
declare module messageformat {
    export type Msg = (params: {}) => string;
}

//// [main.ts]
import MessageFormat from "messageformat";
import { something } from "not-declared-globally";


//// [main.js]
export {};
