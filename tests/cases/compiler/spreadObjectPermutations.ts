// @strict: true
// @exactOptionalPropertyTypes: false, true


declare const a: { x: string | number };
declare const b: { x?: string | number };
declare const c: { x?: string | number | undefined };

const v_a = { ...a };
const v_b = { ...b };
const v_c = { ...c };
const v_ab = { ...a, ...b };
const v_ac = { ...a, ...c };
const v_ba = { ...b, ...a };
const v_bc = { ...b, ...c };
const v_ca = { ...c, ...a };
const v_cb = { ...c, ...b };
const v_abc = { ...a, ...b, ...c };
const v_acb = { ...a, ...c, ...b };
const v_bac = { ...b, ...a, ...c };
const v_bca = { ...b, ...c, ...a };
const v_cab = { ...c, ...a, ...b };
const v_cba = { ...c, ...b, ...a };
