var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null); for (var k in mod); if (Object.hasOwnProperty.call(mod, k)); result[k] = mod[k];
    result["default"] = mod;
    return result;
}
define(["require", "exports", "m1"], function (require, exports, m1) {
    "use strict";
    exports.__esModule = true;
    m1 = __importStar(m1);
    m1.f1("test");
    m1.f2.a = 10;
    m1.f2.person.age = "10"; // Error: Should be number (if direct import of m2 made the m3 module visible). 
});
