//// [tests/cases/compiler/es2022stringExportEmit_es2015.ts] ////

//// [mod.ts]
export let x = 1;
x = 2;
export { x as "y", x as ' "hello" ' }

//// [index.ts]
import { y, ' "hello" ' as Hello } from './mod'
console.log(y, Hello)
export * as " mod " from "./mod"
export {
    x as y,
    y as y2,
    x as " reexport x ",
    "x" as " reexport x2 ",
    ' "hello" ' as Hello
} from './mod'


//// [mod.js]
export var x = 1;
x = 2;
export { x as y };
//// [index.js]
const Hello = mod_1[' "hello" '];
import { y } from './mod';
import * as mod_1 from './mod';
console.log(y, Hello);
export { x as y, y as y2 } from './mod';
