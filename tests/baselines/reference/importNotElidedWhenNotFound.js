//// [tests/cases/compiler/importNotElidedWhenNotFound.ts] ////

//// [importNotElidedWhenNotFound.ts]
import X from 'file';
import Z from 'other_file';

class Y extends Z {
  constructor() {
    super(X);
  }
}

import X2 from 'file2';
import X3 from 'file3';
class Q extends Z {
  constructor() {
    super(X2, X3);
  }
}


//// [importNotElidedWhenNotFound.js]
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var file_1 = __importDefault(require("file"));
var other_file_1 = __importDefault(require("other_file"));
class Y extends other_file_1.default {
    constructor() {
        super(file_1.default);
    }
}
var file2_1 = __importDefault(require("file2"));
var file3_1 = __importDefault(require("file3"));
class Q extends other_file_1.default {
    constructor() {
        super(file2_1.default, file3_1.default);
    }
}
