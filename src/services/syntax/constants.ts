///<reference path='references.ts' />

module TypeScript {
    export enum SyntaxNodeConstants {
        None = 0,

        // Masks that we use to place information about a node into a single int.  The first bit tells
        // us if we've computed the data for a node.
        //
        // The second bit tells us if the node is incrementally reusable if it does not
        // containe any skipped tokens, zero width tokens, regex tokens in it ("/", "/=" or "/.../"), 
        // and contains no tokens that were parser generated.
        //
        // The next bit lets us know if the nodes was parsed in a strict context or node.  A node can
        // only be used by the incremental parser if it is parsed in the same strict context as before.
        // last masks off the part of the int
        //
        // The width of the node is stored in the remainder of the int.  This allows us up to 128MB
        // for a node by using all 27 bits.  However, in the common case, we'll use less than 27 bits
        // for the width.  Thus, the info will be stored in a single int in chakra.
        DataComputed                = 0x00000001, // 0000 0000 0000 0000 0000 0000 0000 0001
        IncrementallyUnusableMask   = 0x00000002, // 0000 0000 0000 0000 0000 0000 0000 0010
        ParsedInStrictModeContext   = 0x00000004, // 0000 0000 0000 0000 0000 0000 0000 0100
        ParsedInDisallowInContext   = 0x00000008, // 0000 0000 0000 0000 0000 0000 0000 1000
        ParsedInYieldContext        = 0x00000010, // 0000 0000 0000 0000 0000 0000 0001 0000
        NodeFullWidthShift          = 5,          // 1111 1111 1111 1111 1111 1111 1110 0000
    }
}