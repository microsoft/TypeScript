interface Foo {
    enum: string;
    case: number;
}

function bar({ enum, case }: Foo) {
    if (enum && case) {
        //
    }
}
