//// [tests/cases/conformance/types/uniqueSymbol/uniqueSymbolsPropertyNames.ts] ////

//// [uniqueSymbolsPropertyNames.ts]
interface OpTypes {
  readonly equal: unique symbol;
}

namespace OpNamespace {
  export declare const equal: unique symbol;
}

const uniqueSymbol0 = Symbol.for("");
const uniqueSymbol1 = Symbol.for("");


function getUniqueSymbol0(): typeof uniqueSymbol0 {
  return uniqueSymbol0;
}

function getUniqueSymbol1(): typeof uniqueSymbol1 {
    return uniqueSymbol1;
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

const t3 = {
  [getUniqueSymbol0()]: "first",
  [getUniqueSymbol0()]: "last",
  [getUniqueSymbol1()]: "first",
  [getUniqueSymbol1()]: "last",
};

class Cls1 {
  [uniqueSymbol0] = "first";
  [uniqueSymbol0] = "last";
  [uniqueSymbol1] = "first";
  [uniqueSymbol1] = "last";
}

class Cls2 {
  [OpNamespace.equal] = "first";
  [OpNamespace.equal] = "last";
}

class Cls3 {
  [getUniqueSymbol0()] = "first";
  [getUniqueSymbol0()] = "last";
  [getUniqueSymbol1()] = "first";
  [getUniqueSymbol1()] = "last";
}

//// [uniqueSymbolsPropertyNames.js]
var OpNamespace;
(function (OpNamespace) {
})(OpNamespace || (OpNamespace = {}));
const uniqueSymbol0 = Symbol.for("");
const uniqueSymbol1 = Symbol.for("");
function getUniqueSymbol0() {
    return uniqueSymbol0;
}
function getUniqueSymbol1() {
    return uniqueSymbol1;
}
const Op = {
    equal: Symbol.for("equal"),
};
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
const t3 = {
    [getUniqueSymbol0()]: "first",
    [getUniqueSymbol0()]: "last",
    [getUniqueSymbol1()]: "first",
    [getUniqueSymbol1()]: "last",
};
class Cls1 {
    [uniqueSymbol0] = "first";
    [uniqueSymbol0] = "last";
    [uniqueSymbol1] = "first";
    [uniqueSymbol1] = "last";
}
class Cls2 {
    [OpNamespace.equal] = "first";
    [OpNamespace.equal] = "last";
}
class Cls3 {
    [getUniqueSymbol0()] = "first";
    [getUniqueSymbol0()] = "last";
    [getUniqueSymbol1()] = "first";
    [getUniqueSymbol1()] = "last";
}
