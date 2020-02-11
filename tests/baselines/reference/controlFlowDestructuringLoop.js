//// [controlFlowDestructuringLoop.ts]
// Repro from #28758

interface NumVal { val: number; }
interface StrVal { val: string; }
type Val = NumVal | StrVal;

function isNumVal(x: Val): x is NumVal {
    return typeof x.val === 'number';
}

function foo(things: Val[]): void {
    for (const thing of things) {
        if (isNumVal(thing)) {
            const { val } = thing;
            val.toFixed(2);
        }
        else {
            const { val } = thing;
            val.length;
        }
    }
}

//// [controlFlowDestructuringLoop.js]
"use strict";
// Repro from #28758
function isNumVal(x) {
    return typeof x.val === 'number';
}
function foo(things) {
    for (var _i = 0, things_1 = things; _i < things_1.length; _i++) {
        var thing = things_1[_i];
        if (isNumVal(thing)) {
            var val = thing.val;
            val.toFixed(2);
        }
        else {
            var val = thing.val;
            val.length;
        }
    }
}
