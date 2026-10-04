// @target: es2022
// @module: es2022
// @declaration: true
// @strict: true

export class Outer<Table> {
    method<Table, R>(r: R) {
        return null as Table | null;
    }
}
