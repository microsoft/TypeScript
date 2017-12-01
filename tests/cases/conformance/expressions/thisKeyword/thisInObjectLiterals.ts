// @noImplicitAny: true
// @noImplicitThis: true

class MyClass {
    t: number;

    fn() {
        type ContainingThis = this;
        //type of 'this' in an object literal is the containing scope's this
        var t = { x: this, y: this.t };
        var t: { x: ContainingThis; y: number };
    }
}

//type of 'this' in an object literal method is the type of the object literal
var obj = {
    f() {
        return this.spaaace;
    }
};
var obj: { f: () => any; };
