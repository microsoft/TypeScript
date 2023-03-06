// @target: es5
// @lib: esnext, dom
// @downlevelIteration: true
// @noTypesAndSymbols: true

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