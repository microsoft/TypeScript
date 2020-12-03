//// [assignmentCompatWithDiscriminatedUnion.ts]
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


//// [assignmentCompatWithDiscriminatedUnion.js]
// see 'typeRelatedToDiscriminatedType' in checker.ts:
// IteratorResult
var Example1;
(function (Example1) {
    // S is assignable to T0 when S["done"] is true
    // S is assignable to T1 when S["done"] is false
    t = s;
})(Example1 || (Example1 = {}));
// Dropping constituents of T
var Example2;
(function (Example2) {
    // S is assignable to T0 when S["a"] is 0
    // S is assignable to T2 when S["a"] is 2
    t = s;
})(Example2 || (Example2 = {}));
// Unmatched discriminants
var Example3;
(function (Example3) {
    // S is assignable to T0 when S["a"] is 0
    // S is *not* assignable to T1 when S["b"] is 4
    // S is *not* assignable to T2 when S["a"] is 2
    t = s;
})(Example3 || (Example3 = {}));
// Unmatched non-discriminants
var Example4;
(function (Example4) {
    // S is assignable to T0 when S["a"] is 0
    // S is *not* assignable to T2 when S["a"] is 2 as S is missing "c"
    t = s;
})(Example4 || (Example4 = {}));
// Maximum discriminant combinations
var Example5;
(function (Example5) {
    // S *should* be assignable but the number of
    // combinations is too complex.
    t = s;
})(Example5 || (Example5 = {}));
// https://github.com/Microsoft/TypeScript/issues/14865
var GH14865;
(function (GH14865) {
    var a = { type: "A", data: "whatevs" };
    var b;
    a.type; // "A" | "B"
    b.type; // "A" | "B"
    b = a; // should be assignable
})(GH14865 || (GH14865 = {}));
// https://github.com/Microsoft/TypeScript/issues/30170
var GH30170;
(function (GH30170) {
    function draw(val) { }
    function drawWithColor(currentColor) {
        return draw({ color: currentColor });
    }
})(GH30170 || (GH30170 = {}));
// https://github.com/Microsoft/TypeScript/issues/12052
var GH12052;
(function (GH12052) {
    function getAxisType() {
        if (1 == 1) {
            return "categorical";
        }
        else {
            return "linear";
        }
    }
    var bad = { type: getAxisType() };
    var good = { type: undefined };
    good.type = getAxisType();
})(GH12052 || (GH12052 = {}));
// https://github.com/Microsoft/TypeScript/issues/18421
var GH18421;
(function (GH18421) {
    function makeNewThing(thingType) {
        return {
            type: thingType
        };
    }
})(GH18421 || (GH18421 = {}));
// https://github.com/Microsoft/TypeScript/issues/15907
var GH15907;
(function (GH15907) {
    function dispatchAction(action) {
    }
    var active = true;
    dispatchAction({ type: (active ? 'disactivate' : 'activate') });
})(GH15907 || (GH15907 = {}));
// https://github.com/Microsoft/TypeScript/issues/20889
var GH20889;
(function (GH20889) {
    function foo(obj1) {
        var obj2 = {
            type: obj1.type
        };
    }
})(GH20889 || (GH20889 = {}));
// https://github.com/microsoft/TypeScript/issues/39357
var GH39357;
(function (GH39357) {
    var a = b === "a" || b === "b" ? [b, 1] : ["c", ""];
})(GH39357 || (GH39357 = {}));
