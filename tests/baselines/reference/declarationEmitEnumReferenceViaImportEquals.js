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
export var Translation;
(function (Translation) {
    Translation.TranslationKeyEnum = {
        Translation1: 'translation1',
        Translation2: 'translation2',
    };
})(Translation || (Translation = {}));
//// [test.js]
import { Translation } from "./translation";
var TranslationKeyEnum = Translation.TranslationKeyEnum;
export class Test {
    constructor() {
        this.TranslationKeyEnum = TranslationKeyEnum;
    }
    print() {
        console.log(TranslationKeyEnum.Translation1);
    }
}
//// [index.js]
import { Test } from "./test";
new Test().print();


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
