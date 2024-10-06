// @strict: true
// @noEmit: true

type Identity<T> = { [K in keyof T]: T[K] };

type M0 = { a: 1, b: 2 };

type M1 = { [K in keyof Partial<M0>]: M0[K] };

type M2 = { [K in keyof Required<M1>]: M1[K] };

type M3 = { [K in keyof Identity<Partial<M0>>]: M0[K] };

function foo<K extends keyof M0>(m1: M1[K], m2: M2[K], m3: M3[K]) {
    m1.toString();  // Error
    m1?.toString();
    m2.toString();  // Error
    m2?.toString();
    m3.toString();  // Error
    m3?.toString();
}

// Repro from #57487

type Obj = {
    a: 1,
    b: 2
};

const mapped: { [K in keyof Partial<Obj>]: Obj[K] } = {};

const resolveMapped = <K extends keyof typeof mapped>(key: K) => mapped[key].toString();  // Error

// Additional repro from #57487

const arr = ["foo", "12", 42] as const;

type Mappings = { foo: boolean, "12": number, 42: string };

type MapperArgs<K extends (typeof arr)[number]> = {
    v: K,
    i: number
};

type SetOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

type PartMappings = SetOptional<Mappings, "foo">;

const mapper: { [K in keyof PartMappings]: (o: MapperArgs<K>) => PartMappings[K] } = {
    foo: ({ v, i }) => v.length + i > 4,
    "12": ({ v, i }) => Number(v) + i,
    42: ({ v, i }) => `${v}${i}`,
}

const resolveMapper1 = <K extends keyof typeof mapper>(
    key: K, o: MapperArgs<K>) => mapper[key](o);  // Error

const resolveMapper2 = <K extends keyof typeof mapper>(
    key: K, o: MapperArgs<K>) => mapper[key]?.(o)

// Repro from #57860

type Obj1 = {
    a: string;
    b: number;
};

type Obj2 = {
    b: number;
    c: boolean;
};

declare const mapIntersection: {
    [K in keyof (Partial<Obj1> & Required<Obj2>)]: number;
};

const accessMapped = <K extends keyof Obj2>(key: K) => mapIntersection[key].toString();

declare const resolved: { a?: number | undefined; b: number; c: number };

const accessResolved = <K extends keyof Obj2>(key: K) => resolved[key].toString();

// Additional repro from #57860

type Foo = {
    prop: string;
}

function test<K extends keyof Foo>(obj: Pick<Required<Foo> & Partial<Foo>, K>, key: K) {
    obj[key].length;
}
