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
