// @target: esnext,es2017
// @noTypesAndSymbols: true

abstract class C1 {
    accessor accessor a: any;
    readonly accessor b: any;
    declare accessor c: any;
    accessor public d: any;
    accessor private e: any;
    accessor protected f: any;
    accessor abstract g: any;
    accessor static h: any;
    accessor i() {}
    accessor get j() { return false; }
    accessor set k(v: any) {}
    accessor constructor() {}
    accessor l?: any;
    accessor readonly m: any;
    accessor declare n: any;
}

class C2 extends C1 {
    accessor override g: any;
}

interface I1 {
    accessor a: number;
}

accessor class C3 {}
accessor interface I2 {}
accessor namespace N1 {}
accessor enum E1 {}
accessor var V1: any;
accessor type T1 = never;
accessor function F1() {}
accessor import "x";
accessor import {} from "x";
accessor export { V1 };
accessor export default V1;
accessor import N2 = N1;
