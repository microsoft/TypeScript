class C {
    "constructor"() {
        console.log(this);
    }
}

class D {
    'constructor'() {
        console.log(this);
    }
}

class E {
    ['constructor']() {
        console.log(this);
    }
}

new class {
    "constructor"() {
        console.log(this);
    }
};

var o = { "constructor"() {} };

class F {
    "\x63onstructor"() {
        console.log(this);
    }
}
