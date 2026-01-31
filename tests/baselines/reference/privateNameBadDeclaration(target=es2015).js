//// [tests/cases/conformance/classes/members/privateNames/privateNameBadDeclaration.ts] ////

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
    : 1, // Error
    () { }, // Error
    get () { return ""; } // Error
};
class B {
}
B.prototype = {
    : 2, // Error
    () { }, // Error
    get () { return ""; } // Error
};
class C {
    constructor() {
        this. = 3;
    }
}
