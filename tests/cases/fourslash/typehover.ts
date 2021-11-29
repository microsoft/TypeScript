////type Params = {
////   foo: string;
////} & ({ tag: 'a'; type: number } | { tag: 'b'; type: string });
////const getType = <P extends Params>(params: P) => {
////    const {
////        //Omit
////        foo,
////        ...rest
////    } = params;

////    return rest;
////};
////declare const params: Params;
////switch (params.tag) {
////    case 'a': {
////        const [|result|] = getType(params).type;
////        break;
////    }
////    case 'b': {
////        const [|result|] = getType(params).type;
////        break;
////    }
////}

// const ranges = test.ranges();
// const symbols = test.symbolsInScope(ranges[0]);
// const res = symbols.find(s => s.name === "result");
// verify.typeOfSymbolAtLocation(ranges[0], res, "number");

const ranges = test.ranges();
verify.typeAtLocation(ranges[0],"number");