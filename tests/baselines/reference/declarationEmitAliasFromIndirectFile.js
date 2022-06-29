//// [tests/cases/compiler/declarationEmitAliasFromIndirectFile.ts] ////

//// [locale.d.ts]
export type Locale = {
    weekdays: {
        shorthand: [string, string, string, string, string, string, string];
        longhand: [string, string, string, string, string, string, string];
    };
};
export type CustomLocale = {
    weekdays: {
        shorthand: [string, string, string, string, string, string, string];
        longhand: [string, string, string, string, string, string, string];
    };
};
export type key = "ar" | "bg";

//// [instance.d.ts]
import { Locale, CustomLocale, key as LocaleKey } from "./locale";
export interface FlatpickrFn {
    l10ns: {[k in LocaleKey]?: CustomLocale } & { default: Locale };
}

//// [app.ts]
import { FlatpickrFn } from "./instance";
const fp = { l10ns: {} } as FlatpickrFn;
export default fp.l10ns;


//// [app.js]
"use strict";
exports.__esModule = true;
var fp = { l10ns: {} };
exports["default"] = fp.l10ns;


//// [app.d.ts]
import { type CustomLocale, type Locale } from "./locale";
declare const _default: {
    ar?: CustomLocale;
    bg?: CustomLocale;
} & {
    default: Locale;
};
export default _default;
