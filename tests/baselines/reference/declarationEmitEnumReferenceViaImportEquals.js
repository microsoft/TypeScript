//// [tests/cases/compiler/declarationEmitEnumReferenceViaImportEquals.ts] ////

//// [translation.ts]
export interface Translation {
  translationKey: Translation.TranslationKeyEnum;
}

export namespace Translation {
  export type TranslationKeyEnum = 'translation1' | 'translation2';
  export const TranslationKeyEnum = {
    Translation1: 'translation1' as TranslationKeyEnum,
    Translation2: 'translation2' as TranslationKeyEnum,
  }
}


//// [test.ts]
import { Translation } from "./translation";
import TranslationKeyEnum = Translation.TranslationKeyEnum;

export class Test {
  TranslationKeyEnum = TranslationKeyEnum;
  print() {
    console.log(TranslationKeyEnum.Translation1);
  }
}

//// [index.ts]
import { Test } from "./test";
new Test().print();

//// [translation.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Translation = void 0;
var Translation;
(function (Translation) {
    Translation.TranslationKeyEnum = {
        Translation1: 'translation1',
        Translation2: 'translation2',
    };
})(Translation || (exports.Translation = Translation = {}));
//// [test.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Test = void 0;
var translation_1 = require("./translation");
var TranslationKeyEnum = translation_1.Translation.TranslationKeyEnum;
var Test = /** @class */ (function () {
    function Test() {
        this.TranslationKeyEnum = TranslationKeyEnum;
    }
    Test.prototype.print = function () {
        console.log(TranslationKeyEnum.Translation1);
    };
    return Test;
}());
exports.Test = Test;
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var test_1 = require("./test");
new test_1.Test().print();


//// [translation.d.ts]
export interface Translation {
    translationKey: Translation.TranslationKeyEnum;
}
export declare namespace Translation {
    type TranslationKeyEnum = 'translation1' | 'translation2';
    const TranslationKeyEnum: {
        Translation1: TranslationKeyEnum;
        Translation2: TranslationKeyEnum;
    };
}
//// [test.d.ts]
import { Translation } from "./translation";
import TranslationKeyEnum = Translation.TranslationKeyEnum;
export declare class Test {
    TranslationKeyEnum: {
        Translation1: TranslationKeyEnum;
        Translation2: TranslationKeyEnum;
    };
    print(): void;
}
//// [index.d.ts]
export {};
