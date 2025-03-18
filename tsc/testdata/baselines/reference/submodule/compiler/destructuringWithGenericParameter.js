//// [tests/cases/compiler/destructuringWithGenericParameter.ts] ////

//// [destructuringWithGenericParameter.ts]
class GenericClass<T> {
    payload: T;
}

var genericObject = new GenericClass<{ greeting: string }>();

function genericFunction<T>(object: GenericClass<T>, callback: (payload: T) => void) {
    callback(object.payload);
}

genericFunction(genericObject, ({greeting}) => {
    var s = greeting.toLocaleLowerCase();  // Greeting should be of type string
});


//// [destructuringWithGenericParameter.js]
class GenericClass {
    payload;
}
var genericObject = new GenericClass();
function genericFunction(object, callback) {
    callback(object.payload);
}
genericFunction(genericObject, ({ greeting }) => {
    var s = greeting.toLocaleLowerCase();
});
