//// [parserRegularExpressionDivideAmbiguity6.ts]
function c255lsqr8h(a7, a6, a5, a4, a3, a2, a1, a0) {
    let r = [];
    let v;
    r[0] = (v = a0*a0) & 0xFFFF;
    r[1] = (v = ((v / 0x10000) | 0) + 2*a0*a1) & 0xFFFF;
    r[2] = (v = ((v / 0x10000) | 0) + 2*a0*a2 + a1*a1) & 0xFFFF;
    r[3] = (v = ((v / 0x10000) | 0) + 2*a0*a3 + 2*a1*a2) & 0xFFFF;
    r[4] = (v = ((v / 0x10000) | 0) + 2*a0*a4 + 2*a1*a3 + a2*a2) & 0xFFFF;
    r[5] = (v = ((v / 0x10000) | 0) + 2*a0*a5 + 2*a1*a4 + 2*a2*a3) & 0xFFFF;
    r[6] = (v = ((v / 0x10000) | 0) + 2*a0*a6 + 2*a1*a5 + 2*a2*a4 + a3*a3) & 0xFFFF;
    r[7] = (v = ((v / 0x10000) | 0) + 2*a0*a7 + 2*a1*a6 + 2*a2*a5 + 2*a3*a4) & 0xFFFF;
    r[8] = (v = ((v / 0x10000) | 0) + 2*a1*a7 + 2*a2*a6 + 2*a3*a5 + a4*a4) & 0xFFFF;
    r[9] = (v = ((v / 0x10000) | 0) + 2*a2*a7 + 2*a3*a6 + 2*a4*a5) & 0xFFFF;
    r[10] = (v = ((v / 0x10000) | 0) + 2*a3*a7 + 2*a4*a6 + a5*a5) & 0xFFFF;
    r[11] = (v = ((v / 0x10000) | 0) + 2*a4*a7 + 2*a5*a6) & 0xFFFF;
    r[12] = (v = ((v / 0x10000) | 0) + 2*a5*a7 + a6*a6) & 0xFFFF;
    r[13] = (v = ((v / 0x10000) | 0) + 2*a6*a7) & 0xFFFF;
    r[14] = (v = ((v / 0x10000) | 0) + a7*a7) & 0xFFFF;
    r[15] = ((v / 0x10000) | 0);
    return r;
}


//// [parserRegularExpressionDivideAmbiguity6.js]
function c255lsqr8h(a7, a6, a5, a4, a3, a2, a1, a0) {
    var r = [];
    var v;
    r[0] = (v = a0 * a0) & 0xFFFF;
    r[1] = (v = ((v / 0x10000) | 0) + 2 * a0 * a1) & 0xFFFF;
    r[2] = (v = ((v / 0x10000) | 0) + 2 * a0 * a2 + a1 * a1) & 0xFFFF;
    r[3] = (v = ((v / 0x10000) | 0) + 2 * a0 * a3 + 2 * a1 * a2) & 0xFFFF;
    r[4] = (v = ((v / 0x10000) | 0) + 2 * a0 * a4 + 2 * a1 * a3 + a2 * a2) & 0xFFFF;
    r[5] = (v = ((v / 0x10000) | 0) + 2 * a0 * a5 + 2 * a1 * a4 + 2 * a2 * a3) & 0xFFFF;
    r[6] = (v = ((v / 0x10000) | 0) + 2 * a0 * a6 + 2 * a1 * a5 + 2 * a2 * a4 + a3 * a3) & 0xFFFF;
    r[7] = (v = ((v / 0x10000) | 0) + 2 * a0 * a7 + 2 * a1 * a6 + 2 * a2 * a5 + 2 * a3 * a4) & 0xFFFF;
    r[8] = (v = ((v / 0x10000) | 0) + 2 * a1 * a7 + 2 * a2 * a6 + 2 * a3 * a5 + a4 * a4) & 0xFFFF;
    r[9] = (v = ((v / 0x10000) | 0) + 2 * a2 * a7 + 2 * a3 * a6 + 2 * a4 * a5) & 0xFFFF;
    r[10] = (v = ((v / 0x10000) | 0) + 2 * a3 * a7 + 2 * a4 * a6 + a5 * a5) & 0xFFFF;
    r[11] = (v = ((v / 0x10000) | 0) + 2 * a4 * a7 + 2 * a5 * a6) & 0xFFFF;
    r[12] = (v = ((v / 0x10000) | 0) + 2 * a5 * a7 + a6 * a6) & 0xFFFF;
    r[13] = (v = ((v / 0x10000) | 0) + 2 * a6 * a7) & 0xFFFF;
    r[14] = (v = ((v / 0x10000) | 0) + a7 * a7) & 0xFFFF;
    r[15] = ((v / 0x10000) | 0);
    return r;
}
