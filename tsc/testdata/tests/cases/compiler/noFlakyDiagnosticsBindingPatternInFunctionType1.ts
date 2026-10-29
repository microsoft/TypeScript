// @strict: true
// @declaration: true
class Base<T> {}
export class C extends Base<{ e: ({ a: boolean }) => void }> {}
