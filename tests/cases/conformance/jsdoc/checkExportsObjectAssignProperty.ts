// @allowJs: true
// @noEmit: true
// @strict: true
// @checkJs: true
// @filename: mod1.js
Object.defineProperty(exports, "thing", { value: 42, writable: true });
Object.defineProperty(exports, "readonlyProp", { value: "Smith", writable: false });
Object.defineProperty(exports, "rwAccessors", { get() { return 98122 }, set(_) { /*ignore*/ } });
Object.defineProperty(exports, "readonlyAccessor", { get() { return 21.75 } });
Object.defineProperty(exports, "setonlyAccessor", {
    /** @param {string} str */
    set(str) {
        this.rwAccessors = Number(str) 
    }
});

// @filename: mod2.js
Object.defineProperty(module.exports, "thing", { value: "yes", writable: true });
Object.defineProperty(module.exports, "readonlyProp", { value: "Smith", writable: false });
Object.defineProperty(module.exports, "rwAccessors", { get() { return 98122 }, set(_) { /*ignore*/ } });
Object.defineProperty(module.exports, "readonlyAccessor", { get() { return 21.75 } });
Object.defineProperty(module.exports, "setonlyAccessor", {
    /** @param {string} str */
    set(str) {
        this.rwAccessors = Number(str) 
    }
});

// @filename: index.js

/**
 * @type {number}
 */
const q = require("./mod1").thing;

/**
 * @type {string}
 */
const u = require("./mod2").thing;

// @filename: validator.ts
import "./";

import m1 = require("./mod1");

m1.thing;
m1.readonlyProp;
m1.rwAccessors;
m1.readonlyAccessor;
m1.setonlyAccessor;

// allowed assignments
m1.thing = 10;
m1.rwAccessors = 11;
m1.setonlyAccessor = "yes";

// disallowed assignments
m1.readonlyProp = "name";
m1.readonlyAccessor = 12;
m1.thing = "no";
m1.rwAccessors = "no";
m1.setonlyAccessor = 0;

import m2 = require("./mod2");

m2.thing;
m2.readonlyProp;
m2.rwAccessors;
m2.readonlyAccessor;
m2.setonlyAccessor;

// allowed assignments
m2.thing = "ok";
m2.rwAccessors = 11;
m2.setonlyAccessor = "yes";

// disallowed assignments
m2.readonlyProp = "name";
m2.readonlyAccessor = 12;
m2.thing = 0;
m2.rwAccessors = "no";
m2.setonlyAccessor = 0;
