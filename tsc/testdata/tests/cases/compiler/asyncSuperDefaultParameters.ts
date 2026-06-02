// @target: es2015
// @noTypesAndSymbols: true

class B {
    m() {
        return 1;
    }
}

class C extends B {
    f() {
        const g = async (b = super.m()) => b;
        return g();
    }

    async h(b = super.m()) {
        return b;
    }
}
