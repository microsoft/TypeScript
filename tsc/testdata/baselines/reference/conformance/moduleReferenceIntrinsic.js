//// [tests/cases/conformance/types/typeAliases/moduleReferenceIntrinsic.ts] ////

//// [mod.ts]
export const getRandom = () => 10;
export const label = "mod";

//// [plugin.ts]
export function doThing(): void {}

//// [notAPlugin.ts]
export function somethingElse(): void {}

//// [main.ts]
declare const jest: {
    requireActual<T>(ref: ModuleReference<T>): T;
    mock<T>(ref: ModuleReference<T>, factory: () => NoInfer<T>): void;
};

const actual = jest.requireActual("./mod");
actual.getRandom();
actual.label;
actual.missing; // error, no such export

jest.mock("./mod", () => ({ ...jest.requireActual("./mod"), getRandom: () => 10 }));
jest.mock("./mod", () => ({ getRandom: () => 10 })); // error, 'label' is missing

// The referenced module is checked against the type parameter's constraint.
declare function requirePlugin<T extends { doThing(): void }>(ref: ModuleReference<T>): Promise<T>;
requirePlugin("./plugin");
requirePlugin("./notAPlugin"); // error
requirePlugin<{ doThing(): void }>("./notAPlugin"); // error

// A module reference is a string, and forwards to another module reference parameter.
declare function importDeferred<T>(ref: ModuleReference<T>): Promise<T>;
function forward<T>(ref: ModuleReference<T>): Promise<T> {
    const specifier: string = ref;
    specifier.length;
    return importDeferred(ref);
}

importDeferred("./nope"); // error, no such module
importDeferred(String(1)); // error, not a string literal


//// [mod.js]
export const getRandom = () => 10;
export const label = "mod";
//// [plugin.js]
export function doThing() { }
//// [notAPlugin.js]
export function somethingElse() { }
//// [main.js]
"use strict";
const actual = jest.requireActual("./mod");
actual.getRandom();
actual.label;
actual.missing; // error, no such export
jest.mock("./mod", () => ({ ...jest.requireActual("./mod"), getRandom: () => 10 }));
jest.mock("./mod", () => ({ getRandom: () => 10 })); // error, 'label' is missing
requirePlugin("./plugin");
requirePlugin("./notAPlugin"); // error
requirePlugin("./notAPlugin"); // error
function forward(ref) {
    const specifier = ref;
    specifier.length;
    return importDeferred(ref);
}
importDeferred("./nope"); // error, no such module
importDeferred(String(1)); // error, not a string literal


//// [mod.d.ts]
export declare const getRandom: () => number;
export declare const label = "mod";
//// [plugin.d.ts]
export declare function doThing(): void;
//// [notAPlugin.d.ts]
export declare function somethingElse(): void;
//// [main.d.ts]
declare const jest: {
    requireActual<T>(ref: ModuleReference<T>): T;
    mock<T>(ref: ModuleReference<T>, factory: () => NoInfer<T>): void;
};
declare const actual: typeof import("./mod");
declare function requirePlugin<T extends {
    doThing(): void;
}>(ref: ModuleReference<T>): Promise<T>;
declare function importDeferred<T>(ref: ModuleReference<T>): Promise<T>;
declare function forward<T>(ref: ModuleReference<T>): Promise<T>;
