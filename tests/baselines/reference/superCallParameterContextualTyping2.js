//// [tests/cases/conformance/expressions/contextualTyping/superCallParameterContextualTyping2.ts] ////

//// [superCallParameterContextualTyping2.ts]
class A<T1, T2> {
    constructor(private map: (value: T1) => T2) {

    }
}

class C extends A<number, string> {
    // Ensure 'value' is not of type 'any' by invoking it with type arguments.
    constructor() { super(value => String(value<string>())); }
}

//// [superCallParameterContextualTyping2.js]
class A {
    map;
    constructor(map) {
        this.map = map;
    }
}
class C extends A {
    // Ensure 'value' is not of type 'any' by invoking it with type arguments.
    constructor() { super(value => String(value())); }
}
