// @module: ES2015

// @filename: mod.ts
export let x = 1;
x = 2;
export { x as "y", x as ' "hello" ' }

// @filename: index.ts
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
