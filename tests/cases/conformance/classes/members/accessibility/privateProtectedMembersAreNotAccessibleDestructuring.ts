class K {
    private priv;
    protected prot;
    private privateMethod() { }
    m() {
        let { priv: a, prot: b } = this; // ok
        let { priv, prot } = new K(); // ok
    }
}
class C extends K {
    m2() {
        let { priv: a } = this; // error
        let { prot: b } = this; // ok
    }
}
let k = new K();
let { priv } = k; // error
let { prot } = k; // error
let { privateMethod } = k; // error
let { priv: a, prot: b, privateMethod: pm } = k; // error
function f({ priv, prot, privateMethod }: K) {

}
