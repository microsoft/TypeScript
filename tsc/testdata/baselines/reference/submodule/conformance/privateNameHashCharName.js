//// [tests/cases/conformance/classes/members/privateNames/privateNameHashCharName.ts] ////

//// [privateNameHashCharName.ts]
#

class C {
    #

    m() {
        this.#
    }
}


//// [privateNameHashCharName.js]
class C {
    m() {
        this.;
    }
}
