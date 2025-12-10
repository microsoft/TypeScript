// @module: esnext
// @resolveJsonModule: true
// @target: esnext
// @declaration: true
// @outDir: ./out

// @filename: config.json
{
    "appLocales": ["FR", "BE"],
    "debug": true,
    "count": 42,
    "settings": {
        "theme": "dark",
        "notifications": false
    }
}

// @filename: without-const.ts
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

// @filename: with-const.ts
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

// @filename: with-const-namespace.ts
// Test namespace import with const: "true"
import * as ns from "./config.json" with { type: "json", const: "true" };

// Should preserve literal types through namespace import
export const locales = ns.appLocales;
export const debug = ns.debug;

// @filename: type-assertions.ts
// Test that const attribute produces types compatible with literal type assertions
import data from "./config.json" with { type: "json", const: "true" };

type AppLocale = "FR" | "BE";

// This should work - appLocales should be a tuple of literal types
const locale: AppLocale = data.appLocales[0];

// Function that requires specific literal types
function setLocale(locale: "FR" | "BE"): void {}

// This should work with const import
setLocale(data.appLocales[0]);

