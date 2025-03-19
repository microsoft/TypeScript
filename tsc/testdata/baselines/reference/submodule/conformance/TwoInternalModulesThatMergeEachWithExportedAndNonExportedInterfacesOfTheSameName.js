//// [tests/cases/conformance/internalModules/DeclarationMerging/TwoInternalModulesThatMergeEachWithExportedAndNonExportedInterfacesOfTheSameName.ts] ////

//// [TwoInternalModulesThatMergeEachWithExportedAndNonExportedInterfacesOfTheSameName.ts]
module A {
    export interface Point {
        x: number;
        y: number;
        toCarth(): Point;
    }
}

module A {
    interface Point {
        fromCarth(): Point;
    }
}

// ensure merges as expected
var p: { x: number; y: number; toCarth(): A.Point; };
var p: A.Point;

module X.Y.Z {
    export interface Line {
        new (start: A.Point, end: A.Point);
    }
}

module X {
    export module Y.Z {
        interface Line {
            start: A.Point;
            end: A.Point;
        }
    }
}

// ensure merges as expected
var l: { new (s: A.Point, e: A.Point); }
var l: X.Y.Z.Line;


//// [TwoInternalModulesThatMergeEachWithExportedAndNonExportedInterfacesOfTheSameName.js]
// ensure merges as expected
var p;
var p;
// ensure merges as expected
var l;
var l;
