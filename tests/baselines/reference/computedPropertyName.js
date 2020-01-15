//// [tests/cases/conformance/externalModules/typeOnly/computedPropertyName.ts] ////

//// [framework-hooks.ts]
export const onInit = Symbol("onInit");

//// [component.ts]
import type { onInit } from "./framework-hooks";

interface Component {
  [onInit]?(): void;
}


//// [framework-hooks.js]
export const onInit = Symbol("onInit");
//// [component.js]
