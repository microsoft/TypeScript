// @target: esnext
// @noTypesAndSymbols: true

abstract class C1 {
    accessor accessor a: any;
    declare accessor b: any;
    accessor public c: any;
    accessor private d: any;
    accessor protected e: any;
    accessor abstract f: any;
    accessor static g: any;
    accessor h() {}
    accessor get i() { return false; }
    accessor set j(v: any) {}
    accessor constructor() {}
    accessor k?: any;
    accessor readonly l: any;
    accessor declare m: any;
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
