//// [tests/cases/conformance/esDecorators/classDeclaration/esDecorators-classDeclaration-parameterDecorators.ts] ////

//// [esDecorators-classDeclaration-parameterDecorators.ts]
declare let dec: any;

class C {
    constructor(@dec x: any) {}
    method(@dec x: any) {}
    set x(@dec x: any) {}
    static method(@dec x: any) {}
    static set x(@dec x: any) {}
}

(class C {
    constructor(@dec x: any) {}
    method(@dec x: any) {}
    set x(@dec x: any) {}
    static method(@dec x: any) {}
    static set x(@dec x: any) {}
});

//// [esDecorators-classDeclaration-parameterDecorators.js]
class C {
    constructor(
    @dec
    x) { }
    method(
    @dec
    x) { }
    set x(
    @dec
    x) { }
    static method(
    @dec
    x) { }
    static set x(
    @dec
    x) { }
}
(class C {
    constructor(
    @dec
    x) { }
    method(
    @dec
    x) { }
    set x(
    @dec
    x) { }
    static method(
    @dec
    x) { }
    static set x(
    @dec
    x) { }
});
