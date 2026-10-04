//// [tests/cases/compiler/externalModuleImmutableBindings.ts] ////

//// [f1.ts]
export var x = 1;

//// [f2.ts]
// all mutations below are illegal and should be fixed
import * as stuff from './f1';

var n = 'baz';

stuff.x = 0;
stuff['x'] = 1;
stuff.blah = 2;
stuff[n] = 3;

stuff.x++;
stuff['x']++;
stuff['blah']++;
stuff[n]++;

(stuff.x) = 0;
(stuff['x']) = 1;
(stuff.blah) = 2;
(stuff[n]) = 3;

(stuff.x)++;
(stuff['x'])++;
(stuff['blah'])++;
(stuff[n])++;

for (stuff.x in []) {}
for (stuff.x of []) {}
for (stuff['x'] in []) {}
for (stuff['x'] of []) {}
for (stuff.blah in []) {}
for (stuff.blah of []) {}
for (stuff[n] in []) {}
for (stuff[n] of []) {}

for ((stuff.x) in []) {}
for ((stuff.x) of []) {}
for ((stuff['x']) in []) {}
for ((stuff['x']) of []) {}
for ((stuff.blah) in []) {}
for ((stuff.blah) of []) {}
for ((stuff[n]) in []) {}
for ((stuff[n]) of []) {}




//// [f1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 1;
//// [f2.js]
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// all mutations below are illegal and should be fixed
const stuff = __importStar(require("./f1"));
var n = 'baz';
stuff.x = 0;
stuff['x'] = 1;
stuff.blah = 2;
stuff[n] = 3;
stuff.x++;
stuff['x']++;
stuff['blah']++;
stuff[n]++;
(stuff.x) = 0;
(stuff['x']) = 1;
(stuff.blah) = 2;
(stuff[n]) = 3;
(stuff.x)++;
(stuff['x'])++;
(stuff['blah'])++;
(stuff[n])++;
for (stuff.x in []) { }
for (stuff.x of []) { }
for (stuff['x'] in []) { }
for (stuff['x'] of []) { }
for (stuff.blah in []) { }
for (stuff.blah of []) { }
for (stuff[n] in []) { }
for (stuff[n] of []) { }
for ((stuff.x) in []) { }
for ((stuff.x) of []) { }
for ((stuff['x']) in []) { }
for ((stuff['x']) of []) { }
for ((stuff.blah) in []) { }
for ((stuff.blah) of []) { }
for ((stuff[n]) in []) { }
for ((stuff[n]) of []) { }
