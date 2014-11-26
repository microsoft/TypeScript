///<reference path='references.ts' />

module TypeScript {
    export const enum ParserContextFlags {
        StrictMode          = 1 << 0,
        DisallowIn          = 1 << 1,
        Yield               = 1 << 2,
        GeneratorParameter  = 1 << 3,

        Mask                = 0xF
    }

    export enum SyntaxNodeConstants {
        None = 0,

        // The first four bit of the flags are used to store parser context flags.
        // The width of the node is stored in the remainder of the int.  This allows us up to 128MB
        // for a node by using all 27 bits.  However, in the common case, we'll use less than 27 bits
        // for the width.  Thus, the info will be stored in a single int in chakra.
        DataComputed                        = 1 << 4, // 0000 0000 0000 0000 0000 0000 0001 0000
        IncrementallyUnusableMask           = 1 << 5, // 0000 0000 0000 0000 0000 0000 0010 0000
        FullWidthShift                      = 1 << 6, // 1111 1111 1111 1111 1111 1111 1100 0000
    }
}