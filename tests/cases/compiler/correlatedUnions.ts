// @strict: true
// @declaration: true

// Various repros from #30581

type RecordMap = { n: number, s: string, b: boolean };
type UnionRecord<K extends keyof RecordMap = keyof RecordMap> = { [P in K]: {
    kind: P,
    v: RecordMap[P],
    f: (v: RecordMap[P]) => void
}}[K];

function processRecord<K extends keyof RecordMap>(rec: UnionRecord<K>) {
    rec.f(rec.v);
}

declare const r1: UnionRecord<'n'>;  // { kind: 'n', v: number, f: (v: number) => void }
declare const r2: UnionRecord;  // { kind: 'n', ... } | { kind: 's', ... } | { kind: 'b', ... }

processRecord(r1);
processRecord(r2);
processRecord({ kind: 'n', v: 42, f: v => v.toExponential() });

// --------

type TextFieldData = { value: string }
type SelectFieldData = { options: string[], selectedValue: string }

type FieldMap = {
    text: TextFieldData;
    select: SelectFieldData;
}

type FormField<K extends keyof FieldMap> = { type: K, data: FieldMap[K] };

type RenderFunc<K extends keyof FieldMap> = (props: FieldMap[K]) => void;
type RenderFuncMap = { [K in keyof FieldMap]: RenderFunc<K> };

function renderTextField(props: TextFieldData) {}
function renderSelectField(props: SelectFieldData) {}

const renderFuncs: RenderFuncMap = {
    text: renderTextField,
    select: renderSelectField,
};

function renderField<K extends keyof FieldMap>(field: FormField<K>) {
    const renderFn = renderFuncs[field.type];
    renderFn(field.data);
}

// --------

type TypeMap = {
    foo: string,
    bar: number
};

type Keys = keyof TypeMap;

type HandlerMap = { [P in Keys]: (x: TypeMap[P]) => void };

const handlers: HandlerMap = {
    foo: s => s.length,
    bar: n => n.toFixed(2)
};

type DataEntry<K extends Keys = Keys> = { [P in K]: {
    type: P,
    data: TypeMap[P]
}}[K];

const data: DataEntry[] = [
    { type: 'foo', data: 'abc' },
    { type: 'foo', data: 'def' },
    { type: 'bar', data: 42 },
];

function process<K extends Keys>(data: DataEntry<K>[]) {
    data.forEach(block => {
        if (block.type in handlers) {
            handlers[block.type](block.data)
        }
    });
}

process(data);
process([{ type: 'foo', data: 'abc' }]);

// --------

type LetterMap = { A: string, B: number }
type LetterCaller<K extends keyof LetterMap> = { [P in K]: { letter: Record<P, LetterMap[P]>, caller: (x: Record<P, LetterMap[P]>) => void } }[K];

function call<K extends keyof LetterMap>({ letter, caller }: LetterCaller<K>): void {
  caller(letter);
}

type A = { A: string };
type B = { B: number };
type ACaller = (a: A) => void;
type BCaller = (b: B) => void;

declare const xx: { letter: A, caller: ACaller } | { letter: B, caller: BCaller };

call(xx);

// --------

type Ev<K extends keyof DocumentEventMap> = { [P in K]: {
    readonly name: P;
    readonly once?: boolean;
    readonly callback: (ev: DocumentEventMap[P]) => void;
}}[K];

function processEvents<K extends keyof DocumentEventMap>(events: Ev<K>[]) {
    for (const event of events) {
        document.addEventListener(event.name, (ev) => event.callback(ev), { once: event.once });
    }
}

function createEventListener<K extends keyof DocumentEventMap>({ name, once = false, callback }: Ev<K>): Ev<K> {
    return { name, once, callback };
}

const clickEvent = createEventListener({
    name: "click",
    callback: ev => console.log(ev),
});

const scrollEvent = createEventListener({
    name: "scroll",
    callback: ev => console.log(ev),
});

processEvents([clickEvent, scrollEvent]);

processEvents([
    { name: "click", callback: ev => console.log(ev) },
    { name: "scroll", callback: ev => console.log(ev) },
]);

// --------

