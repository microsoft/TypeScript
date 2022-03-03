//// [privateNameBadDeclaration.ts]
function A() { }
A.prototype = {
  #x: 1,         // Error
  #m() {},       // Error
  get #p() { return "" } // Error
}
class B { }
B.prototype = {
  #y: 2,         // Error
  #m() {},       // Error
  get #p() { return "" } // Error
}
class C {
  constructor() {
    this.#z = 3;
  }
}

//// [privateNameBadDeclaration.js]
function A() { }
A.prototype = {
    : 1,
    : function () { },
    get () { return ""; } // Error
};
var B = /** @class */ (function () {
    function B() {
    }
    return B;
}());
B.prototype = {
    : 2,
    : function () { },
    get () { return ""; } // Error
};
var C = /** @class */ (function () {
    function C() {
        this. = 3;
    }
    return C;
}());
