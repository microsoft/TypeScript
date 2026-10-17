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

function* g() {
    const f1 = a ? yield async(...c) : 0;
    const f2 = a ? yield async(...c) : x => x;
}
