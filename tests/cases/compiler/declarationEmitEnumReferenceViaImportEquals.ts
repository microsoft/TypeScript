// @strict: true
// @declaration: true

// @filename: translation.ts
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


// @filename: test.ts 
import { Translation } from "./translation";
import TranslationKeyEnum = Translation.TranslationKeyEnum;

export class Test {
  TranslationKeyEnum = TranslationKeyEnum;
  print() {
    console.log(TranslationKeyEnum.Translation1);
  }
}

// @filename: index.ts 
import { Test } from "./test";
new Test().print();