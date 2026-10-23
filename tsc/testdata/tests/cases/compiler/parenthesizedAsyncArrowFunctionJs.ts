// @target: es2015
// @strict: false
// @checkJs: true
// @outDir: out
// @filename: a.js

const a = true;
const b = 1;
const c = [b];

function async(...c) {
    return b;
}

const f1 = a ? async(...c) : 0;
const f2 = a ? async(...c) : x => x;
const f3 = a ? async () => async() : x => x;
const f4 = a ? async (...c) => async() : x => x;
const f5 = a ? () => async() : x => x;

const f6 = a ? async() : 0
{}
const f7 = a ? async() : {}
{}

function* g() {
    const f1 = a ? yield async(...c) : 0;
    const f2 = a ? yield async(...c) : x => x;
}

const d = { a: c };
const e = () => c;
const f8 = async(...d.a);
const f9 = async(...e());
const f10 = async(...[b]);
const f11 = a ? async() : function() {};
const f12 = a ? async() : "b"
{}
const f13 = a ? async(...c) : 0
{}
const f14 = a ? (c) : 0
{}
const f15 = a ? async() : 0;
{}

const f16 = a ? a ? async() : d => d : b;
const f17 = a ? a ? async(b) : d => d : b;
const f18 = a ? a ? async(...c) : d => d : b;
const f19 = a ? a ? a ? async() : d => d : b : b;

const f20 = a ? d => a ? (0) : a ? async(b) : async() : (d => d = a);
const f21 = a ? d => d = async () => async() : (d => d = 0);
const f22 = h => a ? async(h = a ? async() : d => d) : d => d;
const f23 = a ? async() : (d => d);
const f24 = a ? async() : d => (a ? async() : d => d);
