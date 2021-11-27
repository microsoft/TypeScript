//// [privateNameHashCharName.ts]
#

class C {
    #

    m() {
        this.#
    }
}


//// [privateNameHashCharName.js]
#;
class C {
    m() {
        this.;
    }
}
