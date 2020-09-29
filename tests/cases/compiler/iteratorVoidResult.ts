// @strict
// @target: esnext
// @noEmit: true

//
// Iterators with 'void'
//

const o1 = {
    [Symbol.iterator]() {
        return {
            next(): IteratorResult<number, void> {
                return { done: true };
            }
        };
    }
};

// should still be iterable
for (const _ of o1) {}

// should still be spreadable
const a1 = [...o1];

// should still destructure
const [e1] = o1;

// verify value of r1
const r1 = o1[Symbol.iterator]().next();
if (r1.done) r1.value;

(function* () {
    // verify result of yield*
    const x1 = yield * o1;
});

const o2 = {
    [Symbol.iterator]() {
        return {
            next(): IteratorResult<number, number | void> {
                return { done: true };
            }
        };
    }
};

// should still be iterable
for (const _ of o2) {}

// should still be spreadable
const a2 = [...o2];

// should still destructure
const [e2] = o2;

// verify value of r2
const r2 = o2[Symbol.iterator]().next();
if (r2.done) r2.value;

(function* () {
    // verify result of yield*
    const x2 = yield * o2;
});

//
// AsyncIterators with 'void'
//

async function main() {
    // should still be iterable
    for await (const _ of o1) {}
    for await (const _ of o2) {}

    const o3 = {
        [Symbol.asyncIterator]() { 
            return {
                async next(): Promise<IteratorResult<number, void>> {
                    return { done: true };
                }
            };
        }
    };

    // should still be iterable
    for await (const _ of o3) {}

    // verify value of r3
    const r3 = await o3[Symbol.asyncIterator]().next();
    if (r3.done) r3.value;

    (async function* () {
        // verify result of yield*
        const x1 = yield * o3;
    });

    const o4 = {
        [Symbol.asyncIterator]() {
            return {
                async next(): Promise<IteratorResult<number, number | void>> {
                    return { done: true };
                }
            };
        }
    };

    // should still be iterable
    for await (const _ of o4) {}

    // verify value of r4
    const r4 = await o4[Symbol.asyncIterator]().next();
    if (r4.done) r4.value;

    (async function* () {
        // verify result of yield*
        const x4 = yield * o4;
    });
}
