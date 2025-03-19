//// [tests/cases/compiler/genericArgumentCallSigAssignmentCompat.ts] ////

//// [genericArgumentCallSigAssignmentCompat.ts]
module Underscore {
    export interface Iterator<T, U> {
        (value: T, index: any, list: any): U;
    }
 
    export interface Static {
        all<T>(list: T[], iterator?: Iterator<T, boolean>, context?: any): boolean;
        identity<T>(value: T): T;
    }
}
 
declare var _: Underscore.Static;
 
// No error, Call signatures of types '<T>(value: T) => T' and 'Underscore.Iterator<{}, boolean>' are compatible when instantiated with any.
// Ideally, we would not have a generic signature here, because it should be instantiated with {} during inferential typing
_.all([true, 1, null, 'yes'], _.identity);
 
// Ok, because fixing makes us infer boolean for T
_.all([true], _.identity);


//// [genericArgumentCallSigAssignmentCompat.js]
// No error, Call signatures of types '<T>(value: T) => T' and 'Underscore.Iterator<{}, boolean>' are compatible when instantiated with any.
// Ideally, we would not have a generic signature here, because it should be instantiated with {} during inferential typing
_.all([true, 1, null, 'yes'], _.identity);
// Ok, because fixing makes us infer boolean for T
_.all([true], _.identity);
