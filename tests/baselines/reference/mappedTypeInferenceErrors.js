//// [tests/cases/conformance/types/mapped/mappedTypeInferenceErrors.ts] ////

//// [mappedTypeInferenceErrors.ts]
// Repro from #19316

type ComputedOf<T> = {
    [K in keyof T]: () => T[K];
}

declare function foo<P, C>(options: { props: P, computed: ComputedOf<C> } & ThisType<P & C>): void;

foo({
    props: { x: 10, y: 20 },
    computed: {
        bar(): number {
            let z = this.bar;
            return 42;
        },
        baz: 42
    }
});


//// [mappedTypeInferenceErrors.js]
"use strict";
// Repro from #19316
foo({
    props: { x: 10, y: 20 },
    computed: {
        bar: function () {
            var z = this.bar;
            return 42;
        },
        baz: 42
    }
});
