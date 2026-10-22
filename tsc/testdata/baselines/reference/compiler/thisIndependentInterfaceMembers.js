//// [tests/cases/compiler/thisIndependentInterfaceMembers.ts] ////

//// [thisIndependentInterfaceMembers.ts]
// The member reuse optimization must preserve real, outer and foreign `this`.
namespace capturedOuterThis {
    class Owner {
        read() {
            type OuterMap = { readonly [K in "owner"]: this };
            interface Base extends OuterMap {}
            interface Derived extends Base { readonly derived: "derived" }
            const value = null! as Derived;
            const exact: this = value.owner;
            // @ts-expect-error The owner is not the mapped property's interface.
            const wrong: Derived = value.owner;
            return exact;
        }
    }
    class SpecialOwner extends Owner { readonly special = "special" }
    declare const owner: SpecialOwner;
    const exactOwner: SpecialOwner = owner.read();
}

namespace fluentAlias {
    interface Fluent { self(): this }
    type FluentAlias = Fluent;
    type Marker = { readonly [K in "marker"]: "marker" };
    interface Mixed extends Marker, FluentAlias {}
    interface Derived extends Mixed { readonly derived: "derived" }
    declare const value: Derived;
    const exact: Derived = value.self();
}

namespace foreignMappedThis {
    interface Foreign { self(): this; readonly foreign: "foreign" }
    type Copy<T> = { readonly [K in keyof T]: T[K] };
    interface Copied extends Copy<Foreign> {}
    interface Derived extends Copied { readonly derived: "derived" }
    declare const value: Derived;
    const exact: Foreign = value.self();
    // @ts-expect-error A concrete map does not rebind the foreign method's this.
    const wrong: Derived = value.self();
}

namespace mergedDeclarations {
    type Marker = { readonly [K in "marker"]: "marker" };
    interface Merged extends Marker {}
    interface Merged { self(): this }
    interface Derived extends Merged { readonly derived: "derived" }
    declare const value: Derived;
    const exact: Derived = value.self();
    const marker: "marker" = value.marker;

    interface Plain extends Marker {}
    interface Plain { readonly merged: "merged" }
    interface PlainDerived extends Plain { readonly derived: "derived" }
    declare const plain: PlainDerived;
    const inherited: "merged" = plain.merged;
}

namespace genericInterfaces {
    type Marker<T> = { readonly [K in "value"]: T };
    interface Generic<T> extends Marker<T> { self(): this }
    interface NumberValue extends Generic<number> { readonly numeric: "numeric" }
    interface StringValue extends Generic<string> { readonly textual: "textual" }
    declare const numeric: NumberValue;
    declare const textual: StringValue;
    const numberValue: number = numeric.value;
    const stringValue: string = textual.value;
    const exact: NumberValue = numeric.self();
    // @ts-expect-error Distinct type arguments may not share member substitutions.
    const wrong: number = textual.value;

    function enclosing<T>(input: T) {
        type OuterMap = { readonly [K in "value"]: T };
        interface Local extends OuterMap {}
        interface Derived extends Local { readonly local: "local" }
        const value = null! as Derived;
        const exact: T = value.value;
        return { input, exact };
    }
    const numericOuter: number = enclosing(1).exact;
    const stringOuter: string = enclosing("text").exact;
    // @ts-expect-error An enclosing generic remains specific to the invocation.
    const wrongOuter: number = enclosing("text").exact;
}

namespace mappedAliasArguments {
    type Value<T> = { readonly [K in "value"]: T };
    type Alias<T> = Value<T>;
    interface Generic<T> extends Alias<T> {}
    interface NumberValue extends Generic<number> {}
    interface StringValue extends Generic<string> {}
    declare const numeric: NumberValue;
    declare const textual: StringValue;
    const numberValue: number = numeric.value;
    const stringValue: string = textual.value;
    // @ts-expect-error A mapped alias must retain its variable-containing argument.
    const wrong: number = textual.value;

    interface Foreign { self(): this; readonly foreign: "foreign" }
    type Copy<T> = { readonly [K in keyof T]: T[K] };
    type ConcreteAlias = Copy<Foreign>;
    interface Copied extends ConcreteAlias {}
    interface Derived extends Copied { readonly derived: "derived" }
    declare const derived: Derived;
    const foreign: Foreign = derived.self();
    // @ts-expect-error Mapping must preserve foreign-this even behind an alias.
    const notDerived: Derived = derived.self();
}

namespace recursiveMembers {
    type Links = { readonly [K in "next"]: Node };
    interface Node extends Links { readonly value: number }
    interface Derived extends Node { readonly own: string }
    declare const value: Derived;
    const next: Node = value.next;
    const nested: number = value.next.next.value;
    // @ts-expect-error Recursive members retain the declared Node, not Derived.
    const wrong: Derived = value.next;

