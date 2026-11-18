// @target: es2015

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
