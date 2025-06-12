//// [tests/cases/compiler/unusedLocalsStartingWithUnderscore.ts] ////

//// [a.ts]
import * as _ from "./a";

for (const _ of []) { }

for (const _ in []) { }

namespace _ns {
    let _;
    for (const _ of []) { }

    for (const _ in []) { }
}


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
for (const _ of []) { }
for (const _ in []) { }
var _ns;
(function (_ns) {
    let _;
    for (const _ of []) { }
    for (const _ in []) { }
})(_ns || (_ns = {}));
