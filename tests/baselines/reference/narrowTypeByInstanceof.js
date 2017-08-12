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
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
var Match = (function () {
    function Match() {
    }
    Match.prototype.range = function () {
        return undefined;
    };
    __names(Match.prototype, ["range"]);
    return Match;
}());
var FileMatch = (function () {
    function FileMatch() {
    }
    FileMatch.prototype.resource = function () {
        return undefined;
    };
    __names(FileMatch.prototype, ["resource"]);
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
