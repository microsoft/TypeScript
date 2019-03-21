//// [intersectionOfCallsWithSameParameters.ts]
interface One {
    overload(id: string): { one: number };
    intersect(id: string): { one: number };
}

interface Two {
    overload(id: number): { two: number };
    intersect(id: string): { two: number };
}

class Both implements One, Two {
    overload(id: number): { two: number };
    overload(id: string): { one: number };
    overload(id: string | number): { one: number, two: number } {
        return {
            one: 1,
            two: 2
        };
    }

    intersect(id: string): { one: number, two: number } {
        return {
            one: 1,
            two: 2
        };
    }
}

const b = new Both();
const intersect: { one: number, two: number } = b.intersect('test');
const overloadA: { one: number } = b.overload('test');
const overloadB: { two: number } = b.overload(4);
const bAs: One & Two = b;
const asIntersect: { one: number, two: number } = bAs.intersect('test');
const asOverloadA: { one: number } = bAs.overload('test');
const asOverloadB: { two: number } = bAs.overload(4);


//// [intersectionOfCallsWithSameParameters.js]
"use strict";
var Both = /** @class */ (function () {
    function Both() {
    }
    Both.prototype.overload = function (id) {
        return {
            one: 1,
            two: 2
        };
    };
    Both.prototype.intersect = function (id) {
        return {
            one: 1,
            two: 2
        };
    };
    return Both;
}());
var b = new Both();
var intersect = b.intersect('test');
var overloadA = b.overload('test');
var overloadB = b.overload(4);
var bAs = b;
var asIntersect = bAs.intersect('test');
var asOverloadA = bAs.overload('test');
var asOverloadB = bAs.overload(4);
