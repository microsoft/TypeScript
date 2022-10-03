class a {
}

class b1 extends a {
    constructor(_super: number) { // should be error
        super();
    }
}

class b2 extends a {
    constructor(private _super: number) { // should be error
        super();
    }
}

class b3 extends a {
    constructor(_super: number); // no code gen - no error
    constructor(_super: string);// no code gen - no error
    constructor(_super: any) { // should be error
        super();
    }
}

class b4 extends a {
    constructor(_super: number); // no code gen - no error
    constructor(_super: string);// no code gen - no error
    constructor(private _super: any) { // should be error
        super();
    }
}