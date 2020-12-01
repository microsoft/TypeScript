//// [tests/cases/compiler/exportStarForValues3.ts] ////

//// [file1.ts]
export interface Foo { x }

//// [file2.ts]
export interface A { x }
export * from "file1"
var x = 1;

//// [file3.ts]
export interface B { x }
export * from "file1"
var x = 1;

//// [file4.ts]
export interface C { x }
export * from "file2"
export * from "file3"
var x = 1;

//// [file5.ts]
export * from "file4"
var x = 1;

//// [file1.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
//// [file2.js]
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
define(["require", "exports", "file1"], function (require, exports, file1_1) {
    "use strict";
    exports.__esModule = true;
    __exportStar(file1_1, exports);
    var x = 1;
});
//// [file3.js]
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
define(["require", "exports", "file1"], function (require, exports, file1_1) {
    "use strict";
    exports.__esModule = true;
    __exportStar(file1_1, exports);
    var x = 1;
});
//// [file4.js]
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
define(["require", "exports", "file2", "file3"], function (require, exports, file2_1, file3_1) {
    "use strict";
    exports.__esModule = true;
    __exportStar(file2_1, exports);
    __exportStar(file3_1, exports);
    var x = 1;
});
//// [file5.js]
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
define(["require", "exports", "file4"], function (require, exports, file4_1) {
    "use strict";
    exports.__esModule = true;
    __exportStar(file4_1, exports);
    var x = 1;
});
