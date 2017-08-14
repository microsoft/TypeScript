//// [moduleAliasInterface.ts]
module _modes {
 export interface IMode {
  
 }
 
 export class Mode {
  
 }
}

// _modes. // produces an internal error - please implement in derived class

module editor {
 import modes = _modes;
 
 var i : modes.IMode;
  
 // If you just use p1:modes, the compiler accepts it - should be an error
 class Bug { 
  constructor(p1: modes.IMode, p2: modes.Mode) { }// should be an error on p2 - it's not exported
  public foo(p1:modes.IMode) {
   
  } 
 }
}

import modesOuter = _modes;
module editor2 {
 
 var i : modesOuter.IMode;
 
 class Bug {
     constructor(p1: modesOuter.IMode, p2: modesOuter.Mode) { }// no error here, since modesOuter is declared externally
  
 }
 
  module Foo { export class Bar{} }
 
  class Bug2 {
      constructor(p1: Foo.Bar, p2: modesOuter.Mode) { }
  }
}

module A1 {
    export interface A1I1 {}
    export class A1C1 {}
}

module B1 {
    import A1Alias1 = A1;
    
    var i : A1Alias1.A1I1;   
    var c : A1Alias1.A1C1;
}


//// [moduleAliasInterface.js]
var _modes;
(function (_modes) {
    var Mode = /** @class */ (function () {
        function Mode() {
        }
        return Mode;
    }());
    _modes.Mode = Mode;
})(_modes || (_modes = {}));
// _modes. // produces an internal error - please implement in derived class
var editor;
(function (editor) {
    var i;
    // If you just use p1:modes, the compiler accepts it - should be an error
    var Bug = /** @class */ (function () {
        function Bug(p1, p2) {
        } // should be an error on p2 - it's not exported
        Bug.prototype.foo = function (p1) {
        };
        return Bug;
    }());
})(editor || (editor = {}));
var modesOuter = _modes;
var editor2;
(function (editor2) {
    var i;
    var Bug = /** @class */ (function () {
        function Bug(p1, p2) {
        } // no error here, since modesOuter is declared externally
        return Bug;
    }());
    var Foo;
    (function (Foo) {
        var Bar = /** @class */ (function () {
            function Bar() {
            }
            return Bar;
        }());
        Foo.Bar = Bar;
    })(Foo || (Foo = {}));
    var Bug2 = /** @class */ (function () {
        function Bug2(p1, p2) {
        }
        return Bug2;
    }());
})(editor2 || (editor2 = {}));
var A1;
(function (A1) {
    var A1C1 = /** @class */ (function () {
        function A1C1() {
        }
        return A1C1;
    }());
    A1.A1C1 = A1C1;
})(A1 || (A1 = {}));
var B1;
(function (B1) {
    var i;
    var c;
})(B1 || (B1 = {}));
