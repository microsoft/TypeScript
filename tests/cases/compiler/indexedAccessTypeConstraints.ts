// @strict: true

// Repro from #14557

interface IData<T> {
    content: T;
}

type Data<T> = {
    get: <K extends keyof T>(prop: K) => T[K];
};

class Parent<M> {
    constructor(private data: Data<M>) {}
    getData(): Data<M> {
        return this.data;
    }
}

export class Foo<C> extends Parent<IData<C>> {
    getContent(): C {
        return this.getData().get('content');
    }
}

export class Bar<C, T extends IData<C>> extends Parent<T> {
    getContent(): C {
        return this.getData().get('content');
    }
}

// Repro from #14557

function foo<C, T extends { content: C }>(x: C, y: T['content']) {
    x = y;
}
