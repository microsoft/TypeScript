//// [tests/cases/compiler/selfReferencesInParameterProperties.ts] ////

//// [selfReferencesInParameterProperties.ts]
class DirectSelfReference {
    constructor(private a: number = a) {}
}

const b = 1;
class ShadowedOuterVariable {
    constructor(public b: number = b) {}
}

class ReferenceToLaterParameter {
    constructor(readonly c: number = d, readonly d: number = 1) {}
}

class ReferenceToEarlierParameter {
    constructor(private e: number, private f: number = e) {}
}

class DeferredSelfReference {
    constructor(private g: () => number = () => g()) {}
}


//// [selfReferencesInParameterProperties.js]
"use strict";
class DirectSelfReference {
    constructor(a = a) {
        this.a = a;
    }
}
const b = 1;
class ShadowedOuterVariable {
    constructor(b = b) {
        this.b = b;
    }
}
class ReferenceToLaterParameter {
    constructor(c = d, d = 1) {
        this.c = c;
        this.d = d;
    }
}
class ReferenceToEarlierParameter {
    constructor(e, f = e) {
        this.e = e;
        this.f = f;
    }
}
class DeferredSelfReference {
    constructor(g = () => g()) {
        this.g = g;
    }
}
