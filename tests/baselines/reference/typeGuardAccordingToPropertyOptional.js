//// [typeGuardAccordingToPropertyOptional.ts]
interface Foo1 {
    key1: {
        key2: number;
    } | undefined;
    f1: number;
}

interface Foo2 {
    key1: {
        key2: string
    } | undefined;
    f2: number;
}

interface Foo3 {
    key1: {
        key2: number;
    };
    f2: number;
}
type U1 = Foo1 | Foo2 | Foo3;
type U2 = Foo1 | Foo2 | Foo3 | undefined;


// unnecessary optional chain
function f1(u: U1) {
    if (typeof u?.key1 !== 'number') {
        u;  // U1
    }
    if (typeof u?.key1 === 'number') {
        u;  // never
    }
    if (typeof u?.key1 !== 'undefined') {
        u;  // U1
    }
    if (typeof u?.key1 === 'undefined') {
        u;  // Foo1 | Foo2
    }
}

// non-root optional chain
function f2(u: U1) {
    if (typeof u.key1?.key2 !== 'number') {
        u;  //Foo1 | Foo2
    }
    if (typeof u.key1?.key2 === 'number') {
        u;  //Foo1 | Foo3
    }
    if (typeof u.key1?.key2 !== 'undefined') {
        u;  //U1
    }
    if (typeof u.key1?.key2 === 'undefined') {
        u;  //Foo1 | Foo2
    }
}

function f2Plus(u: U1) {
    if (typeof u.key1?.key2 === 'undefined' && typeof u.key1?.key2 === 'number') {
        u;    //should be never, but this should be a design limit?
    }
    if (typeof u.key1?.key2 === 'undefined' || typeof u.key1?.key2 === 'number') {
        u;    //U1
    }
    if (typeof u.key1?.key2 === 'number' && typeof u.key1?.key2 === 'undefined') {
        u;    //should be never, but this should be a design limit?
    }
    if (typeof u.key1?.key2 === 'number' || typeof u.key1?.key2 === 'undefined') {
        u;    //U1
    }
    if (typeof u.key1?.key2 === 'number' || typeof u.key1?.key2 !== 'undefined') {
        u;    //U1
    }
}

// root optional chain
function f3(u: U2) {
    if (typeof u?.key1 !== 'number') {
        u;  //U2
    }
    if (typeof u?.key1 === 'number') {
        u;  //never
    }
    if (typeof u?.key1 !== 'undefined') {
        u;  //Foo1 | Foo2 | Foo3
    }
    if (typeof u?.key1 === 'undefined') {
        u;  //Foo1 | Foo2 | Undefined
    }
}

// multi optional chain
function f4(u: U2) {
    if (typeof u?.key1?.key2 !== 'number') {
        u;  //Foo1 | Foo2 | Undefined
    }
    if (typeof u?.key1?.key2 === 'number') {
        u;  //Foo1 | Foo3
    }
    if (typeof u?.key1?.key2 !== 'undefined') {
        u;  //Foo1 | Foo2 | Foo3
    }
    if (typeof u?.key1?.key2 === 'undefined') {
        u;  //Foo1 | Foo2 | Undefined
    }
}


//// [typeGuardAccordingToPropertyOptional.js]
"use strict";
// unnecessary optional chain
function f1(u) {
    if (typeof (u === null || u === void 0 ? void 0 : u.key1) !== 'number') {
        u; // U1
    }
    if (typeof (u === null || u === void 0 ? void 0 : u.key1) === 'number') {
        u; // never
    }
    if (typeof (u === null || u === void 0 ? void 0 : u.key1) !== 'undefined') {
        u; // U1
    }
    if (typeof (u === null || u === void 0 ? void 0 : u.key1) === 'undefined') {
        u; // Foo1 | Foo2
    }
}
// non-root optional chain
function f2(u) {
    var _a, _b, _c, _d;
    if (typeof ((_a = u.key1) === null || _a === void 0 ? void 0 : _a.key2) !== 'number') {
        u; //Foo1 | Foo2
    }
    if (typeof ((_b = u.key1) === null || _b === void 0 ? void 0 : _b.key2) === 'number') {
        u; //Foo1 | Foo3
    }
    if (typeof ((_c = u.key1) === null || _c === void 0 ? void 0 : _c.key2) !== 'undefined') {
        u; //U1
    }
    if (typeof ((_d = u.key1) === null || _d === void 0 ? void 0 : _d.key2) === 'undefined') {
        u; //Foo1 | Foo2
    }
}
function f2Plus(u) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    if (typeof ((_a = u.key1) === null || _a === void 0 ? void 0 : _a.key2) === 'undefined' && typeof ((_b = u.key1) === null || _b === void 0 ? void 0 : _b.key2) === 'number') {
        u; //should be never, but this should be a design limit?
    }
    if (typeof ((_c = u.key1) === null || _c === void 0 ? void 0 : _c.key2) === 'undefined' || typeof ((_d = u.key1) === null || _d === void 0 ? void 0 : _d.key2) === 'number') {
        u; //U1
    }
    if (typeof ((_e = u.key1) === null || _e === void 0 ? void 0 : _e.key2) === 'number' && typeof ((_f = u.key1) === null || _f === void 0 ? void 0 : _f.key2) === 'undefined') {
        u; //should be never, but this should be a design limit?
    }
    if (typeof ((_g = u.key1) === null || _g === void 0 ? void 0 : _g.key2) === 'number' || typeof ((_h = u.key1) === null || _h === void 0 ? void 0 : _h.key2) === 'undefined') {
        u; //U1
    }
    if (typeof ((_j = u.key1) === null || _j === void 0 ? void 0 : _j.key2) === 'number' || typeof ((_k = u.key1) === null || _k === void 0 ? void 0 : _k.key2) !== 'undefined') {
        u; //U1
    }
}
// root optional chain
function f3(u) {
    if (typeof (u === null || u === void 0 ? void 0 : u.key1) !== 'number') {
        u; //U2
    }
    if (typeof (u === null || u === void 0 ? void 0 : u.key1) === 'number') {
        u; //never
    }
    if (typeof (u === null || u === void 0 ? void 0 : u.key1) !== 'undefined') {
        u; //Foo1 | Foo2 | Foo3
    }
    if (typeof (u === null || u === void 0 ? void 0 : u.key1) === 'undefined') {
        u; //Foo1 | Foo2 | Undefined
    }
}
// multi optional chain
function f4(u) {
    var _a, _b, _c, _d;
    if (typeof ((_a = u === null || u === void 0 ? void 0 : u.key1) === null || _a === void 0 ? void 0 : _a.key2) !== 'number') {
        u; //Foo1 | Foo2 | Undefined
    }
    if (typeof ((_b = u === null || u === void 0 ? void 0 : u.key1) === null || _b === void 0 ? void 0 : _b.key2) === 'number') {
        u; //Foo1 | Foo3
    }
    if (typeof ((_c = u === null || u === void 0 ? void 0 : u.key1) === null || _c === void 0 ? void 0 : _c.key2) !== 'undefined') {
        u; //Foo1 | Foo2 | Foo3
    }
    if (typeof ((_d = u === null || u === void 0 ? void 0 : u.key1) === null || _d === void 0 ? void 0 : _d.key2) === 'undefined') {
        u; //Foo1 | Foo2 | Undefined
    }
}
