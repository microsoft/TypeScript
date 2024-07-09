interface fnSigs {
    //functions signatures can be optional
    fn(): void;
    fn?(): void; //err
    fn2?(): void;
}

interface callSig {
    //Call signatures can't be optional
    (): any;
    ()?: any; //err
    ?(): any; //err
}

interface constructSig {
    //Construct signatures can't be optional
    new (): any;
    new ()?: any; //err
    new ?(): any; //err
}

interface propertySig {
    //Property signatures can be optional
    prop: any;
    prop?: any;
    prop2?: any;
}

interface indexSig {
    //Index signatures can't be optional
    [idx: number]: any;
    [idx: number]?: any; //err
    ? [idx: number]: any; //err
    [idx?: number]: any; //err
}