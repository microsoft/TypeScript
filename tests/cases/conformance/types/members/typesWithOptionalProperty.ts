// basic uses of optional properties without errors

interface I {
    foo: string;
    bar?: number;
    baz? (): string;
}

var a: {
    foo: string;
    bar?: number;
    baz? (): string;
};

var b = { foo: '' };
var c = { foo: '', bar: 3 };
var d = { foo: '', bar: 3, baz: () => '' };

var i: I;

i = b;
i = c;
i = d;

a = b;
a = c;
a = d;

i = a;
a = i;