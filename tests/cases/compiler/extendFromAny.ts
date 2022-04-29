declare var Base: any;
class C extends Base {
    known = 1;
    static sknown = 2;
}

let c = new C();
c.known.length; // error, 'known' has no 'length' property
C.sknown.length; // error, 'sknown' has no 'length' property
c.unknown.length; // ok, unknown: any
C.sunknown.length; // ok: sunknown: any
