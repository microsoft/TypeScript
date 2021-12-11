//// [correlatedUnions.ts]
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


//// [correlatedUnions.js]
"use strict";
// Various repros from #30581
function processRecord(rec) {
    rec.f(rec.v);
}
processRecord(r1);
processRecord(r2);
processRecord({ kind: 'n', v: 42, f: function (v) { return v.toExponential(); } });
function renderTextField(props) { }
function renderSelectField(props) { }
var renderFuncs = {
    text: renderTextField,
    select: renderSelectField
};
function renderField(field) {
    var renderFn = renderFuncs[field.type];
    renderFn(field.data);
}
var handlers = {
    foo: function (s) { return s.length; },
    bar: function (n) { return n.toFixed(2); }
};
var data = [
    { type: 'foo', data: 'abc' },
    { type: 'foo', data: 'def' },
    { type: 'bar', data: 42 },
];
function process(data) {
    data.forEach(function (block) {
        if (block.type in handlers) {
            handlers[block.type](block.data);
        }
    });
}
process(data);
process([{ type: 'foo', data: 'abc' }]);
function call(_a) {
    var letter = _a.letter, caller = _a.caller;
    caller(letter);
}
call(xx);
function processEvents(events) {
    var _loop_1 = function (event_1) {
        document.addEventListener(event_1.name, function (ev) { return event_1.callback(ev); }, { once: event_1.once });
    };
    for (var _i = 0, events_1 = events; _i < events_1.length; _i++) {
        var event_1 = events_1[_i];
        _loop_1(event_1);
    }
}
function createEventListener(_a) {
    var name = _a.name, _b = _a.once, once = _b === void 0 ? false : _b, callback = _a.callback;
    return { name: name, once: once, callback: callback };
}
var clickEvent = createEventListener({
    name: "click",
    callback: function (ev) { return console.log(ev); }
});
var scrollEvent = createEventListener({
    name: "scroll",
    callback: function (ev) { return console.log(ev); }
});
processEvents([clickEvent, scrollEvent]);
processEvents([
    { name: "click", callback: function (ev) { return console.log(ev); } },
    { name: "scroll", callback: function (ev) { return console.log(ev); } },
]);
// --------
function ff1() {
    var funs = {
        sum: function (a, b) { return a + b; },
        concat: function (a, b, c) { return a + b + c; }
    };
    function apply(funKey) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var fn = funs[funKey];
        fn.apply(void 0, args);
    }
    var x1 = apply('sum', 1, 2);
    var x2 = apply('concat', 'str1', 'str2', 'str3');
}


//// [correlatedUnions.d.ts]
declare type RecordMap = {
    n: number;
    s: string;
    b: boolean;
};
declare type UnionRecord<K extends keyof RecordMap = keyof RecordMap> = {
    [P in K]: {
        kind: P;
        v: RecordMap[P];
        f: (v: RecordMap[P]) => void;
    };
}[K];
declare function processRecord<K extends keyof RecordMap>(rec: UnionRecord<K>): void;
declare const r1: UnionRecord<'n'>;
declare const r2: UnionRecord;
declare type TextFieldData = {
    value: string;
};
declare type SelectFieldData = {
    options: string[];
    selectedValue: string;
};
declare type FieldMap = {
    text: TextFieldData;
    select: SelectFieldData;
};
declare type FormField<K extends keyof FieldMap> = {
    type: K;
    data: FieldMap[K];
};
declare type RenderFunc<K extends keyof FieldMap> = (props: FieldMap[K]) => void;
declare type RenderFuncMap = {
    [K in keyof FieldMap]: RenderFunc<K>;
};
declare function renderTextField(props: TextFieldData): void;
declare function renderSelectField(props: SelectFieldData): void;
declare const renderFuncs: RenderFuncMap;
declare function renderField<K extends keyof FieldMap>(field: FormField<K>): void;
declare type TypeMap = {
    foo: string;
    bar: number;
};
declare type Keys = keyof TypeMap;
declare type HandlerMap = {
    [P in Keys]: (x: TypeMap[P]) => void;
};
declare const handlers: HandlerMap;
declare type DataEntry<K extends Keys = Keys> = {
    [P in K]: {
        type: P;
        data: TypeMap[P];
    };
}[K];
declare const data: DataEntry[];
declare function process<K extends Keys>(data: DataEntry<K>[]): void;
declare type LetterMap = {
    A: string;
    B: number;
};
declare type LetterCaller<K extends keyof LetterMap> = {
    [P in K]: {
        letter: Record<P, LetterMap[P]>;
        caller: (x: Record<P, LetterMap[P]>) => void;
    };
}[K];
declare function call<K extends keyof LetterMap>({ letter, caller }: LetterCaller<K>): void;
declare type A = {
    A: string;
};
declare type B = {
    B: number;
};
declare type ACaller = (a: A) => void;
declare type BCaller = (b: B) => void;
declare const xx: {
    letter: A;
    caller: ACaller;
} | {
    letter: B;
    caller: BCaller;
};
declare type Ev<K extends keyof DocumentEventMap> = {
    [P in K]: {
        readonly name: P;
        readonly once?: boolean;
        readonly callback: (ev: DocumentEventMap[P]) => void;
    };
}[K];
declare function processEvents<K extends keyof DocumentEventMap>(events: Ev<K>[]): void;
declare function createEventListener<K extends keyof DocumentEventMap>({ name, once, callback }: Ev<K>): Ev<K>;
declare const clickEvent: {
    readonly name: "click";
    readonly once?: boolean | undefined;
    readonly callback: (ev: MouseEvent) => void;
};
declare const scrollEvent: {
    readonly name: "scroll";
    readonly once?: boolean | undefined;
    readonly callback: (ev: Event) => void;
};
declare function ff1(): void;
