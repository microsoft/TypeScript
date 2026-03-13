import { CharacterCodes } from "#enums/characterCodes";
import { CommentDirectiveType } from "#enums/commentDirectiveType";
import { LanguageVariant } from "#enums/languageVariant";
import { RegularExpressionFlags } from "#enums/regularExpressionFlags";
import { ScriptKind } from "#enums/scriptKind";
import { ScriptTarget } from "#enums/scriptTarget";
import { SyntaxKind } from "#enums/syntaxKind";
import { TokenFlags } from "#enums/tokenFlags";
import type {
    JSDocSyntaxKind,
    JsxTokenSyntaxKind,
    KeywordSyntaxKind,
} from "./nodes.ts";

export interface CommentDirective {
    range: { pos: number; end: number; };
    type: CommentDirectiveType;
}

// Internal-only, not exported
const EscapeSequenceScanningFlags = {
    String: 1 << 0,
    ReportErrors: 1 << 1,
    RegularExpression: 1 << 2,
    AnnexB: 1 << 3,
    AnyUnicodeMode: 1 << 4,
    AtomEscape: 1 << 5,
    ReportInvalidEscapeErrors: (1 << 2) | (1 << 1),
    AllowExtendedUnicodeEscape: (1 << 0) | (1 << 4),
} as const;
type EscapeSequenceScanningFlags = typeof EscapeSequenceScanningFlags[keyof typeof EscapeSequenceScanningFlags];

export function tokenIsIdentifierOrKeyword(token: SyntaxKind): boolean {
    return token >= SyntaxKind.Identifier;
}

export function tokenIsIdentifierOrKeywordOrGreaterThan(token: SyntaxKind): boolean {
    return token === SyntaxKind.GreaterThanToken || tokenIsIdentifierOrKeyword(token);
}

export interface Scanner {
    getTokenFullStart(): number;
    getToken(): SyntaxKind;
    getTokenStart(): number;
    getTokenEnd(): number;
    getTokenText(): string;
    getTokenValue(): string;
    hasUnicodeEscape(): boolean;
    hasExtendedUnicodeEscape(): boolean;
    hasPrecedingLineBreak(): boolean;
    hasPrecedingJSDocComment(): boolean;
    hasPrecedingJSDocLeadingAsterisks(): boolean;
    hasPrecedingJSDocWithDeprecatedTag(): boolean;
    hasPrecedingJSDocWithSeeOrLink(): boolean;
    isIdentifier(): boolean;
    isReservedWord(): boolean;
    isUnterminated(): boolean;
    getNumericLiteralFlags(): TokenFlags;
    getCommentDirectives(): CommentDirective[] | undefined;
    getTokenFlags(): TokenFlags;
    reScanGreaterToken(): SyntaxKind;
    reScanSlashToken(): SyntaxKind;
    reScanAsteriskEqualsToken(): SyntaxKind;
    reScanTemplateToken(isTaggedTemplate: boolean): SyntaxKind;
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
    scanJSDocCommentTextToken(inBackticks: boolean): JSDocSyntaxKind | SyntaxKind.JSDocCommentTextToken;
    scan(): SyntaxKind;

    getText(): string;
    clearCommentDirectives(): void;
    setText(text: string | undefined, start?: number, length?: number): void;
    setLanguageVariant(variant: LanguageVariant): void;
    setScriptKind(scriptKind: ScriptKind): void;
    resetTokenState(pos: number): void;
    setSkipJsDocLeadingAsterisks(skip: boolean): void;
    lookAhead<T>(callback: () => T): T;
    scanRange<T>(start: number, length: number, callback: () => T): T;
    tryScan<T>(callback: () => T): T;
}

export const textToKeywordObj: Record<string, KeywordSyntaxKind> = {
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
    defer: SyntaxKind.DeferKeyword,
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
} as Record<string, SyntaxKind>));

const charCodeToRegExpFlag = new Map<number, RegularExpressionFlags>([
    [CharacterCodes.d, RegularExpressionFlags.HasIndices],
    [CharacterCodes.g, RegularExpressionFlags.Global],
    [CharacterCodes.i, RegularExpressionFlags.IgnoreCase],
    [CharacterCodes.m, RegularExpressionFlags.Multiline],
    [CharacterCodes.s, RegularExpressionFlags.DotAll],
    [CharacterCodes.u, RegularExpressionFlags.Unicode],
    [CharacterCodes.v, RegularExpressionFlags.UnicodeSets],
    [CharacterCodes.y, RegularExpressionFlags.Sticky],
]);

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

const commentDirectiveRegExSingleLine = /^\/\/\/?\s*@(ts-expect-error|ts-ignore)/;
const commentDirectiveRegExMultiLine = /^(?:\/|\*)*\s*@(ts-expect-error|ts-ignore)/;

const jsDocTagTerminators = new Set([" ", "\t", "\n", "\r", "}", "*"]);

function hasJSDocTag(text: string, offset: number, ...tags: string[]): boolean {
    for (const tag of tags) {
        if (text.startsWith(tag, offset)) {
            if (offset + tag.length === text.length) {
                return true;
            }
            if (jsDocTagTerminators.has(text[offset + tag.length])) {
                return true;
            }
        }
    }
    return false;
}

