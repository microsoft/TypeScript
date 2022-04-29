// @strict: true

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
