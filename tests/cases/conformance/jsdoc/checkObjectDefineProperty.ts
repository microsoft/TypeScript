// @allowJs: true
// @noEmit: true
// @strict: true
// @checkJs: true
// @filename: index.js
const x = {};
Object.defineProperty(x, "name", { value: "Charles", writable: true });
Object.defineProperty(x, "middleInit", { value: "H" });
Object.defineProperty(x, "lastName", { value: "Smith", writable: false });
Object.defineProperty(x, "zip", { get() { return 98122 }, set(_) { /*ignore*/ } });
Object.defineProperty(x, "houseNumber", { get() { return 21.75 } });
Object.defineProperty(x, "zipStr", {
    /** @param {string} str */
    set(str) {
        this.zip = Number(str) 
    }
});

/**
 * @param {{name: string}} named
 */
function takeName(named) { return named.name; }

takeName(x);
/**
 * @type {number}
 */
var a = x.zip;

/**
 * @type {number}
 */
var b = x.houseNumber;

const returnExemplar = () => x;
const needsExemplar = (_ = x) => void 0;

const expected = /** @type {{name: string, readonly middleInit: string, readonly lastName: string, zip: number, readonly houseNumber: number, zipStr: string}} */(/** @type {*} */(null));

/**
 * 
 * @param {typeof returnExemplar} a 
 * @param {typeof needsExemplar} b 
 */
function match(a, b) {}

match(() => expected, (x = expected) => void 0);

module.exports = x;

// @filename: validate.ts
// Validate in TS as simple validations would usually be interpreted as more special assignments
import x = require("./");
x.name;
x.middleInit;
x.lastName;
x.zip;
x.houseNumber;
x.zipStr;

x.name = "Another";
x.zip = 98123;
x.zipStr = "OK";

x.lastName = "should fail";
x.houseNumber = 12; // should also fail
x.zipStr = 12; // should fail
x.middleInit = "R"; // should also fail
