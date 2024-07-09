interface I {
    foo(value: number);
}

class Bug implements I {
    public foo(value: number) {
    }
}
