export const enum CharacterCodes {
    EOF = -1,
    nullCharacter = 0,
    maxAsciiCharacter = 0x7F,

    lineFeed = 0x0A, // \n
    carriageReturn = 0x0D, // \r
    lineSeparator = 0x2028,
    paragraphSeparator = 0x2029,
    nextLine = 0x0085,

    // Unicode 3.0 space characters
    space = 0x0020, // " "
    nonBreakingSpace = 0x00A0, //
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
    mathematicalSpace = 0x205F,
    ogham = 0x1680,

    // Unicode replacement character produced when a byte sequence is invalid
    replacementCharacter = 0xFFFD,

    _ = 0x5F,
    $ = 0x24,

    _0 = 0x30,
    _1 = 0x31,
    _2 = 0x32,
    _3 = 0x33,
    _4 = 0x34,
    _5 = 0x35,
    _6 = 0x36,
    _7 = 0x37,
    _8 = 0x38,
    _9 = 0x39,

    a = 0x61,
    b = 0x62,
    c = 0x63,
    d = 0x64,
    e = 0x65,
    f = 0x66,
    g = 0x67,
    h = 0x68,
    i = 0x69,
    j = 0x6A,
    k = 0x6B,
    l = 0x6C,
    m = 0x6D,
    n = 0x6E,
    o = 0x6F,
    p = 0x70,
    q = 0x71,
    r = 0x72,
    s = 0x73,
    t = 0x74,
    u = 0x75,
    v = 0x76,
    w = 0x77,
    x = 0x78,
    y = 0x79,
    z = 0x7A,

    A = 0x41,
    B = 0x42,
    C = 0x43,
    D = 0x44,
    E = 0x45,
    F = 0x46,
    G = 0x47,
    H = 0x48,
    I = 0x49,
    J = 0x4A,
    K = 0x4B,
    L = 0x4C,
    M = 0x4D,
    N = 0x4E,
    O = 0x4F,
    P = 0x50,
    Q = 0x51,
    R = 0x52,
    S = 0x53,
    T = 0x54,
    U = 0x55,
    V = 0x56,
    W = 0x57,
    X = 0x58,
    Y = 0x59,
    Z = 0x5a,

    ampersand = 0x26, // &
    asterisk = 0x2A, // *
    at = 0x40, // @
    backslash = 0x5C, // \
    backtick = 0x60, // `
    bar = 0x7C, // |
    caret = 0x5E, // ^
    closeBrace = 0x7D, // }
    closeBracket = 0x5D, // ]
    closeParen = 0x29, // )
    colon = 0x3A, // :
    comma = 0x2C, // ,
    dot = 0x2E, // .
    doubleQuote = 0x22, // "
    equals = 0x3D, // =
    exclamation = 0x21, // !
    greaterThan = 0x3E, // >
    hash = 0x23, // #
    lessThan = 0x3C, // <
    minus = 0x2D, // -
    openBrace = 0x7B, // {
    openBracket = 0x5B, // [
    openParen = 0x28, // (
    percent = 0x25, // %
    plus = 0x2B, // +
    question = 0x3F, // ?
    semicolon = 0x3B, // ;
    singleQuote = 0x27, // '
    slash = 0x2F, // /
    tilde = 0x7E, // ~

    backspace = 0x08, // \b
    formFeed = 0x0C, // \f
    byteOrderMark = 0xFEFF,
    tab = 0x09, // \t
    verticalTab = 0x0B, // \v
}
