//// [tests/cases/compiler/escapedClassFieldModifiers.ts] ////

//// [escapedClassFieldModifiers.ts]
class UnicodeEscapes {
    g\u0065t
    getMethod() {}
    s\u0065t
    setField = 1;
    st\u0061tic
    staticMethod() {}
}

class ExtendedUnicodeEscapes {
    g\u{65}t
    getMethod() {}
    s\u{65}t
    setField = 1;
    st\u{61}tic
    staticMethod() {}
}

const unicode = new UnicodeEscapes();
unicode.get;
unicode.set;
unicode.static;
unicode.getMethod();
unicode.staticMethod();

const extended = new ExtendedUnicodeEscapes();
extended.get;
extended.set;
extended.static;
extended.getMethod();
extended.staticMethod();

class UnescapedModifiers {
    get
    value() { return 1; }
    set
    value(v: number) {}
    static
    method() {}
}

class EscapedMemberNames {
    g\u0065t() {}
    s\u{65}t() {}
    st\u0061tic() {}
}

class InvalidEscapedModifiers {
    g\u0065t value() { return 1; }
    s\u{65}t value(v: number) {}
    st\u0061tic method() {}
}


//// [escapedClassFieldModifiers.js]
"use strict";
class UnicodeEscapes {
    g\u0065t;
    getMethod() { }
    s\u0065t;
    setField = 1;
    st\u0061tic;
    staticMethod() { }
}
class ExtendedUnicodeEscapes {
    g\u{65}t;
    getMethod() { }
    s\u{65}t;
    setField = 1;
    st\u{61}tic;
    staticMethod() { }
}
const unicode = new UnicodeEscapes();
unicode.get;
unicode.set;
unicode.static;
unicode.getMethod();
unicode.staticMethod();
const extended = new ExtendedUnicodeEscapes();
extended.get;
extended.set;
extended.static;
extended.getMethod();
extended.staticMethod();
class UnescapedModifiers {
    get value() { return 1; }
    set value(v) { }
    static method() { }
}
class EscapedMemberNames {
    g\u0065t() { }
    s\u{65}t() { }
    st\u0061tic() { }
}
class InvalidEscapedModifiers {
    get value() { return 1; }
    set value(v) { }
    static method() { }
}
