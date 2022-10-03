// @target: esnext
// @useDefineForClassFields: false

// GH: https://github.com/microsoft/TypeScript/issues/33239
class ConstantIterator<T> implements AsyncIterator<T, undefined, T | undefined> {
    constructor(private constant: T) {
    }
    async next(value?: T): Promise<IteratorResult<T>> {
        if (value != null) {
            throw new Error("ConstantIterator.prototype.next may not take any values");
        }
        return { value: this.constant, done: false };
    }
}