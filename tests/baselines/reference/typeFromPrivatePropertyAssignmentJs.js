//// [tests/cases/conformance/classes/members/privateNames/typeFromPrivatePropertyAssignmentJs.ts] ////

//// [typeFromPrivatePropertyAssignmentJs.js]

//// [a.js]
class C {
    /** @type {{ foo?: string } | undefined } */
    #a;
    /** @type {{ foo?: string } | undefined } */
    #b;
    m() {
        const a = this.#a || {};
        this.#b = this.#b || {};
    }
}


//// [typeFromPrivatePropertyAssignmentJs.js]
//// [a.js]
class C {
    /** @type {{ foo?: string } | undefined } */
    #a;
    /** @type {{ foo?: string } | undefined } */
    #b;
    m() {
        const a = this.#a || {};
        this.#b = this.#b || {};
    }
}
