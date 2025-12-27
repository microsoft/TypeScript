//// [tests/cases/compiler/enumKeysExportScenario.ts] ////

//// [enumKeysExportScenario.ts]
// Test that export scenario with enum bracket notation doesn't crash
// This tests the trackComputedName -> getFirstIdentifier path

enum Type {
    Foo = 'foo',
    '3x14' = '3x14'
}

// Export interface with bracket notation computed property
// This should trigger the tracker path
export interface TypeMap {
    [Type['3x14']]: number;
}

export type TypeMap2 = {
    [Type['3x14']]: string;
}


//// [enumKeysExportScenario.js]
"use strict";
// Test that export scenario with enum bracket notation doesn't crash
// This tests the trackComputedName -> getFirstIdentifier path
Object.defineProperty(exports, "__esModule", { value: true });
var Type;
(function (Type) {
    Type["Foo"] = "foo";
    Type["3x14"] = "3x14";
})(Type || (Type = {}));


//// [enumKeysExportScenario.d.ts]
declare enum Type {
    Foo = "foo",
    '3x14' = "3x14"
}
export interface TypeMap {
    [Type['3x14']]: number;
}
export type TypeMap2 = {
    [Type['3x14']]: string;
};
export {};
