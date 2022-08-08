//// [promiseType.ts]
declare var p: Promise<boolean>;
declare var x: any;

async function A() {
    const a = await p;
    return a;
}

async function B() {
    const a = await p;
    return 1;
}

async function C() {
    try {
        const a = await p;
        return 1;
    }
    catch (e) {
        return 'error';
    }
}

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
const p01 = p.then();

const p10 = p.catch(undefined);
const p11 = p.catch(null);
const p12 = p.catch(() => 1);
const p13 = p.catch(() => x);
const p14 = p.catch(() => undefined);
const p15 = p.catch(() => null);
const p16 = p.catch(() => {});
const p17 = p.catch(() => {throw 1});
const p18 = p.catch(() => Promise.reject(1));
const p19 = p.catch(() => Promise.resolve(1));

const p20 = p.then(undefined);
const p21 = p.then(null);
const p22 = p.then(() => 1);
const p23 = p.then(() => x);
const p24 = p.then(() => undefined);
const p25 = p.then(() => null);
const p26 = p.then(() => {});
const p27 = p.then(() => {throw 1});
const p28 = p.then(() => Promise.resolve(1));
const p29 = p.then(() => Promise.reject(1));

const p30 = p.then(undefined, undefined);
const p31 = p.then(undefined, null);
const p32 = p.then(undefined, () => 1);
const p33 = p.then(undefined, () => x);
const p34 = p.then(undefined, () => undefined);
const p35 = p.then(undefined, () => null);
const p36 = p.then(undefined, () => {});
const p37 = p.then(undefined, () => {throw 1});
const p38 = p.then(undefined, () => Promise.resolve(1));
const p39 = p.then(undefined, () => Promise.reject(1));

const p40 = p.then(null, undefined);
const p41 = p.then(null, null);
const p42 = p.then(null, () => 1);
const p43 = p.then(null, () => x);
const p44 = p.then(null, () => undefined);
const p45 = p.then(null, () => null);
const p46 = p.then(null, () => {});
const p47 = p.then(null, () => {throw 1});
const p48 = p.then(null, () => Promise.resolve(1));
const p49 = p.then(null, () => Promise.reject(1));

const p50 = p.then(() => "1", undefined);
const p51 = p.then(() => "1", null);
const p52 = p.then(() => "1", () => 1);
const p53 = p.then(() => "1", () => x);
const p54 = p.then(() => "1", () => undefined);
const p55 = p.then(() => "1", () => null);
const p56 = p.then(() => "1", () => {});
const p57 = p.then(() => "1", () => {throw 1});
const p58 = p.then(() => "1", () => Promise.resolve(1));
const p59 = p.then(() => "1", () => Promise.reject(1));

const p60 = p.then(() => x, undefined);
const p61 = p.then(() => x, null);
const p62 = p.then(() => x, () => 1);
const p63 = p.then(() => x, () => x);
const p64 = p.then(() => x, () => undefined);
const p65 = p.then(() => x, () => null);
const p66 = p.then(() => x, () => {});
const p67 = p.then(() => x, () => {throw 1});
const p68 = p.then(() => x, () => Promise.resolve(1));
const p69 = p.then(() => x, () => Promise.reject(1));

const p70 = p.then(() => undefined, undefined);
const p71 = p.then(() => undefined, null);
const p72 = p.then(() => undefined, () => 1);
const p73 = p.then(() => undefined, () => x);
const p74 = p.then(() => undefined, () => undefined);
const p75 = p.then(() => undefined, () => null);
const p76 = p.then(() => undefined, () => {});
const p77 = p.then(() => undefined, () => {throw 1});
const p78 = p.then(() => undefined, () => Promise.resolve(1));
const p79 = p.then(() => undefined, () => Promise.reject(1));

const p80 = p.then(() => null, undefined);
const p81 = p.then(() => null, null);
const p82 = p.then(() => null, () => 1);
const p83 = p.then(() => null, () => x);
const p84 = p.then(() => null, () => undefined);
const p85 = p.then(() => null, () => null);
const p86 = p.then(() => null, () => {});
const p87 = p.then(() => null, () => {throw 1});
const p88 = p.then(() => null, () => Promise.resolve(1));
const p89 = p.then(() => null, () => Promise.reject(1));

const p90 = p.then(() => {}, undefined);
const p91 = p.then(() => {}, null);
const p92 = p.then(() => {}, () => 1);
const p93 = p.then(() => {}, () => x);
const p94 = p.then(() => {}, () => undefined);
const p95 = p.then(() => {}, () => null);
const p96 = p.then(() => {}, () => {});
const p97 = p.then(() => {}, () => {throw 1});
const p98 = p.then(() => {}, () => Promise.resolve(1));
const p99 = p.then(() => {}, () => Promise.reject(1));

