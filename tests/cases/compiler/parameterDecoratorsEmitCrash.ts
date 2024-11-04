// @noTypesAndSymbols: true

// https://github.com/microsoft/TypeScript/issues/58269
declare var dec: any;

export class C {
    @dec x: any;
    constructor(@dec x: any) {}
}
