//// [tests/cases/conformance/esDecorators/classDeclaration/esDecorators-classDeclaration-setFunctionName.ts] ////

//// [a.ts]
declare let dec: any;

@dec class C {}

@dec class C1 {
    #field = C1;
}

@dec class C2 {
    #method() { return C2; }
}

@dec class C3 {
    get #accessor() { return C3; }
}

@dec class C4 {
    set #accessor(value: unknown) { C4; }
}

export {}

//// [b.ts]
declare let dec: any;

@dec export class C {}

//// [c.ts]
declare let dec: any;

@dec export default class C {}

//// [c.ts]
declare let dec: any;

@dec export default class {}


//// [a.js]
@dec
class C {
}
@dec
class C1 {
    #field = C1;
}
@dec
class C2 {
    #method() { return C2; }
}
@dec
class C3 {
    get #accessor() { return C3; }
}
@dec
class C4 {
    set #accessor(value) { C4; }
}
export {};
//// [b.js]
@dec
export class C {
}
//// [c.js]
@dec
export default class {
}
