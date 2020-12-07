//// [typesMembersPatternLiteralIndexes.ts]
function f1() {
    interface AriaProps {
        [x: `aria-${string}`]: string;
    }

    const x: AriaProps = {
        "my-prop": {"whatever": "yes"},
        "aria-disabled": false // error
    };

    const y: AriaProps = {
        "my-prop": {"whatever": "yes"}, // excess
        "aria-disabled": "false" // OK
    };

    const z: AriaProps & { [x: string]: unknown } = {
        "my-prop": {"whatever": "yes"}, // OK
        "aria-disabled": "false" // OK
    };

    const a: AriaProps & { [x: string]: unknown } = {
        "my-prop": {"whatever": "yes"}, // OK
        "aria-disabled": false // error
    };
}

function f2() {
    interface SlotProxy<T> {
        readonly [idx: number]: T;
        [idx: `getSlot${number}`]: () => this[number];
        [idx: `setSlot${number}`]: (obj: this[number]) => this;
    }

    const obj = makeSlotProxy([{x: 12}, {y: 21}]);

    const obj2 = obj.setSlot2({x: 12}).setSlot0({y: 12}).getSlot1();

    function makeSlotProxy<T>(x: T[]): SlotProxy<T> {
        const result: SlotProxy<T> = {};
        for (let i = 0; i < x.length; i++) {
            Object.defineProperty(result, i, { get() { return x[i]; } });
            result[`getSlot${i}`] = () => x[i];
            result[`setSlot${i}`] = (arg) => (x[i] = arg, result);
        }
        return result;
    }
}

//// [typesMembersPatternLiteralIndexes.js]
"use strict";
function f1() {
    var x = {
        "my-prop": { "whatever": "yes" },
        "aria-disabled": false // error
    };
    var y = {
        "my-prop": { "whatever": "yes" },
        "aria-disabled": "false" // OK
    };
    var z = {
        "my-prop": { "whatever": "yes" },
        "aria-disabled": "false" // OK
    };
    var a = {
        "my-prop": { "whatever": "yes" },
        "aria-disabled": false // error
    };
}
function f2() {
    var obj = makeSlotProxy([{ x: 12 }, { y: 21 }]);
    var obj2 = obj.setSlot2({ x: 12 }).setSlot0({ y: 12 }).getSlot1();
    function makeSlotProxy(x) {
        var result = {};
        var _loop_1 = function (i) {
            Object.defineProperty(result, i, { get: function () { return x[i]; } });
            result["getSlot" + i] = function () { return x[i]; };
            result["setSlot" + i] = function (arg) { return (x[i] = arg, result); };
        };
        for (var i = 0; i < x.length; i++) {
            _loop_1(i);
        }
        return result;
    }
}
