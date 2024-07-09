//// [tests/cases/conformance/controlFlow/neverReturningFunctions1.ts] ////

//// [neverReturningFunctions1.ts]
function fail(message?: string): never {
    throw new Error(message);
}

function f01(x: string | undefined) {
    if (x === undefined) fail("undefined argument");
    x.length;  // string
}

function f02(x: number): number {
    if (x >= 0) return x;
    fail("negative number");
    x;  // Unreachable
}

function f03(x: string) {
    x;  // string
    fail();
    x;  // Unreachable
}

function f11(x: string | undefined, fail: (message?: string) => never) {
    if (x === undefined) fail("undefined argument");
    x.length;  // string
}

function f12(x: number, fail: (message?: string) => never): number {
    if (x >= 0) return x;
    fail("negative number");
    x;  // Unreachable
}

function f13(x: string, fail: (message?: string) => never) {
    x;  // string
    fail();
    x;  // Unreachable
}

namespace Debug {
    export declare function fail(message?: string): never;
}

function f21(x: string | undefined) {
    if (x === undefined) Debug.fail("undefined argument");
    x.length;  // string
}

function f22(x: number): number {
    if (x >= 0) return x;
    Debug.fail("negative number");
    x;  // Unreachable
}

function f23(x: string) {
    x;  // string
    Debug.fail();
    x;  // Unreachable
}

function f24(x: string) {
    x;  // string
    ((Debug).fail)();
    x;  // Unreachable
}

class Test {
    fail(message?: string): never {
        throw new Error(message);
    }
    f1(x: string | undefined) {
        if (x === undefined) this.fail("undefined argument");
        x.length;  // string
    }
    f2(x: number): number {
        if (x >= 0) return x;
        this.fail("negative number");
        x;  // Unreachable
    }
    f3(x: string) {
        x;  // string
        this.fail();
        x;  // Unreachable
    }
}

function f30(x: string | number | undefined) {
    if (typeof x === "string") {
        fail();
        x;  // Unreachable
    }
    else {
        x;  // number | undefined
        if (x !== undefined) {
            x;  // number
            fail();
            x;  // Unreachable
        }
        else {
            x;  // undefined
            fail();
            x;  // Unreachable
        }
        x;  // Unreachable
    }
    x;  // Unreachable
}

function f31(x: { a: string | number }) {
    if (typeof x.a === "string") {
        fail();
        x;    // Unreachable
        x.a;  // Unreachable
    }
    x;    // { a: string | number }
    x.a;  // number
}

function f40(x: number) {
    try {
        x;
        fail();
        x;  // Unreachable
    }
    finally {
        x;
        fail();
        x;  // Unreachable
    }
    x;  // Unreachable
}

function f41(x: number) {
    try {
        x;
    }
    finally {
        x;
        fail();
        x;  // Unreachable
    }
    x;  // Unreachable
}

function f42(x: number) {
    try {
        x;
        fail();
        x;  // Unreachable
    }
    finally {
        x;
    }
    x;  // Unreachable
}

function f43() {
    const fail = (): never => { throw new Error(); };
    const f = [fail];
    fail();  // No effect (missing type annotation)
    f[0]();  // No effect (not a dotted name)
    f;
}

// Repro from #33582

export interface Component<T extends object = any> {
	attrName?: string;
	data: T;
	dependencies?: string[];
	el: any;
	id: string;
	multiple?: boolean;
	name: string;
	schema: unknown;
	system: any;

	init(data?: T): void;
	pause(): void;
	play(): void;
	remove(): void;
	tick?(time: number, timeDelta: number): void;
	update(oldData: T): void;
	updateSchema?(): void;

	extendSchema(update: unknown): void;
	flushToDOM(): void;
}

export interface ComponentConstructor<T extends object> {
	new (el: unknown, attrValue: string, id: string): T & Component;
	prototype: T & {
		name: string;
		system: unknown;
		play(): void;
		pause(): void;
	};
}

declare function registerComponent<T extends object>(
    name: string,
    component: ComponentDefinition<T>
): ComponentConstructor<T>;

export type ComponentDefinition<T extends object = object> = T & Partial<Component> & ThisType<T & Component>;

const Component = registerComponent('test-component', {
	schema: {
		myProperty: {
			default: [],
			parse() {
				return [true];
			}
		},
		string: { type: 'string' },
		num: 0
	},
	init() {
		this.data.num = 0;
		this.el.setAttribute('custom-attribute', 'custom-value');
	},
	update() {},
	tick() {},
	remove() {},
	pause() {},
	play() {},

	multiply(f: number) {
		// Reference to system because both were registered with the same name.
		return f * this.data.num * this.system!.data.counter;
	}
});

// Repro from #36147

class MyThrowable {
    throw(): never {
        throw new Error();
    }
}

class SuperThrowable extends MyThrowable {
    err(msg: string): never {
        super.throw()
    }
    ok(): never {
        this.throw()
    }
}

// Repro from #40346

interface Services {
    panic(message: string): never;
}

function foo(services: Readonly<Services>, s: string | null): string {
    if (s === null) {
        services.panic("ouch");
    } else {
        return s;
    }
}


