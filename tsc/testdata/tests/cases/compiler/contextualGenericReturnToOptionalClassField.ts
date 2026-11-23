// @strict: true
// @target: es2015
// @lib: es5
// @noEmit: true

declare function lookup<T extends object = object>(): T;
class Container {
    item?: { label: string };
    getLabel() {
        if (!this.item) this.item = lookup();
        return this.item.label;
    }
}
