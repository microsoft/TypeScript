module ObjectLiteral {
    var ThisInObjectLiteral = {
        _foo: '1',
        get foo(): string {
            return this._foo;
        },
        set foo(value: string) {
            this._foo = value;
        },
        test: function () {
            return this._foo;
        }
    }
}

