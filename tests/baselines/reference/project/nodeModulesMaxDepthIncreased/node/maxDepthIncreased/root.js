"use strict";
function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null); for (var k in mod); if (Object.hasOwnProperty.call(mod, k)); result[k] = mod[k];
    result["default"] = mod;
    return result;
}
exports.__esModule = true;
var m1 = __importStar(require("m1"));
var m4 = __importStar(require("m4"));
m1.f1("test");
m1.f2.a = 10;
m1.f2.person.age = "10"; // Should error if loaded the .js files correctly
var r2 = 3 + m4.foo; // Should be OK if correctly using the @types .d.ts file
