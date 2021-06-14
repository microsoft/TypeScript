//@target: ES2021

const a1 = do { };
const a1a = async do { };
const a2 = do { 1 };
const a2a = async do { 1 };
const a3 = () => do { throw 1 };
const a3a = () => async do { throw 1 };

const b1 = do {
    try {
        1
    } catch (e) {
        2
    } finally {
        3
    }
}
const b1a = async do {
    try {
        1
    } catch (e) {
        2
    } finally {
        3
    }
}
