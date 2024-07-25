// @strict: true

type Model = {
    a: string;
    b: number;
};

type MappedModel<Suffix extends string> = {
    [K in keyof Model as `${K}${Suffix}`]: Model[K];
};

const foo1: MappedModel<'Foo'> = { aFoo: 'test', bFoo: 42 };
const foo2: MappedModel<'Foo'> = { bFoo: 'bar' };  // Error

function f1<T extends string>() {
    const x1: MappedModel<T> = 42;  // Error
    const x2: MappedModel<T> = 'test';  // Error
    const x3: MappedModel<T> = [1, 2, 3];  // Error
    const x4: MappedModel<T> = false;  // Error
    const x5: MappedModel<T> = { a: 'bar', b: 42 };  // Error
    const x6: MappedModel<T> = undefined;  // Error
}

// repro from #43189

type RemapRecord<K extends keyof any, V> = { [_ in never as K]: V }
interface RecordInterface2<K extends keyof any, V> extends RemapRecord<K, V> {} // should error
