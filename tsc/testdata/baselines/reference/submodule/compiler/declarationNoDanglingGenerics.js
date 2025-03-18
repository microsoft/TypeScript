//// [tests/cases/compiler/declarationNoDanglingGenerics.ts] ////

//// [declarationNoDanglingGenerics.ts]
const kindCache: { [kind: string]: boolean } = {};

function register(kind: string): void | never {
  if (kindCache[kind]) {
    throw new Error(`Class with kind "${kind}" is already registered.`);
  }
  kindCache[kind] = true;
}

function ClassFactory<TKind extends string>(kind: TKind) {
  register(kind);

  return class {
    static readonly THE_KIND: TKind = kind;
    readonly kind: TKind = kind;
  };
}

class Kinds {
  static readonly A = "A";
  static readonly B = "B";
  static readonly C = "C";
}

export class AKind extends ClassFactory(Kinds.A) {
}

export class BKind extends ClassFactory(Kinds.B) {
}

export class CKind extends ClassFactory(Kinds.C) {
}

//// [declarationNoDanglingGenerics.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CKind = exports.BKind = exports.AKind = void 0;
const kindCache = {};
function register(kind) {
    if (kindCache[kind]) {
        throw new Error(`Class with kind "${kind}" is already registered.`);
    }
    kindCache[kind] = true;
}
function ClassFactory(kind) {
    register(kind);
    return class {
        static THE_KIND = kind;
        kind = kind;
    };
}
class Kinds {
    static A = "A";
    static B = "B";
    static C = "C";
}
class AKind extends ClassFactory(Kinds.A) {
}
exports.AKind = AKind;
class BKind extends ClassFactory(Kinds.B) {
}
exports.BKind = BKind;
class CKind extends ClassFactory(Kinds.C) {
}
exports.CKind = CKind;
