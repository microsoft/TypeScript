//// [tests/cases/compiler/correctOrderOfPromiseMethod.ts] ////

//// [correctOrderOfPromiseMethod.ts]
interface A {
    id: string
}

interface B {
    id: string
    fieldB: string
}

async function countEverything(): Promise<number> {
    const providerA = async (): Promise<A[]> => { return [] }
    const providerB = async (): Promise<B[]> => { return [] }

    const [resultA, resultB] = await Promise.all([
        providerA(),
        providerB(),
    ]);

    const dataA: A[] = resultA;
    const dataB: B[] = resultB;
    if (dataA && dataB) {
        return dataA.length + dataB.length;
    }
    return 0;
}

// #31179

const expected: Promise<["a", "b", "c"]> = Promise.all(undefined as readonly ["a", "b", "c"]);


//// [correctOrderOfPromiseMethod.js]
async function countEverything() {
    const providerA = async () => { return []; };
    const providerB = async () => { return []; };
    const [resultA, resultB] = await Promise.all([
        providerA(),
        providerB(),
    ]);
    const dataA = resultA;
    const dataB = resultB;
    if (dataA && dataB) {
        return dataA.length + dataB.length;
    }
    return 0;
}
// #31179
const expected = Promise.all(undefined);
