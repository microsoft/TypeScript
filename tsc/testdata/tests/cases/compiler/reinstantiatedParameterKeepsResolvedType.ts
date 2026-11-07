// @strict: true
// @noEmit: true

// Instantiating E := {} turns the type of v into unknown. Inferring
// K := never must not then turn it into {}['V'][never], which is never.
interface I<E extends { V?: object }> {
    f<K extends keyof E['V']>(k: K, v: E['V'][K]): void;
}
declare const i: I<{}>;
i.f("x" as never, 1);