//// [neverReturningFunctions1.js]
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
function fail(message) {
    throw new Error(message);
}
function f01(x) {
    if (x === undefined)
        fail("undefined argument");
    x.length; // string
}
function f02(x) {
    if (x >= 0)
        return x;
    fail("negative number");
    x; // Unreachable
}
function f03(x) {
    x; // string
    fail();
    x; // Unreachable
}
function f11(x, fail) {
    if (x === undefined)
        fail("undefined argument");
    x.length; // string
}
function f12(x, fail) {
    if (x >= 0)
        return x;
    fail("negative number");
    x; // Unreachable
}
function f13(x, fail) {
    x; // string
    fail();
    x; // Unreachable
}
var Debug;
(function (Debug) {
})(Debug || (Debug = {}));
function f21(x) {
    if (x === undefined)
        Debug.fail("undefined argument");
    x.length; // string
}
function f22(x) {
    if (x >= 0)
        return x;
    Debug.fail("negative number");
    x; // Unreachable
}
function f23(x) {
    x; // string
    Debug.fail();
    x; // Unreachable
}
function f24(x) {
    x; // string
    ((Debug).fail)();
    x; // Unreachable
}
var Test = /** @class */ (function () {
    function Test() {
    }
    Test.prototype.fail = function (message) {
        throw new Error(message);
    };
    Test.prototype.f1 = function (x) {
        if (x === undefined)
            this.fail("undefined argument");
        x.length; // string
    };
    Test.prototype.f2 = function (x) {
        if (x >= 0)
            return x;
        this.fail("negative number");
        x; // Unreachable
    };
    Test.prototype.f3 = function (x) {
        x; // string
        this.fail();
        x; // Unreachable
    };
    return Test;
}());
function f30(x) {
    if (typeof x === "string") {
        fail();
        x; // Unreachable
    }
    else {
        x; // number | undefined
        if (x !== undefined) {
            x; // number
            fail();
            x; // Unreachable
        }
        else {
            x; // undefined
            fail();
            x; // Unreachable
        }
        x; // Unreachable
    }
    x; // Unreachable
}
function f31(x) {
    if (typeof x.a === "string") {
        fail();
        x; // Unreachable
        x.a; // Unreachable
    }
    x; // { a: string | number }
    x.a; // number
}
function f40(x) {
    try {
        x;
        fail();
        x; // Unreachable
    }
    finally {
        x;
        fail();
        x; // Unreachable
    }
    x; // Unreachable
}
function f41(x) {
    try {
        x;
    }
    finally {
        x;
        fail();
        x; // Unreachable
    }
    x; // Unreachable
}
function f42(x) {
    try {
        x;
        fail();
        x; // Unreachable
    }
    finally {
        x;
    }
    x; // Unreachable
}
function f43() {
    var fail = function () { throw new Error(); };
    var f = [fail];
    fail(); // No effect (missing type annotation)
    f[0](); // No effect (not a dotted name)
    f;
}
var Component = registerComponent('test-component', {
    schema: {
        myProperty: {
            default: [],
            parse: function () {
                return [true];
            }
        },
        string: { type: 'string' },
        num: 0
    },
    init: function () {
        this.data.num = 0;
        this.el.setAttribute('custom-attribute', 'custom-value');
    },
    update: function () { },
    tick: function () { },
    remove: function () { },
    pause: function () { },
    play: function () { },
    multiply: function (f) {
        // Reference to system because both were registered with the same name.
        return f * this.data.num * this.system.data.counter;
    }
});
// Repro from #36147
var MyThrowable = /** @class */ (function () {
    function MyThrowable() {
    }
    MyThrowable.prototype.throw = function () {
        throw new Error();
    };
    return MyThrowable;
}());
var SuperThrowable = /** @class */ (function (_super) {
    __extends(SuperThrowable, _super);
    function SuperThrowable() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SuperThrowable.prototype.err = function (msg) {
        _super.prototype.throw.call(this);
    };
    SuperThrowable.prototype.ok = function () {
        this.throw();
    };
    return SuperThrowable;
}(MyThrowable));
function foo(services, s) {
    if (s === null) {
        services.panic("ouch");
    }
    else {
        return s;
    }
}


//// [neverReturningFunctions1.d.ts]
export interface Component<T extends object = any> {
    attrName?: string;
    data: T;
    dependencies?: string[];
    el: any;
    id: string;
    multiple?: boolean;
    name: string;
    schema: unknown;
    system: any;
    init(data?: T): void;
    pause(): void;
    play(): void;
    remove(): void;
    tick?(time: number, timeDelta: number): void;
    update(oldData: T): void;
    updateSchema?(): void;
    extendSchema(update: unknown): void;
    flushToDOM(): void;
}
export interface ComponentConstructor<T extends object> {
    new (el: unknown, attrValue: string, id: string): T & Component;
    prototype: T & {
        name: string;
        system: unknown;
        play(): void;
        pause(): void;
    };
}
export type ComponentDefinition<T extends object = object> = T & Partial<Component> & ThisType<T & Component>;
