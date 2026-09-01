// @strict: true
// @module: esnext
// @moduleResolution: bundler
// @declaration: true

// @filename: mod.ts
export const getRandom = () => 10;
export const label = "mod";

// @filename: plugin.ts
export function doThing(): void {}

// @filename: notAPlugin.ts
export function somethingElse(): void {}

// @filename: main.ts
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
