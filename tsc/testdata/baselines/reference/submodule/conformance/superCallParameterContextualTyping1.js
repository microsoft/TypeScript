//// [tests/cases/conformance/expressions/contextualTyping/superCallParameterContextualTyping1.ts] ////

//// [superCallParameterContextualTyping1.ts]
class A<T1, T2> {
    constructor(private map: (value: T1) => T2) {

    }
}

class B extends A<number, string> {
    // Ensure 'value' is of type 'number (and not '{}') by using its 'toExponential()' method.
    constructor() { super(value => String(value.toExponential())); }
}


//// [superCallParameterContextualTyping1.js]
class A {
    map;
    constructor(map) {
        this.map = map;
    }
}
class B extends A {
    constructor() { super(value => String(value.toExponential())); }
}
