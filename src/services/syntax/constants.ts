///<reference path='references.ts' />

module TypeScript {
    export const enum ParserContextFlags {
        StrictMode          = 1 << 0,
        DisallowIn          = 1 << 1,
        Yield               = 1 << 2,
        GeneratorParameter  = 1 << 3,
        Async               = 1 << 4,

        Mask                = 0x1F
    }

    export enum SyntaxNodeConstants {
        None = 0,

        // The first five bit of the flags are used to store parser context flags.  The next bit
        // marks if we've computed the transitive data for the node.  The next bit marks if the node
        // is incrementally unusable.
        // 
        // The width of the node is stored in the remainder of the number.
        DataComputed                        = 1 << 5, // 0000 0000 0000 0000 0000 0000 0010 0000
        IncrementallyUnusableMask           = 1 << 6, // 0000 0000 0000 0000 0000 0000 0100 0000
        FullWidthShift                      = 1 << 7, // 1111 1111 1111 1111 1111 1111 1000 0000
    }
}