// @out: output.js
// @allowJs: true
// @checkJs: true
// @noImplicitAny: true
// @strictNullChecks: true

// @filename: a.js
class C {
    constructor() {
        if (Math.random()) {
            this.inConstructor = 0;
        }
        else {
            this.inConstructor = "string"
        }
        this.inMultiple = 0;
    }
    method() {
        if (Math.random()) {
            this.inMethod = 0;
            this.inMethodNullable = null;
        }
        else {
            this.inMethod = "string"
            this.inMethodNullable = undefined;
        }
        this.inMultiple = "string";
        this.inMultipleMethods = "string";

        var action = () => {
            if (Math.random()) {
                this.inNestedArrowFunction = 0;
            }
            else {
                this.inNestedArrowFunction = "string"
            }
        };
    }
    get() {
        if (Math.random()) {
            this.inGetter = 0;
        }
        else {
            this.inGetter = "string"
        }
        this.inMultiple = false;
        this.inMultipleMethods = false;
    }
    set() {
        if (Math.random()) {
            this.inSetter = 0;
        }
        else {
            this.inSetter = "string"
        }
    }
    prop = () => {
        if (Math.random()) {
            this.inPropertyDeclaration = 0;
        }
        else {
            this.inPropertyDeclaration = "string"
        }
    }
    static method() {
        if (Math.random()) {
            this.inStaticMethod = 0;
        }
        else {
            this.inStaticMethod = "string"
        }

        var action = () => {
            if (Math.random()) {
                this.inStaticNestedArrowFunction = 0;
            }
            else {
                this.inStaticNestedArrowFunction = "string"
            }
        };
    }
    static get() {
        if (Math.random()) {
            this.inStaticGetter = 0;
        }
        else {
            this.inStaticGetter = "string"
        }
    }
    static set() {
        if (Math.random()) {
            this.inStaticSetter = 0;
        }
        else {
            this.inStaticSetter = "string"
        }
    }
    static prop = () => {
        if (Math.random()) {
            this.inStaticPropertyDeclaration = 0;
        }
        else {
            this.inStaticPropertyDeclaration = "string"
        }
    }
}

// @filename: b.ts
var c = new C();

var stringOrNumber: string | number;
var stringOrNumber = c.inConstructor;

var stringOrNumberOrUndefined: string | number | undefined;

var stringOrNumberOrUndefined = c.inMethod;
var stringOrNumberOrUndefined = c.inGetter;
var stringOrNumberOrUndefined = c.inSetter;
var stringOrNumberOrUndefined = c.inPropertyDeclaration;
var stringOrNumberOrUndefined = c.inNestedArrowFunction

var stringOrNumberOrBoolean: string | number | boolean;

var number: number;
var number = c.inMultiple;
var stringOrBooleanOrUndefined : string | boolean | undefined;
var stringOrBooleanOrUndefined = c.inMultipleMethods;
var any: any;
var any = c.inMethodNullable;


var stringOrNumberOrUndefined = C.inStaticMethod;
var stringOrNumberOrUndefined = C.inStaticGetter;
var stringOrNumberOrUndefined = C.inStaticSetter;
var stringOrNumberOrUndefined = C.inStaticPropertyDeclaration;
var stringOrNumberOrUndefined = C.inStaticNestedArrowFunction;
