// see 'typeRelatedToDiscriminatedType' in checker.ts:

// IteratorResult
namespace Example1 {
    type S = { done: boolean, value: number };
    type T =
        | { done: true, value: number }     // T0
        | { done: false, value: number };   // T1

    declare let s: S;
    declare let t: T;

    // S is assignable to T0 when S["done"] is true
    // S is assignable to T1 when S["done"] is false
    t = s;
}

// Dropping constituents of T
namespace Example2 {
    type S = { a: 0 | 2, b: 4 };
    type T = { a: 0,     b: 1 | 4 }     // T0
           | { a: 1,     b: 2 }         // T1
           | { a: 2,     b: 3 | 4 };    // T2
    declare let s: S;
    declare let t: T;

    // S is assignable to T0 when S["a"] is 0
    // S is assignable to T2 when S["a"] is 2
    t = s;
}

// Unmatched discriminants
namespace Example3 {
    type S = { a: 0 | 2, b: 4 };
    type T = { a: 0,     b: 1 | 4 }     // T0
           | { a: 1,     b: 2 | 4 }     // T1
           | { a: 2,     b: 3 };        // T2
    declare let s: S;
    declare let t: T;

    // S is assignable to T0 when S["a"] is 0
    // S is *not* assignable to T1 when S["b"] is 4
    // S is *not* assignable to T2 when S["a"] is 2
    t = s;
}

// Unmatched non-discriminants
namespace Example4 {
    type S = { a: 0 | 2, b: 4 };
    type T = { a: 0,     b: 1 | 4 }             // T0
           | { a: 1,     b: 2 }                 // T1
           | { a: 2,     b: 3 | 4, c: string }; // T2
    declare let s: S;
    declare let t: T;

    // S is assignable to T0 when S["a"] is 0
    // S is *not* assignable to T2 when S["a"] is 2 as S is missing "c"
    t = s;
}

// Maximum discriminant combinations
namespace Example5 {
    // NOTE: The maximum number of discriminant type combinations is currently 25.
    //       3 discriminant properties with 3 types a piece
    //       is 27 possible combinations.
    type N = 0 | 1 | 2;
    type S = { a: N, b: N, c: N };
    type T = { a: 0, b: N, c: N }
           | { a: 1, b: N, c: N }
           | { a: 2, b: N, c: N }
           | { a: N, b: 0, c: N }
           | { a: N, b: 1, c: N }
           | { a: N, b: 2, c: N }
           | { a: N, b: N, c: 0 }
           | { a: N, b: N, c: 1 }
           | { a: N, b: N, c: 2 };
    declare let s: S;
    declare let t: T;

    // S *should* be assignable but the number of
    // combinations is too complex.
    t = s;
}

// https://github.com/Microsoft/TypeScript/issues/14865
namespace GH14865 {
    type Style1 = {
        type: "A";
        data: string;
    } | {
        type: "B";
        data: string;
    };

    type Style2 = {
        type: "A" | "B";
        data: string;
    }

    const a: Style2 = { type: "A", data: "whatevs" };
    let b: Style1;
    a.type; // "A" | "B"
    b.type; // "A" | "B"
    b = a; // should be assignable
}

// https://github.com/Microsoft/TypeScript/issues/30170
namespace GH30170 {
    interface Blue {
        color: 'blue'
    }
    interface Yellow {
        color?: 'yellow',
    }
    function draw(val: Blue | Yellow) { }

    function drawWithColor(currentColor: 'blue' | 'yellow' | undefined) {
        return draw({ color: currentColor });
    }
}

// https://github.com/Microsoft/TypeScript/issues/12052
namespace GH12052 {
    interface ILinearAxis { type: "linear"; }

    interface ICategoricalAxis { type: "categorical"; }

    type IAxis = ILinearAxis | ICategoricalAxis;
    type IAxisType = "linear" | "categorical";

    function getAxisType(): IAxisType {
        if (1 == 1) {
            return "categorical";
        } else {
            return "linear";
        }
    }

    const bad: IAxis = { type: getAxisType() };
    const good: IAxis = { type: undefined };
    good.type = getAxisType();
}

// https://github.com/Microsoft/TypeScript/issues/18421
namespace GH18421 {
    interface ThingTypeOne {
        type: 'one';
    }

    interface ThingTypeTwo {
        type: 'two';
    }

    type ThingType = 'one' | 'two';

    type Thing = ThingTypeOne | ThingTypeTwo;

    function makeNewThing(thingType: ThingType): Thing {
        return {
            type: thingType
        };
    }
}

// https://github.com/Microsoft/TypeScript/issues/15907
namespace GH15907 {
    type Action = { type: 'activate' } | { type: 'disactivate' };

    function dispatchAction(action: Action): void {

    }

    const active = true;

    dispatchAction({ type : (active? 'disactivate' : 'activate') });
}

// https://github.com/Microsoft/TypeScript/issues/20889
namespace GH20889 {
    interface A1 {
        type: "A1";
    }
    interface A2 {
        type: "A2";
    }
    type AU = A1 | A2;

    function foo(obj1: AU) {
        const obj2: AU = {
            type: obj1.type
        };
    }
}

// https://github.com/microsoft/TypeScript/issues/39357
namespace GH39357 {
    type A = ["a", number] | ["b", number] | ["c", string];
    type B = "a" | "b" | "c";
    declare const b: B;
    const a: A = b === "a" || b === "b" ? [b, 1] : ["c", ""];
}

// https://github.com/microsoft/TypeScript/issues/58603
namespace GH58603 {
    enum MyEnum { A = 1, B = 2 }

    type TypeA = { kind: MyEnum.A, id?: number };
    
    type TypeB = { kind: MyEnum.B } & ({ id?: undefined } | { id: number });
    
    type MyType = TypeA | TypeB;
    
    function something(a: MyType): void {}
    
    function indirect(kind: MyEnum, id?: number): void {
        something({ kind, id });
    }
    
    type Foo = { kind: "a" | "b", value: number } | { kind: "a", value: undefined } | { kind: "b", value: undefined };
    
    function test(obj: { kind: "a" | "b", value: number | undefined }) {
        let x1: Foo = obj;
        let x2: Foo = { kind: obj.kind, value: obj.value };
    }
}
