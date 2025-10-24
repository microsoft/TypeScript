//// [tests/cases/compiler/augmentExportEquals4.ts] ////

//// [file1.ts]
class foo {}
namespace foo {
    export var v = 1;
}
export = foo;

//// [file2.ts]
import x = require("./file1"); 
x.b = 1;

// OK - './file1' is a namespace
declare module "./file1" {
    interface A { a }
    let b: number;
}

//// [file3.ts]
import * as x from "./file1";
import "./file2";
let a: x.A;
let b = x.b;

//// [file1.js]
<<<<<<< HEAD
define(["require", "exports"], function (require, exports) {
    "use strict";
    class foo {
    }
    (function (foo) {
        foo.v = 1;
    })(foo || (foo = {}));
||||||| parent of 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))
define(["require", "exports"], function (require, exports) {
    "use strict";
    var foo = /** @class */ (function () {
        function foo() {
        }
        return foo;
    }());
    (function (foo) {
        foo.v = 1;
    })(foo || (foo = {}));
=======
"use strict";
var foo = /** @class */ (function () {
    function foo() {
    }
>>>>>>> 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))
    return foo;
}());
(function (foo) {
    foo.v = 1;
})(foo || (foo = {}));
module.exports = foo;
//// [file2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var x = require("./file1");
x.b = 1;
//// [file3.js]
<<<<<<< HEAD
define(["require", "exports", "./file1", "./file2"], function (require, exports, x) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let a;
    let b = x.b;
});
||||||| parent of 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))
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
define(["require", "exports", "./file1", "./file2"], function (require, exports, x) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    x = __importStar(x);
    var a;
    var b = x.b;
});
=======
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
var x = __importStar(require("./file1"));
require("./file2");
var a;
var b = x.b;
>>>>>>> 42f6576e83 (Deprecate `--module amd`, `umd`, `system`, `none`; `--moduleResolution classic`; change defaults (#62669))
