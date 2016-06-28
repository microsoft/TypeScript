// @target: es6
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