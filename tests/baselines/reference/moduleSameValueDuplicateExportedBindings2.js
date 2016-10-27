//// [tests/cases/compiler/moduleSameValueDuplicateExportedBindings2.ts] ////

//// [a.ts]
export * from "./b";
export * from "./c";

//// [b.ts]
export {Animals} from "./c";

//// [c.ts]
export enum Animals {
	Cat,
	Dog
};

//// [c.js]
"use strict";
var Animals;
(function (Animals) {
    Animals[Animals["Cat"] = 0] = "Cat";
    Animals[Animals["Dog"] = 1] = "Dog";
})(Animals = exports.Animals || (exports.Animals = {}));
;
//// [b.js]
"use strict";
var c_1 = require("./c");
exports.Animals = c_1.Animals;
//// [a.js]
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./b"));
__export(require("./c"));
