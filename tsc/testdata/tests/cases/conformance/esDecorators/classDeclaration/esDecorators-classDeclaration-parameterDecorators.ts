// @target: esnext, es2022, es2015, es5
// @noEmitHelpers: true
// @noTypesAndSymbols: true

declare let dec: any;

class C {
    constructor(@dec x: any) {}
    method(@dec x: any) {}
    set x(@dec x: any) {}
    static method(@dec x: any) {}
    static set x(@dec x: any) {}
}

(class C {
    constructor(@dec x: any) {}
    method(@dec x: any) {}
    set x(@dec x: any) {}
    static method(@dec x: any) {}
    static set x(@dec x: any) {}
});