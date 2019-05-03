class C {
    "constructor"() {} // Error in 3.5
}

class D {
    'constructor'() {} // Error in 3.5
}

class E {
    ['constructor']() {}
}

new class {
    "constructor"() {} // Error in 3.5
};

var o = { "constructor"() {} };
