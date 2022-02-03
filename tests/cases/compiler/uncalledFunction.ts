// @strict: true, false

function a() {}
a;

const b = () => {}
b;

const c = {
    d: () => {},
    e: {
        f: () => {}
    }
}

c.d;
c['d'];

c.e.f;
c.e['f'];

class C {
    m1() {}
    m2() {
        this.m1;
        this['m1'];
    }
}
