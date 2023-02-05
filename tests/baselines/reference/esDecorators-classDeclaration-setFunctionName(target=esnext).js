//// [tests/cases/conformance/esDecorators/classDeclaration/esDecorators-classDeclaration-setFunctionName.ts] ////

//// [a.ts]
declare let dec: any;

@dec class C {}

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
export {};
//// [b.js]
@dec
export class C {
}
//// [c.js]
@dec
export default class {
}
