interface indexSig {
    //Index signatures can't be optional
    [idx?: number]: any; //err
}

class indexSig2 {
    //Index signatures can't be optional
    [idx?: number]: any //err
}