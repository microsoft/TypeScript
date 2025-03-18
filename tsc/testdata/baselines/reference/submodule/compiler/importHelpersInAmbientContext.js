//// [tests/cases/compiler/importHelpersInAmbientContext.ts] ////

//// [a.d.ts]
export { };

// Extends
declare class C { }
declare class D extends C { }

// Destructuring
interface I {
    ({descendants, read}?: {
        descendants?: boolean;
        read?: any;
    }): any;
}


// Object Rest
interface Foo {
    a: number; b: string;
}
export var { a, ...x } : Foo;

//// [b.ts]
export {};
declare namespace N {
	// Extends
	class C { }
	class D extends C { }

	// Destructuring
	interface I {
		({descendants, read}?: {
			descendants?: boolean;
			read?: any;
		}): any;
	}


	// Object Rest
	interface Foo {
		a: number; b: string;
	}
	export var { a, ...x } : Foo;
}

//// [tslib.d.ts]
export declare function __extends(d: Function, b: Function): void;
export declare function __assign(t: any, ...sources: any[]): any;
export declare function __rest(t: any, propertyNames: string[]): any;
export declare function __decorate(decorators: Function[], target: any, key?: string | symbol, desc?: any): any;
export declare function __param(paramIndex: number, decorator: Function): Function;
export declare function __metadata(metadataKey: any, metadataValue: any): Function;
export declare function __awaiter(thisArg: any, _arguments: any, P: Function, generator: Function): any;
export declare function __generator(thisArg: any, body: Function): any;
export declare function __exportStar(m: any, exports: any): void;

//// [b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
