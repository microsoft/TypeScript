//// [tests/cases/conformance/esDecorators/classExpression/classSuper/esDecorators-classExpression-classSuper.2.ts] ////

//// [esDecorators-classExpression-classSuper.2.ts]
declare var dec: any;

// class expression in extends should not get an assigned name
(@dec
class C1 extends class { } {
    static {
        super.name;
    }
});

// function expression in extends should not get an assigned name
(@dec
class C2 extends (function() {} as any) {
    static {
        super.name;
    }
});

// arrow function in extends should not get an assigned name
(@dec
class C3 extends ((() => {}) as any) {
    static {
        super.name;
    }
});


//// [esDecorators-classExpression-classSuper.2.js]
// class expression in extends should not get an assigned name
(
@dec
class C1 extends class {
} {
    static {
        super.name;
    }
});
// function expression in extends should not get an assigned name
(
@dec
class C2 extends function () { } {
    static {
        super.name;
    }
});
// arrow function in extends should not get an assigned name
(
@dec
class C3 extends (() => { }) {
    static {
        super.name;
    }
});
