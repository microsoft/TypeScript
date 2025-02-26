// @declaration: true
export class Foo {
    private _property: string = '';
    protected _property2: string = '';
    constructor(arg: Foo['_property'], other: Foo['_property2']) {
    }
}