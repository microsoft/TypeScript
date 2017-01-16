//// [promiseTypeStrictNull.ts]
declare var p: Promise<boolean>;

const a = p.then();
const b = p.then(b => 1);
const c = p.then(b => 1, e => 'error');
const d = p.then(b => 1, e => { });
const e = p.then(b => 1, e => { throw Error(); });
const f = p.then(b => 1, e => Promise.reject(Error()));
const g = p.catch(e => 'error');
const h = p.catch(e => { });
const i = p.catch(e => { throw Error(); });
const j = p.catch(e => Promise.reject(Error()));

async function A() {
    const a = await p;
    return a;
}

async function B() {
    const a = await p;
    return 1;
}

// NOTE: This reports a "No best comment type exists among return expressions." error, and is
//       ignored to get the types result for the test.
// async function C() {
//     try {
//         const a = await p;
//         return 1;
//     }
//     catch (e) {
//         return 'error';
//     }
// }

async function D() {
    try {
        const a = await p;
        return 1;
    }
    catch (e) {
    }
}

async function E() {
    try {
        const a = await p;
        return 1;
    }
    catch (e) {
        throw Error();
    }
}

async function F() {
    try {
        const a = await p;
        return 1;
    }
    catch (e) {
        return Promise.reject(Error());
    }
}

async function G() {
    try {
        const a = await p;
        return a;
    }
    catch (e) {
        return;
    }
}

async function H() {
    try {
        const a = await p;
        return a;
    }
    catch (e) {
        throw Error();
    }
}

async function I() {
    try {
        const a = await p;
        return a;
    }
    catch (e) {
        return Promise.reject(Error());
    }
}

// addresses github issue #4903:

const p00 = p.catch();
const p01 = p.catch(undefined);
const p07 = p.catch(null);
const p02 = p.catch(() => 1);
const p03 = p.catch(() => {});
const p04 = p.catch(() => {throw 1});
const p05 = p.catch(() => Promise.reject(1));
const p06 = p.catch(() => Promise.resolve(1));

const p10 = p.then();

const p20 = p.then(undefined);
const p21 = p.then(() => 1);
const p22 = p.then(() => {});
const p23 = p.then(() => {throw 1});
const p24 = p.then(() => Promise.resolve(1));
const p25 = p.then(() => Promise.reject(1));

const p30 = p.then(undefined, undefined);
const p31 = p.then(undefined, () => 1);
const p32 = p.then(undefined, () => {});
const p33 = p.then(undefined, () => {throw 1});
const p34 = p.then(undefined, () => Promise.resolve(1));
const p35 = p.then(undefined, () => Promise.reject(1));

const p40 = p.then(() => "1", undefined);
const p41 = p.then(() => "1", () => 1);
const p42 = p.then(() => "1", () => {});
const p43 = p.then(() => "1", () => {throw 1});
const p44 = p.then(() => "1", () => Promise.resolve(1));
const p45 = p.then(() => "1", () => Promise.reject(1));

const p50 = p.then(() => {}, undefined);
const p51 = p.then(() => {}, () => 1);
const p52 = p.then(() => {}, () => {});
const p53 = p.then(() => {}, () => {throw 1});
const p54 = p.then(() => {}, () => Promise.resolve(1));
const p55 = p.then(() => {}, () => Promise.reject(1));

const p60 = p.then(() => {throw 1}, undefined);
const p61 = p.then(() => {throw 1}, () => 1);
const p62 = p.then(() => {throw 1}, () => {});
const p63 = p.then(() => {throw 1}, () => {throw 1});
const p64 = p.then(() => {throw 1}, () => Promise.resolve(1));
const p65 = p.then(() => {throw 1}, () => Promise.reject(1));

const p70 = p.then(() => Promise.resolve("1"), undefined);
const p71 = p.then(() => Promise.resolve("1"), () => 1);
const p72 = p.then(() => Promise.resolve("1"), () => {});
const p73 = p.then(() => Promise.resolve("1"), () => {throw 1});
const p74 = p.then(() => Promise.resolve("1"), () => Promise.resolve(1));
const p75 = p.then(() => Promise.resolve("1"), () => Promise.reject(1));

const p80 = p.then(() => Promise.reject(1), undefined);
const p81 = p.then(() => Promise.reject(1), () => 1);
const p82 = p.then(() => Promise.reject(1), () => {});
const p83 = p.then(() => Promise.reject(1), () => {throw 1});
const p84 = p.then(() => Promise.reject(1), () => Promise.resolve(1));
const p85 = p.then(() => Promise.reject(1), () => Promise.reject(1));

