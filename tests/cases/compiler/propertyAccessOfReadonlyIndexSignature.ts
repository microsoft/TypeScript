interface Test {
    readonly [key: string]: string;
}

declare var a: Test;
a.foo = 'baz';