const pa0 = p.then(() => {throw 1}, undefined);
const pa1 = p.then(() => {throw 1}, null);
const pa2 = p.then(() => {throw 1}, () => 1);
const pa3 = p.then(() => {throw 1}, () => x);
const pa4 = p.then(() => {throw 1}, () => undefined);
const pa5 = p.then(() => {throw 1}, () => null);
const pa6 = p.then(() => {throw 1}, () => {});
const pa7 = p.then(() => {throw 1}, () => {throw 1});
const pa8 = p.then(() => {throw 1}, () => Promise.resolve(1));
const pa9 = p.then(() => {throw 1}, () => Promise.reject(1));

const pb0 = p.then(() => Promise.resolve("1"), undefined);
const pb1 = p.then(() => Promise.resolve("1"), null);
const pb2 = p.then(() => Promise.resolve("1"), () => 1);
const pb3 = p.then(() => Promise.resolve("1"), () => x);
const pb4 = p.then(() => Promise.resolve("1"), () => undefined);
const pb5 = p.then(() => Promise.resolve("1"), () => null);
const pb6 = p.then(() => Promise.resolve("1"), () => {});
const pb7 = p.then(() => Promise.resolve("1"), () => {throw 1});
const pb8 = p.then(() => Promise.resolve("1"), () => Promise.resolve(1));
const pb9 = p.then(() => Promise.resolve("1"), () => Promise.reject(1));

const pc0 = p.then(() => Promise.reject("1"), undefined);
const pc1 = p.then(() => Promise.reject("1"), null);
const pc2 = p.then(() => Promise.reject("1"), () => 1);
const pc3 = p.then(() => Promise.reject("1"), () => x);
const pc4 = p.then(() => Promise.reject("1"), () => undefined);
const pc5 = p.then(() => Promise.reject("1"), () => null);
const pc6 = p.then(() => Promise.reject("1"), () => {});
const pc7 = p.then(() => Promise.reject("1"), () => {throw 1});
const pc8 = p.then(() => Promise.reject("1"), () => Promise.resolve(1));
const pc9 = p.then(() => Promise.reject("1"), () => Promise.reject(1));


