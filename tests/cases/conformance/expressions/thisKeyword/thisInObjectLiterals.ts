class MyClass {
    t: number;

    fn() {
        //type of 'this' in an object literal is the containing scope's this
        var t = { x: this, y: this.t };
        var t: { x: MyClass; y: number };
    }
}

//type of 'this' in an object literal property of a function type is Any
var obj = {
    f() {
        return this.spaaace;
    }
};
var obj: { f: () => any; };
