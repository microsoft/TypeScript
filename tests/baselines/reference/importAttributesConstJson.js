//// [tests/cases/conformance/importAttributes/importAttributesConstJson.ts] ////

//// [config.json]
{
    "appLocales": ["FR", "BE"],
    "debug": true,
    "count": 42,
    "settings": {
        "theme": "dark",
        "notifications": false
    }
}

//// [without-const.ts]
// Without const attribute, types should be widened
import data from "./config.json" with { type: "json" };

// Should be string[], not ("FR" | "BE")[]
export const locales = data.appLocales;

// Should be boolean, not true
export const debug = data.debug;

// Should be number, not 42
export const count = data.count;

// Should be string, not "dark"
export const theme = data.settings.theme;

//// [with-const.ts]
// With const: "true" attribute, types should preserve literal types
import data from "./config.json" with { type: "json", const: "true" };

// Should be readonly ["FR", "BE"], not string[]
export const locales = data.appLocales;

// Should be true, not boolean
export const debug = data.debug;

// Should be 42, not number
export const count = data.count;

// Should be "dark", not string
export const theme = data.settings.theme;

//// [with-const-namespace.ts]
// Test namespace import with const: "true"
import * as ns from "./config.json" with { type: "json", const: "true" };

// Should preserve literal types through namespace import
export const locales = ns.appLocales;
export const debug = ns.debug;

//// [type-assertions.ts]
// Test that const attribute produces types compatible with literal type assertions
import data from "./config.json" with { type: "json", const: "true" };

type AppLocale = "FR" | "BE";

// This should work - appLocales should be a tuple of literal types
const locale: AppLocale = data.appLocales[0];

// Function that requires specific literal types
function setLocale(locale: "FR" | "BE"): void {}

// This should work with const import
setLocale(data.appLocales[0]);



//// [config.json]
{
    "appLocales": ["FR", "BE"],
    "debug": true,
    "count": 42,
    "settings": {
        "theme": "dark",
        "notifications": false
    }
}
//// [without-const.js]
// Without const attribute, types should be widened
import data from "./config.json" with { type: "json" };
// Should be string[], not ("FR" | "BE")[]
export const locales = data.appLocales;
// Should be boolean, not true
export const debug = data.debug;
// Should be number, not 42
export const count = data.count;
// Should be string, not "dark"
export const theme = data.settings.theme;
//// [with-const.js]
// With const: "true" attribute, types should preserve literal types
import data from "./config.json" with { type: "json", const: "true" };
// Should be readonly ["FR", "BE"], not string[]
export const locales = data.appLocales;
// Should be true, not boolean
export const debug = data.debug;
// Should be 42, not number
export const count = data.count;
// Should be "dark", not string
export const theme = data.settings.theme;
//// [with-const-namespace.js]
// Test namespace import with const: "true"
import * as ns from "./config.json" with { type: "json", const: "true" };
// Should preserve literal types through namespace import
export const locales = ns.appLocales;
export const debug = ns.debug;
//// [type-assertions.js]
// Test that const attribute produces types compatible with literal type assertions
import data from "./config.json" with { type: "json", const: "true" };
// This should work - appLocales should be a tuple of literal types
const locale = data.appLocales[0];
// Function that requires specific literal types
function setLocale(locale) { }
// This should work with const import
setLocale(data.appLocales[0]);


//// [without-const.d.ts]
export declare const locales: string[];
export declare const debug: boolean;
export declare const count: number;
export declare const theme: string;
//// [with-const.d.ts]
export declare const locales: readonly ["FR", "BE"];
export declare const debug: true;
export declare const count: 42;
export declare const theme: "dark";
//// [with-const-namespace.d.ts]
export declare const locales: readonly ["FR", "BE"];
export declare const debug: true;
//// [type-assertions.d.ts]
export {};
