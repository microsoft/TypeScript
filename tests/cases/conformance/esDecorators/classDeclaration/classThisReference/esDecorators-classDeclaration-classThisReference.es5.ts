// @target: es5
// @noEmitHelpers: true
// @noTypesAndSymbols: true

declare let dec: any;

@dec
class C {
    static { this; }
    static x: any = this;
    static m() { this; }
    static get g() { return this; }
}
