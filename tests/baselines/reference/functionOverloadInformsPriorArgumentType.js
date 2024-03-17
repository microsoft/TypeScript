//// [tests/cases/compiler/functionOverloadInformsPriorArgumentType.ts] ////

//// [functionOverloadInformsPriorArgumentType.ts]
enum ModifierFlags {
    None = 0,
    In = 1,
    Out = 2,
    Const = 4,
    Other = 8,
}

interface Declaration {
    modifierFlags: ModifierFlags;
}

declare function getEffectiveModifierFlags(d: Declaration): ModifierFlags;

declare function reduceLeft<T, U>(array: readonly T[] | undefined, f: (memo: U, value: T, i: number) => U, initial: U, start?: number, count?: number): U;
// only has an issue when the 2nd overload is present, even though it has an arity mismatch
declare function reduceLeft<T>(array: readonly T[], f: (memo: T, value: T, i: number) => T): T | undefined;

function getTypeParameterModifiers(declarations: Declaration[]): ModifierFlags {
    return reduceLeft(declarations, (modifiers, d) => modifiers | getEffectiveModifierFlags(d), ModifierFlags.None) & (ModifierFlags.In | ModifierFlags.Out | ModifierFlags.Const);
}

//// [functionOverloadInformsPriorArgumentType.js]
"use strict";
var ModifierFlags;
(function (ModifierFlags) {
    ModifierFlags[ModifierFlags["None"] = 0] = "None";
    ModifierFlags[ModifierFlags["In"] = 1] = "In";
    ModifierFlags[ModifierFlags["Out"] = 2] = "Out";
    ModifierFlags[ModifierFlags["Const"] = 4] = "Const";
    ModifierFlags[ModifierFlags["Other"] = 8] = "Other";
})(ModifierFlags || (ModifierFlags = {}));
function getTypeParameterModifiers(declarations) {
    return reduceLeft(declarations, function (modifiers, d) { return modifiers | getEffectiveModifierFlags(d); }, ModifierFlags.None) & (ModifierFlags.In | ModifierFlags.Out | ModifierFlags.Const);
}
