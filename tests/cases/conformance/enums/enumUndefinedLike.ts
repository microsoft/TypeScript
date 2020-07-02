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