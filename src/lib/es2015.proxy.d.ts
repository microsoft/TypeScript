interface ProxyHandler<T extends object, U extends object> {
    apply?(target: T, thisArg: any, argArray: any[]): any;
    construct?(target: T, argArray: any[], newTarget: Function): object;
    defineProperty?(target: T, p: string | symbol, attributes: PropertyDescriptor): boolean;
    deleteProperty?(target: T, p: string | symbol): boolean;
    get?<K extends keyof U>(target: T, p: K, receiver: U): U[K];
    getOwnPropertyDescriptor?(target: T, p: string | symbol): PropertyDescriptor | undefined;
    getPrototypeOf?(target: T): object | null;
    has?(target: T, p: string | symbol): boolean;
    isExtensible?(target: T): boolean;
    ownKeys?(target: T): ArrayLike<string | symbol>;
    preventExtensions?(target: T): boolean;
    set?<K extends keyof U>(target: T, p: K, value: U[K], receiver: U): boolean;
    setPrototypeOf?(target: T, v: object | null): boolean;
}

interface ProxyConstructor {
    revocable<T extends object>(target: T, handler: ProxyHandler<T, any>): { proxy: T; revoke: () => void; };
    revocable<T extends object, U extends object>(target: T, handler: ProxyHandler<T, U>): { proxy: U; revoke: () => void; };
    new <T extends object>(target: T, handler: ProxyHandler<T, any>): T;
    new <T extends object, U extends object>(target: T, handler: ProxyHandler<T, U>): U;
}
declare var Proxy: ProxyConstructor;
