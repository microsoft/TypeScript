class Foo {
}

class Foo2 extends Foo {
    x() {
        var lambda = (_super: number) => { // Error 
        }
    }
}