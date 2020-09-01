interface Type{

}

interface TypeConstructor extends Type{
    parameters: Type[]
}

interface TypeArgument extends Type{

}

function createInstanceTypeWithTypeConstructor(tc: TypeConstructor, tas: TypeArgument[]) {
    if(tc.parameters.length !== tas.length){
        throw new Error(`too much or too little parameter for hkt {tc}`);
    }



}