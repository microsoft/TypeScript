//// [this_inside-object-literal-getters-and-setters.ts]
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



//// [this_inside-object-literal-getters-and-setters.js]
var ObjectLiteral;
(function (ObjectLiteral) {
    var ThisInObjectLiteral = {
        _foo: '1',
        get foo() {
            return this._foo;
        },
        set foo(value) {
            this._foo = value;
        },
        test: function () {
            return this._foo;
        }
    };
})(ObjectLiteral || (ObjectLiteral = {}));
