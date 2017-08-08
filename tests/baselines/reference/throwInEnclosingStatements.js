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
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true, writable: false, enumerable: false
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
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
var C = (function () {
    function C() {
        throw this;
    }
    C.prototype.biz = function () {
        throw this.value;
    };
    __names(C.prototype, ["biz"]);
    return C;
}());
var aa = {
    id: 12,
    biz: function () {
        throw this;
    }
};
