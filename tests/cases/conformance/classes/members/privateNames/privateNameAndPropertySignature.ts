type A = {
    #foo: string
}

interface B {
    #foo: string;
}

declare const x: {
    #foo: number;
    bar: {
        #baz: string;
    }
};

declare const y: [{ qux: { #quux: 3 } }];
