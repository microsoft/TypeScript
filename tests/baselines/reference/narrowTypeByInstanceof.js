//// [tests/cases/compiler/narrowTypeByInstanceof.ts] ////

//// [narrowTypeByInstanceof.ts]
    class Match {
        public range(): any {
            return undefined;
        }
    }

    class FileMatch {
        public resource(): any {
            return undefined;
        }
    }

type FileMatchOrMatch = FileMatch | Match;


let elementA: FileMatchOrMatch, elementB: FileMatchOrMatch;

if (elementA instanceof FileMatch && elementB instanceof FileMatch) {
    let a = elementA.resource().path;
    let b = elementB.resource().path;
} else if (elementA instanceof Match && elementB instanceof Match) {
    let a = elementA.range();
    let b = elementB.range();
}


//// [narrowTypeByInstanceof.js]
var Match = /** @class */ (function () {
    function Match() {
    }
    Match.prototype.range = function () {
        return undefined;
    };
    return Match;
}());
var FileMatch = /** @class */ (function () {
    function FileMatch() {
    }
    FileMatch.prototype.resource = function () {
        return undefined;
    };
    return FileMatch;
}());
var elementA, elementB;
if (elementA instanceof FileMatch && elementB instanceof FileMatch) {
    var a = elementA.resource().path;
    var b = elementB.resource().path;
}
else if (elementA instanceof Match && elementB instanceof Match) {
    var a = elementA.range();
    var b = elementB.range();
}