function ff1() {
    type ArgMap = {
        sum: [a: number, b: number],
        concat: [a: string, b: string, c: string]
    }
    type Keys = keyof ArgMap;
    const funs: { [P in Keys]: (...args: ArgMap[P]) => void } = {
        sum: (a, b) => a + b,
        concat: (a, b, c) => a + b + c
    }
    function apply<K extends Keys>(funKey: K, ...args: ArgMap[K]) {
        const fn = funs[funKey];
        fn(...args);
    }
    const x1 = apply('sum', 1, 2)
    const x2 = apply('concat', 'str1', 'str2', 'str3' )
}

// Repro from #47368

type ArgMap = { a: number, b: string };
type Func<K extends keyof ArgMap> = (x: ArgMap[K]) => void;
type Funcs = { [K in keyof ArgMap]: Func<K> };

function f1<K extends keyof ArgMap>(funcs: Funcs, key: K, arg: ArgMap[K]) {
    funcs[key](arg);
}

function f2<K extends keyof ArgMap>(funcs: Funcs, key: K, arg: ArgMap[K]) {
    const func = funcs[key];  // Type Funcs[K]
    func(arg);
}

function f3<K extends keyof ArgMap>(funcs: Funcs, key: K, arg: ArgMap[K]) {
    const func: Func<K> = funcs[key];
    func(arg);
}

function f4<K extends keyof ArgMap>(x: Funcs[keyof ArgMap], y: Funcs[K]) {
    x = y;
}

// Repro from #47890

interface MyObj {
    someKey: {
      name: string;
    }
    someOtherKey: {
      name: number;
    }
}

const ref: MyObj = {
    someKey: { name: "" },
    someOtherKey: { name: 42 }
};

function func<K extends keyof MyObj>(k: K): MyObj[K]['name'] | undefined {
    const myObj: Partial<MyObj>[K] = ref[k];
    if (myObj) {
      return myObj.name;
    }
    const myObj2: Partial<MyObj>[keyof MyObj] = ref[k];
    if (myObj2) {
      return myObj2.name;
    }
    return undefined;
}

// Repro from #48157

interface Foo {
    bar?: string
}

function foo<T extends keyof Foo>(prop: T, f: Required<Foo>) {
    bar(f[prop]);
}

declare function bar(t: string): void;

// Repro from #48246

declare function makeCompleteLookupMapping<T extends ReadonlyArray<any>, Attr extends keyof T[number]>(
    ops: T, attr: Attr): { [Item in T[number]as Item[Attr]]: Item };

const ALL_BARS = [{ name: 'a'}, {name: 'b'}] as const;

const BAR_LOOKUP = makeCompleteLookupMapping(ALL_BARS, 'name');

type BarLookup = typeof BAR_LOOKUP;

type Baz = { [K in keyof BarLookup]: BarLookup[K]['name'] };

// repro from #43982

interface Original {
  prop1: {
    subProp1: string;
    subProp2: string;
  };
  prop2: {
    subProp3: string;
    subProp4: string;
  };
}
type KeyOfOriginal = keyof Original;
type NestedKeyOfOriginalFor<T extends KeyOfOriginal> = keyof Original[T];

type SameKeys<T> = {
  [K in keyof T]: {
    [K2 in keyof T[K]]: number;
  };
};

type MappedFromOriginal = SameKeys<Original>;

const getStringAndNumberFromOriginalAndMapped = <
  K extends KeyOfOriginal,
  N extends NestedKeyOfOriginalFor<K>
>(
  original: Original,
  mappedFromOriginal: MappedFromOriginal,
  key: K,
  nestedKey: N
): [Original[K][N], MappedFromOriginal[K][N]] => {
  return [original[key][nestedKey], mappedFromOriginal[key][nestedKey]];
};

// repro from #31675
interface Config {
  string: string;
  number: number;
}

function getConfigOrDefault<T extends keyof Config>(
  userConfig: Partial<Config>,
  key: T,
  defaultValue: Config[T]
): Config[T] {
  const userValue = userConfig[key]; 
  const assertedCheck = userValue ? userValue! : defaultValue;
  return assertedCheck;
}

// repro from #47523

type Foo1 = {
  x: number;
  y: string;
};

function getValueConcrete<K extends keyof Foo1>(
  o: Partial<Foo1>,
  k: K
): Foo1[K] | undefined {
  return o[k];
}
