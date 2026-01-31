//// [tests/cases/compiler/collisionThisExpressionAndLocalVarWithSuperExperssion.ts] ////

//// [collisionThisExpressionAndLocalVarWithSuperExperssion.ts]
class a {
    public foo() {
    }
}
class b extends a {
    public foo() {
        var _this = 10;
        var f = () => super.foo();
    }
}
class b2 extends a {
    public foo() {
        var f = () => {
            var _this = 10;
            return super.foo()
        }
    }
}

//// [collisionThisExpressionAndLocalVarWithSuperExperssion.js]
class a {
    foo() {
    }
}
class b extends a {
    foo() {
        var _this = 10;
        var f = () => super.foo();
    }
}
class b2 extends a {
    foo() {
        var f = () => {
            var _this = 10;
            return super.foo();
        };
    }
}
