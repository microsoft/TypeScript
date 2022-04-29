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
