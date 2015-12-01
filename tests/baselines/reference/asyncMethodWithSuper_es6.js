//// [asyncMethodWithSuper_es6.ts]
class A {
    x() {
    }
}

class B extends A {
    async y() {
        super.x();
        super["x"]();
    }
}

//// [asyncMethodWithSuper_es6.js]
class A {
    x() {
    }
}
class B extends A {
    y() {
        const _super = name => super[name];
        return __awaiter(this, void 0, Promise, function* () {
            _super("x").call(this);
            _super("x").call(this);
        });
    }
}
