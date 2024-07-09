class C {
    constructor(x: () => void) { }
}
var c = new C(() => { return asdf; } ) // should error
