//// [tests/cases/compiler/declarationEmitGenericTypeParamerSerialization.ts] ////

//// [declarationEmitGenericTypeParamerSerialization.ts]
function wrapper<T>(value: T) {
  return {
      m() { return value; },
      get g() { return value; },
  }
}

export const w = wrapper(0)


//// [declarationEmitGenericTypeParamerSerialization.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.w = void 0;
function wrapper(value) {
    return {
        m: function () { return value; },
        get g() { return value; },
    };
}
exports.w = wrapper(0);


//// [declarationEmitGenericTypeParamerSerialization.d.ts]
export declare const w: {
    m(): number;
    readonly g: number;
};
