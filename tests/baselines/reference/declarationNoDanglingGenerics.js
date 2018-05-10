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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var kindCache = {};
function register(kind) {
    if (kindCache[kind]) {
        throw new Error("Class with kind \"" + kind + "\" is already registered.");
    }
    kindCache[kind] = true;
}
function ClassFactory(kind) {
    var _a;
    register(kind);
    return _a = /** @class */ (function () {
            function class_1() {
                this.kind = kind;
            }
            return class_1;
        }()),
        _a.THE_KIND = kind,
        _a;
}
var Kinds = /** @class */ (function () {
    function Kinds() {
    }
    Kinds.A = "A";
    Kinds.B = "B";
    Kinds.C = "C";
    return Kinds;
}());
var AKind = /** @class */ (function (_super) {
    __extends(AKind, _super);
    function AKind() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AKind;
}(ClassFactory(Kinds.A)));
exports.AKind = AKind;
var BKind = /** @class */ (function (_super) {
    __extends(BKind, _super);
    function BKind() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BKind;
}(ClassFactory(Kinds.B)));
exports.BKind = BKind;
var CKind = /** @class */ (function (_super) {
    __extends(CKind, _super);
    function CKind() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CKind;
}(ClassFactory(Kinds.C)));
exports.CKind = CKind;


//// [declarationNoDanglingGenerics.d.ts]
declare const AKind_base: {
    new (): {
        readonly kind: "A";
    };
    readonly THE_KIND: "A";
};
export declare class AKind extends AKind_base {
}
declare const BKind_base: {
    new (): {
        readonly kind: "B";
    };
    readonly THE_KIND: "B";
};
export declare class BKind extends BKind_base {
}
declare const CKind_base: {
    new (): {
        readonly kind: "C";
    };
    readonly THE_KIND: "C";
};
export declare class CKind extends CKind_base {
}
export {};
