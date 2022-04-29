//// [checkTypePredicateForRedundantProperties.ts]
function addProp2(x: any): x is { a: string; a: string; } {
    return true;
}


//// [checkTypePredicateForRedundantProperties.js]
function addProp2(x) {
    return true;
}
