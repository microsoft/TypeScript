// @target: esnext
// @useDefineForClassFields: false

class Foo {
    [key: string]: number;

    #a: boolean;
    #b = false;
}