//// [promiseTypeStrictNull.js]
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const a = p.then();
const b = p.then(b => 1);
const c = p.then(b => 1, e => 'error');
const d = p.then(b => 1, e => { });
const e = p.then(b => 1, e => { throw Error(); });
const f = p.then(b => 1, e => Promise.reject(Error()));
const g = p.catch(e => 'error');
const h = p.catch(e => { });
const i = p.catch(e => { throw Error(); });
const j = p.catch(e => Promise.reject(Error()));
function A() {
    return __awaiter(this, void 0, void 0, function* () {
        const a = yield p;
        return a;
    });
}
function B() {
    return __awaiter(this, void 0, void 0, function* () {
        const a = yield p;
        return 1;
    });
}
// NOTE: This reports a "No best comment type exists among return expressions." error, and is
//       ignored to get the types result for the test.
// async function C() {
//     try {
//         const a = await p;
//         return 1;
//     }
//     catch (e) {
//         return 'error';
//     }
// }
function D() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const a = yield p;
            return 1;
        }
        catch (e) {
        }
    });
}
function E() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const a = yield p;
            return 1;
        }
        catch (e) {
            throw Error();
        }
    });
}
function F() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const a = yield p;
            return 1;
        }
        catch (e) {
            return Promise.reject(Error());
        }
    });
}
function G() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const a = yield p;
            return a;
        }
        catch (e) {
            return;
        }
    });
}
function H() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const a = yield p;
            return a;
        }
        catch (e) {
            throw Error();
        }
    });
}
function I() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const a = yield p;
            return a;
        }
        catch (e) {
            return Promise.reject(Error());
        }
    });
}
// addresses github issue #4903:
const p00 = p.catch();
const p01 = p.catch(undefined);
const p07 = p.catch(null);
const p02 = p.catch(() => 1);
const p03 = p.catch(() => { });
const p04 = p.catch(() => { throw 1; });
const p05 = p.catch(() => Promise.reject(1));
const p06 = p.catch(() => Promise.resolve(1));
const p10 = p.then();
const p20 = p.then(undefined);
const p21 = p.then(() => 1);
const p22 = p.then(() => { });
const p23 = p.then(() => { throw 1; });
const p24 = p.then(() => Promise.resolve(1));
const p25 = p.then(() => Promise.reject(1));
const p30 = p.then(undefined, undefined);
const p31 = p.then(undefined, () => 1);
const p32 = p.then(undefined, () => { });
const p33 = p.then(undefined, () => { throw 1; });
const p34 = p.then(undefined, () => Promise.resolve(1));
const p35 = p.then(undefined, () => Promise.reject(1));
const p40 = p.then(() => "1", undefined);
const p41 = p.then(() => "1", () => 1);
const p42 = p.then(() => "1", () => { });
const p43 = p.then(() => "1", () => { throw 1; });
const p44 = p.then(() => "1", () => Promise.resolve(1));
const p45 = p.then(() => "1", () => Promise.reject(1));
const p50 = p.then(() => { }, undefined);
const p51 = p.then(() => { }, () => 1);
const p52 = p.then(() => { }, () => { });
const p53 = p.then(() => { }, () => { throw 1; });
const p54 = p.then(() => { }, () => Promise.resolve(1));
const p55 = p.then(() => { }, () => Promise.reject(1));
const p60 = p.then(() => { throw 1; }, undefined);
const p61 = p.then(() => { throw 1; }, () => 1);
const p62 = p.then(() => { throw 1; }, () => { });
const p63 = p.then(() => { throw 1; }, () => { throw 1; });
const p64 = p.then(() => { throw 1; }, () => Promise.resolve(1));
const p65 = p.then(() => { throw 1; }, () => Promise.reject(1));
const p70 = p.then(() => Promise.resolve("1"), undefined);
const p71 = p.then(() => Promise.resolve("1"), () => 1);
const p72 = p.then(() => Promise.resolve("1"), () => { });
const p73 = p.then(() => Promise.resolve("1"), () => { throw 1; });
const p74 = p.then(() => Promise.resolve("1"), () => Promise.resolve(1));
const p75 = p.then(() => Promise.resolve("1"), () => Promise.reject(1));
const p80 = p.then(() => Promise.reject(1), undefined);
const p81 = p.then(() => Promise.reject(1), () => 1);
const p82 = p.then(() => Promise.reject(1), () => { });
const p83 = p.then(() => Promise.reject(1), () => { throw 1; });
const p84 = p.then(() => Promise.reject(1), () => Promise.resolve(1));
const p85 = p.then(() => Promise.reject(1), () => Promise.reject(1));
