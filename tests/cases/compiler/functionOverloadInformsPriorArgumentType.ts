// @strict: true

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