//// [tests/cases/compiler/duplicateIdentifierRelatedSpans5.ts] ////

//// [file1.ts]
declare global {
    interface TopLevel {
        duplicate1: () => string;
        duplicate2: () => string;
        duplicate3: () => string;
    }
}
export {}
//// [file2.ts]
import "./file1";
declare global {
    interface TopLevel {
        duplicate1(): number;
        duplicate2(): number;
        duplicate3(): number;
    }
}
export {}


//// [file1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [file2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./file1");
