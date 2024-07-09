// @strict: true
// @noUnusedLocals: true
// @target: esnext, es2022

class Foo {
    #unused: undefined; // expect unused error
    #brand: undefined; // expect no error

    isFoo(v: any): v is Foo {
        // This should count as using/reading '#brand'
        return #brand in v;
    }
}
