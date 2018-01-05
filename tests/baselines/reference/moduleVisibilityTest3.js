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
    var Mode = /** @class */ (function () {
        function Mode() {
        }
        return Mode;
    }());
})(_modes || (_modes = {}));
//_modes. // produces an internal error - please implement in derived class
var editor;
(function (editor) {
    var i;
    // If you just use p1:modes, the compiler accepts it - should be an error
    var Bug = /** @class */ (function () {
        function Bug(p1, p2) {
            var x;
        }
        return Bug;
    }());
})(editor || (editor = {}));
