// @declaration: true
// @target: es6
export class Test<T> {
    private get T(): T {
        throw "";
    }

    public test(): T {
        return null as any;
    }
}