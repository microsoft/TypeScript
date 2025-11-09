//// [tests/cases/compiler/moduleCrashBug1.ts] ////

//// [moduleCrashBug1.ts]
namespace _modes {
 export interface IMode {
  
 }
 
 class Mode {
  
 }
}

//_modes. // produces an internal error - please implement in derived class

namespace editor {
 import modes = _modes;

}

var m : _modes;




//// [moduleCrashBug1.js]
var _modes;
(function (_modes) {
    var Mode = /** @class */ (function () {
        function Mode() {
        }
        return Mode;
    }());
})(_modes || (_modes = {}));
var m;
