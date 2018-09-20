// @declaration: true
interface WithNonPrimitive {
    foo: object
}

var a: WithNonPrimitive = { foo: {bar: "bar"} };

var b: WithNonPrimitive = {foo: "bar"}; // expect error
