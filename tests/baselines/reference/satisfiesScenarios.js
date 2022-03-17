//// [satisfiesScenarios.ts]
const x = [1, 2] satisfies [number, number];

interface A {
    a: string
}
let d = { a: 'test' } satisfies A;
let e = { a: 'test', b: 'test' } satisfies A;

// Most examples from #47920
namespace PropNameConstraining {
    type Keys = 'a' | 'b' | 'c' | 'd';

    const p = {
        a: 0,
        b: "hello",
        x: 8 // Should error, 'x' isn't in 'Keys'
    } satisfies Partial<Record<Keys, unknown>>;

    // Should be OK -- retain info that a is number and b is string
    let a = p.a.toFixed();
    let b = p.b.substring(1);
    // Should error even though 'd' is in 'Keys'
    let d = p.d;
}

namespace PropertyNameFulfillment {
    type Keys = 'a' | 'b' | 'c' | 'd';

    const p = {
        a: 0,
        b: "hello",
        x: 8 // Should error, 'x' isn't in 'Keys'
    } satisfies Record<Keys, unknown>;

    // Should be OK -- retain info that a is number and b is string
    let a = p.a.toFixed();
    let b = p.b.substr(1);
    // Should error even though 'd' is in 'Keys'
    let d = p.d;
}

namespace PropertyValueConformance {
    type Facts = { [key: string]: boolean };
    declare function checkTruths(x: Facts): void;
    declare function checkM(x: { m: boolean }): void;
    const x = {
        m: true
    };

    // Should be OK
    checkTruths(x);
    // Should be OK
    checkM(x);
    // Should fail under --noIndexSignaturePropertyAccess
    console.log(x.z);
    // Should be OK under --noUncheckedIndexedAccess
    const m: boolean = x.m;

    // Should be 'm'
    type M = keyof typeof x;

    // Should be able to detect a failure here
    const x2 = {
        m: true,
        s: "false"
    } satisfies Facts;
}

namespace PropertyValueConformance2 {
    export type Color = { r: number, g: number, b: number };

    // All of these should be Colors, but I only use some of them here.
    export const Palette = {
        white: { r: 255, g: 255, b: 255 },
        black: { r: 0, g: 0, d: 0 }, // <- oops! 'd' in place of 'b'
        blue: { r: 0, g: 0, b: 255 },
    } satisfies Record<string, Color>;
}

namespace EnsureInterfaceImpl {
    type Movable = {
        move(distance: number): void;
    };

    const car = {
        start() { },
        move(d) {
            // d should be number
        },
        stop() { }
    } satisfies Movable & Record<string, unknown>;
}

namespace OptionalMemberConformance {
    type Point2d = { x: number, y: number };
    // Undesirable behavior today with type annotation
    const a = { x: 10 } satisfies Partial<Point2d>;
    // Should OK
    console.log(a.x.toFixed());
    // Should error
    let p = a.y;    
}

namespace ContextualTyping {
    type Predicates = { [s: string]: (n: number) => boolean };

    const p: Predicates = {
        isEven: n => n % 2 === 0,
        isOdd: n => n % 2 === 1
    };
}

//// [satisfiesScenarios.js]
var x = [1, 2];
var d = { a: 'test' };
var e = { a: 'test', b: 'test' };
// Most examples from #47920
var PropNameConstraining;
(function (PropNameConstraining) {
    var p = {
        a: 0,
        b: "hello",
        x: 8 // Should error, 'x' isn't in 'Keys'
    };
    // Should be OK -- retain info that a is number and b is string
    var a = p.a.toFixed();
    var b = p.b.substring(1);
    // Should error even though 'd' is in 'Keys'
    var d = p.d;
})(PropNameConstraining || (PropNameConstraining = {}));
var PropertyNameFulfillment;
(function (PropertyNameFulfillment) {
    var p = {
        a: 0,
        b: "hello",
        x: 8 // Should error, 'x' isn't in 'Keys'
    };
    // Should be OK -- retain info that a is number and b is string
    var a = p.a.toFixed();
    var b = p.b.substr(1);
    // Should error even though 'd' is in 'Keys'
    var d = p.d;
})(PropertyNameFulfillment || (PropertyNameFulfillment = {}));
var PropertyValueConformance;
(function (PropertyValueConformance) {
    var x = {
        m: true
    };
    // Should be OK
    checkTruths(x);
    // Should be OK
    checkM(x);
    // Should fail under --noIndexSignaturePropertyAccess
    console.log(x.z);
    // Should be OK under --noUncheckedIndexedAccess
    var m = x.m;
    // Should be able to detect a failure here
    var x2 = {
        m: true,
        s: "false"
    };
})(PropertyValueConformance || (PropertyValueConformance = {}));
var PropertyValueConformance2;
(function (PropertyValueConformance2) {
    // All of these should be Colors, but I only use some of them here.
    PropertyValueConformance2.Palette = {
        white: { r: 255, g: 255, b: 255 },
        black: { r: 0, g: 0, d: 0 },
        blue: { r: 0, g: 0, b: 255 }
    };
})(PropertyValueConformance2 || (PropertyValueConformance2 = {}));
var EnsureInterfaceImpl;
(function (EnsureInterfaceImpl) {
    var car = {
        start: function () { },
        move: function (d) {
            // d should be number
        },
        stop: function () { }
    };
})(EnsureInterfaceImpl || (EnsureInterfaceImpl = {}));
var OptionalMemberConformance;
(function (OptionalMemberConformance) {
    // Undesirable behavior today with type annotation
    var a = { x: 10 };
    // Should OK
    console.log(a.x.toFixed());
    // Should error
    var p = a.y;
})(OptionalMemberConformance || (OptionalMemberConformance = {}));
var ContextualTyping;
(function (ContextualTyping) {
    var p = {
        isEven: function (n) { return n % 2 === 0; },
        isOdd: function (n) { return n % 2 === 1; }
    };
})(ContextualTyping || (ContextualTyping = {}));
