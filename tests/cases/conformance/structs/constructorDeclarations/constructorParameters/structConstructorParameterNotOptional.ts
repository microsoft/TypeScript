// doc 3.1
// optional parameters are not allowed for struct constructor.

struct C1 {
    constructor(public x?: number) { } // error
}

struct C2 {
    constructor(private p?: number) { } // error
}

struct C3 {
    constructor(protected p?: number) { } // error
}
