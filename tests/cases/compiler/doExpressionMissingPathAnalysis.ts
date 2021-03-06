// @noImplicitReturns: true

const c = do {
    try { 1; } catch {} // catch clause missing val
}

const d = do {
    try { } catch { 1; } // try clause missing val
}

const e = do {
    try {1} catch {2} finally {} // this is fine
}

enum F {
    A, B
}

function f(x: F) {
    const a = do {
        switch (x) { } // empty switch
    }
    const b = do {
        switch (x) { case F.A: {} } // empty case
    }
    const c = do {
        // TODO: it should report, not all cases (F.B) handled / missing a default block
        switch (x) { case F.A: 1; }
    }
}

const g = do {
    console.log('') // void returning functions
}
// No problem
const h = do { 1;;;;; }
// No problem
const i = do { "val"; debugger; }
const j = do { throw new Error(""); }
