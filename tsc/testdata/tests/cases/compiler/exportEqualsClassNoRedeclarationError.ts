// @target: es6
// @module: commonjs
class SomeClass {
    static get someProp(): number {
        return 0;
    }

    static set someProp(value: number) {}
}
export = SomeClass;