//// [tests/cases/conformance/types/typeRelationships/apparentType/apparentTypeSubtyping.ts] ////

//// [apparentTypeSubtyping.ts]
// subtype checks use the apparent type of the target type
// S is a subtype of a type T, and T is a supertype of S, if one of the following is true, where S' denotes the apparent type (section 3.8.1) of S:

class Base<U extends String> {
    x: U;
}

// is String (S) a subtype of U extends String (T)? Would only be true if we used the apparent type of U (T)
class Derived<U> extends Base<string> { // error
    x: String;
}

class Base2 {
    x: String;
    static s: String;
}

// is U extends String (S) a subtype of String (T)? Apparent type of U is String so it succeeds
class Derived2<U extends String> extends Base2 { // error because of the prototype's not matching, not because of the instance side
    x: U;
}

//// [apparentTypeSubtyping.js]
// subtype checks use the apparent type of the target type
// S is a subtype of a type T, and T is a supertype of S, if one of the following is true, where S' denotes the apparent type (section 3.8.1) of S:
class Base {
    x;
}
// is String (S) a subtype of U extends String (T)? Would only be true if we used the apparent type of U (T)
class Derived extends Base {
    x;
}
class Base2 {
    x;
    static s;
}
// is U extends String (S) a subtype of String (T)? Apparent type of U is String so it succeeds
class Derived2 extends Base2 {
    x;
}
