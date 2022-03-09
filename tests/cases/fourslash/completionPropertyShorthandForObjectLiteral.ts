/// <reference path="fourslash.ts"/>

//// declare const foo: number;
//// interface Empty {}
//// interface Typed { typed: number; }

//// declare function f1(obj): void;
//// declare function f2(obj: any): void;
//// declare function f3(obj: unknown): void;
//// declare function f4(obj: object): void;
//// declare function f5(obj: Record<string, any>): void;
//// declare function f6(obj: { [key: string]: number }): void;
//// declare function f7<T>(obj: T): void;
//// declare function f8<T extends object>(obj: T): void;
//// declare function f9<T extends {}>(obj: T): void;
//// declare function f10<T extends Empty>(obj: T): void;
//// declare function f11<T extends (Empty | Record<string, any> | {})>(obj: T): void;

//// declare function f12(obj: Typed): void;
//// declare function f13<T extends (Empty | Typed)>(obj: T): void;

//// declare function f14(obj: { [key: string]: number, prop: number }): void;

//// declare function f15(obj: Record<number, any>): void;
//// declare function f16(obj: { [key: number]: number }): void;

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

//// f1({ f1, /*17*/ });

const locals = [
    ...(() => {
        const symbols = [];
        for (let i = 1; i <= 16; i ++) {
            symbols.push(`f${i}`);
        }
        return symbols;
    })(),
    "foo"
];
verify.completions(
    // Non-contextual, any, unknown, object, Record<string, ..>, [key: string]: .., Type parameter, etc..
    { marker: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"], unsorted: completion.globalsPlus(locals), isNewIdentifierLocation: true },
    // Has named property
    { marker: ["12", "13"], exact: "typed", isNewIdentifierLocation: false },
    // Has both StringIndexType and named property
    { marker: ["14"], exact: "prop", isNewIdentifierLocation: true },
    // NumberIndexType
    { marker: ["15", "16"], exact: [], isNewIdentifierLocation: true },
    // After comma
    { marker: ["17"], unsorted: completion.globalsPlus(locals), isNewIdentifierLocation: true },
);
