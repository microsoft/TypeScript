//// [tests/cases/compiler/moduleMemberMissingErrorIsRelative.ts] ////

//// [foo.ts]
export {};
//// [bar.ts]
import {nosuch} from './foo';

//// [foo.js]
export {};
//// [bar.js]
export {};
