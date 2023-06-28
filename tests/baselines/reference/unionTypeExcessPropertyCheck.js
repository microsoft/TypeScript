//// [tests/cases/conformance/types/union/unionTypeExcessPropertyCheck.ts] ////

//// [unionTypeExcessPropertyCheck.ts]
type AC = {
    a: string, 
    c: string
};
type B = {
    b: string
};

// Fails correctly as `b` is not in `AC`
const ac_b: AC = {
        b: '',
        c: ''
};
// Fails correctly as `c` is not in `B`
const b_c: B = {
        b: '',
        c: ''
};
// Should fail because `c` is not in `B` while `b` is not in `AB`, but works instead
const acb_bc: AC|B = {
        b: '',
        c: ''
};
// Fails correctly as `x` in in neither `AC` nor `B`
const acb_bx: AC|B = {
    b: '',
    x: ''
};
// Fails correctly as `x` in in neither `AC` nor `B`
const acb_acx: AC|B = {
    a: '',
    c: '',
    x: ''
};


//// [unionTypeExcessPropertyCheck.js]
// Fails correctly as `b` is not in `AC`
var ac_b = {
    b: '',
    c: ''
};
// Fails correctly as `c` is not in `B`
var b_c = {
    b: '',
    c: ''
};
// Should fail because `c` is not in `B` while `b` is not in `AB`, but works instead
var acb_bc = {
    b: '',
    c: ''
};
// Fails correctly as `x` in in neither `AC` nor `B`
var acb_bx = {
    b: '',
    x: ''
};
// Fails correctly as `x` in in neither `AC` nor `B`
var acb_acx = {
    a: '',
    c: '',
    x: ''
};
