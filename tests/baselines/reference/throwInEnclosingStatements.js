//// [tests/cases/conformance/statements/throwStatements/throwInEnclosingStatements.ts] ////

//// [throwInEnclosingStatements.ts]
function fn(x) {
    throw x;
}

<T>(x: T) => { throw x; }

var y: string;
switch (y) {
    case 'a':
        throw y;
    default:
        throw y;
}

var z = 0;
while (z < 10) {
    throw z;
}

for (var i = 0; ;) { throw i; }

for (var idx in {}) { throw idx; }

do { throw null; }while(true)

var j = 0;
while (j < 0) { throw j; }

class C<T> {
    private value: T;
    biz() {
        throw this.value;
    }

    constructor() {
        throw this;
    }
}

var aa = {
    id:12,
    biz() {
        throw this;
    }
}


//// [throwInEnclosingStatements.js]
function fn(x) {
    throw x;
}
(function (x) { throw x; });
var y;
switch (y) {
    case 'a':
        throw y;
    default:
        throw y;
}
var z = 0;
while (z < 10) {
    throw z;
}
for (var i = 0;;) {
    throw i;
}
for (var idx in {}) {
    throw idx;
}
do {
    throw null;
} while (true);
var j = 0;
while (j < 0) {
    throw j;
}
var C = /** @class */ (function () {
    function C() {
        throw this;
    }
    C.prototype.biz = function () {
        throw this.value;
    };
    return C;
}());
var aa = {
    id: 12,
    biz: function () {
        throw this;
    }
};
