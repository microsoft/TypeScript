//// [stringLiteralTypesAndTuples01.ts]
// Should all be strings.
let [hello, brave, newish, world] = ["Hello", "Brave", "New", "World"];

type RexOrRaptor = "t-rex" | "raptor"
let [im, a, dinosaur]: ["I'm", "a", RexOrRaptor] = ['I\'m', 'a', 't-rex'];

rawr(dinosaur);

function rawr(dino: RexOrRaptor) {
    if (dino === "t-rex") {
        return "ROAAAAR!";
    }
    if (dino === "raptor") {
        return "yip yip!";
    }

    throw "Unexpected " + dino;
}

//// [stringLiteralTypesAndTuples01.js]
// Should all be strings.
var _a = ["Hello", "Brave", "New", "World"], hello = _a[0], brave = _a[1], newish = _a[2], world = _a[3];
var _b = ['I\'m', 'a', 't-rex'], im = _b[0], a = _b[1], dinosaur = _b[2];
rawr(dinosaur);
function rawr(dino) {
    if (dino === "t-rex") {
        return "ROAAAAR!";
    }
    if (dino === "raptor") {
        return "yip yip!";
    }
    throw "Unexpected " + dino;
}


//// [stringLiteralTypesAndTuples01.d.ts]
declare let hello: string, brave: string, newish: string, world: string;
declare type RexOrRaptor = "t-rex" | "raptor";
declare let im: "I'm", a: "a", dinosaur: RexOrRaptor;
declare function rawr(dino: RexOrRaptor): "ROAAAAR!" | "yip yip!";
