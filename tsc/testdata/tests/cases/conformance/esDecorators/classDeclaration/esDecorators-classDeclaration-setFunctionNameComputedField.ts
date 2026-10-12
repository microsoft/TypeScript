// @target: es2022
// @useDefineForClassFields: true, false
// @noEmitHelpers: true
// @noTypesAndSymbols: true

declare let dec: any;

const keys = {
    get field(): "field" { return "field"; }
};

@dec class C {
    #self = C;
    [keys.field] = 0;
}

export {};
