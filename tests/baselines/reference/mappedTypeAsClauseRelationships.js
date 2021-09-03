//// [mappedTypeAsClauseRelationships.ts]
// From original issue #45212:
type Methods<T> = { [P in keyof T as T[P] extends Function ? P : never]: T[P] };
type H<T> = T[keyof Methods<T>]; // Ok

// `Filter<T>` only filters out some keys of `T`.
type Filter<T> = { [P in keyof T as T[P] extends Function ? P : never]: T[P] };
// `Modify<T>` might modify some keys of `T`.
type Modify<T> = { [P in keyof T as P extends string? `bool${P}`: P]: T[P] };

function fun<T>(val: T) {
    let x: Filter<T> = val; // Ok
    let y: Modify<T> = val; // Error
}

type FilterInclOpt<T> = { [P in keyof T as T[P] extends Function ? P : never]+?: T[P] };
type ModifyInclOpt<T> = { [P in keyof T as P extends string? `bool${P}`: never ]+?: T[P] };
type FilterExclOpt<T> = { [P in keyof T as T[P] extends Function ? P : never]-?: T[P] };
type ModifyExclOpt<T> = { [P in keyof T as P extends string? `bool${P}`: never ]-?: T[P] };

function fun2<T>(val: T) {
    let x: FilterInclOpt<T> = val; // Ok
    let y: ModifyInclOpt<T> = val; // Ok
    let z: FilterExclOpt<T> = val; // Error
    let w: ModifyExclOpt<T> = val; // Error
}




//// [mappedTypeAsClauseRelationships.js]
function fun(val) {
    var x = val; // Ok
    var y = val; // Error
}
function fun2(val) {
    var x = val; // Ok
    var y = val; // Ok
    var z = val; // Error
    var w = val; // Error
}
