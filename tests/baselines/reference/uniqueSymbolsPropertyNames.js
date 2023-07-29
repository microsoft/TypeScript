//// [tests/cases/conformance/types/uniqueSymbol/uniqueSymbolsPropertyNames.ts] ////

//// [uniqueSymbolsPropertyNames.ts]
interface OpTypes {
  readonly equal: unique symbol;
}

namespace OpNamespace {
  export declare const equal: unique symbol;
}

const Op: OpTypes = {
  equal: Symbol.for("equal"),
} as OpTypes;

const t0 = {
  equal: "first",
  equal: "second",
  ["equal"]: "last",
};

const t1 = {
  [Op.equal]: "first",
  [Op.equal]: "last",
};

const t2 = {
  [OpNamespace.equal]: "first",
  [OpNamespace.equal]: "last",
};


//// [uniqueSymbolsPropertyNames.js]
var _a, _b, _c;
var OpNamespace;
(function (OpNamespace) {
})(OpNamespace || (OpNamespace = {}));
var Op = {
    equal: Symbol.for("equal"),
};
var t0 = (_a = {
        equal: "first",
        equal: "second"
    },
    _a["equal"] = "last",
    _a);
var t1 = (_b = {},
    _b[Op.equal] = "first",
    _b[Op.equal] = "last",
    _b);
var t2 = (_c = {},
    _c[OpNamespace.equal] = "first",
    _c[OpNamespace.equal] = "last",
    _c);
