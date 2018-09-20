//// [es2017basicAsync.ts]
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


//// [es2017basicAsync.js]
async () => {
    await 0;
};
async function asyncFunc() {
    await 0;
}
const asyncArrowFunc = async () => {
    await 0;
};
async function asyncIIFE() {
    await 0;
    await (async function () {
        await 1;
    })();
    await (async function asyncNamedFunc() {
        await 1;
    })();
    await (async () => {
        await 1;
    })();
}
class AsyncClass {
    constructor() {
        this.asyncPropFunc = async function () {
            await 2;
        };
        this.asyncPropNamedFunc = async function namedFunc() {
            await 2;
        };
        this.asyncPropArrowFunc = async () => {
            await 2;
        };
    }
    async asyncMethod() {
        await 2;
    }
}
