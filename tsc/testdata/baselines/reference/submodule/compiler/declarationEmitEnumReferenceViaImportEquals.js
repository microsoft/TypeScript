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
const translation_1 = require("./translation");
class Test {
    TranslationKeyEnum = TranslationKeyEnum;
    print() {
        console.log(TranslationKeyEnum.Translation1);
    }
}
exports.Test = Test;
//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("./test");
new test_1.Test().print();
