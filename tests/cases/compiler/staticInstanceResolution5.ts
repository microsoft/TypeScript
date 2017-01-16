//@module: amd
// @Filename: staticInstanceResolution5_0.ts
export class Promise {
    static timeout(delay: number): Promise {
        return null;
    }
}

// @Filename: staticInstanceResolution5_1.ts
import WinJS = require('staticInstanceResolution5_0');

// these 3 should be errors
var x = (w1: WinJS) => { };
var y = function (w2: WinJS) { }
function z(w3: WinJS) { }