//// [promiseType.js]
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
function C() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const a = yield p;
            return 1;
        }
        catch (e) {
            return 'error';
        }
    });
}
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
const p01 = p.then();
const p10 = p.catch(undefined);
const p11 = p.catch(null);
const p12 = p.catch(() => 1);
const p13 = p.catch(() => x);
const p14 = p.catch(() => undefined);
const p15 = p.catch(() => null);
const p16 = p.catch(() => { });
const p17 = p.catch(() => { throw 1; });
const p18 = p.catch(() => Promise.reject(1));
const p19 = p.catch(() => Promise.resolve(1));
const p20 = p.then(undefined);
const p21 = p.then(null);
const p22 = p.then(() => 1);
const p23 = p.then(() => x);
const p24 = p.then(() => undefined);
const p25 = p.then(() => null);
const p26 = p.then(() => { });
const p27 = p.then(() => { throw 1; });
const p28 = p.then(() => Promise.resolve(1));
const p29 = p.then(() => Promise.reject(1));
const p30 = p.then(undefined, undefined);
const p31 = p.then(undefined, null);
const p32 = p.then(undefined, () => 1);
const p33 = p.then(undefined, () => x);
const p34 = p.then(undefined, () => undefined);
const p35 = p.then(undefined, () => null);
const p36 = p.then(undefined, () => { });
const p37 = p.then(undefined, () => { throw 1; });
const p38 = p.then(undefined, () => Promise.resolve(1));
const p39 = p.then(undefined, () => Promise.reject(1));
const p40 = p.then(null, undefined);
const p41 = p.then(null, null);
const p42 = p.then(null, () => 1);
const p43 = p.then(null, () => x);
const p44 = p.then(null, () => undefined);
const p45 = p.then(null, () => null);
const p46 = p.then(null, () => { });
const p47 = p.then(null, () => { throw 1; });
const p48 = p.then(null, () => Promise.resolve(1));
const p49 = p.then(null, () => Promise.reject(1));
const p50 = p.then(() => "1", undefined);
const p51 = p.then(() => "1", null);
const p52 = p.then(() => "1", () => 1);
const p53 = p.then(() => "1", () => x);
const p54 = p.then(() => "1", () => undefined);
const p55 = p.then(() => "1", () => null);
const p56 = p.then(() => "1", () => { });
const p57 = p.then(() => "1", () => { throw 1; });
const p58 = p.then(() => "1", () => Promise.resolve(1));
const p59 = p.then(() => "1", () => Promise.reject(1));
const p60 = p.then(() => x, undefined);
const p61 = p.then(() => x, null);
const p62 = p.then(() => x, () => 1);
const p63 = p.then(() => x, () => x);
const p64 = p.then(() => x, () => undefined);
const p65 = p.then(() => x, () => null);
const p66 = p.then(() => x, () => { });
const p67 = p.then(() => x, () => { throw 1; });
const p68 = p.then(() => x, () => Promise.resolve(1));
const p69 = p.then(() => x, () => Promise.reject(1));
const p70 = p.then(() => undefined, undefined);
const p71 = p.then(() => undefined, null);
const p72 = p.then(() => undefined, () => 1);
const p73 = p.then(() => undefined, () => x);
const p74 = p.then(() => undefined, () => undefined);
const p75 = p.then(() => undefined, () => null);
const p76 = p.then(() => undefined, () => { });
const p77 = p.then(() => undefined, () => { throw 1; });
const p78 = p.then(() => undefined, () => Promise.resolve(1));
const p79 = p.then(() => undefined, () => Promise.reject(1));
const p80 = p.then(() => null, undefined);
const p81 = p.then(() => null, null);
const p82 = p.then(() => null, () => 1);
const p83 = p.then(() => null, () => x);
const p84 = p.then(() => null, () => undefined);
const p85 = p.then(() => null, () => null);
const p86 = p.then(() => null, () => { });
const p87 = p.then(() => null, () => { throw 1; });
const p88 = p.then(() => null, () => Promise.resolve(1));
const p89 = p.then(() => null, () => Promise.reject(1));
const p90 = p.then(() => { }, undefined);
const p91 = p.then(() => { }, null);
const p92 = p.then(() => { }, () => 1);
const p93 = p.then(() => { }, () => x);
const p94 = p.then(() => { }, () => undefined);
const p95 = p.then(() => { }, () => null);
const p96 = p.then(() => { }, () => { });
const p97 = p.then(() => { }, () => { throw 1; });
const p98 = p.then(() => { }, () => Promise.resolve(1));
const p99 = p.then(() => { }, () => Promise.reject(1));
const pa0 = p.then(() => { throw 1; }, undefined);
const pa1 = p.then(() => { throw 1; }, null);
const pa2 = p.then(() => { throw 1; }, () => 1);
const pa3 = p.then(() => { throw 1; }, () => x);
const pa4 = p.then(() => { throw 1; }, () => undefined);
const pa5 = p.then(() => { throw 1; }, () => null);
const pa6 = p.then(() => { throw 1; }, () => { });
const pa7 = p.then(() => { throw 1; }, () => { throw 1; });
const pa8 = p.then(() => { throw 1; }, () => Promise.resolve(1));
const pa9 = p.then(() => { throw 1; }, () => Promise.reject(1));
const pb0 = p.then(() => Promise.resolve("1"), undefined);
const pb1 = p.then(() => Promise.resolve("1"), null);
const pb2 = p.then(() => Promise.resolve("1"), () => 1);
const pb3 = p.then(() => Promise.resolve("1"), () => x);
const pb4 = p.then(() => Promise.resolve("1"), () => undefined);
const pb5 = p.then(() => Promise.resolve("1"), () => null);
const pb6 = p.then(() => Promise.resolve("1"), () => { });
const pb7 = p.then(() => Promise.resolve("1"), () => { throw 1; });
const pb8 = p.then(() => Promise.resolve("1"), () => Promise.resolve(1));
const pb9 = p.then(() => Promise.resolve("1"), () => Promise.reject(1));
const pc0 = p.then(() => Promise.reject("1"), undefined);
const pc1 = p.then(() => Promise.reject("1"), null);
const pc2 = p.then(() => Promise.reject("1"), () => 1);
const pc3 = p.then(() => Promise.reject("1"), () => x);
const pc4 = p.then(() => Promise.reject("1"), () => undefined);
const pc5 = p.then(() => Promise.reject("1"), () => null);
const pc6 = p.then(() => Promise.reject("1"), () => { });
const pc7 = p.then(() => Promise.reject("1"), () => { throw 1; });
const pc8 = p.then(() => Promise.reject("1"), () => Promise.resolve(1));
const pc9 = p.then(() => Promise.reject("1"), () => Promise.reject(1));
