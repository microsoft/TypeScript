/// <reference path="fourslash.ts"/>

//// declare const foo: number;
//// interface Empty {}
//// interface Typed { typed: number; }

//// declare function f1(obj: unknown): void;
//// declare function f2(obj: object): void;
//// declare function f3(obj: Object): void;
//// declare function f4(obj: Record<string, any>): void;
//// declare function f5(obj: Record<number, any>): void;
//// declare function f6(obj: { [key: string]: number }): void;
//// declare function f7(obj: { [key: string]: number, prop: number }): void;
//// declare function f8(obj: { [key: number]: number }): void;
//// declare function f9(obj: Typed): void;
//// declare function f10<T>(obj: T): void;
//// declare function f11<T extends object>(obj: T): void;
//// declare function f12<T extends Object>(obj: T): void;
//// declare function f13<T extends {}>(obj: T): void;
//// declare function f14<T extends Empty>(obj: T): void;
//// declare function f15<T extends (Empty | Record<string, any> | Object)>(obj: T): void;
//// declare function f16<T extends (Empty | Object | Typed)>(obj: T): void;

//// f1({f/*1*/});
//// f2({f/*2*/});
//// f3({f/*3*/});
//// f4({f/*4*/});
//// f5({f/*5*/});
//// f6({f/*6*/});
//// f7({f/*7*/});
//// f8({f/*8*/});
//// f9({f/*9*/});
//// f10({f/*10*/});
//// f11({f/*11*/});
//// f12({f/*12*/});
//// f13({f/*13*/});
//// f14({f/*14*/});
//// f15({f/*15*/});
//// f16({f/*16*/});

verify.completions(
    { marker: ["1", "2", "3", "4", "6", "10", "11", "12", "13", "14", "15"], includes: ["foo"]},
    { marker: ["5", "7", "8"], excludes: ["foo"], isNewIdentifierLocation: true},
    { marker: ["9", "16"], excludes: ["foo"]},
);
