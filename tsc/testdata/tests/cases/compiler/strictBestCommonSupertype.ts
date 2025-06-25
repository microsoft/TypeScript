// @strict: true
// @noEmit: true

// https://github.com/microsoft/typescript-go/issues/1222

class Store<T = object> {
    select<K>(mapFn: (state: T) => K) {};
}

const store: Store = inject(Store);

function inject<T>(token: ProviderToken<T>): T {
    return {} as T;
}

interface Type<T> extends Function {
    new (...args: any[]): T;
}

type ProviderToken<T> = Type<T> | AbstractType<T>;

interface AbstractType<T> extends Function {
    prototype: T;
}
