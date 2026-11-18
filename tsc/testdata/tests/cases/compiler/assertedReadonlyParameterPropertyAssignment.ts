// @strict: true
// @target: es2015
// @noEmit: true

class ReadonlyState {
    constructor(readonly value: object) {}
    clear() {
        (this.value as unknown) = null;
    }
}