function scanJSDocCommentForTags(text: string, tokenFlags: TokenFlags): TokenFlags {
    let offset = 0;
    while (true) {
        const i = text.indexOf("@", offset);
        if (i < 0) {
            return tokenFlags;
        }
        offset = i + 1;
        if (!(tokenFlags & TokenFlags.PrecedingJSDocWithDeprecated) && hasJSDocTag(text, offset, "deprecated")) {
            tokenFlags |= TokenFlags.PrecedingJSDocWithDeprecated;
        }
        if (!(tokenFlags & TokenFlags.PrecedingJSDocWithSeeOrLink) && hasJSDocTag(text, offset, "see", "link", "linkcode", "linkplain")) {
            tokenFlags |= TokenFlags.PrecedingJSDocWithSeeOrLink;
        }
        if (
            (tokenFlags & (TokenFlags.PrecedingJSDocWithDeprecated | TokenFlags.PrecedingJSDocWithSeeOrLink)) ===
                (TokenFlags.PrecedingJSDocWithDeprecated | TokenFlags.PrecedingJSDocWithSeeOrLink)
        ) {
            return tokenFlags;
        }
    }
}

function lookupInUnicodeMap(code: number, map: readonly number[]): boolean {
    if (code < map[0]) {
        return false;
    }

    let lo = 0;
    let hi: number = map.length;
    let mid: number;

    while (lo + 1 < hi) {
        mid = lo + (hi - lo) / 2;
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

export function isUnicodeIdentifierStart(code: number): boolean {
    return lookupInUnicodeMap(code, unicodeESNextIdentifierStart);
}

function isUnicodeIdentifierPart(code: number): boolean {
    return lookupInUnicodeMap(code, unicodeESNextIdentifierPart);
}

function makeReverseMap<T>(source: Map<T, number>): T[] {
    const result: T[] = [];
    source.forEach((value, name) => {
        result[value] = name;
    });
    return result;
}

const tokenStrings = makeReverseMap(textToToken);

export function tokenToString(t: SyntaxKind): string | undefined {
    return tokenStrings[t];
}

export function stringToToken(s: string): SyntaxKind | undefined {
    return textToToken.get(s);
}

export function characterCodeToRegularExpressionFlag(ch: number): RegularExpressionFlags | undefined {
    return charCodeToRegExpFlag.get(ch);
}

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

export function isWhiteSpaceLike(ch: number): boolean {
    return isWhiteSpaceSingleLine(ch) || isLineBreak(ch);
}

export function isWhiteSpaceSingleLine(ch: number): boolean {
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

function isOctalDigit(ch: number): boolean {
    return ch >= CharacterCodes._0 && ch <= CharacterCodes._7;
}

export function couldStartTrivia(text: string, pos: number): boolean {
    const ch = text.charCodeAt(pos);
    switch (ch) {
        case CharacterCodes.carriageReturn:
        case CharacterCodes.lineFeed:
        case CharacterCodes.tab:
        case CharacterCodes.verticalTab:
        case CharacterCodes.formFeed:
        case CharacterCodes.space:
        case CharacterCodes.slash:
        case CharacterCodes.lessThan:
        case CharacterCodes.bar:
        case CharacterCodes.equals:
        case CharacterCodes.greaterThan:
            return true;
        case CharacterCodes.hash:
            return pos === 0;
        default:
            return ch > CharacterCodes.maxAsciiCharacter;
    }
}

export function skipTrivia(text: string, pos: number, stopAfterLineBreak?: boolean, stopAtComments?: boolean, inJSDoc?: boolean): number {
    if (pos < 0) {
        return pos;
    }

    let canConsumeStar = false;
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

function isConflictMarkerTrivia(text: string, pos: number) {
    if (pos >= text.length) {
        return false;
    }

    const ch = text.charCodeAt(pos);

    if (pos === 0 || isLineBreak(text.charCodeAt(pos - 1))) {
        if (ch === CharacterCodes.lessThan || ch === CharacterCodes.greaterThan || ch === CharacterCodes.equals) {
            if (pos + 6 < text.length && text.charCodeAt(pos + 1) === ch && text.charCodeAt(pos + 2) === ch && text.charCodeAt(pos + 3) === ch && text.charCodeAt(pos + 4) === ch && text.charCodeAt(pos + 5) === ch && text.charCodeAt(pos + 6) === ch) {
                return ch === CharacterCodes.equals || text.charCodeAt(pos + 7) === CharacterCodes.space;
            }
        }
        if (ch === CharacterCodes.bar && pos + 6 < text.length && text.charCodeAt(pos + 1) === ch && text.charCodeAt(pos + 2) === ch && text.charCodeAt(pos + 3) === ch && text.charCodeAt(pos + 4) === ch && text.charCodeAt(pos + 5) === ch && text.charCodeAt(pos + 6) === ch) {
            return true;
        }
    }

    return false;
}

function scanConflictMarkerTrivia(text: string, pos: number): number {
    const ch = text.charCodeAt(pos);
    const len = text.length;

    if (ch === CharacterCodes.lessThan || ch === CharacterCodes.greaterThan) {
        while (pos < len && !isLineBreak(text.charCodeAt(pos))) {
            pos++;
        }
    }
    else {
        // Consume everything from the start of a ||||||| or ======= marker to the start
        // of the next ======= or >>>>>>> marker.
        pos += 7; // skip marker
        while (pos < len) {
            const currentChar = text.charCodeAt(pos);
            if ((currentChar === CharacterCodes.equals || currentChar === CharacterCodes.greaterThan) && isConflictMarkerTrivia(text, pos)) {
                break;
            }
            pos++;
        }
    }

    return pos;
}

function isShebangTrivia(text: string, pos: number) {
    return pos === 0 && text.charCodeAt(0) === CharacterCodes.hash && text.charCodeAt(1) === CharacterCodes.exclamation;
}

function scanShebangTrivia(text: string, pos: number) {
    pos += 2;
    while (pos < text.length) {
        if (isLineBreak(text.charCodeAt(pos))) {
            break;
        }
        pos++;
    }
    return pos;
}

export type CommentKind = SyntaxKind.SingleLineCommentTrivia | SyntaxKind.MultiLineCommentTrivia;

export interface CommentRange {
    pos: number;
    end: number;
    hasTrailingNewLine?: boolean;
    kind: CommentKind;
}

function iterateCommentRanges<T, U>(
    reduce: boolean,
    text: string,
    pos: number,
    trailing: boolean,
    cb: (pos: number, end: number, kind: CommentKind, hasTrailingNewLine: boolean, state: T, memo: U | undefined) => U,
    state: T,
    initial?: U,
): U | undefined {
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
                    const kind: CommentKind = nextChar === CharacterCodes.slash ? SyntaxKind.SingleLineCommentTrivia : SyntaxKind.MultiLineCommentTrivia;
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

function appendCommentRange(pos: number, end: number, kind: CommentKind, hasTrailingNewLine: boolean, _state: any, comments: CommentRange[] = []) {
    comments.push({ kind, pos, end, hasTrailingNewLine });
    return comments;
}

export function forEachLeadingCommentRange<T, U>(text: string, pos: number, cb: (pos: number, end: number, kind: CommentKind, hasTrailingNewLine: boolean, state: T) => U, state: T): U | undefined;
export function forEachLeadingCommentRange<U>(text: string, pos: number, cb: (pos: number, end: number, kind: CommentKind, hasTrailingNewLine: boolean) => U): U | undefined;
export function forEachLeadingCommentRange<T, U>(text: string, pos: number, cb: (pos: number, end: number, kind: CommentKind, hasTrailingNewLine: boolean, state: T) => U, state?: T): U | undefined {
    return iterateCommentRanges(/*reduce*/ false, text, pos, /*trailing*/ false, cb, state!, /*initial*/ undefined);
}

export function forEachTrailingCommentRange<T, U>(text: string, pos: number, cb: (pos: number, end: number, kind: CommentKind, hasTrailingNewLine: boolean, state: T) => U, state: T): U | undefined;
export function forEachTrailingCommentRange<U>(text: string, pos: number, cb: (pos: number, end: number, kind: CommentKind, hasTrailingNewLine: boolean) => U): U | undefined;
export function forEachTrailingCommentRange<T, U>(text: string, pos: number, cb: (pos: number, end: number, kind: CommentKind, hasTrailingNewLine: boolean, state: T) => U, state?: T): U | undefined {
    return iterateCommentRanges(/*reduce*/ false, text, pos, /*trailing*/ true, cb, state!, /*initial*/ undefined);
}

export function reduceEachLeadingCommentRange<T, U>(text: string, pos: number, cb: (pos: number, end: number, kind: CommentKind, hasTrailingNewLine: boolean, state: T) => U, state: T, initial: U): U | undefined {
    return iterateCommentRanges(/*reduce*/ true, text, pos, /*trailing*/ false, cb, state, initial);
}

export function reduceEachTrailingCommentRange<T, U>(text: string, pos: number, cb: (pos: number, end: number, kind: CommentKind, hasTrailingNewLine: boolean, state: T) => U, state: T, initial: U): U | undefined {
    return iterateCommentRanges(/*reduce*/ true, text, pos, /*trailing*/ true, cb, state, initial);
}

export function getLeadingCommentRanges(text: string, pos: number): CommentRange[] | undefined {
    return reduceEachLeadingCommentRange(text, pos, appendCommentRange, /*state*/ undefined as any, /*initial*/ undefined as any as CommentRange[]);
}

export function getTrailingCommentRanges(text: string, pos: number): CommentRange[] | undefined {
    return reduceEachTrailingCommentRange(text, pos, appendCommentRange, /*state*/ undefined as any, /*initial*/ undefined as any as CommentRange[]);
}

export function getShebang(text: string): string | undefined {
    const shebang = /^#!.*/;
    if (isShebangTrivia(text, 0)) {
        const match = shebang.exec(text);
        if (match) {
            return match[0];
        }
    }
    return undefined;
}

export function isIdentifierStart(ch: number, _languageVersion?: ScriptTarget): boolean {
    return ch >= CharacterCodes.A && ch <= CharacterCodes.Z || ch >= CharacterCodes.a && ch <= CharacterCodes.z ||
        ch === CharacterCodes.$ || ch === CharacterCodes._ ||
        ch > CharacterCodes.maxAsciiCharacter && isUnicodeIdentifierStart(ch);
}

export function isIdentifierPart(ch: number, _languageVersion?: ScriptTarget, identifierVariant?: LanguageVariant): boolean {
    return ch >= CharacterCodes.A && ch <= CharacterCodes.Z || ch >= CharacterCodes.a && ch <= CharacterCodes.z ||
        ch >= CharacterCodes._0 && ch <= CharacterCodes._9 || ch === CharacterCodes.$ || ch === CharacterCodes._ ||
        // "-" and ":" are valid in JSX Identifiers
        (identifierVariant === LanguageVariant.JSX ? (ch === CharacterCodes.minus || ch === CharacterCodes.colon) : false) ||
        ch > CharacterCodes.maxAsciiCharacter && isUnicodeIdentifierPart(ch);
}

export function isIdentifierText(name: string, _languageVersion?: ScriptTarget, identifierVariant?: LanguageVariant): boolean {
    let ch = name.codePointAt(0)!;
    if (!isIdentifierStart(ch)) {
        return false;
    }

    for (let i = charSize(ch); i < name.length; i += charSize(ch)) {
        if (!isIdentifierPart(ch = name.codePointAt(i)!, undefined, identifierVariant)) {
            return false;
        }
    }

    return true;
}

function codePointAt(s: string, i: number): number {
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

export function utf16EncodeAsString(codePoint: number): string {
    return String.fromCodePoint(codePoint);
}

function parsePseudoBigInt(stringValue: string): string {
    let log2Base: number;
    switch (stringValue.charCodeAt(1)) {
        case CharacterCodes.b:
        case CharacterCodes.B:
            log2Base = 1;
            break;
        case CharacterCodes.o:
        case CharacterCodes.O:
            log2Base = 3;
            break;
        case CharacterCodes.x:
        case CharacterCodes.X:
            log2Base = 4;
            break;
        default:
            // decimals for now just peel the trailing "n" and return
            const nIndex = stringValue.length - 1;
            let nonZeroStart = 0;
            while (stringValue.charCodeAt(nonZeroStart) === CharacterCodes._0) {
                nonZeroStart++;
            }
            return stringValue.slice(nonZeroStart, nIndex) || "0";
    }
    // exit early for zero
    const startIndex = 2;
    const endIndex = stringValue.length - 1;
    const bitsNeeded = (endIndex - startIndex) * log2Base;
    // Stores the value specified by the string as a LE array of 16-bit integers
    // using Uint16 instead of Uint32 so combining steps can use bitwise operators
    const segments = new Uint16Array((bitsNeeded >>> 4) + (bitsNeeded & 15 ? 1 : 0));
    // Add the digits, one at a time
    for (let i = endIndex - 1, bitOffset = 0; i >= startIndex; i--, bitOffset += log2Base) {
        const segment = bitOffset >>> 4;
        const digitChar = stringValue.charCodeAt(i);
        // Find character value
        const digit = digitChar <= CharacterCodes._9
            ? digitChar - CharacterCodes._0
            : 10 + digitChar - (digitChar <= CharacterCodes.F ? CharacterCodes.A : CharacterCodes.a);
        // Add bits into segment
        const shiftedDigit = digit << (bitOffset & 15);
        segments[segment] |= shiftedDigit;
        // overflow to next segment
        const residual = shiftedDigit >>> 16;
        if (residual) segments[segment + 1] |= residual;
    }
    // Repeatedly divide by 10 to find each decimal digit
    let base10Value = "";
    let firstNonzeroSegment = segments.length - 1;
    let segmentsRemaining = true;
    while (segmentsRemaining) {
        let mod10 = 0;
        segmentsRemaining = false;
        for (let segment = firstNonzeroSegment; segment >= 0; segment--) {
            const newSegment = mod10 << 16 | segments[segment];
            const segmentValue = (newSegment / 10) | 0;
            segments[segment] = segmentValue;
            mod10 = newSegment - segmentValue * 10;
            if (segmentValue && !segmentsRemaining) {
                firstNonzeroSegment = segment;
                segmentsRemaining = true;
            }
        }
        base10Value = mod10 + base10Value;
    }
    return base10Value;
}

// Creates a scanner over a (possibly unspecified) range of a piece of text.
export function createScanner(
    skipTrivia: boolean,
    languageVariant: LanguageVariant = LanguageVariant.Standard,
    textInitial?: string,
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

    var commentDirectives: CommentDirective[] | undefined;
    var skipJsDocLeadingAsterisks = 0;

    var scriptKind: ScriptKind = ScriptKind.Unknown;

    setText(text, start, length);

    var scanner: Scanner = {
        getTokenFullStart: () => fullStartPos,
        getTokenEnd: () => pos,
        getToken: () => token,
        getTokenStart: () => tokenStart,
        getTokenText: () => text.substring(tokenStart, pos),
        getTokenValue: () => tokenValue,
        hasUnicodeEscape: () => (tokenFlags & TokenFlags.UnicodeEscape) !== 0,
        hasExtendedUnicodeEscape: () => (tokenFlags & TokenFlags.ExtendedUnicodeEscape) !== 0,
        hasPrecedingLineBreak: () => (tokenFlags & TokenFlags.PrecedingLineBreak) !== 0,
        hasPrecedingJSDocComment: () => (tokenFlags & TokenFlags.PrecedingJSDocComment) !== 0,
        hasPrecedingJSDocLeadingAsterisks: () => (tokenFlags & TokenFlags.PrecedingJSDocLeadingAsterisks) !== 0,
        hasPrecedingJSDocWithDeprecatedTag: () => (tokenFlags & TokenFlags.PrecedingJSDocWithDeprecated) !== 0,
        hasPrecedingJSDocWithSeeOrLink: () => (tokenFlags & TokenFlags.PrecedingJSDocWithSeeOrLink) !== 0,
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
        setLanguageVariant,
        setScriptKind,
        resetTokenState,
        setSkipJsDocLeadingAsterisks,
        tryScan,
        lookAhead,
        scanRange,
    };
    /* eslint-enable no-var */

    return scanner;

    function codePointUnchecked(pos: number) {
        return codePointAt(text, pos);
    }

    function codePointChecked(pos: number) {
        return pos >= 0 && pos < end ? codePointUnchecked(pos) : CharacterCodes.EOF;
    }

    function charCodeUnchecked(pos: number) {
        return text.charCodeAt(pos);
    }

    function charCodeChecked(pos: number) {
        return pos >= 0 && pos < end ? charCodeUnchecked(pos) : CharacterCodes.EOF;
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
        }
        return result + text.substring(start, pos);
    }

    function scanNumber(): SyntaxKind {
        let start = pos;
        let mainFragment: string;
        if (charCodeUnchecked(pos) === CharacterCodes._0) {
            pos++;
            if (charCodeUnchecked(pos) === CharacterCodes._) {
                tokenFlags |= TokenFlags.ContainsSeparator | TokenFlags.ContainsInvalidSeparator;
                pos--;
                mainFragment = scanNumberFragment();
            }
            else if (!scanDigits()) {
                tokenFlags |= TokenFlags.ContainsLeadingZero;
                mainFragment = "" + +tokenValue;
            }
            else if (!tokenValue) {
                mainFragment = "0";
            }
            else {
                tokenValue = "" + parseInt(tokenValue, 8);
                tokenFlags |= TokenFlags.Octal;
                const withMinus = token === SyntaxKind.MinusToken;
                const literal = (withMinus ? "-" : "") + "0o" + (+tokenValue).toString(8);
                if (withMinus) start--;
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
            if (finalFragment) {
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
            result = text.substring(start, end);
        }

        if (tokenFlags & TokenFlags.ContainsLeadingZero) {
            tokenValue = "" + +result;
            return SyntaxKind.NumericLiteral;
        }

        if (decimalFragment !== undefined || tokenFlags & TokenFlags.Scientific) {
            checkForIdentifierStartAfterNumericLiteral();
            tokenValue = "" + +result;
            return SyntaxKind.NumericLiteral;
        }
        else {
            tokenValue = result;
            const type = checkBigIntSuffix();
            checkForIdentifierStartAfterNumericLiteral();
            return type;
        }
    }

    function checkForIdentifierStartAfterNumericLiteral() {
        if (!isIdentifierStart(codePointUnchecked(pos))) {
            return;
        }

        const identifierStart = pos;
        const { length } = scanIdentifierParts();

        if (!(length === 1 && text[identifierStart] === "n")) {
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

    function scanExactNumberOfHexDigits(count: number, canHaveSeparators: boolean): number {
        const valueString = scanHexDigits(count, /*scanAsManyAsPossible*/ false, canHaveSeparators);
        return valueString ? parseInt(valueString, 16) : -1;
    }

    function scanMinimumNumberOfHexDigits(count: number, canHaveSeparators: boolean): string {
        return scanHexDigits(count, /*scanAsManyAsPossible*/ true, canHaveSeparators);
    }

    function scanHexDigits(minCount: number, scanAsManyAsPossible: boolean, canHaveSeparators: boolean): string {
        let valueChars: number[] = [];
        let allowSeparator = false;
        while (valueChars.length < minCount || scanAsManyAsPossible) {
            let ch = charCodeUnchecked(pos);
            if (canHaveSeparators && ch === CharacterCodes._) {
                tokenFlags |= TokenFlags.ContainsSeparator;
                if (allowSeparator) {
                    allowSeparator = false;
                }
                pos++;
                continue;
            }
            allowSeparator = canHaveSeparators;
            if (ch >= CharacterCodes.A && ch <= CharacterCodes.F) {
                ch += CharacterCodes.a - CharacterCodes.A;
            }
            else if (
                !((ch >= CharacterCodes._0 && ch <= CharacterCodes._9) ||
                    (ch >= CharacterCodes.a && ch <= CharacterCodes.f))
            ) {
                break;
            }
            valueChars.push(ch);
            pos++;
        }
        if (valueChars.length < minCount) {
            valueChars = [];
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
                break;
            }
            pos++;
        }
        return result;
    }

    function scanTemplateAndSetTokenValue(shouldEmitInvalidEscapeError: boolean): SyntaxKind {
        const startedWithBacktick = charCodeUnchecked(pos) === CharacterCodes.backtick;

        pos++;
        let start = pos;
        let contents = "";
        let resultingToken!: SyntaxKind;

        while (true) {
            if (pos >= end) {
                contents += text.substring(start, pos);
                tokenFlags |= TokenFlags.Unterminated;
                resultingToken = startedWithBacktick ? SyntaxKind.NoSubstitutionTemplateLiteral : SyntaxKind.TemplateTail;
                break;
            }

            const currChar = charCodeUnchecked(pos);

            if (currChar === CharacterCodes.backtick) {
                contents += text.substring(start, pos);
                pos++;
                resultingToken = startedWithBacktick ? SyntaxKind.NoSubstitutionTemplateLiteral : SyntaxKind.TemplateTail;
                break;
            }

            if (currChar === CharacterCodes.$ && pos + 1 < end && charCodeUnchecked(pos + 1) === CharacterCodes.openBrace) {
                contents += text.substring(start, pos);
                pos += 2;
                resultingToken = startedWithBacktick ? SyntaxKind.TemplateHead : SyntaxKind.TemplateMiddle;
                break;
            }

            if (currChar === CharacterCodes.backslash) {
                contents += text.substring(start, pos);
                contents += scanEscapeSequence(EscapeSequenceScanningFlags.String | (shouldEmitInvalidEscapeError ? EscapeSequenceScanningFlags.ReportErrors : 0));
                start = pos;
                continue;
            }

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

        tokenValue = contents;
        return resultingToken;
    }

    function scanEscapeSequence(flags: EscapeSequenceScanningFlags): string {
        const start = pos;
        pos++;
        if (pos >= end) {
            return "";
        }
        const ch = charCodeUnchecked(pos);
        pos++;
        switch (ch) {
            case CharacterCodes._0:
                if (pos >= end || !isDigit(charCodeUnchecked(pos))) {
                    return "\0";
                }
            // falls through
            case CharacterCodes._1:
            case CharacterCodes._2:
            case CharacterCodes._3:
                if (pos < end && isOctalDigit(charCodeUnchecked(pos))) {
                    pos++;
                }
            // falls through
            case CharacterCodes._4:
            case CharacterCodes._5:
            case CharacterCodes._6:
            case CharacterCodes._7:
                if (pos < end && isOctalDigit(charCodeUnchecked(pos))) {
                    pos++;
                }
                tokenFlags |= TokenFlags.ContainsInvalidEscape;
                if (flags & EscapeSequenceScanningFlags.ReportInvalidEscapeErrors) {
                    const code = parseInt(text.substring(start + 1, pos), 8);
                    return String.fromCharCode(code);
                }
                return text.substring(start, pos);
            case CharacterCodes._8:
            case CharacterCodes._9:
                tokenFlags |= TokenFlags.ContainsInvalidEscape;
                if (flags & EscapeSequenceScanningFlags.ReportInvalidEscapeErrors) {
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
                    pos -= 2;
                    const result = scanExtendedUnicodeEscape();
                    if (!(flags & EscapeSequenceScanningFlags.AllowExtendedUnicodeEscape)) {
                        tokenFlags |= TokenFlags.ContainsInvalidEscape;
                    }
                    return result;
                }
                // '\uDDDD'
                for (; pos < start + 6; pos++) {
                    if (!(pos < end && isHexDigit(charCodeUnchecked(pos)))) {
                        tokenFlags |= TokenFlags.ContainsInvalidEscape;
                        return text.substring(start, pos);
                    }
                }
                tokenFlags |= TokenFlags.UnicodeEscape;
                {
                    const escapedValue = parseInt(text.substring(start + 2, pos), 16);
                    const escapedValueString = String.fromCharCode(escapedValue);
                    if (
                        flags & EscapeSequenceScanningFlags.AnyUnicodeMode && escapedValue >= 0xD800 && escapedValue <= 0xDBFF &&
                        pos + 6 < end && text.substring(pos, pos + 2) === "\\u" && charCodeUnchecked(pos + 2) !== CharacterCodes.openBrace
                    ) {
                        const nextStart = pos;
                        let nextPos = pos + 2;
                        for (; nextPos < nextStart + 6; nextPos++) {
                            if (!isHexDigit(charCodeUnchecked(nextPos))) {
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
                }

            case CharacterCodes.x:
                for (; pos < start + 4; pos++) {
                    if (!(pos < end && isHexDigit(charCodeUnchecked(pos)))) {
                        tokenFlags |= TokenFlags.ContainsInvalidEscape;
                        return text.substring(start, pos);
                    }
                }
                tokenFlags |= TokenFlags.HexEscape;
                return String.fromCharCode(parseInt(text.substring(start + 2, pos), 16));

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
                return String.fromCharCode(ch);
        }
    }

    function scanExtendedUnicodeEscape(): string {
        const start = pos;
        pos += 3;
        const escapedValueString = scanMinimumNumberOfHexDigits(1, /*canHaveSeparators*/ false);
        const escapedValue = escapedValueString ? parseInt(escapedValueString, 16) : -1;
        let isInvalidExtendedEscape = false;

        if (escapedValue < 0) {
            isInvalidExtendedEscape = true;
        }
        else if (escapedValue > 0x10FFFF) {
            isInvalidExtendedEscape = true;
        }

        if (pos >= end) {
            isInvalidExtendedEscape = true;
        }
        else if (charCodeUnchecked(pos) === CharacterCodes.closeBrace) {
            pos++;
        }
        else {
            isInvalidExtendedEscape = true;
        }

        if (isInvalidExtendedEscape) {
            tokenFlags |= TokenFlags.ContainsInvalidEscape;
            return text.substring(start, pos);
        }

        tokenFlags |= TokenFlags.ExtendedUnicodeEscape;
        return utf16EncodeAsString(escapedValue);
    }

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
            if (isIdentifierPart(ch)) {
                pos += charSize(ch);
            }
            else if (ch === CharacterCodes.backslash) {
                ch = peekExtendedUnicodeEscape();
                if (ch >= 0 && isIdentifierPart(ch)) {
                    result += scanExtendedUnicodeEscape();
                    start = pos;
                    continue;
                }
                ch = peekUnicodeEscape();
                if (!(ch >= 0 && isIdentifierPart(ch))) {
                    break;
                }
                tokenFlags |= TokenFlags.UnicodeEscape;
                result += text.substring(start, pos);
                result += utf16EncodeAsString(ch);
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
        let separatorAllowed = false;
        let isPreviousTokenSeparator = false;
        while (true) {
            const ch = charCodeUnchecked(pos);
            if (ch === CharacterCodes._) {
                tokenFlags |= TokenFlags.ContainsSeparator;
                if (separatorAllowed) {
                    separatorAllowed = false;
                    isPreviousTokenSeparator = true;
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
        return value;
    }

    function checkBigIntSuffix(): SyntaxKind {
        if (charCodeUnchecked(pos) === CharacterCodes.n) {
            tokenValue += "n";
            if (tokenFlags & TokenFlags.BinaryOrOctalSpecifier) {
                tokenValue = parsePseudoBigInt(tokenValue) + "n";
            }
            pos++;
            return SyntaxKind.BigIntLiteral;
        }
        else {
            const numericValue = tokenFlags & TokenFlags.BinarySpecifier
                ? parseInt(tokenValue.slice(2), 2)
                : tokenFlags & TokenFlags.OctalSpecifier
                ? parseInt(tokenValue.slice(2), 8)
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
                return token = SyntaxKind.EndOfFile;
            }

            const ch = codePointUnchecked(pos);
            if (pos === 0) {
                if (ch === CharacterCodes.hash && isShebangTrivia(text, pos)) {
                    pos = scanShebangTrivia(text, pos);
                    if (skipTrivia) {
                        continue;
                    }
                    else {
                        return token = SyntaxKind.Unknown;
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

                        if (isJSDoc) {
                            tokenFlags |= TokenFlags.PrecedingJSDocComment;
                            tokenFlags = scanJSDocCommentForTags(text.slice(tokenStart, pos), tokenFlags);
                        }

                        commentDirectives = appendIfCommentDirective(commentDirectives, text.slice(lastLineStart, pos), commentDirectiveRegExMultiLine, lastLineStart);

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
                            tokenValue = "0";
                        }
                        tokenValue = "0x" + tokenValue;
                        tokenFlags |= TokenFlags.HexSpecifier;
                        return token = checkBigIntSuffix();
                    }
                    else if (pos + 2 < end && (charCodeUnchecked(pos + 1) === CharacterCodes.B || charCodeUnchecked(pos + 1) === CharacterCodes.b)) {
                        pos += 2;
                        tokenValue = scanBinaryOrOctalDigits(2);
                        if (!tokenValue) {
                            tokenValue = "0";
                        }
                        tokenValue = "0b" + tokenValue;
                        tokenFlags |= TokenFlags.BinarySpecifier;
                        return token = checkBigIntSuffix();
                    }
                    else if (pos + 2 < end && (charCodeUnchecked(pos + 1) === CharacterCodes.O || charCodeUnchecked(pos + 1) === CharacterCodes.o)) {
                        pos += 2;
                        tokenValue = scanBinaryOrOctalDigits(8);
                        if (!tokenValue) {
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
                        pos = scanConflictMarkerTrivia(text, pos);
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
                        pos = scanConflictMarkerTrivia(text, pos);
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
                        pos = scanConflictMarkerTrivia(text, pos);
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
                        pos = scanConflictMarkerTrivia(text, pos);
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
                case CharacterCodes.backslash: {
                    const extendedCookedChar = peekExtendedUnicodeEscape();
                    if (extendedCookedChar >= 0 && isIdentifierStart(extendedCookedChar)) {
                        tokenValue = scanExtendedUnicodeEscape() + scanIdentifierParts();
                        return token = getIdentifierToken();
                    }

                    const cookedChar = peekUnicodeEscape();
                    if (cookedChar >= 0 && isIdentifierStart(cookedChar)) {
                        pos += 6;
                        tokenFlags |= TokenFlags.UnicodeEscape;
                        tokenValue = String.fromCharCode(cookedChar) + scanIdentifierParts();
                        return token = getIdentifierToken();
                    }

                    pos++;
                    return token = SyntaxKind.Unknown;
                }
                case CharacterCodes.hash:
                    if (pos !== 0 && text[pos + 1] === "!") {
                        pos++;
                        return token = SyntaxKind.Unknown;
                    }

                    {
                        const charAfterHash = codePointUnchecked(pos + 1);
                        if (charAfterHash === CharacterCodes.backslash) {
                            pos++;
                            const extendedCookedChar = peekExtendedUnicodeEscape();
                            if (extendedCookedChar >= 0 && isIdentifierStart(extendedCookedChar)) {
                                tokenValue = "#" + scanExtendedUnicodeEscape() + scanIdentifierParts();
                                return token = SyntaxKind.PrivateIdentifier;
                            }

                            const cookedChar = peekUnicodeEscape();
                            if (cookedChar >= 0 && isIdentifierStart(cookedChar)) {
                                pos += 6;
                                tokenFlags |= TokenFlags.UnicodeEscape;
                                tokenValue = "#" + String.fromCharCode(cookedChar) + scanIdentifierParts();
                                return token = SyntaxKind.PrivateIdentifier;
                            }
                            pos--;
                        }

                        if (isIdentifierStart(charAfterHash)) {
                            pos++;
                            scanIdentifier(charAfterHash);
                        }
                        else {
                            tokenValue = "#";
                        }
                        return token = SyntaxKind.PrivateIdentifier;
                    }
                case CharacterCodes.replacementCharacter:
                    pos = end;
                    return token = SyntaxKind.NonTextFileMarkerTrivia;
                default: {
                    const identifierKind = scanIdentifier(ch);
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
                    pos += size;
                    return token = SyntaxKind.Unknown;
                }
            }
        }
    }

    function reScanInvalidIdentifier(): SyntaxKind {
        pos = tokenStart = fullStartPos;
        tokenFlags = 0;
        const ch = codePointUnchecked(pos);
        const identifierKind = scanIdentifier(ch);
        if (identifierKind) {
            return token = identifierKind;
        }
        pos += charSize(ch);
        return token; // Still `SyntaxKind.Unknown`
    }

    function scanIdentifier(startCharacter: number) {
        let ch = startCharacter;
        if (isIdentifierStart(ch)) {
            pos += charSize(ch);
            while (pos < end && isIdentifierPart(ch = codePointUnchecked(pos))) pos += charSize(ch);
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
        pos = tokenStart + 1;
        return token = SyntaxKind.EqualsToken;
    }

    function reScanSlashToken(): SyntaxKind {
        if (token === SyntaxKind.SlashToken || token === SyntaxKind.SlashEqualsToken) {
            const startOfRegExpBody = tokenStart + 1;
            pos = startOfRegExpBody;
            let inEscape = false;
            let inCharacterClass = false;
            while (true) {
                const ch = charCodeChecked(pos);
                if (ch === CharacterCodes.EOF || isLineBreak(ch)) {
                    tokenFlags |= TokenFlags.Unterminated;
                    break;
                }

                if (inEscape) {
                    inEscape = false;
                }
                else if (ch === CharacterCodes.slash && !inCharacterClass) {
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
                pos++;
            }

            if (tokenFlags & TokenFlags.Unterminated) {
                // Find best recovery position
                pos = startOfRegExpBody;
                inEscape = false;
                let characterClassDepth = 0;
                let inDecimalQuantifier = false;
                let groupDepth = 0;
                while (pos < end && !isLineBreak(charCodeUnchecked(pos))) {
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
                                break;
                            }
                        }
                    }
                    pos++;
                }
                while (isWhiteSpaceLike(charCodeChecked(pos - 1)) || charCodeChecked(pos - 1) === CharacterCodes.semicolon) pos--;
            }
            else {
                pos++;
                let regExpFlags: number = RegularExpressionFlags.None;
                while (true) {
                    const ch = codePointChecked(pos);
                    if (ch === CharacterCodes.EOF || !isIdentifierPart(ch)) {
                        break;
                    }
                    const size = charSize(ch);
                    const flag = characterCodeToRegularExpressionFlag(ch);
                    if (flag !== undefined) {
                        regExpFlags |= flag;
                    }
                    pos += size;
                }
            }
            tokenValue = text.substring(tokenStart, pos);
            token = SyntaxKind.RegularExpressionLiteral;
        }
        return token;
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

        if (!commentDirectives) {
            commentDirectives = [];
        }
        commentDirectives.push({
            range: { pos: lineStart, end: pos },
            type,
        });
        return commentDirectives;
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
        pos = tokenStart + 1;
        return token = SyntaxKind.QuestionToken;
    }

    function scanJsxToken(allowMultilineJsxText = true): JsxTokenSyntaxKind {
        fullStartPos = tokenStart = pos;

        if (pos >= end) {
            return token = SyntaxKind.EndOfFile;
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

        let firstNonWhitespace = 0;

        while (pos < end) {
            char = charCodeUnchecked(pos);
            if (char === CharacterCodes.openBrace) {
                break;
            }
            if (char === CharacterCodes.lessThan) {
                if (isConflictMarkerTrivia(text, pos)) {
                    pos = scanConflictMarkerTrivia(text, pos);
                    return token = SyntaxKind.ConflictMarkerTrivia;
                }
                break;
            }

            if (isLineBreak(char) && firstNonWhitespace === 0) {
                firstNonWhitespace = -1;
            }
            else if (!allowMultilineJsxText && isLineBreak(char) && firstNonWhitespace > 0) {
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

    function scanJsxIdentifier(): SyntaxKind {
        if (tokenIsIdentifierOrKeyword(token)) {
            while (pos < end) {
                const ch = charCodeUnchecked(pos);
                if (ch === CharacterCodes.minus) {
                    tokenValue += "-";
                    pos++;
                    continue;
                }
                const oldPos = pos;
                tokenValue += scanIdentifierParts();
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
            return token = SyntaxKind.EndOfFile;
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
            return token = SyntaxKind.EndOfFile;
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
                {
                    const extendedCookedChar = peekExtendedUnicodeEscape();
                    if (extendedCookedChar >= 0 && isIdentifierStart(extendedCookedChar)) {
                        tokenValue = scanExtendedUnicodeEscape() + scanIdentifierParts();
                        return token = getIdentifierToken();
                    }

                    const cookedChar = peekUnicodeEscape();
                    if (cookedChar >= 0 && isIdentifierStart(cookedChar)) {
                        pos += 6;
                        tokenFlags |= TokenFlags.UnicodeEscape;
                        tokenValue = String.fromCharCode(cookedChar) + scanIdentifierParts();
                        return token = getIdentifierToken();
                    }
                }
                pos++;
                return token = SyntaxKind.Unknown;
        }

        if (isIdentifierStart(ch)) {
            let char = ch;
            while (pos < end && isIdentifierPart(char = codePointUnchecked(pos)) || char === CharacterCodes.minus) pos += charSize(char);
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

    function setLanguageVariant(variant: LanguageVariant) {
        languageVariant = variant;
    }

    function setScriptKind(kind: ScriptKind) {
        scriptKind = kind;
    }

    function resetTokenState(position: number) {
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
