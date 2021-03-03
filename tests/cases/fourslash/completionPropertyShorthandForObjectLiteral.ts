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

//// declare function f17(obj: Record<symbol, any>): void;
//// declare function f18(obj: { [key: symbol]: number }): void;

//// declare function f19(obj: Record<`data-${string}`, any>): void;
//// declare function f20(obj: { [key: `data-${string}`]: number }): void;

//// declare function f21(obj: Record<string | number | symbol, any>): void;
//// declare function f22(obj: { [key: string | number | symbol]: number }): void;

//// declare function f23(obj: Record<string, any> & Record<number, any>): void;
//// declare function f24(obj: { [key: string]: number; [key: number]: number; }): void;


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

//// f17({f/*17*/});
//// f18({f/*18*/});

//// f19({f/*19*/});
//// f20({f/*20*/});

//// f21({f/*21*/});
//// f22({f/*22*/});

//// f23({f/*23*/});
//// f24({f/*24*/});

//// f1({ f1, /*f1*/ });

const locals = [
    ...(() => {
        const symbols = [];
        for (let i = 1; i <= 24; i ++) {
            symbols.push(`f${i}`);
        }
        return symbols;
    })(),
    "foo"
];
verify.completions(
    // Non-contextual, any, unknown, object, Record<string, ..>, [key: string]: .., Type parameter, etc..
    { marker: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "19", "20", "21", "22", "23", "24"], exact: completion.globalsPlus(locals), isNewIdentifierLocation: true },
    // Has named property
    { marker: ["12", "13"], exact: "typed", isNewIdentifierLocation: false },
    // Has both StringIndexType and named property
    { marker: ["14"], exact: "prop", isNewIdentifierLocation: true },
    // NumberIndexType
    { marker: ["15", "16", "17", "18"], exact: [], isNewIdentifierLocation: true },
    // After comma
    { marker: ["f1"], exact: completion.globalsPlus(locals), isNewIdentifierLocation: true },
);