    // This forces lookup of a mapped member through a recursively referenced type.
    type Reenter<T> = { readonly [K in "item"]: T };
    interface Recursive extends Reenter<Recursive> { readonly own: "own" }
    interface RecursiveDerived extends Recursive { readonly more: "more" }
    declare const recursive: RecursiveDerived;
    const own: "own" = recursive.item.item.own;
    // @ts-expect-error A re-entrant lookup does not substitute a descendant.
    const wrongRecursive: RecursiveDerived = recursive.item;
}

namespace rejectedBases {
    type LeftMap = { readonly [K in "value"]: number };
    type RightMap = { readonly [K in "value"]: string };
    interface Left extends LeftMap {}
    interface Right extends RightMap {}
    // @ts-expect-error Conflicting inherited properties must still reject.
    interface Conflict extends Left, Right {}

    // @ts-expect-error A circular mapped constraint remains an error.
    type Reentered = { [K in keyof Circular]: Circular[K] };
    // @ts-expect-error Resolution placeholders must not prove valid ancestry.
    interface Circular extends Reentered { readonly own: string }

    // @ts-expect-error An unresolved mapped key still reports its error.
    type ErrorMap = { [K in MissingKey]: number };
    interface ErrorBase extends ErrorMap {}
    // @ts-expect-error The erroneous key must not erase the numeric index contract.
    interface ErrorDerived extends ErrorBase { readonly own: "own" }
}

namespace concreteMappedMembers {
    type Value<T> = { readonly [K in "value"]: T };
    interface Plain extends Value<number> {}
    interface Derived extends Plain { readonly own: "own" }
    declare const value: Derived;
    const exact: number = value.value;
    // @ts-expect-error Concrete mapped properties keep their exact type.
    const wrong: string = value.value;

    interface WithIndex { readonly [key: string]: number }
    interface IndexBase extends WithIndex {}
    interface IndexDerived extends IndexBase { readonly own: 1 }
    declare const indexed: IndexDerived;
    const entry: number = indexed["arbitrary"];

    type Callable = { (): number; readonly [K: string]: unknown };
    interface CallBase extends Callable {}
    interface CallDerived extends CallBase { readonly own: "own" }
    declare const callable: CallDerived;
    const result: number = callable();
}


//// [thisIndependentInterfaceMembers.js]
"use strict";
// The member reuse optimization must preserve real, outer and foreign `this`.
var capturedOuterThis;
(function (capturedOuterThis) {
    class Owner {
        read() {
            const value = null;
            const exact = value.owner;
            // @ts-expect-error The owner is not the mapped property's interface.
            const wrong = value.owner;
            return exact;
        }
    }
    class SpecialOwner extends Owner {
        special = "special";
    }
    const exactOwner = owner.read();
})(capturedOuterThis || (capturedOuterThis = {}));
var fluentAlias;
(function (fluentAlias) {
    const exact = value.self();
})(fluentAlias || (fluentAlias = {}));
var foreignMappedThis;
(function (foreignMappedThis) {
    const exact = value.self();
    // @ts-expect-error A concrete map does not rebind the foreign method's this.
    const wrong = value.self();
})(foreignMappedThis || (foreignMappedThis = {}));
var mergedDeclarations;
(function (mergedDeclarations) {
    const exact = value.self();
    const marker = value.marker;
    const inherited = plain.merged;
})(mergedDeclarations || (mergedDeclarations = {}));
var genericInterfaces;
(function (genericInterfaces) {
    const numberValue = numeric.value;
    const stringValue = textual.value;
    const exact = numeric.self();
    // @ts-expect-error Distinct type arguments may not share member substitutions.
    const wrong = textual.value;
    function enclosing(input) {
        const value = null;
        const exact = value.value;
        return { input, exact };
    }
    const numericOuter = enclosing(1).exact;
    const stringOuter = enclosing("text").exact;
    // @ts-expect-error An enclosing generic remains specific to the invocation.
    const wrongOuter = enclosing("text").exact;
})(genericInterfaces || (genericInterfaces = {}));
var mappedAliasArguments;
(function (mappedAliasArguments) {
    const numberValue = numeric.value;
    const stringValue = textual.value;
    // @ts-expect-error A mapped alias must retain its variable-containing argument.
    const wrong = textual.value;
    const foreign = derived.self();
    // @ts-expect-error Mapping must preserve foreign-this even behind an alias.
    const notDerived = derived.self();
})(mappedAliasArguments || (mappedAliasArguments = {}));
var recursiveMembers;
(function (recursiveMembers) {
    const next = value.next;
    const nested = value.next.next.value;
    // @ts-expect-error Recursive members retain the declared Node, not Derived.
    const wrong = value.next;
    const own = recursive.item.item.own;
    // @ts-expect-error A re-entrant lookup does not substitute a descendant.
    const wrongRecursive = recursive.item;
})(recursiveMembers || (recursiveMembers = {}));
var concreteMappedMembers;
(function (concreteMappedMembers) {
    const exact = value.value;
    // @ts-expect-error Concrete mapped properties keep their exact type.
    const wrong = value.value;
    const entry = indexed["arbitrary"];
    const result = callable();
})(concreteMappedMembers || (concreteMappedMembers = {}));
