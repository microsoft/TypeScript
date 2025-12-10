// @module: esnext
// @moduleResolution: bundler
// @resolveJsonModule: true
// @strict: true
// @noEmit: true

// @filename: /config.json
{
    "appLocales": ["FR", "BE"],
    "enabled": true,
    "count": 42
}

// @filename: /main.ts
// Without const attribute - types should be widened
import config from "./config.json" with { type: "json" };

// With const attribute - types should preserve literal types
import constConfig from "./config.json" with { type: "json", const: "true" };

// Test widened types (without const)
type Locales = typeof config.appLocales;        // Should be string[]
type Enabled = typeof config.enabled;           // Should be boolean
type Count = typeof config.count;               // Should be number

// Test literal types (with const)
type ConstLocales = typeof constConfig.appLocales;  // Should be readonly ["FR", "BE"]
type ConstEnabled = typeof constConfig.enabled;      // Should be true
type ConstCount = typeof constConfig.count;          // Should be 42

// Verify the types work as expected
const locale: "FR" | "BE" = constConfig.appLocales[0];  // Should work with const
const enabledTrue: true = constConfig.enabled;           // Should work with const

// These should error without const (uncomment to verify errors)
// const localeError: "FR" | "BE" = config.appLocales[0];  // Error: string not assignable to "FR" | "BE"
// const enabledError: true = config.enabled;               // Error: boolean not assignable to true

