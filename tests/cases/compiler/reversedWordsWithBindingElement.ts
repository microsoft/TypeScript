interface Foo {
    enum: string;
    case: number;
}

function bar({ enum, case }: Foo) {
    if (enum && case) {
        //
    }
}

const enum = 123;

function enum () { };

class enum { } ;

const data = { in: 1 };
const { in } = data;