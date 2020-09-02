interface Itertable<T, Container<X>> {
    filter(p: (x: T) => boolean): Container<T>;
}
var w: Itertable<number, Set>;
w.filter;


interface Gener<T> {
    aaafff(): Set<T>;
    qqqSSS(): T;
}

var q: Gener<number>;
q.aaafff;
q.qqqSSS;




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
