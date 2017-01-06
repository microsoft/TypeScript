//// [nonPrimitiveAsProperty.ts]
interface WithNonPrimitive {
    foo: object
}

var a: WithNonPrimitive = { foo: {bar: "bar"} };

var b: WithNonPrimitive = {foo: "bar"}; // expect error


//// [nonPrimitiveAsProperty.js]
var a = { foo: { bar: "bar" } };
var b = { foo: "bar" }; // expect error
