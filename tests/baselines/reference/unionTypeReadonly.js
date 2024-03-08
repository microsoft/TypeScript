//// [tests/cases/conformance/types/union/unionTypeReadonly.ts] ////

//// [unionTypeReadonly.ts]
interface Base {
    readonly value: number;
}
interface Identical {
    readonly value: number;
}
interface Mutable {
    value: number;
}
interface DifferentType {
    readonly value: string;
}
interface DifferentName {
    readonly other: number;
}
let base: Base;
base.value = 12 // error, lhs can't be a readonly property
let identical: Base | Identical;
identical.value = 12; // error, lhs can't be a readonly property
let mutable: Base | Mutable;
mutable.value = 12; // error, lhs can't be a readonly property
let differentType: Base | DifferentType;
differentType.value = 12; // error, lhs can't be a readonly property
let differentName: Base | DifferentName;
differentName.value = 12; // error, property 'value' doesn't exist



//// [unionTypeReadonly.js]
var base;
base.value = 12; // error, lhs can't be a readonly property
var identical;
identical.value = 12; // error, lhs can't be a readonly property
var mutable;
mutable.value = 12; // error, lhs can't be a readonly property
var differentType;
differentType.value = 12; // error, lhs can't be a readonly property
var differentName;
differentName.value = 12; // error, property 'value' doesn't exist
