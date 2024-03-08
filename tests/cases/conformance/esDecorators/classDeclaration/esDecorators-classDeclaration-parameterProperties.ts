// @target: esnext, es2022, es2015, es5
// @useDefineForClassFields: *
// @noEmitHelpers: true
// @noTypesAndSymbols: true

declare var bound: any;

class C {
    constructor(private message: string) {}

    @bound speak() {
    }
}
