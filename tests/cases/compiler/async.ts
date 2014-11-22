declare class Promise<T> {
    constructor(init: (resolve: (value?: T | IPromise<T>) => void, reject: (reason?: any) => void) => void);
    then<TResult>(onfulfilled?: (value: T) => TResult | IPromise<TResult>, onrejected?: (reason: any) => TResult | IPromise<TResult>): Promise<TResult>;
}

async function asyncFunc(): Promise<void> {
    return;
}

var asyncFuncExpr = async function(): Promise<void> {
    return;
}

var asyncLambdaBody = async (): Promise<void> => { return; };
var asyncLambdaExpr = async (): Promise<void> => null;

class Class {
    public static async asyncStaticMethod(): Promise<void> {
        return;
    }

    public async asyncMethod(): Promise<void> {
        return;
    }
}

var ObjectLiteral = {
    asyncProperty: async function(): Promise<void> {
        return;
    },

    async asyncMethod(): Promise<void> {
        return;
    }
};
