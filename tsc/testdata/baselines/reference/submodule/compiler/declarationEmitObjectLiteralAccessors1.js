//// [tests/cases/compiler/declarationEmitObjectLiteralAccessors1.ts] ////

//// [declarationEmitObjectLiteralAccessors1.ts]
// same type accessors
export const obj1 = {
  /** my awesome getter (first in source order) */
  get x(): string {
    return "";
  },
  /** my awesome setter (second in source order) */
  set x(a: string) {},
};

// divergent accessors
export const obj2 = {
  /** my awesome getter */
  get x(): string {
    return "";
  },
  /** my awesome setter */
  set x(a: number) {},
};

export const obj3 = {
  /** my awesome getter */
  get x(): string {
    return "";
  },
};

export const obj4 = {
  /** my awesome setter */
  set x(a: number) {},
};


//// [declarationEmitObjectLiteralAccessors1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obj4 = exports.obj3 = exports.obj2 = exports.obj1 = void 0;
exports.obj1 = {
    get x() {
        return "";
    },
    set x(a) { },
};
exports.obj2 = {
    get x() {
        return "";
    },
    set x(a) { },
};
exports.obj3 = {
    get x() {
        return "";
    },
};
exports.obj4 = {
    set x(a) { },
};
