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
    get ["computedname1"]() {
        return "";
    }
    get ["computedname2"]() {
        return "";
    }

    set ["computedname3"](x: any) {
    }
    set ["computedname4"](y: string) {
    }

    set foo(a: string) { }
    static set bar(b: number) { }
    static set ["computedname"](b: string) { }
}