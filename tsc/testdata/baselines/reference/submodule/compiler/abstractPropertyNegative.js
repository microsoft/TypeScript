//// [tests/cases/compiler/abstractPropertyNegative.ts] ////

//// [abstractPropertyNegative.ts]
interface A {
    prop: string;
    m(): string;
}
abstract class B implements A {
    abstract prop: string;
    public abstract readonly ro: string;
    abstract get readonlyProp(): string;
    abstract m(): string;
    abstract get mismatch(): string;
    abstract set mismatch(val: number);
}
class C extends B {
    readonly ro = "readonly please";
    abstract notAllowed: string;
    get concreteWithNoBody(): string;
}
let c = new C();
c.ro = "error: lhs of assignment can't be readonly";

abstract class WrongTypeProperty {
    abstract num: number;
}
class WrongTypePropertyImpl extends WrongTypeProperty {
    num = "nope, wrong";
}
abstract class WrongTypeAccessor {
    abstract get num(): number;
}
class WrongTypeAccessorImpl extends WrongTypeAccessor {
    get num() { return "nope, wrong"; }
}
class WrongTypeAccessorImpl2 extends WrongTypeAccessor {
    num = "nope, wrong";
}

abstract class AbstractAccessorMismatch {
    abstract get p1(): string;
    set p1(val: string) { };
    get p2(): string { return "should work"; }
    abstract set p2(val: string);
}


//// [abstractPropertyNegative.js]
class B {
    prop;
    ro;
}
class C extends B {
    ro = "readonly please";
    notAllowed;
}
let c = new C();
c.ro = "error: lhs of assignment can't be readonly";
class WrongTypeProperty {
    num;
}
class WrongTypePropertyImpl extends WrongTypeProperty {
    num = "nope, wrong";
}
class WrongTypeAccessor {
}
class WrongTypeAccessorImpl extends WrongTypeAccessor {
    get num() { return "nope, wrong"; }
}
class WrongTypeAccessorImpl2 extends WrongTypeAccessor {
    num = "nope, wrong";
}
class AbstractAccessorMismatch {
    set p1(val) { }
    ;
    get p2() { return "should work"; }
}
