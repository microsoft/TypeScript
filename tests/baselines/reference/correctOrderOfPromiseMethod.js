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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function countEverything() {
    return __awaiter(this, void 0, void 0, function* () {
        const providerA = () => __awaiter(this, void 0, void 0, function* () { return []; });
        const providerB = () => __awaiter(this, void 0, void 0, function* () { return []; });
        const [resultA, resultB] = yield Promise.all([
            providerA(),
            providerB(),
        ]);
        const dataA = resultA;
        const dataB = resultB;
        if (dataA && dataB) {
            return dataA.length + dataB.length;
        }
        return 0;
    });
}
// #31179
const expected = Promise.all(undefined);
