//// [tests/cases/conformance/internalModules/exportDeclarations/ExportInterfaceWithInaccessibleTypeInIndexerTypeAnnotations.ts] ////

//// [ExportInterfaceWithInaccessibleTypeInIndexerTypeAnnotations.ts]
namespace A {

    interface Point {
        x: number;
        y: number;
    }

    export interface points {

        [idx: number]: Point;
        [idx: string]: Point;
    }
}



//// [ExportInterfaceWithInaccessibleTypeInIndexerTypeAnnotations.js]
