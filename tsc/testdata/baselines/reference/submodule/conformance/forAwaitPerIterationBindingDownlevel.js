//// [tests/cases/conformance/statements/for-await-ofStatements/forAwaitPerIterationBindingDownlevel.ts] ////

//// [forAwaitPerIterationBindingDownlevel.ts]
const sleep = (tm: number) => new Promise(resolve => setTimeout(resolve, tm));

async function* gen() {
    yield 1;
    await sleep(1000);
    yield 2;
}

const log = console.log;

(async () => {
    for await (const outer of gen()) {
        log(`I'm loop ${outer}`);
        (async () => {
            const inner = outer;
            await sleep(2000);
            if (inner === outer) {
                log(`I'm loop ${inner} and I know I'm loop ${outer}`);
            } else {
                log(`I'm loop ${inner}, but I think I'm loop ${outer}`);
            }
        })();
    }
})();

//// [forAwaitPerIterationBindingDownlevel.js]
const sleep = (tm) => new Promise(resolve => setTimeout(resolve, tm));
async function* gen() {
    yield 1;
    await sleep(1000);
    yield 2;
}
const log = console.log;
(async () => {
    for await (const outer of gen()) {
        log(`I'm loop ${outer}`);
        (async () => {
            const inner = outer;
            await sleep(2000);
            if (inner === outer) {
                log(`I'm loop ${inner} and I know I'm loop ${outer}`);
            }
            else {
                log(`I'm loop ${inner}, but I think I'm loop ${outer}`);
            }
        })();
    }
})();
