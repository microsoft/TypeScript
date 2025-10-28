//// [tests/cases/compiler/spreadExpressionContextualType.ts] ////

//// [spreadExpressionContextualType.ts]
// Repro from #43966

interface Orange {
    name: string;
}

interface Apple {
    name: string;
}

function test<T extends Apple | Orange>(item: T): T {
    return { ...item };
}

function test2<T extends Apple | Orange>(item: T): T {
    const x = { ...item };
    return x;
}


//// [spreadExpressionContextualType.js]
// Repro from #43966
function test(item) {
    return Object.assign({}, item);
}
function test2(item) {
    const x = Object.assign({}, item);
    return x;
}


//// [spreadExpressionContextualType.d.ts]
interface Orange {
    name: string;
}
interface Apple {
    name: string;
}
declare function test<T extends Apple | Orange>(item: T): T;
declare function test2<T extends Apple | Orange>(item: T): T;
