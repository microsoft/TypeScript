interface Bar { }
interface Baz { }
interface Q { }
interface Foo extends Bar, Baz { }
class Foo { }

export default class extends Foo {
    readonly observer = this.handleIntersection;
    readonly handleIntersection = () => { }
}