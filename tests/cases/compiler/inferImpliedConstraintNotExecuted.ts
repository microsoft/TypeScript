type KnownKeys<T> = {
    [K in keyof T]: string extends K ? never : number extends K ? never : K
} extends { [_ in keyof T]: infer U } ? U : never;


interface HasStringKeys {
    [s: string]: any;
}

interface ThingWithKeys extends HasStringKeys {
    foo: unknown;
    bar: unknown;
}

const demo: KnownKeys<ThingWithKeys> = 'foo';