//// [tests/cases/compiler/superCallFromFunction1.ts] ////

//// [superCallFromFunction1.ts]
function foo() {
    super(value => String(value));
}

//// [superCallFromFunction1.js]
function foo() {
    _this = _super.call(this, function (value) { return String(value); }) || this;
}
