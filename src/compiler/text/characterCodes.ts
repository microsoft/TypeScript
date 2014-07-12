///<reference path='references.ts' />

module TypeScript {
    export enum CharacterCodes {
        nullCharacter = 0,
        maxAsciiCharacter = 127,

        lineFeed = 10,              // \n
        carriageReturn = 13,        // \r
        lineSeparator = 0x2028,
        paragraphSeparator = 0x2029,

        // REVIEW: do we need to support this?  The scanner doesn't, but our IText does.  This seems 
        // like an odd disparity?  (Or maybe it's completely fine for them to be different).
        nextLine = 0x0085,

        // Unicode 3.0 space characters
        space = 0x0020,   // " "
        nonBreakingSpace = 0x00A0,   //
        enQuad = 0x2000,
        emQuad = 0x2001,
        enSpace = 0x2002,
        emSpace = 0x2003,
        threePerEmSpace = 0x2004,
        fourPerEmSpace = 0x2005,
        sixPerEmSpace = 0x2006,
        figureSpace = 0x2007,
        punctuationSpace = 0x2008,
        thinSpace = 0x2009,
        hairSpace = 0x200A,
        zeroWidthSpace = 0x200B,
        narrowNoBreakSpace = 0x202F,
        ideographicSpace = 0x3000,

        _ = 95,
        $ = 36,

        _0 = 48,
        _7 = 55,
        _9 = 57,

        a = 97,
        b = 98,
        c = 99,
        d = 100,
        e = 101,
        f = 102,
        g = 103,
        h = 104,
        i = 105,
        k = 107,
        l = 108,
        m = 109,
        n = 110,
        o = 111,
        p = 112,
        q = 113,
        r = 114,
        s = 115,
        t = 116,
        u = 117,
        v = 118,
        w = 119,
        x = 120,
        y = 121,
        z = 122,

        A = 65,
        E = 69,
        F = 70,
        X = 88,
        Z = 90,

        ampersand = 38,             // &
        asterisk = 42,              // *
        at = 64,                    // @
        backslash = 92,             // \
        bar = 124,                  // |
        caret = 94,                 // ^
        closeBrace = 125,           // }
        closeBracket = 93,          // ]
        closeParen = 41,            // )
        colon = 58,                 // : 
        comma = 44,                 // ,
        dot = 46,                   // .
        doubleQuote = 34,           // "
        equals = 61,                // =
        exclamation = 33,           // !
        greaterThan = 62,           // >
        lessThan = 60,              // <
        minus = 45,                 // -
        openBrace = 123,            // {
        openBracket = 91,           // [
        openParen = 40,             // (
        percent = 37,               // %
        plus = 43,                  // +
        question = 63,              // ?
        semicolon = 59,             // ;
        singleQuote = 39,           // '
        slash = 47,                 // /
        tilde = 126,                // ~

        backspace = 8,              // \b
        formFeed = 12,              // \f
        byteOrderMark = 0xFEFF,
        tab = 9,                    // \t
        verticalTab = 11,           // \v
    }
}