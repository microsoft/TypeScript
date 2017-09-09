// @declaration: true
// all of these test `match` in basic scenarios where we can eagerly compute the resulting type.

// empty
declare const A: 1 match {
};

// only else
declare const B: 1 match {
    else: "else"
};

// only one exact match, no else
declare const C: 1 match {
    1: "1"
};

// only one subtype match, no else
declare const D: 1 match {
    number: "number"
};

// multiple possible subtype matches, no else
declare const E: 1 match {
    1 | 2: "1 | 2",
    number: "number"
};

// multiple possible matches (subtype match first), no else
declare const F: 1 match {
    1 | 2: "1 | 2",
    1: "1",
    number: "number"
};

// no match, no else
declare const G: 1 match {
    string: "string"
};

// no match, else
declare const H: 1 match {
    string: "string",
    else: "else"
};

// union, both match, no else
declare const I: (1 | 2) match {
    1: "1",
    2: "2"
};

// union, one match, no else
declare const J: (1 | 2) match {
    1: "1"
};

// union, one match, else
declare const K: (1 | 2) match {
    1: "1",
    else: "else"
};
