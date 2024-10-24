import {
    append,
    arrayIsEqualTo,
    binarySearch,
    CharacterCodes,
    CommentDirective,
    CommentDirectiveType,
    CommentKind,
    CommentRange,
    compareValues,
    createMultiMap,
    Debug,
    DiagnosticMessage,
    Diagnostics,
    flatMap,
    forEach,
    getNameOfScriptTarget,
    getSpellingSuggestion,
    identity,
    JSDocParsingMode,
    JSDocSyntaxKind,
    JsxTokenSyntaxKind,
    KeywordSyntaxKind,
    LanguageFeatureMinimumTarget,
    LanguageVariant,
    LanugageFeatures,
    last,
    LineAndCharacter,
    MapLike,
    MultiMap,
    parsePseudoBigInt,
    positionIsSynthesized,
    PunctuationOrKeywordSyntaxKind,
    RegularExpressionAnyString,
    RegularExpressionDisjunctionScope,
    RegularExpressionFlags,
    RegularExpressionPattern,
    RegularExpressionPatternContent,
    RegularExpressionPatternUnion,
    ScriptKind,
    ScriptTarget,
    setLast,
    some,
    SourceFileLike,
    SyntaxKind,
    TextRange,
    TokenFlags,
} from "./_namespaces/ts.js";

export type ErrorCallback = (message: DiagnosticMessage, length: number, arg0?: any) => void;

/** @internal */
export function tokenIsIdentifierOrKeyword(token: SyntaxKind): boolean {
    return token >= SyntaxKind.Identifier;
}

/** @internal */
export function tokenIsIdentifierOrKeywordOrGreaterThan(token: SyntaxKind): boolean {
    return token === SyntaxKind.GreaterThanToken || tokenIsIdentifierOrKeyword(token);
}

export interface Scanner {
    /** @deprecated use {@link getTokenFullStart} */
    getStartPos(): number;
    getToken(): SyntaxKind;
    getTokenFullStart(): number;
    getTokenStart(): number;
    getTokenEnd(): number;
    /** @deprecated use {@link getTokenEnd} */
    getTextPos(): number;
    /** @deprecated use {@link getTokenStart} */
    getTokenPos(): number;
    getTokenText(): string;
    getTokenValue(): string;
    /** @internal */
    getRegExpFlags(): RegularExpressionFlags;
    /** @internal */
    getRegExpCapturingGroups(): RegularExpressionPatternUnion[];
    /** @internal */
    getRegExpCapturingGroupSpecifiers(): MultiMap<string, RegularExpressionPatternUnion> | undefined;
    hasUnicodeEscape(): boolean;
    hasExtendedUnicodeEscape(): boolean;
    hasPrecedingLineBreak(): boolean;
    /** @internal */
    hasPrecedingJSDocComment(): boolean;
    /** @internal */
    hasPrecedingJSDocLeadingAsterisks(): boolean;
    isIdentifier(): boolean;
    isReservedWord(): boolean;
    isUnterminated(): boolean;
    /** @internal */
    getNumericLiteralFlags(): TokenFlags;
    /** @internal */
    getCommentDirectives(): CommentDirective[] | undefined;
    /** @internal */
    getTokenFlags(): TokenFlags;
    reScanGreaterToken(): SyntaxKind;
    reScanSlashToken(): SyntaxKind;
    /** @internal */
    reScanSlashToken(reportErrors?: boolean): SyntaxKind; // eslint-disable-line @typescript-eslint/unified-signatures
    reScanAsteriskEqualsToken(): SyntaxKind;
    reScanTemplateToken(isTaggedTemplate: boolean): SyntaxKind;
    /** @deprecated use {@link reScanTemplateToken}(false) */
    reScanTemplateHeadOrNoSubstitutionTemplate(): SyntaxKind;
    scanJsxIdentifier(): SyntaxKind;
    scanJsxAttributeValue(): SyntaxKind;
    reScanJsxAttributeValue(): SyntaxKind;
    reScanJsxToken(allowMultilineJsxText?: boolean): JsxTokenSyntaxKind;
    reScanLessThanToken(): SyntaxKind;
    reScanHashToken(): SyntaxKind;
    reScanQuestionToken(): SyntaxKind;
    reScanInvalidIdentifier(): SyntaxKind;
    scanJsxToken(): JsxTokenSyntaxKind;
    scanJsDocToken(): JSDocSyntaxKind;
    /** @internal */
    scanJSDocCommentTextToken(inBackticks: boolean): JSDocSyntaxKind | SyntaxKind.JSDocCommentTextToken;
    scan(): SyntaxKind;

    getText(): string;
    /** @internal */
    clearCommentDirectives(): void;
    // Sets the text for the scanner to scan.  An optional subrange starting point and length
    // can be provided to have the scanner only scan a portion of the text.
    setText(text: string | undefined, start?: number, length?: number): void;
    setOnError(onError: ErrorCallback | undefined): void;
    setScriptTarget(scriptTarget: ScriptTarget): void;
    setLanguageVariant(variant: LanguageVariant): void;
    setScriptKind(scriptKind: ScriptKind): void;
    setJSDocParsingMode(kind: JSDocParsingMode): void;
    /** @deprecated use {@link resetTokenState} */
    setTextPos(textPos: number): void;
    resetTokenState(pos: number): void;
    /** @internal */
    setSkipJsDocLeadingAsterisks(skip: boolean): void;
    // Invokes the provided callback then unconditionally restores the scanner to the state it
    // was in immediately prior to invoking the callback.  The result of invoking the callback
    // is returned from this function.
    lookAhead<T>(callback: () => T): T;

    // Invokes the callback with the scanner set to scan the specified range. When the callback
    // returns, the scanner is restored to the state it was in before scanRange was called.
    scanRange<T>(start: number, length: number, callback: () => T): T;

    // Invokes the provided callback.  If the callback returns something falsy, then it restores
    // the scanner to the state it was in immediately prior to invoking the callback.  If the
    // callback returns something truthy, then the scanner state is not rolled back.  The result
    // of invoking the callback is returned from this function.
    tryScan<T>(callback: () => T): T;
}

/** @internal */
export const textToKeywordObj: MapLike<KeywordSyntaxKind> = {
    abstract: SyntaxKind.AbstractKeyword,
    accessor: SyntaxKind.AccessorKeyword,
    any: SyntaxKind.AnyKeyword,
    as: SyntaxKind.AsKeyword,
    asserts: SyntaxKind.AssertsKeyword,
    assert: SyntaxKind.AssertKeyword,
    bigint: SyntaxKind.BigIntKeyword,
    boolean: SyntaxKind.BooleanKeyword,
    break: SyntaxKind.BreakKeyword,
    case: SyntaxKind.CaseKeyword,
    catch: SyntaxKind.CatchKeyword,
    class: SyntaxKind.ClassKeyword,
    continue: SyntaxKind.ContinueKeyword,
    const: SyntaxKind.ConstKeyword,
    ["" + "constructor"]: SyntaxKind.ConstructorKeyword,
    debugger: SyntaxKind.DebuggerKeyword,
    declare: SyntaxKind.DeclareKeyword,
    default: SyntaxKind.DefaultKeyword,
    delete: SyntaxKind.DeleteKeyword,
    do: SyntaxKind.DoKeyword,
    else: SyntaxKind.ElseKeyword,
    enum: SyntaxKind.EnumKeyword,
    export: SyntaxKind.ExportKeyword,
    extends: SyntaxKind.ExtendsKeyword,
    false: SyntaxKind.FalseKeyword,
    finally: SyntaxKind.FinallyKeyword,
    for: SyntaxKind.ForKeyword,
    from: SyntaxKind.FromKeyword,
    function: SyntaxKind.FunctionKeyword,
    get: SyntaxKind.GetKeyword,
    if: SyntaxKind.IfKeyword,
    implements: SyntaxKind.ImplementsKeyword,
    import: SyntaxKind.ImportKeyword,
    in: SyntaxKind.InKeyword,
    infer: SyntaxKind.InferKeyword,
    instanceof: SyntaxKind.InstanceOfKeyword,
    interface: SyntaxKind.InterfaceKeyword,
    intrinsic: SyntaxKind.IntrinsicKeyword,
    is: SyntaxKind.IsKeyword,
    keyof: SyntaxKind.KeyOfKeyword,
    let: SyntaxKind.LetKeyword,
    module: SyntaxKind.ModuleKeyword,
    namespace: SyntaxKind.NamespaceKeyword,
    never: SyntaxKind.NeverKeyword,
    new: SyntaxKind.NewKeyword,
    null: SyntaxKind.NullKeyword,
    number: SyntaxKind.NumberKeyword,
    object: SyntaxKind.ObjectKeyword,
    package: SyntaxKind.PackageKeyword,
    private: SyntaxKind.PrivateKeyword,
    protected: SyntaxKind.ProtectedKeyword,
    public: SyntaxKind.PublicKeyword,
    override: SyntaxKind.OverrideKeyword,
    out: SyntaxKind.OutKeyword,
    readonly: SyntaxKind.ReadonlyKeyword,
    require: SyntaxKind.RequireKeyword,
    global: SyntaxKind.GlobalKeyword,
    return: SyntaxKind.ReturnKeyword,
    satisfies: SyntaxKind.SatisfiesKeyword,
    set: SyntaxKind.SetKeyword,
    static: SyntaxKind.StaticKeyword,
    string: SyntaxKind.StringKeyword,
    super: SyntaxKind.SuperKeyword,
    switch: SyntaxKind.SwitchKeyword,
    symbol: SyntaxKind.SymbolKeyword,
    this: SyntaxKind.ThisKeyword,
    throw: SyntaxKind.ThrowKeyword,
    true: SyntaxKind.TrueKeyword,
    try: SyntaxKind.TryKeyword,
    type: SyntaxKind.TypeKeyword,
    typeof: SyntaxKind.TypeOfKeyword,
    undefined: SyntaxKind.UndefinedKeyword,
    unique: SyntaxKind.UniqueKeyword,
    unknown: SyntaxKind.UnknownKeyword,
    using: SyntaxKind.UsingKeyword,
    var: SyntaxKind.VarKeyword,
    void: SyntaxKind.VoidKeyword,
    while: SyntaxKind.WhileKeyword,
    with: SyntaxKind.WithKeyword,
    yield: SyntaxKind.YieldKeyword,
    async: SyntaxKind.AsyncKeyword,
    await: SyntaxKind.AwaitKeyword,
    of: SyntaxKind.OfKeyword,
};

const textToKeyword = new Map(Object.entries(textToKeywordObj));

const textToToken = new Map(Object.entries({
    ...textToKeywordObj,
    "{": SyntaxKind.OpenBraceToken,
    "}": SyntaxKind.CloseBraceToken,
    "(": SyntaxKind.OpenParenToken,
    ")": SyntaxKind.CloseParenToken,
    "[": SyntaxKind.OpenBracketToken,
    "]": SyntaxKind.CloseBracketToken,
    ".": SyntaxKind.DotToken,
    "...": SyntaxKind.DotDotDotToken,
    ";": SyntaxKind.SemicolonToken,
    ",": SyntaxKind.CommaToken,
    "<": SyntaxKind.LessThanToken,
    ">": SyntaxKind.GreaterThanToken,
    "<=": SyntaxKind.LessThanEqualsToken,
    ">=": SyntaxKind.GreaterThanEqualsToken,
    "==": SyntaxKind.EqualsEqualsToken,
    "!=": SyntaxKind.ExclamationEqualsToken,
    "===": SyntaxKind.EqualsEqualsEqualsToken,
    "!==": SyntaxKind.ExclamationEqualsEqualsToken,
    "=>": SyntaxKind.EqualsGreaterThanToken,
    "+": SyntaxKind.PlusToken,
    "-": SyntaxKind.MinusToken,
    "**": SyntaxKind.AsteriskAsteriskToken,
    "*": SyntaxKind.AsteriskToken,
    "/": SyntaxKind.SlashToken,
    "%": SyntaxKind.PercentToken,
    "++": SyntaxKind.PlusPlusToken,
    "--": SyntaxKind.MinusMinusToken,
    "<<": SyntaxKind.LessThanLessThanToken,
    "</": SyntaxKind.LessThanSlashToken,
    ">>": SyntaxKind.GreaterThanGreaterThanToken,
    ">>>": SyntaxKind.GreaterThanGreaterThanGreaterThanToken,
    "&": SyntaxKind.AmpersandToken,
    "|": SyntaxKind.BarToken,
    "^": SyntaxKind.CaretToken,
    "!": SyntaxKind.ExclamationToken,
    "~": SyntaxKind.TildeToken,
    "&&": SyntaxKind.AmpersandAmpersandToken,
    "||": SyntaxKind.BarBarToken,
    "?": SyntaxKind.QuestionToken,
    "??": SyntaxKind.QuestionQuestionToken,
    "?.": SyntaxKind.QuestionDotToken,
    ":": SyntaxKind.ColonToken,
    "=": SyntaxKind.EqualsToken,
    "+=": SyntaxKind.PlusEqualsToken,
    "-=": SyntaxKind.MinusEqualsToken,
    "*=": SyntaxKind.AsteriskEqualsToken,
    "**=": SyntaxKind.AsteriskAsteriskEqualsToken,
    "/=": SyntaxKind.SlashEqualsToken,
    "%=": SyntaxKind.PercentEqualsToken,
    "<<=": SyntaxKind.LessThanLessThanEqualsToken,
    ">>=": SyntaxKind.GreaterThanGreaterThanEqualsToken,
    ">>>=": SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken,
    "&=": SyntaxKind.AmpersandEqualsToken,
    "|=": SyntaxKind.BarEqualsToken,
    "^=": SyntaxKind.CaretEqualsToken,
    "||=": SyntaxKind.BarBarEqualsToken,
    "&&=": SyntaxKind.AmpersandAmpersandEqualsToken,
    "??=": SyntaxKind.QuestionQuestionEqualsToken,
    "@": SyntaxKind.AtToken,
    "#": SyntaxKind.HashToken,
    "`": SyntaxKind.BacktickToken,
}));

const charCodeToRegExpFlag = new Map<CharacterCodes, RegularExpressionFlags>([
    [CharacterCodes.d, RegularExpressionFlags.HasIndices],
    [CharacterCodes.g, RegularExpressionFlags.Global],
    [CharacterCodes.i, RegularExpressionFlags.IgnoreCase],
    [CharacterCodes.m, RegularExpressionFlags.Multiline],
    [CharacterCodes.s, RegularExpressionFlags.DotAll],
    [CharacterCodes.u, RegularExpressionFlags.Unicode],
    [CharacterCodes.v, RegularExpressionFlags.UnicodeSets],
    [CharacterCodes.y, RegularExpressionFlags.Sticky],
]);

const regExpFlagToFirstAvailableLanguageVersion = new Map<RegularExpressionFlags, typeof LanguageFeatureMinimumTarget[LanugageFeatures]>([
    [RegularExpressionFlags.HasIndices, LanguageFeatureMinimumTarget.RegularExpressionFlagsHasIndices],
    [RegularExpressionFlags.DotAll, LanguageFeatureMinimumTarget.RegularExpressionFlagsDotAll],
    [RegularExpressionFlags.Unicode, LanguageFeatureMinimumTarget.RegularExpressionFlagsUnicode],
    [RegularExpressionFlags.UnicodeSets, LanguageFeatureMinimumTarget.RegularExpressionFlagsUnicodeSets],
    [RegularExpressionFlags.Sticky, LanguageFeatureMinimumTarget.RegularExpressionFlagsSticky],
]);

const RegExpDigits = new Set(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]) as RegularExpressionPatternUnion;

/** @internal */
export const RegExpAnyString = {} as RegularExpressionAnyString;

/*
    As per ECMAScript Language Specification 5th Edition, Section 7.6: ISyntaxToken Names and Identifiers
    IdentifierStart ::
        Can contain Unicode 6.2 categories:
        Uppercase letter (Lu),
        Lowercase letter (Ll),
        Titlecase letter (Lt),
        Modifier letter (Lm),
        Other letter (Lo), or
        Letter number (Nl).
    IdentifierPart ::
        Can contain IdentifierStart + Unicode 6.2 categories:
        Non-spacing mark (Mn),
        Combining spacing mark (Mc),
        Decimal number (Nd),
        Connector punctuation (Pc),
        <ZWNJ>, or
        <ZWJ>.

    Codepoint ranges for ES5 Identifiers are extracted from the Unicode 6.2 specification at:
    http://www.unicode.org/Public/6.2.0/ucd/UnicodeData.txt
*/
// dprint-ignore
const unicodeES5IdentifierStart = [170, 170, 181, 181, 186, 186, 192, 214, 216, 246, 248, 705, 710, 721, 736, 740, 748, 748, 750, 750, 880, 884, 886, 887, 890, 893, 902, 902, 904, 906, 908, 908, 910, 929, 931, 1013, 1015, 1153, 1162, 1319, 1329, 1366, 1369, 1369, 1377, 1415, 1488, 1514, 1520, 1522, 1568, 1610, 1646, 1647, 1649, 1747, 1749, 1749, 1765, 1766, 1774, 1775, 1786, 1788, 1791, 1791, 1808, 1808, 1810, 1839, 1869, 1957, 1969, 1969, 1994, 2026, 2036, 2037, 2042, 2042, 2048, 2069, 2074, 2074, 2084, 2084, 2088, 2088, 2112, 2136, 2208, 2208, 2210, 2220, 2308, 2361, 2365, 2365, 2384, 2384, 2392, 2401, 2417, 2423, 2425, 2431, 2437, 2444, 2447, 2448, 2451, 2472, 2474, 2480, 2482, 2482, 2486, 2489, 2493, 2493, 2510, 2510, 2524, 2525, 2527, 2529, 2544, 2545, 2565, 2570, 2575, 2576, 2579, 2600, 2602, 2608, 2610, 2611, 2613, 2614, 2616, 2617, 2649, 2652, 2654, 2654, 2674, 2676, 2693, 2701, 2703, 2705, 2707, 2728, 2730, 2736, 2738, 2739, 2741, 2745, 2749, 2749, 2768, 2768, 2784, 2785, 2821, 2828, 2831, 2832, 2835, 2856, 2858, 2864, 2866, 2867, 2869, 2873, 2877, 2877, 2908, 2909, 2911, 2913, 2929, 2929, 2947, 2947, 2949, 2954, 2958, 2960, 2962, 2965, 2969, 2970, 2972, 2972, 2974, 2975, 2979, 2980, 2984, 2986, 2990, 3001, 3024, 3024, 3077, 3084, 3086, 3088, 3090, 3112, 3114, 3123, 3125, 3129, 3133, 3133, 3160, 3161, 3168, 3169, 3205, 3212, 3214, 3216, 3218, 3240, 3242, 3251, 3253, 3257, 3261, 3261, 3294, 3294, 3296, 3297, 3313, 3314, 3333, 3340, 3342, 3344, 3346, 3386, 3389, 3389, 3406, 3406, 3424, 3425, 3450, 3455, 3461, 3478, 3482, 3505, 3507, 3515, 3517, 3517, 3520, 3526, 3585, 3632, 3634, 3635, 3648, 3654, 3713, 3714, 3716, 3716, 3719, 3720, 3722, 3722, 3725, 3725, 3732, 3735, 3737, 3743, 3745, 3747, 3749, 3749, 3751, 3751, 3754, 3755, 3757, 3760, 3762, 3763, 3773, 3773, 3776, 3780, 3782, 3782, 3804, 3807, 3840, 3840, 3904, 3911, 3913, 3948, 3976, 3980, 4096, 4138, 4159, 4159, 4176, 4181, 4186, 4189, 4193, 4193, 4197, 4198, 4206, 4208, 4213, 4225, 4238, 4238, 4256, 4293, 4295, 4295, 4301, 4301, 4304, 4346, 4348, 4680, 4682, 4685, 4688, 4694, 4696, 4696, 4698, 4701, 4704, 4744, 4746, 4749, 4752, 4784, 4786, 4789, 4792, 4798, 4800, 4800, 4802, 4805, 4808, 4822, 4824, 4880, 4882, 4885, 4888, 4954, 4992, 5007, 5024, 5108, 5121, 5740, 5743, 5759, 5761, 5786, 5792, 5866, 5870, 5872, 5888, 5900, 5902, 5905, 5920, 5937, 5952, 5969, 5984, 5996, 5998, 6000, 6016, 6067, 6103, 6103, 6108, 6108, 6176, 6263, 6272, 6312, 6314, 6314, 6320, 6389, 6400, 6428, 6480, 6509, 6512, 6516, 6528, 6571, 6593, 6599, 6656, 6678, 6688, 6740, 6823, 6823, 6917, 6963, 6981, 6987, 7043, 7072, 7086, 7087, 7098, 7141, 7168, 7203, 7245, 7247, 7258, 7293, 7401, 7404, 7406, 7409, 7413, 7414, 7424, 7615, 7680, 7957, 7960, 7965, 7968, 8005, 8008, 8013, 8016, 8023, 8025, 8025, 8027, 8027, 8029, 8029, 8031, 8061, 8064, 8116, 8118, 8124, 8126, 8126, 8130, 8132, 8134, 8140, 8144, 8147, 8150, 8155, 8160, 8172, 8178, 8180, 8182, 8188, 8305, 8305, 8319, 8319, 8336, 8348, 8450, 8450, 8455, 8455, 8458, 8467, 8469, 8469, 8473, 8477, 8484, 8484, 8486, 8486, 8488, 8488, 8490, 8493, 8495, 8505, 8508, 8511, 8517, 8521, 8526, 8526, 8544, 8584, 11264, 11310, 11312, 11358, 11360, 11492, 11499, 11502, 11506, 11507, 11520, 11557, 11559, 11559, 11565, 11565, 11568, 11623, 11631, 11631, 11648, 11670, 11680, 11686, 11688, 11694, 11696, 11702, 11704, 11710, 11712, 11718, 11720, 11726, 11728, 11734, 11736, 11742, 11823, 11823, 12293, 12295, 12321, 12329, 12337, 12341, 12344, 12348, 12353, 12438, 12445, 12447, 12449, 12538, 12540, 12543, 12549, 12589, 12593, 12686, 12704, 12730, 12784, 12799, 13312, 19893, 19968, 40908, 40960, 42124, 42192, 42237, 42240, 42508, 42512, 42527, 42538, 42539, 42560, 42606, 42623, 42647, 42656, 42735, 42775, 42783, 42786, 42888, 42891, 42894, 42896, 42899, 42912, 42922, 43000, 43009, 43011, 43013, 43015, 43018, 43020, 43042, 43072, 43123, 43138, 43187, 43250, 43255, 43259, 43259, 43274, 43301, 43312, 43334, 43360, 43388, 43396, 43442, 43471, 43471, 43520, 43560, 43584, 43586, 43588, 43595, 43616, 43638, 43642, 43642, 43648, 43695, 43697, 43697, 43701, 43702, 43705, 43709, 43712, 43712, 43714, 43714, 43739, 43741, 43744, 43754, 43762, 43764, 43777, 43782, 43785, 43790, 43793, 43798, 43808, 43814, 43816, 43822, 43968, 44002, 44032, 55203, 55216, 55238, 55243, 55291, 63744, 64109, 64112, 64217, 64256, 64262, 64275, 64279, 64285, 64285, 64287, 64296, 64298, 64310, 64312, 64316, 64318, 64318, 64320, 64321, 64323, 64324, 64326, 64433, 64467, 64829, 64848, 64911, 64914, 64967, 65008, 65019, 65136, 65140, 65142, 65276, 65313, 65338, 65345, 65370, 65382, 65470, 65474, 65479, 65482, 65487, 65490, 65495, 65498, 65500 ];
// dprint-ignore
const unicodeES5IdentifierPart = [170, 170, 181, 181, 186, 186, 192, 214, 216, 246, 248, 705, 710, 721, 736, 740, 748, 748, 750, 750, 768, 884, 886, 887, 890, 893, 902, 902, 904, 906, 908, 908, 910, 929, 931, 1013, 1015, 1153, 1155, 1159, 1162, 1319, 1329, 1366, 1369, 1369, 1377, 1415, 1425, 1469, 1471, 1471, 1473, 1474, 1476, 1477, 1479, 1479, 1488, 1514, 1520, 1522, 1552, 1562, 1568, 1641, 1646, 1747, 1749, 1756, 1759, 1768, 1770, 1788, 1791, 1791, 1808, 1866, 1869, 1969, 1984, 2037, 2042, 2042, 2048, 2093, 2112, 2139, 2208, 2208, 2210, 2220, 2276, 2302, 2304, 2403, 2406, 2415, 2417, 2423, 2425, 2431, 2433, 2435, 2437, 2444, 2447, 2448, 2451, 2472, 2474, 2480, 2482, 2482, 2486, 2489, 2492, 2500, 2503, 2504, 2507, 2510, 2519, 2519, 2524, 2525, 2527, 2531, 2534, 2545, 2561, 2563, 2565, 2570, 2575, 2576, 2579, 2600, 2602, 2608, 2610, 2611, 2613, 2614, 2616, 2617, 2620, 2620, 2622, 2626, 2631, 2632, 2635, 2637, 2641, 2641, 2649, 2652, 2654, 2654, 2662, 2677, 2689, 2691, 2693, 2701, 2703, 2705, 2707, 2728, 2730, 2736, 2738, 2739, 2741, 2745, 2748, 2757, 2759, 2761, 2763, 2765, 2768, 2768, 2784, 2787, 2790, 2799, 2817, 2819, 2821, 2828, 2831, 2832, 2835, 2856, 2858, 2864, 2866, 2867, 2869, 2873, 2876, 2884, 2887, 2888, 2891, 2893, 2902, 2903, 2908, 2909, 2911, 2915, 2918, 2927, 2929, 2929, 2946, 2947, 2949, 2954, 2958, 2960, 2962, 2965, 2969, 2970, 2972, 2972, 2974, 2975, 2979, 2980, 2984, 2986, 2990, 3001, 3006, 3010, 3014, 3016, 3018, 3021, 3024, 3024, 3031, 3031, 3046, 3055, 3073, 3075, 3077, 3084, 3086, 3088, 3090, 3112, 3114, 3123, 3125, 3129, 3133, 3140, 3142, 3144, 3146, 3149, 3157, 3158, 3160, 3161, 3168, 3171, 3174, 3183, 3202, 3203, 3205, 3212, 3214, 3216, 3218, 3240, 3242, 3251, 3253, 3257, 3260, 3268, 3270, 3272, 3274, 3277, 3285, 3286, 3294, 3294, 3296, 3299, 3302, 3311, 3313, 3314, 3330, 3331, 3333, 3340, 3342, 3344, 3346, 3386, 3389, 3396, 3398, 3400, 3402, 3406, 3415, 3415, 3424, 3427, 3430, 3439, 3450, 3455, 3458, 3459, 3461, 3478, 3482, 3505, 3507, 3515, 3517, 3517, 3520, 3526, 3530, 3530, 3535, 3540, 3542, 3542, 3544, 3551, 3570, 3571, 3585, 3642, 3648, 3662, 3664, 3673, 3713, 3714, 3716, 3716, 3719, 3720, 3722, 3722, 3725, 3725, 3732, 3735, 3737, 3743, 3745, 3747, 3749, 3749, 3751, 3751, 3754, 3755, 3757, 3769, 3771, 3773, 3776, 3780, 3782, 3782, 3784, 3789, 3792, 3801, 3804, 3807, 3840, 3840, 3864, 3865, 3872, 3881, 3893, 3893, 3895, 3895, 3897, 3897, 3902, 3911, 3913, 3948, 3953, 3972, 3974, 3991, 3993, 4028, 4038, 4038, 4096, 4169, 4176, 4253, 4256, 4293, 4295, 4295, 4301, 4301, 4304, 4346, 4348, 4680, 4682, 4685, 4688, 4694, 4696, 4696, 4698, 4701, 4704, 4744, 4746, 4749, 4752, 4784, 4786, 4789, 4792, 4798, 4800, 4800, 4802, 4805, 4808, 4822, 4824, 4880, 4882, 4885, 4888, 4954, 4957, 4959, 4992, 5007, 5024, 5108, 5121, 5740, 5743, 5759, 5761, 5786, 5792, 5866, 5870, 5872, 5888, 5900, 5902, 5908, 5920, 5940, 5952, 5971, 5984, 5996, 5998, 6000, 6002, 6003, 6016, 6099, 6103, 6103, 6108, 6109, 6112, 6121, 6155, 6157, 6160, 6169, 6176, 6263, 6272, 6314, 6320, 6389, 6400, 6428, 6432, 6443, 6448, 6459, 6470, 6509, 6512, 6516, 6528, 6571, 6576, 6601, 6608, 6617, 6656, 6683, 6688, 6750, 6752, 6780, 6783, 6793, 6800, 6809, 6823, 6823, 6912, 6987, 6992, 7001, 7019, 7027, 7040, 7155, 7168, 7223, 7232, 7241, 7245, 7293, 7376, 7378, 7380, 7414, 7424, 7654, 7676, 7957, 7960, 7965, 7968, 8005, 8008, 8013, 8016, 8023, 8025, 8025, 8027, 8027, 8029, 8029, 8031, 8061, 8064, 8116, 8118, 8124, 8126, 8126, 8130, 8132, 8134, 8140, 8144, 8147, 8150, 8155, 8160, 8172, 8178, 8180, 8182, 8188, 8204, 8205, 8255, 8256, 8276, 8276, 8305, 8305, 8319, 8319, 8336, 8348, 8400, 8412, 8417, 8417, 8421, 8432, 8450, 8450, 8455, 8455, 8458, 8467, 8469, 8469, 8473, 8477, 8484, 8484, 8486, 8486, 8488, 8488, 8490, 8493, 8495, 8505, 8508, 8511, 8517, 8521, 8526, 8526, 8544, 8584, 11264, 11310, 11312, 11358, 11360, 11492, 11499, 11507, 11520, 11557, 11559, 11559, 11565, 11565, 11568, 11623, 11631, 11631, 11647, 11670, 11680, 11686, 11688, 11694, 11696, 11702, 11704, 11710, 11712, 11718, 11720, 11726, 11728, 11734, 11736, 11742, 11744, 11775, 11823, 11823, 12293, 12295, 12321, 12335, 12337, 12341, 12344, 12348, 12353, 12438, 12441, 12442, 12445, 12447, 12449, 12538, 12540, 12543, 12549, 12589, 12593, 12686, 12704, 12730, 12784, 12799, 13312, 19893, 19968, 40908, 40960, 42124, 42192, 42237, 42240, 42508, 42512, 42539, 42560, 42607, 42612, 42621, 42623, 42647, 42655, 42737, 42775, 42783, 42786, 42888, 42891, 42894, 42896, 42899, 42912, 42922, 43000, 43047, 43072, 43123, 43136, 43204, 43216, 43225, 43232, 43255, 43259, 43259, 43264, 43309, 43312, 43347, 43360, 43388, 43392, 43456, 43471, 43481, 43520, 43574, 43584, 43597, 43600, 43609, 43616, 43638, 43642, 43643, 43648, 43714, 43739, 43741, 43744, 43759, 43762, 43766, 43777, 43782, 43785, 43790, 43793, 43798, 43808, 43814, 43816, 43822, 43968, 44010, 44012, 44013, 44016, 44025, 44032, 55203, 55216, 55238, 55243, 55291, 63744, 64109, 64112, 64217, 64256, 64262, 64275, 64279, 64285, 64296, 64298, 64310, 64312, 64316, 64318, 64318, 64320, 64321, 64323, 64324, 64326, 64433, 64467, 64829, 64848, 64911, 64914, 64967, 65008, 65019, 65024, 65039, 65056, 65062, 65075, 65076, 65101, 65103, 65136, 65140, 65142, 65276, 65296, 65305, 65313, 65338, 65343, 65343, 65345, 65370, 65382, 65470, 65474, 65479, 65482, 65487, 65490, 65495, 65498, 65500 ];

/**
 * Generated by scripts/regenerate-unicode-identifier-parts.mjs on node v22.1.0 with unicode 15.1
 * based on http://www.unicode.org/reports/tr31/ and https://www.ecma-international.org/ecma-262/6.0/#sec-names-and-keywords
 * unicodeESNextIdentifierStart corresponds to the ID_Start and Other_ID_Start property, and
 * unicodeESNextIdentifierPart corresponds to ID_Continue, Other_ID_Continue, plus ID_Start and Other_ID_Start
 */
// dprint-ignore
const unicodeESNextIdentifierStart = [65, 90, 97, 122, 170, 170, 181, 181, 186, 186, 192, 214, 216, 246, 248, 705, 710, 721, 736, 740, 748, 748, 750, 750, 880, 884, 886, 887, 890, 893, 895, 895, 902, 902, 904, 906, 908, 908, 910, 929, 931, 1013, 1015, 1153, 1162, 1327, 1329, 1366, 1369, 1369, 1376, 1416, 1488, 1514, 1519, 1522, 1568, 1610, 1646, 1647, 1649, 1747, 1749, 1749, 1765, 1766, 1774, 1775, 1786, 1788, 1791, 1791, 1808, 1808, 1810, 1839, 1869, 1957, 1969, 1969, 1994, 2026, 2036, 2037, 2042, 2042, 2048, 2069, 2074, 2074, 2084, 2084, 2088, 2088, 2112, 2136, 2144, 2154, 2160, 2183, 2185, 2190, 2208, 2249, 2308, 2361, 2365, 2365, 2384, 2384, 2392, 2401, 2417, 2432, 2437, 2444, 2447, 2448, 2451, 2472, 2474, 2480, 2482, 2482, 2486, 2489, 2493, 2493, 2510, 2510, 2524, 2525, 2527, 2529, 2544, 2545, 2556, 2556, 2565, 2570, 2575, 2576, 2579, 2600, 2602, 2608, 2610, 2611, 2613, 2614, 2616, 2617, 2649, 2652, 2654, 2654, 2674, 2676, 2693, 2701, 2703, 2705, 2707, 2728, 2730, 2736, 2738, 2739, 2741, 2745, 2749, 2749, 2768, 2768, 2784, 2785, 2809, 2809, 2821, 2828, 2831, 2832, 2835, 2856, 2858, 2864, 2866, 2867, 2869, 2873, 2877, 2877, 2908, 2909, 2911, 2913, 2929, 2929, 2947, 2947, 2949, 2954, 2958, 2960, 2962, 2965, 2969, 2970, 2972, 2972, 2974, 2975, 2979, 2980, 2984, 2986, 2990, 3001, 3024, 3024, 3077, 3084, 3086, 3088, 3090, 3112, 3114, 3129, 3133, 3133, 3160, 3162, 3165, 3165, 3168, 3169, 3200, 3200, 3205, 3212, 3214, 3216, 3218, 3240, 3242, 3251, 3253, 3257, 3261, 3261, 3293, 3294, 3296, 3297, 3313, 3314, 3332, 3340, 3342, 3344, 3346, 3386, 3389, 3389, 3406, 3406, 3412, 3414, 3423, 3425, 3450, 3455, 3461, 3478, 3482, 3505, 3507, 3515, 3517, 3517, 3520, 3526, 3585, 3632, 3634, 3635, 3648, 3654, 3713, 3714, 3716, 3716, 3718, 3722, 3724, 3747, 3749, 3749, 3751, 3760, 3762, 3763, 3773, 3773, 3776, 3780, 3782, 3782, 3804, 3807, 3840, 3840, 3904, 3911, 3913, 3948, 3976, 3980, 4096, 4138, 4159, 4159, 4176, 4181, 4186, 4189, 4193, 4193, 4197, 4198, 4206, 4208, 4213, 4225, 4238, 4238, 4256, 4293, 4295, 4295, 4301, 4301, 4304, 4346, 4348, 4680, 4682, 4685, 4688, 4694, 4696, 4696, 4698, 4701, 4704, 4744, 4746, 4749, 4752, 4784, 4786, 4789, 4792, 4798, 4800, 4800, 4802, 4805, 4808, 4822, 4824, 4880, 4882, 4885, 4888, 4954, 4992, 5007, 5024, 5109, 5112, 5117, 5121, 5740, 5743, 5759, 5761, 5786, 5792, 5866, 5870, 5880, 5888, 5905, 5919, 5937, 5952, 5969, 5984, 5996, 5998, 6000, 6016, 6067, 6103, 6103, 6108, 6108, 6176, 6264, 6272, 6312, 6314, 6314, 6320, 6389, 6400, 6430, 6480, 6509, 6512, 6516, 6528, 6571, 6576, 6601, 6656, 6678, 6688, 6740, 6823, 6823, 6917, 6963, 6981, 6988, 7043, 7072, 7086, 7087, 7098, 7141, 7168, 7203, 7245, 7247, 7258, 7293, 7296, 7304, 7312, 7354, 7357, 7359, 7401, 7404, 7406, 7411, 7413, 7414, 7418, 7418, 7424, 7615, 7680, 7957, 7960, 7965, 7968, 8005, 8008, 8013, 8016, 8023, 8025, 8025, 8027, 8027, 8029, 8029, 8031, 8061, 8064, 8116, 8118, 8124, 8126, 8126, 8130, 8132, 8134, 8140, 8144, 8147, 8150, 8155, 8160, 8172, 8178, 8180, 8182, 8188, 8305, 8305, 8319, 8319, 8336, 8348, 8450, 8450, 8455, 8455, 8458, 8467, 8469, 8469, 8472, 8477, 8484, 8484, 8486, 8486, 8488, 8488, 8490, 8505, 8508, 8511, 8517, 8521, 8526, 8526, 8544, 8584, 11264, 11492, 11499, 11502, 11506, 11507, 11520, 11557, 11559, 11559, 11565, 11565, 11568, 11623, 11631, 11631, 11648, 11670, 11680, 11686, 11688, 11694, 11696, 11702, 11704, 11710, 11712, 11718, 11720, 11726, 11728, 11734, 11736, 11742, 12293, 12295, 12321, 12329, 12337, 12341, 12344, 12348, 12353, 12438, 12443, 12447, 12449, 12538, 12540, 12543, 12549, 12591, 12593, 12686, 12704, 12735, 12784, 12799, 13312, 19903, 19968, 42124, 42192, 42237, 42240, 42508, 42512, 42527, 42538, 42539, 42560, 42606, 42623, 42653, 42656, 42735, 42775, 42783, 42786, 42888, 42891, 42954, 42960, 42961, 42963, 42963, 42965, 42969, 42994, 43009, 43011, 43013, 43015, 43018, 43020, 43042, 43072, 43123, 43138, 43187, 43250, 43255, 43259, 43259, 43261, 43262, 43274, 43301, 43312, 43334, 43360, 43388, 43396, 43442, 43471, 43471, 43488, 43492, 43494, 43503, 43514, 43518, 43520, 43560, 43584, 43586, 43588, 43595, 43616, 43638, 43642, 43642, 43646, 43695, 43697, 43697, 43701, 43702, 43705, 43709, 43712, 43712, 43714, 43714, 43739, 43741, 43744, 43754, 43762, 43764, 43777, 43782, 43785, 43790, 43793, 43798, 43808, 43814, 43816, 43822, 43824, 43866, 43868, 43881, 43888, 44002, 44032, 55203, 55216, 55238, 55243, 55291, 63744, 64109, 64112, 64217, 64256, 64262, 64275, 64279, 64285, 64285, 64287, 64296, 64298, 64310, 64312, 64316, 64318, 64318, 64320, 64321, 64323, 64324, 64326, 64433, 64467, 64829, 64848, 64911, 64914, 64967, 65008, 65019, 65136, 65140, 65142, 65276, 65313, 65338, 65345, 65370, 65382, 65470, 65474, 65479, 65482, 65487, 65490, 65495, 65498, 65500, 65536, 65547, 65549, 65574, 65576, 65594, 65596, 65597, 65599, 65613, 65616, 65629, 65664, 65786, 65856, 65908, 66176, 66204, 66208, 66256, 66304, 66335, 66349, 66378, 66384, 66421, 66432, 66461, 66464, 66499, 66504, 66511, 66513, 66517, 66560, 66717, 66736, 66771, 66776, 66811, 66816, 66855, 66864, 66915, 66928, 66938, 66940, 66954, 66956, 66962, 66964, 66965, 66967, 66977, 66979, 66993, 66995, 67001, 67003, 67004, 67072, 67382, 67392, 67413, 67424, 67431, 67456, 67461, 67463, 67504, 67506, 67514, 67584, 67589, 67592, 67592, 67594, 67637, 67639, 67640, 67644, 67644, 67647, 67669, 67680, 67702, 67712, 67742, 67808, 67826, 67828, 67829, 67840, 67861, 67872, 67897, 67968, 68023, 68030, 68031, 68096, 68096, 68112, 68115, 68117, 68119, 68121, 68149, 68192, 68220, 68224, 68252, 68288, 68295, 68297, 68324, 68352, 68405, 68416, 68437, 68448, 68466, 68480, 68497, 68608, 68680, 68736, 68786, 68800, 68850, 68864, 68899, 69248, 69289, 69296, 69297, 69376, 69404, 69415, 69415, 69424, 69445, 69488, 69505, 69552, 69572, 69600, 69622, 69635, 69687, 69745, 69746, 69749, 69749, 69763, 69807, 69840, 69864, 69891, 69926, 69956, 69956, 69959, 69959, 69968, 70002, 70006, 70006, 70019, 70066, 70081, 70084, 70106, 70106, 70108, 70108, 70144, 70161, 70163, 70187, 70207, 70208, 70272, 70278, 70280, 70280, 70282, 70285, 70287, 70301, 70303, 70312, 70320, 70366, 70405, 70412, 70415, 70416, 70419, 70440, 70442, 70448, 70450, 70451, 70453, 70457, 70461, 70461, 70480, 70480, 70493, 70497, 70656, 70708, 70727, 70730, 70751, 70753, 70784, 70831, 70852, 70853, 70855, 70855, 71040, 71086, 71128, 71131, 71168, 71215, 71236, 71236, 71296, 71338, 71352, 71352, 71424, 71450, 71488, 71494, 71680, 71723, 71840, 71903, 71935, 71942, 71945, 71945, 71948, 71955, 71957, 71958, 71960, 71983, 71999, 71999, 72001, 72001, 72096, 72103, 72106, 72144, 72161, 72161, 72163, 72163, 72192, 72192, 72203, 72242, 72250, 72250, 72272, 72272, 72284, 72329, 72349, 72349, 72368, 72440, 72704, 72712, 72714, 72750, 72768, 72768, 72818, 72847, 72960, 72966, 72968, 72969, 72971, 73008, 73030, 73030, 73056, 73061, 73063, 73064, 73066, 73097, 73112, 73112, 73440, 73458, 73474, 73474, 73476, 73488, 73490, 73523, 73648, 73648, 73728, 74649, 74752, 74862, 74880, 75075, 77712, 77808, 77824, 78895, 78913, 78918, 82944, 83526, 92160, 92728, 92736, 92766, 92784, 92862, 92880, 92909, 92928, 92975, 92992, 92995, 93027, 93047, 93053, 93071, 93760, 93823, 93952, 94026, 94032, 94032, 94099, 94111, 94176, 94177, 94179, 94179, 94208, 100343, 100352, 101589, 101632, 101640, 110576, 110579, 110581, 110587, 110589, 110590, 110592, 110882, 110898, 110898, 110928, 110930, 110933, 110933, 110948, 110951, 110960, 111355, 113664, 113770, 113776, 113788, 113792, 113800, 113808, 113817, 119808, 119892, 119894, 119964, 119966, 119967, 119970, 119970, 119973, 119974, 119977, 119980, 119982, 119993, 119995, 119995, 119997, 120003, 120005, 120069, 120071, 120074, 120077, 120084, 120086, 120092, 120094, 120121, 120123, 120126, 120128, 120132, 120134, 120134, 120138, 120144, 120146, 120485, 120488, 120512, 120514, 120538, 120540, 120570, 120572, 120596, 120598, 120628, 120630, 120654, 120656, 120686, 120688, 120712, 120714, 120744, 120746, 120770, 120772, 120779, 122624, 122654, 122661, 122666, 122928, 122989, 123136, 123180, 123191, 123197, 123214, 123214, 123536, 123565, 123584, 123627, 124112, 124139, 124896, 124902, 124904, 124907, 124909, 124910, 124912, 124926, 124928, 125124, 125184, 125251, 125259, 125259, 126464, 126467, 126469, 126495, 126497, 126498, 126500, 126500, 126503, 126503, 126505, 126514, 126516, 126519, 126521, 126521, 126523, 126523, 126530, 126530, 126535, 126535, 126537, 126537, 126539, 126539, 126541, 126543, 126545, 126546, 126548, 126548, 126551, 126551, 126553, 126553, 126555, 126555, 126557, 126557, 126559, 126559, 126561, 126562, 126564, 126564, 126567, 126570, 126572, 126578, 126580, 126583, 126585, 126588, 126590, 126590, 126592, 126601, 126603, 126619, 126625, 126627, 126629, 126633, 126635, 126651, 131072, 173791, 173824, 177977, 177984, 178205, 178208, 183969, 183984, 191456, 191472, 192093, 194560, 195101, 196608, 201546, 201552, 205743];
// dprint-ignore
const unicodeESNextIdentifierPart = [48, 57, 65, 90, 95, 95, 97, 122, 170, 170, 181, 181, 183, 183, 186, 186, 192, 214, 216, 246, 248, 705, 710, 721, 736, 740, 748, 748, 750, 750, 768, 884, 886, 887, 890, 893, 895, 895, 902, 906, 908, 908, 910, 929, 931, 1013, 1015, 1153, 1155, 1159, 1162, 1327, 1329, 1366, 1369, 1369, 1376, 1416, 1425, 1469, 1471, 1471, 1473, 1474, 1476, 1477, 1479, 1479, 1488, 1514, 1519, 1522, 1552, 1562, 1568, 1641, 1646, 1747, 1749, 1756, 1759, 1768, 1770, 1788, 1791, 1791, 1808, 1866, 1869, 1969, 1984, 2037, 2042, 2042, 2045, 2045, 2048, 2093, 2112, 2139, 2144, 2154, 2160, 2183, 2185, 2190, 2200, 2273, 2275, 2403, 2406, 2415, 2417, 2435, 2437, 2444, 2447, 2448, 2451, 2472, 2474, 2480, 2482, 2482, 2486, 2489, 2492, 2500, 2503, 2504, 2507, 2510, 2519, 2519, 2524, 2525, 2527, 2531, 2534, 2545, 2556, 2556, 2558, 2558, 2561, 2563, 2565, 2570, 2575, 2576, 2579, 2600, 2602, 2608, 2610, 2611, 2613, 2614, 2616, 2617, 2620, 2620, 2622, 2626, 2631, 2632, 2635, 2637, 2641, 2641, 2649, 2652, 2654, 2654, 2662, 2677, 2689, 2691, 2693, 2701, 2703, 2705, 2707, 2728, 2730, 2736, 2738, 2739, 2741, 2745, 2748, 2757, 2759, 2761, 2763, 2765, 2768, 2768, 2784, 2787, 2790, 2799, 2809, 2815, 2817, 2819, 2821, 2828, 2831, 2832, 2835, 2856, 2858, 2864, 2866, 2867, 2869, 2873, 2876, 2884, 2887, 2888, 2891, 2893, 2901, 2903, 2908, 2909, 2911, 2915, 2918, 2927, 2929, 2929, 2946, 2947, 2949, 2954, 2958, 2960, 2962, 2965, 2969, 2970, 2972, 2972, 2974, 2975, 2979, 2980, 2984, 2986, 2990, 3001, 3006, 3010, 3014, 3016, 3018, 3021, 3024, 3024, 3031, 3031, 3046, 3055, 3072, 3084, 3086, 3088, 3090, 3112, 3114, 3129, 3132, 3140, 3142, 3144, 3146, 3149, 3157, 3158, 3160, 3162, 3165, 3165, 3168, 3171, 3174, 3183, 3200, 3203, 3205, 3212, 3214, 3216, 3218, 3240, 3242, 3251, 3253, 3257, 3260, 3268, 3270, 3272, 3274, 3277, 3285, 3286, 3293, 3294, 3296, 3299, 3302, 3311, 3313, 3315, 3328, 3340, 3342, 3344, 3346, 3396, 3398, 3400, 3402, 3406, 3412, 3415, 3423, 3427, 3430, 3439, 3450, 3455, 3457, 3459, 3461, 3478, 3482, 3505, 3507, 3515, 3517, 3517, 3520, 3526, 3530, 3530, 3535, 3540, 3542, 3542, 3544, 3551, 3558, 3567, 3570, 3571, 3585, 3642, 3648, 3662, 3664, 3673, 3713, 3714, 3716, 3716, 3718, 3722, 3724, 3747, 3749, 3749, 3751, 3773, 3776, 3780, 3782, 3782, 3784, 3790, 3792, 3801, 3804, 3807, 3840, 3840, 3864, 3865, 3872, 3881, 3893, 3893, 3895, 3895, 3897, 3897, 3902, 3911, 3913, 3948, 3953, 3972, 3974, 3991, 3993, 4028, 4038, 4038, 4096, 4169, 4176, 4253, 4256, 4293, 4295, 4295, 4301, 4301, 4304, 4346, 4348, 4680, 4682, 4685, 4688, 4694, 4696, 4696, 4698, 4701, 4704, 4744, 4746, 4749, 4752, 4784, 4786, 4789, 4792, 4798, 4800, 4800, 4802, 4805, 4808, 4822, 4824, 4880, 4882, 4885, 4888, 4954, 4957, 4959, 4969, 4977, 4992, 5007, 5024, 5109, 5112, 5117, 5121, 5740, 5743, 5759, 5761, 5786, 5792, 5866, 5870, 5880, 5888, 5909, 5919, 5940, 5952, 5971, 5984, 5996, 5998, 6000, 6002, 6003, 6016, 6099, 6103, 6103, 6108, 6109, 6112, 6121, 6155, 6157, 6159, 6169, 6176, 6264, 6272, 6314, 6320, 6389, 6400, 6430, 6432, 6443, 6448, 6459, 6470, 6509, 6512, 6516, 6528, 6571, 6576, 6601, 6608, 6618, 6656, 6683, 6688, 6750, 6752, 6780, 6783, 6793, 6800, 6809, 6823, 6823, 6832, 6845, 6847, 6862, 6912, 6988, 6992, 7001, 7019, 7027, 7040, 7155, 7168, 7223, 7232, 7241, 7245, 7293, 7296, 7304, 7312, 7354, 7357, 7359, 7376, 7378, 7380, 7418, 7424, 7957, 7960, 7965, 7968, 8005, 8008, 8013, 8016, 8023, 8025, 8025, 8027, 8027, 8029, 8029, 8031, 8061, 8064, 8116, 8118, 8124, 8126, 8126, 8130, 8132, 8134, 8140, 8144, 8147, 8150, 8155, 8160, 8172, 8178, 8180, 8182, 8188, 8204, 8205, 8255, 8256, 8276, 8276, 8305, 8305, 8319, 8319, 8336, 8348, 8400, 8412, 8417, 8417, 8421, 8432, 8450, 8450, 8455, 8455, 8458, 8467, 8469, 8469, 8472, 8477, 8484, 8484, 8486, 8486, 8488, 8488, 8490, 8505, 8508, 8511, 8517, 8521, 8526, 8526, 8544, 8584, 11264, 11492, 11499, 11507, 11520, 11557, 11559, 11559, 11565, 11565, 11568, 11623, 11631, 11631, 11647, 11670, 11680, 11686, 11688, 11694, 11696, 11702, 11704, 11710, 11712, 11718, 11720, 11726, 11728, 11734, 11736, 11742, 11744, 11775, 12293, 12295, 12321, 12335, 12337, 12341, 12344, 12348, 12353, 12438, 12441, 12447, 12449, 12543, 12549, 12591, 12593, 12686, 12704, 12735, 12784, 12799, 13312, 19903, 19968, 42124, 42192, 42237, 42240, 42508, 42512, 42539, 42560, 42607, 42612, 42621, 42623, 42737, 42775, 42783, 42786, 42888, 42891, 42954, 42960, 42961, 42963, 42963, 42965, 42969, 42994, 43047, 43052, 43052, 43072, 43123, 43136, 43205, 43216, 43225, 43232, 43255, 43259, 43259, 43261, 43309, 43312, 43347, 43360, 43388, 43392, 43456, 43471, 43481, 43488, 43518, 43520, 43574, 43584, 43597, 43600, 43609, 43616, 43638, 43642, 43714, 43739, 43741, 43744, 43759, 43762, 43766, 43777, 43782, 43785, 43790, 43793, 43798, 43808, 43814, 43816, 43822, 43824, 43866, 43868, 43881, 43888, 44010, 44012, 44013, 44016, 44025, 44032, 55203, 55216, 55238, 55243, 55291, 63744, 64109, 64112, 64217, 64256, 64262, 64275, 64279, 64285, 64296, 64298, 64310, 64312, 64316, 64318, 64318, 64320, 64321, 64323, 64324, 64326, 64433, 64467, 64829, 64848, 64911, 64914, 64967, 65008, 65019, 65024, 65039, 65056, 65071, 65075, 65076, 65101, 65103, 65136, 65140, 65142, 65276, 65296, 65305, 65313, 65338, 65343, 65343, 65345, 65370, 65381, 65470, 65474, 65479, 65482, 65487, 65490, 65495, 65498, 65500, 65536, 65547, 65549, 65574, 65576, 65594, 65596, 65597, 65599, 65613, 65616, 65629, 65664, 65786, 65856, 65908, 66045, 66045, 66176, 66204, 66208, 66256, 66272, 66272, 66304, 66335, 66349, 66378, 66384, 66426, 66432, 66461, 66464, 66499, 66504, 66511, 66513, 66517, 66560, 66717, 66720, 66729, 66736, 66771, 66776, 66811, 66816, 66855, 66864, 66915, 66928, 66938, 66940, 66954, 66956, 66962, 66964, 66965, 66967, 66977, 66979, 66993, 66995, 67001, 67003, 67004, 67072, 67382, 67392, 67413, 67424, 67431, 67456, 67461, 67463, 67504, 67506, 67514, 67584, 67589, 67592, 67592, 67594, 67637, 67639, 67640, 67644, 67644, 67647, 67669, 67680, 67702, 67712, 67742, 67808, 67826, 67828, 67829, 67840, 67861, 67872, 67897, 67968, 68023, 68030, 68031, 68096, 68099, 68101, 68102, 68108, 68115, 68117, 68119, 68121, 68149, 68152, 68154, 68159, 68159, 68192, 68220, 68224, 68252, 68288, 68295, 68297, 68326, 68352, 68405, 68416, 68437, 68448, 68466, 68480, 68497, 68608, 68680, 68736, 68786, 68800, 68850, 68864, 68903, 68912, 68921, 69248, 69289, 69291, 69292, 69296, 69297, 69373, 69404, 69415, 69415, 69424, 69456, 69488, 69509, 69552, 69572, 69600, 69622, 69632, 69702, 69734, 69749, 69759, 69818, 69826, 69826, 69840, 69864, 69872, 69881, 69888, 69940, 69942, 69951, 69956, 69959, 69968, 70003, 70006, 70006, 70016, 70084, 70089, 70092, 70094, 70106, 70108, 70108, 70144, 70161, 70163, 70199, 70206, 70209, 70272, 70278, 70280, 70280, 70282, 70285, 70287, 70301, 70303, 70312, 70320, 70378, 70384, 70393, 70400, 70403, 70405, 70412, 70415, 70416, 70419, 70440, 70442, 70448, 70450, 70451, 70453, 70457, 70459, 70468, 70471, 70472, 70475, 70477, 70480, 70480, 70487, 70487, 70493, 70499, 70502, 70508, 70512, 70516, 70656, 70730, 70736, 70745, 70750, 70753, 70784, 70853, 70855, 70855, 70864, 70873, 71040, 71093, 71096, 71104, 71128, 71133, 71168, 71232, 71236, 71236, 71248, 71257, 71296, 71352, 71360, 71369, 71424, 71450, 71453, 71467, 71472, 71481, 71488, 71494, 71680, 71738, 71840, 71913, 71935, 71942, 71945, 71945, 71948, 71955, 71957, 71958, 71960, 71989, 71991, 71992, 71995, 72003, 72016, 72025, 72096, 72103, 72106, 72151, 72154, 72161, 72163, 72164, 72192, 72254, 72263, 72263, 72272, 72345, 72349, 72349, 72368, 72440, 72704, 72712, 72714, 72758, 72760, 72768, 72784, 72793, 72818, 72847, 72850, 72871, 72873, 72886, 72960, 72966, 72968, 72969, 72971, 73014, 73018, 73018, 73020, 73021, 73023, 73031, 73040, 73049, 73056, 73061, 73063, 73064, 73066, 73102, 73104, 73105, 73107, 73112, 73120, 73129, 73440, 73462, 73472, 73488, 73490, 73530, 73534, 73538, 73552, 73561, 73648, 73648, 73728, 74649, 74752, 74862, 74880, 75075, 77712, 77808, 77824, 78895, 78912, 78933, 82944, 83526, 92160, 92728, 92736, 92766, 92768, 92777, 92784, 92862, 92864, 92873, 92880, 92909, 92912, 92916, 92928, 92982, 92992, 92995, 93008, 93017, 93027, 93047, 93053, 93071, 93760, 93823, 93952, 94026, 94031, 94087, 94095, 94111, 94176, 94177, 94179, 94180, 94192, 94193, 94208, 100343, 100352, 101589, 101632, 101640, 110576, 110579, 110581, 110587, 110589, 110590, 110592, 110882, 110898, 110898, 110928, 110930, 110933, 110933, 110948, 110951, 110960, 111355, 113664, 113770, 113776, 113788, 113792, 113800, 113808, 113817, 113821, 113822, 118528, 118573, 118576, 118598, 119141, 119145, 119149, 119154, 119163, 119170, 119173, 119179, 119210, 119213, 119362, 119364, 119808, 119892, 119894, 119964, 119966, 119967, 119970, 119970, 119973, 119974, 119977, 119980, 119982, 119993, 119995, 119995, 119997, 120003, 120005, 120069, 120071, 120074, 120077, 120084, 120086, 120092, 120094, 120121, 120123, 120126, 120128, 120132, 120134, 120134, 120138, 120144, 120146, 120485, 120488, 120512, 120514, 120538, 120540, 120570, 120572, 120596, 120598, 120628, 120630, 120654, 120656, 120686, 120688, 120712, 120714, 120744, 120746, 120770, 120772, 120779, 120782, 120831, 121344, 121398, 121403, 121452, 121461, 121461, 121476, 121476, 121499, 121503, 121505, 121519, 122624, 122654, 122661, 122666, 122880, 122886, 122888, 122904, 122907, 122913, 122915, 122916, 122918, 122922, 122928, 122989, 123023, 123023, 123136, 123180, 123184, 123197, 123200, 123209, 123214, 123214, 123536, 123566, 123584, 123641, 124112, 124153, 124896, 124902, 124904, 124907, 124909, 124910, 124912, 124926, 124928, 125124, 125136, 125142, 125184, 125259, 125264, 125273, 126464, 126467, 126469, 126495, 126497, 126498, 126500, 126500, 126503, 126503, 126505, 126514, 126516, 126519, 126521, 126521, 126523, 126523, 126530, 126530, 126535, 126535, 126537, 126537, 126539, 126539, 126541, 126543, 126545, 126546, 126548, 126548, 126551, 126551, 126553, 126553, 126555, 126555, 126557, 126557, 126559, 126559, 126561, 126562, 126564, 126564, 126567, 126570, 126572, 126578, 126580, 126583, 126585, 126588, 126590, 126590, 126592, 126601, 126603, 126619, 126625, 126627, 126629, 126633, 126635, 126651, 130032, 130041, 131072, 173791, 173824, 177977, 177984, 178205, 178208, 183969, 183984, 191456, 191472, 192093, 194560, 195101, 196608, 201546, 201552, 205743, 917760, 917999];

/**
 * Test for whether a single line comment with leading whitespace trimmed's text contains a directive.
 */
const commentDirectiveRegExSingleLine = /^\/\/\/?\s*@(ts-expect-error|ts-ignore)/;

/**
 * Test for whether a multi-line comment with leading whitespace trimmed's last line contains a directive.
 */
const commentDirectiveRegExMultiLine = /^(?:\/|\*)*\s*@(ts-expect-error|ts-ignore)/;

const jsDocSeeOrLink = /@(?:see|link)/i;

function lookupInUnicodeMap(code: number, map: readonly number[]): boolean {
    // Bail out quickly if it couldn't possibly be in the map.
    if (code < map[0]) {
        return false;
    }

    // Perform binary search in one of the Unicode range maps
    let lo = 0;
    let hi: number = map.length;
    let mid: number;

    while (lo + 1 < hi) {
        mid = lo + (hi - lo) / 2;
        // mid has to be even to catch a range's beginning
        mid -= mid % 2;
        if (map[mid] <= code && code <= map[mid + 1]) {
            return true;
        }

        if (code < map[mid]) {
            hi = mid;
        }
        else {
            lo = mid + 2;
        }
    }

    return false;
}

/** @internal */
export function isUnicodeIdentifierStart(code: number, languageVersion: ScriptTarget | undefined): boolean {
    return languageVersion! >= ScriptTarget.ES2015 ?
        lookupInUnicodeMap(code, unicodeESNextIdentifierStart) :
        lookupInUnicodeMap(code, unicodeES5IdentifierStart);
}

function isUnicodeIdentifierPart(code: number, languageVersion: ScriptTarget | undefined) {
    return languageVersion! >= ScriptTarget.ES2015 ?
        lookupInUnicodeMap(code, unicodeESNextIdentifierPart) :
        lookupInUnicodeMap(code, unicodeES5IdentifierPart);
}

function makeReverseMap<T>(source: Map<T, number>): T[] {
    const result: T[] = [];
    source.forEach((value, name) => {
        result[value] = name;
    });
    return result;
}

const tokenStrings = makeReverseMap(textToToken);

/** @internal */
export function tokenToString(t: PunctuationOrKeywordSyntaxKind): string;
export function tokenToString(t: SyntaxKind): string | undefined;
export function tokenToString(t: SyntaxKind): string | undefined {
    return tokenStrings[t];
}

/** @internal */
export function stringToToken(s: string): SyntaxKind | undefined {
    return textToToken.get(s);
}

const regExpFlagCharCodes = makeReverseMap(charCodeToRegExpFlag);

/** @internal @knipignore */
export function regularExpressionFlagToCharacterCode(f: RegularExpressionFlags): CharacterCodes | undefined {
    return regExpFlagCharCodes[f];
}

/** @internal @knipignore */
export function characterCodeToRegularExpressionFlag(ch: CharacterCodes): RegularExpressionFlags | undefined {
    return charCodeToRegExpFlag.get(ch);
}

/** @internal */
export function computeLineStarts(text: string): number[] {
    const result: number[] = [];
    let pos = 0;
    let lineStart = 0;
    while (pos < text.length) {
        const ch = text.charCodeAt(pos);
        pos++;
        switch (ch) {
            case CharacterCodes.carriageReturn:
                if (text.charCodeAt(pos) === CharacterCodes.lineFeed) {
                    pos++;
                }
            // falls through
            case CharacterCodes.lineFeed:
                result.push(lineStart);
                lineStart = pos;
                break;
            default:
                if (ch > CharacterCodes.maxAsciiCharacter && isLineBreak(ch)) {
                    result.push(lineStart);
                    lineStart = pos;
                }
                break;
        }
    }
    result.push(lineStart);
    return result;
}

export function getPositionOfLineAndCharacter(sourceFile: SourceFileLike, line: number, character: number): number;
/** @internal */
export function getPositionOfLineAndCharacter(sourceFile: SourceFileLike, line: number, character: number, allowEdits?: true): number; // eslint-disable-line @typescript-eslint/unified-signatures
export function getPositionOfLineAndCharacter(sourceFile: SourceFileLike, line: number, character: number, allowEdits?: true): number {
    return sourceFile.getPositionOfLineAndCharacter ?
        sourceFile.getPositionOfLineAndCharacter(line, character, allowEdits) :
        computePositionOfLineAndCharacter(getLineStarts(sourceFile), line, character, sourceFile.text, allowEdits);
}

/** @internal */
export function computePositionOfLineAndCharacter(lineStarts: readonly number[], line: number, character: number, debugText?: string, allowEdits?: true): number {
    if (line < 0 || line >= lineStarts.length) {
        if (allowEdits) {
            // Clamp line to nearest allowable value
            line = line < 0 ? 0 : line >= lineStarts.length ? lineStarts.length - 1 : line;
        }
        else {
            Debug.fail(`Bad line number. Line: ${line}, lineStarts.length: ${lineStarts.length} , line map is correct? ${debugText !== undefined ? arrayIsEqualTo(lineStarts, computeLineStarts(debugText)) : "unknown"}`);
        }
    }

    const res = lineStarts[line] + character;
    if (allowEdits) {
        // Clamp to nearest allowable values to allow the underlying to be edited without crashing (accuracy is lost, instead)
        // TODO: Somehow track edits between file as it was during the creation of sourcemap we have and the current file and
        // apply them to the computed position to improve accuracy
        return res > lineStarts[line + 1] ? lineStarts[line + 1] : typeof debugText === "string" && res > debugText.length ? debugText.length : res;
    }
    if (line < lineStarts.length - 1) {
        Debug.assert(res < lineStarts[line + 1]);
    }
    else if (debugText !== undefined) {
        Debug.assert(res <= debugText.length); // Allow single character overflow for trailing newline
    }
    return res;
}

/** @internal */
export function getLineStarts(sourceFile: SourceFileLike): readonly number[] {
    return sourceFile.lineMap || (sourceFile.lineMap = computeLineStarts(sourceFile.text));
}

/** @internal */
export function computeLineAndCharacterOfPosition(lineStarts: readonly number[], position: number): LineAndCharacter {
    const lineNumber = computeLineOfPosition(lineStarts, position);
    return {
        line: lineNumber,
        character: position - lineStarts[lineNumber],
    };
}

/**
 * @internal
 * We assume the first line starts at position 0 and 'position' is non-negative.
 */
export function computeLineOfPosition(lineStarts: readonly number[], position: number, lowerBound?: number): number {
    let lineNumber = binarySearch(lineStarts, position, identity, compareValues, lowerBound);
    if (lineNumber < 0) {
        // If the actual position was not found,
        // the binary search returns the 2's-complement of the next line start
        // e.g. if the line starts at [5, 10, 23, 80] and the position requested was 20
        // then the search will return -2.
        //
        // We want the index of the previous line start, so we subtract 1.
        // Review 2's-complement if this is confusing.
        lineNumber = ~lineNumber - 1;
        Debug.assert(lineNumber !== -1, "position cannot precede the beginning of the file");
    }
    return lineNumber;
}

/** @internal */
export function getLinesBetweenPositions(sourceFile: SourceFileLike, pos1: number, pos2: number): number {
    if (pos1 === pos2) return 0;
    const lineStarts = getLineStarts(sourceFile);
    const lower = Math.min(pos1, pos2);
    const isNegative = lower === pos2;
    const upper = isNegative ? pos1 : pos2;
    const lowerLine = computeLineOfPosition(lineStarts, lower);
    const upperLine = computeLineOfPosition(lineStarts, upper, lowerLine);
    return isNegative ? lowerLine - upperLine : upperLine - lowerLine;
}

export function getLineAndCharacterOfPosition(sourceFile: SourceFileLike, position: number): LineAndCharacter {
    return computeLineAndCharacterOfPosition(getLineStarts(sourceFile), position);
}

export function isWhiteSpaceLike(ch: number): boolean {
    return isWhiteSpaceSingleLine(ch) || isLineBreak(ch);
}

/** Does not include line breaks. For that, see isWhiteSpaceLike. */
export function isWhiteSpaceSingleLine(ch: number): boolean {
    // Note: nextLine is in the Zs space, and should be considered to be a whitespace.
    // It is explicitly not a line-break as it isn't in the exact set specified by EcmaScript.
    return ch === CharacterCodes.space ||
        ch === CharacterCodes.tab ||
        ch === CharacterCodes.verticalTab ||
        ch === CharacterCodes.formFeed ||
        ch === CharacterCodes.nonBreakingSpace ||
        ch === CharacterCodes.nextLine ||
        ch === CharacterCodes.ogham ||
        ch >= CharacterCodes.enQuad && ch <= CharacterCodes.zeroWidthSpace ||
        ch === CharacterCodes.narrowNoBreakSpace ||
        ch === CharacterCodes.mathematicalSpace ||
        ch === CharacterCodes.ideographicSpace ||
        ch === CharacterCodes.byteOrderMark;
}

export function isLineBreak(ch: number): boolean {
    // ES5 7.3:
    // The ECMAScript line terminator characters are listed in Table 3.
    //     Table 3: Line Terminator Characters
    //     Code Unit Value     Name                    Formal Name
    //     \u000A              Line Feed               <LF>
    //     \u000D              Carriage Return         <CR>
    //     \u2028              Line separator          <LS>
    //     \u2029              Paragraph separator     <PS>
    // Only the characters in Table 3 are treated as line terminators. Other new line or line
    // breaking characters are treated as white space but not as line terminators.

    return ch === CharacterCodes.lineFeed ||
        ch === CharacterCodes.carriageReturn ||
        ch === CharacterCodes.lineSeparator ||
        ch === CharacterCodes.paragraphSeparator;
}

function isDigit(ch: number): boolean {
    return ch >= CharacterCodes._0 && ch <= CharacterCodes._9;
}

function isHexDigit(ch: number): boolean {
    return isDigit(ch) || ch >= CharacterCodes.A && ch <= CharacterCodes.F || ch >= CharacterCodes.a && ch <= CharacterCodes.f;
}

function isASCIILetter(ch: number): boolean {
    return ch >= CharacterCodes.A && ch <= CharacterCodes.Z || ch >= CharacterCodes.a && ch <= CharacterCodes.z;
}

// Section 6.1.4
function isWordCharacter(ch: number): boolean {
    return isASCIILetter(ch) || isDigit(ch) || ch === CharacterCodes._;
}

function isOctalDigit(ch: number): boolean {
    return ch >= CharacterCodes._0 && ch <= CharacterCodes._7;
}

export function couldStartTrivia(text: string, pos: number): boolean {
    // Keep in sync with skipTrivia
    const ch = text.charCodeAt(pos);
    switch (ch) {
        case CharacterCodes.carriageReturn:
        case CharacterCodes.lineFeed:
        case CharacterCodes.tab:
        case CharacterCodes.verticalTab:
        case CharacterCodes.formFeed:
        case CharacterCodes.space:
        case CharacterCodes.slash:
        // starts of normal trivia
        // falls through
        case CharacterCodes.lessThan:
        case CharacterCodes.bar:
        case CharacterCodes.equals:
        case CharacterCodes.greaterThan:
            // Starts of conflict marker trivia
            return true;
        case CharacterCodes.hash:
            // Only if its the beginning can we have #! trivia
            return pos === 0;
        default:
            return ch > CharacterCodes.maxAsciiCharacter;
    }
}

/** @internal */
export function skipTrivia(text: string, pos: number, stopAfterLineBreak?: boolean, stopAtComments?: boolean, inJSDoc?: boolean): number {
    if (positionIsSynthesized(pos)) {
        return pos;
    }

    let canConsumeStar = false;
    // Keep in sync with couldStartTrivia
    while (true) {
        const ch = text.charCodeAt(pos);
        switch (ch) {
            case CharacterCodes.carriageReturn:
                if (text.charCodeAt(pos + 1) === CharacterCodes.lineFeed) {
                    pos++;
                }
            // falls through
            case CharacterCodes.lineFeed:
                pos++;
                if (stopAfterLineBreak) {
                    return pos;
                }
                canConsumeStar = !!inJSDoc;
                continue;
            case CharacterCodes.tab:
            case CharacterCodes.verticalTab:
            case CharacterCodes.formFeed:
            case CharacterCodes.space:
                pos++;
                continue;
            case CharacterCodes.slash:
                if (stopAtComments) {
                    break;
                }
                if (text.charCodeAt(pos + 1) === CharacterCodes.slash) {
                    pos += 2;
                    while (pos < text.length) {
                        if (isLineBreak(text.charCodeAt(pos))) {
                            break;
                        }
                        pos++;
                    }
                    canConsumeStar = false;
                    continue;
                }
                if (text.charCodeAt(pos + 1) === CharacterCodes.asterisk) {
                    pos += 2;
                    while (pos < text.length) {
                        if (text.charCodeAt(pos) === CharacterCodes.asterisk && text.charCodeAt(pos + 1) === CharacterCodes.slash) {
                            pos += 2;
                            break;
                        }
                        pos++;
                    }
                    canConsumeStar = false;
                    continue;
                }
                break;

            case CharacterCodes.lessThan:
            case CharacterCodes.bar:
            case CharacterCodes.equals:
            case CharacterCodes.greaterThan:
                if (isConflictMarkerTrivia(text, pos)) {
                    pos = scanConflictMarkerTrivia(text, pos);
                    canConsumeStar = false;
                    continue;
                }
                break;

            case CharacterCodes.hash:
                if (pos === 0 && isShebangTrivia(text, pos)) {
                    pos = scanShebangTrivia(text, pos);
                    canConsumeStar = false;
                    continue;
                }
                break;

            case CharacterCodes.asterisk:
                if (canConsumeStar) {
                    pos++;
                    canConsumeStar = false;
                    continue;
                }
                break;

            default:
                if (ch > CharacterCodes.maxAsciiCharacter && (isWhiteSpaceLike(ch))) {
                    pos++;
                    continue;
                }
                break;
        }
        return pos;
    }
}

// All conflict markers consist of the same character repeated seven times.  If it is
// a <<<<<<< or >>>>>>> marker then it is also followed by a space.
const mergeConflictMarkerLength = "<<<<<<<".length;

function isConflictMarkerTrivia(text: string, pos: number) {
    Debug.assert(pos >= 0);

    // Conflict markers must be at the start of a line.
    if (pos === 0 || isLineBreak(text.charCodeAt(pos - 1))) {
        const ch = text.charCodeAt(pos);

        if ((pos + mergeConflictMarkerLength) < text.length) {
            for (let i = 0; i < mergeConflictMarkerLength; i++) {
                if (text.charCodeAt(pos + i) !== ch) {
                    return false;
                }
            }

            return ch === CharacterCodes.equals ||
                text.charCodeAt(pos + mergeConflictMarkerLength) === CharacterCodes.space;
        }
    }

    return false;
}

function scanConflictMarkerTrivia(text: string, pos: number, error?: (diag: DiagnosticMessage, pos?: number, len?: number) => void) {
    if (error) {
        error(Diagnostics.Merge_conflict_marker_encountered, pos, mergeConflictMarkerLength);
    }

    const ch = text.charCodeAt(pos);
    const len = text.length;

    if (ch === CharacterCodes.lessThan || ch === CharacterCodes.greaterThan) {
        while (pos < len && !isLineBreak(text.charCodeAt(pos))) {
            pos++;
        }
    }
    else {
        Debug.assert(ch === CharacterCodes.bar || ch === CharacterCodes.equals);
        // Consume everything from the start of a ||||||| or ======= marker to the start
        // of the next ======= or >>>>>>> marker.
        while (pos < len) {
            const currentChar = text.charCodeAt(pos);
            if ((currentChar === CharacterCodes.equals || currentChar === CharacterCodes.greaterThan) && currentChar !== ch && isConflictMarkerTrivia(text, pos)) {
                break;
            }

            pos++;
        }
    }

    return pos;
}

const shebangTriviaRegex = /^#!.*/;

function isShebangTrivia(text: string, pos: number) {
    // Shebangs check must only be done at the start of the file
    Debug.assert(pos === 0);
    return shebangTriviaRegex.test(text);
}

function scanShebangTrivia(text: string, pos: number) {
    const shebang = shebangTriviaRegex.exec(text)![0];
    pos = pos + shebang.length;
    return pos;
}

/**
 * Invokes a callback for each comment range following the provided position.
 *
 * Single-line comment ranges include the leading double-slash characters but not the ending
 * line break. Multi-line comment ranges include the leading slash-asterisk and trailing
 * asterisk-slash characters.
 *
 * @param reduce If true, accumulates the result of calling the callback in a fashion similar
 *      to reduceLeft. If false, iteration stops when the callback returns a truthy value.
 * @param text The source text to scan.
 * @param pos The position at which to start scanning.
 * @param trailing If false, whitespace is skipped until the first line break and comments
 *      between that location and the next token are returned. If true, comments occurring
 *      between the given position and the next line break are returned.
 * @param cb The callback to execute as each comment range is encountered.
 * @param state A state value to pass to each iteration of the callback.
 * @param initial An initial value to pass when accumulating results (when "reduce" is true).
 * @returns If "reduce" is true, the accumulated value. If "reduce" is false, the first truthy
 *      return value of the callback.
 */
function iterateCommentRanges<T, U>(reduce: boolean, text: string, pos: number, trailing: boolean, cb: (pos: number, end: number, kind: CommentKind, hasTrailingNewLine: boolean, state: T, memo: U | undefined) => U, state: T, initial?: U): U | undefined {
    let pendingPos!: number;
    let pendingEnd!: number;
    let pendingKind!: CommentKind;
    let pendingHasTrailingNewLine!: boolean;
    let hasPendingCommentRange = false;
    let collecting = trailing;
    let accumulator = initial;
    if (pos === 0) {
        collecting = true;
        const shebang = getShebang(text);
        if (shebang) {
            pos = shebang.length;
        }
    }
    scan:
    while (pos >= 0 && pos < text.length) {
        const ch = text.charCodeAt(pos);
        switch (ch) {
            case CharacterCodes.carriageReturn:
                if (text.charCodeAt(pos + 1) === CharacterCodes.lineFeed) {
                    pos++;
                }
            // falls through
            case CharacterCodes.lineFeed:
                pos++;
                if (trailing) {
                    break scan;
                }

                collecting = true;
                if (hasPendingCommentRange) {
                    pendingHasTrailingNewLine = true;
                }

                continue;
            case CharacterCodes.tab:
            case CharacterCodes.verticalTab:
            case CharacterCodes.formFeed:
            case CharacterCodes.space:
                pos++;
                continue;
            case CharacterCodes.slash:
                const nextChar = text.charCodeAt(pos + 1);
                let hasTrailingNewLine = false;
                if (nextChar === CharacterCodes.slash || nextChar === CharacterCodes.asterisk) {
                    const kind = nextChar === CharacterCodes.slash ? SyntaxKind.SingleLineCommentTrivia : SyntaxKind.MultiLineCommentTrivia;
                    const startPos = pos;
                    pos += 2;
                    if (nextChar === CharacterCodes.slash) {
                        while (pos < text.length) {
                            if (isLineBreak(text.charCodeAt(pos))) {
                                hasTrailingNewLine = true;
                                break;
                            }
                            pos++;
                        }
                    }
                    else {
                        while (pos < text.length) {
                            if (text.charCodeAt(pos) === CharacterCodes.asterisk && text.charCodeAt(pos + 1) === CharacterCodes.slash) {
                                pos += 2;
                                break;
                            }
                            pos++;
                        }
                    }

                    if (collecting) {
                        if (hasPendingCommentRange) {
                            accumulator = cb(pendingPos, pendingEnd, pendingKind, pendingHasTrailingNewLine, state, accumulator);
                            if (!reduce && accumulator) {
                                // If we are not reducing and we have a truthy result, return it.
                                return accumulator;
                            }
                        }

                        pendingPos = startPos;
                        pendingEnd = pos;
                        pendingKind = kind;
                        pendingHasTrailingNewLine = hasTrailingNewLine;
                        hasPendingCommentRange = true;
                    }

                    continue;
                }
                break scan;
            default:
                if (ch > CharacterCodes.maxAsciiCharacter && (isWhiteSpaceLike(ch))) {
                    if (hasPendingCommentRange && isLineBreak(ch)) {
                        pendingHasTrailingNewLine = true;
                    }
                    pos++;
                    continue;
                }
                break scan;
        }
    }

    if (hasPendingCommentRange) {
        accumulator = cb(pendingPos, pendingEnd, pendingKind, pendingHasTrailingNewLine, state, accumulator);
    }

    return accumulator;
}

export function forEachLeadingCommentRange<U>(text: string, pos: number, cb: (pos: number, end: number, kind: CommentKind, hasTrailingNewLine: boolean) => U): U | undefined;
export function forEachLeadingCommentRange<T, U>(text: string, pos: number, cb: (pos: number, end: number, kind: CommentKind, hasTrailingNewLine: boolean, state: T) => U, state: T): U | undefined;
export function forEachLeadingCommentRange<T, U>(text: string, pos: number, cb: (pos: number, end: number, kind: CommentKind, hasTrailingNewLine: boolean, state: T) => U, state?: T): U | undefined {
    return iterateCommentRanges(/*reduce*/ false, text, pos, /*trailing*/ false, cb, state!);
}

export function forEachTrailingCommentRange<U>(text: string, pos: number, cb: (pos: number, end: number, kind: CommentKind, hasTrailingNewLine: boolean) => U): U | undefined;
export function forEachTrailingCommentRange<T, U>(text: string, pos: number, cb: (pos: number, end: number, kind: CommentKind, hasTrailingNewLine: boolean, state: T) => U, state: T): U | undefined;
export function forEachTrailingCommentRange<T, U>(text: string, pos: number, cb: (pos: number, end: number, kind: CommentKind, hasTrailingNewLine: boolean, state: T) => U, state?: T): U | undefined {
    return iterateCommentRanges(/*reduce*/ false, text, pos, /*trailing*/ true, cb, state!);
}

export function reduceEachLeadingCommentRange<T, U>(text: string, pos: number, cb: (pos: number, end: number, kind: CommentKind, hasTrailingNewLine: boolean, state: T) => U, state: T, initial: U): U | undefined {
    return iterateCommentRanges(/*reduce*/ true, text, pos, /*trailing*/ false, cb, state, initial);
}

export function reduceEachTrailingCommentRange<T, U>(text: string, pos: number, cb: (pos: number, end: number, kind: CommentKind, hasTrailingNewLine: boolean, state: T) => U, state: T, initial: U): U | undefined {
    return iterateCommentRanges(/*reduce*/ true, text, pos, /*trailing*/ true, cb, state, initial);
}

function appendCommentRange(pos: number, end: number, kind: CommentKind, hasTrailingNewLine: boolean, _state: any, comments: CommentRange[] = []) {
    comments.push({ kind, pos, end, hasTrailingNewLine });
    return comments;
}

export function getLeadingCommentRanges(text: string, pos: number): CommentRange[] | undefined {
    return reduceEachLeadingCommentRange(text, pos, appendCommentRange, /*state*/ undefined, /*initial*/ undefined);
}

export function getTrailingCommentRanges(text: string, pos: number): CommentRange[] | undefined {
    return reduceEachTrailingCommentRange(text, pos, appendCommentRange, /*state*/ undefined, /*initial*/ undefined);
}

/** Optionally, get the shebang */
export function getShebang(text: string): string | undefined {
    const match = shebangTriviaRegex.exec(text);
    if (match) {
        return match[0];
    }
}

export function isIdentifierStart(ch: number, languageVersion: ScriptTarget | undefined): boolean {
    return isASCIILetter(ch) || ch === CharacterCodes.$ || ch === CharacterCodes._ ||
        ch > CharacterCodes.maxAsciiCharacter && isUnicodeIdentifierStart(ch, languageVersion);
}

export function isIdentifierPart(ch: number, languageVersion: ScriptTarget | undefined, identifierVariant?: LanguageVariant): boolean {
    return isWordCharacter(ch) || ch === CharacterCodes.$ ||
        // "-" and ":" are valid in JSX Identifiers
        (identifierVariant === LanguageVariant.JSX ? (ch === CharacterCodes.minus || ch === CharacterCodes.colon) : false) ||
        ch > CharacterCodes.maxAsciiCharacter && isUnicodeIdentifierPart(ch, languageVersion);
}

/** @internal */
export function isIdentifierText(name: string, languageVersion: ScriptTarget | undefined, identifierVariant?: LanguageVariant): boolean {
    let ch = codePointAt(name, 0);
    if (!isIdentifierStart(ch, languageVersion)) {
        return false;
    }

    for (let i = charSize(ch); i < name.length; i += charSize(ch)) {
        if (!isIdentifierPart(ch = codePointAt(name, i), languageVersion, identifierVariant)) {
            return false;
        }
    }

    return true;
}

const enum EscapeSequenceScanningFlags {
    String = 1 << 0,
    ReportErrors = 1 << 1,

    RegularExpression = 1 << 2,
    AnnexB = 1 << 3,
    AnyUnicodeMode = 1 << 4,
    AtomEscape = 1 << 5,

    ReportInvalidEscapeErrors = RegularExpression | ReportErrors,
    AllowExtendedUnicodeEscape = String | AnyUnicodeMode,
}

const enum ClassSetExpressionType {
    Unknown,
    ClassUnion,
    ClassIntersection,
    ClassSubtraction,
}

// Creates a scanner over a (possibly unspecified) range of a piece of text.
export function createScanner(
    languageVersion: ScriptTarget,
    skipTrivia: boolean,
    languageVariant: LanguageVariant = LanguageVariant.Standard,
    textInitial?: string,
    onError?: ErrorCallback,
    start?: number,
    length?: number,
): Scanner {
    // Why var? It avoids TDZ checks in the runtime which can be costly.
    // See: https://github.com/microsoft/TypeScript/issues/52924
    /* eslint-disable no-var */
    var text = textInitial!;

    // Current position (end position of text of current token)
    var pos: number;

    // end of text
    var end: number;

    // Start position of whitespace before current token
    var fullStartPos: number;

    // Start position of text of current token
    var tokenStart: number;

    var token: SyntaxKind;
    var tokenValue!: string;
    var tokenFlags: TokenFlags;

    var regExpFlags: RegularExpressionFlags;
    var regExpCapturingGroups: RegularExpressionPatternUnion[];
    var regExpCapturingGroupSpecifiers: MultiMap<string, RegularExpressionPatternUnion> | undefined;

    var commentDirectives: CommentDirective[] | undefined;
    var skipJsDocLeadingAsterisks = 0;

    var scriptKind = ScriptKind.Unknown;
    var jsDocParsingMode = JSDocParsingMode.ParseAll;

    setText(text, start, length);

    var scanner: Scanner = {
        getTokenFullStart: () => fullStartPos,
        getStartPos: () => fullStartPos,
        getTokenEnd: () => pos,
        getTextPos: () => pos,
        getToken: () => token,
        getTokenStart: () => tokenStart,
        getTokenPos: () => tokenStart,
        getTokenText: () => text.substring(tokenStart, pos),
        getTokenValue: () => tokenValue,
        getRegExpFlags: () => regExpFlags,
        getRegExpCapturingGroups: () => regExpCapturingGroups,
        getRegExpCapturingGroupSpecifiers: () => regExpCapturingGroupSpecifiers,
        hasUnicodeEscape: () => (tokenFlags & TokenFlags.UnicodeEscape) !== 0,
        hasExtendedUnicodeEscape: () => (tokenFlags & TokenFlags.ExtendedUnicodeEscape) !== 0,
        hasPrecedingLineBreak: () => (tokenFlags & TokenFlags.PrecedingLineBreak) !== 0,
        hasPrecedingJSDocComment: () => (tokenFlags & TokenFlags.PrecedingJSDocComment) !== 0,
        hasPrecedingJSDocLeadingAsterisks: () => (tokenFlags & TokenFlags.PrecedingJSDocLeadingAsterisks) !== 0,
        isIdentifier: () => token === SyntaxKind.Identifier || token > SyntaxKind.LastReservedWord,
        isReservedWord: () => token >= SyntaxKind.FirstReservedWord && token <= SyntaxKind.LastReservedWord,
        isUnterminated: () => (tokenFlags & TokenFlags.Unterminated) !== 0,
        getCommentDirectives: () => commentDirectives,
        getNumericLiteralFlags: () => tokenFlags & TokenFlags.NumericLiteralFlags,
        getTokenFlags: () => tokenFlags,
        reScanGreaterToken,
        reScanAsteriskEqualsToken,
        reScanSlashToken,
        reScanTemplateToken,
        reScanTemplateHeadOrNoSubstitutionTemplate,
        scanJsxIdentifier,
        scanJsxAttributeValue,
        reScanJsxAttributeValue,
        reScanJsxToken,
        reScanLessThanToken,
        reScanHashToken,
        reScanQuestionToken,
        reScanInvalidIdentifier,
        scanJsxToken,
        scanJsDocToken,
        scanJSDocCommentTextToken,
        scan,
        getText,
        clearCommentDirectives,
        setText,
        setScriptTarget,
        setLanguageVariant,
        setScriptKind,
        setJSDocParsingMode,
        setOnError,
        resetTokenState,
        setTextPos: resetTokenState,
        setSkipJsDocLeadingAsterisks,
        tryScan,
        lookAhead,
        scanRange,
    };
    /* eslint-enable no-var */

    if (Debug.isDebugging) {
        Object.defineProperty(scanner, "__debugShowCurrentPositionInText", {
            get: () => {
                const text = scanner.getText();
                return text.slice(0, scanner.getTokenFullStart()) + "║" + text.slice(scanner.getTokenFullStart());
            },
        });
    }

    return scanner;

    /**
     * Returns the code point for the character at the given position within `text`. This
     * should only be used when pos is guaranteed to be within the bounds of `text` as this
     * function does not perform bounds checks.
     */
    function codePointUnchecked(pos: number) {
        return codePointAt(text, pos);
    }

    /**
     * Returns the code point for the character at the given position within `text`. If
     * `pos` is outside the bounds set for `text`, `CharacterCodes.EOF` is returned instead.
     */
    function codePointChecked(pos: number) {
        return pos >= 0 && pos < end ? codePointUnchecked(pos) : CharacterCodes.EOF;
    }

    /**
     * Returns the char code for the character at the given position within `text`. This
     * should only be used when pos is guaranteed to be within the bounds of `text` as this
     * function does not perform bounds checks.
     */
    function charCodeUnchecked(pos: number) {
        return text.charCodeAt(pos);
    }

    /**
     * Returns the char code for the character at the given position within `text`. If
     * `pos` is outside the bounds set for `text`, `CharacterCodes.EOF` is returned instead.
     */
    function charCodeChecked(pos: number) {
        return pos >= 0 && pos < end ? charCodeUnchecked(pos) : CharacterCodes.EOF;
    }

    function error(message: DiagnosticMessage): void;
    function error(message: DiagnosticMessage, errPos: number, length: number, arg0?: any): void;
    function error(message: DiagnosticMessage, errPos: number = pos, length?: number, arg0?: any): void {
        if (onError) {
            const oldPos = pos;
            pos = errPos;
            onError(message, length || 0, arg0);
            pos = oldPos;
        }
    }

    function scanNumberFragment(): string {
        let start = pos;
        let allowSeparator = false;
        let isPreviousTokenSeparator = false;
        let result = "";
        while (true) {
            const ch = charCodeUnchecked(pos);
            if (ch === CharacterCodes._) {
                tokenFlags |= TokenFlags.ContainsSeparator;
                if (allowSeparator) {
                    allowSeparator = false;
                    isPreviousTokenSeparator = true;
                    result += text.substring(start, pos);
                }
                else {
                    tokenFlags |= TokenFlags.ContainsInvalidSeparator;
                    if (isPreviousTokenSeparator) {
                        error(Diagnostics.Multiple_consecutive_numeric_separators_are_not_permitted, pos, 1);
                    }
                    else {
                        error(Diagnostics.Numeric_separators_are_not_allowed_here, pos, 1);
                    }
                }
                pos++;
                start = pos;
                continue;
            }
            if (isDigit(ch)) {
                allowSeparator = true;
                isPreviousTokenSeparator = false;
                pos++;
                continue;
            }
            break;
        }
        if (charCodeUnchecked(pos - 1) === CharacterCodes._) {
            tokenFlags |= TokenFlags.ContainsInvalidSeparator;
            error(Diagnostics.Numeric_separators_are_not_allowed_here, pos - 1, 1);
        }
        return result + text.substring(start, pos);
    }

    // Extract from Section 12.9.3
    // NumericLiteral ::=
    //     | DecimalLiteral
    //     | DecimalBigIntegerLiteral
    //     | NonDecimalIntegerLiteral 'n'?
    //     | LegacyOctalIntegerLiteral
    // DecimalBigIntegerLiteral ::=
    //     | '0n'
    //     | [1-9] DecimalDigits? 'n'
    //     | [1-9] '_' DecimalDigits 'n'
    // DecimalLiteral ::=
    //     | DecimalIntegerLiteral '.' DecimalDigits? ExponentPart?
    //     | '.' DecimalDigits ExponentPart?
    //     | DecimalIntegerLiteral ExponentPart?
    // DecimalIntegerLiteral ::=
    //     | '0'
    //     | [1-9] '_'? DecimalDigits
    //     | NonOctalDecimalIntegerLiteral
    // LegacyOctalIntegerLiteral ::= '0' [0-7]+
    // NonOctalDecimalIntegerLiteral ::= '0' [0-7]* [89] [0-9]*
    function scanNumber(): SyntaxKind {
        let start = pos;
        let mainFragment: string;
        if (charCodeUnchecked(pos) === CharacterCodes._0) {
            pos++;
            if (charCodeUnchecked(pos) === CharacterCodes._) {
                tokenFlags |= TokenFlags.ContainsSeparator | TokenFlags.ContainsInvalidSeparator;
                error(Diagnostics.Numeric_separators_are_not_allowed_here, pos, 1);
                // treat it as a normal number literal
                pos--;
                mainFragment = scanNumberFragment();
            }
            // Separators are not allowed in the below cases
            else if (!scanDigits()) {
                // NonOctalDecimalIntegerLiteral, emit error later
                // Separators in decimal and exponent parts are still allowed according to the spec
                tokenFlags |= TokenFlags.ContainsLeadingZero;
                mainFragment = "" + +tokenValue;
            }
            else if (!tokenValue) {
                // a single zero
                mainFragment = "0";
            }
            else {
                // LegacyOctalIntegerLiteral
                tokenValue = "" + parseInt(tokenValue, 8);
                tokenFlags |= TokenFlags.Octal;
                const withMinus = token === SyntaxKind.MinusToken;
                const literal = (withMinus ? "-" : "") + "0o" + (+tokenValue).toString(8);
                if (withMinus) start--;
                error(Diagnostics.Octal_literals_are_not_allowed_Use_the_syntax_0, start, pos - start, literal);
                return SyntaxKind.NumericLiteral;
            }
        }
        else {
            mainFragment = scanNumberFragment();
        }
        let decimalFragment: string | undefined;
        let scientificFragment: string | undefined;
        if (charCodeUnchecked(pos) === CharacterCodes.dot) {
            pos++;
            decimalFragment = scanNumberFragment();
        }
        let end = pos;
        if (charCodeUnchecked(pos) === CharacterCodes.E || charCodeUnchecked(pos) === CharacterCodes.e) {
            pos++;
            tokenFlags |= TokenFlags.Scientific;
            if (charCodeUnchecked(pos) === CharacterCodes.plus || charCodeUnchecked(pos) === CharacterCodes.minus) pos++;
            const preNumericPart = pos;
            const finalFragment = scanNumberFragment();
            if (!finalFragment) {
                error(Diagnostics.Digit_expected);
            }
            else {
                scientificFragment = text.substring(end, preNumericPart) + finalFragment;
                end = pos;
            }
        }
        let result: string;
        if (tokenFlags & TokenFlags.ContainsSeparator) {
            result = mainFragment;
            if (decimalFragment) {
                result += "." + decimalFragment;
            }
            if (scientificFragment) {
                result += scientificFragment;
            }
        }
        else {
            result = text.substring(start, end); // No need to use all the fragments; no _ removal needed
        }

        if (tokenFlags & TokenFlags.ContainsLeadingZero) {
            error(Diagnostics.Decimals_with_leading_zeros_are_not_allowed, start, end - start);
            // if a literal has a leading zero, it must not be bigint
            tokenValue = "" + +result;
            return SyntaxKind.NumericLiteral;
        }

        if (decimalFragment !== undefined || tokenFlags & TokenFlags.Scientific) {
            checkForIdentifierStartAfterNumericLiteral(start, decimalFragment === undefined && !!(tokenFlags & TokenFlags.Scientific));
            // if value is not an integer, it can be safely coerced to a number
            tokenValue = "" + +result;
            return SyntaxKind.NumericLiteral;
        }
        else {
            tokenValue = result;
            const type = checkBigIntSuffix(); // if value is an integer, check whether it is a bigint
            checkForIdentifierStartAfterNumericLiteral(start);
            return type;
        }
    }

    function checkForIdentifierStartAfterNumericLiteral(numericStart: number, isScientific?: boolean) {
        if (!isIdentifierStart(codePointUnchecked(pos), languageVersion)) {
            return;
        }

        const identifierStart = pos;
        const { length } = scanIdentifierParts();

        if (length === 1 && text[identifierStart] === "n") {
            if (isScientific) {
                error(Diagnostics.A_bigint_literal_cannot_use_exponential_notation, numericStart, identifierStart - numericStart + 1);
            }
            else {
                error(Diagnostics.A_bigint_literal_must_be_an_integer, numericStart, identifierStart - numericStart + 1);
            }
        }
        else {
            error(Diagnostics.An_identifier_or_keyword_cannot_immediately_follow_a_numeric_literal, identifierStart, length);
            pos = identifierStart;
        }
    }

    function scanDigits(): boolean {
        const start = pos;
        let isOctal = true;
        while (isDigit(charCodeChecked(pos))) {
            if (!isOctalDigit(charCodeUnchecked(pos))) {
                isOctal = false;
            }
            pos++;
        }
        tokenValue = text.substring(start, pos);
        return isOctal;
    }

    /**
     * Scans the given number of hexadecimal digits in the text,
     * returning -1 if the given number is unavailable.
     */
    function scanExactNumberOfHexDigits(count: number, canHaveSeparators: boolean): number {
        const valueString = scanHexDigits(/*minCount*/ count, /*scanAsManyAsPossible*/ false, canHaveSeparators);
        return valueString ? parseInt(valueString, 16) : -1;
    }

    /**
     * Scans as many hexadecimal digits as are available in the text,
     * returning "" if the given number of digits was unavailable.
     */
    function scanMinimumNumberOfHexDigits(count: number, canHaveSeparators: boolean): string {
        return scanHexDigits(/*minCount*/ count, /*scanAsManyAsPossible*/ true, canHaveSeparators);
    }

    function scanHexDigits(minCount: number, scanAsManyAsPossible: boolean, canHaveSeparators: boolean): string {
        let valueChars: number[] = [];
        let allowSeparator = false;
        let isPreviousTokenSeparator = false;
        while (valueChars.length < minCount || scanAsManyAsPossible) {
            let ch = charCodeUnchecked(pos);
            if (canHaveSeparators && ch === CharacterCodes._) {
                tokenFlags |= TokenFlags.ContainsSeparator;
                if (allowSeparator) {
                    allowSeparator = false;
                    isPreviousTokenSeparator = true;
                }
                else if (isPreviousTokenSeparator) {
                    error(Diagnostics.Multiple_consecutive_numeric_separators_are_not_permitted, pos, 1);
                }
                else {
                    error(Diagnostics.Numeric_separators_are_not_allowed_here, pos, 1);
                }
                pos++;
                continue;
            }
            allowSeparator = canHaveSeparators;
            if (ch >= CharacterCodes.A && ch <= CharacterCodes.F) {
                ch += CharacterCodes.a - CharacterCodes.A; // standardize hex literals to lowercase
            }
            else if (
                !((ch >= CharacterCodes._0 && ch <= CharacterCodes._9) ||
                    (ch >= CharacterCodes.a && ch <= CharacterCodes.f))
            ) {
                break;
            }
            valueChars.push(ch);
            pos++;
            isPreviousTokenSeparator = false;
        }
        if (valueChars.length < minCount) {
            valueChars = [];
        }
        if (charCodeUnchecked(pos - 1) === CharacterCodes._) {
            error(Diagnostics.Numeric_separators_are_not_allowed_here, pos - 1, 1);
        }
        return String.fromCharCode(...valueChars);
    }

    function scanString(jsxAttributeString = false): string {
        const quote = charCodeUnchecked(pos);
        pos++;
        let result = "";
        let start = pos;
        while (true) {
            if (pos >= end) {
                result += text.substring(start, pos);
                tokenFlags |= TokenFlags.Unterminated;
                error(Diagnostics.Unterminated_string_literal);
                break;
            }
            const ch = charCodeUnchecked(pos);
            if (ch === quote) {
                result += text.substring(start, pos);
                pos++;
                break;
            }
            if (ch === CharacterCodes.backslash && !jsxAttributeString) {
                result += text.substring(start, pos);
                result += scanEscapeSequence(EscapeSequenceScanningFlags.String | EscapeSequenceScanningFlags.ReportErrors);
                start = pos;
                continue;
            }

            if ((ch === CharacterCodes.lineFeed || ch === CharacterCodes.carriageReturn) && !jsxAttributeString) {
                result += text.substring(start, pos);
                tokenFlags |= TokenFlags.Unterminated;
                error(Diagnostics.Unterminated_string_literal);
                break;
            }
            pos++;
        }
        return result;
    }

    /**
     * Sets the current 'tokenValue' and returns a NoSubstitutionTemplateLiteral or
     * a literal component of a TemplateExpression.
     */
    function scanTemplateAndSetTokenValue(shouldEmitInvalidEscapeError: boolean): SyntaxKind {
        const startedWithBacktick = charCodeUnchecked(pos) === CharacterCodes.backtick;

        pos++;
        let start = pos;
        let contents = "";
        let resultingToken: SyntaxKind;

        while (true) {
            if (pos >= end) {
                contents += text.substring(start, pos);
                tokenFlags |= TokenFlags.Unterminated;
                error(Diagnostics.Unterminated_template_literal);
                resultingToken = startedWithBacktick ? SyntaxKind.NoSubstitutionTemplateLiteral : SyntaxKind.TemplateTail;
                break;
            }

            const currChar = charCodeUnchecked(pos);

            // '`'
            if (currChar === CharacterCodes.backtick) {
                contents += text.substring(start, pos);
                pos++;
                resultingToken = startedWithBacktick ? SyntaxKind.NoSubstitutionTemplateLiteral : SyntaxKind.TemplateTail;
                break;
            }

            // '${'
            if (currChar === CharacterCodes.$ && pos + 1 < end && charCodeUnchecked(pos + 1) === CharacterCodes.openBrace) {
                contents += text.substring(start, pos);
                pos += 2;
                resultingToken = startedWithBacktick ? SyntaxKind.TemplateHead : SyntaxKind.TemplateMiddle;
                break;
            }

            // Escape character
            if (currChar === CharacterCodes.backslash) {
                contents += text.substring(start, pos);
                contents += scanEscapeSequence(EscapeSequenceScanningFlags.String | (shouldEmitInvalidEscapeError ? EscapeSequenceScanningFlags.ReportErrors : 0));
                start = pos;
                continue;
            }

            // Speculated ECMAScript 6 Spec 11.8.6.1:
            // <CR><LF> and <CR> LineTerminatorSequences are normalized to <LF> for Template Values
            if (currChar === CharacterCodes.carriageReturn) {
                contents += text.substring(start, pos);
                pos++;

                if (pos < end && charCodeUnchecked(pos) === CharacterCodes.lineFeed) {
                    pos++;
                }

                contents += "\n";
                start = pos;
                continue;
            }

            pos++;
        }

        Debug.assert(resultingToken !== undefined);

        tokenValue = contents;
        return resultingToken;
    }

    // Extract from Section A.1
    // EscapeSequence ::=
    //     | CharacterEscapeSequence
    //     | 0 (?![0-9])
    //     | LegacyOctalEscapeSequence
    //     | NonOctalDecimalEscapeSequence
    //     | HexEscapeSequence
    //     | UnicodeEscapeSequence
    // LegacyOctalEscapeSequence ::=
    //     | '0' (?=[89])
    //     | [1-7] (?![0-7])
    //     | [0-3] [0-7] [0-7]?
    //     | [4-7] [0-7]
    // NonOctalDecimalEscapeSequence ::= [89]
    function scanEscapeSequence(flags: EscapeSequenceScanningFlags): string {
        const start = pos;
        pos++;
        if (pos >= end) {
            error(Diagnostics.Unexpected_end_of_text);
            return "";
        }
        const ch = charCodeUnchecked(pos);
        pos++;
        switch (ch) {
            case CharacterCodes._0:
                // Although '0' preceding any digit is treated as LegacyOctalEscapeSequence,
                // '\08' should separately be interpreted as '\0' + '8'.
                if (pos >= end || !isDigit(charCodeUnchecked(pos))) {
                    return "\0";
                }
            // '\01', '\011'
            // falls through
            case CharacterCodes._1:
            case CharacterCodes._2:
            case CharacterCodes._3:
                // '\1', '\17', '\177'
                if (pos < end && isOctalDigit(charCodeUnchecked(pos))) {
                    pos++;
                }
            // '\17', '\177'
            // falls through
            case CharacterCodes._4:
            case CharacterCodes._5:
            case CharacterCodes._6:
            case CharacterCodes._7:
                // '\4', '\47' but not '\477'
                if (pos < end && isOctalDigit(charCodeUnchecked(pos))) {
                    pos++;
                }
                // '\47'
                tokenFlags |= TokenFlags.ContainsInvalidEscape;
                if (flags & EscapeSequenceScanningFlags.ReportInvalidEscapeErrors) {
                    const code = parseInt(text.substring(start + 1, pos), 8);
                    if (flags & EscapeSequenceScanningFlags.RegularExpression && !(flags & EscapeSequenceScanningFlags.AtomEscape) && ch !== CharacterCodes._0) {
                        error(Diagnostics.Octal_escape_sequences_and_backreferences_are_not_allowed_in_a_character_class_If_this_was_intended_as_an_escape_sequence_use_the_syntax_0_instead, start, pos - start, "\\x" + code.toString(16).padStart(2, "0"));
                    }
                    else {
                        error(Diagnostics.Octal_escape_sequences_are_not_allowed_Use_the_syntax_0, start, pos - start, "\\x" + code.toString(16).padStart(2, "0"));
                    }
                    return String.fromCharCode(code);
                }
                return text.substring(start, pos);
            case CharacterCodes._8:
            case CharacterCodes._9:
                // the invalid '\8' and '\9'
                tokenFlags |= TokenFlags.ContainsInvalidEscape;
                if (flags & EscapeSequenceScanningFlags.ReportInvalidEscapeErrors) {
                    if (flags & EscapeSequenceScanningFlags.RegularExpression && !(flags & EscapeSequenceScanningFlags.AtomEscape)) {
                        error(Diagnostics.Decimal_escape_sequences_and_backreferences_are_not_allowed_in_a_character_class, start, pos - start);
                    }
                    else {
                        error(Diagnostics.Escape_sequence_0_is_not_allowed, start, pos - start, text.substring(start, pos));
                    }
                    return String.fromCharCode(ch);
                }
                return text.substring(start, pos);
            case CharacterCodes.b:
                return "\b";
            case CharacterCodes.t:
                return "\t";
            case CharacterCodes.n:
                return "\n";
            case CharacterCodes.v:
                return "\v";
            case CharacterCodes.f:
                return "\f";
            case CharacterCodes.r:
                return "\r";
            case CharacterCodes.singleQuote:
                return "'";
            case CharacterCodes.doubleQuote:
                return '"';
            case CharacterCodes.u:
                if (pos < end && charCodeUnchecked(pos) === CharacterCodes.openBrace) {
                    // '\u{DDDDDD}'
                    pos -= 2;
                    const result = scanExtendedUnicodeEscape(!!(flags & EscapeSequenceScanningFlags.ReportInvalidEscapeErrors));
                    if (!(flags & EscapeSequenceScanningFlags.AllowExtendedUnicodeEscape)) {
                        tokenFlags |= TokenFlags.ContainsInvalidEscape;
                        if (flags & EscapeSequenceScanningFlags.ReportInvalidEscapeErrors) {
                            error(Diagnostics.Unicode_escape_sequences_are_only_available_when_the_Unicode_u_flag_or_the_Unicode_Sets_v_flag_is_set, start, pos - start);
                        }
                    }
                    return result;
                }
                // '\uDDDD'
                for (; pos < start + 6; pos++) {
                    if (!(pos < end && isHexDigit(charCodeUnchecked(pos)))) {
                        tokenFlags |= TokenFlags.ContainsInvalidEscape;
                        if (flags & EscapeSequenceScanningFlags.ReportInvalidEscapeErrors) {
                            error(Diagnostics.Hexadecimal_digit_expected);
                        }
                        return text.substring(start, pos);
                    }
                }
                tokenFlags |= TokenFlags.UnicodeEscape;
                const escapedValue = parseInt(text.substring(start + 2, pos), 16);
                const escapedValueString = String.fromCharCode(escapedValue);
                if (
                    flags & EscapeSequenceScanningFlags.AnyUnicodeMode && escapedValue >= 0xD800 && escapedValue <= 0xDBFF &&
                    pos + 6 < end && text.substring(pos, pos + 2) === "\\u" && charCodeUnchecked(pos + 2) !== CharacterCodes.openBrace
                ) {
                    // For regular expressions in any Unicode mode, \u HexLeadSurrogate \u HexTrailSurrogate is treated as a single character
                    // for the purpose of determining whether a character class range is out of order
                    // https://tc39.es/ecma262/#prod-RegExpUnicodeEscapeSequence
                    const nextStart = pos;
                    let nextPos = pos + 2;
                    for (; nextPos < nextStart + 6; nextPos++) {
                        if (!isHexDigit(charCodeUnchecked(nextPos))) {
                            // leave the error to the next call
                            return escapedValueString;
                        }
                    }
                    const nextEscapedValue = parseInt(text.substring(nextStart + 2, nextPos), 16);
                    if (nextEscapedValue >= 0xDC00 && nextEscapedValue <= 0xDFFF) {
                        pos = nextPos;
                        return escapedValueString + String.fromCharCode(nextEscapedValue);
                    }
                }
                return escapedValueString;

            case CharacterCodes.x:
                // '\xDD'
                for (; pos < start + 4; pos++) {
                    if (!(pos < end && isHexDigit(charCodeUnchecked(pos)))) {
                        tokenFlags |= TokenFlags.ContainsInvalidEscape;
                        if (flags & EscapeSequenceScanningFlags.ReportInvalidEscapeErrors) {
                            error(Diagnostics.Hexadecimal_digit_expected);
                        }
                        return text.substring(start, pos);
                    }
                }
                tokenFlags |= TokenFlags.HexEscape;
                return String.fromCharCode(parseInt(text.substring(start + 2, pos), 16));

            // when encountering a LineContinuation (i.e. a backslash and a line terminator sequence),
            // the line terminator is interpreted to be "the empty code unit sequence".
            case CharacterCodes.carriageReturn:
                if (pos < end && charCodeUnchecked(pos) === CharacterCodes.lineFeed) {
                    pos++;
                }
            // falls through
            case CharacterCodes.lineFeed:
            case CharacterCodes.lineSeparator:
            case CharacterCodes.paragraphSeparator:
                return "";
            default:
                if (
                    flags & EscapeSequenceScanningFlags.AnyUnicodeMode
                    || flags & EscapeSequenceScanningFlags.RegularExpression
                        && !(flags & EscapeSequenceScanningFlags.AnnexB)
                        && isIdentifierPart(ch, languageVersion)
                ) {
                    error(Diagnostics.This_character_cannot_be_escaped_in_a_regular_expression, pos - 2, 2);
                }
                return String.fromCharCode(ch);
        }
    }

    function scanExtendedUnicodeEscape(shouldEmitInvalidEscapeError: boolean): string {
        const start = pos;
        pos += 3;
        const escapedStart = pos;
        const escapedValueString = scanMinimumNumberOfHexDigits(1, /*canHaveSeparators*/ false);
        const escapedValue = escapedValueString ? parseInt(escapedValueString, 16) : -1;
        let isInvalidExtendedEscape = false;

        // Validate the value of the digit
        if (escapedValue < 0) {
            if (shouldEmitInvalidEscapeError) {
                error(Diagnostics.Hexadecimal_digit_expected);
            }
            isInvalidExtendedEscape = true;
        }
        else if (escapedValue > 0x10FFFF) {
            if (shouldEmitInvalidEscapeError) {
                error(Diagnostics.An_extended_Unicode_escape_value_must_be_between_0x0_and_0x10FFFF_inclusive, escapedStart, pos - escapedStart);
            }
            isInvalidExtendedEscape = true;
        }

        if (pos >= end) {
            if (shouldEmitInvalidEscapeError) {
                error(Diagnostics.Unexpected_end_of_text);
            }
            isInvalidExtendedEscape = true;
        }
        else if (charCodeUnchecked(pos) === CharacterCodes.closeBrace) {
            // Only swallow the following character up if it's a '}'.
            pos++;
        }
        else {
            if (shouldEmitInvalidEscapeError) {
                error(Diagnostics.Unterminated_Unicode_escape_sequence);
            }
            isInvalidExtendedEscape = true;
        }

        if (isInvalidExtendedEscape) {
            tokenFlags |= TokenFlags.ContainsInvalidEscape;
            return text.substring(start, pos);
        }

        tokenFlags |= TokenFlags.ExtendedUnicodeEscape;
        return utf16EncodeAsString(escapedValue);
    }

    // Current character is known to be a backslash. Check for Unicode escape of the form '\uXXXX'
    // and return code point value if valid Unicode escape is found. Otherwise return -1.
    function peekUnicodeEscape(): number {
        if (pos + 5 < end && charCodeUnchecked(pos + 1) === CharacterCodes.u) {
            const start = pos;
            pos += 2;
            const value = scanExactNumberOfHexDigits(4, /*canHaveSeparators*/ false);
            pos = start;
            return value;
        }
        return -1;
    }

    function peekExtendedUnicodeEscape(): number {
        if (codePointUnchecked(pos + 1) === CharacterCodes.u && codePointUnchecked(pos + 2) === CharacterCodes.openBrace) {
            const start = pos;
            pos += 3;
            const escapedValueString = scanMinimumNumberOfHexDigits(1, /*canHaveSeparators*/ false);
            const escapedValue = escapedValueString ? parseInt(escapedValueString, 16) : -1;
            pos = start;
            return escapedValue;
        }
        return -1;
    }

    function scanIdentifierParts(): string {
        let result = "";
        let start = pos;
        while (pos < end) {
            let ch = codePointUnchecked(pos);
            if (isIdentifierPart(ch, languageVersion)) {
                pos += charSize(ch);
            }
            else if (ch === CharacterCodes.backslash) {
                ch = peekExtendedUnicodeEscape();
                if (ch >= 0 && isIdentifierPart(ch, languageVersion)) {
                    result += scanExtendedUnicodeEscape(/*shouldEmitInvalidEscapeError*/ true);
                    start = pos;
                    continue;
                }
                ch = peekUnicodeEscape();
                if (!(ch >= 0 && isIdentifierPart(ch, languageVersion))) {
                    break;
                }
                tokenFlags |= TokenFlags.UnicodeEscape;
                result += text.substring(start, pos);
                result += utf16EncodeAsString(ch);
                // Valid Unicode escape is always six characters
                pos += 6;
                start = pos;
            }
            else {
                break;
            }
        }
        result += text.substring(start, pos);
        return result;
    }

    function getIdentifierToken(): SyntaxKind.Identifier | KeywordSyntaxKind {
        // Reserved words are between 2 and 12 characters long and start with a lowercase letter
        const len = tokenValue.length;
        if (len >= 2 && len <= 12) {
            const ch = tokenValue.charCodeAt(0);
            if (ch >= CharacterCodes.a && ch <= CharacterCodes.z) {
                const keyword = textToKeyword.get(tokenValue);
                if (keyword !== undefined) {
                    return token = keyword;
                }
            }
        }
        return token = SyntaxKind.Identifier;
    }

    function scanBinaryOrOctalDigits(base: 2 | 8): string {
        let value = "";
        // For counting number of digits; Valid binaryIntegerLiteral must have at least one binary digit following B or b.
        // Similarly valid octalIntegerLiteral must have at least one octal digit following o or O.
        let separatorAllowed = false;
        let isPreviousTokenSeparator = false;
        while (true) {
            const ch = charCodeUnchecked(pos);
            // Numeric separators are allowed anywhere within a numeric literal, except not at the beginning, or following another separator
            if (ch === CharacterCodes._) {
                tokenFlags |= TokenFlags.ContainsSeparator;
                if (separatorAllowed) {
                    separatorAllowed = false;
                    isPreviousTokenSeparator = true;
                }
                else if (isPreviousTokenSeparator) {
                    error(Diagnostics.Multiple_consecutive_numeric_separators_are_not_permitted, pos, 1);
                }
                else {
                    error(Diagnostics.Numeric_separators_are_not_allowed_here, pos, 1);
                }
                pos++;
                continue;
            }
            separatorAllowed = true;
            if (!isDigit(ch) || ch - CharacterCodes._0 >= base) {
                break;
            }
            value += text[pos];
            pos++;
            isPreviousTokenSeparator = false;
        }
        if (charCodeUnchecked(pos - 1) === CharacterCodes._) {
            // Literal ends with underscore - not allowed
            error(Diagnostics.Numeric_separators_are_not_allowed_here, pos - 1, 1);
        }
        return value;
    }

    function checkBigIntSuffix(): SyntaxKind {
        if (charCodeUnchecked(pos) === CharacterCodes.n) {
            tokenValue += "n";
            // Use base 10 instead of base 2 or base 8 for shorter literals
            if (tokenFlags & TokenFlags.BinaryOrOctalSpecifier) {
                tokenValue = parsePseudoBigInt(tokenValue) + "n";
            }
            pos++;
            return SyntaxKind.BigIntLiteral;
        }
        else { // not a bigint, so can convert to number in simplified form
            // Number() may not support 0b or 0o, so use parseInt() instead
            const numericValue = tokenFlags & TokenFlags.BinarySpecifier
                ? parseInt(tokenValue.slice(2), 2) // skip "0b"
                : tokenFlags & TokenFlags.OctalSpecifier
                ? parseInt(tokenValue.slice(2), 8) // skip "0o"
                : +tokenValue;
            tokenValue = "" + numericValue;
            return SyntaxKind.NumericLiteral;
        }
    }

    function scan(): SyntaxKind {
        fullStartPos = pos;
        tokenFlags = TokenFlags.None;
        while (true) {
            tokenStart = pos;
            if (pos >= end) {
                return token = SyntaxKind.EndOfFileToken;
            }

            const ch = codePointUnchecked(pos);
            if (pos === 0) {
                // Special handling for shebang
                if (ch === CharacterCodes.hash && isShebangTrivia(text, pos)) {
                    pos = scanShebangTrivia(text, pos);
                    if (skipTrivia) {
                        continue;
                    }
                    else {
                        return token = SyntaxKind.ShebangTrivia;
                    }
                }
            }

            switch (ch) {
                case CharacterCodes.lineFeed:
                case CharacterCodes.carriageReturn:
                    tokenFlags |= TokenFlags.PrecedingLineBreak;
                    if (skipTrivia) {
                        pos++;
                        continue;
                    }
                    else {
                        if (ch === CharacterCodes.carriageReturn && pos + 1 < end && charCodeUnchecked(pos + 1) === CharacterCodes.lineFeed) {
                            // consume both CR and LF
                            pos += 2;
                        }
                        else {
                            pos++;
                        }
                        return token = SyntaxKind.NewLineTrivia;
                    }
                case CharacterCodes.tab:
                case CharacterCodes.verticalTab:
                case CharacterCodes.formFeed:
                case CharacterCodes.space:
                case CharacterCodes.nonBreakingSpace:
                case CharacterCodes.ogham:
                case CharacterCodes.enQuad:
                case CharacterCodes.emQuad:
                case CharacterCodes.enSpace:
                case CharacterCodes.emSpace:
                case CharacterCodes.threePerEmSpace:
                case CharacterCodes.fourPerEmSpace:
                case CharacterCodes.sixPerEmSpace:
                case CharacterCodes.figureSpace:
                case CharacterCodes.punctuationSpace:
                case CharacterCodes.thinSpace:
                case CharacterCodes.hairSpace:
                case CharacterCodes.zeroWidthSpace:
                case CharacterCodes.narrowNoBreakSpace:
                case CharacterCodes.mathematicalSpace:
                case CharacterCodes.ideographicSpace:
                case CharacterCodes.byteOrderMark:
                    if (skipTrivia) {
                        pos++;
                        continue;
                    }
                    else {
                        while (pos < end && isWhiteSpaceSingleLine(charCodeUnchecked(pos))) {
                            pos++;
                        }
                        return token = SyntaxKind.WhitespaceTrivia;
                    }
                case CharacterCodes.exclamation:
                    if (charCodeUnchecked(pos + 1) === CharacterCodes.equals) {
                        if (charCodeUnchecked(pos + 2) === CharacterCodes.equals) {
                            return pos += 3, token = SyntaxKind.ExclamationEqualsEqualsToken;
                        }
                        return pos += 2, token = SyntaxKind.ExclamationEqualsToken;
                    }
                    pos++;
                    return token = SyntaxKind.ExclamationToken;
                case CharacterCodes.doubleQuote:
                case CharacterCodes.singleQuote:
                    tokenValue = scanString();
                    return token = SyntaxKind.StringLiteral;
                case CharacterCodes.backtick:
                    return token = scanTemplateAndSetTokenValue(/*shouldEmitInvalidEscapeError*/ false);
                case CharacterCodes.percent:
                    if (charCodeUnchecked(pos + 1) === CharacterCodes.equals) {
                        return pos += 2, token = SyntaxKind.PercentEqualsToken;
                    }
                    pos++;
                    return token = SyntaxKind.PercentToken;
                case CharacterCodes.ampersand:
                    if (charCodeUnchecked(pos + 1) === CharacterCodes.ampersand) {
                        if (charCodeUnchecked(pos + 2) === CharacterCodes.equals) {
                            return pos += 3, token = SyntaxKind.AmpersandAmpersandEqualsToken;
                        }
                        return pos += 2, token = SyntaxKind.AmpersandAmpersandToken;
                    }
                    if (charCodeUnchecked(pos + 1) === CharacterCodes.equals) {
                        return pos += 2, token = SyntaxKind.AmpersandEqualsToken;
                    }
                    pos++;
                    return token = SyntaxKind.AmpersandToken;
                case CharacterCodes.openParen:
                    pos++;
                    return token = SyntaxKind.OpenParenToken;
                case CharacterCodes.closeParen:
                    pos++;
                    return token = SyntaxKind.CloseParenToken;
                case CharacterCodes.asterisk:
                    if (charCodeUnchecked(pos + 1) === CharacterCodes.equals) {
                        return pos += 2, token = SyntaxKind.AsteriskEqualsToken;
                    }
                    if (charCodeUnchecked(pos + 1) === CharacterCodes.asterisk) {
                        if (charCodeUnchecked(pos + 2) === CharacterCodes.equals) {
                            return pos += 3, token = SyntaxKind.AsteriskAsteriskEqualsToken;
                        }
                        return pos += 2, token = SyntaxKind.AsteriskAsteriskToken;
                    }
                    pos++;
                    if (
                        skipJsDocLeadingAsterisks &&
                        (tokenFlags & TokenFlags.PrecedingJSDocLeadingAsterisks) === 0 &&
                        (tokenFlags & TokenFlags.PrecedingLineBreak)
                    ) {
                        // decoration at the start of a JSDoc comment line
                        tokenFlags |= TokenFlags.PrecedingJSDocLeadingAsterisks;
                        continue;
                    }
                    return token = SyntaxKind.AsteriskToken;
                case CharacterCodes.plus:
                    if (charCodeUnchecked(pos + 1) === CharacterCodes.plus) {
                        return pos += 2, token = SyntaxKind.PlusPlusToken;
                    }
                    if (charCodeUnchecked(pos + 1) === CharacterCodes.equals) {
                        return pos += 2, token = SyntaxKind.PlusEqualsToken;
                    }
                    pos++;
                    return token = SyntaxKind.PlusToken;
                case CharacterCodes.comma:
                    pos++;
                    return token = SyntaxKind.CommaToken;
                case CharacterCodes.minus:
                    if (charCodeUnchecked(pos + 1) === CharacterCodes.minus) {
                        return pos += 2, token = SyntaxKind.MinusMinusToken;
                    }
                    if (charCodeUnchecked(pos + 1) === CharacterCodes.equals) {
                        return pos += 2, token = SyntaxKind.MinusEqualsToken;
                    }
                    pos++;
                    return token = SyntaxKind.MinusToken;
                case CharacterCodes.dot:
                    if (isDigit(charCodeUnchecked(pos + 1))) {
                        scanNumber();
                        return token = SyntaxKind.NumericLiteral;
                    }
                    if (charCodeUnchecked(pos + 1) === CharacterCodes.dot && charCodeUnchecked(pos + 2) === CharacterCodes.dot) {
                        return pos += 3, token = SyntaxKind.DotDotDotToken;
                    }
                    pos++;
                    return token = SyntaxKind.DotToken;
                case CharacterCodes.slash:
                    // Single-line comment
                    if (charCodeUnchecked(pos + 1) === CharacterCodes.slash) {
                        pos += 2;

                        while (pos < end) {
                            if (isLineBreak(charCodeUnchecked(pos))) {
                                break;
                            }
                            pos++;
                        }

                        commentDirectives = appendIfCommentDirective(
                            commentDirectives,
                            text.slice(tokenStart, pos),
                            commentDirectiveRegExSingleLine,
                            tokenStart,
                        );

                        if (skipTrivia) {
                            continue;
                        }
                        else {
                            return token = SyntaxKind.SingleLineCommentTrivia;
                        }
                    }
                    // Multi-line comment
                    if (charCodeUnchecked(pos + 1) === CharacterCodes.asterisk) {
                        pos += 2;
                        const isJSDoc = charCodeUnchecked(pos) === CharacterCodes.asterisk && charCodeUnchecked(pos + 1) !== CharacterCodes.slash;

                        let commentClosed = false;
                        let lastLineStart = tokenStart;
                        while (pos < end) {
                            const ch = charCodeUnchecked(pos);

                            if (ch === CharacterCodes.asterisk && charCodeUnchecked(pos + 1) === CharacterCodes.slash) {
                                pos += 2;
                                commentClosed = true;
                                break;
                            }

                            pos++;

                            if (isLineBreak(ch)) {
                                lastLineStart = pos;
                                tokenFlags |= TokenFlags.PrecedingLineBreak;
                            }
                        }

                        if (isJSDoc && shouldParseJSDoc()) {
                            tokenFlags |= TokenFlags.PrecedingJSDocComment;
                        }

                        commentDirectives = appendIfCommentDirective(commentDirectives, text.slice(lastLineStart, pos), commentDirectiveRegExMultiLine, lastLineStart);

                        if (!commentClosed) {
                            error(Diagnostics.Asterisk_Slash_expected);
                        }

                        if (skipTrivia) {
                            continue;
                        }
                        else {
                            if (!commentClosed) {
                                tokenFlags |= TokenFlags.Unterminated;
                            }
                            return token = SyntaxKind.MultiLineCommentTrivia;
                        }
                    }

                    if (charCodeUnchecked(pos + 1) === CharacterCodes.equals) {
                        return pos += 2, token = SyntaxKind.SlashEqualsToken;
                    }

                    pos++;
                    return token = SyntaxKind.SlashToken;

                case CharacterCodes._0:
                    if (pos + 2 < end && (charCodeUnchecked(pos + 1) === CharacterCodes.X || charCodeUnchecked(pos + 1) === CharacterCodes.x)) {
                        pos += 2;
                        tokenValue = scanMinimumNumberOfHexDigits(1, /*canHaveSeparators*/ true);
                        if (!tokenValue) {
                            error(Diagnostics.Hexadecimal_digit_expected);
                            tokenValue = "0";
                        }
                        tokenValue = "0x" + tokenValue;
                        tokenFlags |= TokenFlags.HexSpecifier;
                        return token = checkBigIntSuffix();
                    }
                    else if (pos + 2 < end && (charCodeUnchecked(pos + 1) === CharacterCodes.B || charCodeUnchecked(pos + 1) === CharacterCodes.b)) {
                        pos += 2;
                        tokenValue = scanBinaryOrOctalDigits(/* base */ 2);
                        if (!tokenValue) {
                            error(Diagnostics.Binary_digit_expected);
                            tokenValue = "0";
                        }
                        tokenValue = "0b" + tokenValue;
                        tokenFlags |= TokenFlags.BinarySpecifier;
                        return token = checkBigIntSuffix();
                    }
                    else if (pos + 2 < end && (charCodeUnchecked(pos + 1) === CharacterCodes.O || charCodeUnchecked(pos + 1) === CharacterCodes.o)) {
                        pos += 2;
                        tokenValue = scanBinaryOrOctalDigits(/* base */ 8);
                        if (!tokenValue) {
                            error(Diagnostics.Octal_digit_expected);
                            tokenValue = "0";
                        }
                        tokenValue = "0o" + tokenValue;
                        tokenFlags |= TokenFlags.OctalSpecifier;
                        return token = checkBigIntSuffix();
                    }
                // falls through
                case CharacterCodes._1:
                case CharacterCodes._2:
                case CharacterCodes._3:
                case CharacterCodes._4:
                case CharacterCodes._5:
                case CharacterCodes._6:
                case CharacterCodes._7:
                case CharacterCodes._8:
                case CharacterCodes._9:
                    return token = scanNumber();
                case CharacterCodes.colon:
                    pos++;
                    return token = SyntaxKind.ColonToken;
                case CharacterCodes.semicolon:
                    pos++;
                    return token = SyntaxKind.SemicolonToken;
                case CharacterCodes.lessThan:
                    if (isConflictMarkerTrivia(text, pos)) {
                        pos = scanConflictMarkerTrivia(text, pos, error);
                        if (skipTrivia) {
                            continue;
                        }
                        else {
                            return token = SyntaxKind.ConflictMarkerTrivia;
                        }
                    }

                    if (charCodeUnchecked(pos + 1) === CharacterCodes.lessThan) {
                        if (charCodeUnchecked(pos + 2) === CharacterCodes.equals) {
                            return pos += 3, token = SyntaxKind.LessThanLessThanEqualsToken;
                        }
                        return pos += 2, token = SyntaxKind.LessThanLessThanToken;
                    }
                    if (charCodeUnchecked(pos + 1) === CharacterCodes.equals) {
                        return pos += 2, token = SyntaxKind.LessThanEqualsToken;
                    }
                    if (
                        languageVariant === LanguageVariant.JSX &&
                        charCodeUnchecked(pos + 1) === CharacterCodes.slash &&
                        charCodeUnchecked(pos + 2) !== CharacterCodes.asterisk
                    ) {
                        return pos += 2, token = SyntaxKind.LessThanSlashToken;
                    }
                    pos++;
                    return token = SyntaxKind.LessThanToken;
                case CharacterCodes.equals:
                    if (isConflictMarkerTrivia(text, pos)) {
                        pos = scanConflictMarkerTrivia(text, pos, error);
                        if (skipTrivia) {
                            continue;
                        }
                        else {
                            return token = SyntaxKind.ConflictMarkerTrivia;
                        }
                    }

                    if (charCodeUnchecked(pos + 1) === CharacterCodes.equals) {
                        if (charCodeUnchecked(pos + 2) === CharacterCodes.equals) {
                            return pos += 3, token = SyntaxKind.EqualsEqualsEqualsToken;
                        }
                        return pos += 2, token = SyntaxKind.EqualsEqualsToken;
                    }
                    if (charCodeUnchecked(pos + 1) === CharacterCodes.greaterThan) {
                        return pos += 2, token = SyntaxKind.EqualsGreaterThanToken;
                    }
                    pos++;
                    return token = SyntaxKind.EqualsToken;
                case CharacterCodes.greaterThan:
                    if (isConflictMarkerTrivia(text, pos)) {
                        pos = scanConflictMarkerTrivia(text, pos, error);
                        if (skipTrivia) {
                            continue;
                        }
                        else {
                            return token = SyntaxKind.ConflictMarkerTrivia;
                        }
                    }

                    pos++;
                    return token = SyntaxKind.GreaterThanToken;
                case CharacterCodes.question:
                    if (charCodeUnchecked(pos + 1) === CharacterCodes.dot && !isDigit(charCodeUnchecked(pos + 2))) {
                        return pos += 2, token = SyntaxKind.QuestionDotToken;
                    }
                    if (charCodeUnchecked(pos + 1) === CharacterCodes.question) {
                        if (charCodeUnchecked(pos + 2) === CharacterCodes.equals) {
                            return pos += 3, token = SyntaxKind.QuestionQuestionEqualsToken;
                        }
                        return pos += 2, token = SyntaxKind.QuestionQuestionToken;
                    }
                    pos++;
                    return token = SyntaxKind.QuestionToken;
                case CharacterCodes.openBracket:
                    pos++;
                    return token = SyntaxKind.OpenBracketToken;
                case CharacterCodes.closeBracket:
                    pos++;
                    return token = SyntaxKind.CloseBracketToken;
                case CharacterCodes.caret:
                    if (charCodeUnchecked(pos + 1) === CharacterCodes.equals) {
                        return pos += 2, token = SyntaxKind.CaretEqualsToken;
                    }
                    pos++;
                    return token = SyntaxKind.CaretToken;
                case CharacterCodes.openBrace:
                    pos++;
                    return token = SyntaxKind.OpenBraceToken;
                case CharacterCodes.bar:
                    if (isConflictMarkerTrivia(text, pos)) {
                        pos = scanConflictMarkerTrivia(text, pos, error);
                        if (skipTrivia) {
                            continue;
                        }
                        else {
                            return token = SyntaxKind.ConflictMarkerTrivia;
                        }
                    }

                    if (charCodeUnchecked(pos + 1) === CharacterCodes.bar) {
                        if (charCodeUnchecked(pos + 2) === CharacterCodes.equals) {
                            return pos += 3, token = SyntaxKind.BarBarEqualsToken;
                        }
                        return pos += 2, token = SyntaxKind.BarBarToken;
                    }
                    if (charCodeUnchecked(pos + 1) === CharacterCodes.equals) {
                        return pos += 2, token = SyntaxKind.BarEqualsToken;
                    }
                    pos++;
                    return token = SyntaxKind.BarToken;
                case CharacterCodes.closeBrace:
                    pos++;
                    return token = SyntaxKind.CloseBraceToken;
                case CharacterCodes.tilde:
                    pos++;
                    return token = SyntaxKind.TildeToken;
                case CharacterCodes.at:
                    pos++;
                    return token = SyntaxKind.AtToken;
                case CharacterCodes.backslash:
                    const extendedCookedChar = peekExtendedUnicodeEscape();
                    if (extendedCookedChar >= 0 && isIdentifierStart(extendedCookedChar, languageVersion)) {
                        tokenValue = scanExtendedUnicodeEscape(/*shouldEmitInvalidEscapeError*/ true) + scanIdentifierParts();
                        return token = getIdentifierToken();
                    }

                    const cookedChar = peekUnicodeEscape();
                    if (cookedChar >= 0 && isIdentifierStart(cookedChar, languageVersion)) {
                        pos += 6;
                        tokenFlags |= TokenFlags.UnicodeEscape;
                        tokenValue = String.fromCharCode(cookedChar) + scanIdentifierParts();
                        return token = getIdentifierToken();
                    }

                    error(Diagnostics.Invalid_character);
                    pos++;
                    return token = SyntaxKind.Unknown;
                case CharacterCodes.hash:
                    if (pos !== 0 && text[pos + 1] === "!") {
                        error(Diagnostics.can_only_be_used_at_the_start_of_a_file, pos, 2);
                        pos++;
                        return token = SyntaxKind.Unknown;
                    }

                    const charAfterHash = codePointUnchecked(pos + 1);
                    if (charAfterHash === CharacterCodes.backslash) {
                        pos++;
                        const extendedCookedChar = peekExtendedUnicodeEscape();
                        if (extendedCookedChar >= 0 && isIdentifierStart(extendedCookedChar, languageVersion)) {
                            tokenValue = "#" + scanExtendedUnicodeEscape(/*shouldEmitInvalidEscapeError*/ true) + scanIdentifierParts();
                            return token = SyntaxKind.PrivateIdentifier;
                        }

                        const cookedChar = peekUnicodeEscape();
                        if (cookedChar >= 0 && isIdentifierStart(cookedChar, languageVersion)) {
                            pos += 6;
                            tokenFlags |= TokenFlags.UnicodeEscape;
                            tokenValue = "#" + String.fromCharCode(cookedChar) + scanIdentifierParts();
                            return token = SyntaxKind.PrivateIdentifier;
                        }
                        pos--;
                    }

                    if (isIdentifierStart(charAfterHash, languageVersion)) {
                        pos++;
                        // We're relying on scanIdentifier's behavior and adjusting the token kind after the fact.
                        // Notably absent from this block is the fact that calling a function named "scanIdentifier",
                        // but identifiers don't include '#', and that function doesn't deal with it at all.
                        // This works because 'scanIdentifier' tries to reuse source characters and builds up substrings;
                        // however, it starts at the 'tokenPos' which includes the '#', and will "accidentally" prepend the '#' for us.
                        scanIdentifier(charAfterHash, languageVersion);
                    }
                    else {
                        tokenValue = "#";
                        error(Diagnostics.Invalid_character, pos++, charSize(ch));
                    }
                    return token = SyntaxKind.PrivateIdentifier;
                case CharacterCodes.replacementCharacter:
                    error(Diagnostics.File_appears_to_be_binary, 0, 0);
                    pos = end;
                    return token = SyntaxKind.NonTextFileMarkerTrivia;
                default:
                    const identifierKind = scanIdentifier(ch, languageVersion);
                    if (identifierKind) {
                        return token = identifierKind;
                    }
                    else if (isWhiteSpaceSingleLine(ch)) {
                        pos += charSize(ch);
                        continue;
                    }
                    else if (isLineBreak(ch)) {
                        tokenFlags |= TokenFlags.PrecedingLineBreak;
                        pos += charSize(ch);
                        continue;
                    }
                    const size = charSize(ch);
                    error(Diagnostics.Invalid_character, pos, size);
                    pos += size;
                    return token = SyntaxKind.Unknown;
            }
        }
    }

    function shouldParseJSDoc() {
        switch (jsDocParsingMode) {
            case JSDocParsingMode.ParseAll:
                return true;
            case JSDocParsingMode.ParseNone:
                return false;
        }

        if (scriptKind !== ScriptKind.TS && scriptKind !== ScriptKind.TSX) {
            // If outside of TS, we need JSDoc to get any type info.
            return true;
        }

        if (jsDocParsingMode === JSDocParsingMode.ParseForTypeInfo) {
            // If we're in TS, but we don't need to produce reliable errors,
            // we don't need to parse to find @see or @link.
            return false;
        }

        return jsDocSeeOrLink.test(text.slice(fullStartPos, pos));
    }

    function reScanInvalidIdentifier(): SyntaxKind {
        Debug.assert(token === SyntaxKind.Unknown, "'reScanInvalidIdentifier' should only be called when the current token is 'SyntaxKind.Unknown'.");
        pos = tokenStart = fullStartPos;
        tokenFlags = 0;
        const ch = codePointUnchecked(pos);
        const identifierKind = scanIdentifier(ch, ScriptTarget.ESNext);
        if (identifierKind) {
            return token = identifierKind;
        }
        pos += charSize(ch);
        return token; // Still `SyntaxKind.Unknown`
    }

    function scanIdentifier(startCharacter: number, languageVersion: ScriptTarget) {
        let ch = startCharacter;
        if (isIdentifierStart(ch, languageVersion)) {
            pos += charSize(ch);
            while (pos < end && isIdentifierPart(ch = codePointUnchecked(pos), languageVersion)) pos += charSize(ch);
            tokenValue = text.substring(tokenStart, pos);
            if (ch === CharacterCodes.backslash) {
                tokenValue += scanIdentifierParts();
            }
            return getIdentifierToken();
        }
    }

    function reScanGreaterToken(): SyntaxKind {
        if (token === SyntaxKind.GreaterThanToken) {
            if (charCodeUnchecked(pos) === CharacterCodes.greaterThan) {
                if (charCodeUnchecked(pos + 1) === CharacterCodes.greaterThan) {
                    if (charCodeUnchecked(pos + 2) === CharacterCodes.equals) {
                        return pos += 3, token = SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken;
                    }
                    return pos += 2, token = SyntaxKind.GreaterThanGreaterThanGreaterThanToken;
                }
                if (charCodeUnchecked(pos + 1) === CharacterCodes.equals) {
                    return pos += 2, token = SyntaxKind.GreaterThanGreaterThanEqualsToken;
                }
                pos++;
                return token = SyntaxKind.GreaterThanGreaterThanToken;
            }
            if (charCodeUnchecked(pos) === CharacterCodes.equals) {
                pos++;
                return token = SyntaxKind.GreaterThanEqualsToken;
            }
        }
        return token;
    }

    function reScanAsteriskEqualsToken(): SyntaxKind {
        Debug.assert(token === SyntaxKind.AsteriskEqualsToken, "'reScanAsteriskEqualsToken' should only be called on a '*='");
        pos = tokenStart + 1;
        return token = SyntaxKind.EqualsToken;
    }

    function reScanSlashToken(reportErrors?: boolean): SyntaxKind {
        if (token === SyntaxKind.SlashToken || token === SyntaxKind.SlashEqualsToken) {
            // Quickly get to the end of regex such that we know the flags
            const startOfRegExpBody = tokenStart + 1;
            pos = startOfRegExpBody;
            let inEscape = false;
            let hasNamedCapturingGroups = false;
            // Although nested character classes are allowed in Unicode Sets mode,
            // an unescaped slash is nevertheless invalid even in a character class in any Unicode mode.
            // This is indicated by Section 12.9.5 Regular Expression Literals of the specification,
            // where nested character classes are not considered at all. (A `[` RegularExpressionClassChar
            // does nothing in a RegularExpressionClass, and a `]` always closes the class.)
            // Additionally, parsing nested character classes will misinterpret regexes like `/[[]/`
            // as unterminated, consuming characters beyond the slash. (This even applies to `/[[]/v`,
            // which should be parsed as a well-terminated regex with an incomplete character class.)
            // Thus we must not handle nested character classes in the first pass.
            let inCharacterClass = false;
            while (true) {
                // If we reach the end of a file, or hit a newline, then this is an unterminated
                // regex.  Report error and return what we have so far.
                const ch = charCodeChecked(pos);
                if (ch === CharacterCodes.EOF || isLineBreak(ch)) {
                    tokenFlags |= TokenFlags.Unterminated;
                    break;
                }

                if (inEscape) {
                    // Parsing an escape character;
                    // reset the flag and just advance to the next char.
                    inEscape = false;
                }
                else if (ch === CharacterCodes.slash && !inCharacterClass) {
                    // A slash within a character class is permissible,
                    // but in general it signals the end of the regexp literal.
                    break;
                }
                else if (ch === CharacterCodes.openBracket) {
                    inCharacterClass = true;
                }
                else if (ch === CharacterCodes.backslash) {
                    inEscape = true;
                }
                else if (ch === CharacterCodes.closeBracket) {
                    inCharacterClass = false;
                }
                else if (
                    !inCharacterClass
                    && ch === CharacterCodes.openParen
                    && charCodeChecked(pos + 1) === CharacterCodes.question
                    && charCodeChecked(pos + 2) === CharacterCodes.lessThan
                    && charCodeChecked(pos + 3) !== CharacterCodes.equals
                    && charCodeChecked(pos + 3) !== CharacterCodes.exclamation
                ) {
                    hasNamedCapturingGroups = true;
                }
                pos++;
            }
            const endOfRegExpBody = pos;
            if (tokenFlags & TokenFlags.Unterminated) {
                // Search for the nearest unbalanced bracket for better recovery. Since the expression is
                // invalid anyways, we take nested square brackets into consideration for the best guess.
                pos = startOfRegExpBody;
                inEscape = false;
                let characterClassDepth = 0;
                let inDecimalQuantifier = false;
                let groupDepth = 0;
                while (pos < endOfRegExpBody) {
                    const ch = charCodeUnchecked(pos);
                    if (inEscape) {
                        inEscape = false;
                    }
                    else if (ch === CharacterCodes.backslash) {
                        inEscape = true;
                    }
                    else if (ch === CharacterCodes.openBracket) {
                        characterClassDepth++;
                    }
                    else if (ch === CharacterCodes.closeBracket && characterClassDepth) {
                        characterClassDepth--;
                    }
                    else if (!characterClassDepth) {
                        if (ch === CharacterCodes.openBrace) {
                            inDecimalQuantifier = true;
                        }
                        else if (ch === CharacterCodes.closeBrace && inDecimalQuantifier) {
                            inDecimalQuantifier = false;
                        }
                        else if (!inDecimalQuantifier) {
                            if (ch === CharacterCodes.openParen) {
                                groupDepth++;
                            }
                            else if (ch === CharacterCodes.closeParen && groupDepth) {
                                groupDepth--;
                            }
                            else if (ch === CharacterCodes.closeParen || ch === CharacterCodes.closeBracket || ch === CharacterCodes.closeBrace) {
                                // We encountered an unbalanced bracket outside a character class. Treat this position as the end of regex.
                                break;
                            }
                        }
                    }
                    pos++;
                }
                // Whitespaces and semicolons at the end are not likely to be part of the regex
                while (isWhiteSpaceLike(charCodeChecked(pos - 1)) || charCodeChecked(pos - 1) === CharacterCodes.semicolon) pos--;
                error(Diagnostics.Unterminated_regular_expression_literal, tokenStart, pos - tokenStart);
            }
            else {
                // Consume the slash character
                pos++;
                regExpFlags = RegularExpressionFlags.None;
                while (true) {
                    const ch = codePointChecked(pos);
                    if (ch === CharacterCodes.EOF || !isIdentifierPart(ch, languageVersion)) {
                        break;
                    }
                    const size = charSize(ch);
                    if (reportErrors) {
                        const flag = characterCodeToRegularExpressionFlag(ch);
                        if (flag === undefined) {
                            error(Diagnostics.Unknown_regular_expression_flag, pos, size);
                        }
                        else if (regExpFlags & flag) {
                            error(Diagnostics.Duplicate_regular_expression_flag, pos, size);
                        }
                        else if (((regExpFlags | flag) & RegularExpressionFlags.AnyUnicodeMode) === RegularExpressionFlags.AnyUnicodeMode) {
                            error(Diagnostics.The_Unicode_u_flag_and_the_Unicode_Sets_v_flag_cannot_be_set_simultaneously, pos, size);
                        }
                        else {
                            regExpFlags |= flag;
                            checkRegularExpressionFlagAvailability(flag, size);
                        }
                    }
                    pos += size;
                }
            }
            if (reportErrors) {
                scanRange(startOfRegExpBody, endOfRegExpBody - startOfRegExpBody, () => {
                    scanRegularExpressionWorker(/*annexB*/ true, hasNamedCapturingGroups);
                });
            }
            tokenValue = text.substring(tokenStart, pos);
            token = SyntaxKind.RegularExpressionLiteral;
        }
        return token;
    }

    function scanRegularExpressionWorker(annexB: boolean, hasNamedCapturingGroups: boolean) {
        // Why var? It avoids TDZ checks in the runtime which can be costly.
        // See: https://github.com/microsoft/TypeScript/issues/52924
        /* eslint-disable no-var */

        /** Grammar parameter */
        var unicodeSetsMode = !!(regExpFlags & RegularExpressionFlags.UnicodeSets);
        /** Grammar parameter */
        var anyUnicodeMode = !!(regExpFlags & RegularExpressionFlags.AnyUnicodeMode);

        // Regular expressions are checked more strictly when either in 'u' or 'v' mode, or
        // when not using the looser interpretation of the syntax from ECMA-262 Annex B.
        var anyUnicodeModeOrNonAnnexB = anyUnicodeMode || !annexB;

        /** This determines whether a character has more equivalents. @see {getCharacterEquivalents} */
        var isCaseInsensitive = !!(regExpFlags & RegularExpressionFlags.IgnoreCase);

        /** @see {scanClassSetExpression} */
        var mayContainStrings = false;

        /** The number of all (named and unnamed) capturing groups defined in the regex. */
        var numberOfCapturingGroups = 0;
        /** All references to named capturing groups in the regex. */
        var groupNameReferences: (TextRange & { name: string; })[] | undefined;
        /** All numeric backreferences within the regex. */
        var decimalEscapes: (TextRange & { value: number; })[] | undefined;
        /** A stack of scopes for disjunction, including capturing groups, non-capturing groups, lookaheads and lookbehinds. */
        var disjunctionsScopeStack: (RegularExpressionDisjunctionScope | undefined)[] = [];
        var topDisjunctionsScope: RegularExpressionDisjunctionScope | undefined;
        /** A stack of scopes for named capturing groups. @see {scanGroupName} */
        var namedCapturingGroupsScopeStack: (Set<string> | undefined)[] = [];
        var topNamedCapturingGroupsScope: Set<string> | undefined;
        /* eslint-enable no-var */

        regExpCapturingGroups = [];
        regExpCapturingGroupSpecifiers = undefined;

        function markAllInnerPatternUnionsAsPossiblyUndefined(patternUnion: RegularExpressionPatternUnion) {
            for (const pattern of patternUnion) {
                if (typeof pattern === "string") continue;
                for (const content of pattern) {
                    // if a pattern union is already marked, as do all pattern unions inside it
                    if (content instanceof Set && !content.isPossiblyUndefined) {
                        content.isPossiblyUndefined = true;
                        markAllInnerPatternUnionsAsPossiblyUndefined(content);
                    }
                }
            }
        }

        // Disjunction ::= Alternative ('|' Alternative)*
        function scanDisjunction(isInGroup: boolean): RegularExpressionPatternUnion {
            const patternUnion = new Set() as RegularExpressionPatternUnion;
            disjunctionsScopeStack.push(topDisjunctionsScope);
            topDisjunctionsScope = undefined;
            namedCapturingGroupsScopeStack.push(topNamedCapturingGroupsScope);
            topNamedCapturingGroupsScope = undefined;
            while (true) {
                patternUnion.add(scanAlternative(isInGroup));
                if (charCodeChecked(pos) !== CharacterCodes.bar) {
                    if (patternUnion.size > 1) {
                        markAllInnerPatternUnionsAsPossiblyUndefined(patternUnion);
                    }
                    topDisjunctionsScope = disjunctionsScopeStack.pop();
                    topNamedCapturingGroupsScope = namedCapturingGroupsScopeStack.pop();
                    return patternUnion;
                }
                pos++;
            }
        }

        // Alternative ::= Term*
        // Term ::=
        //     | Assertion
        //     | Atom Quantifier?
        // Assertion ::=
        //     | '^'
        //     | '$'
        //     | '\b'
        //     | '\B'
        //     | '(?=' Disjunction ')'
        //     | '(?!' Disjunction ')'
        //     | '(?<=' Disjunction ')'
        //     | '(?<!' Disjunction ')'
        // Quantifier ::= QuantifierPrefix '?'?
        // QuantifierPrefix ::=
        //     | '*'
        //     | '+'
        //     | '?'
        //     | '{' DecimalDigits (',' DecimalDigits?)? '}'
        // Atom ::=
        //     | PatternCharacter
        //     | '.'
        //     | '\' AtomEscape
        //     | CharacterClass
        //     | '(?<' RegExpIdentifierName '>' Disjunction ')'
        //     | '(?' RegularExpressionFlags ('-' RegularExpressionFlags)? ':' Disjunction ')'
        // CharacterClass ::= unicodeMode
        //     ? '[' ClassRanges ']'
        //     : '[' ClassSetExpression ']'
        function scanAlternative(isInGroup: boolean): RegularExpressionPattern {
            const pattern = [] as unknown as RegularExpressionPattern;
            let isPreviousTermQuantifiable = false;
            while (true) {
                const start = pos;
                const ch = charCodeChecked(pos);
                switch (ch) {
                    case CharacterCodes.EOF:
                        return pattern;
                    case CharacterCodes.caret:
                    case CharacterCodes.$:
                        pos++;
                        isPreviousTermQuantifiable = false;
                        break;
                    case CharacterCodes.backslash:
                        pos++;
                        switch (charCodeChecked(pos)) {
                            case CharacterCodes.b:
                            case CharacterCodes.B:
                                pos++;
                                isPreviousTermQuantifiable = false;
                                break;
                            default:
                                pattern.push(scanAtomEscape());
                                isPreviousTermQuantifiable = true;
                                break;
                        }
                        break;
                    case CharacterCodes.openParen:
                        pos++;
                        const prevIsCaseInsensitive = isCaseInsensitive;
                        let groupNumber: number | undefined;
                        let groupName: string | undefined;
                        let isNegativeAssertion = false;
                        if (charCodeChecked(pos) === CharacterCodes.question) {
                            pos++;
                            switch (charCodeChecked(pos)) {
                                case CharacterCodes.exclamation:
                                    isNegativeAssertion = true;
                                // falls through
                                case CharacterCodes.equals:
                                    pos++;
                                    // Although `(?=Disjunction)` and `(?!Disjunction)` are quantifiable in Annex B,
                                    // it's mostly likely a mistake to repeat an assertion.
                                    // Additionally, the term prior to the assertion will be incorrectly replicated and
                                    // fed into `pattern` by the quantifier below if the assertion is made quantifiable.
                                    isPreviousTermQuantifiable = false;
                                    break;
                                case CharacterCodes.lessThan:
                                    const groupNameStart = pos;
                                    pos++;
                                    switch (charCodeChecked(pos)) {
                                        case CharacterCodes.exclamation:
                                            isNegativeAssertion = true;
                                        // falls through
                                        case CharacterCodes.equals:
                                            pos++;
                                            isPreviousTermQuantifiable = false;
                                            break;
                                        default:
                                            groupName = scanGroupName(/*isReference*/ false);
                                            scanExpectedChar(CharacterCodes.greaterThan);
                                            if (languageVersion < ScriptTarget.ES2018) {
                                                error(Diagnostics.Named_capturing_groups_are_only_available_when_targeting_ES2018_or_later, groupNameStart, pos - groupNameStart);
                                            }
                                            groupNumber = ++numberOfCapturingGroups;
                                            isPreviousTermQuantifiable = true;
                                            break;
                                    }
                                    break;
                                default:
                                    const start = pos;
                                    const setFlags = scanPatternModifiers(RegularExpressionFlags.None);
                                    if (charCodeChecked(pos) === CharacterCodes.minus) {
                                        pos++;
                                        scanPatternModifiers(setFlags);
                                        if (pos === start + 1) {
                                            error(Diagnostics.Subpattern_flags_must_be_present_when_there_is_a_minus_sign, start, pos - start);
                                        }
                                    }
                                    scanExpectedChar(CharacterCodes.colon);
                                    isPreviousTermQuantifiable = true;
                                    break;
                            }
                        }
                        else {
                            groupNumber = ++numberOfCapturingGroups;
                            isPreviousTermQuantifiable = true;
                        }
                        const patternUnion = scanDisjunction(/*isInGroup*/ true);
                        isCaseInsensitive = prevIsCaseInsensitive;
                        if (isPreviousTermQuantifiable) {
                            // not an assertion
                            pattern.push(patternUnion);
                            if (groupNumber) {
                                regExpCapturingGroups[groupNumber] = patternUnion;
                                ((topDisjunctionsScope ??= {}).groups ??= [])[groupNumber] = patternUnion;
                                if (groupName) {
                                    (regExpCapturingGroupSpecifiers ??= createMultiMap()).add(groupName, patternUnion);
                                    (topDisjunctionsScope.groupSpecifiers ??= createMultiMap()).add(groupName, patternUnion);
                                }
                            }
                        }
                        else if (isNegativeAssertion) {
                            // Invalidate all capturing groups in the negative lookahead/lookbehind just closed
                            // such that they won't be matched by backreferences
                            topDisjunctionsScope = undefined;
                        }
                        scanExpectedChar(CharacterCodes.closeParen);
                        break;
                    case CharacterCodes.openBrace:
                        pos++;
                        const digitsStart = pos;
                        scanDigits();
                        const min = tokenValue;
                        let max = "";
                        if (!anyUnicodeModeOrNonAnnexB && !min) {
                            pattern.push(String.fromCharCode(ch));
                            isPreviousTermQuantifiable = true;
                            break;
                        }
                        if (charCodeChecked(pos) === CharacterCodes.comma) {
                            pos++;
                            scanDigits();
                            max = tokenValue;
                            if (!min) {
                                if (max || charCodeChecked(pos) === CharacterCodes.closeBrace) {
                                    error(Diagnostics.Incomplete_quantifier_Digit_expected, digitsStart, 0);
                                }
                                else {
                                    error(Diagnostics.Unexpected_0_Did_you_mean_to_escape_it_with_backslash, start, 1, String.fromCharCode(ch));
                                    pattern.push(text.substring(start, pos));
                                    isPreviousTermQuantifiable = true;
                                    break;
                                }
                            }
                            else if (max) {
                                if (Number.parseInt(min) > Number.parseInt(max) && (anyUnicodeModeOrNonAnnexB || charCodeChecked(pos) === CharacterCodes.closeBrace)) {
                                    error(Diagnostics.Numbers_out_of_order_in_quantifier, digitsStart, pos - digitsStart);
                                }
                            }
                            else if (isPreviousTermQuantifiable) {
                                setLast(pattern, RegExpAnyString);
                            }
                        }
                        else if (!min) {
                            if (anyUnicodeModeOrNonAnnexB) {
                                error(Diagnostics.Unexpected_0_Did_you_mean_to_escape_it_with_backslash, start, 1, String.fromCharCode(ch));
                            }
                            pattern.push(text.substring(start, pos));
                            isPreviousTermQuantifiable = true;
                            break;
                        }
                        if (charCodeChecked(pos) !== CharacterCodes.closeBrace) {
                            if (anyUnicodeModeOrNonAnnexB) {
                                error(Diagnostics._0_expected, pos, 0, String.fromCharCode(CharacterCodes.closeBrace));
                                pos--;
                            }
                            else {
                                pattern.push(text.substring(start, pos));
                                isPreviousTermQuantifiable = true;
                                break;
                            }
                        }
                        if (isPreviousTermQuantifiable) { // error is emitted below
                            const lastTerm = last(pattern);
                            if (lastTerm && lastTerm !== RegExpAnyString) {
                                const minValue = Number.parseInt(min);
                                if (minValue === 0) {
                                    if (lastTerm instanceof Set) {
                                        lastTerm.isPossiblyUndefined = true;
                                        markAllInnerPatternUnionsAsPossiblyUndefined(lastTerm);
                                    }
                                    pattern.pop();
                                }
                                else {
                                    for (let i = 1; i < minValue; i++) {
                                        pattern.push(lastTerm);
                                    }
                                }
                                if (max) {
                                    const maxValue = Number.parseInt(max);
                                    let currPattern = pattern;
                                    for (let i = minValue; i < maxValue; i++) {
                                        const innerPattern = [lastTerm] as unknown as RegularExpressionPattern;
                                        const patternUnion = new Set(["", innerPattern]) as RegularExpressionPatternUnion;
                                        currPattern.push(patternUnion);
                                        currPattern = innerPattern;
                                    }
                                }
                            }
                        }
                    // falls through
                    case CharacterCodes.asterisk:
                    case CharacterCodes.plus:
                    case CharacterCodes.question:
                        pos++;
                        if (charCodeChecked(pos) === CharacterCodes.question) {
                            // Non-greedy
                            pos++;
                        }
                        if (isPreviousTermQuantifiable) {
                            switch (ch) {
                                case CharacterCodes.question:
                                case CharacterCodes.asterisk:
                                    const lastTerm = last(pattern);
                                    if (lastTerm instanceof Set) {
                                        lastTerm.isPossiblyUndefined = true;
                                        markAllInnerPatternUnionsAsPossiblyUndefined(lastTerm);
                                    }
                                    if (ch === CharacterCodes.question) {
                                        setLast(pattern, new Set(["", [lastTerm]]) as RegularExpressionPatternUnion);
                                        break;
                                    }
                                // falls through
                                case CharacterCodes.plus:
                                    setLast(pattern, RegExpAnyString);
                                    break;
                            }
                        }
                        else {
                            error(Diagnostics.There_is_nothing_available_for_repetition, start, pos - start);
                        }
                        isPreviousTermQuantifiable = false;
                        break;
                    case CharacterCodes.dot:
                        pos++;
                        pattern.push(RegExpAnyString);
                        isPreviousTermQuantifiable = true;
                        break;
                    case CharacterCodes.openBracket:
                        pos++;
                        pattern.push(unicodeSetsMode ? scanClassSetExpression() : scanClassRanges());
                        scanExpectedChar(CharacterCodes.closeBracket);
                        isPreviousTermQuantifiable = true;
                        break;
                    case CharacterCodes.closeParen:
                        if (isInGroup) {
                            return pattern;
                        }
                    // falls through
                    case CharacterCodes.closeBracket:
                    case CharacterCodes.closeBrace:
                        if (anyUnicodeModeOrNonAnnexB || ch === CharacterCodes.closeParen) {
                            error(Diagnostics.Unexpected_0_Did_you_mean_to_escape_it_with_backslash, pos, 1, String.fromCharCode(ch));
                        }
                        pos++;
                        pattern.push(String.fromCharCode(ch));
                        isPreviousTermQuantifiable = true;
                        break;
                    case CharacterCodes.slash:
                    case CharacterCodes.bar:
                        return pattern;
                    default:
                        pattern.push(getCharacterEquivalents(scanSourceCharacter()));
                        isPreviousTermQuantifiable = true;
                        break;
                }
            }
        }

        function scanPatternModifiers(currFlags: RegularExpressionFlags): RegularExpressionFlags {
            const isAddModifiers = currFlags === RegularExpressionFlags.None;
            while (true) {
                const ch = codePointChecked(pos);
                if (ch === CharacterCodes.EOF || !isIdentifierPart(ch, languageVersion)) {
                    break;
                }
                const size = charSize(ch);
                const flag = characterCodeToRegularExpressionFlag(ch);
                if (flag === undefined) {
                    error(Diagnostics.Unknown_regular_expression_flag, pos, size);
                }
                else if (currFlags & flag) {
                    error(Diagnostics.Duplicate_regular_expression_flag, pos, size);
                }
                else if (!(flag & RegularExpressionFlags.Modifiers)) {
                    error(Diagnostics.This_regular_expression_flag_cannot_be_toggled_within_a_subpattern, pos, size);
                }
                else {
                    currFlags |= flag;
                    if (flag & RegularExpressionFlags.IgnoreCase) {
                        isCaseInsensitive = isAddModifiers;
                    }
                    checkRegularExpressionFlagAvailability(flag, size);
                }
                pos += size;
            }
            return currFlags;
        }

        function getBackreferencePatternUnion(selector: (disjunctionScope: RegularExpressionDisjunctionScope | undefined) => RegularExpressionPatternUnion | RegularExpressionPatternUnion[] | undefined): RegularExpressionPatternContent {
            disjunctionsScopeStack.push(topDisjunctionsScope);
            const capturingGroups = flatMap(disjunctionsScopeStack, selector);
            disjunctionsScopeStack.pop();
            if (!capturingGroups.length) return "";
            const patternUnion = new Set(capturingGroups as RegularExpressionPattern) as RegularExpressionPatternUnion;
            if (some(capturingGroups, patternUnion => patternUnion.isPossiblyUndefined!)) {
                patternUnion.add("");
            }
            return patternUnion;
        }

        // AtomEscape ::=
        //     | DecimalEscape
        //     | CharacterClassEscape
        //     | CharacterEscape
        //     | 'k<' RegExpIdentifierName '>'
        function scanAtomEscape(): RegularExpressionPatternContent {
            Debug.assertEqual(charCodeUnchecked(pos - 1), CharacterCodes.backslash);
            const ch = charCodeChecked(pos);
            if (ch === CharacterCodes.k && (anyUnicodeModeOrNonAnnexB || hasNamedCapturingGroups)) {
                pos++;
                if (charCodeChecked(pos) === CharacterCodes.lessThan) {
                    pos++;
                    const groupName = scanGroupName(/*isReference*/ true);
                    scanExpectedChar(CharacterCodes.greaterThan);
                    return groupName ? getBackreferencePatternUnion(disjunctionsScope => disjunctionsScope?.groupSpecifiers?.get(groupName)) : "";
                }
                error(Diagnostics.k_must_be_followed_by_a_capturing_group_name_enclosed_in_angle_brackets, pos - 2, 2);
                return getCharacterEquivalents(String.fromCharCode(ch));
            }
            else if (ch === CharacterCodes.q && unicodeSetsMode) {
                pos++;
                error(Diagnostics.q_is_only_available_inside_character_class, pos - 2, 2);
                return getCharacterEquivalents(String.fromCharCode(ch));
            }
            return scanCharacterClassEscape() ?? scanDecimalEscape() ?? scanCharacterEscape(/*atomEscape*/ true);
        }

        // DecimalEscape ::= [1-9] [0-9]*
        function scanDecimalEscape(): RegularExpressionPatternContent | undefined {
            Debug.assertEqual(charCodeUnchecked(pos - 1), CharacterCodes.backslash);
            const ch = charCodeChecked(pos);
            if (ch >= CharacterCodes._1 && ch <= CharacterCodes._9) {
                const start = pos;
                scanDigits();
                const groupNumber = +tokenValue;
                decimalEscapes = append(decimalEscapes, { pos: start, end: pos, value: groupNumber });
                return getBackreferencePatternUnion(disjunctionsScope => disjunctionsScope?.groups?.[groupNumber]);
            }
        }

        // CharacterEscape ::=
        //     | `c` ControlLetter
        //     | IdentityEscape
        //     | (Other sequences handled by `scanEscapeSequence`)
        // IdentityEscape ::=
        //     | '^' | '$' | '/' | '\' | '.' | '*' | '+' | '?' | '(' | ')' | '[' | ']' | '{' | '}' | '|'
        //     | [~UnicodeMode] (any other non-identifier characters)
        function scanCharacterEscape(atomEscape: boolean): RegularExpressionPatternContent {
            Debug.assertEqual(charCodeUnchecked(pos - 1), CharacterCodes.backslash);
            let ch = charCodeChecked(pos);
            switch (ch) {
                case CharacterCodes.EOF:
                    // no need to report an error, the initial scan will already have reported that the RegExp is unterminated.
                    return "\\";
                case CharacterCodes.c:
                    pos++;
                    ch = charCodeChecked(pos);
                    if (isASCIILetter(ch)) {
                        pos++;
                        return String.fromCharCode(ch & 0x1f);
                    }
                    if (anyUnicodeModeOrNonAnnexB) {
                        error(Diagnostics.c_must_be_followed_by_an_ASCII_letter, pos - 2, 2);
                    }
                    else if (atomEscape) {
                        // Annex B treats
                        //
                        //  ExtendedAtom : `\` [lookahead = `c`]
                        //
                        // as the single character `\` when `c` isn't followed by a valid control character
                        pos--;
                        return "\\";
                    }
                    return getCharacterEquivalents(String.fromCharCode(ch));
                case CharacterCodes.caret:
                case CharacterCodes.$:
                case CharacterCodes.slash:
                case CharacterCodes.backslash:
                case CharacterCodes.dot:
                case CharacterCodes.asterisk:
                case CharacterCodes.plus:
                case CharacterCodes.question:
                case CharacterCodes.openParen:
                case CharacterCodes.closeParen:
                case CharacterCodes.openBracket:
                case CharacterCodes.closeBracket:
                case CharacterCodes.openBrace:
                case CharacterCodes.closeBrace:
                case CharacterCodes.bar:
                    pos++;
                    return String.fromCharCode(ch);
                default:
                    pos--;
                    return getCharacterEquivalents(scanEscapeSequence(
                        EscapeSequenceScanningFlags.RegularExpression
                            | (annexB ? EscapeSequenceScanningFlags.AnnexB : 0)
                            | (anyUnicodeMode ? EscapeSequenceScanningFlags.AnyUnicodeMode : 0)
                            | (atomEscape ? EscapeSequenceScanningFlags.AtomEscape : 0),
                    ));
            }
        }

        function scanGroupName(isReference: boolean): string | undefined {
            Debug.assertEqual(charCodeUnchecked(pos - 1), CharacterCodes.lessThan);
            tokenStart = pos;
            scanIdentifier(codePointChecked(pos), languageVersion);
            if (pos === tokenStart) {
                error(Diagnostics.Expected_a_capturing_group_name);
            }
            else if (isReference) {
                groupNameReferences = append(groupNameReferences, { pos: tokenStart, end: pos, name: tokenValue });
                return tokenValue;
            }
            else if (topNamedCapturingGroupsScope?.has(tokenValue) || namedCapturingGroupsScopeStack.some(group => group?.has(tokenValue))) {
                error(Diagnostics.Named_capturing_groups_with_the_same_name_must_be_mutually_exclusive_to_each_other, tokenStart, pos - tokenStart);
            }
            else {
                topNamedCapturingGroupsScope ??= new Set();
                topNamedCapturingGroupsScope.add(tokenValue);
                return tokenValue;
            }
        }

        function isClassContentExit(ch: number) {
            return ch === CharacterCodes.closeBracket || ch === CharacterCodes.EOF || pos >= end;
        }

        function addContentToPatternUnion(patternUnion: RegularExpressionPatternUnion | undefined, content: RegularExpressionPatternContent | undefined): RegularExpressionPatternUnion | undefined {
            if (typeof content === "string") {
                patternUnion?.add(content);
            }
            else if (patternUnion && content instanceof Set) {
                content.forEach(char => {
                    patternUnion!.add(char);
                });
            }
            else if (content === RegExpAnyString) {
                // We cannot determinate the set of characters any more, stop storing
                patternUnion = undefined;
            }
            return patternUnion;
        }

        function addCharacterRangeToPatternUnion(patternUnion: RegularExpressionPatternUnion | undefined, minCharacter: string, maxCharacter: string, startPos: number): RegularExpressionPatternUnion | undefined {
            const minCharacterValue = codePointAt(minCharacter, 0);
            const maxCharacterValue = codePointAt(maxCharacter, 0);
            if (
                minCharacter.length === charSize(minCharacterValue) &&
                maxCharacter.length === charSize(maxCharacterValue)
            ) {
                if (minCharacterValue > maxCharacterValue) {
                    error(Diagnostics.Range_out_of_order_in_character_class, startPos, pos - startPos);
                }
                else if (patternUnion) {
                    for (let i = minCharacterValue + 1; i <= maxCharacterValue; i++) {
                        patternUnion = addContentToPatternUnion(patternUnion, getCharacterEquivalents(String.fromCodePoint(i)));
                    }
                }
            }
            return patternUnion;
        }

        // ClassRanges ::= '^'? (ClassAtom ('-' ClassAtom)?)*
        function scanClassRanges(): RegularExpressionPatternContent {
            Debug.assertEqual(charCodeUnchecked(pos - 1), CharacterCodes.openBracket);
            let patternUnion: RegularExpressionPatternUnion | undefined;
            if (charCodeChecked(pos) === CharacterCodes.caret) {
                // character complement
                pos++;
                // impracticable to determine possible characters, don't initialize patternUnion
            }
            else {
                patternUnion = new Set() as RegularExpressionPatternUnion;
            }
            while (true) {
                const ch = charCodeChecked(pos);
                if (isClassContentExit(ch)) {
                    return patternUnion || RegExpAnyString;
                }
                const minStart = pos;
                const minAtom = scanClassAtom();
                patternUnion = addContentToPatternUnion(patternUnion, minAtom);
                if (charCodeChecked(pos) === CharacterCodes.minus) {
                    pos++;
                    const ch = charCodeChecked(pos);
                    if (isClassContentExit(ch)) {
                        return patternUnion || RegExpAnyString;
                    }
                    const minCharacter = getCharacterFromClassAtomOrOprand(minAtom);
                    if (!minCharacter && anyUnicodeModeOrNonAnnexB) {
                        error(Diagnostics.A_character_class_range_must_not_be_bounded_by_another_character_class, minStart, pos - 1 - minStart);
                        patternUnion?.add("-"); // Treat it as a normal character
                    }
                    const maxStart = pos;
                    const maxAtom = scanClassAtom();
                    const maxCharacter = getCharacterFromClassAtomOrOprand(maxAtom);
                    if (!maxCharacter) {
                        if (anyUnicodeModeOrNonAnnexB) {
                            error(Diagnostics.A_character_class_range_must_not_be_bounded_by_another_character_class, maxStart, pos - maxStart);
                        }
                        patternUnion?.add("-");
                        patternUnion = addContentToPatternUnion(patternUnion, maxAtom);
                        continue;
                    }
                    if (minCharacter) {
                        addCharacterRangeToPatternUnion(patternUnion, minCharacter, maxCharacter, minStart);
                    }
                }
            }
        }

        // Static Semantics: MayContainStrings
        //     ClassUnion: ClassSetOperands.some(ClassSetOperand => ClassSetOperand.MayContainStrings)
        //     ClassIntersection: ClassSetOperands.every(ClassSetOperand => ClassSetOperand.MayContainStrings)
        //     ClassSubtraction: ClassSetOperands[0].MayContainStrings
        //     ClassSetOperand:
        //         || ClassStringDisjunctionContents.MayContainStrings
        //         || CharacterClassEscape.UnicodePropertyValueExpression.LoneUnicodePropertyNameOrValue.MayContainStrings
        //     ClassStringDisjunctionContents: ClassStrings.some(ClassString => ClassString.ClassSetCharacters.length !== 1)
        //     LoneUnicodePropertyNameOrValue: isBinaryUnicodePropertyOfStrings(LoneUnicodePropertyNameOrValue)

        // ClassSetExpression ::= '^'? (ClassUnion | ClassIntersection | ClassSubtraction)
        // ClassUnion ::= (ClassSetRange | ClassSetOperand)*
        // ClassIntersection ::= ClassSetOperand ('&&' ClassSetOperand)+
        // ClassSubtraction ::= ClassSetOperand ('--' ClassSetOperand)+
        // ClassSetRange ::= ClassSetCharacter '-' ClassSetCharacter
        function scanClassSetExpression(): RegularExpressionPatternContent {
            Debug.assertEqual(charCodeUnchecked(pos - 1), CharacterCodes.openBracket);
            let patternUnion: RegularExpressionPatternUnion | undefined;
            let isCharacterComplement = false;
            if (charCodeChecked(pos) === CharacterCodes.caret) {
                pos++;
                isCharacterComplement = true;
                // impracticable to determine possible characters, don't initialize patternUnion
            }
            else {
                patternUnion = new Set() as RegularExpressionPatternUnion;
            }
            let expressionMayContainStrings = false;
            let ch = charCodeChecked(pos);
            if (isClassContentExit(ch)) {
                // An empty character class matches nothing
                return new Set() as RegularExpressionPatternUnion;
            }
            let start = pos;
            let operand!: RegularExpressionPatternContent;
            if (ch === charCodeChecked(pos + 1) && (ch === CharacterCodes.minus || ch === CharacterCodes.ampersand)) {
                error(Diagnostics.Expected_a_class_set_operand);
                mayContainStrings = false;
            }
            else {
                operand = scanClassSetOperand();
                patternUnion = addContentToPatternUnion(patternUnion, operand);
            }
            switch (charCodeChecked(pos)) {
                case CharacterCodes.minus:
                    if (charCodeChecked(pos + 1) === CharacterCodes.minus) {
                        if (isCharacterComplement && mayContainStrings) {
                            error(Diagnostics.Anything_that_would_possibly_match_more_than_a_single_character_is_invalid_inside_a_negated_character_class, start, pos - start);
                        }
                        expressionMayContainStrings = mayContainStrings;
                        patternUnion = scanClassSetSubExpression(patternUnion, ClassSetExpressionType.ClassSubtraction);
                        mayContainStrings = !isCharacterComplement && expressionMayContainStrings;
                        return patternUnion || RegExpAnyString;
                    }
                    break;
                case CharacterCodes.ampersand:
                    if (charCodeChecked(pos + 1) === CharacterCodes.ampersand) {
                        patternUnion = scanClassSetSubExpression(patternUnion, ClassSetExpressionType.ClassIntersection);
                        if (isCharacterComplement && mayContainStrings) {
                            error(Diagnostics.Anything_that_would_possibly_match_more_than_a_single_character_is_invalid_inside_a_negated_character_class, start, pos - start);
                        }
                        expressionMayContainStrings = mayContainStrings;
                        mayContainStrings = !isCharacterComplement && expressionMayContainStrings;
                        return patternUnion || RegExpAnyString;
                    }
                    else {
                        error(Diagnostics.Unexpected_0_Did_you_mean_to_escape_it_with_backslash, pos, 1, String.fromCharCode(ch));
                    }
                    break;
                default:
                    if (isCharacterComplement && mayContainStrings) {
                        error(Diagnostics.Anything_that_would_possibly_match_more_than_a_single_character_is_invalid_inside_a_negated_character_class, start, pos - start);
                    }
                    expressionMayContainStrings = mayContainStrings;
                    break;
            }
            while (true) {
                ch = charCodeChecked(pos);
                if (ch === CharacterCodes.EOF) {
                    break;
                }
                switch (ch) {
                    case CharacterCodes.minus:
                        pos++;
                        ch = charCodeChecked(pos);
                        if (isClassContentExit(ch)) {
                            mayContainStrings = !isCharacterComplement && expressionMayContainStrings;
                            return patternUnion || RegExpAnyString;
                        }
                        if (ch === CharacterCodes.minus) {
                            pos++;
                            error(Diagnostics.Operators_must_not_be_mixed_within_a_character_class_Wrap_it_in_a_nested_class_instead, pos - 2, 2);
                            start = pos - 2;
                            operand = text.slice(start, pos);
                            patternUnion?.add(operand);
                            continue;
                        }
                        else {
                            const minCharacter = getCharacterFromClassAtomOrOprand(operand);
                            if (!minCharacter) {
                                error(Diagnostics.A_character_class_range_must_not_be_bounded_by_another_character_class, start, pos - 1 - start);
                                patternUnion?.add("-");
                            }
                            const secondStart = pos;
                            const secondOperand = scanClassSetOperand();
                            if (isCharacterComplement && mayContainStrings) {
                                error(Diagnostics.Anything_that_would_possibly_match_more_than_a_single_character_is_invalid_inside_a_negated_character_class, secondStart, pos - secondStart);
                            }
                            expressionMayContainStrings ||= mayContainStrings;
                            const maxCharacter = getCharacterFromClassAtomOrOprand(secondOperand);
                            if (!maxCharacter) {
                                error(Diagnostics.A_character_class_range_must_not_be_bounded_by_another_character_class, secondStart, pos - secondStart);
                                patternUnion?.add("-");
                                patternUnion = addContentToPatternUnion(patternUnion, secondOperand);
                                break;
                            }
                            if (minCharacter) {
                                addCharacterRangeToPatternUnion(patternUnion, minCharacter, maxCharacter, start);
                            }
                        }
                        break;
                    case CharacterCodes.ampersand:
                        start = pos;
                        pos++;
                        if (charCodeChecked(pos) === CharacterCodes.ampersand) {
                            pos++;
                            error(Diagnostics.Operators_must_not_be_mixed_within_a_character_class_Wrap_it_in_a_nested_class_instead, pos - 2, 2);
                            if (charCodeChecked(pos) === CharacterCodes.ampersand) {
                                error(Diagnostics.Unexpected_0_Did_you_mean_to_escape_it_with_backslash, pos, 1, String.fromCharCode(ch));
                                pos++;
                            }
                        }
                        else {
                            error(Diagnostics.Unexpected_0_Did_you_mean_to_escape_it_with_backslash, pos - 1, 1, String.fromCharCode(ch));
                        }
                        operand = text.slice(start, pos);
                        patternUnion?.add(operand);
                        continue;
                }
                if (isClassContentExit(charCodeChecked(pos))) {
                    break;
                }
                ch = charCodeChecked(pos);
                start = pos;
                if (ch === charCodeChecked(pos + 1) && (ch === CharacterCodes.minus || ch === CharacterCodes.ampersand)) {
                    error(Diagnostics.Operators_must_not_be_mixed_within_a_character_class_Wrap_it_in_a_nested_class_instead, pos, 2);
                    pos += 2;
                    operand = text.slice(start, pos);
                    patternUnion?.add(operand);
                }
                else {
                    operand = scanClassSetOperand();
                    patternUnion = addContentToPatternUnion(patternUnion, operand);
                }
            }
            mayContainStrings = !isCharacterComplement && expressionMayContainStrings;
            return patternUnion || RegExpAnyString;
        }

        function scanClassSetSubExpression(patternUnion: RegularExpressionPatternUnion | undefined, expressionType: ClassSetExpressionType): RegularExpressionPatternUnion | undefined {
            let expressionMayContainStrings = mayContainStrings;
            while (true) {
                let ch = charCodeChecked(pos);
                if (isClassContentExit(ch)) {
                    break;
                }
                // Provide user-friendly diagnostic messages
                switch (ch) {
                    case CharacterCodes.minus:
                        pos++;
                        if (charCodeChecked(pos) === CharacterCodes.minus) {
                            pos++;
                            if (expressionType !== ClassSetExpressionType.ClassSubtraction) {
                                error(Diagnostics.Operators_must_not_be_mixed_within_a_character_class_Wrap_it_in_a_nested_class_instead, pos - 2, 2);
                            }
                        }
                        else {
                            error(Diagnostics.Operators_must_not_be_mixed_within_a_character_class_Wrap_it_in_a_nested_class_instead, pos - 1, 1);
                        }
                        break;
                    case CharacterCodes.ampersand:
                        pos++;
                        if (charCodeChecked(pos) === CharacterCodes.ampersand) {
                            pos++;
                            if (expressionType !== ClassSetExpressionType.ClassIntersection) {
                                error(Diagnostics.Operators_must_not_be_mixed_within_a_character_class_Wrap_it_in_a_nested_class_instead, pos - 2, 2);
                            }
                            if (charCodeChecked(pos) === CharacterCodes.ampersand) {
                                error(Diagnostics.Unexpected_0_Did_you_mean_to_escape_it_with_backslash, pos, 1, String.fromCharCode(ch));
                                pos++;
                            }
                        }
                        else {
                            error(Diagnostics.Unexpected_0_Did_you_mean_to_escape_it_with_backslash, pos - 1, 1, String.fromCharCode(ch));
                        }
                        break;
                    default:
                        switch (expressionType) {
                            case ClassSetExpressionType.ClassSubtraction:
                                error(Diagnostics._0_expected, pos, 0, "--");
                                break;
                            case ClassSetExpressionType.ClassIntersection:
                                error(Diagnostics._0_expected, pos, 0, "&&");
                                break;
                            default:
                                break;
                        }
                        break;
                }
                ch = charCodeChecked(pos);
                if (isClassContentExit(ch)) {
                    error(Diagnostics.Expected_a_class_set_operand);
                    break;
                }
                const operand = scanClassSetOperand();
                if (patternUnion) {
                    if (typeof operand === "string") {
                        switch (expressionType) {
                            case ClassSetExpressionType.ClassSubtraction:
                                patternUnion.delete(operand);
                                break;
                            case ClassSetExpressionType.ClassIntersection:
                                patternUnion.forEach(element => {
                                    if (element !== operand) patternUnion!.delete(element);
                                });
                                break;
                            default:
                                break;
                        }
                    }
                    else if (operand instanceof Set) {
                        switch (expressionType) {
                            case ClassSetExpressionType.ClassSubtraction:
                                operand.forEach(element => {
                                    patternUnion!.delete(element);
                                });
                                break;
                            case ClassSetExpressionType.ClassIntersection:
                                patternUnion.forEach(element => {
                                    if (!operand.has(element)) patternUnion!.delete(element);
                                });
                                break;
                            default:
                                break;
                        }
                    }
                    else if (operand === RegExpAnyString) {
                        patternUnion = undefined;
                    }
                }
                // Used only if expressionType is Intersection
                expressionMayContainStrings &&= mayContainStrings;
            }
            mayContainStrings = expressionMayContainStrings;
            return patternUnion;
        }

        // ClassSetOperand ::=
        //     | '[' ClassSetExpression ']'
        //     | '\' CharacterClassEscape
        //     | '\q{' ClassStringDisjunctionContents '}'
        //     | ClassSetCharacter
        function scanClassSetOperand(): RegularExpressionPatternContent {
            mayContainStrings = false;
            switch (charCodeChecked(pos)) {
                case CharacterCodes.EOF:
                    return "";
                case CharacterCodes.openBracket:
                    pos++;
                    const patternUnion = scanClassSetExpression();
                    scanExpectedChar(CharacterCodes.closeBracket);
                    return patternUnion;
                case CharacterCodes.backslash:
                    pos++;
                    const characterClassEscape = scanCharacterClassEscape();
                    if (characterClassEscape) {
                        return characterClassEscape;
                    }
                    else if (charCodeChecked(pos) === CharacterCodes.q) {
                        pos++;
                        if (charCodeChecked(pos) === CharacterCodes.openBrace) {
                            pos++;
                            const patternUnion = scanClassStringDisjunctionContents();
                            scanExpectedChar(CharacterCodes.closeBrace);
                            return patternUnion;
                        }
                        else {
                            error(Diagnostics.q_must_be_followed_by_string_alternatives_enclosed_in_braces, pos - 2, 2);
                            return getCharacterEquivalents("q");
                        }
                    }
                    pos--;
                // falls through
                default:
                    return scanClassSetCharacter();
            }
        }

        // ClassStringDisjunctionContents ::= ClassSetCharacter* ('|' ClassSetCharacter*)*
        function scanClassStringDisjunctionContents(): RegularExpressionPatternUnion {
            Debug.assertEqual(charCodeUnchecked(pos - 1), CharacterCodes.openBrace);
            const patternUnion = new Set() as RegularExpressionPatternUnion;
            let pattern = [] as unknown as RegularExpressionPattern;
            while (true) {
                const ch = charCodeChecked(pos);
                switch (ch) {
                    case CharacterCodes.EOF:
                    case CharacterCodes.closeBrace:
                    case CharacterCodes.bar:
                        if (pattern.length !== 1) {
                            mayContainStrings = true;
                        }
                        patternUnion.add(pattern);
                        if (ch !== CharacterCodes.bar) {
                            return patternUnion;
                        }
                        pos++;
                        start = pos;
                        pattern = [] as unknown as RegularExpressionPattern;
                        break;
                    default:
                        pattern.push(scanClassSetCharacter());
                        break;
                }
            }
        }

        // ClassSetCharacter ::=
        //     | SourceCharacter -- ClassSetSyntaxCharacter -- ClassSetReservedDoublePunctuator
        //     | '\' (CharacterEscape | ClassSetReservedPunctuator | 'b')
        function scanClassSetCharacter(): RegularExpressionPatternContent {
            const ch = charCodeChecked(pos);
            if (ch === CharacterCodes.EOF) {
                // no need to report an error, the initial scan will already have reported that the RegExp is unterminated.
                return "";
            }
            if (ch === CharacterCodes.backslash) {
                pos++;
                const ch = charCodeChecked(pos);
                switch (ch) {
                    case CharacterCodes.b:
                        pos++;
                        return "\b";
                    case CharacterCodes.ampersand:
                    case CharacterCodes.minus:
                    case CharacterCodes.exclamation:
                    case CharacterCodes.hash:
                    case CharacterCodes.percent:
                    case CharacterCodes.comma:
                    case CharacterCodes.colon:
                    case CharacterCodes.semicolon:
                    case CharacterCodes.lessThan:
                    case CharacterCodes.equals:
                    case CharacterCodes.greaterThan:
                    case CharacterCodes.at:
                    case CharacterCodes.backtick:
                    case CharacterCodes.tilde:
                        pos++;
                        return String.fromCharCode(ch);
                    default:
                        return scanCharacterEscape(/*atomEscape*/ false);
                }
            }
            else if (ch === charCodeChecked(pos + 1)) {
                switch (ch) {
                    case CharacterCodes.ampersand:
                    case CharacterCodes.exclamation:
                    case CharacterCodes.hash:
                    case CharacterCodes.percent:
                    case CharacterCodes.asterisk:
                    case CharacterCodes.plus:
                    case CharacterCodes.comma:
                    case CharacterCodes.dot:
                    case CharacterCodes.colon:
                    case CharacterCodes.semicolon:
                    case CharacterCodes.lessThan:
                    case CharacterCodes.equals:
                    case CharacterCodes.greaterThan:
                    case CharacterCodes.question:
                    case CharacterCodes.at:
                    case CharacterCodes.backtick:
                    case CharacterCodes.tilde:
                        error(Diagnostics.A_character_class_must_not_contain_a_reserved_double_punctuator_Did_you_mean_to_escape_it_with_backslash, pos, 2);
                        pos += 2;
                        return text.substring(pos - 2, pos);
                }
            }
            switch (ch) {
                case CharacterCodes.slash:
                case CharacterCodes.openParen:
                case CharacterCodes.closeParen:
                case CharacterCodes.openBracket:
                case CharacterCodes.closeBracket:
                case CharacterCodes.openBrace:
                case CharacterCodes.closeBrace:
                case CharacterCodes.minus:
                case CharacterCodes.bar:
                    error(Diagnostics.Unexpected_0_Did_you_mean_to_escape_it_with_backslash, pos, 1, String.fromCharCode(ch));
                    pos++;
                    return String.fromCharCode(ch);
            }
            return getCharacterEquivalents(scanSourceCharacter());
        }

        // ClassAtom ::=
        //     | SourceCharacter but not one of '\' or ']'
        //     | '\' ClassEscape
        // ClassEscape ::=
        //     | 'b'
        //     | '-'
        //     | CharacterClassEscape
        //     | CharacterEscape
        function scanClassAtom(): RegularExpressionPatternContent {
            if (charCodeChecked(pos) === CharacterCodes.backslash) {
                pos++;
                const ch = charCodeChecked(pos);
                switch (ch) {
                    case CharacterCodes.b:
                        pos++;
                        return "\b";
                    case CharacterCodes.minus:
                        pos++;
                        return String.fromCharCode(ch);
                    case CharacterCodes.k:
                        if (anyUnicodeModeOrNonAnnexB || hasNamedCapturingGroups) {
                            pos++;
                            error(Diagnostics.k_is_only_available_outside_character_class, pos - 2, 2);
                            return getCharacterEquivalents(String.fromCharCode(ch));
                        }
                    // falls through
                    default:
                        return scanCharacterClassEscape() || scanCharacterEscape(/*atomEscape*/ false);
                }
            }
            else {
                return getCharacterEquivalents(scanSourceCharacter());
            }
        }

        // CharacterClassEscape ::=
        //     | 'd' | 'D' | 's' | 'S' | 'w' | 'W'
        //     | [+UnicodeMode] ('P' | 'p') '{' UnicodePropertyValueExpression '}'
        function scanCharacterClassEscape(): RegularExpressionPatternContent | undefined {
            Debug.assertEqual(charCodeUnchecked(pos - 1), CharacterCodes.backslash);
            let isCharacterComplement = false;
            const start = pos - 1;
            const ch = charCodeChecked(pos);
            switch (ch) {
                case CharacterCodes.d:
                    pos++;
                    // Too frequently used, special case it
                    return RegExpDigits;
                case CharacterCodes.D:
                case CharacterCodes.s:
                case CharacterCodes.S:
                case CharacterCodes.w:
                case CharacterCodes.W:
                    pos++;
                    return RegExpAnyString;
                case CharacterCodes.P:
                    isCharacterComplement = true;
                // falls through
                case CharacterCodes.p:
                    pos++;
                    if (charCodeChecked(pos) === CharacterCodes.openBrace) {
                        pos++;
                        const propertyNameOrValueStart = pos;
                        const propertyNameOrValue = scanWordCharacters();
                        if (charCodeChecked(pos) === CharacterCodes.equals) {
                            const propertyName = nonBinaryUnicodeProperties.get(propertyNameOrValue);
                            if (pos === propertyNameOrValueStart) {
                                error(Diagnostics.Expected_a_Unicode_property_name);
                            }
                            else if (propertyName === undefined) {
                                error(Diagnostics.Unknown_Unicode_property_name, propertyNameOrValueStart, pos - propertyNameOrValueStart);
                                const suggestion = getSpellingSuggestion(propertyNameOrValue, nonBinaryUnicodeProperties.keys(), identity);
                                if (suggestion) {
                                    error(Diagnostics.Did_you_mean_0, propertyNameOrValueStart, pos - propertyNameOrValueStart, suggestion);
                                }
                            }
                            pos++;
                            const propertyValueStart = pos;
                            const propertyValue = scanWordCharacters();
                            if (pos === propertyValueStart) {
                                error(Diagnostics.Expected_a_Unicode_property_value);
                            }
                            else if (propertyName !== undefined && !valuesOfNonBinaryUnicodeProperties[propertyName].has(propertyValue)) {
                                error(Diagnostics.Unknown_Unicode_property_value, propertyValueStart, pos - propertyValueStart);
                                const suggestion = getSpellingSuggestion(propertyValue, valuesOfNonBinaryUnicodeProperties[propertyName], identity);
                                if (suggestion) {
                                    error(Diagnostics.Did_you_mean_0, propertyValueStart, pos - propertyValueStart, suggestion);
                                }
                            }
                        }
                        else {
                            if (pos === propertyNameOrValueStart) {
                                error(Diagnostics.Expected_a_Unicode_property_name_or_value);
                            }
                            else if (binaryUnicodePropertiesOfStrings.has(propertyNameOrValue)) {
                                if (!unicodeSetsMode) {
                                    error(Diagnostics.Any_Unicode_property_that_would_possibly_match_more_than_a_single_character_is_only_available_when_the_Unicode_Sets_v_flag_is_set, propertyNameOrValueStart, pos - propertyNameOrValueStart);
                                }
                                else if (isCharacterComplement) {
                                    error(Diagnostics.Anything_that_would_possibly_match_more_than_a_single_character_is_invalid_inside_a_negated_character_class, propertyNameOrValueStart, pos - propertyNameOrValueStart);
                                }
                                else {
                                    mayContainStrings = true;
                                }
                            }
                            else if (!valuesOfNonBinaryUnicodeProperties.General_Category.has(propertyNameOrValue) && !binaryUnicodeProperties.has(propertyNameOrValue)) {
                                error(Diagnostics.Unknown_Unicode_property_name_or_value, propertyNameOrValueStart, pos - propertyNameOrValueStart);
                                const suggestion = getSpellingSuggestion(propertyNameOrValue, [...valuesOfNonBinaryUnicodeProperties.General_Category, ...binaryUnicodeProperties, ...binaryUnicodePropertiesOfStrings], identity);
                                if (suggestion) {
                                    error(Diagnostics.Did_you_mean_0, propertyNameOrValueStart, pos - propertyNameOrValueStart, suggestion);
                                }
                            }
                        }
                        scanExpectedChar(CharacterCodes.closeBrace);
                        if (!anyUnicodeMode) {
                            error(Diagnostics.Unicode_property_value_expressions_are_only_available_when_the_Unicode_u_flag_or_the_Unicode_Sets_v_flag_is_set, start, pos - start);
                        }
                        return RegExpAnyString;
                    }
                    else if (anyUnicodeModeOrNonAnnexB) {
                        error(Diagnostics._0_must_be_followed_by_a_Unicode_property_value_expression_enclosed_in_braces, pos - 2, 2, String.fromCharCode(ch));
                        return getCharacterEquivalents(String.fromCharCode(ch));
                    }
                    else {
                        pos--;
                    }
            }
        }

        function scanWordCharacters(): string {
            let value = "";
            while (true) {
                const ch = charCodeChecked(pos);
                if (ch === CharacterCodes.EOF || !isWordCharacter(ch)) {
                    break;
                }
                value += String.fromCharCode(ch);
                pos++;
            }
            return value;
        }

        function scanSourceCharacter(): string {
            const size = anyUnicodeMode ? charSize(codePointChecked(pos)) : 1;
            pos += size;
            return size > 0 ? text.substring(pos - size, pos) : "";
        }

        function getCharacterEquivalents(ch: string): RegularExpressionPatternContent {
            if (!isCaseInsensitive || ch.length !== charSize(codePointAt(ch, 0))) return ch;
            // In any Unicode mode, a character is canonicalized by the `toCasefold` method of the Unicode Default Case Folding algorithm.
            // The simple case folding variant of the algorithm does not perform a full (one-to-many characters) case folding and
            // only takes account of the Simple_Case_Folding property.
            // In non-Unicode mode, the `toUppercase` method of the Unicode Default Case Conversion algorithm is used instead.
            // However, it does not perform a full case conversion and only takes account of the Simple_Uppercase_Mapping property.
            // See `caseFoldEquivalents` and `upperCaseEquivalents` for full descriptions.
            const equivalents = anyUnicodeMode ? caseFoldEquivalents[codePointAt(ch, 0)] : upperCaseEquivalents[ch.charCodeAt(0)];
            if (!equivalents) return ch;
            const equivalentsSet = (typeof equivalents === "number"
                ? new Set([ch, String.fromCodePoint(equivalents)])
                : new Set([ch, ...String.fromCodePoint(...equivalents)])) as RegularExpressionPatternUnion;
            equivalentsSet.isCharacterEquivalents = true;
            return equivalentsSet;
        }

        function getCharacterFromClassAtomOrOprand(content: RegularExpressionPatternContent) {
            if (typeof content === "string") return content;
            if (content instanceof Set && content.isCharacterEquivalents) {
                for (const ch of content) {
                    return ch as string;
                }
            }
        }

        function scanExpectedChar(ch: CharacterCodes) {
            if (charCodeChecked(pos) === ch) {
                pos++;
            }
            else {
                error(Diagnostics._0_expected, pos, 0, String.fromCharCode(ch));
            }
        }

        regExpCapturingGroups[0] = scanDisjunction(/*isInGroup*/ false);

        forEach(groupNameReferences, reference => {
            if (!regExpCapturingGroupSpecifiers?.has(reference.name)) {
                error(Diagnostics.There_is_no_capturing_group_named_0_in_this_regular_expression, reference.pos, reference.end - reference.pos, reference.name);
                if (regExpCapturingGroupSpecifiers) {
                    const suggestion = getSpellingSuggestion(reference.name, regExpCapturingGroupSpecifiers, ([groupName]) => groupName);
                    if (suggestion) {
                        error(Diagnostics.Did_you_mean_0, reference.pos, reference.end - reference.pos, suggestion);
                    }
                }
            }
        });
        forEach(decimalEscapes, escape => {
            // Although a DecimalEscape with a value greater than the number of capturing groups
            // is treated as either a LegacyOctalEscapeSequence or an IdentityEscape in Annex B,
            // an error is nevertheless reported since it's most likely a mistake.
            if (escape.value > numberOfCapturingGroups) {
                if (numberOfCapturingGroups) {
                    error(Diagnostics.This_backreference_refers_to_a_group_that_does_not_exist_There_are_only_0_capturing_groups_in_this_regular_expression, escape.pos, escape.end - escape.pos, numberOfCapturingGroups);
                }
                else {
                    error(Diagnostics.This_backreference_refers_to_a_group_that_does_not_exist_There_are_no_capturing_groups_in_this_regular_expression, escape.pos, escape.end - escape.pos);
                }
            }
        });
    }

    function checkRegularExpressionFlagAvailability(flag: RegularExpressionFlags, size: number) {
        const availableFrom = regExpFlagToFirstAvailableLanguageVersion.get(flag);
        if (availableFrom && languageVersion < availableFrom) {
            error(Diagnostics.This_regular_expression_flag_is_only_available_when_targeting_0_or_later, pos, size, getNameOfScriptTarget(availableFrom));
        }
    }

    function appendIfCommentDirective(
        commentDirectives: CommentDirective[] | undefined,
        text: string,
        commentDirectiveRegEx: RegExp,
        lineStart: number,
    ) {
        const type = getDirectiveFromComment(text.trimStart(), commentDirectiveRegEx);
        if (type === undefined) {
            return commentDirectives;
        }

        return append(
            commentDirectives,
            {
                range: { pos: lineStart, end: pos },
                type,
            },
        );
    }

    function getDirectiveFromComment(text: string, commentDirectiveRegEx: RegExp) {
        const match = commentDirectiveRegEx.exec(text);
        if (!match) {
            return undefined;
        }

        switch (match[1]) {
            case "ts-expect-error":
                return CommentDirectiveType.ExpectError;

            case "ts-ignore":
                return CommentDirectiveType.Ignore;
        }

        return undefined;
    }

    /**
     * Unconditionally back up and scan a template expression portion.
     */
    function reScanTemplateToken(isTaggedTemplate: boolean): SyntaxKind {
        pos = tokenStart;
        return token = scanTemplateAndSetTokenValue(!isTaggedTemplate);
    }

    function reScanTemplateHeadOrNoSubstitutionTemplate(): SyntaxKind {
        pos = tokenStart;
        return token = scanTemplateAndSetTokenValue(/*shouldEmitInvalidEscapeError*/ true);
    }

    function reScanJsxToken(allowMultilineJsxText = true): JsxTokenSyntaxKind {
        pos = tokenStart = fullStartPos;
        return token = scanJsxToken(allowMultilineJsxText);
    }

    function reScanLessThanToken(): SyntaxKind {
        if (token === SyntaxKind.LessThanLessThanToken) {
            pos = tokenStart + 1;
            return token = SyntaxKind.LessThanToken;
        }
        return token;
    }

    function reScanHashToken(): SyntaxKind {
        if (token === SyntaxKind.PrivateIdentifier) {
            pos = tokenStart + 1;
            return token = SyntaxKind.HashToken;
        }
        return token;
    }

    function reScanQuestionToken(): SyntaxKind {
        Debug.assert(token === SyntaxKind.QuestionQuestionToken, "'reScanQuestionToken' should only be called on a '??'");
        pos = tokenStart + 1;
        return token = SyntaxKind.QuestionToken;
    }

    function scanJsxToken(allowMultilineJsxText = true): JsxTokenSyntaxKind {
        fullStartPos = tokenStart = pos;

        if (pos >= end) {
            return token = SyntaxKind.EndOfFileToken;
        }

        let char = charCodeUnchecked(pos);
        if (char === CharacterCodes.lessThan) {
            if (charCodeUnchecked(pos + 1) === CharacterCodes.slash) {
                pos += 2;
                return token = SyntaxKind.LessThanSlashToken;
            }
            pos++;
            return token = SyntaxKind.LessThanToken;
        }

        if (char === CharacterCodes.openBrace) {
            pos++;
            return token = SyntaxKind.OpenBraceToken;
        }

        // First non-whitespace character on this line.
        let firstNonWhitespace = 0;

        // These initial values are special because the first line is:
        // firstNonWhitespace = 0 to indicate that we want leading whitespace,

        while (pos < end) {
            char = charCodeUnchecked(pos);
            if (char === CharacterCodes.openBrace) {
                break;
            }
            if (char === CharacterCodes.lessThan) {
                if (isConflictMarkerTrivia(text, pos)) {
                    pos = scanConflictMarkerTrivia(text, pos, error);
                    return token = SyntaxKind.ConflictMarkerTrivia;
                }
                break;
            }
            if (char === CharacterCodes.greaterThan) {
                error(Diagnostics.Unexpected_token_Did_you_mean_or_gt, pos, 1);
            }
            if (char === CharacterCodes.closeBrace) {
                error(Diagnostics.Unexpected_token_Did_you_mean_or_rbrace, pos, 1);
            }

            // FirstNonWhitespace is 0, then we only see whitespaces so far. If we see a linebreak, we want to ignore that whitespaces.
            // i.e (- : whitespace)
            //      <div>----
            //      </div> becomes <div></div>
            //
            //      <div>----</div> becomes <div>----</div>
            if (isLineBreak(char) && firstNonWhitespace === 0) {
                firstNonWhitespace = -1;
            }
            else if (!allowMultilineJsxText && isLineBreak(char) && firstNonWhitespace > 0) {
                // Stop JsxText on each line during formatting. This allows the formatter to
                // indent each line correctly.
                break;
            }
            else if (!isWhiteSpaceLike(char)) {
                firstNonWhitespace = pos;
            }

            pos++;
        }

        tokenValue = text.substring(fullStartPos, pos);

        return firstNonWhitespace === -1 ? SyntaxKind.JsxTextAllWhiteSpaces : SyntaxKind.JsxText;
    }

    // Scans a JSX identifier; these differ from normal identifiers in that
    // they allow dashes
    function scanJsxIdentifier(): SyntaxKind {
        if (tokenIsIdentifierOrKeyword(token)) {
            // An identifier or keyword has already been parsed - check for a `-` or a single instance of `:` and then append it and
            // everything after it to the token
            // Do note that this means that `scanJsxIdentifier` effectively _mutates_ the visible token without advancing to a new token
            // Any caller should be expecting this behavior and should only read the pos or token value after calling it.
            while (pos < end) {
                const ch = charCodeUnchecked(pos);
                if (ch === CharacterCodes.minus) {
                    tokenValue += "-";
                    pos++;
                    continue;
                }
                const oldPos = pos;
                tokenValue += scanIdentifierParts(); // reuse `scanIdentifierParts` so unicode escapes are handled
                if (pos === oldPos) {
                    break;
                }
            }
            return getIdentifierToken();
        }
        return token;
    }

    function scanJsxAttributeValue(): SyntaxKind {
        fullStartPos = pos;

        switch (charCodeUnchecked(pos)) {
            case CharacterCodes.doubleQuote:
            case CharacterCodes.singleQuote:
                tokenValue = scanString(/*jsxAttributeString*/ true);
                return token = SyntaxKind.StringLiteral;
            default:
                // If this scans anything other than `{`, it's a parse error.
                return scan();
        }
    }

    function reScanJsxAttributeValue(): SyntaxKind {
        pos = tokenStart = fullStartPos;
        return scanJsxAttributeValue();
    }

    function scanJSDocCommentTextToken(inBackticks: boolean): JSDocSyntaxKind | SyntaxKind.JSDocCommentTextToken {
        fullStartPos = tokenStart = pos;
        tokenFlags = TokenFlags.None;
        if (pos >= end) {
            return token = SyntaxKind.EndOfFileToken;
        }
        for (let ch = charCodeUnchecked(pos); pos < end && (!isLineBreak(ch) && ch !== CharacterCodes.backtick); ch = codePointUnchecked(++pos)) {
            if (!inBackticks) {
                if (ch === CharacterCodes.openBrace) {
                    break;
                }
                else if (
                    ch === CharacterCodes.at
                    && pos - 1 >= 0 && isWhiteSpaceSingleLine(charCodeUnchecked(pos - 1))
                    && !(pos + 1 < end && isWhiteSpaceLike(charCodeUnchecked(pos + 1)))
                ) {
                    // @ doesn't start a new tag inside ``, and elsewhere, only after whitespace and before non-whitespace
                    break;
                }
            }
        }
        if (pos === tokenStart) {
            return scanJsDocToken();
        }
        tokenValue = text.substring(tokenStart, pos);
        return token = SyntaxKind.JSDocCommentTextToken;
    }

    function scanJsDocToken(): JSDocSyntaxKind {
        fullStartPos = tokenStart = pos;
        tokenFlags = TokenFlags.None;
        if (pos >= end) {
            return token = SyntaxKind.EndOfFileToken;
        }

        const ch = codePointUnchecked(pos);
        pos += charSize(ch);
        switch (ch) {
            case CharacterCodes.tab:
            case CharacterCodes.verticalTab:
            case CharacterCodes.formFeed:
            case CharacterCodes.space:
                while (pos < end && isWhiteSpaceSingleLine(charCodeUnchecked(pos))) {
                    pos++;
                }
                return token = SyntaxKind.WhitespaceTrivia;
            case CharacterCodes.at:
                return token = SyntaxKind.AtToken;
            case CharacterCodes.carriageReturn:
                if (charCodeUnchecked(pos) === CharacterCodes.lineFeed) {
                    pos++;
                }
                // falls through
            case CharacterCodes.lineFeed:
                tokenFlags |= TokenFlags.PrecedingLineBreak;
                return token = SyntaxKind.NewLineTrivia;
            case CharacterCodes.asterisk:
                return token = SyntaxKind.AsteriskToken;
            case CharacterCodes.openBrace:
                return token = SyntaxKind.OpenBraceToken;
            case CharacterCodes.closeBrace:
                return token = SyntaxKind.CloseBraceToken;
            case CharacterCodes.openBracket:
                return token = SyntaxKind.OpenBracketToken;
            case CharacterCodes.closeBracket:
                return token = SyntaxKind.CloseBracketToken;
            case CharacterCodes.openParen:
                return token = SyntaxKind.OpenParenToken;
            case CharacterCodes.closeParen:
                return token = SyntaxKind.CloseParenToken;
            case CharacterCodes.lessThan:
                return token = SyntaxKind.LessThanToken;
            case CharacterCodes.greaterThan:
                return token = SyntaxKind.GreaterThanToken;
            case CharacterCodes.equals:
                return token = SyntaxKind.EqualsToken;
            case CharacterCodes.comma:
                return token = SyntaxKind.CommaToken;
            case CharacterCodes.dot:
                return token = SyntaxKind.DotToken;
            case CharacterCodes.backtick:
                return token = SyntaxKind.BacktickToken;
            case CharacterCodes.hash:
                return token = SyntaxKind.HashToken;
            case CharacterCodes.backslash:
                pos--;
                const extendedCookedChar = peekExtendedUnicodeEscape();
                if (extendedCookedChar >= 0 && isIdentifierStart(extendedCookedChar, languageVersion)) {
                    tokenValue = scanExtendedUnicodeEscape(/*shouldEmitInvalidEscapeError*/ true) + scanIdentifierParts();
                    return token = getIdentifierToken();
                }

                const cookedChar = peekUnicodeEscape();
                if (cookedChar >= 0 && isIdentifierStart(cookedChar, languageVersion)) {
                    pos += 6;
                    tokenFlags |= TokenFlags.UnicodeEscape;
                    tokenValue = String.fromCharCode(cookedChar) + scanIdentifierParts();
                    return token = getIdentifierToken();
                }
                pos++;
                return token = SyntaxKind.Unknown;
        }

        if (isIdentifierStart(ch, languageVersion)) {
            let char = ch;
            while (pos < end && isIdentifierPart(char = codePointUnchecked(pos), languageVersion) || char === CharacterCodes.minus) pos += charSize(char);
            tokenValue = text.substring(tokenStart, pos);
            if (char === CharacterCodes.backslash) {
                tokenValue += scanIdentifierParts();
            }
            return token = getIdentifierToken();
        }
        else {
            return token = SyntaxKind.Unknown;
        }
    }

    function speculationHelper<T>(callback: () => T, isLookahead: boolean): T {
        const savePos = pos;
        const saveStartPos = fullStartPos;
        const saveTokenPos = tokenStart;
        const saveToken = token;
        const saveTokenValue = tokenValue;
        const saveTokenFlags = tokenFlags;
        const result = callback();

        // If our callback returned something 'falsy' or we're just looking ahead,
        // then unconditionally restore us to where we were.
        if (!result || isLookahead) {
            pos = savePos;
            fullStartPos = saveStartPos;
            tokenStart = saveTokenPos;
            token = saveToken;
            tokenValue = saveTokenValue;
            tokenFlags = saveTokenFlags;
        }
        return result;
    }

    function scanRange<T>(start: number, length: number, callback: () => T): T {
        const saveEnd = end;
        const savePos = pos;
        const saveStartPos = fullStartPos;
        const saveTokenPos = tokenStart;
        const saveToken = token;
        const saveTokenValue = tokenValue;
        const saveTokenFlags = tokenFlags;
        const saveErrorExpectations = commentDirectives;

        setText(text, start, length);
        const result = callback();

        end = saveEnd;
        pos = savePos;
        fullStartPos = saveStartPos;
        tokenStart = saveTokenPos;
        token = saveToken;
        tokenValue = saveTokenValue;
        tokenFlags = saveTokenFlags;
        commentDirectives = saveErrorExpectations;

        return result;
    }

    function lookAhead<T>(callback: () => T): T {
        return speculationHelper(callback, /*isLookahead*/ true);
    }

    function tryScan<T>(callback: () => T): T {
        return speculationHelper(callback, /*isLookahead*/ false);
    }

    function getText(): string {
        return text;
    }

    function clearCommentDirectives() {
        commentDirectives = undefined;
    }

    function setText(newText: string | undefined, start: number | undefined, length: number | undefined) {
        text = newText || "";
        end = length === undefined ? text.length : start! + length;
        resetTokenState(start || 0);
    }

    function setOnError(errorCallback: ErrorCallback | undefined) {
        onError = errorCallback;
    }

    function setScriptTarget(scriptTarget: ScriptTarget) {
        languageVersion = scriptTarget;
    }

    function setLanguageVariant(variant: LanguageVariant) {
        languageVariant = variant;
    }

    function setScriptKind(kind: ScriptKind) {
        scriptKind = kind;
    }

    function setJSDocParsingMode(kind: JSDocParsingMode) {
        jsDocParsingMode = kind;
    }

    function resetTokenState(position: number) {
        Debug.assert(position >= 0);
        pos = position;
        fullStartPos = position;
        tokenStart = position;
        token = SyntaxKind.Unknown;
        tokenValue = undefined!;
        tokenFlags = TokenFlags.None;
    }

    function setSkipJsDocLeadingAsterisks(skip: boolean) {
        skipJsDocLeadingAsterisks += skip ? 1 : -1;
    }
}

function codePointAt(s: string, i: number): number {
    // TODO(jakebailey): this is wrong and should have ?? 0; but all users are okay with it
    return s.codePointAt(i)!;
}

function charSize(ch: number) {
    if (ch >= 0x10000) {
        return 2;
    }
    if (ch === CharacterCodes.EOF) {
        return 0;
    }
    return 1;
}

// Derived from the 10.1.1 UTF16Encoding of the ES6 Spec.
function utf16EncodeAsStringFallback(codePoint: number) {
    Debug.assert(0x0 <= codePoint && codePoint <= 0x10FFFF);

    if (codePoint <= 65535) {
        return String.fromCharCode(codePoint);
    }

    const codeUnit1 = Math.floor((codePoint - 65536) / 1024) + 0xD800;
    const codeUnit2 = ((codePoint - 65536) % 1024) + 0xDC00;

    return String.fromCharCode(codeUnit1, codeUnit2);
}

const utf16EncodeAsStringWorker: (codePoint: number) => string = (String as any).fromCodePoint ? codePoint => (String as any).fromCodePoint(codePoint) : utf16EncodeAsStringFallback;

/** @internal */
export function utf16EncodeAsString(codePoint: number): string {
    return utf16EncodeAsStringWorker(codePoint);
}

// Table 66: Non-binary Unicode property aliases and their canonical property names
// https://tc39.es/ecma262/#table-nonbinary-unicode-properties
// dprint-ignore
const nonBinaryUnicodeProperties = new Map(Object.entries({
    General_Category: "General_Category",
    gc: "General_Category",
    Script: "Script",
    sc: "Script",
    Script_Extensions: "Script_Extensions",
    scx: "Script_Extensions",
} as const));

// Table 67: Binary Unicode property aliases and their canonical property names
// https://tc39.es/ecma262/#table-binary-unicode-properties
// dprint-ignore
const binaryUnicodeProperties = new Set(["ASCII", "ASCII_Hex_Digit", "AHex", "Alphabetic", "Alpha", "Any", "Assigned", "Bidi_Control", "Bidi_C", "Bidi_Mirrored", "Bidi_M", "Case_Ignorable", "CI", "Cased", "Changes_When_Casefolded", "CWCF", "Changes_When_Casemapped", "CWCM", "Changes_When_Lowercased", "CWL", "Changes_When_NFKC_Casefolded", "CWKCF", "Changes_When_Titlecased", "CWT", "Changes_When_Uppercased", "CWU", "Dash", "Default_Ignorable_Code_Point", "DI", "Deprecated", "Dep", "Diacritic", "Dia", "Emoji", "Emoji_Component", "EComp", "Emoji_Modifier", "EMod", "Emoji_Modifier_Base", "EBase", "Emoji_Presentation", "EPres", "Extended_Pictographic", "ExtPict", "Extender", "Ext", "Grapheme_Base", "Gr_Base", "Grapheme_Extend", "Gr_Ext", "Hex_Digit", "Hex", "IDS_Binary_Operator", "IDSB", "IDS_Trinary_Operator", "IDST", "ID_Continue", "IDC", "ID_Start", "IDS", "Ideographic", "Ideo", "Join_Control", "Join_C", "Logical_Order_Exception", "LOE", "Lowercase", "Lower", "Math", "Noncharacter_Code_Point", "NChar", "Pattern_Syntax", "Pat_Syn", "Pattern_White_Space", "Pat_WS", "Quotation_Mark", "QMark", "Radical", "Regional_Indicator", "RI", "Sentence_Terminal", "STerm", "Soft_Dotted", "SD", "Terminal_Punctuation", "Term", "Unified_Ideograph", "UIdeo", "Uppercase", "Upper", "Variation_Selector", "VS", "White_Space", "space", "XID_Continue", "XIDC", "XID_Start", "XIDS"]);

// Table 68: Binary Unicode properties of strings
// https://tc39.es/ecma262/#table-binary-unicode-properties-of-strings
// dprint-ignore
const binaryUnicodePropertiesOfStrings = new Set(["Basic_Emoji", "Emoji_Keycap_Sequence", "RGI_Emoji_Modifier_Sequence", "RGI_Emoji_Flag_Sequence", "RGI_Emoji_Tag_Sequence", "RGI_Emoji_ZWJ_Sequence", "RGI_Emoji"]);

// Unicode 15.1
// dprint-ignore
const valuesOfNonBinaryUnicodeProperties = {
    General_Category: new Set(["C", "Other", "Cc", "Control", "cntrl", "Cf", "Format", "Cn", "Unassigned", "Co", "Private_Use", "Cs", "Surrogate", "L", "Letter", "LC", "Cased_Letter", "Ll", "Lowercase_Letter", "Lm", "Modifier_Letter", "Lo", "Other_Letter", "Lt", "Titlecase_Letter", "Lu", "Uppercase_Letter", "M", "Mark", "Combining_Mark", "Mc", "Spacing_Mark", "Me", "Enclosing_Mark", "Mn", "Nonspacing_Mark", "N", "Number", "Nd", "Decimal_Number", "digit", "Nl", "Letter_Number", "No", "Other_Number", "P", "Punctuation", "punct", "Pc", "Connector_Punctuation", "Pd", "Dash_Punctuation", "Pe", "Close_Punctuation", "Pf", "Final_Punctuation", "Pi", "Initial_Punctuation", "Po", "Other_Punctuation", "Ps", "Open_Punctuation", "S", "Symbol", "Sc", "Currency_Symbol", "Sk", "Modifier_Symbol", "Sm", "Math_Symbol", "So", "Other_Symbol", "Z", "Separator", "Zl", "Line_Separator", "Zp", "Paragraph_Separator", "Zs", "Space_Separator"]),
    Script: new Set(["Adlm", "Adlam", "Aghb", "Caucasian_Albanian", "Ahom", "Arab", "Arabic", "Armi", "Imperial_Aramaic", "Armn", "Armenian", "Avst", "Avestan", "Bali", "Balinese", "Bamu", "Bamum", "Bass", "Bassa_Vah", "Batk", "Batak", "Beng", "Bengali", "Bhks", "Bhaiksuki", "Bopo", "Bopomofo", "Brah", "Brahmi", "Brai", "Braille", "Bugi", "Buginese", "Buhd", "Buhid", "Cakm", "Chakma", "Cans", "Canadian_Aboriginal", "Cari", "Carian", "Cham", "Cher", "Cherokee", "Chrs", "Chorasmian", "Copt", "Coptic", "Qaac", "Cpmn", "Cypro_Minoan", "Cprt", "Cypriot", "Cyrl", "Cyrillic", "Deva", "Devanagari", "Diak", "Dives_Akuru", "Dogr", "Dogra", "Dsrt", "Deseret", "Dupl", "Duployan", "Egyp", "Egyptian_Hieroglyphs", "Elba", "Elbasan", "Elym", "Elymaic", "Ethi", "Ethiopic", "Geor", "Georgian", "Glag", "Glagolitic", "Gong", "Gunjala_Gondi", "Gonm", "Masaram_Gondi", "Goth", "Gothic", "Gran", "Grantha", "Grek", "Greek", "Gujr", "Gujarati", "Guru", "Gurmukhi", "Hang", "Hangul", "Hani", "Han", "Hano", "Hanunoo", "Hatr", "Hatran", "Hebr", "Hebrew", "Hira", "Hiragana", "Hluw", "Anatolian_Hieroglyphs", "Hmng", "Pahawh_Hmong", "Hmnp", "Nyiakeng_Puachue_Hmong", "Hrkt", "Katakana_Or_Hiragana", "Hung", "Old_Hungarian", "Ital", "Old_Italic", "Java", "Javanese", "Kali", "Kayah_Li", "Kana", "Katakana", "Kawi", "Khar", "Kharoshthi", "Khmr", "Khmer", "Khoj", "Khojki", "Kits", "Khitan_Small_Script", "Knda", "Kannada", "Kthi", "Kaithi", "Lana", "Tai_Tham", "Laoo", "Lao", "Latn", "Latin", "Lepc", "Lepcha", "Limb", "Limbu", "Lina", "Linear_A", "Linb", "Linear_B", "Lisu", "Lyci", "Lycian", "Lydi", "Lydian", "Mahj", "Mahajani", "Maka", "Makasar", "Mand", "Mandaic", "Mani", "Manichaean", "Marc", "Marchen", "Medf", "Medefaidrin", "Mend", "Mende_Kikakui", "Merc", "Meroitic_Cursive", "Mero", "Meroitic_Hieroglyphs", "Mlym", "Malayalam", "Modi", "Mong", "Mongolian", "Mroo", "Mro", "Mtei", "Meetei_Mayek", "Mult", "Multani", "Mymr", "Myanmar", "Nagm", "Nag_Mundari", "Nand", "Nandinagari", "Narb", "Old_North_Arabian", "Nbat", "Nabataean", "Newa", "Nkoo", "Nko", "Nshu", "Nushu", "Ogam", "Ogham", "Olck", "Ol_Chiki", "Orkh", "Old_Turkic", "Orya", "Oriya", "Osge", "Osage", "Osma", "Osmanya", "Ougr", "Old_Uyghur", "Palm", "Palmyrene", "Pauc", "Pau_Cin_Hau", "Perm", "Old_Permic", "Phag", "Phags_Pa", "Phli", "Inscriptional_Pahlavi", "Phlp", "Psalter_Pahlavi", "Phnx", "Phoenician", "Plrd", "Miao", "Prti", "Inscriptional_Parthian", "Rjng", "Rejang", "Rohg", "Hanifi_Rohingya", "Runr", "Runic", "Samr", "Samaritan", "Sarb", "Old_South_Arabian", "Saur", "Saurashtra", "Sgnw", "SignWriting", "Shaw", "Shavian", "Shrd", "Sharada", "Sidd", "Siddham", "Sind", "Khudawadi", "Sinh", "Sinhala", "Sogd", "Sogdian", "Sogo", "Old_Sogdian", "Sora", "Sora_Sompeng", "Soyo", "Soyombo", "Sund", "Sundanese", "Sylo", "Syloti_Nagri", "Syrc", "Syriac", "Tagb", "Tagbanwa", "Takr", "Takri", "Tale", "Tai_Le", "Talu", "New_Tai_Lue", "Taml", "Tamil", "Tang", "Tangut", "Tavt", "Tai_Viet", "Telu", "Telugu", "Tfng", "Tifinagh", "Tglg", "Tagalog", "Thaa", "Thaana", "Thai", "Tibt", "Tibetan", "Tirh", "Tirhuta", "Tnsa", "Tangsa", "Toto", "Ugar", "Ugaritic", "Vaii", "Vai", "Vith", "Vithkuqi", "Wara", "Warang_Citi", "Wcho", "Wancho", "Xpeo", "Old_Persian", "Xsux", "Cuneiform", "Yezi", "Yezidi", "Yiii", "Yi", "Zanb", "Zanabazar_Square", "Zinh", "Inherited", "Qaai", "Zyyy", "Common", "Zzzz", "Unknown"]),
    Script_Extensions: undefined! as Set<string>,
};
// The Script_Extensions property of a character contains one or more Script values. See https://www.unicode.org/reports/tr24/#Script_Extensions
// Here since each Unicode property value expression only allows a single value, its values can be considered the same as those of the Script property.
valuesOfNonBinaryUnicodeProperties.Script_Extensions = valuesOfNonBinaryUnicodeProperties.Script;

// upperCaseEquivalents.get(x) is the set of all characters y such that x !== y and either x === toUppercase(y) or y === toUppercase(x),
// according to the Unicode Default Case Conversion algorithm.
// Only the Simple_Uppercase_Mapping property values from UnicodeData.txt are necessary since SpecialCasing.txt only contains non-simple
// (one-to-many characters), context-dependent or locale-specific case mappings.
// Step 9 in Section 22.2.2.7.3 Canonicalize (If the numeric value of ch ≥ 128 and the numeric value of cu < 128, return ch.) prevents two
// characters, U+0131 ı LATIN SMALL LETTER DOTLESS I and U+017F ſ LATIN SMALL LETTER LONG S, from equating with "i" and "s" respectively.
// Additionally, characters outside BMP are excluded since the source is interpreted as code units when HasEitherUnicodeFlag(rer) is false.
// For details, see https://tc39.es/ecma262/#sec-runtime-semantics-canonicalize-ch.
// Arrays are not used for keys with only a single value for lesser memory.
// Generated from Unicode 16.0 data files
// dprint-ignore
const upperCaseEquivalents: Record<number, number | number[] | undefined> = { 65: 97, 66: 98, 67: 99, 68: 100, 69: 101, 70: 102, 71: 103, 72: 104, 73: 105, 74: 106, 75: 107, 76: 108, 77: 109, 78: 110, 79: 111, 80: 112, 81: 113, 82: 114, 83: 115, 84: 116, 85: 117, 86: 118, 87: 119, 88: 120, 89: 121, 90: 122, 97: 65, 98: 66, 99: 67, 100: 68, 101: 69, 102: 70, 103: 71, 104: 72, 105: 73, 106: 74, 107: 75, 108: 76, 109: 77, 110: 78, 111: 79, 112: 80, 113: 81, 114: 82, 115: 83, 116: 84, 117: 85, 118: 86, 119: 87, 120: 88, 121: 89, 122: 90, 181: [924, 956], 192: 224, 193: 225, 194: 226, 195: 227, 196: 228, 197: 229, 198: 230, 199: 231, 200: 232, 201: 233, 202: 234, 203: 235, 204: 236, 205: 237, 206: 238, 207: 239, 208: 240, 209: 241, 210: 242, 211: 243, 212: 244, 213: 245, 214: 246, 216: 248, 217: 249, 218: 250, 219: 251, 220: 252, 221: 253, 222: 254, 224: 192, 225: 193, 226: 194, 227: 195, 228: 196, 229: 197, 230: 198, 231: 199, 232: 200, 233: 201, 234: 202, 235: 203, 236: 204, 237: 205, 238: 206, 239: 207, 240: 208, 241: 209, 242: 210, 243: 211, 244: 212, 245: 213, 246: 214, 248: 216, 249: 217, 250: 218, 251: 219, 252: 220, 253: 221, 254: 222, 255: 376, 256: 257, 257: 256, 258: 259, 259: 258, 260: 261, 261: 260, 262: 263, 263: 262, 264: 265, 265: 264, 266: 267, 267: 266, 268: 269, 269: 268, 270: 271, 271: 270, 272: 273, 273: 272, 274: 275, 275: 274, 276: 277, 277: 276, 278: 279, 279: 278, 280: 281, 281: 280, 282: 283, 283: 282, 284: 285, 285: 284, 286: 287, 287: 286, 288: 289, 289: 288, 290: 291, 291: 290, 292: 293, 293: 292, 294: 295, 295: 294, 296: 297, 297: 296, 298: 299, 299: 298, 300: 301, 301: 300, 302: 303, 303: 302, 306: 307, 307: 306, 308: 309, 309: 308, 310: 311, 311: 310, 313: 314, 314: 313, 315: 316, 316: 315, 317: 318, 318: 317, 319: 320, 320: 319, 321: 322, 322: 321, 323: 324, 324: 323, 325: 326, 326: 325, 327: 328, 328: 327, 330: 331, 331: 330, 332: 333, 333: 332, 334: 335, 335: 334, 336: 337, 337: 336, 338: 339, 339: 338, 340: 341, 341: 340, 342: 343, 343: 342, 344: 345, 345: 344, 346: 347, 347: 346, 348: 349, 349: 348, 350: 351, 351: 350, 352: 353, 353: 352, 354: 355, 355: 354, 356: 357, 357: 356, 358: 359, 359: 358, 360: 361, 361: 360, 362: 363, 363: 362, 364: 365, 365: 364, 366: 367, 367: 366, 368: 369, 369: 368, 370: 371, 371: 370, 372: 373, 373: 372, 374: 375, 375: 374, 376: 255, 377: 378, 378: 377, 379: 380, 380: 379, 381: 382, 382: 381, 384: 579, 385: 595, 386: 387, 387: 386, 388: 389, 389: 388, 390: 596, 391: 392, 392: 391, 393: 598, 394: 599, 395: 396, 396: 395, 398: 477, 399: 601, 400: 603, 401: 402, 402: 401, 403: 608, 404: 611, 405: 502, 406: 617, 407: 616, 408: 409, 409: 408, 410: 573, 411: 42972, 412: 623, 413: 626, 414: 544, 415: 629, 416: 417, 417: 416, 418: 419, 419: 418, 420: 421, 421: 420, 422: 640, 423: 424, 424: 423, 425: 643, 428: 429, 429: 428, 430: 648, 431: 432, 432: 431, 433: 650, 434: 651, 435: 436, 436: 435, 437: 438, 438: 437, 439: 658, 440: 441, 441: 440, 444: 445, 445: 444, 447: 503, 452: [453, 454], 453: [452, 454], 454: [452, 453], 455: [456, 457], 456: [455, 457], 457: [455, 456], 458: [459, 460], 459: [458, 460], 460: [458, 459], 461: 462, 462: 461, 463: 464, 464: 463, 465: 466, 466: 465, 467: 468, 468: 467, 469: 470, 470: 469, 471: 472, 472: 471, 473: 474, 474: 473, 475: 476, 476: 475, 477: 398, 478: 479, 479: 478, 480: 481, 481: 480, 482: 483, 483: 482, 484: 485, 485: 484, 486: 487, 487: 486, 488: 489, 489: 488, 490: 491, 491: 490, 492: 493, 493: 492, 494: 495, 495: 494, 497: [498, 499], 498: [497, 499], 499: [497, 498], 500: 501, 501: 500, 502: 405, 503: 447, 504: 505, 505: 504, 506: 507, 507: 506, 508: 509, 509: 508, 510: 511, 511: 510, 512: 513, 513: 512, 514: 515, 515: 514, 516: 517, 517: 516, 518: 519, 519: 518, 520: 521, 521: 520, 522: 523, 523: 522, 524: 525, 525: 524, 526: 527, 527: 526, 528: 529, 529: 528, 530: 531, 531: 530, 532: 533, 533: 532, 534: 535, 535: 534, 536: 537, 537: 536, 538: 539, 539: 538, 540: 541, 541: 540, 542: 543, 543: 542, 544: 414, 546: 547, 547: 546, 548: 549, 549: 548, 550: 551, 551: 550, 552: 553, 553: 552, 554: 555, 555: 554, 556: 557, 557: 556, 558: 559, 559: 558, 560: 561, 561: 560, 562: 563, 563: 562, 570: 11365, 571: 572, 572: 571, 573: 410, 574: 11366, 575: 11390, 576: 11391, 577: 578, 578: 577, 579: 384, 580: 649, 581: 652, 582: 583, 583: 582, 584: 585, 585: 584, 586: 587, 587: 586, 588: 589, 589: 588, 590: 591, 591: 590, 592: 11375, 593: 11373, 594: 11376, 595: 385, 596: 390, 598: 393, 599: 394, 601: 399, 603: 400, 604: 42923, 608: 403, 609: 42924, 611: 404, 612: 42955, 613: 42893, 614: 42922, 616: 407, 617: 406, 618: 42926, 619: 11362, 620: 42925, 623: 412, 625: 11374, 626: 413, 629: 415, 637: 11364, 640: 422, 642: 42949, 643: 425, 647: 42929, 648: 430, 649: 580, 650: 433, 651: 434, 652: 581, 658: 439, 669: 42930, 670: 42928, 837: [921, 953, 8126], 880: 881, 881: 880, 882: 883, 883: 882, 886: 887, 887: 886, 891: 1021, 892: 1022, 893: 1023, 895: 1011, 902: 940, 904: 941, 905: 942, 906: 943, 908: 972, 910: 973, 911: 974, 913: 945, 914: [946, 976], 915: 947, 916: 948, 917: [949, 1013], 918: 950, 919: 951, 920: [952, 977], 921: [837, 953, 8126], 922: [954, 1008], 923: 955, 924: [181, 956], 925: 957, 926: 958, 927: 959, 928: [960, 982], 929: [961, 1009], 931: [962, 963], 932: 964, 933: 965, 934: [966, 981], 935: 967, 936: 968, 937: 969, 938: 970, 939: 971, 940: 902, 941: 904, 942: 905, 943: 906, 945: 913, 946: [914, 976], 947: 915, 948: 916, 949: [917, 1013], 950: 918, 951: 919, 952: [920, 977], 953: [837, 921, 8126], 954: [922, 1008], 955: 923, 956: [181, 924], 957: 925, 958: 926, 959: 927, 960: [928, 982], 961: [929, 1009], 962: [931, 963], 963: [931, 962], 964: 932, 965: 933, 966: [934, 981], 967: 935, 968: 936, 969: 937, 970: 938, 971: 939, 972: 908, 973: 910, 974: 911, 975: 983, 976: [914, 946], 977: [920, 952], 981: [934, 966], 982: [928, 960], 983: 975, 984: 985, 985: 984, 986: 987, 987: 986, 988: 989, 989: 988, 990: 991, 991: 990, 992: 993, 993: 992, 994: 995, 995: 994, 996: 997, 997: 996, 998: 999, 999: 998, 1000: 1001, 1001: 1000, 1002: 1003, 1003: 1002, 1004: 1005, 1005: 1004, 1006: 1007, 1007: 1006, 1008: [922, 954], 1009: [929, 961], 1010: 1017, 1011: 895, 1013: [917, 949], 1015: 1016, 1016: 1015, 1017: 1010, 1018: 1019, 1019: 1018, 1021: 891, 1022: 892, 1023: 893, 1024: 1104, 1025: 1105, 1026: 1106, 1027: 1107, 1028: 1108, 1029: 1109, 1030: 1110, 1031: 1111, 1032: 1112, 1033: 1113, 1034: 1114, 1035: 1115, 1036: 1116, 1037: 1117, 1038: 1118, 1039: 1119, 1040: 1072, 1041: 1073, 1042: [1074, 7296], 1043: 1075, 1044: [1076, 7297], 1045: 1077, 1046: 1078, 1047: 1079, 1048: 1080, 1049: 1081, 1050: 1082, 1051: 1083, 1052: 1084, 1053: 1085, 1054: [1086, 7298], 1055: 1087, 1056: 1088, 1057: [1089, 7299], 1058: [1090, 7300, 7301], 1059: 1091, 1060: 1092, 1061: 1093, 1062: 1094, 1063: 1095, 1064: 1096, 1065: 1097, 1066: [1098, 7302], 1067: 1099, 1068: 1100, 1069: 1101, 1070: 1102, 1071: 1103, 1072: 1040, 1073: 1041, 1074: [1042, 7296], 1075: 1043, 1076: [1044, 7297], 1077: 1045, 1078: 1046, 1079: 1047, 1080: 1048, 1081: 1049, 1082: 1050, 1083: 1051, 1084: 1052, 1085: 1053, 1086: [1054, 7298], 1087: 1055, 1088: 1056, 1089: [1057, 7299], 1090: [1058, 7300, 7301], 1091: 1059, 1092: 1060, 1093: 1061, 1094: 1062, 1095: 1063, 1096: 1064, 1097: 1065, 1098: [1066, 7302], 1099: 1067, 1100: 1068, 1101: 1069, 1102: 1070, 1103: 1071, 1104: 1024, 1105: 1025, 1106: 1026, 1107: 1027, 1108: 1028, 1109: 1029, 1110: 1030, 1111: 1031, 1112: 1032, 1113: 1033, 1114: 1034, 1115: 1035, 1116: 1036, 1117: 1037, 1118: 1038, 1119: 1039, 1120: 1121, 1121: 1120, 1122: [1123, 7303], 1123: [1122, 7303], 1124: 1125, 1125: 1124, 1126: 1127, 1127: 1126, 1128: 1129, 1129: 1128, 1130: 1131, 1131: 1130, 1132: 1133, 1133: 1132, 1134: 1135, 1135: 1134, 1136: 1137, 1137: 1136, 1138: 1139, 1139: 1138, 1140: 1141, 1141: 1140, 1142: 1143, 1143: 1142, 1144: 1145, 1145: 1144, 1146: 1147, 1147: 1146, 1148: 1149, 1149: 1148, 1150: 1151, 1151: 1150, 1152: 1153, 1153: 1152, 1162: 1163, 1163: 1162, 1164: 1165, 1165: 1164, 1166: 1167, 1167: 1166, 1168: 1169, 1169: 1168, 1170: 1171, 1171: 1170, 1172: 1173, 1173: 1172, 1174: 1175, 1175: 1174, 1176: 1177, 1177: 1176, 1178: 1179, 1179: 1178, 1180: 1181, 1181: 1180, 1182: 1183, 1183: 1182, 1184: 1185, 1185: 1184, 1186: 1187, 1187: 1186, 1188: 1189, 1189: 1188, 1190: 1191, 1191: 1190, 1192: 1193, 1193: 1192, 1194: 1195, 1195: 1194, 1196: 1197, 1197: 1196, 1198: 1199, 1199: 1198, 1200: 1201, 1201: 1200, 1202: 1203, 1203: 1202, 1204: 1205, 1205: 1204, 1206: 1207, 1207: 1206, 1208: 1209, 1209: 1208, 1210: 1211, 1211: 1210, 1212: 1213, 1213: 1212, 1214: 1215, 1215: 1214, 1216: 1231, 1217: 1218, 1218: 1217, 1219: 1220, 1220: 1219, 1221: 1222, 1222: 1221, 1223: 1224, 1224: 1223, 1225: 1226, 1226: 1225, 1227: 1228, 1228: 1227, 1229: 1230, 1230: 1229, 1231: 1216, 1232: 1233, 1233: 1232, 1234: 1235, 1235: 1234, 1236: 1237, 1237: 1236, 1238: 1239, 1239: 1238, 1240: 1241, 1241: 1240, 1242: 1243, 1243: 1242, 1244: 1245, 1245: 1244, 1246: 1247, 1247: 1246, 1248: 1249, 1249: 1248, 1250: 1251, 1251: 1250, 1252: 1253, 1253: 1252, 1254: 1255, 1255: 1254, 1256: 1257, 1257: 1256, 1258: 1259, 1259: 1258, 1260: 1261, 1261: 1260, 1262: 1263, 1263: 1262, 1264: 1265, 1265: 1264, 1266: 1267, 1267: 1266, 1268: 1269, 1269: 1268, 1270: 1271, 1271: 1270, 1272: 1273, 1273: 1272, 1274: 1275, 1275: 1274, 1276: 1277, 1277: 1276, 1278: 1279, 1279: 1278, 1280: 1281, 1281: 1280, 1282: 1283, 1283: 1282, 1284: 1285, 1285: 1284, 1286: 1287, 1287: 1286, 1288: 1289, 1289: 1288, 1290: 1291, 1291: 1290, 1292: 1293, 1293: 1292, 1294: 1295, 1295: 1294, 1296: 1297, 1297: 1296, 1298: 1299, 1299: 1298, 1300: 1301, 1301: 1300, 1302: 1303, 1303: 1302, 1304: 1305, 1305: 1304, 1306: 1307, 1307: 1306, 1308: 1309, 1309: 1308, 1310: 1311, 1311: 1310, 1312: 1313, 1313: 1312, 1314: 1315, 1315: 1314, 1316: 1317, 1317: 1316, 1318: 1319, 1319: 1318, 1320: 1321, 1321: 1320, 1322: 1323, 1323: 1322, 1324: 1325, 1325: 1324, 1326: 1327, 1327: 1326, 1329: 1377, 1330: 1378, 1331: 1379, 1332: 1380, 1333: 1381, 1334: 1382, 1335: 1383, 1336: 1384, 1337: 1385, 1338: 1386, 1339: 1387, 1340: 1388, 1341: 1389, 1342: 1390, 1343: 1391, 1344: 1392, 1345: 1393, 1346: 1394, 1347: 1395, 1348: 1396, 1349: 1397, 1350: 1398, 1351: 1399, 1352: 1400, 1353: 1401, 1354: 1402, 1355: 1403, 1356: 1404, 1357: 1405, 1358: 1406, 1359: 1407, 1360: 1408, 1361: 1409, 1362: 1410, 1363: 1411, 1364: 1412, 1365: 1413, 1366: 1414, 1377: 1329, 1378: 1330, 1379: 1331, 1380: 1332, 1381: 1333, 1382: 1334, 1383: 1335, 1384: 1336, 1385: 1337, 1386: 1338, 1387: 1339, 1388: 1340, 1389: 1341, 1390: 1342, 1391: 1343, 1392: 1344, 1393: 1345, 1394: 1346, 1395: 1347, 1396: 1348, 1397: 1349, 1398: 1350, 1399: 1351, 1400: 1352, 1401: 1353, 1402: 1354, 1403: 1355, 1404: 1356, 1405: 1357, 1406: 1358, 1407: 1359, 1408: 1360, 1409: 1361, 1410: 1362, 1411: 1363, 1412: 1364, 1413: 1365, 1414: 1366, 4256: 11520, 4257: 11521, 4258: 11522, 4259: 11523, 4260: 11524, 4261: 11525, 4262: 11526, 4263: 11527, 4264: 11528, 4265: 11529, 4266: 11530, 4267: 11531, 4268: 11532, 4269: 11533, 4270: 11534, 4271: 11535, 4272: 11536, 4273: 11537, 4274: 11538, 4275: 11539, 4276: 11540, 4277: 11541, 4278: 11542, 4279: 11543, 4280: 11544, 4281: 11545, 4282: 11546, 4283: 11547, 4284: 11548, 4285: 11549, 4286: 11550, 4287: 11551, 4288: 11552, 4289: 11553, 4290: 11554, 4291: 11555, 4292: 11556, 4293: 11557, 4295: 11559, 4301: 11565, 4304: 7312, 4305: 7313, 4306: 7314, 4307: 7315, 4308: 7316, 4309: 7317, 4310: 7318, 4311: 7319, 4312: 7320, 4313: 7321, 4314: 7322, 4315: 7323, 4316: 7324, 4317: 7325, 4318: 7326, 4319: 7327, 4320: 7328, 4321: 7329, 4322: 7330, 4323: 7331, 4324: 7332, 4325: 7333, 4326: 7334, 4327: 7335, 4328: 7336, 4329: 7337, 4330: 7338, 4331: 7339, 4332: 7340, 4333: 7341, 4334: 7342, 4335: 7343, 4336: 7344, 4337: 7345, 4338: 7346, 4339: 7347, 4340: 7348, 4341: 7349, 4342: 7350, 4343: 7351, 4344: 7352, 4345: 7353, 4346: 7354, 4349: 7357, 4350: 7358, 4351: 7359, 5024: 43888, 5025: 43889, 5026: 43890, 5027: 43891, 5028: 43892, 5029: 43893, 5030: 43894, 5031: 43895, 5032: 43896, 5033: 43897, 5034: 43898, 5035: 43899, 5036: 43900, 5037: 43901, 5038: 43902, 5039: 43903, 5040: 43904, 5041: 43905, 5042: 43906, 5043: 43907, 5044: 43908, 5045: 43909, 5046: 43910, 5047: 43911, 5048: 43912, 5049: 43913, 5050: 43914, 5051: 43915, 5052: 43916, 5053: 43917, 5054: 43918, 5055: 43919, 5056: 43920, 5057: 43921, 5058: 43922, 5059: 43923, 5060: 43924, 5061: 43925, 5062: 43926, 5063: 43927, 5064: 43928, 5065: 43929, 5066: 43930, 5067: 43931, 5068: 43932, 5069: 43933, 5070: 43934, 5071: 43935, 5072: 43936, 5073: 43937, 5074: 43938, 5075: 43939, 5076: 43940, 5077: 43941, 5078: 43942, 5079: 43943, 5080: 43944, 5081: 43945, 5082: 43946, 5083: 43947, 5084: 43948, 5085: 43949, 5086: 43950, 5087: 43951, 5088: 43952, 5089: 43953, 5090: 43954, 5091: 43955, 5092: 43956, 5093: 43957, 5094: 43958, 5095: 43959, 5096: 43960, 5097: 43961, 5098: 43962, 5099: 43963, 5100: 43964, 5101: 43965, 5102: 43966, 5103: 43967, 5104: 5112, 5105: 5113, 5106: 5114, 5107: 5115, 5108: 5116, 5109: 5117, 5112: 5104, 5113: 5105, 5114: 5106, 5115: 5107, 5116: 5108, 5117: 5109, 7296: [1042, 1074], 7297: [1044, 1076], 7298: [1054, 1086], 7299: [1057, 1089], 7300: [1058, 1090, 7301], 7301: [1058, 1090, 7300], 7302: [1066, 1098], 7303: [1122, 1123], 7304: [42570, 42571], 7305: 7306, 7306: 7305, 7312: 4304, 7313: 4305, 7314: 4306, 7315: 4307, 7316: 4308, 7317: 4309, 7318: 4310, 7319: 4311, 7320: 4312, 7321: 4313, 7322: 4314, 7323: 4315, 7324: 4316, 7325: 4317, 7326: 4318, 7327: 4319, 7328: 4320, 7329: 4321, 7330: 4322, 7331: 4323, 7332: 4324, 7333: 4325, 7334: 4326, 7335: 4327, 7336: 4328, 7337: 4329, 7338: 4330, 7339: 4331, 7340: 4332, 7341: 4333, 7342: 4334, 7343: 4335, 7344: 4336, 7345: 4337, 7346: 4338, 7347: 4339, 7348: 4340, 7349: 4341, 7350: 4342, 7351: 4343, 7352: 4344, 7353: 4345, 7354: 4346, 7357: 4349, 7358: 4350, 7359: 4351, 7545: 42877, 7549: 11363, 7566: 42950, 7680: 7681, 7681: 7680, 7682: 7683, 7683: 7682, 7684: 7685, 7685: 7684, 7686: 7687, 7687: 7686, 7688: 7689, 7689: 7688, 7690: 7691, 7691: 7690, 7692: 7693, 7693: 7692, 7694: 7695, 7695: 7694, 7696: 7697, 7697: 7696, 7698: 7699, 7699: 7698, 7700: 7701, 7701: 7700, 7702: 7703, 7703: 7702, 7704: 7705, 7705: 7704, 7706: 7707, 7707: 7706, 7708: 7709, 7709: 7708, 7710: 7711, 7711: 7710, 7712: 7713, 7713: 7712, 7714: 7715, 7715: 7714, 7716: 7717, 7717: 7716, 7718: 7719, 7719: 7718, 7720: 7721, 7721: 7720, 7722: 7723, 7723: 7722, 7724: 7725, 7725: 7724, 7726: 7727, 7727: 7726, 7728: 7729, 7729: 7728, 7730: 7731, 7731: 7730, 7732: 7733, 7733: 7732, 7734: 7735, 7735: 7734, 7736: 7737, 7737: 7736, 7738: 7739, 7739: 7738, 7740: 7741, 7741: 7740, 7742: 7743, 7743: 7742, 7744: 7745, 7745: 7744, 7746: 7747, 7747: 7746, 7748: 7749, 7749: 7748, 7750: 7751, 7751: 7750, 7752: 7753, 7753: 7752, 7754: 7755, 7755: 7754, 7756: 7757, 7757: 7756, 7758: 7759, 7759: 7758, 7760: 7761, 7761: 7760, 7762: 7763, 7763: 7762, 7764: 7765, 7765: 7764, 7766: 7767, 7767: 7766, 7768: 7769, 7769: 7768, 7770: 7771, 7771: 7770, 7772: 7773, 7773: 7772, 7774: 7775, 7775: 7774, 7776: [7777, 7835], 7777: [7776, 7835], 7778: 7779, 7779: 7778, 7780: 7781, 7781: 7780, 7782: 7783, 7783: 7782, 7784: 7785, 7785: 7784, 7786: 7787, 7787: 7786, 7788: 7789, 7789: 7788, 7790: 7791, 7791: 7790, 7792: 7793, 7793: 7792, 7794: 7795, 7795: 7794, 7796: 7797, 7797: 7796, 7798: 7799, 7799: 7798, 7800: 7801, 7801: 7800, 7802: 7803, 7803: 7802, 7804: 7805, 7805: 7804, 7806: 7807, 7807: 7806, 7808: 7809, 7809: 7808, 7810: 7811, 7811: 7810, 7812: 7813, 7813: 7812, 7814: 7815, 7815: 7814, 7816: 7817, 7817: 7816, 7818: 7819, 7819: 7818, 7820: 7821, 7821: 7820, 7822: 7823, 7823: 7822, 7824: 7825, 7825: 7824, 7826: 7827, 7827: 7826, 7828: 7829, 7829: 7828, 7835: [7776, 7777], 7840: 7841, 7841: 7840, 7842: 7843, 7843: 7842, 7844: 7845, 7845: 7844, 7846: 7847, 7847: 7846, 7848: 7849, 7849: 7848, 7850: 7851, 7851: 7850, 7852: 7853, 7853: 7852, 7854: 7855, 7855: 7854, 7856: 7857, 7857: 7856, 7858: 7859, 7859: 7858, 7860: 7861, 7861: 7860, 7862: 7863, 7863: 7862, 7864: 7865, 7865: 7864, 7866: 7867, 7867: 7866, 7868: 7869, 7869: 7868, 7870: 7871, 7871: 7870, 7872: 7873, 7873: 7872, 7874: 7875, 7875: 7874, 7876: 7877, 7877: 7876, 7878: 7879, 7879: 7878, 7880: 7881, 7881: 7880, 7882: 7883, 7883: 7882, 7884: 7885, 7885: 7884, 7886: 7887, 7887: 7886, 7888: 7889, 7889: 7888, 7890: 7891, 7891: 7890, 7892: 7893, 7893: 7892, 7894: 7895, 7895: 7894, 7896: 7897, 7897: 7896, 7898: 7899, 7899: 7898, 7900: 7901, 7901: 7900, 7902: 7903, 7903: 7902, 7904: 7905, 7905: 7904, 7906: 7907, 7907: 7906, 7908: 7909, 7909: 7908, 7910: 7911, 7911: 7910, 7912: 7913, 7913: 7912, 7914: 7915, 7915: 7914, 7916: 7917, 7917: 7916, 7918: 7919, 7919: 7918, 7920: 7921, 7921: 7920, 7922: 7923, 7923: 7922, 7924: 7925, 7925: 7924, 7926: 7927, 7927: 7926, 7928: 7929, 7929: 7928, 7930: 7931, 7931: 7930, 7932: 7933, 7933: 7932, 7934: 7935, 7935: 7934, 7936: 7944, 7937: 7945, 7938: 7946, 7939: 7947, 7940: 7948, 7941: 7949, 7942: 7950, 7943: 7951, 7944: 7936, 7945: 7937, 7946: 7938, 7947: 7939, 7948: 7940, 7949: 7941, 7950: 7942, 7951: 7943, 7952: 7960, 7953: 7961, 7954: 7962, 7955: 7963, 7956: 7964, 7957: 7965, 7960: 7952, 7961: 7953, 7962: 7954, 7963: 7955, 7964: 7956, 7965: 7957, 7968: 7976, 7969: 7977, 7970: 7978, 7971: 7979, 7972: 7980, 7973: 7981, 7974: 7982, 7975: 7983, 7976: 7968, 7977: 7969, 7978: 7970, 7979: 7971, 7980: 7972, 7981: 7973, 7982: 7974, 7983: 7975, 7984: 7992, 7985: 7993, 7986: 7994, 7987: 7995, 7988: 7996, 7989: 7997, 7990: 7998, 7991: 7999, 7992: 7984, 7993: 7985, 7994: 7986, 7995: 7987, 7996: 7988, 7997: 7989, 7998: 7990, 7999: 7991, 8000: 8008, 8001: 8009, 8002: 8010, 8003: 8011, 8004: 8012, 8005: 8013, 8008: 8000, 8009: 8001, 8010: 8002, 8011: 8003, 8012: 8004, 8013: 8005, 8017: 8025, 8019: 8027, 8021: 8029, 8023: 8031, 8025: 8017, 8027: 8019, 8029: 8021, 8031: 8023, 8032: 8040, 8033: 8041, 8034: 8042, 8035: 8043, 8036: 8044, 8037: 8045, 8038: 8046, 8039: 8047, 8040: 8032, 8041: 8033, 8042: 8034, 8043: 8035, 8044: 8036, 8045: 8037, 8046: 8038, 8047: 8039, 8048: 8122, 8049: 8123, 8050: 8136, 8051: 8137, 8052: 8138, 8053: 8139, 8054: 8154, 8055: 8155, 8056: 8184, 8057: 8185, 8058: 8170, 8059: 8171, 8060: 8186, 8061: 8187, 8064: 8072, 8065: 8073, 8066: 8074, 8067: 8075, 8068: 8076, 8069: 8077, 8070: 8078, 8071: 8079, 8072: 8064, 8073: 8065, 8074: 8066, 8075: 8067, 8076: 8068, 8077: 8069, 8078: 8070, 8079: 8071, 8080: 8088, 8081: 8089, 8082: 8090, 8083: 8091, 8084: 8092, 8085: 8093, 8086: 8094, 8087: 8095, 8088: 8080, 8089: 8081, 8090: 8082, 8091: 8083, 8092: 8084, 8093: 8085, 8094: 8086, 8095: 8087, 8096: 8104, 8097: 8105, 8098: 8106, 8099: 8107, 8100: 8108, 8101: 8109, 8102: 8110, 8103: 8111, 8104: 8096, 8105: 8097, 8106: 8098, 8107: 8099, 8108: 8100, 8109: 8101, 8110: 8102, 8111: 8103, 8112: 8120, 8113: 8121, 8115: 8124, 8120: 8112, 8121: 8113, 8122: 8048, 8123: 8049, 8124: 8115, 8126: [837, 921, 953], 8131: 8140, 8136: 8050, 8137: 8051, 8138: 8052, 8139: 8053, 8140: 8131, 8144: 8152, 8145: 8153, 8152: 8144, 8153: 8145, 8154: 8054, 8155: 8055, 8160: 8168, 8161: 8169, 8165: 8172, 8168: 8160, 8169: 8161, 8170: 8058, 8171: 8059, 8172: 8165, 8179: 8188, 8184: 8056, 8185: 8057, 8186: 8060, 8187: 8061, 8188: 8179, 8498: 8526, 8526: 8498, 8544: 8560, 8545: 8561, 8546: 8562, 8547: 8563, 8548: 8564, 8549: 8565, 8550: 8566, 8551: 8567, 8552: 8568, 8553: 8569, 8554: 8570, 8555: 8571, 8556: 8572, 8557: 8573, 8558: 8574, 8559: 8575, 8560: 8544, 8561: 8545, 8562: 8546, 8563: 8547, 8564: 8548, 8565: 8549, 8566: 8550, 8567: 8551, 8568: 8552, 8569: 8553, 8570: 8554, 8571: 8555, 8572: 8556, 8573: 8557, 8574: 8558, 8575: 8559, 8579: 8580, 8580: 8579, 9398: 9424, 9399: 9425, 9400: 9426, 9401: 9427, 9402: 9428, 9403: 9429, 9404: 9430, 9405: 9431, 9406: 9432, 9407: 9433, 9408: 9434, 9409: 9435, 9410: 9436, 9411: 9437, 9412: 9438, 9413: 9439, 9414: 9440, 9415: 9441, 9416: 9442, 9417: 9443, 9418: 9444, 9419: 9445, 9420: 9446, 9421: 9447, 9422: 9448, 9423: 9449, 9424: 9398, 9425: 9399, 9426: 9400, 9427: 9401, 9428: 9402, 9429: 9403, 9430: 9404, 9431: 9405, 9432: 9406, 9433: 9407, 9434: 9408, 9435: 9409, 9436: 9410, 9437: 9411, 9438: 9412, 9439: 9413, 9440: 9414, 9441: 9415, 9442: 9416, 9443: 9417, 9444: 9418, 9445: 9419, 9446: 9420, 9447: 9421, 9448: 9422, 9449: 9423, 11264: 11312, 11265: 11313, 11266: 11314, 11267: 11315, 11268: 11316, 11269: 11317, 11270: 11318, 11271: 11319, 11272: 11320, 11273: 11321, 11274: 11322, 11275: 11323, 11276: 11324, 11277: 11325, 11278: 11326, 11279: 11327, 11280: 11328, 11281: 11329, 11282: 11330, 11283: 11331, 11284: 11332, 11285: 11333, 11286: 11334, 11287: 11335, 11288: 11336, 11289: 11337, 11290: 11338, 11291: 11339, 11292: 11340, 11293: 11341, 11294: 11342, 11295: 11343, 11296: 11344, 11297: 11345, 11298: 11346, 11299: 11347, 11300: 11348, 11301: 11349, 11302: 11350, 11303: 11351, 11304: 11352, 11305: 11353, 11306: 11354, 11307: 11355, 11308: 11356, 11309: 11357, 11310: 11358, 11311: 11359, 11312: 11264, 11313: 11265, 11314: 11266, 11315: 11267, 11316: 11268, 11317: 11269, 11318: 11270, 11319: 11271, 11320: 11272, 11321: 11273, 11322: 11274, 11323: 11275, 11324: 11276, 11325: 11277, 11326: 11278, 11327: 11279, 11328: 11280, 11329: 11281, 11330: 11282, 11331: 11283, 11332: 11284, 11333: 11285, 11334: 11286, 11335: 11287, 11336: 11288, 11337: 11289, 11338: 11290, 11339: 11291, 11340: 11292, 11341: 11293, 11342: 11294, 11343: 11295, 11344: 11296, 11345: 11297, 11346: 11298, 11347: 11299, 11348: 11300, 11349: 11301, 11350: 11302, 11351: 11303, 11352: 11304, 11353: 11305, 11354: 11306, 11355: 11307, 11356: 11308, 11357: 11309, 11358: 11310, 11359: 11311, 11360: 11361, 11361: 11360, 11362: 619, 11363: 7549, 11364: 637, 11365: 570, 11366: 574, 11367: 11368, 11368: 11367, 11369: 11370, 11370: 11369, 11371: 11372, 11372: 11371, 11373: 593, 11374: 625, 11375: 592, 11376: 594, 11378: 11379, 11379: 11378, 11381: 11382, 11382: 11381, 11390: 575, 11391: 576, 11392: 11393, 11393: 11392, 11394: 11395, 11395: 11394, 11396: 11397, 11397: 11396, 11398: 11399, 11399: 11398, 11400: 11401, 11401: 11400, 11402: 11403, 11403: 11402, 11404: 11405, 11405: 11404, 11406: 11407, 11407: 11406, 11408: 11409, 11409: 11408, 11410: 11411, 11411: 11410, 11412: 11413, 11413: 11412, 11414: 11415, 11415: 11414, 11416: 11417, 11417: 11416, 11418: 11419, 11419: 11418, 11420: 11421, 11421: 11420, 11422: 11423, 11423: 11422, 11424: 11425, 11425: 11424, 11426: 11427, 11427: 11426, 11428: 11429, 11429: 11428, 11430: 11431, 11431: 11430, 11432: 11433, 11433: 11432, 11434: 11435, 11435: 11434, 11436: 11437, 11437: 11436, 11438: 11439, 11439: 11438, 11440: 11441, 11441: 11440, 11442: 11443, 11443: 11442, 11444: 11445, 11445: 11444, 11446: 11447, 11447: 11446, 11448: 11449, 11449: 11448, 11450: 11451, 11451: 11450, 11452: 11453, 11453: 11452, 11454: 11455, 11455: 11454, 11456: 11457, 11457: 11456, 11458: 11459, 11459: 11458, 11460: 11461, 11461: 11460, 11462: 11463, 11463: 11462, 11464: 11465, 11465: 11464, 11466: 11467, 11467: 11466, 11468: 11469, 11469: 11468, 11470: 11471, 11471: 11470, 11472: 11473, 11473: 11472, 11474: 11475, 11475: 11474, 11476: 11477, 11477: 11476, 11478: 11479, 11479: 11478, 11480: 11481, 11481: 11480, 11482: 11483, 11483: 11482, 11484: 11485, 11485: 11484, 11486: 11487, 11487: 11486, 11488: 11489, 11489: 11488, 11490: 11491, 11491: 11490, 11499: 11500, 11500: 11499, 11501: 11502, 11502: 11501, 11506: 11507, 11507: 11506, 11520: 4256, 11521: 4257, 11522: 4258, 11523: 4259, 11524: 4260, 11525: 4261, 11526: 4262, 11527: 4263, 11528: 4264, 11529: 4265, 11530: 4266, 11531: 4267, 11532: 4268, 11533: 4269, 11534: 4270, 11535: 4271, 11536: 4272, 11537: 4273, 11538: 4274, 11539: 4275, 11540: 4276, 11541: 4277, 11542: 4278, 11543: 4279, 11544: 4280, 11545: 4281, 11546: 4282, 11547: 4283, 11548: 4284, 11549: 4285, 11550: 4286, 11551: 4287, 11552: 4288, 11553: 4289, 11554: 4290, 11555: 4291, 11556: 4292, 11557: 4293, 11559: 4295, 11565: 4301, 42560: 42561, 42561: 42560, 42562: 42563, 42563: 42562, 42564: 42565, 42565: 42564, 42566: 42567, 42567: 42566, 42568: 42569, 42569: 42568, 42570: [7304, 42571], 42571: [7304, 42570], 42572: 42573, 42573: 42572, 42574: 42575, 42575: 42574, 42576: 42577, 42577: 42576, 42578: 42579, 42579: 42578, 42580: 42581, 42581: 42580, 42582: 42583, 42583: 42582, 42584: 42585, 42585: 42584, 42586: 42587, 42587: 42586, 42588: 42589, 42589: 42588, 42590: 42591, 42591: 42590, 42592: 42593, 42593: 42592, 42594: 42595, 42595: 42594, 42596: 42597, 42597: 42596, 42598: 42599, 42599: 42598, 42600: 42601, 42601: 42600, 42602: 42603, 42603: 42602, 42604: 42605, 42605: 42604, 42624: 42625, 42625: 42624, 42626: 42627, 42627: 42626, 42628: 42629, 42629: 42628, 42630: 42631, 42631: 42630, 42632: 42633, 42633: 42632, 42634: 42635, 42635: 42634, 42636: 42637, 42637: 42636, 42638: 42639, 42639: 42638, 42640: 42641, 42641: 42640, 42642: 42643, 42643: 42642, 42644: 42645, 42645: 42644, 42646: 42647, 42647: 42646, 42648: 42649, 42649: 42648, 42650: 42651, 42651: 42650, 42786: 42787, 42787: 42786, 42788: 42789, 42789: 42788, 42790: 42791, 42791: 42790, 42792: 42793, 42793: 42792, 42794: 42795, 42795: 42794, 42796: 42797, 42797: 42796, 42798: 42799, 42799: 42798, 42802: 42803, 42803: 42802, 42804: 42805, 42805: 42804, 42806: 42807, 42807: 42806, 42808: 42809, 42809: 42808, 42810: 42811, 42811: 42810, 42812: 42813, 42813: 42812, 42814: 42815, 42815: 42814, 42816: 42817, 42817: 42816, 42818: 42819, 42819: 42818, 42820: 42821, 42821: 42820, 42822: 42823, 42823: 42822, 42824: 42825, 42825: 42824, 42826: 42827, 42827: 42826, 42828: 42829, 42829: 42828, 42830: 42831, 42831: 42830, 42832: 42833, 42833: 42832, 42834: 42835, 42835: 42834, 42836: 42837, 42837: 42836, 42838: 42839, 42839: 42838, 42840: 42841, 42841: 42840, 42842: 42843, 42843: 42842, 42844: 42845, 42845: 42844, 42846: 42847, 42847: 42846, 42848: 42849, 42849: 42848, 42850: 42851, 42851: 42850, 42852: 42853, 42853: 42852, 42854: 42855, 42855: 42854, 42856: 42857, 42857: 42856, 42858: 42859, 42859: 42858, 42860: 42861, 42861: 42860, 42862: 42863, 42863: 42862, 42873: 42874, 42874: 42873, 42875: 42876, 42876: 42875, 42877: 7545, 42878: 42879, 42879: 42878, 42880: 42881, 42881: 42880, 42882: 42883, 42883: 42882, 42884: 42885, 42885: 42884, 42886: 42887, 42887: 42886, 42891: 42892, 42892: 42891, 42893: 613, 42896: 42897, 42897: 42896, 42898: 42899, 42899: 42898, 42900: 42948, 42902: 42903, 42903: 42902, 42904: 42905, 42905: 42904, 42906: 42907, 42907: 42906, 42908: 42909, 42909: 42908, 42910: 42911, 42911: 42910, 42912: 42913, 42913: 42912, 42914: 42915, 42915: 42914, 42916: 42917, 42917: 42916, 42918: 42919, 42919: 42918, 42920: 42921, 42921: 42920, 42922: 614, 42923: 604, 42924: 609, 42925: 620, 42926: 618, 42928: 670, 42929: 647, 42930: 669, 42931: 43859, 42932: 42933, 42933: 42932, 42934: 42935, 42935: 42934, 42936: 42937, 42937: 42936, 42938: 42939, 42939: 42938, 42940: 42941, 42941: 42940, 42942: 42943, 42943: 42942, 42944: 42945, 42945: 42944, 42946: 42947, 42947: 42946, 42948: 42900, 42949: 642, 42950: 7566, 42951: 42952, 42952: 42951, 42953: 42954, 42954: 42953, 42955: 612, 42956: 42957, 42957: 42956, 42960: 42961, 42961: 42960, 42966: 42967, 42967: 42966, 42968: 42969, 42969: 42968, 42970: 42971, 42971: 42970, 42972: 411, 42997: 42998, 42998: 42997, 43859: 42931, 43888: 5024, 43889: 5025, 43890: 5026, 43891: 5027, 43892: 5028, 43893: 5029, 43894: 5030, 43895: 5031, 43896: 5032, 43897: 5033, 43898: 5034, 43899: 5035, 43900: 5036, 43901: 5037, 43902: 5038, 43903: 5039, 43904: 5040, 43905: 5041, 43906: 5042, 43907: 5043, 43908: 5044, 43909: 5045, 43910: 5046, 43911: 5047, 43912: 5048, 43913: 5049, 43914: 5050, 43915: 5051, 43916: 5052, 43917: 5053, 43918: 5054, 43919: 5055, 43920: 5056, 43921: 5057, 43922: 5058, 43923: 5059, 43924: 5060, 43925: 5061, 43926: 5062, 43927: 5063, 43928: 5064, 43929: 5065, 43930: 5066, 43931: 5067, 43932: 5068, 43933: 5069, 43934: 5070, 43935: 5071, 43936: 5072, 43937: 5073, 43938: 5074, 43939: 5075, 43940: 5076, 43941: 5077, 43942: 5078, 43943: 5079, 43944: 5080, 43945: 5081, 43946: 5082, 43947: 5083, 43948: 5084, 43949: 5085, 43950: 5086, 43951: 5087, 43952: 5088, 43953: 5089, 43954: 5090, 43955: 5091, 43956: 5092, 43957: 5093, 43958: 5094, 43959: 5095, 43960: 5096, 43961: 5097, 43962: 5098, 43963: 5099, 43964: 5100, 43965: 5101, 43966: 5102, 43967: 5103, 65313: 65345, 65314: 65346, 65315: 65347, 65316: 65348, 65317: 65349, 65318: 65350, 65319: 65351, 65320: 65352, 65321: 65353, 65322: 65354, 65323: 65355, 65324: 65356, 65325: 65357, 65326: 65358, 65327: 65359, 65328: 65360, 65329: 65361, 65330: 65362, 65331: 65363, 65332: 65364, 65333: 65365, 65334: 65366, 65335: 65367, 65336: 65368, 65337: 65369, 65338: 65370, 65345: 65313, 65346: 65314, 65347: 65315, 65348: 65316, 65349: 65317, 65350: 65318, 65351: 65319, 65352: 65320, 65353: 65321, 65354: 65322, 65355: 65323, 65356: 65324, 65357: 65325, 65358: 65326, 65359: 65327, 65360: 65328, 65361: 65329, 65362: 65330, 65363: 65331, 65364: 65332, 65365: 65333, 65366: 65334, 65367: 65335, 65368: 65336, 65369: 65337, 65370: 65338 };

// caseFoldEquivalents.get(x) is the set of all characters y such that x !== y and either x === toCasefold(y) or y === toCasefold(x),
// according to the simple case folding variant of the Unicode Default Case Folding algorithm.
// Only the Simple_Case_Folding property values (mappings with status field values "C" and "S" in the CaseFolding.txt file) are considered.
// For details, see https://tc39.es/ecma262/#sec-runtime-semantics-canonicalize-ch.
// Arrays are not used for keys with only a single value for lesser memory.
// Generated from Unicode 16.0 data files
// dprint-ignore
const caseFoldEquivalents: Record<number, number | number[] | undefined> = { 65: 97, 66: 98, 67: 99, 68: 100, 69: 101, 70: 102, 71: 103, 72: 104, 73: 105, 74: 106, 75: [107, 8490], 76: 108, 77: 109, 78: 110, 79: 111, 80: 112, 81: 113, 82: 114, 83: [115, 383], 84: 116, 85: 117, 86: 118, 87: 119, 88: 120, 89: 121, 90: 122, 97: 65, 98: 66, 99: 67, 100: 68, 101: 69, 102: 70, 103: 71, 104: 72, 105: 73, 106: 74, 107: [75, 8490], 108: 76, 109: 77, 110: 78, 111: 79, 112: 80, 113: 81, 114: 82, 115: [83, 383], 116: 84, 117: 85, 118: 86, 119: 87, 120: 88, 121: 89, 122: 90, 181: [924, 956], 192: 224, 193: 225, 194: 226, 195: 227, 196: 228, 197: [229, 8491], 198: 230, 199: 231, 200: 232, 201: 233, 202: 234, 203: 235, 204: 236, 205: 237, 206: 238, 207: 239, 208: 240, 209: 241, 210: 242, 211: 243, 212: 244, 213: 245, 214: 246, 216: 248, 217: 249, 218: 250, 219: 251, 220: 252, 221: 253, 222: 254, 223: 7838, 224: 192, 225: 193, 226: 194, 227: 195, 228: 196, 229: [197, 8491], 230: 198, 231: 199, 232: 200, 233: 201, 234: 202, 235: 203, 236: 204, 237: 205, 238: 206, 239: 207, 240: 208, 241: 209, 242: 210, 243: 211, 244: 212, 245: 213, 246: 214, 248: 216, 249: 217, 250: 218, 251: 219, 252: 220, 253: 221, 254: 222, 255: 376, 256: 257, 257: 256, 258: 259, 259: 258, 260: 261, 261: 260, 262: 263, 263: 262, 264: 265, 265: 264, 266: 267, 267: 266, 268: 269, 269: 268, 270: 271, 271: 270, 272: 273, 273: 272, 274: 275, 275: 274, 276: 277, 277: 276, 278: 279, 279: 278, 280: 281, 281: 280, 282: 283, 283: 282, 284: 285, 285: 284, 286: 287, 287: 286, 288: 289, 289: 288, 290: 291, 291: 290, 292: 293, 293: 292, 294: 295, 295: 294, 296: 297, 297: 296, 298: 299, 299: 298, 300: 301, 301: 300, 302: 303, 303: 302, 306: 307, 307: 306, 308: 309, 309: 308, 310: 311, 311: 310, 313: 314, 314: 313, 315: 316, 316: 315, 317: 318, 318: 317, 319: 320, 320: 319, 321: 322, 322: 321, 323: 324, 324: 323, 325: 326, 326: 325, 327: 328, 328: 327, 330: 331, 331: 330, 332: 333, 333: 332, 334: 335, 335: 334, 336: 337, 337: 336, 338: 339, 339: 338, 340: 341, 341: 340, 342: 343, 343: 342, 344: 345, 345: 344, 346: 347, 347: 346, 348: 349, 349: 348, 350: 351, 351: 350, 352: 353, 353: 352, 354: 355, 355: 354, 356: 357, 357: 356, 358: 359, 359: 358, 360: 361, 361: 360, 362: 363, 363: 362, 364: 365, 365: 364, 366: 367, 367: 366, 368: 369, 369: 368, 370: 371, 371: 370, 372: 373, 373: 372, 374: 375, 375: 374, 376: 255, 377: 378, 378: 377, 379: 380, 380: 379, 381: 382, 382: 381, 383: [83, 115], 384: 579, 385: 595, 386: 387, 387: 386, 388: 389, 389: 388, 390: 596, 391: 392, 392: 391, 393: 598, 394: 599, 395: 396, 396: 395, 398: 477, 399: 601, 400: 603, 401: 402, 402: 401, 403: 608, 404: 611, 405: 502, 406: 617, 407: 616, 408: 409, 409: 408, 410: 573, 411: 42972, 412: 623, 413: 626, 414: 544, 415: 629, 416: 417, 417: 416, 418: 419, 419: 418, 420: 421, 421: 420, 422: 640, 423: 424, 424: 423, 425: 643, 428: 429, 429: 428, 430: 648, 431: 432, 432: 431, 433: 650, 434: 651, 435: 436, 436: 435, 437: 438, 438: 437, 439: 658, 440: 441, 441: 440, 444: 445, 445: 444, 447: 503, 452: [453, 454], 453: [452, 454], 454: [452, 453], 455: [456, 457], 456: [455, 457], 457: [455, 456], 458: [459, 460], 459: [458, 460], 460: [458, 459], 461: 462, 462: 461, 463: 464, 464: 463, 465: 466, 466: 465, 467: 468, 468: 467, 469: 470, 470: 469, 471: 472, 472: 471, 473: 474, 474: 473, 475: 476, 476: 475, 477: 398, 478: 479, 479: 478, 480: 481, 481: 480, 482: 483, 483: 482, 484: 485, 485: 484, 486: 487, 487: 486, 488: 489, 489: 488, 490: 491, 491: 490, 492: 493, 493: 492, 494: 495, 495: 494, 497: [498, 499], 498: [497, 499], 499: [497, 498], 500: 501, 501: 500, 502: 405, 503: 447, 504: 505, 505: 504, 506: 507, 507: 506, 508: 509, 509: 508, 510: 511, 511: 510, 512: 513, 513: 512, 514: 515, 515: 514, 516: 517, 517: 516, 518: 519, 519: 518, 520: 521, 521: 520, 522: 523, 523: 522, 524: 525, 525: 524, 526: 527, 527: 526, 528: 529, 529: 528, 530: 531, 531: 530, 532: 533, 533: 532, 534: 535, 535: 534, 536: 537, 537: 536, 538: 539, 539: 538, 540: 541, 541: 540, 542: 543, 543: 542, 544: 414, 546: 547, 547: 546, 548: 549, 549: 548, 550: 551, 551: 550, 552: 553, 553: 552, 554: 555, 555: 554, 556: 557, 557: 556, 558: 559, 559: 558, 560: 561, 561: 560, 562: 563, 563: 562, 570: 11365, 571: 572, 572: 571, 573: 410, 574: 11366, 575: 11390, 576: 11391, 577: 578, 578: 577, 579: 384, 580: 649, 581: 652, 582: 583, 583: 582, 584: 585, 585: 584, 586: 587, 587: 586, 588: 589, 589: 588, 590: 591, 591: 590, 592: 11375, 593: 11373, 594: 11376, 595: 385, 596: 390, 598: 393, 599: 394, 601: 399, 603: 400, 604: 42923, 608: 403, 609: 42924, 611: 404, 612: 42955, 613: 42893, 614: 42922, 616: 407, 617: 406, 618: 42926, 619: 11362, 620: 42925, 623: 412, 625: 11374, 626: 413, 629: 415, 637: 11364, 640: 422, 642: 42949, 643: 425, 647: 42929, 648: 430, 649: 580, 650: 433, 651: 434, 652: 581, 658: 439, 669: 42930, 670: 42928, 837: [921, 953, 8126], 880: 881, 881: 880, 882: 883, 883: 882, 886: 887, 887: 886, 891: 1021, 892: 1022, 893: 1023, 895: 1011, 902: 940, 904: 941, 905: 942, 906: 943, 908: 972, 910: 973, 911: 974, 912: 8147, 913: 945, 914: [946, 976], 915: 947, 916: 948, 917: [949, 1013], 918: 950, 919: 951, 920: [952, 977, 1012], 921: [837, 953, 8126], 922: [954, 1008], 923: 955, 924: [181, 956], 925: 957, 926: 958, 927: 959, 928: [960, 982], 929: [961, 1009], 931: [962, 963], 932: 964, 933: 965, 934: [966, 981], 935: 967, 936: 968, 937: [969, 8486], 938: 970, 939: 971, 940: 902, 941: 904, 942: 905, 943: 906, 944: 8163, 945: 913, 946: [914, 976], 947: 915, 948: 916, 949: [917, 1013], 950: 918, 951: 919, 952: [920, 977, 1012], 953: [837, 921, 8126], 954: [922, 1008], 955: 923, 956: [181, 924], 957: 925, 958: 926, 959: 927, 960: [928, 982], 961: [929, 1009], 962: [931, 963], 963: [931, 962], 964: 932, 965: 933, 966: [934, 981], 967: 935, 968: 936, 969: [937, 8486], 970: 938, 971: 939, 972: 908, 973: 910, 974: 911, 975: 983, 976: [914, 946], 977: [920, 952, 1012], 981: [934, 966], 982: [928, 960], 983: 975, 984: 985, 985: 984, 986: 987, 987: 986, 988: 989, 989: 988, 990: 991, 991: 990, 992: 993, 993: 992, 994: 995, 995: 994, 996: 997, 997: 996, 998: 999, 999: 998, 1000: 1001, 1001: 1000, 1002: 1003, 1003: 1002, 1004: 1005, 1005: 1004, 1006: 1007, 1007: 1006, 1008: [922, 954], 1009: [929, 961], 1010: 1017, 1011: 895, 1012: [920, 952, 977], 1013: [917, 949], 1015: 1016, 1016: 1015, 1017: 1010, 1018: 1019, 1019: 1018, 1021: 891, 1022: 892, 1023: 893, 1024: 1104, 1025: 1105, 1026: 1106, 1027: 1107, 1028: 1108, 1029: 1109, 1030: 1110, 1031: 1111, 1032: 1112, 1033: 1113, 1034: 1114, 1035: 1115, 1036: 1116, 1037: 1117, 1038: 1118, 1039: 1119, 1040: 1072, 1041: 1073, 1042: [1074, 7296], 1043: 1075, 1044: [1076, 7297], 1045: 1077, 1046: 1078, 1047: 1079, 1048: 1080, 1049: 1081, 1050: 1082, 1051: 1083, 1052: 1084, 1053: 1085, 1054: [1086, 7298], 1055: 1087, 1056: 1088, 1057: [1089, 7299], 1058: [1090, 7300, 7301], 1059: 1091, 1060: 1092, 1061: 1093, 1062: 1094, 1063: 1095, 1064: 1096, 1065: 1097, 1066: [1098, 7302], 1067: 1099, 1068: 1100, 1069: 1101, 1070: 1102, 1071: 1103, 1072: 1040, 1073: 1041, 1074: [1042, 7296], 1075: 1043, 1076: [1044, 7297], 1077: 1045, 1078: 1046, 1079: 1047, 1080: 1048, 1081: 1049, 1082: 1050, 1083: 1051, 1084: 1052, 1085: 1053, 1086: [1054, 7298], 1087: 1055, 1088: 1056, 1089: [1057, 7299], 1090: [1058, 7300, 7301], 1091: 1059, 1092: 1060, 1093: 1061, 1094: 1062, 1095: 1063, 1096: 1064, 1097: 1065, 1098: [1066, 7302], 1099: 1067, 1100: 1068, 1101: 1069, 1102: 1070, 1103: 1071, 1104: 1024, 1105: 1025, 1106: 1026, 1107: 1027, 1108: 1028, 1109: 1029, 1110: 1030, 1111: 1031, 1112: 1032, 1113: 1033, 1114: 1034, 1115: 1035, 1116: 1036, 1117: 1037, 1118: 1038, 1119: 1039, 1120: 1121, 1121: 1120, 1122: [1123, 7303], 1123: [1122, 7303], 1124: 1125, 1125: 1124, 1126: 1127, 1127: 1126, 1128: 1129, 1129: 1128, 1130: 1131, 1131: 1130, 1132: 1133, 1133: 1132, 1134: 1135, 1135: 1134, 1136: 1137, 1137: 1136, 1138: 1139, 1139: 1138, 1140: 1141, 1141: 1140, 1142: 1143, 1143: 1142, 1144: 1145, 1145: 1144, 1146: 1147, 1147: 1146, 1148: 1149, 1149: 1148, 1150: 1151, 1151: 1150, 1152: 1153, 1153: 1152, 1162: 1163, 1163: 1162, 1164: 1165, 1165: 1164, 1166: 1167, 1167: 1166, 1168: 1169, 1169: 1168, 1170: 1171, 1171: 1170, 1172: 1173, 1173: 1172, 1174: 1175, 1175: 1174, 1176: 1177, 1177: 1176, 1178: 1179, 1179: 1178, 1180: 1181, 1181: 1180, 1182: 1183, 1183: 1182, 1184: 1185, 1185: 1184, 1186: 1187, 1187: 1186, 1188: 1189, 1189: 1188, 1190: 1191, 1191: 1190, 1192: 1193, 1193: 1192, 1194: 1195, 1195: 1194, 1196: 1197, 1197: 1196, 1198: 1199, 1199: 1198, 1200: 1201, 1201: 1200, 1202: 1203, 1203: 1202, 1204: 1205, 1205: 1204, 1206: 1207, 1207: 1206, 1208: 1209, 1209: 1208, 1210: 1211, 1211: 1210, 1212: 1213, 1213: 1212, 1214: 1215, 1215: 1214, 1216: 1231, 1217: 1218, 1218: 1217, 1219: 1220, 1220: 1219, 1221: 1222, 1222: 1221, 1223: 1224, 1224: 1223, 1225: 1226, 1226: 1225, 1227: 1228, 1228: 1227, 1229: 1230, 1230: 1229, 1231: 1216, 1232: 1233, 1233: 1232, 1234: 1235, 1235: 1234, 1236: 1237, 1237: 1236, 1238: 1239, 1239: 1238, 1240: 1241, 1241: 1240, 1242: 1243, 1243: 1242, 1244: 1245, 1245: 1244, 1246: 1247, 1247: 1246, 1248: 1249, 1249: 1248, 1250: 1251, 1251: 1250, 1252: 1253, 1253: 1252, 1254: 1255, 1255: 1254, 1256: 1257, 1257: 1256, 1258: 1259, 1259: 1258, 1260: 1261, 1261: 1260, 1262: 1263, 1263: 1262, 1264: 1265, 1265: 1264, 1266: 1267, 1267: 1266, 1268: 1269, 1269: 1268, 1270: 1271, 1271: 1270, 1272: 1273, 1273: 1272, 1274: 1275, 1275: 1274, 1276: 1277, 1277: 1276, 1278: 1279, 1279: 1278, 1280: 1281, 1281: 1280, 1282: 1283, 1283: 1282, 1284: 1285, 1285: 1284, 1286: 1287, 1287: 1286, 1288: 1289, 1289: 1288, 1290: 1291, 1291: 1290, 1292: 1293, 1293: 1292, 1294: 1295, 1295: 1294, 1296: 1297, 1297: 1296, 1298: 1299, 1299: 1298, 1300: 1301, 1301: 1300, 1302: 1303, 1303: 1302, 1304: 1305, 1305: 1304, 1306: 1307, 1307: 1306, 1308: 1309, 1309: 1308, 1310: 1311, 1311: 1310, 1312: 1313, 1313: 1312, 1314: 1315, 1315: 1314, 1316: 1317, 1317: 1316, 1318: 1319, 1319: 1318, 1320: 1321, 1321: 1320, 1322: 1323, 1323: 1322, 1324: 1325, 1325: 1324, 1326: 1327, 1327: 1326, 1329: 1377, 1330: 1378, 1331: 1379, 1332: 1380, 1333: 1381, 1334: 1382, 1335: 1383, 1336: 1384, 1337: 1385, 1338: 1386, 1339: 1387, 1340: 1388, 1341: 1389, 1342: 1390, 1343: 1391, 1344: 1392, 1345: 1393, 1346: 1394, 1347: 1395, 1348: 1396, 1349: 1397, 1350: 1398, 1351: 1399, 1352: 1400, 1353: 1401, 1354: 1402, 1355: 1403, 1356: 1404, 1357: 1405, 1358: 1406, 1359: 1407, 1360: 1408, 1361: 1409, 1362: 1410, 1363: 1411, 1364: 1412, 1365: 1413, 1366: 1414, 1377: 1329, 1378: 1330, 1379: 1331, 1380: 1332, 1381: 1333, 1382: 1334, 1383: 1335, 1384: 1336, 1385: 1337, 1386: 1338, 1387: 1339, 1388: 1340, 1389: 1341, 1390: 1342, 1391: 1343, 1392: 1344, 1393: 1345, 1394: 1346, 1395: 1347, 1396: 1348, 1397: 1349, 1398: 1350, 1399: 1351, 1400: 1352, 1401: 1353, 1402: 1354, 1403: 1355, 1404: 1356, 1405: 1357, 1406: 1358, 1407: 1359, 1408: 1360, 1409: 1361, 1410: 1362, 1411: 1363, 1412: 1364, 1413: 1365, 1414: 1366, 4256: 11520, 4257: 11521, 4258: 11522, 4259: 11523, 4260: 11524, 4261: 11525, 4262: 11526, 4263: 11527, 4264: 11528, 4265: 11529, 4266: 11530, 4267: 11531, 4268: 11532, 4269: 11533, 4270: 11534, 4271: 11535, 4272: 11536, 4273: 11537, 4274: 11538, 4275: 11539, 4276: 11540, 4277: 11541, 4278: 11542, 4279: 11543, 4280: 11544, 4281: 11545, 4282: 11546, 4283: 11547, 4284: 11548, 4285: 11549, 4286: 11550, 4287: 11551, 4288: 11552, 4289: 11553, 4290: 11554, 4291: 11555, 4292: 11556, 4293: 11557, 4295: 11559, 4301: 11565, 4304: 7312, 4305: 7313, 4306: 7314, 4307: 7315, 4308: 7316, 4309: 7317, 4310: 7318, 4311: 7319, 4312: 7320, 4313: 7321, 4314: 7322, 4315: 7323, 4316: 7324, 4317: 7325, 4318: 7326, 4319: 7327, 4320: 7328, 4321: 7329, 4322: 7330, 4323: 7331, 4324: 7332, 4325: 7333, 4326: 7334, 4327: 7335, 4328: 7336, 4329: 7337, 4330: 7338, 4331: 7339, 4332: 7340, 4333: 7341, 4334: 7342, 4335: 7343, 4336: 7344, 4337: 7345, 4338: 7346, 4339: 7347, 4340: 7348, 4341: 7349, 4342: 7350, 4343: 7351, 4344: 7352, 4345: 7353, 4346: 7354, 4349: 7357, 4350: 7358, 4351: 7359, 5024: 43888, 5025: 43889, 5026: 43890, 5027: 43891, 5028: 43892, 5029: 43893, 5030: 43894, 5031: 43895, 5032: 43896, 5033: 43897, 5034: 43898, 5035: 43899, 5036: 43900, 5037: 43901, 5038: 43902, 5039: 43903, 5040: 43904, 5041: 43905, 5042: 43906, 5043: 43907, 5044: 43908, 5045: 43909, 5046: 43910, 5047: 43911, 5048: 43912, 5049: 43913, 5050: 43914, 5051: 43915, 5052: 43916, 5053: 43917, 5054: 43918, 5055: 43919, 5056: 43920, 5057: 43921, 5058: 43922, 5059: 43923, 5060: 43924, 5061: 43925, 5062: 43926, 5063: 43927, 5064: 43928, 5065: 43929, 5066: 43930, 5067: 43931, 5068: 43932, 5069: 43933, 5070: 43934, 5071: 43935, 5072: 43936, 5073: 43937, 5074: 43938, 5075: 43939, 5076: 43940, 5077: 43941, 5078: 43942, 5079: 43943, 5080: 43944, 5081: 43945, 5082: 43946, 5083: 43947, 5084: 43948, 5085: 43949, 5086: 43950, 5087: 43951, 5088: 43952, 5089: 43953, 5090: 43954, 5091: 43955, 5092: 43956, 5093: 43957, 5094: 43958, 5095: 43959, 5096: 43960, 5097: 43961, 5098: 43962, 5099: 43963, 5100: 43964, 5101: 43965, 5102: 43966, 5103: 43967, 5104: 5112, 5105: 5113, 5106: 5114, 5107: 5115, 5108: 5116, 5109: 5117, 5112: 5104, 5113: 5105, 5114: 5106, 5115: 5107, 5116: 5108, 5117: 5109, 7296: [1042, 1074], 7297: [1044, 1076], 7298: [1054, 1086], 7299: [1057, 1089], 7300: [1058, 1090, 7301], 7301: [1058, 1090, 7300], 7302: [1066, 1098], 7303: [1122, 1123], 7304: [42570, 42571], 7305: 7306, 7306: 7305, 7312: 4304, 7313: 4305, 7314: 4306, 7315: 4307, 7316: 4308, 7317: 4309, 7318: 4310, 7319: 4311, 7320: 4312, 7321: 4313, 7322: 4314, 7323: 4315, 7324: 4316, 7325: 4317, 7326: 4318, 7327: 4319, 7328: 4320, 7329: 4321, 7330: 4322, 7331: 4323, 7332: 4324, 7333: 4325, 7334: 4326, 7335: 4327, 7336: 4328, 7337: 4329, 7338: 4330, 7339: 4331, 7340: 4332, 7341: 4333, 7342: 4334, 7343: 4335, 7344: 4336, 7345: 4337, 7346: 4338, 7347: 4339, 7348: 4340, 7349: 4341, 7350: 4342, 7351: 4343, 7352: 4344, 7353: 4345, 7354: 4346, 7357: 4349, 7358: 4350, 7359: 4351, 7545: 42877, 7549: 11363, 7566: 42950, 7680: 7681, 7681: 7680, 7682: 7683, 7683: 7682, 7684: 7685, 7685: 7684, 7686: 7687, 7687: 7686, 7688: 7689, 7689: 7688, 7690: 7691, 7691: 7690, 7692: 7693, 7693: 7692, 7694: 7695, 7695: 7694, 7696: 7697, 7697: 7696, 7698: 7699, 7699: 7698, 7700: 7701, 7701: 7700, 7702: 7703, 7703: 7702, 7704: 7705, 7705: 7704, 7706: 7707, 7707: 7706, 7708: 7709, 7709: 7708, 7710: 7711, 7711: 7710, 7712: 7713, 7713: 7712, 7714: 7715, 7715: 7714, 7716: 7717, 7717: 7716, 7718: 7719, 7719: 7718, 7720: 7721, 7721: 7720, 7722: 7723, 7723: 7722, 7724: 7725, 7725: 7724, 7726: 7727, 7727: 7726, 7728: 7729, 7729: 7728, 7730: 7731, 7731: 7730, 7732: 7733, 7733: 7732, 7734: 7735, 7735: 7734, 7736: 7737, 7737: 7736, 7738: 7739, 7739: 7738, 7740: 7741, 7741: 7740, 7742: 7743, 7743: 7742, 7744: 7745, 7745: 7744, 7746: 7747, 7747: 7746, 7748: 7749, 7749: 7748, 7750: 7751, 7751: 7750, 7752: 7753, 7753: 7752, 7754: 7755, 7755: 7754, 7756: 7757, 7757: 7756, 7758: 7759, 7759: 7758, 7760: 7761, 7761: 7760, 7762: 7763, 7763: 7762, 7764: 7765, 7765: 7764, 7766: 7767, 7767: 7766, 7768: 7769, 7769: 7768, 7770: 7771, 7771: 7770, 7772: 7773, 7773: 7772, 7774: 7775, 7775: 7774, 7776: [7777, 7835], 7777: [7776, 7835], 7778: 7779, 7779: 7778, 7780: 7781, 7781: 7780, 7782: 7783, 7783: 7782, 7784: 7785, 7785: 7784, 7786: 7787, 7787: 7786, 7788: 7789, 7789: 7788, 7790: 7791, 7791: 7790, 7792: 7793, 7793: 7792, 7794: 7795, 7795: 7794, 7796: 7797, 7797: 7796, 7798: 7799, 7799: 7798, 7800: 7801, 7801: 7800, 7802: 7803, 7803: 7802, 7804: 7805, 7805: 7804, 7806: 7807, 7807: 7806, 7808: 7809, 7809: 7808, 7810: 7811, 7811: 7810, 7812: 7813, 7813: 7812, 7814: 7815, 7815: 7814, 7816: 7817, 7817: 7816, 7818: 7819, 7819: 7818, 7820: 7821, 7821: 7820, 7822: 7823, 7823: 7822, 7824: 7825, 7825: 7824, 7826: 7827, 7827: 7826, 7828: 7829, 7829: 7828, 7835: [7776, 7777], 7838: 223, 7840: 7841, 7841: 7840, 7842: 7843, 7843: 7842, 7844: 7845, 7845: 7844, 7846: 7847, 7847: 7846, 7848: 7849, 7849: 7848, 7850: 7851, 7851: 7850, 7852: 7853, 7853: 7852, 7854: 7855, 7855: 7854, 7856: 7857, 7857: 7856, 7858: 7859, 7859: 7858, 7860: 7861, 7861: 7860, 7862: 7863, 7863: 7862, 7864: 7865, 7865: 7864, 7866: 7867, 7867: 7866, 7868: 7869, 7869: 7868, 7870: 7871, 7871: 7870, 7872: 7873, 7873: 7872, 7874: 7875, 7875: 7874, 7876: 7877, 7877: 7876, 7878: 7879, 7879: 7878, 7880: 7881, 7881: 7880, 7882: 7883, 7883: 7882, 7884: 7885, 7885: 7884, 7886: 7887, 7887: 7886, 7888: 7889, 7889: 7888, 7890: 7891, 7891: 7890, 7892: 7893, 7893: 7892, 7894: 7895, 7895: 7894, 7896: 7897, 7897: 7896, 7898: 7899, 7899: 7898, 7900: 7901, 7901: 7900, 7902: 7903, 7903: 7902, 7904: 7905, 7905: 7904, 7906: 7907, 7907: 7906, 7908: 7909, 7909: 7908, 7910: 7911, 7911: 7910, 7912: 7913, 7913: 7912, 7914: 7915, 7915: 7914, 7916: 7917, 7917: 7916, 7918: 7919, 7919: 7918, 7920: 7921, 7921: 7920, 7922: 7923, 7923: 7922, 7924: 7925, 7925: 7924, 7926: 7927, 7927: 7926, 7928: 7929, 7929: 7928, 7930: 7931, 7931: 7930, 7932: 7933, 7933: 7932, 7934: 7935, 7935: 7934, 7936: 7944, 7937: 7945, 7938: 7946, 7939: 7947, 7940: 7948, 7941: 7949, 7942: 7950, 7943: 7951, 7944: 7936, 7945: 7937, 7946: 7938, 7947: 7939, 7948: 7940, 7949: 7941, 7950: 7942, 7951: 7943, 7952: 7960, 7953: 7961, 7954: 7962, 7955: 7963, 7956: 7964, 7957: 7965, 7960: 7952, 7961: 7953, 7962: 7954, 7963: 7955, 7964: 7956, 7965: 7957, 7968: 7976, 7969: 7977, 7970: 7978, 7971: 7979, 7972: 7980, 7973: 7981, 7974: 7982, 7975: 7983, 7976: 7968, 7977: 7969, 7978: 7970, 7979: 7971, 7980: 7972, 7981: 7973, 7982: 7974, 7983: 7975, 7984: 7992, 7985: 7993, 7986: 7994, 7987: 7995, 7988: 7996, 7989: 7997, 7990: 7998, 7991: 7999, 7992: 7984, 7993: 7985, 7994: 7986, 7995: 7987, 7996: 7988, 7997: 7989, 7998: 7990, 7999: 7991, 8000: 8008, 8001: 8009, 8002: 8010, 8003: 8011, 8004: 8012, 8005: 8013, 8008: 8000, 8009: 8001, 8010: 8002, 8011: 8003, 8012: 8004, 8013: 8005, 8017: 8025, 8019: 8027, 8021: 8029, 8023: 8031, 8025: 8017, 8027: 8019, 8029: 8021, 8031: 8023, 8032: 8040, 8033: 8041, 8034: 8042, 8035: 8043, 8036: 8044, 8037: 8045, 8038: 8046, 8039: 8047, 8040: 8032, 8041: 8033, 8042: 8034, 8043: 8035, 8044: 8036, 8045: 8037, 8046: 8038, 8047: 8039, 8048: 8122, 8049: 8123, 8050: 8136, 8051: 8137, 8052: 8138, 8053: 8139, 8054: 8154, 8055: 8155, 8056: 8184, 8057: 8185, 8058: 8170, 8059: 8171, 8060: 8186, 8061: 8187, 8064: 8072, 8065: 8073, 8066: 8074, 8067: 8075, 8068: 8076, 8069: 8077, 8070: 8078, 8071: 8079, 8072: 8064, 8073: 8065, 8074: 8066, 8075: 8067, 8076: 8068, 8077: 8069, 8078: 8070, 8079: 8071, 8080: 8088, 8081: 8089, 8082: 8090, 8083: 8091, 8084: 8092, 8085: 8093, 8086: 8094, 8087: 8095, 8088: 8080, 8089: 8081, 8090: 8082, 8091: 8083, 8092: 8084, 8093: 8085, 8094: 8086, 8095: 8087, 8096: 8104, 8097: 8105, 8098: 8106, 8099: 8107, 8100: 8108, 8101: 8109, 8102: 8110, 8103: 8111, 8104: 8096, 8105: 8097, 8106: 8098, 8107: 8099, 8108: 8100, 8109: 8101, 8110: 8102, 8111: 8103, 8112: 8120, 8113: 8121, 8115: 8124, 8120: 8112, 8121: 8113, 8122: 8048, 8123: 8049, 8124: 8115, 8126: [837, 921, 953], 8131: 8140, 8136: 8050, 8137: 8051, 8138: 8052, 8139: 8053, 8140: 8131, 8144: 8152, 8145: 8153, 8147: 912, 8152: 8144, 8153: 8145, 8154: 8054, 8155: 8055, 8160: 8168, 8161: 8169, 8163: 944, 8165: 8172, 8168: 8160, 8169: 8161, 8170: 8058, 8171: 8059, 8172: 8165, 8179: 8188, 8184: 8056, 8185: 8057, 8186: 8060, 8187: 8061, 8188: 8179, 8486: [937, 969], 8490: [75, 107], 8491: [197, 229], 8498: 8526, 8526: 8498, 8544: 8560, 8545: 8561, 8546: 8562, 8547: 8563, 8548: 8564, 8549: 8565, 8550: 8566, 8551: 8567, 8552: 8568, 8553: 8569, 8554: 8570, 8555: 8571, 8556: 8572, 8557: 8573, 8558: 8574, 8559: 8575, 8560: 8544, 8561: 8545, 8562: 8546, 8563: 8547, 8564: 8548, 8565: 8549, 8566: 8550, 8567: 8551, 8568: 8552, 8569: 8553, 8570: 8554, 8571: 8555, 8572: 8556, 8573: 8557, 8574: 8558, 8575: 8559, 8579: 8580, 8580: 8579, 9398: 9424, 9399: 9425, 9400: 9426, 9401: 9427, 9402: 9428, 9403: 9429, 9404: 9430, 9405: 9431, 9406: 9432, 9407: 9433, 9408: 9434, 9409: 9435, 9410: 9436, 9411: 9437, 9412: 9438, 9413: 9439, 9414: 9440, 9415: 9441, 9416: 9442, 9417: 9443, 9418: 9444, 9419: 9445, 9420: 9446, 9421: 9447, 9422: 9448, 9423: 9449, 9424: 9398, 9425: 9399, 9426: 9400, 9427: 9401, 9428: 9402, 9429: 9403, 9430: 9404, 9431: 9405, 9432: 9406, 9433: 9407, 9434: 9408, 9435: 9409, 9436: 9410, 9437: 9411, 9438: 9412, 9439: 9413, 9440: 9414, 9441: 9415, 9442: 9416, 9443: 9417, 9444: 9418, 9445: 9419, 9446: 9420, 9447: 9421, 9448: 9422, 9449: 9423, 11264: 11312, 11265: 11313, 11266: 11314, 11267: 11315, 11268: 11316, 11269: 11317, 11270: 11318, 11271: 11319, 11272: 11320, 11273: 11321, 11274: 11322, 11275: 11323, 11276: 11324, 11277: 11325, 11278: 11326, 11279: 11327, 11280: 11328, 11281: 11329, 11282: 11330, 11283: 11331, 11284: 11332, 11285: 11333, 11286: 11334, 11287: 11335, 11288: 11336, 11289: 11337, 11290: 11338, 11291: 11339, 11292: 11340, 11293: 11341, 11294: 11342, 11295: 11343, 11296: 11344, 11297: 11345, 11298: 11346, 11299: 11347, 11300: 11348, 11301: 11349, 11302: 11350, 11303: 11351, 11304: 11352, 11305: 11353, 11306: 11354, 11307: 11355, 11308: 11356, 11309: 11357, 11310: 11358, 11311: 11359, 11312: 11264, 11313: 11265, 11314: 11266, 11315: 11267, 11316: 11268, 11317: 11269, 11318: 11270, 11319: 11271, 11320: 11272, 11321: 11273, 11322: 11274, 11323: 11275, 11324: 11276, 11325: 11277, 11326: 11278, 11327: 11279, 11328: 11280, 11329: 11281, 11330: 11282, 11331: 11283, 11332: 11284, 11333: 11285, 11334: 11286, 11335: 11287, 11336: 11288, 11337: 11289, 11338: 11290, 11339: 11291, 11340: 11292, 11341: 11293, 11342: 11294, 11343: 11295, 11344: 11296, 11345: 11297, 11346: 11298, 11347: 11299, 11348: 11300, 11349: 11301, 11350: 11302, 11351: 11303, 11352: 11304, 11353: 11305, 11354: 11306, 11355: 11307, 11356: 11308, 11357: 11309, 11358: 11310, 11359: 11311, 11360: 11361, 11361: 11360, 11362: 619, 11363: 7549, 11364: 637, 11365: 570, 11366: 574, 11367: 11368, 11368: 11367, 11369: 11370, 11370: 11369, 11371: 11372, 11372: 11371, 11373: 593, 11374: 625, 11375: 592, 11376: 594, 11378: 11379, 11379: 11378, 11381: 11382, 11382: 11381, 11390: 575, 11391: 576, 11392: 11393, 11393: 11392, 11394: 11395, 11395: 11394, 11396: 11397, 11397: 11396, 11398: 11399, 11399: 11398, 11400: 11401, 11401: 11400, 11402: 11403, 11403: 11402, 11404: 11405, 11405: 11404, 11406: 11407, 11407: 11406, 11408: 11409, 11409: 11408, 11410: 11411, 11411: 11410, 11412: 11413, 11413: 11412, 11414: 11415, 11415: 11414, 11416: 11417, 11417: 11416, 11418: 11419, 11419: 11418, 11420: 11421, 11421: 11420, 11422: 11423, 11423: 11422, 11424: 11425, 11425: 11424, 11426: 11427, 11427: 11426, 11428: 11429, 11429: 11428, 11430: 11431, 11431: 11430, 11432: 11433, 11433: 11432, 11434: 11435, 11435: 11434, 11436: 11437, 11437: 11436, 11438: 11439, 11439: 11438, 11440: 11441, 11441: 11440, 11442: 11443, 11443: 11442, 11444: 11445, 11445: 11444, 11446: 11447, 11447: 11446, 11448: 11449, 11449: 11448, 11450: 11451, 11451: 11450, 11452: 11453, 11453: 11452, 11454: 11455, 11455: 11454, 11456: 11457, 11457: 11456, 11458: 11459, 11459: 11458, 11460: 11461, 11461: 11460, 11462: 11463, 11463: 11462, 11464: 11465, 11465: 11464, 11466: 11467, 11467: 11466, 11468: 11469, 11469: 11468, 11470: 11471, 11471: 11470, 11472: 11473, 11473: 11472, 11474: 11475, 11475: 11474, 11476: 11477, 11477: 11476, 11478: 11479, 11479: 11478, 11480: 11481, 11481: 11480, 11482: 11483, 11483: 11482, 11484: 11485, 11485: 11484, 11486: 11487, 11487: 11486, 11488: 11489, 11489: 11488, 11490: 11491, 11491: 11490, 11499: 11500, 11500: 11499, 11501: 11502, 11502: 11501, 11506: 11507, 11507: 11506, 11520: 4256, 11521: 4257, 11522: 4258, 11523: 4259, 11524: 4260, 11525: 4261, 11526: 4262, 11527: 4263, 11528: 4264, 11529: 4265, 11530: 4266, 11531: 4267, 11532: 4268, 11533: 4269, 11534: 4270, 11535: 4271, 11536: 4272, 11537: 4273, 11538: 4274, 11539: 4275, 11540: 4276, 11541: 4277, 11542: 4278, 11543: 4279, 11544: 4280, 11545: 4281, 11546: 4282, 11547: 4283, 11548: 4284, 11549: 4285, 11550: 4286, 11551: 4287, 11552: 4288, 11553: 4289, 11554: 4290, 11555: 4291, 11556: 4292, 11557: 4293, 11559: 4295, 11565: 4301, 42560: 42561, 42561: 42560, 42562: 42563, 42563: 42562, 42564: 42565, 42565: 42564, 42566: 42567, 42567: 42566, 42568: 42569, 42569: 42568, 42570: [7304, 42571], 42571: [7304, 42570], 42572: 42573, 42573: 42572, 42574: 42575, 42575: 42574, 42576: 42577, 42577: 42576, 42578: 42579, 42579: 42578, 42580: 42581, 42581: 42580, 42582: 42583, 42583: 42582, 42584: 42585, 42585: 42584, 42586: 42587, 42587: 42586, 42588: 42589, 42589: 42588, 42590: 42591, 42591: 42590, 42592: 42593, 42593: 42592, 42594: 42595, 42595: 42594, 42596: 42597, 42597: 42596, 42598: 42599, 42599: 42598, 42600: 42601, 42601: 42600, 42602: 42603, 42603: 42602, 42604: 42605, 42605: 42604, 42624: 42625, 42625: 42624, 42626: 42627, 42627: 42626, 42628: 42629, 42629: 42628, 42630: 42631, 42631: 42630, 42632: 42633, 42633: 42632, 42634: 42635, 42635: 42634, 42636: 42637, 42637: 42636, 42638: 42639, 42639: 42638, 42640: 42641, 42641: 42640, 42642: 42643, 42643: 42642, 42644: 42645, 42645: 42644, 42646: 42647, 42647: 42646, 42648: 42649, 42649: 42648, 42650: 42651, 42651: 42650, 42786: 42787, 42787: 42786, 42788: 42789, 42789: 42788, 42790: 42791, 42791: 42790, 42792: 42793, 42793: 42792, 42794: 42795, 42795: 42794, 42796: 42797, 42797: 42796, 42798: 42799, 42799: 42798, 42802: 42803, 42803: 42802, 42804: 42805, 42805: 42804, 42806: 42807, 42807: 42806, 42808: 42809, 42809: 42808, 42810: 42811, 42811: 42810, 42812: 42813, 42813: 42812, 42814: 42815, 42815: 42814, 42816: 42817, 42817: 42816, 42818: 42819, 42819: 42818, 42820: 42821, 42821: 42820, 42822: 42823, 42823: 42822, 42824: 42825, 42825: 42824, 42826: 42827, 42827: 42826, 42828: 42829, 42829: 42828, 42830: 42831, 42831: 42830, 42832: 42833, 42833: 42832, 42834: 42835, 42835: 42834, 42836: 42837, 42837: 42836, 42838: 42839, 42839: 42838, 42840: 42841, 42841: 42840, 42842: 42843, 42843: 42842, 42844: 42845, 42845: 42844, 42846: 42847, 42847: 42846, 42848: 42849, 42849: 42848, 42850: 42851, 42851: 42850, 42852: 42853, 42853: 42852, 42854: 42855, 42855: 42854, 42856: 42857, 42857: 42856, 42858: 42859, 42859: 42858, 42860: 42861, 42861: 42860, 42862: 42863, 42863: 42862, 42873: 42874, 42874: 42873, 42875: 42876, 42876: 42875, 42877: 7545, 42878: 42879, 42879: 42878, 42880: 42881, 42881: 42880, 42882: 42883, 42883: 42882, 42884: 42885, 42885: 42884, 42886: 42887, 42887: 42886, 42891: 42892, 42892: 42891, 42893: 613, 42896: 42897, 42897: 42896, 42898: 42899, 42899: 42898, 42900: 42948, 42902: 42903, 42903: 42902, 42904: 42905, 42905: 42904, 42906: 42907, 42907: 42906, 42908: 42909, 42909: 42908, 42910: 42911, 42911: 42910, 42912: 42913, 42913: 42912, 42914: 42915, 42915: 42914, 42916: 42917, 42917: 42916, 42918: 42919, 42919: 42918, 42920: 42921, 42921: 42920, 42922: 614, 42923: 604, 42924: 609, 42925: 620, 42926: 618, 42928: 670, 42929: 647, 42930: 669, 42931: 43859, 42932: 42933, 42933: 42932, 42934: 42935, 42935: 42934, 42936: 42937, 42937: 42936, 42938: 42939, 42939: 42938, 42940: 42941, 42941: 42940, 42942: 42943, 42943: 42942, 42944: 42945, 42945: 42944, 42946: 42947, 42947: 42946, 42948: 42900, 42949: 642, 42950: 7566, 42951: 42952, 42952: 42951, 42953: 42954, 42954: 42953, 42955: 612, 42956: 42957, 42957: 42956, 42960: 42961, 42961: 42960, 42966: 42967, 42967: 42966, 42968: 42969, 42969: 42968, 42970: 42971, 42971: 42970, 42972: 411, 42997: 42998, 42998: 42997, 43859: 42931, 43888: 5024, 43889: 5025, 43890: 5026, 43891: 5027, 43892: 5028, 43893: 5029, 43894: 5030, 43895: 5031, 43896: 5032, 43897: 5033, 43898: 5034, 43899: 5035, 43900: 5036, 43901: 5037, 43902: 5038, 43903: 5039, 43904: 5040, 43905: 5041, 43906: 5042, 43907: 5043, 43908: 5044, 43909: 5045, 43910: 5046, 43911: 5047, 43912: 5048, 43913: 5049, 43914: 5050, 43915: 5051, 43916: 5052, 43917: 5053, 43918: 5054, 43919: 5055, 43920: 5056, 43921: 5057, 43922: 5058, 43923: 5059, 43924: 5060, 43925: 5061, 43926: 5062, 43927: 5063, 43928: 5064, 43929: 5065, 43930: 5066, 43931: 5067, 43932: 5068, 43933: 5069, 43934: 5070, 43935: 5071, 43936: 5072, 43937: 5073, 43938: 5074, 43939: 5075, 43940: 5076, 43941: 5077, 43942: 5078, 43943: 5079, 43944: 5080, 43945: 5081, 43946: 5082, 43947: 5083, 43948: 5084, 43949: 5085, 43950: 5086, 43951: 5087, 43952: 5088, 43953: 5089, 43954: 5090, 43955: 5091, 43956: 5092, 43957: 5093, 43958: 5094, 43959: 5095, 43960: 5096, 43961: 5097, 43962: 5098, 43963: 5099, 43964: 5100, 43965: 5101, 43966: 5102, 43967: 5103, 64261: 64262, 64262: 64261, 65313: 65345, 65314: 65346, 65315: 65347, 65316: 65348, 65317: 65349, 65318: 65350, 65319: 65351, 65320: 65352, 65321: 65353, 65322: 65354, 65323: 65355, 65324: 65356, 65325: 65357, 65326: 65358, 65327: 65359, 65328: 65360, 65329: 65361, 65330: 65362, 65331: 65363, 65332: 65364, 65333: 65365, 65334: 65366, 65335: 65367, 65336: 65368, 65337: 65369, 65338: 65370, 65345: 65313, 65346: 65314, 65347: 65315, 65348: 65316, 65349: 65317, 65350: 65318, 65351: 65319, 65352: 65320, 65353: 65321, 65354: 65322, 65355: 65323, 65356: 65324, 65357: 65325, 65358: 65326, 65359: 65327, 65360: 65328, 65361: 65329, 65362: 65330, 65363: 65331, 65364: 65332, 65365: 65333, 65366: 65334, 65367: 65335, 65368: 65336, 65369: 65337, 65370: 65338, 66560: 66600, 66561: 66601, 66562: 66602, 66563: 66603, 66564: 66604, 66565: 66605, 66566: 66606, 66567: 66607, 66568: 66608, 66569: 66609, 66570: 66610, 66571: 66611, 66572: 66612, 66573: 66613, 66574: 66614, 66575: 66615, 66576: 66616, 66577: 66617, 66578: 66618, 66579: 66619, 66580: 66620, 66581: 66621, 66582: 66622, 66583: 66623, 66584: 66624, 66585: 66625, 66586: 66626, 66587: 66627, 66588: 66628, 66589: 66629, 66590: 66630, 66591: 66631, 66592: 66632, 66593: 66633, 66594: 66634, 66595: 66635, 66596: 66636, 66597: 66637, 66598: 66638, 66599: 66639, 66600: 66560, 66601: 66561, 66602: 66562, 66603: 66563, 66604: 66564, 66605: 66565, 66606: 66566, 66607: 66567, 66608: 66568, 66609: 66569, 66610: 66570, 66611: 66571, 66612: 66572, 66613: 66573, 66614: 66574, 66615: 66575, 66616: 66576, 66617: 66577, 66618: 66578, 66619: 66579, 66620: 66580, 66621: 66581, 66622: 66582, 66623: 66583, 66624: 66584, 66625: 66585, 66626: 66586, 66627: 66587, 66628: 66588, 66629: 66589, 66630: 66590, 66631: 66591, 66632: 66592, 66633: 66593, 66634: 66594, 66635: 66595, 66636: 66596, 66637: 66597, 66638: 66598, 66639: 66599, 66736: 66776, 66737: 66777, 66738: 66778, 66739: 66779, 66740: 66780, 66741: 66781, 66742: 66782, 66743: 66783, 66744: 66784, 66745: 66785, 66746: 66786, 66747: 66787, 66748: 66788, 66749: 66789, 66750: 66790, 66751: 66791, 66752: 66792, 66753: 66793, 66754: 66794, 66755: 66795, 66756: 66796, 66757: 66797, 66758: 66798, 66759: 66799, 66760: 66800, 66761: 66801, 66762: 66802, 66763: 66803, 66764: 66804, 66765: 66805, 66766: 66806, 66767: 66807, 66768: 66808, 66769: 66809, 66770: 66810, 66771: 66811, 66776: 66736, 66777: 66737, 66778: 66738, 66779: 66739, 66780: 66740, 66781: 66741, 66782: 66742, 66783: 66743, 66784: 66744, 66785: 66745, 66786: 66746, 66787: 66747, 66788: 66748, 66789: 66749, 66790: 66750, 66791: 66751, 66792: 66752, 66793: 66753, 66794: 66754, 66795: 66755, 66796: 66756, 66797: 66757, 66798: 66758, 66799: 66759, 66800: 66760, 66801: 66761, 66802: 66762, 66803: 66763, 66804: 66764, 66805: 66765, 66806: 66766, 66807: 66767, 66808: 66768, 66809: 66769, 66810: 66770, 66811: 66771, 66928: 66967, 66929: 66968, 66930: 66969, 66931: 66970, 66932: 66971, 66933: 66972, 66934: 66973, 66935: 66974, 66936: 66975, 66937: 66976, 66938: 66977, 66940: 66979, 66941: 66980, 66942: 66981, 66943: 66982, 66944: 66983, 66945: 66984, 66946: 66985, 66947: 66986, 66948: 66987, 66949: 66988, 66950: 66989, 66951: 66990, 66952: 66991, 66953: 66992, 66954: 66993, 66956: 66995, 66957: 66996, 66958: 66997, 66959: 66998, 66960: 66999, 66961: 67000, 66962: 67001, 66964: 67003, 66965: 67004, 66967: 66928, 66968: 66929, 66969: 66930, 66970: 66931, 66971: 66932, 66972: 66933, 66973: 66934, 66974: 66935, 66975: 66936, 66976: 66937, 66977: 66938, 66979: 66940, 66980: 66941, 66981: 66942, 66982: 66943, 66983: 66944, 66984: 66945, 66985: 66946, 66986: 66947, 66987: 66948, 66988: 66949, 66989: 66950, 66990: 66951, 66991: 66952, 66992: 66953, 66993: 66954, 66995: 66956, 66996: 66957, 66997: 66958, 66998: 66959, 66999: 66960, 67000: 66961, 67001: 66962, 67003: 66964, 67004: 66965, 68736: 68800, 68737: 68801, 68738: 68802, 68739: 68803, 68740: 68804, 68741: 68805, 68742: 68806, 68743: 68807, 68744: 68808, 68745: 68809, 68746: 68810, 68747: 68811, 68748: 68812, 68749: 68813, 68750: 68814, 68751: 68815, 68752: 68816, 68753: 68817, 68754: 68818, 68755: 68819, 68756: 68820, 68757: 68821, 68758: 68822, 68759: 68823, 68760: 68824, 68761: 68825, 68762: 68826, 68763: 68827, 68764: 68828, 68765: 68829, 68766: 68830, 68767: 68831, 68768: 68832, 68769: 68833, 68770: 68834, 68771: 68835, 68772: 68836, 68773: 68837, 68774: 68838, 68775: 68839, 68776: 68840, 68777: 68841, 68778: 68842, 68779: 68843, 68780: 68844, 68781: 68845, 68782: 68846, 68783: 68847, 68784: 68848, 68785: 68849, 68786: 68850, 68800: 68736, 68801: 68737, 68802: 68738, 68803: 68739, 68804: 68740, 68805: 68741, 68806: 68742, 68807: 68743, 68808: 68744, 68809: 68745, 68810: 68746, 68811: 68747, 68812: 68748, 68813: 68749, 68814: 68750, 68815: 68751, 68816: 68752, 68817: 68753, 68818: 68754, 68819: 68755, 68820: 68756, 68821: 68757, 68822: 68758, 68823: 68759, 68824: 68760, 68825: 68761, 68826: 68762, 68827: 68763, 68828: 68764, 68829: 68765, 68830: 68766, 68831: 68767, 68832: 68768, 68833: 68769, 68834: 68770, 68835: 68771, 68836: 68772, 68837: 68773, 68838: 68774, 68839: 68775, 68840: 68776, 68841: 68777, 68842: 68778, 68843: 68779, 68844: 68780, 68845: 68781, 68846: 68782, 68847: 68783, 68848: 68784, 68849: 68785, 68850: 68786, 68944: 68976, 68945: 68977, 68946: 68978, 68947: 68979, 68948: 68980, 68949: 68981, 68950: 68982, 68951: 68983, 68952: 68984, 68953: 68985, 68954: 68986, 68955: 68987, 68956: 68988, 68957: 68989, 68958: 68990, 68959: 68991, 68960: 68992, 68961: 68993, 68962: 68994, 68963: 68995, 68964: 68996, 68965: 68997, 68976: 68944, 68977: 68945, 68978: 68946, 68979: 68947, 68980: 68948, 68981: 68949, 68982: 68950, 68983: 68951, 68984: 68952, 68985: 68953, 68986: 68954, 68987: 68955, 68988: 68956, 68989: 68957, 68990: 68958, 68991: 68959, 68992: 68960, 68993: 68961, 68994: 68962, 68995: 68963, 68996: 68964, 68997: 68965, 71840: 71872, 71841: 71873, 71842: 71874, 71843: 71875, 71844: 71876, 71845: 71877, 71846: 71878, 71847: 71879, 71848: 71880, 71849: 71881, 71850: 71882, 71851: 71883, 71852: 71884, 71853: 71885, 71854: 71886, 71855: 71887, 71856: 71888, 71857: 71889, 71858: 71890, 71859: 71891, 71860: 71892, 71861: 71893, 71862: 71894, 71863: 71895, 71864: 71896, 71865: 71897, 71866: 71898, 71867: 71899, 71868: 71900, 71869: 71901, 71870: 71902, 71871: 71903, 71872: 71840, 71873: 71841, 71874: 71842, 71875: 71843, 71876: 71844, 71877: 71845, 71878: 71846, 71879: 71847, 71880: 71848, 71881: 71849, 71882: 71850, 71883: 71851, 71884: 71852, 71885: 71853, 71886: 71854, 71887: 71855, 71888: 71856, 71889: 71857, 71890: 71858, 71891: 71859, 71892: 71860, 71893: 71861, 71894: 71862, 71895: 71863, 71896: 71864, 71897: 71865, 71898: 71866, 71899: 71867, 71900: 71868, 71901: 71869, 71902: 71870, 71903: 71871, 93760: 93792, 93761: 93793, 93762: 93794, 93763: 93795, 93764: 93796, 93765: 93797, 93766: 93798, 93767: 93799, 93768: 93800, 93769: 93801, 93770: 93802, 93771: 93803, 93772: 93804, 93773: 93805, 93774: 93806, 93775: 93807, 93776: 93808, 93777: 93809, 93778: 93810, 93779: 93811, 93780: 93812, 93781: 93813, 93782: 93814, 93783: 93815, 93784: 93816, 93785: 93817, 93786: 93818, 93787: 93819, 93788: 93820, 93789: 93821, 93790: 93822, 93791: 93823, 93792: 93760, 93793: 93761, 93794: 93762, 93795: 93763, 93796: 93764, 93797: 93765, 93798: 93766, 93799: 93767, 93800: 93768, 93801: 93769, 93802: 93770, 93803: 93771, 93804: 93772, 93805: 93773, 93806: 93774, 93807: 93775, 93808: 93776, 93809: 93777, 93810: 93778, 93811: 93779, 93812: 93780, 93813: 93781, 93814: 93782, 93815: 93783, 93816: 93784, 93817: 93785, 93818: 93786, 93819: 93787, 93820: 93788, 93821: 93789, 93822: 93790, 93823: 93791, 125184: 125218, 125185: 125219, 125186: 125220, 125187: 125221, 125188: 125222, 125189: 125223, 125190: 125224, 125191: 125225, 125192: 125226, 125193: 125227, 125194: 125228, 125195: 125229, 125196: 125230, 125197: 125231, 125198: 125232, 125199: 125233, 125200: 125234, 125201: 125235, 125202: 125236, 125203: 125237, 125204: 125238, 125205: 125239, 125206: 125240, 125207: 125241, 125208: 125242, 125209: 125243, 125210: 125244, 125211: 125245, 125212: 125246, 125213: 125247, 125214: 125248, 125215: 125249, 125216: 125250, 125217: 125251, 125218: 125184, 125219: 125185, 125220: 125186, 125221: 125187, 125222: 125188, 125223: 125189, 125224: 125190, 125225: 125191, 125226: 125192, 125227: 125193, 125228: 125194, 125229: 125195, 125230: 125196, 125231: 125197, 125232: 125198, 125233: 125199, 125234: 125200, 125235: 125201, 125236: 125202, 125237: 125203, 125238: 125204, 125239: 125205, 125240: 125206, 125241: 125207, 125242: 125208, 125243: 125209, 125244: 125210, 125245: 125211, 125246: 125212, 125247: 125213, 125248: 125214, 125249: 125215, 125250: 125216, 125251: 125217 };
