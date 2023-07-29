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
