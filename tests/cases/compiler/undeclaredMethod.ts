
module M {
    export class C {
        public salt() {}
    }
}

var c:M.C = new M.C();

c.salt();	// cool
c.saltbar();	// crash

