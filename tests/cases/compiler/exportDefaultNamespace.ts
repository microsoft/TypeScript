// https://github.com/Microsoft/TypeScript/issues/3792
// @Filename: a.ts

/**
 * namespace A 1 leading comment
 */
export default namespace A {
    export const A1 = 42;
} // namespace A 1 trailing comment

/**
 * namespace A 2 leading comment
 */
export default namespace A {
    export function A2() {
        return 0xC0FFEE;
    }
} // namespace A 2 trailing comment

const namespaceAUsage1 = A.A1;

/**
 * namespace B 1 leading comment
 */
export namespace B {
    export const B1 = 42;
} // namespace B 1 trailing comment

/**
 * namespace B 2 leading comment
 */
export namespace B {
    export function B2() {
        return 0xC0FFEE;
    }
} // namespace B 2 trailing comment

const namespaceBUsage1 = B.B2();

namespace ns {
    /**
     * namespace C 1 leading comment
     */
    export namespace C {
        export const C1 = 42;
    } // namespace C 1 trailing comment

    /**
     * namespace C 2 leading comment
     */
    export namespace C {
        export function C2() {
            return 0xC0FFEE;
        }
    } // namespace C 2 trailing comment

    const namespaceCUsage1 = C.C1;
}

namespace ns {
    /**
     * namespace C 3 leading comment
     */
    export namespace C {
        export class C3 { }
    } // namespace C 3 trailing comment
}

namespace ns {
    const namespaceCUsage2 = C.C1;
}


// @Filename: b.ts
import A, { B } from './a';

const namespaceAExternalUsage1 = A.A1;
const namespaceBExternalUsage1 = B.B2;