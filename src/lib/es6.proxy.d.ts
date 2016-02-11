
interface ProxyHandler<T> {
    getPrototypeOf? (target: T): any;
    setPrototypeOf? (target: T, v: any): boolean;
    isExtensible? (target: T): boolean;
    preventExtensions? (target: T): boolean;
    getOwnPropertyDescriptor? (target: T, p: string | number): PropertyDescriptor;
    has? (target: T, p: string | number): boolean;
    get? (target: T, p: string | number, receiver: any): any;
    set? (target: T, p: string | number, value: any, receiver: any): boolean;
    deleteProperty? (target: T, p: string | number): boolean;
    defineProperty? (target: T, p: string | number, attributes: PropertyDescriptor): boolean;
    enumerate? (target: T): (string | number)[];
    ownKeys? (target: T): (string | number)[];
    apply? (target: T, thisArg: any, argArray?: any): any;
    construct? (target: T, thisArg: any, argArray?: any): any;
}

interface ProxyConstructor {
    revocable<T>(target: T, handler: ProxyHandler<T>): { proxy: T; revoke: () => void; };
    new <T>(target: T, handler: ProxyHandler<T>): T
}
declare var Proxy: ProxyConstructor;