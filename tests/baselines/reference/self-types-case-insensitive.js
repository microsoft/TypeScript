//// [self-types-case-insensitive.ts]
type CaseInsensitive<T extends string> =
  self extends string
    ? Lowercase<self> extends Lowercase<T>
        ? self
        : Never<[
          `Type '${Print<self>}' is not assignable to type 'CaseInsensitive<${Print<T>}>'`,
          `Type 'Lowercase<${Print<self>}>' is not assignable to 'Lowercase<${Print<T>}>'`,
          `Type '${Print<Lowercase<self>>}' is not assignable to '${Print<Lowercase<T>>}'`
        ]>
    : T

declare const setHeader: 
  (key: CaseInsensitive<"Set-Cookie" | "Accept">, value: string) => void

setHeader("Set-Cookie", "test")
setHeader("Accept", "test2")
setHeader("sEt-cOoKiE", "stop writing headers like this but ok")
setHeader("Acept", "nah this has a typo")

// TODO?: the autocompletion doesn't work, although it could be doable by
// instantiating `self` with `unknown`, at least in this case.
// Or by an alternative definition...
// type CaseInsensitive<T extends string> = T | [existing-defintion]
// the autocompletion works now but the custom error message doesn't
// get shown

type Headers =
  Record<CaseInsensitive<"set-cookie" | "accept">, string>

let headers: Headers = {
  // TODO: this is not an excess property, should compile
  "Set-Cookie": "test"
}

export {}

//// [self-types-case-insensitive.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
setHeader("Set-Cookie", "test");
setHeader("Accept", "test2");
setHeader("sEt-cOoKiE", "stop writing headers like this but ok");
setHeader("Acept", "nah this has a typo");
var headers = {
    // TODO: this is not an excess property, should compile
    "Set-Cookie": "test"
};
