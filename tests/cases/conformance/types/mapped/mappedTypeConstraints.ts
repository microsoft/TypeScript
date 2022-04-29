// @strict: true

function f0<T extends { a: string, b: string }>(obj: Pick<T, Extract<keyof T, 'b'>>) {
    obj.b;
}

function f1<T extends { a: string, b: string }>(obj: Pick<T, Exclude<keyof T, 'a'>>) {
    obj.b;
}

function f2<T extends { a: string, b: string }, U extends { b: string, c: string }>(obj: Pick<T | U, keyof (T | U)>) {
    obj.b;
}

function f3<T extends { a: string, b: string }, U extends { b: string, c: string }>(obj: Pick<T & U, keyof (T & U)>) {
    obj.a;
    obj.b;
    obj.c;
}

function f4<T extends { a: string, b: string }>(obj: Record<Exclude<keyof T, 'b'> | 'c', string>) {
    obj.a;
    obj.c;
}

// Repro from #28821

type TargetProps = {
    foo: string,
    bar: string
};

const modifier = <T extends TargetProps>(targetProps: T) => {
    let {bar, ...rest} = targetProps;
    rest.foo;
};
