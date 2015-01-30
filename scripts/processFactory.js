var ts;
(function (ts) {
    (function (SyntaxKind) {
        SyntaxKind[SyntaxKind["Unknown"] = 0] = "Unknown";
        SyntaxKind[SyntaxKind["EndOfFileToken"] = 1] = "EndOfFileToken";
        SyntaxKind[SyntaxKind["SingleLineCommentTrivia"] = 2] = "SingleLineCommentTrivia";
        SyntaxKind[SyntaxKind["MultiLineCommentTrivia"] = 3] = "MultiLineCommentTrivia";
        SyntaxKind[SyntaxKind["NewLineTrivia"] = 4] = "NewLineTrivia";
        SyntaxKind[SyntaxKind["WhitespaceTrivia"] = 5] = "WhitespaceTrivia";
        SyntaxKind[SyntaxKind["ConflictMarkerTrivia"] = 6] = "ConflictMarkerTrivia";
        SyntaxKind[SyntaxKind["NumericLiteral"] = 7] = "NumericLiteral";
        SyntaxKind[SyntaxKind["StringLiteral"] = 8] = "StringLiteral";
        SyntaxKind[SyntaxKind["RegularExpressionLiteral"] = 9] = "RegularExpressionLiteral";
        SyntaxKind[SyntaxKind["NoSubstitutionTemplateLiteral"] = 10] = "NoSubstitutionTemplateLiteral";
        SyntaxKind[SyntaxKind["TemplateHead"] = 11] = "TemplateHead";
        SyntaxKind[SyntaxKind["TemplateMiddle"] = 12] = "TemplateMiddle";
        SyntaxKind[SyntaxKind["TemplateTail"] = 13] = "TemplateTail";
        SyntaxKind[SyntaxKind["OpenBraceToken"] = 14] = "OpenBraceToken";
        SyntaxKind[SyntaxKind["CloseBraceToken"] = 15] = "CloseBraceToken";
        SyntaxKind[SyntaxKind["OpenParenToken"] = 16] = "OpenParenToken";
        SyntaxKind[SyntaxKind["CloseParenToken"] = 17] = "CloseParenToken";
        SyntaxKind[SyntaxKind["OpenBracketToken"] = 18] = "OpenBracketToken";
        SyntaxKind[SyntaxKind["CloseBracketToken"] = 19] = "CloseBracketToken";
        SyntaxKind[SyntaxKind["DotToken"] = 20] = "DotToken";
        SyntaxKind[SyntaxKind["DotDotDotToken"] = 21] = "DotDotDotToken";
        SyntaxKind[SyntaxKind["SemicolonToken"] = 22] = "SemicolonToken";
        SyntaxKind[SyntaxKind["CommaToken"] = 23] = "CommaToken";
        SyntaxKind[SyntaxKind["LessThanToken"] = 24] = "LessThanToken";
        SyntaxKind[SyntaxKind["GreaterThanToken"] = 25] = "GreaterThanToken";
        SyntaxKind[SyntaxKind["LessThanEqualsToken"] = 26] = "LessThanEqualsToken";
        SyntaxKind[SyntaxKind["GreaterThanEqualsToken"] = 27] = "GreaterThanEqualsToken";
        SyntaxKind[SyntaxKind["EqualsEqualsToken"] = 28] = "EqualsEqualsToken";
        SyntaxKind[SyntaxKind["ExclamationEqualsToken"] = 29] = "ExclamationEqualsToken";
        SyntaxKind[SyntaxKind["EqualsEqualsEqualsToken"] = 30] = "EqualsEqualsEqualsToken";
        SyntaxKind[SyntaxKind["ExclamationEqualsEqualsToken"] = 31] = "ExclamationEqualsEqualsToken";
        SyntaxKind[SyntaxKind["EqualsGreaterThanToken"] = 32] = "EqualsGreaterThanToken";
        SyntaxKind[SyntaxKind["PlusToken"] = 33] = "PlusToken";
        SyntaxKind[SyntaxKind["MinusToken"] = 34] = "MinusToken";
        SyntaxKind[SyntaxKind["AsteriskToken"] = 35] = "AsteriskToken";
        SyntaxKind[SyntaxKind["SlashToken"] = 36] = "SlashToken";
        SyntaxKind[SyntaxKind["PercentToken"] = 37] = "PercentToken";
        SyntaxKind[SyntaxKind["PlusPlusToken"] = 38] = "PlusPlusToken";
        SyntaxKind[SyntaxKind["MinusMinusToken"] = 39] = "MinusMinusToken";
        SyntaxKind[SyntaxKind["LessThanLessThanToken"] = 40] = "LessThanLessThanToken";
        SyntaxKind[SyntaxKind["GreaterThanGreaterThanToken"] = 41] = "GreaterThanGreaterThanToken";
        SyntaxKind[SyntaxKind["GreaterThanGreaterThanGreaterThanToken"] = 42] = "GreaterThanGreaterThanGreaterThanToken";
        SyntaxKind[SyntaxKind["AmpersandToken"] = 43] = "AmpersandToken";
        SyntaxKind[SyntaxKind["BarToken"] = 44] = "BarToken";
        SyntaxKind[SyntaxKind["CaretToken"] = 45] = "CaretToken";
        SyntaxKind[SyntaxKind["ExclamationToken"] = 46] = "ExclamationToken";
        SyntaxKind[SyntaxKind["TildeToken"] = 47] = "TildeToken";
        SyntaxKind[SyntaxKind["AmpersandAmpersandToken"] = 48] = "AmpersandAmpersandToken";
        SyntaxKind[SyntaxKind["BarBarToken"] = 49] = "BarBarToken";
        SyntaxKind[SyntaxKind["QuestionToken"] = 50] = "QuestionToken";
        SyntaxKind[SyntaxKind["ColonToken"] = 51] = "ColonToken";
        SyntaxKind[SyntaxKind["EqualsToken"] = 52] = "EqualsToken";
        SyntaxKind[SyntaxKind["PlusEqualsToken"] = 53] = "PlusEqualsToken";
        SyntaxKind[SyntaxKind["MinusEqualsToken"] = 54] = "MinusEqualsToken";
        SyntaxKind[SyntaxKind["AsteriskEqualsToken"] = 55] = "AsteriskEqualsToken";
        SyntaxKind[SyntaxKind["SlashEqualsToken"] = 56] = "SlashEqualsToken";
        SyntaxKind[SyntaxKind["PercentEqualsToken"] = 57] = "PercentEqualsToken";
        SyntaxKind[SyntaxKind["LessThanLessThanEqualsToken"] = 58] = "LessThanLessThanEqualsToken";
        SyntaxKind[SyntaxKind["GreaterThanGreaterThanEqualsToken"] = 59] = "GreaterThanGreaterThanEqualsToken";
        SyntaxKind[SyntaxKind["GreaterThanGreaterThanGreaterThanEqualsToken"] = 60] = "GreaterThanGreaterThanGreaterThanEqualsToken";
        SyntaxKind[SyntaxKind["AmpersandEqualsToken"] = 61] = "AmpersandEqualsToken";
        SyntaxKind[SyntaxKind["BarEqualsToken"] = 62] = "BarEqualsToken";
        SyntaxKind[SyntaxKind["CaretEqualsToken"] = 63] = "CaretEqualsToken";
        SyntaxKind[SyntaxKind["Identifier"] = 64] = "Identifier";
        SyntaxKind[SyntaxKind["BreakKeyword"] = 65] = "BreakKeyword";
        SyntaxKind[SyntaxKind["CaseKeyword"] = 66] = "CaseKeyword";
        SyntaxKind[SyntaxKind["CatchKeyword"] = 67] = "CatchKeyword";
        SyntaxKind[SyntaxKind["ClassKeyword"] = 68] = "ClassKeyword";
        SyntaxKind[SyntaxKind["ConstKeyword"] = 69] = "ConstKeyword";
        SyntaxKind[SyntaxKind["ContinueKeyword"] = 70] = "ContinueKeyword";
        SyntaxKind[SyntaxKind["DebuggerKeyword"] = 71] = "DebuggerKeyword";
        SyntaxKind[SyntaxKind["DefaultKeyword"] = 72] = "DefaultKeyword";
        SyntaxKind[SyntaxKind["DeleteKeyword"] = 73] = "DeleteKeyword";
        SyntaxKind[SyntaxKind["DoKeyword"] = 74] = "DoKeyword";
        SyntaxKind[SyntaxKind["ElseKeyword"] = 75] = "ElseKeyword";
        SyntaxKind[SyntaxKind["EnumKeyword"] = 76] = "EnumKeyword";
        SyntaxKind[SyntaxKind["ExportKeyword"] = 77] = "ExportKeyword";
        SyntaxKind[SyntaxKind["ExtendsKeyword"] = 78] = "ExtendsKeyword";
        SyntaxKind[SyntaxKind["FalseKeyword"] = 79] = "FalseKeyword";
        SyntaxKind[SyntaxKind["FinallyKeyword"] = 80] = "FinallyKeyword";
        SyntaxKind[SyntaxKind["ForKeyword"] = 81] = "ForKeyword";
        SyntaxKind[SyntaxKind["FunctionKeyword"] = 82] = "FunctionKeyword";
        SyntaxKind[SyntaxKind["IfKeyword"] = 83] = "IfKeyword";
        SyntaxKind[SyntaxKind["ImportKeyword"] = 84] = "ImportKeyword";
        SyntaxKind[SyntaxKind["InKeyword"] = 85] = "InKeyword";
        SyntaxKind[SyntaxKind["InstanceOfKeyword"] = 86] = "InstanceOfKeyword";
        SyntaxKind[SyntaxKind["NewKeyword"] = 87] = "NewKeyword";
        SyntaxKind[SyntaxKind["NullKeyword"] = 88] = "NullKeyword";
        SyntaxKind[SyntaxKind["ReturnKeyword"] = 89] = "ReturnKeyword";
        SyntaxKind[SyntaxKind["SuperKeyword"] = 90] = "SuperKeyword";
        SyntaxKind[SyntaxKind["SwitchKeyword"] = 91] = "SwitchKeyword";
        SyntaxKind[SyntaxKind["ThisKeyword"] = 92] = "ThisKeyword";
        SyntaxKind[SyntaxKind["ThrowKeyword"] = 93] = "ThrowKeyword";
        SyntaxKind[SyntaxKind["TrueKeyword"] = 94] = "TrueKeyword";
        SyntaxKind[SyntaxKind["TryKeyword"] = 95] = "TryKeyword";
        SyntaxKind[SyntaxKind["TypeOfKeyword"] = 96] = "TypeOfKeyword";
        SyntaxKind[SyntaxKind["VarKeyword"] = 97] = "VarKeyword";
        SyntaxKind[SyntaxKind["VoidKeyword"] = 98] = "VoidKeyword";
        SyntaxKind[SyntaxKind["WhileKeyword"] = 99] = "WhileKeyword";
        SyntaxKind[SyntaxKind["WithKeyword"] = 100] = "WithKeyword";
        SyntaxKind[SyntaxKind["ImplementsKeyword"] = 101] = "ImplementsKeyword";
        SyntaxKind[SyntaxKind["InterfaceKeyword"] = 102] = "InterfaceKeyword";
        SyntaxKind[SyntaxKind["LetKeyword"] = 103] = "LetKeyword";
        SyntaxKind[SyntaxKind["PackageKeyword"] = 104] = "PackageKeyword";
        SyntaxKind[SyntaxKind["PrivateKeyword"] = 105] = "PrivateKeyword";
        SyntaxKind[SyntaxKind["ProtectedKeyword"] = 106] = "ProtectedKeyword";
        SyntaxKind[SyntaxKind["PublicKeyword"] = 107] = "PublicKeyword";
        SyntaxKind[SyntaxKind["StaticKeyword"] = 108] = "StaticKeyword";
        SyntaxKind[SyntaxKind["YieldKeyword"] = 109] = "YieldKeyword";
        SyntaxKind[SyntaxKind["AnyKeyword"] = 110] = "AnyKeyword";
        SyntaxKind[SyntaxKind["BooleanKeyword"] = 111] = "BooleanKeyword";
        SyntaxKind[SyntaxKind["ConstructorKeyword"] = 112] = "ConstructorKeyword";
        SyntaxKind[SyntaxKind["DeclareKeyword"] = 113] = "DeclareKeyword";
        SyntaxKind[SyntaxKind["GetKeyword"] = 114] = "GetKeyword";
        SyntaxKind[SyntaxKind["ModuleKeyword"] = 115] = "ModuleKeyword";
        SyntaxKind[SyntaxKind["RequireKeyword"] = 116] = "RequireKeyword";
        SyntaxKind[SyntaxKind["NumberKeyword"] = 117] = "NumberKeyword";
        SyntaxKind[SyntaxKind["SetKeyword"] = 118] = "SetKeyword";
        SyntaxKind[SyntaxKind["StringKeyword"] = 119] = "StringKeyword";
        SyntaxKind[SyntaxKind["TypeKeyword"] = 120] = "TypeKeyword";
        SyntaxKind[SyntaxKind["AsyncKeyword"] = 121] = "AsyncKeyword";
        SyntaxKind[SyntaxKind["AwaitKeyword"] = 122] = "AwaitKeyword";
        SyntaxKind[SyntaxKind["QualifiedName"] = 123] = "QualifiedName";
        SyntaxKind[SyntaxKind["ComputedPropertyName"] = 124] = "ComputedPropertyName";
        SyntaxKind[SyntaxKind["TypeParameter"] = 125] = "TypeParameter";
        SyntaxKind[SyntaxKind["Parameter"] = 126] = "Parameter";
        SyntaxKind[SyntaxKind["PropertySignature"] = 127] = "PropertySignature";
        SyntaxKind[SyntaxKind["PropertyDeclaration"] = 128] = "PropertyDeclaration";
        SyntaxKind[SyntaxKind["MethodSignature"] = 129] = "MethodSignature";
        SyntaxKind[SyntaxKind["MethodDeclaration"] = 130] = "MethodDeclaration";
        SyntaxKind[SyntaxKind["Constructor"] = 131] = "Constructor";
        SyntaxKind[SyntaxKind["GetAccessor"] = 132] = "GetAccessor";
        SyntaxKind[SyntaxKind["SetAccessor"] = 133] = "SetAccessor";
        SyntaxKind[SyntaxKind["CallSignature"] = 134] = "CallSignature";
        SyntaxKind[SyntaxKind["ConstructSignature"] = 135] = "ConstructSignature";
        SyntaxKind[SyntaxKind["IndexSignature"] = 136] = "IndexSignature";
        SyntaxKind[SyntaxKind["TypeReference"] = 137] = "TypeReference";
        SyntaxKind[SyntaxKind["FunctionType"] = 138] = "FunctionType";
        SyntaxKind[SyntaxKind["ConstructorType"] = 139] = "ConstructorType";
        SyntaxKind[SyntaxKind["TypeQuery"] = 140] = "TypeQuery";
        SyntaxKind[SyntaxKind["TypeLiteral"] = 141] = "TypeLiteral";
        SyntaxKind[SyntaxKind["ArrayType"] = 142] = "ArrayType";
        SyntaxKind[SyntaxKind["TupleType"] = 143] = "TupleType";
        SyntaxKind[SyntaxKind["UnionType"] = 144] = "UnionType";
        SyntaxKind[SyntaxKind["ParenthesizedType"] = 145] = "ParenthesizedType";
        SyntaxKind[SyntaxKind["ObjectBindingPattern"] = 146] = "ObjectBindingPattern";
        SyntaxKind[SyntaxKind["ArrayBindingPattern"] = 147] = "ArrayBindingPattern";
        SyntaxKind[SyntaxKind["BindingElement"] = 148] = "BindingElement";
        SyntaxKind[SyntaxKind["ArrayLiteralExpression"] = 149] = "ArrayLiteralExpression";
        SyntaxKind[SyntaxKind["ObjectLiteralExpression"] = 150] = "ObjectLiteralExpression";
        SyntaxKind[SyntaxKind["PropertyAccessExpression"] = 151] = "PropertyAccessExpression";
        SyntaxKind[SyntaxKind["ElementAccessExpression"] = 152] = "ElementAccessExpression";
        SyntaxKind[SyntaxKind["CallExpression"] = 153] = "CallExpression";
        SyntaxKind[SyntaxKind["NewExpression"] = 154] = "NewExpression";
        SyntaxKind[SyntaxKind["TaggedTemplateExpression"] = 155] = "TaggedTemplateExpression";
        SyntaxKind[SyntaxKind["TypeAssertionExpression"] = 156] = "TypeAssertionExpression";
        SyntaxKind[SyntaxKind["ParenthesizedExpression"] = 157] = "ParenthesizedExpression";
        SyntaxKind[SyntaxKind["FunctionExpression"] = 158] = "FunctionExpression";
        SyntaxKind[SyntaxKind["ArrowFunction"] = 159] = "ArrowFunction";
        SyntaxKind[SyntaxKind["DeleteExpression"] = 160] = "DeleteExpression";
        SyntaxKind[SyntaxKind["TypeOfExpression"] = 161] = "TypeOfExpression";
        SyntaxKind[SyntaxKind["VoidExpression"] = 162] = "VoidExpression";
        SyntaxKind[SyntaxKind["AwaitExpression"] = 163] = "AwaitExpression";
        SyntaxKind[SyntaxKind["PrefixUnaryExpression"] = 164] = "PrefixUnaryExpression";
        SyntaxKind[SyntaxKind["PostfixUnaryExpression"] = 165] = "PostfixUnaryExpression";
        SyntaxKind[SyntaxKind["BinaryExpression"] = 166] = "BinaryExpression";
        SyntaxKind[SyntaxKind["ConditionalExpression"] = 167] = "ConditionalExpression";
        SyntaxKind[SyntaxKind["TemplateExpression"] = 168] = "TemplateExpression";
        SyntaxKind[SyntaxKind["YieldExpression"] = 169] = "YieldExpression";
        SyntaxKind[SyntaxKind["GeneratedLabel"] = 170] = "GeneratedLabel";
        SyntaxKind[SyntaxKind["SpreadElementExpression"] = 171] = "SpreadElementExpression";
        SyntaxKind[SyntaxKind["OmittedExpression"] = 172] = "OmittedExpression";
        SyntaxKind[SyntaxKind["TemplateSpan"] = 173] = "TemplateSpan";
        SyntaxKind[SyntaxKind["Block"] = 174] = "Block";
        SyntaxKind[SyntaxKind["VariableStatement"] = 175] = "VariableStatement";
        SyntaxKind[SyntaxKind["EmptyStatement"] = 176] = "EmptyStatement";
        SyntaxKind[SyntaxKind["ExpressionStatement"] = 177] = "ExpressionStatement";
        SyntaxKind[SyntaxKind["IfStatement"] = 178] = "IfStatement";
        SyntaxKind[SyntaxKind["DoStatement"] = 179] = "DoStatement";
        SyntaxKind[SyntaxKind["WhileStatement"] = 180] = "WhileStatement";
        SyntaxKind[SyntaxKind["ForStatement"] = 181] = "ForStatement";
        SyntaxKind[SyntaxKind["ForInStatement"] = 182] = "ForInStatement";
        SyntaxKind[SyntaxKind["ContinueStatement"] = 183] = "ContinueStatement";
        SyntaxKind[SyntaxKind["BreakStatement"] = 184] = "BreakStatement";
        SyntaxKind[SyntaxKind["ReturnStatement"] = 185] = "ReturnStatement";
        SyntaxKind[SyntaxKind["WithStatement"] = 186] = "WithStatement";
        SyntaxKind[SyntaxKind["SwitchStatement"] = 187] = "SwitchStatement";
        SyntaxKind[SyntaxKind["LabeledStatement"] = 188] = "LabeledStatement";
        SyntaxKind[SyntaxKind["ThrowStatement"] = 189] = "ThrowStatement";
        SyntaxKind[SyntaxKind["TryStatement"] = 190] = "TryStatement";
        SyntaxKind[SyntaxKind["DebuggerStatement"] = 191] = "DebuggerStatement";
        SyntaxKind[SyntaxKind["VariableDeclaration"] = 192] = "VariableDeclaration";
        SyntaxKind[SyntaxKind["VariableDeclarationList"] = 193] = "VariableDeclarationList";
        SyntaxKind[SyntaxKind["FunctionDeclaration"] = 194] = "FunctionDeclaration";
        SyntaxKind[SyntaxKind["ClassDeclaration"] = 195] = "ClassDeclaration";
        SyntaxKind[SyntaxKind["InterfaceDeclaration"] = 196] = "InterfaceDeclaration";
        SyntaxKind[SyntaxKind["TypeAliasDeclaration"] = 197] = "TypeAliasDeclaration";
        SyntaxKind[SyntaxKind["EnumDeclaration"] = 198] = "EnumDeclaration";
        SyntaxKind[SyntaxKind["ModuleDeclaration"] = 199] = "ModuleDeclaration";
        SyntaxKind[SyntaxKind["ModuleBlock"] = 200] = "ModuleBlock";
        SyntaxKind[SyntaxKind["ImportDeclaration"] = 201] = "ImportDeclaration";
        SyntaxKind[SyntaxKind["ExportAssignment"] = 202] = "ExportAssignment";
        SyntaxKind[SyntaxKind["ExternalModuleReference"] = 203] = "ExternalModuleReference";
        SyntaxKind[SyntaxKind["CaseClause"] = 204] = "CaseClause";
        SyntaxKind[SyntaxKind["DefaultClause"] = 205] = "DefaultClause";
        SyntaxKind[SyntaxKind["HeritageClause"] = 206] = "HeritageClause";
        SyntaxKind[SyntaxKind["CatchClause"] = 207] = "CatchClause";
        SyntaxKind[SyntaxKind["PropertyAssignment"] = 208] = "PropertyAssignment";
        SyntaxKind[SyntaxKind["ShorthandPropertyAssignment"] = 209] = "ShorthandPropertyAssignment";
        SyntaxKind[SyntaxKind["EnumMember"] = 210] = "EnumMember";
        SyntaxKind[SyntaxKind["SourceFile"] = 211] = "SourceFile";
        SyntaxKind[SyntaxKind["SyntaxList"] = 212] = "SyntaxList";
        SyntaxKind[SyntaxKind["Count"] = 213] = "Count";
        SyntaxKind[SyntaxKind["FirstAssignment"] = 52] = "FirstAssignment";
        SyntaxKind[SyntaxKind["LastAssignment"] = 63] = "LastAssignment";
        SyntaxKind[SyntaxKind["FirstReservedWord"] = 65] = "FirstReservedWord";
        SyntaxKind[SyntaxKind["LastReservedWord"] = 100] = "LastReservedWord";
        SyntaxKind[SyntaxKind["FirstKeyword"] = 65] = "FirstKeyword";
        SyntaxKind[SyntaxKind["LastKeyword"] = 122] = "LastKeyword";
        SyntaxKind[SyntaxKind["FirstFutureReservedWord"] = 101] = "FirstFutureReservedWord";
        SyntaxKind[SyntaxKind["LastFutureReservedWord"] = 109] = "LastFutureReservedWord";
        SyntaxKind[SyntaxKind["FirstTypeNode"] = 137] = "FirstTypeNode";
        SyntaxKind[SyntaxKind["LastTypeNode"] = 145] = "LastTypeNode";
        SyntaxKind[SyntaxKind["FirstPunctuation"] = 14] = "FirstPunctuation";
        SyntaxKind[SyntaxKind["LastPunctuation"] = 63] = "LastPunctuation";
        SyntaxKind[SyntaxKind["FirstToken"] = 0] = "FirstToken";
        SyntaxKind[SyntaxKind["LastToken"] = 122] = "LastToken";
        SyntaxKind[SyntaxKind["FirstTriviaToken"] = 2] = "FirstTriviaToken";
        SyntaxKind[SyntaxKind["LastTriviaToken"] = 6] = "LastTriviaToken";
        SyntaxKind[SyntaxKind["FirstLiteralToken"] = 7] = "FirstLiteralToken";
        SyntaxKind[SyntaxKind["LastLiteralToken"] = 10] = "LastLiteralToken";
        SyntaxKind[SyntaxKind["FirstTemplateToken"] = 10] = "FirstTemplateToken";
        SyntaxKind[SyntaxKind["LastTemplateToken"] = 13] = "LastTemplateToken";
        SyntaxKind[SyntaxKind["FirstBinaryOperator"] = 24] = "FirstBinaryOperator";
        SyntaxKind[SyntaxKind["LastBinaryOperator"] = 63] = "LastBinaryOperator";
        SyntaxKind[SyntaxKind["FirstNode"] = 123] = "FirstNode";
    })(ts.SyntaxKind || (ts.SyntaxKind = {}));
    var SyntaxKind = ts.SyntaxKind;
    (function (NodeFlags) {
        NodeFlags[NodeFlags["Export"] = 1] = "Export";
        NodeFlags[NodeFlags["Ambient"] = 2] = "Ambient";
        NodeFlags[NodeFlags["Public"] = 16] = "Public";
        NodeFlags[NodeFlags["Private"] = 32] = "Private";
        NodeFlags[NodeFlags["Protected"] = 64] = "Protected";
        NodeFlags[NodeFlags["Static"] = 128] = "Static";
        NodeFlags[NodeFlags["MultiLine"] = 256] = "MultiLine";
        NodeFlags[NodeFlags["Synthetic"] = 512] = "Synthetic";
        NodeFlags[NodeFlags["DeclarationFile"] = 1024] = "DeclarationFile";
        NodeFlags[NodeFlags["Let"] = 2048] = "Let";
        NodeFlags[NodeFlags["Const"] = 4096] = "Const";
        NodeFlags[NodeFlags["OctalLiteral"] = 8192] = "OctalLiteral";
        NodeFlags[NodeFlags["Async"] = 16384] = "Async";
        NodeFlags[NodeFlags["Modifier"] = 16627] = "Modifier";
        NodeFlags[NodeFlags["AccessibilityModifier"] = 112] = "AccessibilityModifier";
        NodeFlags[NodeFlags["BlockScoped"] = 6144] = "BlockScoped";
    })(ts.NodeFlags || (ts.NodeFlags = {}));
    var NodeFlags = ts.NodeFlags;
    (function (ParserContextFlags) {
        ParserContextFlags[ParserContextFlags["None"] = 0] = "None";
        ParserContextFlags[ParserContextFlags["StrictMode"] = 1] = "StrictMode";
        ParserContextFlags[ParserContextFlags["DisallowIn"] = 2] = "DisallowIn";
        ParserContextFlags[ParserContextFlags["Yield"] = 4] = "Yield";
        ParserContextFlags[ParserContextFlags["GeneratorParameter"] = 8] = "GeneratorParameter";
        ParserContextFlags[ParserContextFlags["ThisNodeHasError"] = 16] = "ThisNodeHasError";
        ParserContextFlags[ParserContextFlags["AsyncParameter"] = 32] = "AsyncParameter";
        ParserContextFlags[ParserContextFlags["Await"] = 64] = "Await";
        ParserContextFlags[ParserContextFlags["ParserGeneratedFlags"] = 127] = "ParserGeneratedFlags";
        ParserContextFlags[ParserContextFlags["ThisNodeOrAnySubNodesHasError"] = 128] = "ThisNodeOrAnySubNodesHasError";
        ParserContextFlags[ParserContextFlags["ThisNodeOrAnySubNodesHasAwaitOrYield"] = 256] = "ThisNodeOrAnySubNodesHasAwaitOrYield";
        ParserContextFlags[ParserContextFlags["HasAggregatedChildData"] = 512] = "HasAggregatedChildData";
    })(ts.ParserContextFlags || (ts.ParserContextFlags = {}));
    var ParserContextFlags = ts.ParserContextFlags;
    (function (OpCode) {
        OpCode[OpCode["Statement"] = 0] = "Statement";
        OpCode[OpCode["Assign"] = 1] = "Assign";
        OpCode[OpCode["Break"] = 2] = "Break";
        OpCode[OpCode["BrTrue"] = 3] = "BrTrue";
        OpCode[OpCode["BrFalse"] = 4] = "BrFalse";
        OpCode[OpCode["Yield"] = 5] = "Yield";
        OpCode[OpCode["YieldStar"] = 6] = "YieldStar";
        OpCode[OpCode["Return"] = 7] = "Return";
        OpCode[OpCode["Throw"] = 8] = "Throw";
        OpCode[OpCode["Endfinally"] = 9] = "Endfinally";
    })(ts.OpCode || (ts.OpCode = {}));
    var OpCode = ts.OpCode;
    (function (BlockAction) {
        BlockAction[BlockAction["Open"] = 0] = "Open";
        BlockAction[BlockAction["Close"] = 1] = "Close";
    })(ts.BlockAction || (ts.BlockAction = {}));
    var BlockAction = ts.BlockAction;
    (function (BlockKind) {
        BlockKind[BlockKind["Exception"] = 0] = "Exception";
        BlockKind[BlockKind["ScriptBreak"] = 1] = "ScriptBreak";
        BlockKind[BlockKind["Break"] = 2] = "Break";
        BlockKind[BlockKind["ScriptContinue"] = 3] = "ScriptContinue";
        BlockKind[BlockKind["Continue"] = 4] = "Continue";
        BlockKind[BlockKind["With"] = 5] = "With";
    })(ts.BlockKind || (ts.BlockKind = {}));
    var BlockKind = ts.BlockKind;
    (function (ExceptionBlockState) {
        ExceptionBlockState[ExceptionBlockState["Try"] = 0] = "Try";
        ExceptionBlockState[ExceptionBlockState["Catch"] = 1] = "Catch";
        ExceptionBlockState[ExceptionBlockState["Finally"] = 2] = "Finally";
        ExceptionBlockState[ExceptionBlockState["Done"] = 3] = "Done";
    })(ts.ExceptionBlockState || (ts.ExceptionBlockState = {}));
    var ExceptionBlockState = ts.ExceptionBlockState;
    (function (FunctionBuilderFlags) {
        FunctionBuilderFlags[FunctionBuilderFlags["HasProtectedRegions"] = 0x1] = "HasProtectedRegions";
    })(ts.FunctionBuilderFlags || (ts.FunctionBuilderFlags = {}));
    var FunctionBuilderFlags = ts.FunctionBuilderFlags;
    (function (EmitReturnStatus) {
        EmitReturnStatus[EmitReturnStatus["Succeeded"] = 0] = "Succeeded";
        EmitReturnStatus[EmitReturnStatus["AllOutputGenerationSkipped"] = 1] = "AllOutputGenerationSkipped";
        EmitReturnStatus[EmitReturnStatus["JSGeneratedWithSemanticErrors"] = 2] = "JSGeneratedWithSemanticErrors";
        EmitReturnStatus[EmitReturnStatus["DeclarationGenerationSkipped"] = 3] = "DeclarationGenerationSkipped";
        EmitReturnStatus[EmitReturnStatus["EmitErrorsEncountered"] = 4] = "EmitErrorsEncountered";
        EmitReturnStatus[EmitReturnStatus["CompilerOptionsErrors"] = 5] = "CompilerOptionsErrors";
    })(ts.EmitReturnStatus || (ts.EmitReturnStatus = {}));
    var EmitReturnStatus = ts.EmitReturnStatus;
    (function (TypeFormatFlags) {
        TypeFormatFlags[TypeFormatFlags["None"] = 0] = "None";
        TypeFormatFlags[TypeFormatFlags["WriteArrayAsGenericType"] = 1] = "WriteArrayAsGenericType";
        TypeFormatFlags[TypeFormatFlags["UseTypeOfFunction"] = 2] = "UseTypeOfFunction";
        TypeFormatFlags[TypeFormatFlags["NoTruncation"] = 4] = "NoTruncation";
        TypeFormatFlags[TypeFormatFlags["WriteArrowStyleSignature"] = 8] = "WriteArrowStyleSignature";
        TypeFormatFlags[TypeFormatFlags["WriteOwnNameForAnyLike"] = 16] = "WriteOwnNameForAnyLike";
        TypeFormatFlags[TypeFormatFlags["WriteTypeArgumentsOfSignature"] = 32] = "WriteTypeArgumentsOfSignature";
        TypeFormatFlags[TypeFormatFlags["InElementType"] = 64] = "InElementType";
    })(ts.TypeFormatFlags || (ts.TypeFormatFlags = {}));
    var TypeFormatFlags = ts.TypeFormatFlags;
    (function (SymbolFormatFlags) {
        SymbolFormatFlags[SymbolFormatFlags["None"] = 0] = "None";
        SymbolFormatFlags[SymbolFormatFlags["WriteTypeParametersOrArguments"] = 1] = "WriteTypeParametersOrArguments";
        SymbolFormatFlags[SymbolFormatFlags["UseOnlyExternalAliasing"] = 2] = "UseOnlyExternalAliasing";
    })(ts.SymbolFormatFlags || (ts.SymbolFormatFlags = {}));
    var SymbolFormatFlags = ts.SymbolFormatFlags;
    (function (SymbolAccessibility) {
        SymbolAccessibility[SymbolAccessibility["Accessible"] = 0] = "Accessible";
        SymbolAccessibility[SymbolAccessibility["NotAccessible"] = 1] = "NotAccessible";
        SymbolAccessibility[SymbolAccessibility["CannotBeNamed"] = 2] = "CannotBeNamed";
    })(ts.SymbolAccessibility || (ts.SymbolAccessibility = {}));
    var SymbolAccessibility = ts.SymbolAccessibility;
    (function (SymbolFlags) {
        SymbolFlags[SymbolFlags["FunctionScopedVariable"] = 1] = "FunctionScopedVariable";
        SymbolFlags[SymbolFlags["BlockScopedVariable"] = 2] = "BlockScopedVariable";
        SymbolFlags[SymbolFlags["Property"] = 4] = "Property";
        SymbolFlags[SymbolFlags["EnumMember"] = 8] = "EnumMember";
        SymbolFlags[SymbolFlags["Function"] = 16] = "Function";
        SymbolFlags[SymbolFlags["Class"] = 32] = "Class";
        SymbolFlags[SymbolFlags["Interface"] = 64] = "Interface";
        SymbolFlags[SymbolFlags["ConstEnum"] = 128] = "ConstEnum";
        SymbolFlags[SymbolFlags["RegularEnum"] = 256] = "RegularEnum";
        SymbolFlags[SymbolFlags["ValueModule"] = 512] = "ValueModule";
        SymbolFlags[SymbolFlags["NamespaceModule"] = 1024] = "NamespaceModule";
        SymbolFlags[SymbolFlags["TypeLiteral"] = 2048] = "TypeLiteral";
        SymbolFlags[SymbolFlags["ObjectLiteral"] = 4096] = "ObjectLiteral";
        SymbolFlags[SymbolFlags["Method"] = 8192] = "Method";
        SymbolFlags[SymbolFlags["Constructor"] = 16384] = "Constructor";
        SymbolFlags[SymbolFlags["GetAccessor"] = 32768] = "GetAccessor";
        SymbolFlags[SymbolFlags["SetAccessor"] = 65536] = "SetAccessor";
        SymbolFlags[SymbolFlags["Signature"] = 131072] = "Signature";
        SymbolFlags[SymbolFlags["TypeParameter"] = 262144] = "TypeParameter";
        SymbolFlags[SymbolFlags["TypeAlias"] = 524288] = "TypeAlias";
        SymbolFlags[SymbolFlags["ExportValue"] = 1048576] = "ExportValue";
        SymbolFlags[SymbolFlags["ExportType"] = 2097152] = "ExportType";
        SymbolFlags[SymbolFlags["ExportNamespace"] = 4194304] = "ExportNamespace";
        SymbolFlags[SymbolFlags["Import"] = 8388608] = "Import";
        SymbolFlags[SymbolFlags["Instantiated"] = 16777216] = "Instantiated";
        SymbolFlags[SymbolFlags["Merged"] = 33554432] = "Merged";
        SymbolFlags[SymbolFlags["Transient"] = 67108864] = "Transient";
        SymbolFlags[SymbolFlags["Prototype"] = 134217728] = "Prototype";
        SymbolFlags[SymbolFlags["UnionProperty"] = 268435456] = "UnionProperty";
        SymbolFlags[SymbolFlags["Optional"] = 536870912] = "Optional";
        SymbolFlags[SymbolFlags["Enum"] = 384] = "Enum";
        SymbolFlags[SymbolFlags["Variable"] = 3] = "Variable";
        SymbolFlags[SymbolFlags["Value"] = 107455] = "Value";
        SymbolFlags[SymbolFlags["Type"] = 793056] = "Type";
        SymbolFlags[SymbolFlags["Namespace"] = 1536] = "Namespace";
        SymbolFlags[SymbolFlags["Module"] = 1536] = "Module";
        SymbolFlags[SymbolFlags["Accessor"] = 98304] = "Accessor";
        SymbolFlags[SymbolFlags["FunctionScopedVariableExcludes"] = 107454] = "FunctionScopedVariableExcludes";
        SymbolFlags[SymbolFlags["BlockScopedVariableExcludes"] = 107455] = "BlockScopedVariableExcludes";
        SymbolFlags[SymbolFlags["ParameterExcludes"] = 107455] = "ParameterExcludes";
        SymbolFlags[SymbolFlags["PropertyExcludes"] = 107455] = "PropertyExcludes";
        SymbolFlags[SymbolFlags["EnumMemberExcludes"] = 107455] = "EnumMemberExcludes";
        SymbolFlags[SymbolFlags["FunctionExcludes"] = 106927] = "FunctionExcludes";
        SymbolFlags[SymbolFlags["ClassExcludes"] = 899583] = "ClassExcludes";
        SymbolFlags[SymbolFlags["InterfaceExcludes"] = 792992] = "InterfaceExcludes";
        SymbolFlags[SymbolFlags["RegularEnumExcludes"] = 899327] = "RegularEnumExcludes";
        SymbolFlags[SymbolFlags["ConstEnumExcludes"] = 899967] = "ConstEnumExcludes";
        SymbolFlags[SymbolFlags["ValueModuleExcludes"] = 106639] = "ValueModuleExcludes";
        SymbolFlags[SymbolFlags["NamespaceModuleExcludes"] = 0] = "NamespaceModuleExcludes";
        SymbolFlags[SymbolFlags["MethodExcludes"] = 99263] = "MethodExcludes";
        SymbolFlags[SymbolFlags["GetAccessorExcludes"] = 41919] = "GetAccessorExcludes";
        SymbolFlags[SymbolFlags["SetAccessorExcludes"] = 74687] = "SetAccessorExcludes";
        SymbolFlags[SymbolFlags["TypeParameterExcludes"] = 530912] = "TypeParameterExcludes";
        SymbolFlags[SymbolFlags["TypeAliasExcludes"] = 793056] = "TypeAliasExcludes";
        SymbolFlags[SymbolFlags["ImportExcludes"] = 8388608] = "ImportExcludes";
        SymbolFlags[SymbolFlags["ModuleMember"] = 8914931] = "ModuleMember";
        SymbolFlags[SymbolFlags["ExportHasLocal"] = 944] = "ExportHasLocal";
        SymbolFlags[SymbolFlags["HasLocals"] = 255504] = "HasLocals";
        SymbolFlags[SymbolFlags["HasExports"] = 1952] = "HasExports";
        SymbolFlags[SymbolFlags["HasMembers"] = 6240] = "HasMembers";
        SymbolFlags[SymbolFlags["IsContainer"] = 262128] = "IsContainer";
        SymbolFlags[SymbolFlags["PropertyOrAccessor"] = 98308] = "PropertyOrAccessor";
        SymbolFlags[SymbolFlags["Export"] = 7340032] = "Export";
    })(ts.SymbolFlags || (ts.SymbolFlags = {}));
    var SymbolFlags = ts.SymbolFlags;
    (function (NodeCheckFlags) {
        NodeCheckFlags[NodeCheckFlags["TypeChecked"] = 1] = "TypeChecked";
        NodeCheckFlags[NodeCheckFlags["LexicalThis"] = 2] = "LexicalThis";
        NodeCheckFlags[NodeCheckFlags["CaptureThis"] = 4] = "CaptureThis";
        NodeCheckFlags[NodeCheckFlags["LexicalArguments"] = 8] = "LexicalArguments";
        NodeCheckFlags[NodeCheckFlags["CaptureArguments"] = 16] = "CaptureArguments";
        NodeCheckFlags[NodeCheckFlags["EmitExtends"] = 32] = "EmitExtends";
        NodeCheckFlags[NodeCheckFlags["SuperInstance"] = 64] = "SuperInstance";
        NodeCheckFlags[NodeCheckFlags["SuperStatic"] = 128] = "SuperStatic";
        NodeCheckFlags[NodeCheckFlags["ContextChecked"] = 256] = "ContextChecked";
        NodeCheckFlags[NodeCheckFlags["EnumValuesComputed"] = 512] = "EnumValuesComputed";
        NodeCheckFlags[NodeCheckFlags["EmitAwaiter"] = 1024] = "EmitAwaiter";
        NodeCheckFlags[NodeCheckFlags["EmitGenerator"] = 2048] = "EmitGenerator";
    })(ts.NodeCheckFlags || (ts.NodeCheckFlags = {}));
    var NodeCheckFlags = ts.NodeCheckFlags;
    (function (TypeFlags) {
        TypeFlags[TypeFlags["Any"] = 1] = "Any";
        TypeFlags[TypeFlags["String"] = 2] = "String";
        TypeFlags[TypeFlags["Number"] = 4] = "Number";
        TypeFlags[TypeFlags["Boolean"] = 8] = "Boolean";
        TypeFlags[TypeFlags["Void"] = 16] = "Void";
        TypeFlags[TypeFlags["Undefined"] = 32] = "Undefined";
        TypeFlags[TypeFlags["Null"] = 64] = "Null";
        TypeFlags[TypeFlags["Enum"] = 128] = "Enum";
        TypeFlags[TypeFlags["StringLiteral"] = 256] = "StringLiteral";
        TypeFlags[TypeFlags["TypeParameter"] = 512] = "TypeParameter";
        TypeFlags[TypeFlags["Class"] = 1024] = "Class";
        TypeFlags[TypeFlags["Interface"] = 2048] = "Interface";
        TypeFlags[TypeFlags["Reference"] = 4096] = "Reference";
        TypeFlags[TypeFlags["Tuple"] = 8192] = "Tuple";
        TypeFlags[TypeFlags["Union"] = 16384] = "Union";
        TypeFlags[TypeFlags["Anonymous"] = 32768] = "Anonymous";
        TypeFlags[TypeFlags["FromSignature"] = 65536] = "FromSignature";
        TypeFlags[TypeFlags["Unwidened"] = 131072] = "Unwidened";
        TypeFlags[TypeFlags["Intrinsic"] = 127] = "Intrinsic";
        TypeFlags[TypeFlags["StringLike"] = 258] = "StringLike";
        TypeFlags[TypeFlags["NumberLike"] = 132] = "NumberLike";
        TypeFlags[TypeFlags["ObjectType"] = 48128] = "ObjectType";
    })(ts.TypeFlags || (ts.TypeFlags = {}));
    var TypeFlags = ts.TypeFlags;
    (function (SignatureKind) {
        SignatureKind[SignatureKind["Call"] = 0] = "Call";
        SignatureKind[SignatureKind["Construct"] = 1] = "Construct";
    })(ts.SignatureKind || (ts.SignatureKind = {}));
    var SignatureKind = ts.SignatureKind;
    (function (IndexKind) {
        IndexKind[IndexKind["String"] = 0] = "String";
        IndexKind[IndexKind["Number"] = 1] = "Number";
    })(ts.IndexKind || (ts.IndexKind = {}));
    var IndexKind = ts.IndexKind;
    (function (DiagnosticCategory) {
        DiagnosticCategory[DiagnosticCategory["Warning"] = 0] = "Warning";
        DiagnosticCategory[DiagnosticCategory["Error"] = 1] = "Error";
        DiagnosticCategory[DiagnosticCategory["Message"] = 2] = "Message";
    })(ts.DiagnosticCategory || (ts.DiagnosticCategory = {}));
    var DiagnosticCategory = ts.DiagnosticCategory;
    (function (ModuleKind) {
        ModuleKind[ModuleKind["None"] = 0] = "None";
        ModuleKind[ModuleKind["CommonJS"] = 1] = "CommonJS";
        ModuleKind[ModuleKind["AMD"] = 2] = "AMD";
    })(ts.ModuleKind || (ts.ModuleKind = {}));
    var ModuleKind = ts.ModuleKind;
    (function (ScriptTarget) {
        ScriptTarget[ScriptTarget["ES3"] = 0] = "ES3";
        ScriptTarget[ScriptTarget["ES5"] = 1] = "ES5";
        ScriptTarget[ScriptTarget["ES6"] = 2] = "ES6";
        ScriptTarget[ScriptTarget["Latest"] = 2] = "Latest";
    })(ts.ScriptTarget || (ts.ScriptTarget = {}));
    var ScriptTarget = ts.ScriptTarget;
    (function (CharacterCodes) {
        CharacterCodes[CharacterCodes["nullCharacter"] = 0] = "nullCharacter";
        CharacterCodes[CharacterCodes["maxAsciiCharacter"] = 127] = "maxAsciiCharacter";
        CharacterCodes[CharacterCodes["lineFeed"] = 10] = "lineFeed";
        CharacterCodes[CharacterCodes["carriageReturn"] = 13] = "carriageReturn";
        CharacterCodes[CharacterCodes["lineSeparator"] = 8232] = "lineSeparator";
        CharacterCodes[CharacterCodes["paragraphSeparator"] = 8233] = "paragraphSeparator";
        CharacterCodes[CharacterCodes["nextLine"] = 133] = "nextLine";
        CharacterCodes[CharacterCodes["space"] = 32] = "space";
        CharacterCodes[CharacterCodes["nonBreakingSpace"] = 160] = "nonBreakingSpace";
        CharacterCodes[CharacterCodes["enQuad"] = 8192] = "enQuad";
        CharacterCodes[CharacterCodes["emQuad"] = 8193] = "emQuad";
        CharacterCodes[CharacterCodes["enSpace"] = 8194] = "enSpace";
        CharacterCodes[CharacterCodes["emSpace"] = 8195] = "emSpace";
        CharacterCodes[CharacterCodes["threePerEmSpace"] = 8196] = "threePerEmSpace";
        CharacterCodes[CharacterCodes["fourPerEmSpace"] = 8197] = "fourPerEmSpace";
        CharacterCodes[CharacterCodes["sixPerEmSpace"] = 8198] = "sixPerEmSpace";
        CharacterCodes[CharacterCodes["figureSpace"] = 8199] = "figureSpace";
        CharacterCodes[CharacterCodes["punctuationSpace"] = 8200] = "punctuationSpace";
        CharacterCodes[CharacterCodes["thinSpace"] = 8201] = "thinSpace";
        CharacterCodes[CharacterCodes["hairSpace"] = 8202] = "hairSpace";
        CharacterCodes[CharacterCodes["zeroWidthSpace"] = 8203] = "zeroWidthSpace";
        CharacterCodes[CharacterCodes["narrowNoBreakSpace"] = 8239] = "narrowNoBreakSpace";
        CharacterCodes[CharacterCodes["ideographicSpace"] = 12288] = "ideographicSpace";
        CharacterCodes[CharacterCodes["mathematicalSpace"] = 8287] = "mathematicalSpace";
        CharacterCodes[CharacterCodes["ogham"] = 5760] = "ogham";
        CharacterCodes[CharacterCodes["_"] = 95] = "_";
        CharacterCodes[CharacterCodes["$"] = 36] = "$";
        CharacterCodes[CharacterCodes["_0"] = 48] = "_0";
        CharacterCodes[CharacterCodes["_1"] = 49] = "_1";
        CharacterCodes[CharacterCodes["_2"] = 50] = "_2";
        CharacterCodes[CharacterCodes["_3"] = 51] = "_3";
        CharacterCodes[CharacterCodes["_4"] = 52] = "_4";
        CharacterCodes[CharacterCodes["_5"] = 53] = "_5";
        CharacterCodes[CharacterCodes["_6"] = 54] = "_6";
        CharacterCodes[CharacterCodes["_7"] = 55] = "_7";
        CharacterCodes[CharacterCodes["_8"] = 56] = "_8";
        CharacterCodes[CharacterCodes["_9"] = 57] = "_9";
        CharacterCodes[CharacterCodes["a"] = 97] = "a";
        CharacterCodes[CharacterCodes["b"] = 98] = "b";
        CharacterCodes[CharacterCodes["c"] = 99] = "c";
        CharacterCodes[CharacterCodes["d"] = 100] = "d";
        CharacterCodes[CharacterCodes["e"] = 101] = "e";
        CharacterCodes[CharacterCodes["f"] = 102] = "f";
        CharacterCodes[CharacterCodes["g"] = 103] = "g";
        CharacterCodes[CharacterCodes["h"] = 104] = "h";
        CharacterCodes[CharacterCodes["i"] = 105] = "i";
        CharacterCodes[CharacterCodes["j"] = 106] = "j";
        CharacterCodes[CharacterCodes["k"] = 107] = "k";
        CharacterCodes[CharacterCodes["l"] = 108] = "l";
        CharacterCodes[CharacterCodes["m"] = 109] = "m";
        CharacterCodes[CharacterCodes["n"] = 110] = "n";
        CharacterCodes[CharacterCodes["o"] = 111] = "o";
        CharacterCodes[CharacterCodes["p"] = 112] = "p";
        CharacterCodes[CharacterCodes["q"] = 113] = "q";
        CharacterCodes[CharacterCodes["r"] = 114] = "r";
        CharacterCodes[CharacterCodes["s"] = 115] = "s";
        CharacterCodes[CharacterCodes["t"] = 116] = "t";
        CharacterCodes[CharacterCodes["u"] = 117] = "u";
        CharacterCodes[CharacterCodes["v"] = 118] = "v";
        CharacterCodes[CharacterCodes["w"] = 119] = "w";
        CharacterCodes[CharacterCodes["x"] = 120] = "x";
        CharacterCodes[CharacterCodes["y"] = 121] = "y";
        CharacterCodes[CharacterCodes["z"] = 122] = "z";
        CharacterCodes[CharacterCodes["A"] = 65] = "A";
        CharacterCodes[CharacterCodes["B"] = 66] = "B";
        CharacterCodes[CharacterCodes["C"] = 67] = "C";
        CharacterCodes[CharacterCodes["D"] = 68] = "D";
        CharacterCodes[CharacterCodes["E"] = 69] = "E";
        CharacterCodes[CharacterCodes["F"] = 70] = "F";
        CharacterCodes[CharacterCodes["G"] = 71] = "G";
        CharacterCodes[CharacterCodes["H"] = 72] = "H";
        CharacterCodes[CharacterCodes["I"] = 73] = "I";
        CharacterCodes[CharacterCodes["J"] = 74] = "J";
        CharacterCodes[CharacterCodes["K"] = 75] = "K";
        CharacterCodes[CharacterCodes["L"] = 76] = "L";
        CharacterCodes[CharacterCodes["M"] = 77] = "M";
        CharacterCodes[CharacterCodes["N"] = 78] = "N";
        CharacterCodes[CharacterCodes["O"] = 79] = "O";
        CharacterCodes[CharacterCodes["P"] = 80] = "P";
        CharacterCodes[CharacterCodes["Q"] = 81] = "Q";
        CharacterCodes[CharacterCodes["R"] = 82] = "R";
        CharacterCodes[CharacterCodes["S"] = 83] = "S";
        CharacterCodes[CharacterCodes["T"] = 84] = "T";
        CharacterCodes[CharacterCodes["U"] = 85] = "U";
        CharacterCodes[CharacterCodes["V"] = 86] = "V";
        CharacterCodes[CharacterCodes["W"] = 87] = "W";
        CharacterCodes[CharacterCodes["X"] = 88] = "X";
        CharacterCodes[CharacterCodes["Y"] = 89] = "Y";
        CharacterCodes[CharacterCodes["Z"] = 90] = "Z";
        CharacterCodes[CharacterCodes["ampersand"] = 38] = "ampersand";
        CharacterCodes[CharacterCodes["asterisk"] = 42] = "asterisk";
        CharacterCodes[CharacterCodes["at"] = 64] = "at";
        CharacterCodes[CharacterCodes["backslash"] = 92] = "backslash";
        CharacterCodes[CharacterCodes["backtick"] = 96] = "backtick";
        CharacterCodes[CharacterCodes["bar"] = 124] = "bar";
        CharacterCodes[CharacterCodes["caret"] = 94] = "caret";
        CharacterCodes[CharacterCodes["closeBrace"] = 125] = "closeBrace";
        CharacterCodes[CharacterCodes["closeBracket"] = 93] = "closeBracket";
        CharacterCodes[CharacterCodes["closeParen"] = 41] = "closeParen";
        CharacterCodes[CharacterCodes["colon"] = 58] = "colon";
        CharacterCodes[CharacterCodes["comma"] = 44] = "comma";
        CharacterCodes[CharacterCodes["dot"] = 46] = "dot";
        CharacterCodes[CharacterCodes["doubleQuote"] = 34] = "doubleQuote";
        CharacterCodes[CharacterCodes["equals"] = 61] = "equals";
        CharacterCodes[CharacterCodes["exclamation"] = 33] = "exclamation";
        CharacterCodes[CharacterCodes["greaterThan"] = 62] = "greaterThan";
        CharacterCodes[CharacterCodes["lessThan"] = 60] = "lessThan";
        CharacterCodes[CharacterCodes["minus"] = 45] = "minus";
        CharacterCodes[CharacterCodes["openBrace"] = 123] = "openBrace";
        CharacterCodes[CharacterCodes["openBracket"] = 91] = "openBracket";
        CharacterCodes[CharacterCodes["openParen"] = 40] = "openParen";
        CharacterCodes[CharacterCodes["percent"] = 37] = "percent";
        CharacterCodes[CharacterCodes["plus"] = 43] = "plus";
        CharacterCodes[CharacterCodes["question"] = 63] = "question";
        CharacterCodes[CharacterCodes["semicolon"] = 59] = "semicolon";
        CharacterCodes[CharacterCodes["singleQuote"] = 39] = "singleQuote";
        CharacterCodes[CharacterCodes["slash"] = 47] = "slash";
        CharacterCodes[CharacterCodes["tilde"] = 126] = "tilde";
        CharacterCodes[CharacterCodes["backspace"] = 8] = "backspace";
        CharacterCodes[CharacterCodes["formFeed"] = 12] = "formFeed";
        CharacterCodes[CharacterCodes["byteOrderMark"] = 65279] = "byteOrderMark";
        CharacterCodes[CharacterCodes["tab"] = 9] = "tab";
        CharacterCodes[CharacterCodes["verticalTab"] = 11] = "verticalTab";
    })(ts.CharacterCodes || (ts.CharacterCodes = {}));
    var CharacterCodes = ts.CharacterCodes;
})(ts || (ts = {}));
var ts;
(function (ts) {
    (function (Ternary) {
        Ternary[Ternary["False"] = 0] = "False";
        Ternary[Ternary["Maybe"] = 1] = "Maybe";
        Ternary[Ternary["True"] = -1] = "True";
    })(ts.Ternary || (ts.Ternary = {}));
    var Ternary = ts.Ternary;
    (function (Comparison) {
        Comparison[Comparison["LessThan"] = -1] = "LessThan";
        Comparison[Comparison["EqualTo"] = 0] = "EqualTo";
        Comparison[Comparison["GreaterThan"] = 1] = "GreaterThan";
    })(ts.Comparison || (ts.Comparison = {}));
    var Comparison = ts.Comparison;
    function forEach(array, callback) {
        if (array) {
            for (var i = 0, len = array.length; i < len; i++) {
                var result = callback(array[i], i);
                if (result) {
                    return result;
                }
            }
        }
        return undefined;
    }
    ts.forEach = forEach;
    function contains(array, value) {
        if (array) {
            for (var i = 0, len = array.length; i < len; i++) {
                if (array[i] === value) {
                    return true;
                }
            }
        }
        return false;
    }
    ts.contains = contains;
    function indexOf(array, value) {
        if (array) {
            for (var i = 0, len = array.length; i < len; i++) {
                if (array[i] === value) {
                    return i;
                }
            }
        }
        return -1;
    }
    ts.indexOf = indexOf;
    function countWhere(array, predicate) {
        var count = 0;
        if (array) {
            for (var i = 0, len = array.length; i < len; i++) {
                if (predicate(array[i])) {
                    count++;
                }
            }
        }
        return count;
    }
    ts.countWhere = countWhere;
    function filter(array, f) {
        if (array) {
            var result = [];
            for (var i = 0, len = array.length; i < len; i++) {
                var item = array[i];
                if (f(item)) {
                    result.push(item);
                }
            }
        }
        return result;
    }
    ts.filter = filter;
    function map(array, f) {
        if (array) {
            var result = [];
            for (var i = 0, len = array.length; i < len; i++) {
                result.push(f(array[i]));
            }
        }
        return result;
    }
    ts.map = map;
    function reduce(array, f, initial) {
        var result = initial;
        if (array) {
            for (var i = 0, l = array.length; i < l; i++) {
                if (i === 0 && arguments.length <= 2) {
                    result = array[i];
                }
                else {
                    result = f(result, array[i]);
                }
            }
        }
        return result;
    }
    ts.reduce = reduce;
    function reduceRight(array, f, initial) {
        var result = initial;
        if (array) {
            var start = array.length - 1;
            for (var i = start; i >= 0; i--) {
                if (i === start && arguments.length <= 2) {
                    result = array[i];
                }
                else {
                    result = f(result, array[i]);
                }
            }
        }
        return result;
    }
    ts.reduceRight = reduceRight;
    function concatenate(array1, array2) {
        if (!array2 || !array2.length)
            return array1;
        if (!array1 || !array1.length)
            return array2;
        return array1.concat(array2);
    }
    ts.concatenate = concatenate;
    function deduplicate(array) {
        if (array) {
            var result = [];
            for (var i = 0, len = array.length; i < len; i++) {
                var item = array[i];
                if (!contains(result, item))
                    result.push(item);
            }
        }
        return result;
    }
    ts.deduplicate = deduplicate;
    function sum(array, prop) {
        var result = 0;
        for (var i = 0; i < array.length; i++) {
            result += array[i][prop];
        }
        return result;
    }
    ts.sum = sum;
    function lastOrUndefined(array) {
        if (array.length === 0) {
            return undefined;
        }
        return array[array.length - 1];
    }
    ts.lastOrUndefined = lastOrUndefined;
    function binarySearch(array, value) {
        var low = 0;
        var high = array.length - 1;
        while (low <= high) {
            var middle = low + ((high - low) >> 1);
            var midValue = array[middle];
            if (midValue === value) {
                return middle;
            }
            else if (midValue > value) {
                high = middle - 1;
            }
            else {
                low = middle + 1;
            }
        }
        return ~low;
    }
    ts.binarySearch = binarySearch;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    function hasProperty(map, key) {
        return hasOwnProperty.call(map, key);
    }
    ts.hasProperty = hasProperty;
    function getProperty(map, key) {
        return hasOwnProperty.call(map, key) ? map[key] : undefined;
    }
    ts.getProperty = getProperty;
    function isEmpty(map) {
        for (var id in map) {
            if (hasProperty(map, id)) {
                return false;
            }
        }
        return true;
    }
    ts.isEmpty = isEmpty;
    function clone(object) {
        var result = {};
        for (var id in object) {
            result[id] = object[id];
        }
        return result;
    }
    ts.clone = clone;
    function extend(first, second) {
        var result = {};
        for (var id in first) {
            result[id] = first[id];
        }
        for (var id in second) {
            if (!hasProperty(result, id)) {
                result[id] = second[id];
            }
        }
        return result;
    }
    ts.extend = extend;
    function forEachValue(map, callback) {
        var result;
        for (var id in map) {
            if (result = callback(map[id]))
                break;
        }
        return result;
    }
    ts.forEachValue = forEachValue;
    function forEachKey(map, callback) {
        var result;
        for (var id in map) {
            if (result = callback(id))
                break;
        }
        return result;
    }
    ts.forEachKey = forEachKey;
    function lookUp(map, key) {
        return hasProperty(map, key) ? map[key] : undefined;
    }
    ts.lookUp = lookUp;
    function mapToArray(map) {
        var result = [];
        for (var id in map) {
            result.push(map[id]);
        }
        return result;
    }
    ts.mapToArray = mapToArray;
    function copyMap(source, target) {
        for (var p in source) {
            target[p] = source[p];
        }
    }
    ts.copyMap = copyMap;
    function arrayToMap(array, makeKey) {
        var result = {};
        forEach(array, function (value) {
            result[makeKey(value)] = value;
        });
        return result;
    }
    ts.arrayToMap = arrayToMap;
    function formatStringFromArgs(text, args, baseIndex) {
        baseIndex = baseIndex || 0;
        return text.replace(/{(\d+)}/g, function (match, index) { return args[+index + baseIndex]; });
    }
    ts.localizedDiagnosticMessages = undefined;
    function getLocaleSpecificMessage(message) {
        return ts.localizedDiagnosticMessages && ts.localizedDiagnosticMessages[message] ? ts.localizedDiagnosticMessages[message] : message;
    }
    ts.getLocaleSpecificMessage = getLocaleSpecificMessage;
    function createFileDiagnostic(file, start, length, message) {
        Debug.assert(start >= 0, "start must be non-negative, is " + start);
        Debug.assert(length >= 0, "length must be non-negative, is " + length);
        var text = getLocaleSpecificMessage(message.key);
        if (arguments.length > 4) {
            text = formatStringFromArgs(text, arguments, 4);
        }
        return {
            file: file,
            start: start,
            length: length,
            messageText: text,
            category: message.category,
            code: message.code,
            isEarly: message.isEarly
        };
    }
    ts.createFileDiagnostic = createFileDiagnostic;
    function createCompilerDiagnostic(message) {
        var text = getLocaleSpecificMessage(message.key);
        if (arguments.length > 1) {
            text = formatStringFromArgs(text, arguments, 1);
        }
        return {
            file: undefined,
            start: undefined,
            length: undefined,
            messageText: text,
            category: message.category,
            code: message.code,
            isEarly: message.isEarly
        };
    }
    ts.createCompilerDiagnostic = createCompilerDiagnostic;
    function chainDiagnosticMessages(details, message) {
        var text = getLocaleSpecificMessage(message.key);
        if (arguments.length > 2) {
            text = formatStringFromArgs(text, arguments, 2);
        }
        return {
            messageText: text,
            category: message.category,
            code: message.code,
            next: details
        };
    }
    ts.chainDiagnosticMessages = chainDiagnosticMessages;
    function concatenateDiagnosticMessageChains(headChain, tailChain) {
        Debug.assert(!headChain.next);
        headChain.next = tailChain;
        return headChain;
    }
    ts.concatenateDiagnosticMessageChains = concatenateDiagnosticMessageChains;
    function flattenDiagnosticChain(file, start, length, diagnosticChain, newLine) {
        Debug.assert(start >= 0, "start must be non-negative, is " + start);
        Debug.assert(length >= 0, "length must be non-negative, is " + length);
        var code = diagnosticChain.code;
        var category = diagnosticChain.category;
        var messageText = "";
        var indent = 0;
        while (diagnosticChain) {
            if (indent) {
                messageText += newLine;
                for (var i = 0; i < indent; i++) {
                    messageText += "  ";
                }
            }
            messageText += diagnosticChain.messageText;
            indent++;
            diagnosticChain = diagnosticChain.next;
        }
        return {
            file: file,
            start: start,
            length: length,
            code: code,
            category: category,
            messageText: messageText
        };
    }
    ts.flattenDiagnosticChain = flattenDiagnosticChain;
    function compareValues(a, b) {
        if (a === b)
            return 0 /* EqualTo */;
        if (a === undefined)
            return -1 /* LessThan */;
        if (b === undefined)
            return 1 /* GreaterThan */;
        return a < b ? -1 /* LessThan */ : 1 /* GreaterThan */;
    }
    ts.compareValues = compareValues;
    function getDiagnosticFilename(diagnostic) {
        return diagnostic.file ? diagnostic.file.filename : undefined;
    }
    function compareDiagnostics(d1, d2) {
        return compareValues(getDiagnosticFilename(d1), getDiagnosticFilename(d2)) || compareValues(d1.start, d2.start) || compareValues(d1.length, d2.length) || compareValues(d1.code, d2.code) || compareValues(d1.messageText, d2.messageText) || 0;
    }
    ts.compareDiagnostics = compareDiagnostics;
    function deduplicateSortedDiagnostics(diagnostics) {
        if (diagnostics.length < 2) {
            return diagnostics;
        }
        var newDiagnostics = [diagnostics[0]];
        var previousDiagnostic = diagnostics[0];
        for (var i = 1; i < diagnostics.length; i++) {
            var currentDiagnostic = diagnostics[i];
            var isDupe = compareDiagnostics(currentDiagnostic, previousDiagnostic) === 0 /* EqualTo */;
            if (!isDupe) {
                newDiagnostics.push(currentDiagnostic);
                previousDiagnostic = currentDiagnostic;
            }
        }
        return newDiagnostics;
    }
    ts.deduplicateSortedDiagnostics = deduplicateSortedDiagnostics;
    function normalizeSlashes(path) {
        return path.replace(/\\/g, "/");
    }
    ts.normalizeSlashes = normalizeSlashes;
    function getRootLength(path) {
        if (path.charCodeAt(0) === 47 /* slash */) {
            if (path.charCodeAt(1) !== 47 /* slash */)
                return 1;
            var p1 = path.indexOf("/", 2);
            if (p1 < 0)
                return 2;
            var p2 = path.indexOf("/", p1 + 1);
            if (p2 < 0)
                return p1 + 1;
            return p2 + 1;
        }
        if (path.charCodeAt(1) === 58 /* colon */) {
            if (path.charCodeAt(2) === 47 /* slash */)
                return 3;
            return 2;
        }
        return 0;
    }
    ts.getRootLength = getRootLength;
    ts.directorySeparator = "/";
    function getNormalizedParts(normalizedSlashedPath, rootLength) {
        var parts = normalizedSlashedPath.substr(rootLength).split(ts.directorySeparator);
        var normalized = [];
        for (var i = 0; i < parts.length; i++) {
            var part = parts[i];
            if (part !== ".") {
                if (part === ".." && normalized.length > 0 && normalized[normalized.length - 1] !== "..") {
                    normalized.pop();
                }
                else {
                    normalized.push(part);
                }
            }
        }
        return normalized;
    }
    function normalizePath(path) {
        var path = normalizeSlashes(path);
        var rootLength = getRootLength(path);
        var normalized = getNormalizedParts(path, rootLength);
        return path.substr(0, rootLength) + normalized.join(ts.directorySeparator);
    }
    ts.normalizePath = normalizePath;
    function getDirectoryPath(path) {
        return path.substr(0, Math.max(getRootLength(path), path.lastIndexOf(ts.directorySeparator)));
    }
    ts.getDirectoryPath = getDirectoryPath;
    function isUrl(path) {
        return path && !isRootedDiskPath(path) && path.indexOf("://") !== -1;
    }
    ts.isUrl = isUrl;
    function isRootedDiskPath(path) {
        return getRootLength(path) !== 0;
    }
    ts.isRootedDiskPath = isRootedDiskPath;
    function normalizedPathComponents(path, rootLength) {
        var normalizedParts = getNormalizedParts(path, rootLength);
        return [path.substr(0, rootLength)].concat(normalizedParts);
    }
    function getNormalizedPathComponents(path, currentDirectory) {
        var path = normalizeSlashes(path);
        var rootLength = getRootLength(path);
        if (rootLength == 0) {
            path = combinePaths(normalizeSlashes(currentDirectory), path);
            rootLength = getRootLength(path);
        }
        return normalizedPathComponents(path, rootLength);
    }
    ts.getNormalizedPathComponents = getNormalizedPathComponents;
    function getNormalizedAbsolutePath(filename, currentDirectory) {
        return getNormalizedPathFromPathComponents(getNormalizedPathComponents(filename, currentDirectory));
    }
    ts.getNormalizedAbsolutePath = getNormalizedAbsolutePath;
    function getNormalizedPathFromPathComponents(pathComponents) {
        if (pathComponents && pathComponents.length) {
            return pathComponents[0] + pathComponents.slice(1).join(ts.directorySeparator);
        }
    }
    ts.getNormalizedPathFromPathComponents = getNormalizedPathFromPathComponents;
    function getNormalizedPathComponentsOfUrl(url) {
        var urlLength = url.length;
        var rootLength = url.indexOf("://") + "://".length;
        while (rootLength < urlLength) {
            if (url.charCodeAt(rootLength) === 47 /* slash */) {
                rootLength++;
            }
            else {
                break;
            }
        }
        if (rootLength === urlLength) {
            return [url];
        }
        var indexOfNextSlash = url.indexOf(ts.directorySeparator, rootLength);
        if (indexOfNextSlash !== -1) {
            rootLength = indexOfNextSlash + 1;
            return normalizedPathComponents(url, rootLength);
        }
        else {
            return [url + ts.directorySeparator];
        }
    }
    function getNormalizedPathOrUrlComponents(pathOrUrl, currentDirectory) {
        if (isUrl(pathOrUrl)) {
            return getNormalizedPathComponentsOfUrl(pathOrUrl);
        }
        else {
            return getNormalizedPathComponents(pathOrUrl, currentDirectory);
        }
    }
    function getRelativePathToDirectoryOrUrl(directoryPathOrUrl, relativeOrAbsolutePath, currentDirectory, getCanonicalFileName, isAbsolutePathAnUrl) {
        var pathComponents = getNormalizedPathOrUrlComponents(relativeOrAbsolutePath, currentDirectory);
        var directoryComponents = getNormalizedPathOrUrlComponents(directoryPathOrUrl, currentDirectory);
        if (directoryComponents.length > 1 && directoryComponents[directoryComponents.length - 1] === "") {
            directoryComponents.length--;
        }
        for (var joinStartIndex = 0; joinStartIndex < pathComponents.length && joinStartIndex < directoryComponents.length; joinStartIndex++) {
            if (getCanonicalFileName(directoryComponents[joinStartIndex]) !== getCanonicalFileName(pathComponents[joinStartIndex])) {
                break;
            }
        }
        if (joinStartIndex) {
            var relativePath = "";
            var relativePathComponents = pathComponents.slice(joinStartIndex, pathComponents.length);
            for (; joinStartIndex < directoryComponents.length; joinStartIndex++) {
                if (directoryComponents[joinStartIndex] !== "") {
                    relativePath = relativePath + ".." + ts.directorySeparator;
                }
            }
            return relativePath + relativePathComponents.join(ts.directorySeparator);
        }
        var absolutePath = getNormalizedPathFromPathComponents(pathComponents);
        if (isAbsolutePathAnUrl && isRootedDiskPath(absolutePath)) {
            absolutePath = "file:///" + absolutePath;
        }
        return absolutePath;
    }
    ts.getRelativePathToDirectoryOrUrl = getRelativePathToDirectoryOrUrl;
    function getBaseFilename(path) {
        var i = path.lastIndexOf(ts.directorySeparator);
        return i < 0 ? path : path.substring(i + 1);
    }
    ts.getBaseFilename = getBaseFilename;
    function combinePaths(path1, path2) {
        if (!(path1 && path1.length))
            return path2;
        if (!(path2 && path2.length))
            return path1;
        if (getRootLength(path2) !== 0)
            return path2;
        if (path1.charAt(path1.length - 1) === ts.directorySeparator)
            return path1 + path2;
        return path1 + ts.directorySeparator + path2;
    }
    ts.combinePaths = combinePaths;
    function fileExtensionIs(path, extension) {
        var pathLen = path.length;
        var extLen = extension.length;
        return pathLen > extLen && path.substr(pathLen - extLen, extLen) === extension;
    }
    ts.fileExtensionIs = fileExtensionIs;
    var supportedExtensions = [".d.ts", ".ts", ".js"];
    function removeFileExtension(path) {
        for (var i = 0; i < supportedExtensions.length; i++) {
            var ext = supportedExtensions[i];
            if (fileExtensionIs(path, ext)) {
                return path.substr(0, path.length - ext.length);
            }
        }
        return path;
    }
    ts.removeFileExtension = removeFileExtension;
    var backslashOrDoubleQuote = /[\"\\]/g;
    var escapedCharsRegExp = /[\0-\19\t\v\f\b\0\r\n\u2028\u2029\u0085]/g;
    var escapedCharsMap = {
        "\0": "\\0",
        "\t": "\\t",
        "\v": "\\v",
        "\f": "\\f",
        "\b": "\\b",
        "\r": "\\r",
        "\n": "\\n",
        "\\": "\\\\",
        "\"": "\\\"",
        "\u2028": "\\u2028",
        "\u2029": "\\u2029",
        "\u0085": "\\u0085"
    };
    function escapeString(s) {
        s = backslashOrDoubleQuote.test(s) ? s.replace(backslashOrDoubleQuote, getReplacement) : s;
        s = escapedCharsRegExp.test(s) ? s.replace(escapedCharsRegExp, getReplacement) : s;
        return s;
        function getReplacement(c) {
            return escapedCharsMap[c] || unicodeEscape(c);
        }
        function unicodeEscape(c) {
            var hexCharCode = c.charCodeAt(0).toString(16);
            var paddedHexCode = ("0000" + hexCharCode).slice(-4);
            return "\\u" + paddedHexCode;
        }
    }
    ts.escapeString = escapeString;
    function Symbol(flags, name) {
        this.flags = flags;
        this.name = name;
        this.declarations = undefined;
    }
    function Type(checker, flags) {
        this.flags = flags;
    }
    function Signature(checker) {
    }
    ts.objectAllocator = {
        getNodeConstructor: function (kind) {
            function Node() {
            }
            Node.prototype = {
                kind: kind,
                pos: 0,
                end: 0,
                flags: 0,
                parent: undefined
            };
            return Node;
        },
        getSymbolConstructor: function () { return Symbol; },
        getTypeConstructor: function () { return Type; },
        getSignatureConstructor: function () { return Signature; }
    };
    (function (AssertionLevel) {
        AssertionLevel[AssertionLevel["None"] = 0] = "None";
        AssertionLevel[AssertionLevel["Normal"] = 1] = "Normal";
        AssertionLevel[AssertionLevel["Aggressive"] = 2] = "Aggressive";
        AssertionLevel[AssertionLevel["VeryAggressive"] = 3] = "VeryAggressive";
    })(ts.AssertionLevel || (ts.AssertionLevel = {}));
    var AssertionLevel = ts.AssertionLevel;
    var Debug;
    (function (Debug) {
        var currentAssertionLevel = 0 /* None */;
        function shouldAssert(level) {
            return currentAssertionLevel >= level;
        }
        Debug.shouldAssert = shouldAssert;
        function assert(expression, message, verboseDebugInfo) {
            if (!expression) {
                var verboseDebugString = "";
                if (verboseDebugInfo) {
                    verboseDebugString = "\r\nVerbose Debug Information: " + verboseDebugInfo();
                }
                throw new Error("Debug Failure. False expression: " + (message || "") + verboseDebugString);
            }
        }
        Debug.assert = assert;
        function fail(message) {
            Debug.assert(false, message);
        }
        Debug.fail = fail;
    })(Debug = ts.Debug || (ts.Debug = {}));
})(ts || (ts = {}));
var ts;
(function (ts) {
    ts.sys = (function () {
        function getWScriptSystem() {
            var fso = new ActiveXObject("Scripting.FileSystemObject");
            var fileStream = new ActiveXObject("ADODB.Stream");
            fileStream.Type = 2;
            var binaryStream = new ActiveXObject("ADODB.Stream");
            binaryStream.Type = 1;
            var args = [];
            for (var i = 0; i < WScript.Arguments.length; i++) {
                args[i] = WScript.Arguments.Item(i);
            }
            function readFile(fileName, encoding) {
                if (!fso.FileExists(fileName)) {
                    return undefined;
                }
                fileStream.Open();
                try {
                    if (encoding) {
                        fileStream.Charset = encoding;
                        fileStream.LoadFromFile(fileName);
                    }
                    else {
                        fileStream.Charset = "x-ansi";
                        fileStream.LoadFromFile(fileName);
                        var bom = fileStream.ReadText(2) || "";
                        fileStream.Position = 0;
                        fileStream.Charset = bom.length >= 2 && (bom.charCodeAt(0) === 0xFF && bom.charCodeAt(1) === 0xFE || bom.charCodeAt(0) === 0xFE && bom.charCodeAt(1) === 0xFF) ? "unicode" : "utf-8";
                    }
                    return fileStream.ReadText();
                }
                catch (e) {
                    throw e;
                }
                finally {
                    fileStream.Close();
                }
            }
            function writeFile(fileName, data, writeByteOrderMark) {
                fileStream.Open();
                binaryStream.Open();
                try {
                    fileStream.Charset = "utf-8";
                    fileStream.WriteText(data);
                    if (writeByteOrderMark) {
                        fileStream.Position = 0;
                    }
                    else {
                        fileStream.Position = 3;
                    }
                    fileStream.CopyTo(binaryStream);
                    binaryStream.SaveToFile(fileName, 2);
                }
                finally {
                    binaryStream.Close();
                    fileStream.Close();
                }
            }
            function getNames(collection) {
                var result = [];
                for (var e = new Enumerator(collection); !e.atEnd(); e.moveNext()) {
                    result.push(e.item().Name);
                }
                return result.sort();
            }
            function readDirectory(path, extension) {
                var result = [];
                visitDirectory(path);
                return result;
                function visitDirectory(path) {
                    var folder = fso.GetFolder(path || ".");
                    var files = getNames(folder.files);
                    for (var i = 0; i < files.length; i++) {
                        var name = files[i];
                        if (!extension || ts.fileExtensionIs(name, extension)) {
                            result.push(ts.combinePaths(path, name));
                        }
                    }
                    var subfolders = getNames(folder.subfolders);
                    for (var i = 0; i < subfolders.length; i++) {
                        visitDirectory(ts.combinePaths(path, subfolders[i]));
                    }
                }
            }
            return {
                args: args,
                newLine: "\r\n",
                useCaseSensitiveFileNames: false,
                write: function (s) {
                    WScript.StdOut.Write(s);
                },
                readFile: readFile,
                writeFile: writeFile,
                resolvePath: function (path) {
                    return fso.GetAbsolutePathName(path);
                },
                fileExists: function (path) {
                    return fso.FileExists(path);
                },
                directoryExists: function (path) {
                    return fso.FolderExists(path);
                },
                createDirectory: function (directoryName) {
                    if (!this.directoryExists(directoryName)) {
                        fso.CreateFolder(directoryName);
                    }
                },
                getExecutingFilePath: function () {
                    return WScript.ScriptFullName;
                },
                getCurrentDirectory: function () {
                    return new ActiveXObject("WScript.Shell").CurrentDirectory;
                },
                readDirectory: readDirectory,
                exit: function (exitCode) {
                    try {
                        WScript.Quit(exitCode);
                    }
                    catch (e) {
                    }
                }
            };
        }
        function getNodeSystem() {
            var _fs = require("fs");
            var _path = require("path");
            var _os = require('os');
            var platform = _os.platform();
            var useCaseSensitiveFileNames = platform !== "win32" && platform !== "win64" && platform !== "darwin";
            function readFile(fileName, encoding) {
                if (!_fs.existsSync(fileName)) {
                    return undefined;
                }
                var buffer = _fs.readFileSync(fileName);
                var len = buffer.length;
                if (len >= 2 && buffer[0] === 0xFE && buffer[1] === 0xFF) {
                    len &= ~1;
                    for (var i = 0; i < len; i += 2) {
                        var temp = buffer[i];
                        buffer[i] = buffer[i + 1];
                        buffer[i + 1] = temp;
                    }
                    return buffer.toString("utf16le", 2);
                }
                if (len >= 2 && buffer[0] === 0xFF && buffer[1] === 0xFE) {
                    return buffer.toString("utf16le", 2);
                }
                if (len >= 3 && buffer[0] === 0xEF && buffer[1] === 0xBB && buffer[2] === 0xBF) {
                    return buffer.toString("utf8", 3);
                }
                return buffer.toString("utf8");
            }
            function writeFile(fileName, data, writeByteOrderMark) {
                if (writeByteOrderMark) {
                    data = '\uFEFF' + data;
                }
                _fs.writeFileSync(fileName, data, "utf8");
            }
            function readDirectory(path, extension) {
                var result = [];
                visitDirectory(path);
                return result;
                function visitDirectory(path) {
                    var files = _fs.readdirSync(path || ".").sort();
                    var directories = [];
                    for (var i = 0; i < files.length; i++) {
                        var name = ts.combinePaths(path, files[i]);
                        var stat = _fs.lstatSync(name);
                        if (stat.isFile()) {
                            if (!extension || ts.fileExtensionIs(name, extension)) {
                                result.push(name);
                            }
                        }
                        else if (stat.isDirectory()) {
                            directories.push(name);
                        }
                    }
                    for (var i = 0; i < directories.length; i++) {
                        visitDirectory(directories[i]);
                    }
                }
            }
            return {
                args: process.argv.slice(2),
                newLine: _os.EOL,
                useCaseSensitiveFileNames: useCaseSensitiveFileNames,
                write: function (s) {
                    _fs.writeSync(1, s);
                },
                readFile: readFile,
                writeFile: writeFile,
                watchFile: function (fileName, callback) {
                    _fs.watchFile(fileName, { persistent: true, interval: 250 }, fileChanged);
                    return {
                        close: function () {
                            _fs.unwatchFile(fileName, fileChanged);
                        }
                    };
                    function fileChanged(curr, prev) {
                        if (+curr.mtime <= +prev.mtime) {
                            return;
                        }
                        callback(fileName);
                    }
                    ;
                },
                resolvePath: function (path) {
                    return _path.resolve(path);
                },
                fileExists: function (path) {
                    return _fs.existsSync(path);
                },
                directoryExists: function (path) {
                    return _fs.existsSync(path) && _fs.statSync(path).isDirectory();
                },
                createDirectory: function (directoryName) {
                    if (!this.directoryExists(directoryName)) {
                        _fs.mkdirSync(directoryName);
                    }
                },
                getExecutingFilePath: function () {
                    return __filename;
                },
                getCurrentDirectory: function () {
                    return process.cwd();
                },
                readDirectory: readDirectory,
                getMemoryUsage: function () {
                    if (global.gc) {
                        global.gc();
                    }
                    return process.memoryUsage().heapUsed;
                },
                exit: function (exitCode) {
                    process.exit(exitCode);
                }
            };
        }
        if (typeof WScript !== "undefined" && typeof ActiveXObject === "function") {
            return getWScriptSystem();
        }
        else if (typeof module !== "undefined" && module.exports) {
            return getNodeSystem();
        }
        else {
            return undefined;
        }
    })();
})(ts || (ts = {}));
var ts;
(function (ts) {
    var syntax;
    var lastWriteSucceeded;
    var parts = [];
    var indentDepth = 0;
    var newlineRequested = false;
    var indentingSuspendedDepth = 0;
    var indentLevels = ["", "    "];
    function main() {
        if (ts.sys.args.length < 1) {
            ts.sys.write("Usage:" + ts.sys.newLine);
            ts.sys.write("\tnode processSyntax.js <syntax-json-input-file>" + ts.sys.newLine);
            return;
        }
        var inputFilePath = ts.sys.args[0].replace(/\\/g, "/");
        var inputStr = ts.sys.readFile(inputFilePath);
        syntax = JSON.parse(inputStr);
        normalizeSyntaxNodes();
        writeFile();
        var output = parts.join("");
        var inputDirectory = inputFilePath.substr(0, inputFilePath.lastIndexOf("/"));
        var outputPath = inputDirectory + "/factory.generated.ts";
        ts.sys.writeFile(outputPath, output);
    }
    function normalizeSyntaxNodes() {
        for (var i = 0; i < syntax.length; i++) {
            var nodeType = syntax[i];
            var kind = nodeType.kind;
            var type = nodeType.type;
            var baseType = nodeType.baseType;
            var types = nodeType.types;
            var name = nodeType.name;
            if (kind) {
                nodeType.kind = kind.replace(/\s+/g, "");
            }
            if (type) {
                nodeType.type = normalizeType(type);
            }
            else {
                nodeType.type = normalizeType(nodeType.types || nodeType.baseType);
            }
            if (types) {
                nodeType.types = normalizeType(types);
            }
            if (baseType) {
                nodeType.baseType = normalizeType(baseType);
            }
            if (name) {
                nodeType.name = formatName(nodeType.name);
            }
            else {
                nodeType.name = formatName(nodeType.kind || nodeType.type);
            }
            var children = nodeType.children;
            if (children) {
                for (var j = 0; j < children.length; j++) {
                    var member = children[j];
                    member.type = normalizeType(member.type);
                    member.name = formatName(member.name);
                    if (!member.paramName) {
                        member.paramName = member.name;
                    }
                    else {
                        member.paramName = formatName(member.paramName);
                    }
                }
            }
        }
    }
    function writeFile() {
        writeln("// <auto-generated />");
        writeln("/// <reference path=\"parser.ts\"/>");
        writeln("/// <reference path=\"factory.ts\"/>");
        writeln();
        writeln("module ts {");
        indent();
        writeFactoryModule();
        writeVisitorModule();
        dedent();
        writeln("}");
        dedent();
    }
    function writeFactoryModule() {
        writeln("export module Factory {");
        indent();
        lastWriteSucceeded = false;
        for (var i = 0; i < syntax.length; i++) {
            var nodeType = syntax[i];
            writeCreateFunctionForNode(nodeType);
            writeUpdateFunctionForNode(nodeType);
        }
        dedent();
        writeln("}");
        writeln();
    }
    function writeCreateFunctionForNode(syntaxNode) {
        if (!canCreate(syntaxNode)) {
            return;
        }
        if (lastWriteSucceeded) {
            writeln();
        }
        var kind = syntaxNode.kind;
        var type = syntaxNode.type || syntaxNode.baseType;
        var name = syntaxNode.name || kind || type;
        var modifiers;
        var children = syntaxNode.children;
        write("export function create" + syntaxNode.name + "(");
        if (children) {
            for (var i = 0; i < children.length; i++) {
                var member = children[i];
                write(member.paramName);
                if (member.optional) {
                    write("?");
                }
                write(": " + member.type);
                if (member.isModifiersArray) {
                    modifiers = member.paramName;
                }
                if (member.isNodeArray || member.isModifiersArray) {
                    write("[]");
                }
                write(", ");
            }
        }
        write("location?: TextRange, flags?: NodeFlags");
        writeln("): " + syntaxNode.type + " {");
        indent();
        writeln("var node = beginNode<" + syntaxNode.type + ">(SyntaxKind." + syntaxNode.kind + ");");
        if (children) {
            for (var i = 0; i < children.length; i++) {
                var member = children[i];
                var paramName = member.paramName || member.name;
                write("node." + member.name + " = ");
                if (member.converter) {
                    write(member.converter + "(");
                }
                else if (member.isNodeArray) {
                    write("createNodeArray(");
                }
                else if (member.isModifiersArray) {
                    write("<ModifiersArray>");
                }
                write(paramName);
                if (member.converter || member.isNodeArray) {
                    write(")");
                }
                writeln(";");
            }
        }
        write("return finishNode(node, location, flags");
        if (modifiers) {
            write(", " + modifiers);
        }
        writeln(");");
        dedent();
        writeln("}");
        lastWriteSucceeded = true;
    }
    function writeUpdateFunctionForNode(syntaxNode) {
        if (!canUpdate(syntaxNode)) {
            return;
        }
        if (lastWriteSucceeded) {
            writeln();
        }
        write("export function update" + syntaxNode.name + "(node: " + syntaxNode.type);
        var children = syntaxNode.children;
        for (var i = 0; i < children.length; i++) {
            var member = children[i];
            if (member.readonly) {
                continue;
            }
            write(", ");
            write(member.paramName || member.name);
            write(": " + member.type);
            if (member.isNodeArray || member.isModifiersArray) {
                write("[]");
            }
        }
        writeln("): " + syntaxNode.type + " {");
        indent();
        write("if (");
        lastWriteSucceeded = false;
        for (var i = 0; i < children.length; i++) {
            var member = children[i];
            if (member.readonly) {
                continue;
            }
            if (lastWriteSucceeded) {
                write(" || ");
            }
            var paramName = member.paramName || member.name;
            write("node." + member.name + " !== " + member.paramName);
            lastWriteSucceeded = true;
        }
        writeln(") {");
        indent();
        write("return create" + syntaxNode.name + "(");
        for (var i = 0; i < children.length; i++) {
            var member = children[i];
            if (member.readonly) {
                write("node." + member.name);
            }
            else {
                var paramName = member.paramName || member.name;
                write(paramName);
            }
            write(", ");
        }
        writeln("node, node.flags);");
        dedent();
        writeln("}");
        writeln("return node;");
        dedent();
        writeln("}");
        lastWriteSucceeded = true;
    }
    function writeVisitorModule() {
        writeln("export module Visitor {");
        indent();
        writeFallbackFunction();
        writeAcceptFunction();
        dedent();
        writeln("}");
    }
    function writeFallbackFunction() {
        writeln("export function fallback<TNode extends Node>(node: TNode, cbNode: Visitor, state?: any): TNode {");
        indent();
        writeln("if (!cbNode || !node) {");
        indent();
        writeln("return node;");
        dedent();
        writeln("}");
        writeln("return <TNode>accept(node, cbNode, state);");
        dedent();
        writeln("}");
        writeln();
    }
    function writeAcceptFunction() {
        writeln("function accept(node: Node, cbNode: Visitor, state?: any): Node {");
        indent();
        writeln("switch (node.kind) {");
        indent();
        var returnNodeIsPending = false;
        for (var i = 0; i < syntax.length; i++) {
            var syntaxNode = syntax[i];
            if (!canCreate(syntaxNode)) {
                continue;
            }
            var hasUpdate = canUpdate(syntaxNode);
            if (!hasUpdate) {
                returnNodeIsPending = true;
            }
            else if (returnNodeIsPending) {
                returnNodeIsPending = false;
                indent();
                writeln("return node;");
                dedent();
            }
            writeln("case SyntaxKind." + syntaxNode.kind + ":");
            if (hasUpdate) {
                indent();
                writeUpdateNode(syntaxNode);
                dedent();
            }
        }
        if (returnNodeIsPending) {
            indent();
            writeln("return node;");
            dedent();
        }
        writeln("default:");
        indent();
        writeln("return node;");
        dedent();
        dedent();
        writeln("}");
        dedent();
        writeln("}");
    }
    function writeUpdateNode(syntaxNode) {
        writeln("return Factory.update" + syntaxNode.name + "(");
        indent();
        write("<" + syntaxNode.type + ">node");
        var children = syntaxNode.children;
        if (children) {
            for (var i = 0; i < children.length; i++) {
                var member = children[i];
                if (member.readonly) {
                    continue;
                }
                writeln(",");
                writeVisitMember(syntaxNode, member);
            }
        }
        writeln(");");
        dedent();
    }
    function writeVisitMember(syntaxNode, member) {
        if (member.isNodeArray) {
            write("visitNodes<" + member.type + ">(");
        }
        else {
            write("visit<" + member.type + ">(");
        }
        write("(<" + syntaxNode.type + ">node)." + member.name);
        write(", cbNode, state)");
    }
    function normalizeType(type) {
        if (type) {
            type = type.replace(/\s+/g, "");
            if (isUnionType(type)) {
                var types = splitUnionType(type);
                types.sort();
                type = types.join("|");
            }
        }
        return formatType(type);
    }
    function isUnionType(type) {
        return type && type.indexOf('|') !== -1;
    }
    function splitUnionType(type) {
        if (!type) {
            return [];
        }
        return type.split(/\|/g).sort();
    }
    function formatName(type) {
        if (!type) {
            return;
        }
        return type.replace(/\s*\|\s*/g, "Or");
    }
    function formatType(type) {
        if (!type) {
            return;
        }
        return type.replace(/\s*\|\s*/g, " | ");
    }
    function canCreate(syntaxNode) {
        return syntaxNode && !!syntaxNode.kind;
    }
    function canUpdate(syntaxNode) {
        if (canCreate(syntaxNode)) {
            var children = syntaxNode.children;
            if (children) {
                for (var i = 0; i < children.length; i++) {
                    var member = children[i];
                    if (!member.readonly) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    function hasProperty(map, key) {
        if (map) {
            return Object.prototype.hasOwnProperty.call(map, key);
        }
    }
    function getProperty(map, key) {
        if (map && hasProperty(map, key)) {
            return map[key];
        }
    }
    function write(text) {
        if (text) {
            var lines = text.split(/\r\n|\r|\n/g);
            for (var i = 0; i < lines.length; i++) {
                var line = lines[i];
                if (i > 0) {
                    newlineRequested = true;
                }
                tryWriteNewline();
                parts.push(line);
            }
        }
    }
    function writeln(text) {
        if (text) {
            write(text);
        }
        else if (newlineRequested) {
            writeNewline();
        }
        newlineRequested = true;
    }
    function indent() {
        indentDepth++;
    }
    function dedent() {
        indentDepth = Math.max(0, indentDepth - 1);
    }
    function suspendIndenting() {
        indentingSuspendedDepth++;
    }
    function resumeIndenting() {
        indentingSuspendedDepth = Math.max(0, indentingSuspendedDepth - 1);
    }
    function tryWriteIndent() {
        if (indentingSuspendedDepth || !indentDepth) {
            return;
        }
        var indent = getIndent(indentDepth);
        parts.push(indent);
    }
    function tryWriteNewline() {
        if (!newlineRequested) {
            return;
        }
        newlineRequested = false;
        writeNewline();
        tryWriteIndent();
    }
    function writeNewline() {
        parts.push(ts.sys.newLine);
    }
    function getIndent(level) {
        if (level in indentLevels) {
            return indentLevels[level];
        }
        var indent = getIndent(level - 1) + indentLevels[1];
        indentLevels[level] = indent;
        return indent;
    }
    main();
})(ts || (ts = {}));
//# sourceMappingURL=file:///C:/dev/TypeScript/scripts/processFactory.js.map