//// [tests/cases/conformance/internalModules/DeclarationMerging/TwoInternalModulesThatMergeEachWithExportedInterfacesOfTheSameName.ts] ////

//// [TwoInternalModulesThatMergeEachWithExportedInterfacesOfTheSameName.ts]
module A {
    export interface Point {
        x: number;
        y: number;
        toCarth(): Point;
    }
}

module A {
    export interface Point {
        fromCarth(): Point;
    }
}

// ensure merges as expected
var p: { x: number; y: number; toCarth(): A.Point; fromCarth(): A.Point; };
var p: A.Point;

module X.Y.Z {
    export interface Line {
        new (start: A.Point, end: A.Point);
    }
}

module X {
    export module Y.Z {
        export interface Line {
            start: A.Point;
            end: A.Point;
        }
    }
}

// ensure merges as expected
var l: { start: A.Point; end: A.Point; new (s: A.Point, e: A.Point); }
var l: X.Y.Z.Line;


//// [TwoInternalModulesThatMergeEachWithExportedInterfacesOfTheSameName.js]
// ensure merges as expected
var p;
var p;
// ensure merges as expected
var l;
var l;
