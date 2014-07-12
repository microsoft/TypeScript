// @noimplicitany: true
// this should be an error
interface IFace {
    member1;  // error at "member1"
    member2: string;
    constructor(c1, c2: string, c3);  // error at "c1, c3, "constructor"
    funcOfIFace(f1, f2, f3: number);   // error at "f1, f2, funcOfIFace"
    new ();
}
