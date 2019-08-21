//// [selfReferentialTypeAliases.ts]
type HypertextNode = string | [string, { [key: string]: any }, ...HypertextNode[]];

const hypertextNode: HypertextNode =
    ["div", { id: "parent" },
        ["div", { id: "first-child" }, "I'm the first child"],
        ["div", { id: "second-child" }, "I'm the second child"]
    ];

type Alternating<T> = [T, Alternating<T extends string ? number : string>?];

declare function reparam<T>(x: Alternating<T>): T;

// inference for this alternating reference pattern is.... interesting.
const re1 = reparam([12]);
const re2 = reparam(["ok"]);
const re3 = reparam([12, ["ok"]]);
const re4 = reparam(["ok", [12]]);
const re5 = reparam([12, ["ok", [0]]]);
const re6 = reparam(["ok", [12, ["k"]]]);
const re7 = reparam([12, "not ok"]); // arity error
const re8 = reparam(["ok", [12, ["ok", [12, "not ok"]]]]); // deep arity error
const re9 = reparam([12, [12]]); // non-alternating
const re10 = reparam(["ok", [12, ["ok", [12, ["ok", ["not ok"]]]]]]); // deep non-alternating - we should strive to issue an error here, I think, but we infer `string | number` for T and do not



//// [selfReferentialTypeAliases.js]
var hypertextNode = ["div", { id: "parent" },
    ["div", { id: "first-child" }, "I'm the first child"],
    ["div", { id: "second-child" }, "I'm the second child"]
];
// inference for this alternating reference pattern is.... interesting.
var re1 = reparam([12]);
var re2 = reparam(["ok"]);
var re3 = reparam([12, ["ok"]]);
var re4 = reparam(["ok", [12]]);
var re5 = reparam([12, ["ok", [0]]]);
var re6 = reparam(["ok", [12, ["k"]]]);
var re7 = reparam([12, "not ok"]); // arity error
var re8 = reparam(["ok", [12, ["ok", [12, "not ok"]]]]); // deep arity error
var re9 = reparam([12, [12]]); // non-alternating
var re10 = reparam(["ok", [12, ["ok", [12, ["ok", ["not ok"]]]]]]); // deep non-alternating - we should strive to issue an error here, I think, but we infer `string | number` for T and do not
