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
