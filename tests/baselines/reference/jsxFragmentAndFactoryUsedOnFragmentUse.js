//// [tests/cases/compiler/jsxFragmentAndFactoryUsedOnFragmentUse.tsx] ////

//// [index.tsx]
import {element, fragment} from "./jsx";

export const a = <>fragment text</>

//// [jsx.ts]
export function element() {}

export function fragment() {}

//// [jsx.js]
export function element() { }
export function fragment() { }
//// [index.js]
import { fragment } from "./jsx";
export const a = element(fragment, null, "fragment text");
