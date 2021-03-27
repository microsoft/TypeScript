function checkParameterPosition<T extends number>(y: T extends 1234 ? throw 'No zero' : T) {
    y.toExponential()
}
checkParameterPosition(1234)
checkParameterPosition(12345678)

type MustNumber<T> = T extends number ? T : throw `"found "${TypeToString<T>}"`
type MustNumber2<T> = T extends number ? T : throw `"found "${TypeToString<T>}"`
function f2<T>(a: MustNumber<T>, b: MustNumber2<T>) {
    a = b
}

f2('str', {})
