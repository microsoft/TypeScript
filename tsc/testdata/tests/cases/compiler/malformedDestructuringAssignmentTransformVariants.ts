// @target: es2015, es2022
// @experimentalDecorators: false, true
// @noTypesAndSymbols: true

declare function dec(...args: any[]): any;
declare const value: any;

class Base {
    static x: any;
}

@dec
class C extends Base {
    static #x: any;

    static {
        // Invalid array targets must still visit private and super accesses.
        [super.x, 0, this.#x] = value;
        [super.x, 1 + 2, this.#x] = value;
        [super.x, (() => {}), this.#x] = value;
        [super.x, value(), this.#x] = value;
        [super.x, , ...this.#x] = value;

        // Object methods/accessors are not destructuring assignment elements.
        ({ x: super.x, m() {}, private: this.#x } = value);
        ({ x: super.x, get g() { return 1; }, private: this.#x } = value);
        ({ x: super.x, set s(v) {}, private: this.#x } = value);
        ({ x: [super.x, 0, this.#x], m() {} } = value);
    }
}
