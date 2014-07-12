//@noimplicitany: true
// this should be an error
interface IFace {
    funcOfIFace();  // error at "f"
}

// this should not be an error
interface IFace1{
    f1(): any;
}

