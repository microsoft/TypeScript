// error since module is instantiated
var a;
module M { export var x = 1; }
import a = M;