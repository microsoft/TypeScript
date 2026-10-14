// @strict: true
// @noEmit: true

// Proof-of-concept test suite for the `inherit` type alias (issue #36165).
//
// `inherit` is a global type alias (defined in lib.es5.d.ts) that, when used with no explicit
// type arguments, is resolved contextually by the checker to the matching member type of the
// enclosing class's base class and/or implemented interfaces:
//
//   - Instance field          -> Base[Field]
//   - Method parameter         -> Parameters<Base[Field]>[Index]
//   - Method rest parameter    -> trailing tuple after `Index` leading params
//   - Method return value      -> ReturnType<Base[Field]>
//
// where Base is the intersection of the extends type and all implemented interfaces.
//
// This file is both a demonstration and an executable spec. Cases marked "SHOULD RESOLVE" are the
// intended behavior; cases marked "SHOULD ERROR" document intentional constraints. Where the
// current PoC does not yet match the intended behavior (notably `inherit` nested inside a composed
// type such as `Readonly<inherit>` or `inherit | "x"`), the baseline will reveal the gap.

interface Base {
    field: "square" | "circle";
    foo(a: number, b: string): boolean;
    bar(a: number, b: string, c?: any): boolean;
}

// ---------------------------------------------------------------------------
// 1. Baseline: every supported position, implements an interface.
// ---------------------------------------------------------------------------
class AllPositions implements Base {
    field: inherit = "square";                               // SHOULD RESOLVE: "square" | "circle"
    foo(a: inherit, b: inherit): inherit {                   // SHOULD RESOLVE: a:number, b:string, ret:boolean
        return true;
    }
    bar(a: inherit, ...rest: inherit): inherit {             // SHOULD RESOLVE: a:number, rest:[string, any?], ret:boolean
        return true;
    }
}

// ---------------------------------------------------------------------------
// 2. Equivalence with the explicit (generic) form that compiles today.
// ---------------------------------------------------------------------------
class ExplicitForm implements Base {
    field: inherit<Base, "field"> = "circle";
    foo(a: inherit<Base, "foo", "Param", 0>, b: inherit<Base, "foo", "Param", 1>): inherit<Base, "foo", "Return"> {
        return true;
    }
    bar(a: inherit<Base, "bar", "Param", 0>, ...rest: inherit<Base, "bar", "Rest", 1>): inherit<Base, "bar", "Return"> {
        return true;
    }
}

// ---------------------------------------------------------------------------
// 3. extends-only (class base, no interfaces).
// ---------------------------------------------------------------------------
class Geometry {
    model: "square" | "circle" = "square";
    render(scale: number): void {}
}
class Canvas extends Geometry {
    model: inherit = "square";                               // SHOULD RESOLVE: "square" | "circle"
    render(scale: inherit): inherit {}                       // SHOULD RESOLVE: scale:number, ret:void
}

// ---------------------------------------------------------------------------
// 4. Multiple bases: extends + implements, intersected as (Base & A & B).
// ---------------------------------------------------------------------------
interface A { a: number; shared: string; }
interface B { b: "x" | "y"; shared: string; }
class BaseC { c: boolean = true; }
class Multi extends BaseC implements A, B {
    a: inherit = 1;                                          // SHOULD RESOLVE: number
    b: inherit = "x";                                        // SHOULD RESOLVE: "x" | "y"
    c: inherit = false;                                      // SHOULD RESOLVE: boolean (from extends)
    shared: inherit = "s";                                   // SHOULD RESOLVE: string (A & B agree)
}

// ---------------------------------------------------------------------------
// 4b. Conflicting member types across interfaces narrow to their intersection.
//     Foo.shape = "square" | "circle", Bar.shape = "circle" | "triangle"
//     => (Foo & Bar)["shape"] = "circle"
// ---------------------------------------------------------------------------
interface Foo { shape: "square" | "circle"; }
interface Bar { shape: "circle" | "triangle"; }
class IntersectNarrow implements Foo, Bar {
    shape: inherit = "circle";                               // SHOULD RESOLVE: "circle" (only common member)
}
class IntersectNarrowBad implements Foo, Bar {
    shape: inherit = "square";                               // SHOULD ERROR: "square" not in the intersection "circle"
}

// ---------------------------------------------------------------------------
// 5. Composition: inherit nested inside other type constructors.
// ---------------------------------------------------------------------------
interface Robot {
    sensors: {sight?: boolean, hearing?: boolean, touch?: boolean};
    doAction(action: "walk" | "turn"): void;
}
class FlyingRobot implements Robot {
    sensors: Required<inherit> = {sight: true, hearing: false, touch: false};  // SHOULD RESOLVE: {sight: boolean, hearing: boolean, touch: boolean};
    doAction(action: inherit | "fly"): inherit {             // SHOULD RESOLVE: action:"walk"|"turn"|"fly"
    }
}

// ---------------------------------------------------------------------------
// 6. Arrow-function field: field-level inherit, params inferred by assignment.
// ---------------------------------------------------------------------------
class ArrowField implements Base {
    field: inherit = "square";
    foo: inherit = (a, b) => true;                           // SHOULD RESOLVE: foo:(a:number,b:string)=>boolean
    bar: inherit = (a, b, c) => true;
}

// ---------------------------------------------------------------------------
// 7. Negative / assignment checks: inherit must produce the NARROW type, not `any`.
// ---------------------------------------------------------------------------
class WrongField implements Base {
    field: inherit = "triangle";                             // SHOULD ERROR: not "square" | "circle"
    foo(a: inherit, b: inherit): inherit { return true; }
    bar(a: inherit, ...rest: inherit): inherit { return true; }
}
class WrongReturn implements Base {
    field: inherit = "square";
    foo(a: inherit, b: inherit): inherit { return "nope"; }  // SHOULD ERROR: string not assignable to boolean
    bar(a: inherit, ...rest: inherit): inherit { return true; }
}
class WrongParamUse implements Base {
    field: inherit = "square";
    foo(a: inherit, b: inherit): inherit {
        const s: string = a;                                 // SHOULD ERROR: number not assignable to string
        return true;
    }
    bar(a: inherit, ...rest: inherit): inherit { return true; }
}

// ---------------------------------------------------------------------------
// 8. Invalid positions / constraints.
// ---------------------------------------------------------------------------
class NoBase {
    x: inherit = 1;                                          // SHOULD ERROR: class has no base/interfaces
}

type OutsideClass = inherit;                                 // SHOULD ERROR: inherit used outside a class
