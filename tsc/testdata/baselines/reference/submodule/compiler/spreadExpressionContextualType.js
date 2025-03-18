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
function test(item) {
    return { ...item };
}
function test2(item) {
    const x = { ...item };
    return x;
}
