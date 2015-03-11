// @target:es6
class C {
    _name: string;
    get name(): string {
        return this._name;
    }
    static get name2(): string {
        return "BYE";
    }
    static get ["computedname"]() {
        return "";
    }

    set foo(a: string) { }
    static set bar(b: number) { }
    static set ["computedname"](b: string) { }
}