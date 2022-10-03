// @declaration: true

// @filename: locale.d.ts
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

// @filename: instance.d.ts
import { Locale, CustomLocale, key as LocaleKey } from "./locale";
export interface FlatpickrFn {
    l10ns: {[k in LocaleKey]?: CustomLocale } & { default: Locale };
}

// @filename: app.ts
import { FlatpickrFn } from "./instance";
const fp = { l10ns: {} } as FlatpickrFn;
export default fp.l10ns;
