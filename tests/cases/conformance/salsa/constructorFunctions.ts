// @allowJs: true
// @checkJs: true
// @noEmit: true
// @filename: index.js

function C1() {
    if (!(this instanceof C1)) return new C1();
    this.x = 1;
}

const c1_v1 = C1();
const c1_v2 = new C1();

var C2 = function () {
    if (!(this instanceof C2)) return new C2();
    this.x = 1;
};

const c2_v1 = C2();
const c2_v2 = new C2();

/** @class */
function C3() {
    if (!(this instanceof C3)) return new C3();
};

const c3_v1 = C3();
const c3_v2 = new C3();

/** @class */
var C4 = function () {
    if (!(this instanceof C4)) return new C4();
};

const c4_v1 = C4();
const c4_v2 = new C4();