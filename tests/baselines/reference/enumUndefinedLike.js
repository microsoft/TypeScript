//// [enumUndefinedLike.ts]
enum SomeCombinations {
    G = 1,
    r = window,
    e = undefined,
    g = "a" - "a"
}

enum TeNormal {
    Something = 4
}

enum TeInf {
    "Infinity" = Infinity
}

enum TeNegInf {
    "-Infinity" = -Infinity
}

enum TeUndefined {
    "undefined" = undefined
}

enum TeNaN {
    "NaN" = NaN
}

enum TeCornerValues {
    "undefined" = undefined,
    "NaN" = NaN,
    "Infinity" = Infinity,
    "-Infinity" = -Infinity,
}

enum TeJoiningAltogether {
    "undefined" = NaN + Infinity - Infinity,
}

enum TeJoiningAltogetherWithMemberNameOverlap {
    "NaN" = NaN,
    "Infinity" = Infinity,
    "-Infinity" = -Infinity,
    "undefined" = NaN + Infinity - Infinity + undefined,
}

enum TeJoiningAltogetherWithMemberNameOverlapReverseOrder {
    "undefined" = undefined + NaN + Infinity - Infinity,
    "NaN" = NaN,
    "Infinity" = Infinity,
    "-Infinity" = -Infinity,
}

//// [enumUndefinedLike.js]
var SomeCombinations;
(function (SomeCombinations) {
    SomeCombinations[SomeCombinations["G"] = 1] = "G";
    SomeCombinations[SomeCombinations["r"] = window] = "r";
    SomeCombinations[SomeCombinations["e"] = undefined] = "e";
    SomeCombinations[SomeCombinations["g"] = "a" - "a"] = "g";
})(SomeCombinations || (SomeCombinations = {}));
var TeNormal;
(function (TeNormal) {
    TeNormal[TeNormal["Something"] = 4] = "Something";
})(TeNormal || (TeNormal = {}));
var TeInf;
(function (TeInf) {
    TeInf[TeInf["Infinity"] = Infinity] = "Infinity";
})(TeInf || (TeInf = {}));
var TeNegInf;
(function (TeNegInf) {
    TeNegInf[TeNegInf["-Infinity"] = -Infinity] = "-Infinity";
})(TeNegInf || (TeNegInf = {}));
var TeUndefined;
(function (TeUndefined) {
    TeUndefined[TeUndefined["undefined"] = undefined] = "undefined";
})(TeUndefined || (TeUndefined = {}));
var TeNaN;
(function (TeNaN) {
    TeNaN[TeNaN["NaN"] = NaN] = "NaN";
})(TeNaN || (TeNaN = {}));
var TeCornerValues;
(function (TeCornerValues) {
    TeCornerValues[TeCornerValues["undefined"] = undefined] = "undefined";
    TeCornerValues[TeCornerValues["NaN"] = NaN] = "NaN";
    TeCornerValues[TeCornerValues["Infinity"] = Infinity] = "Infinity";
    TeCornerValues[TeCornerValues["-Infinity"] = -Infinity] = "-Infinity";
})(TeCornerValues || (TeCornerValues = {}));
var TeJoiningAltogether;
(function (TeJoiningAltogether) {
    TeJoiningAltogether[TeJoiningAltogether["undefined"] = NaN] = "undefined";
})(TeJoiningAltogether || (TeJoiningAltogether = {}));
var TeJoiningAltogetherWithMemberNameOverlap;
(function (TeJoiningAltogetherWithMemberNameOverlap) {
    TeJoiningAltogetherWithMemberNameOverlap[TeJoiningAltogetherWithMemberNameOverlap["NaN"] = NaN] = "NaN";
    TeJoiningAltogetherWithMemberNameOverlap[TeJoiningAltogetherWithMemberNameOverlap["Infinity"] = Infinity] = "Infinity";
    TeJoiningAltogetherWithMemberNameOverlap[TeJoiningAltogetherWithMemberNameOverlap["-Infinity"] = -Infinity] = "-Infinity";
    TeJoiningAltogetherWithMemberNameOverlap[TeJoiningAltogetherWithMemberNameOverlap["undefined"] = TeJoiningAltogetherWithMemberNameOverlap.NaN + TeJoiningAltogetherWithMemberNameOverlap.Infinity - TeJoiningAltogetherWithMemberNameOverlap.Infinity + undefined] = "undefined";
})(TeJoiningAltogetherWithMemberNameOverlap || (TeJoiningAltogetherWithMemberNameOverlap = {}));
var TeJoiningAltogetherWithMemberNameOverlapReverseOrder;
(function (TeJoiningAltogetherWithMemberNameOverlapReverseOrder) {
    TeJoiningAltogetherWithMemberNameOverlapReverseOrder[TeJoiningAltogetherWithMemberNameOverlapReverseOrder["undefined"] = undefined + TeJoiningAltogetherWithMemberNameOverlapReverseOrder.NaN + TeJoiningAltogetherWithMemberNameOverlapReverseOrder.Infinity - TeJoiningAltogetherWithMemberNameOverlapReverseOrder.Infinity] = "undefined";
    TeJoiningAltogetherWithMemberNameOverlapReverseOrder[TeJoiningAltogetherWithMemberNameOverlapReverseOrder["NaN"] = NaN] = "NaN";
    TeJoiningAltogetherWithMemberNameOverlapReverseOrder[TeJoiningAltogetherWithMemberNameOverlapReverseOrder["Infinity"] = Infinity] = "Infinity";
    TeJoiningAltogetherWithMemberNameOverlapReverseOrder[TeJoiningAltogetherWithMemberNameOverlapReverseOrder["-Infinity"] = -Infinity] = "-Infinity";
})(TeJoiningAltogetherWithMemberNameOverlapReverseOrder || (TeJoiningAltogetherWithMemberNameOverlapReverseOrder = {}));
