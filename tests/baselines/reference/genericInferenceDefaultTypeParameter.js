//// [genericInferenceDefaultTypeParameter.ts]
type Type = {
    a: (e: string) => void,
    b: (e: number) => void,
}
  
function f1<T extends keyof Type = 'a'>(props: Type[T]): any {
    return null
}

f1((event) => { })

//// [genericInferenceDefaultTypeParameter.js]
function f1(props) {
    return null;
}
f1(function (event) { });
