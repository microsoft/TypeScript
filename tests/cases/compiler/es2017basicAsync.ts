// @target: es2017
// @lib: es2017
// @noEmitHelpers: true

async (): Promise<void> => {
    await 0;
}

async function asyncFunc() {
    await 0;
}

const asyncArrowFunc = async (): Promise<void> => {
    await 0;
}

async function asyncIIFE() {
    await 0;

    await (async function(): Promise<void> {
        await 1;
    })();
    
    await (async function asyncNamedFunc(): Promise<void> {
        await 1;
    })();
    
    await (async (): Promise<void> => {
        await 1;
    })();
}

class AsyncClass {
    asyncPropFunc = async function(): Promise<void> {
        await 2;
    }
    
    asyncPropNamedFunc = async function namedFunc(): Promise<void> {
        await 2;
    }

    asyncPropArrowFunc = async (): Promise<void> => {
        await 2;
    }

    async asyncMethod(): Promise<void> {
        await 2;
    }
}
