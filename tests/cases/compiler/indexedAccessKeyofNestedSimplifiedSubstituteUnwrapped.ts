type AnyFunction = (...args: any[]) => any;
type Params<T> = Parameters<Extract<T, AnyFunction>>;

interface Wrapper<T> {
	call<K extends keyof T>(event: K, ...args: Params<T[K]>): void;
}

interface AWrapped {
	foo(): void;
}

class A {
	foo: Wrapper<AWrapped>;
}

interface BWrapped extends AWrapped {
	bar(): void;
}

class B extends A {
	foo: Wrapper<BWrapped>;
}