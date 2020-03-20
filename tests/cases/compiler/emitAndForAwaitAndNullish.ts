// @lib: esnext
// @target: es2017

async function* getIterator() {
    yield { member: 1 };
    yield { member: 2 };
    yield { member: 3 };
}
async function* outerIterator() {
    var _a, _b;
    for await (const row of getIterator()) {
        // This line causes a name collision with by setting a variable `_b`,
        // which is also used to hold the iterator above:
        if (((_a = row.member) !== null && _a !== void 0 ? _a : null) === ((_b = row.member) !== null && _b !== void 0 ? _b : null)) {
            yield row;
        }
    }
}
async function main() {
    for await (const row of outerIterator()) {

    }
}
main();
