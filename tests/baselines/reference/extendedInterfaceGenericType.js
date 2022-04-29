//// [extendedInterfaceGenericType.ts]
interface Alpha<T> {
    takesArgOfT(arg: T): Alpha<T>;
    makeBetaOfNumber(): Beta<number>;
}
interface Beta<T> extends Alpha<T> {
}

var alpha: Alpha<number>;
var betaOfNumber = alpha.makeBetaOfNumber();
betaOfNumber.takesArgOfT(5);


//// [extendedInterfaceGenericType.js]
var alpha;
var betaOfNumber = alpha.makeBetaOfNumber();
betaOfNumber.takesArgOfT(5);
