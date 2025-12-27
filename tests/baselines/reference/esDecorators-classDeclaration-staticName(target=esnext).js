//// [tests/cases/conformance/esDecorators/classDeclaration/esDecorators-classDeclaration-staticName.ts] ////

//// [esDecorators-classDeclaration-staticName.ts]
declare let dec: any;

@dec class A {
    static get name() { return 123; }
}

@dec class B {
    static name() { return 456; }
}

var C = @dec class {
    static get name() { return 789; }
};

@dec class D {}

@dec class E {
    static name = "custom";
}


//// [esDecorators-classDeclaration-staticName.js]
@dec
class A {
    static get name() { return 123; }
}
@dec
class B {
    static name() { return 456; }
}
var C = 
@dec
class {
    static get name() { return 789; }
};
@dec
class D {
}
@dec
class E {
    static name = "custom";
}
