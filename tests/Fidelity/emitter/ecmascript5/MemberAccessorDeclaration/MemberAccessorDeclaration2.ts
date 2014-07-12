class C {
    get foo(): number {
        return 0;
    }
    set foo1(a: number) {
        var v = a => { };
    }
}

module M1.M2 {
    class C {
        get foo(): number {
            return 0;
        }
        set foo1(a: number) {
            var v = a => { };
        }
    }
}