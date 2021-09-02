// #45212

// Original issue:
type Methods<T> = { [P in keyof T as T[P] extends Function ? P : never]: T[P] };
type H<T> = T[keyof Methods<T>]; // Should not error.

// `Filter<T>` only filters out some keys of `T`.
type Filter<T> = { [P in keyof T as T[P] extends Function ? P : never]: T[P] };
// `Modify<T>` might modify some keys of `T`.
type Modify<T> = { [P in keyof T as P extends string? `bool${P}`: P]: T[P] };

function fun<T>(val: T) {
    let x: Filter<T> = val; // Should not error.
    let y: Modify<T> = val; // Should an error.
}

type FilterInclOpt<T> = { [P in keyof T as T[P] extends Function ? P : never]+?: T[P] };
type ModifyInclOpt<T> = { [P in keyof T as P extends string? `bool${P}`: never ]+?: T[P] };
type FilterExclOpt<T> = { [P in keyof T as T[P] extends Function ? P : never]-?: T[P] };
type ModifyExclOpt<T> = { [P in keyof T as P extends string? `bool${P}`: never ]-?: T[P] };

function fun2<T>(val: T) {
    let x: FilterInclOpt<T> = val; // Ok
    let y: ModifyInclOpt<T> = val; // Also ok
    let z: FilterExclOpt<T> = val; // Should error.
    let w: ModifyExclOpt<T> = val; // Should error.
}


