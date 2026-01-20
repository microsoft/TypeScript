//// [tests/cases/compiler/declarationEmitGenericTypeParamerSerialization2.ts] ////

//// [declarationEmitGenericTypeParamerSerialization2.ts]
type ExpandRecursively<T> = {} & {
  [P in keyof T]: T[P]
}

type G<T = string> = {
  get readonlyProperty(): T;
  field: T;
  method(p: T): T;
  fnField: (p: T) => T;
  set writeOnlyProperty(p: T);
  get property(): T;
  set property(p: T);
  get divergentProperty(): string | T;
  set divergentProperty(p: number | T);
};

export const x = (() => null! as ExpandRecursively<G>)();


function makeV() {
  type X<T> = {
    get readonlyProperty(): T;
    field: T;
    method(p: T): T;
    fnField: (p: T) => T;
    set writeOnlyProperty(p: T);
    get property(): T;
    set property(p: T);
    get divergentProperty(): string | T;
    set divergentProperty(p: number | T);
   }
  return null! as X<number>
}

export const v = makeV();


//// [declarationEmitGenericTypeParamerSerialization2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.v = exports.x = void 0;
exports.x = (function () { return null; })();
function makeV() {
    return null;
}
exports.v = makeV();


//// [declarationEmitGenericTypeParamerSerialization2.d.ts]
export declare const x: {
    readonly readonlyProperty: string;
    field: string;
    method: (p: string) => string;
    fnField: (p: string) => string;
    writeOnlyProperty: string;
    property: string;
    divergentProperty: string;
};
export declare const v: {
    readonly readonlyProperty: number;
    field: number;
    method(p: number): number;
    fnField: (p: number) => number;
    writeOnlyProperty: number;
    property: number;
    get divergentProperty(): string | number;
    set divergentProperty(p: number);
};
