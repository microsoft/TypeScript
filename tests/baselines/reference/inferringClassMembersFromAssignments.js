//// [tests/cases/conformance/salsa/inferringClassMembersFromAssignments.ts] ////

//// [a.js]
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

//// [b.ts]
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


//// [output.js]
var C = /** @class */ (function () {
    function C() {
        var _this = this;
        this.prop = function () {
            if (Math.random()) {
                _this.inPropertyDeclaration = 0;
            }
            else {
                _this.inPropertyDeclaration = "string";
            }
        };
        if (Math.random()) {
            this.inConstructor = 0;
        }
        else {
            this.inConstructor = "string";
        }
        this.inMultiple = 0;
    }
    C.prototype.method = function () {
        var _this = this;
        if (Math.random()) {
            this.inMethod = 0;
            this.inMethodNullable = null;
        }
        else {
            this.inMethod = "string";
            this.inMethodNullable = undefined;
        }
        this.inMultiple = "string";
        this.inMultipleMethods = "string";
        var action = function () {
            if (Math.random()) {
                _this.inNestedArrowFunction = 0;
            }
            else {
                _this.inNestedArrowFunction = "string";
            }
        };
    };
    C.prototype.get = function () {
        if (Math.random()) {
            this.inGetter = 0;
        }
        else {
            this.inGetter = "string";
        }
        this.inMultiple = false;
        this.inMultipleMethods = false;
    };
    C.prototype.set = function () {
        if (Math.random()) {
            this.inSetter = 0;
        }
        else {
            this.inSetter = "string";
        }
    };
    C.method = function () {
        var _this = this;
        if (Math.random()) {
            this.inStaticMethod = 0;
        }
        else {
            this.inStaticMethod = "string";
        }
        var action = function () {
            if (Math.random()) {
                _this.inStaticNestedArrowFunction = 0;
            }
            else {
                _this.inStaticNestedArrowFunction = "string";
            }
        };
    };
    C.get = function () {
        if (Math.random()) {
            this.inStaticGetter = 0;
        }
        else {
            this.inStaticGetter = "string";
        }
    };
    C.set = function () {
        if (Math.random()) {
            this.inStaticSetter = 0;
        }
        else {
            this.inStaticSetter = "string";
        }
    };
    var _a;
    _a = C;
    C.prop = function () {
        if (Math.random()) {
            _a.inStaticPropertyDeclaration = 0;
        }
        else {
            _a.inStaticPropertyDeclaration = "string";
        }
    };
    return C;
}());
var c = new C();
var stringOrNumber;
var stringOrNumber = c.inConstructor;
var stringOrNumberOrUndefined;
var stringOrNumberOrUndefined = c.inMethod;
var stringOrNumberOrUndefined = c.inGetter;
var stringOrNumberOrUndefined = c.inSetter;
var stringOrNumberOrUndefined = c.inPropertyDeclaration;
var stringOrNumberOrUndefined = c.inNestedArrowFunction;
var stringOrNumberOrBoolean;
var number;
var number = c.inMultiple;
var stringOrBooleanOrUndefined;
var stringOrBooleanOrUndefined = c.inMultipleMethods;
var any;
var any = c.inMethodNullable;
var stringOrNumberOrUndefined = C.inStaticMethod;
var stringOrNumberOrUndefined = C.inStaticGetter;
var stringOrNumberOrUndefined = C.inStaticSetter;
var stringOrNumberOrUndefined = C.inStaticPropertyDeclaration;
var stringOrNumberOrUndefined = C.inStaticNestedArrowFunction;
