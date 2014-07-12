//// [arrayLiteralContextualType.js]
var Giraffe = (function () {
    function Giraffe() {
        this.name = "Giraffe";
        this.neckLength = "3m";
    }
    return Giraffe;
})();

var Elephant = (function () {
    function Elephant() {
        this.name = "Elephant";
        this.trunkDiameter = "20cm";
    }
    return Elephant;
})();

function foo(animals) {
}
function bar(animals) {
}

foo([
    new Giraffe(),
    new Elephant()
]); // Legal because of the contextual type IAnimal provided by the parameter
bar([
    new Giraffe(),
    new Elephant()
]); // Legal because of the contextual type IAnimal provided by the parameter

var arr = [new Giraffe(), new Elephant()];
foo(arr); // Error because of no contextual type
bar(arr); // Error because of no contextual type
