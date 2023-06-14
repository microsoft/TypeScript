//// [tests/cases/compiler/es2022stringExportEmit_es2022.ts] ////

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
export { x as "y", x as ' "hello" ' };
//// [index.js]
import { y, ' "hello" ' as Hello } from './mod';
console.log(y, Hello);
export * as " mod " from "./mod";
export { x as y, y as y2, x as " reexport x ", "x" as " reexport x2 ", ' "hello" ' as Hello } from './mod';
