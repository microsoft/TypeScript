//// [tests/cases/compiler/narrowingUnionWithBang.ts] ////

//// [narrowingUnionWithBang.ts]
type WorkingType = {
    thing?:
    { name: 'Error1', message: string } |
    { name: 'Error2', message: string } |
    { name: 'Error3', message: string } |
    { name: 'Error4', message: string } |
    { name: 'Error5', message: string } |
    { name: 'Error6', message: string } |
    { name: 'Error7', message: string } |
    { name: 'Error8', message: string } |
    { name: 'Error9', message: string } |
    { name: 'Correct', id: string }
};
const working: WorkingType = null as unknown as WorkingType;
if (working.thing!.name !== "Correct") {
    console.log(working.thing!.message)
} else {
    console.log(working.thing!.id);
}

type BorkedType = {
    thing?:
    { name: 'Error1', message: string } |
    { name: 'Error2', message: string } |
    { name: 'Error3', message: string } |
    { name: 'Error4', message: string } |
    { name: 'Error5', message: string } |
    { name: 'Error6', message: string } |
    { name: 'Error7', message: string } |
    { name: 'Error8', message: string } |
    { name: 'Correct', id: string }
};
const borked: BorkedType = null as unknown as BorkedType;
if (borked.thing!.name !== "Correct") {
    console.log(borked.thing!.message);
} else {
    console.log(borked.thing!.id);
}

export type FixedType = {
    thing?:
    { name: 'Error1', message: string } |
    { name: 'Error2', message: string } |
    { name: 'Error3', message: string } |
    { name: 'Error4', message: string } |
    { name: 'Error5', message: string } |
    { name: 'Error6', message: string } |
    { name: 'Error7', message: string } |
    { name: 'Error8', message: string } |
    { name: 'Correct', id: string }
};
const fixed: FixedType = null as unknown as FixedType;

if (fixed.thing?.name !== "Correct") {
    console.log(fixed.thing!.message);
} else {
    console.log(fixed.thing.id);
}

//// [narrowingUnionWithBang.js]
"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var working = null;
if (working.thing.name !== "Correct") {
    console.log(working.thing.message);
}
else {
    console.log(working.thing.id);
}
var borked = null;
if (borked.thing.name !== "Correct") {
    console.log(borked.thing.message);
}
else {
    console.log(borked.thing.id);
}
var fixed = null;
if (((_a = fixed.thing) === null || _a === void 0 ? void 0 : _a.name) !== "Correct") {
    console.log(fixed.thing.message);
}
else {
    console.log(fixed.thing.id);
}
