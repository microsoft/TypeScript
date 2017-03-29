declare var Base: any;
class C extends Base {
    known = 1;
    static sknown = 2;
}

let c = new C();
c.known.length; // error, 'real' has no 'length' property
C.sknown.length; // error, 'sreal' has no 'length' property
c.unknown.length; // ok, fake: any
C.sunknown.length; // ok: sfake: any
