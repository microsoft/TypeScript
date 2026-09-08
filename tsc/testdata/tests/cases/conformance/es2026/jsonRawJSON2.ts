// @target: esnext
// @lib: es2025,es2026.json
// @noEmit: true
// @strict: true

const a: RawJSON = JSON.rawJSON("1");
const b: string = a.rawJSON;
const c: object = a;
const d: { readonly rawJSON: string } = a;
const e: RawJSON = a;

const f: RawJSON = { rawJSON: "1" };
const g = { rawJSON: "1" };
const h: RawJSON = g;
const i: RawJSON = Object.freeze(g);
const j: RawJSON = { ...a };
const k: RawJSON = { rawJSON: "1", RawJSON_typekey: a };

class A {
    private RawJSON_typekey!: RawJSON;
    readonly rawJSON = "1";
}
const l: RawJSON = new A();
class B implements RawJSON {
    readonly rawJSON = "1";
}

a.rawJSON = "2";
a.RawJSON_typekey;
declare const m: keyof RawJSON;
const n: "rawJSON" = m;

const o = RawJSON;
new RawJSON();
RawJSONBase;
declare const p: RawJSONBase;
class C extends RawJSON {}

declare const q: unknown;
if (JSON.isRawJSON(q)) {
    const r: RawJSON = q;
    const s: string = q.rawJSON;
}
if (JSON.isRawJSON(g)) {
    const r: RawJSON = g;
} else {
    const s: string = g.rawJSON;
}

const t: Readonly<RawJSON> = a;
const u: RawJSON = t;
const v: RawJSON = Object.freeze(a);
const w: Pick<RawJSON, "rawJSON"> = a;
const x: RawJSON = w;

const y: RawJSON = Object.assign({}, a);
const z: RawJSON = new Proxy(a, {});
