//// [arrayLiteralContextualType.ts]
interface IAnimal {
    name: string;
}

class Giraffe {
    name = "Giraffe";
    neckLength = "3m";
}

class Elephant {
    name = "Elephant";
    trunkDiameter = "20cm";
}

function foo(animals: IAnimal[]) { }
function bar(animals: { [n: number]: IAnimal }) { }

foo([
    new Giraffe(),
    new Elephant()
]); // Legal because of the contextual type IAnimal provided by the parameter
bar([
    new Giraffe(),
    new Elephant()
]); // Legal because of the contextual type IAnimal provided by the parameter

var arr = [new Giraffe(), new Elephant()];
foo(arr); // ok because arr is Array<Giraffe|Elephant> not {}[]
bar(arr); // ok because arr is Array<Giraffe|Elephant> not {}[]

//// [arrayLiteralContextualType.js]
var Giraffe = /** @class */ (function () {
    function Giraffe() {
        this.name = "Giraffe";
        this.neckLength = "3m";
    }
    return Giraffe;
}());
var Elephant = /** @class */ (function () {
    function Elephant() {
        this.name = "Elephant";
        this.trunkDiameter = "20cm";
    }
    return Elephant;
}());
function foo(animals) { }
function bar(animals) { }
foo([
    new Giraffe(),
    new Elephant()
]); // Legal because of the contextual type IAnimal provided by the parameter
bar([
    new Giraffe(),
    new Elephant()
]); // Legal because of the contextual type IAnimal provided by the parameter
var arr = [new Giraffe(), new Elephant()];
foo(arr); // ok because arr is Array<Giraffe|Elephant> not {}[]
bar(arr); // ok because arr is Array<Giraffe|Elephant> not {}[]
