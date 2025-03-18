//// [tests/cases/compiler/moduleVisibilityTest3.ts] ////

//// [moduleVisibilityTest3.ts]
module _modes {
 export interface IMode {
  
 }
 
 class Mode {
  
 }
}

//_modes. // produces an internal error - please implement in derived class

module editor {
 import modes = _modes;
 
 var i : modes.IMode;
  
 // If you just use p1:modes, the compiler accepts it - should be an error
 class Bug {
     constructor(p1: modes, p2: modes.Mode) {// should be an error on p2 - it's not exported
         var x:modes.Mode;
     }
    
 }
}


//// [moduleVisibilityTest3.js]
var _modes;
(function (_modes) {
    class Mode {
    }
})(_modes || (_modes = {}));
var editor;
(function (editor) {
    var modes = _modes;
    var i;
    class Bug {
        constructor(p1, p2) {
            var x;
        }
    }
})(editor || (editor = {}));
