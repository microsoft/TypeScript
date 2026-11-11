// @strict: true
// @noEmit: true

type Test = (() => void) & { options?: {} };
interface ISchema {
    resolve(): ISchema;
    asNestedTest(): Test;
}

class Schema implements ISchema {
    resolve() { return this; }
    asNestedTest(): () => void { return () => {}; }
}
