// @strict: true
// @target: es2015
// @lib: es5
// @noEmit: true

class Reply<T extends string | number> { value!: T; }
declare function create<Ctor extends new () => unknown, R extends InstanceType<Ctor>>(ctor: Ctor): R;
class Container<T extends string | number> {
    item?: Reply<T>;
    initialize() { this.item = create(Reply); }
}
