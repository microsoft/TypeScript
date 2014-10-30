// If you change anything in this enum, make sure you run SyntaxGenerator again!
var TypeScript;
(function (TypeScript) {
    (function (SyntaxKind) {
        // Variable width tokens, trivia and lists.
        SyntaxKind[SyntaxKind["None"] = 0] = "None";
        SyntaxKind[SyntaxKind["List"] = 1] = "List";
        SyntaxKind[SyntaxKind["SeparatedList"] = 2] = "SeparatedList";
        SyntaxKind[SyntaxKind["TriviaList"] = 3] = "TriviaList";
        // Trivia
        SyntaxKind[SyntaxKind["WhitespaceTrivia"] = 4] = "WhitespaceTrivia";
        SyntaxKind[SyntaxKind["NewLineTrivia"] = 5] = "NewLineTrivia";
        SyntaxKind[SyntaxKind["MultiLineCommentTrivia"] = 6] = "MultiLineCommentTrivia";
        SyntaxKind[SyntaxKind["SingleLineCommentTrivia"] = 7] = "SingleLineCommentTrivia";
        SyntaxKind[SyntaxKind["SkippedTokenTrivia"] = 8] = "SkippedTokenTrivia";
        // Note: all variable width tokens must come before all fixed width tokens.
        SyntaxKind[SyntaxKind["ErrorToken"] = 9] = "ErrorToken";
        SyntaxKind[SyntaxKind["EndOfFileToken"] = 10] = "EndOfFileToken";
        // Tokens
        SyntaxKind[SyntaxKind["IdentifierName"] = 11] = "IdentifierName";
        // LiteralTokens
        SyntaxKind[SyntaxKind["RegularExpressionLiteral"] = 12] = "RegularExpressionLiteral";
        SyntaxKind[SyntaxKind["NumericLiteral"] = 13] = "NumericLiteral";
        SyntaxKind[SyntaxKind["StringLiteral"] = 14] = "StringLiteral";
        // All fixed width tokens follow.
        // Keywords
        SyntaxKind[SyntaxKind["BreakKeyword"] = 15] = "BreakKeyword";
        SyntaxKind[SyntaxKind["CaseKeyword"] = 16] = "CaseKeyword";
        SyntaxKind[SyntaxKind["CatchKeyword"] = 17] = "CatchKeyword";
        SyntaxKind[SyntaxKind["ContinueKeyword"] = 18] = "ContinueKeyword";
        SyntaxKind[SyntaxKind["DebuggerKeyword"] = 19] = "DebuggerKeyword";
        SyntaxKind[SyntaxKind["DefaultKeyword"] = 20] = "DefaultKeyword";
        SyntaxKind[SyntaxKind["DeleteKeyword"] = 21] = "DeleteKeyword";
        SyntaxKind[SyntaxKind["DoKeyword"] = 22] = "DoKeyword";
        SyntaxKind[SyntaxKind["ElseKeyword"] = 23] = "ElseKeyword";
        SyntaxKind[SyntaxKind["FalseKeyword"] = 24] = "FalseKeyword";
        SyntaxKind[SyntaxKind["FinallyKeyword"] = 25] = "FinallyKeyword";
        SyntaxKind[SyntaxKind["ForKeyword"] = 26] = "ForKeyword";
        SyntaxKind[SyntaxKind["FunctionKeyword"] = 27] = "FunctionKeyword";
        SyntaxKind[SyntaxKind["IfKeyword"] = 28] = "IfKeyword";
        SyntaxKind[SyntaxKind["InKeyword"] = 29] = "InKeyword";
        SyntaxKind[SyntaxKind["InstanceOfKeyword"] = 30] = "InstanceOfKeyword";
        SyntaxKind[SyntaxKind["NewKeyword"] = 31] = "NewKeyword";
        SyntaxKind[SyntaxKind["NullKeyword"] = 32] = "NullKeyword";
        SyntaxKind[SyntaxKind["ReturnKeyword"] = 33] = "ReturnKeyword";
        SyntaxKind[SyntaxKind["SwitchKeyword"] = 34] = "SwitchKeyword";
        SyntaxKind[SyntaxKind["ThisKeyword"] = 35] = "ThisKeyword";
        SyntaxKind[SyntaxKind["ThrowKeyword"] = 36] = "ThrowKeyword";
        SyntaxKind[SyntaxKind["TrueKeyword"] = 37] = "TrueKeyword";
        SyntaxKind[SyntaxKind["TryKeyword"] = 38] = "TryKeyword";
        SyntaxKind[SyntaxKind["TypeOfKeyword"] = 39] = "TypeOfKeyword";
        SyntaxKind[SyntaxKind["VarKeyword"] = 40] = "VarKeyword";
        SyntaxKind[SyntaxKind["VoidKeyword"] = 41] = "VoidKeyword";
        SyntaxKind[SyntaxKind["WhileKeyword"] = 42] = "WhileKeyword";
        SyntaxKind[SyntaxKind["WithKeyword"] = 43] = "WithKeyword";
        // FutureReservedWords.
        SyntaxKind[SyntaxKind["ClassKeyword"] = 44] = "ClassKeyword";
        SyntaxKind[SyntaxKind["ConstKeyword"] = 45] = "ConstKeyword";
        SyntaxKind[SyntaxKind["EnumKeyword"] = 46] = "EnumKeyword";
        SyntaxKind[SyntaxKind["ExportKeyword"] = 47] = "ExportKeyword";
        SyntaxKind[SyntaxKind["ExtendsKeyword"] = 48] = "ExtendsKeyword";
        SyntaxKind[SyntaxKind["ImportKeyword"] = 49] = "ImportKeyword";
        SyntaxKind[SyntaxKind["SuperKeyword"] = 50] = "SuperKeyword";
        // FutureReservedStrictWords.
        SyntaxKind[SyntaxKind["ImplementsKeyword"] = 51] = "ImplementsKeyword";
        SyntaxKind[SyntaxKind["InterfaceKeyword"] = 52] = "InterfaceKeyword";
        SyntaxKind[SyntaxKind["LetKeyword"] = 53] = "LetKeyword";
        SyntaxKind[SyntaxKind["PackageKeyword"] = 54] = "PackageKeyword";
        SyntaxKind[SyntaxKind["PrivateKeyword"] = 55] = "PrivateKeyword";
        SyntaxKind[SyntaxKind["ProtectedKeyword"] = 56] = "ProtectedKeyword";
        SyntaxKind[SyntaxKind["PublicKeyword"] = 57] = "PublicKeyword";
        SyntaxKind[SyntaxKind["StaticKeyword"] = 58] = "StaticKeyword";
        SyntaxKind[SyntaxKind["YieldKeyword"] = 59] = "YieldKeyword";
        // TypeScript keywords.
        SyntaxKind[SyntaxKind["AnyKeyword"] = 60] = "AnyKeyword";
        SyntaxKind[SyntaxKind["BooleanKeyword"] = 61] = "BooleanKeyword";
        SyntaxKind[SyntaxKind["ConstructorKeyword"] = 62] = "ConstructorKeyword";
        SyntaxKind[SyntaxKind["DeclareKeyword"] = 63] = "DeclareKeyword";
        SyntaxKind[SyntaxKind["GetKeyword"] = 64] = "GetKeyword";
        SyntaxKind[SyntaxKind["ModuleKeyword"] = 65] = "ModuleKeyword";
        SyntaxKind[SyntaxKind["RequireKeyword"] = 66] = "RequireKeyword";
        SyntaxKind[SyntaxKind["NumberKeyword"] = 67] = "NumberKeyword";
        SyntaxKind[SyntaxKind["SetKeyword"] = 68] = "SetKeyword";
        SyntaxKind[SyntaxKind["StringKeyword"] = 69] = "StringKeyword";
        // Punctuators
        SyntaxKind[SyntaxKind["OpenBraceToken"] = 70] = "OpenBraceToken";
        SyntaxKind[SyntaxKind["CloseBraceToken"] = 71] = "CloseBraceToken";
        SyntaxKind[SyntaxKind["OpenParenToken"] = 72] = "OpenParenToken";
        SyntaxKind[SyntaxKind["CloseParenToken"] = 73] = "CloseParenToken";
        SyntaxKind[SyntaxKind["OpenBracketToken"] = 74] = "OpenBracketToken";
        SyntaxKind[SyntaxKind["CloseBracketToken"] = 75] = "CloseBracketToken";
        SyntaxKind[SyntaxKind["DotToken"] = 76] = "DotToken";
        SyntaxKind[SyntaxKind["DotDotDotToken"] = 77] = "DotDotDotToken";
        SyntaxKind[SyntaxKind["SemicolonToken"] = 78] = "SemicolonToken";
        SyntaxKind[SyntaxKind["CommaToken"] = 79] = "CommaToken";
        SyntaxKind[SyntaxKind["LessThanToken"] = 80] = "LessThanToken";
        SyntaxKind[SyntaxKind["GreaterThanToken"] = 81] = "GreaterThanToken";
        SyntaxKind[SyntaxKind["LessThanEqualsToken"] = 82] = "LessThanEqualsToken";
        SyntaxKind[SyntaxKind["GreaterThanEqualsToken"] = 83] = "GreaterThanEqualsToken";
        SyntaxKind[SyntaxKind["EqualsEqualsToken"] = 84] = "EqualsEqualsToken";
        SyntaxKind[SyntaxKind["EqualsGreaterThanToken"] = 85] = "EqualsGreaterThanToken";
        SyntaxKind[SyntaxKind["ExclamationEqualsToken"] = 86] = "ExclamationEqualsToken";
        SyntaxKind[SyntaxKind["EqualsEqualsEqualsToken"] = 87] = "EqualsEqualsEqualsToken";
        SyntaxKind[SyntaxKind["ExclamationEqualsEqualsToken"] = 88] = "ExclamationEqualsEqualsToken";
        SyntaxKind[SyntaxKind["PlusToken"] = 89] = "PlusToken";
        SyntaxKind[SyntaxKind["MinusToken"] = 90] = "MinusToken";
        SyntaxKind[SyntaxKind["AsteriskToken"] = 91] = "AsteriskToken";
        SyntaxKind[SyntaxKind["PercentToken"] = 92] = "PercentToken";
        SyntaxKind[SyntaxKind["PlusPlusToken"] = 93] = "PlusPlusToken";
        SyntaxKind[SyntaxKind["MinusMinusToken"] = 94] = "MinusMinusToken";
        SyntaxKind[SyntaxKind["LessThanLessThanToken"] = 95] = "LessThanLessThanToken";
        SyntaxKind[SyntaxKind["GreaterThanGreaterThanToken"] = 96] = "GreaterThanGreaterThanToken";
        SyntaxKind[SyntaxKind["GreaterThanGreaterThanGreaterThanToken"] = 97] = "GreaterThanGreaterThanGreaterThanToken";
        SyntaxKind[SyntaxKind["AmpersandToken"] = 98] = "AmpersandToken";
        SyntaxKind[SyntaxKind["BarToken"] = 99] = "BarToken";
        SyntaxKind[SyntaxKind["CaretToken"] = 100] = "CaretToken";
        SyntaxKind[SyntaxKind["ExclamationToken"] = 101] = "ExclamationToken";
        SyntaxKind[SyntaxKind["TildeToken"] = 102] = "TildeToken";
        SyntaxKind[SyntaxKind["AmpersandAmpersandToken"] = 103] = "AmpersandAmpersandToken";
        SyntaxKind[SyntaxKind["BarBarToken"] = 104] = "BarBarToken";
        SyntaxKind[SyntaxKind["QuestionToken"] = 105] = "QuestionToken";
        SyntaxKind[SyntaxKind["ColonToken"] = 106] = "ColonToken";
        SyntaxKind[SyntaxKind["EqualsToken"] = 107] = "EqualsToken";
        SyntaxKind[SyntaxKind["PlusEqualsToken"] = 108] = "PlusEqualsToken";
        SyntaxKind[SyntaxKind["MinusEqualsToken"] = 109] = "MinusEqualsToken";
        SyntaxKind[SyntaxKind["AsteriskEqualsToken"] = 110] = "AsteriskEqualsToken";
        SyntaxKind[SyntaxKind["PercentEqualsToken"] = 111] = "PercentEqualsToken";
        SyntaxKind[SyntaxKind["LessThanLessThanEqualsToken"] = 112] = "LessThanLessThanEqualsToken";
        SyntaxKind[SyntaxKind["GreaterThanGreaterThanEqualsToken"] = 113] = "GreaterThanGreaterThanEqualsToken";
        SyntaxKind[SyntaxKind["GreaterThanGreaterThanGreaterThanEqualsToken"] = 114] = "GreaterThanGreaterThanGreaterThanEqualsToken";
        SyntaxKind[SyntaxKind["AmpersandEqualsToken"] = 115] = "AmpersandEqualsToken";
        SyntaxKind[SyntaxKind["BarEqualsToken"] = 116] = "BarEqualsToken";
        SyntaxKind[SyntaxKind["CaretEqualsToken"] = 117] = "CaretEqualsToken";
        SyntaxKind[SyntaxKind["SlashToken"] = 118] = "SlashToken";
        SyntaxKind[SyntaxKind["SlashEqualsToken"] = 119] = "SlashEqualsToken";
        // SyntaxNodes
        SyntaxKind[SyntaxKind["SourceUnit"] = 120] = "SourceUnit";
        // Names
        SyntaxKind[SyntaxKind["QualifiedName"] = 121] = "QualifiedName";
        // Types
        SyntaxKind[SyntaxKind["ObjectType"] = 122] = "ObjectType";
        SyntaxKind[SyntaxKind["FunctionType"] = 123] = "FunctionType";
        SyntaxKind[SyntaxKind["ArrayType"] = 124] = "ArrayType";
        SyntaxKind[SyntaxKind["ConstructorType"] = 125] = "ConstructorType";
        SyntaxKind[SyntaxKind["GenericType"] = 126] = "GenericType";
        SyntaxKind[SyntaxKind["TypeQuery"] = 127] = "TypeQuery";
        SyntaxKind[SyntaxKind["TupleType"] = 128] = "TupleType";
        // Module elements.
        SyntaxKind[SyntaxKind["InterfaceDeclaration"] = 129] = "InterfaceDeclaration";
        SyntaxKind[SyntaxKind["FunctionDeclaration"] = 130] = "FunctionDeclaration";
        SyntaxKind[SyntaxKind["ModuleDeclaration"] = 131] = "ModuleDeclaration";
        SyntaxKind[SyntaxKind["ClassDeclaration"] = 132] = "ClassDeclaration";
        SyntaxKind[SyntaxKind["EnumDeclaration"] = 133] = "EnumDeclaration";
        SyntaxKind[SyntaxKind["ImportDeclaration"] = 134] = "ImportDeclaration";
        SyntaxKind[SyntaxKind["ExportAssignment"] = 135] = "ExportAssignment";
        // ClassElements
        SyntaxKind[SyntaxKind["MemberFunctionDeclaration"] = 136] = "MemberFunctionDeclaration";
        SyntaxKind[SyntaxKind["MemberVariableDeclaration"] = 137] = "MemberVariableDeclaration";
        SyntaxKind[SyntaxKind["ConstructorDeclaration"] = 138] = "ConstructorDeclaration";
        SyntaxKind[SyntaxKind["IndexMemberDeclaration"] = 139] = "IndexMemberDeclaration";
        // ClassElement and PropertyAssignment
        SyntaxKind[SyntaxKind["GetAccessor"] = 140] = "GetAccessor";
        SyntaxKind[SyntaxKind["SetAccessor"] = 141] = "SetAccessor";
        // Type members.
        SyntaxKind[SyntaxKind["PropertySignature"] = 142] = "PropertySignature";
        SyntaxKind[SyntaxKind["CallSignature"] = 143] = "CallSignature";
        SyntaxKind[SyntaxKind["ConstructSignature"] = 144] = "ConstructSignature";
        SyntaxKind[SyntaxKind["IndexSignature"] = 145] = "IndexSignature";
        SyntaxKind[SyntaxKind["MethodSignature"] = 146] = "MethodSignature";
        // Statements
        SyntaxKind[SyntaxKind["Block"] = 147] = "Block";
        SyntaxKind[SyntaxKind["IfStatement"] = 148] = "IfStatement";
        SyntaxKind[SyntaxKind["VariableStatement"] = 149] = "VariableStatement";
        SyntaxKind[SyntaxKind["ExpressionStatement"] = 150] = "ExpressionStatement";
        SyntaxKind[SyntaxKind["ReturnStatement"] = 151] = "ReturnStatement";
        SyntaxKind[SyntaxKind["SwitchStatement"] = 152] = "SwitchStatement";
        SyntaxKind[SyntaxKind["BreakStatement"] = 153] = "BreakStatement";
        SyntaxKind[SyntaxKind["ContinueStatement"] = 154] = "ContinueStatement";
        SyntaxKind[SyntaxKind["ForStatement"] = 155] = "ForStatement";
        SyntaxKind[SyntaxKind["ForInStatement"] = 156] = "ForInStatement";
        SyntaxKind[SyntaxKind["EmptyStatement"] = 157] = "EmptyStatement";
        SyntaxKind[SyntaxKind["ThrowStatement"] = 158] = "ThrowStatement";
        SyntaxKind[SyntaxKind["WhileStatement"] = 159] = "WhileStatement";
        SyntaxKind[SyntaxKind["TryStatement"] = 160] = "TryStatement";
        SyntaxKind[SyntaxKind["LabeledStatement"] = 161] = "LabeledStatement";
        SyntaxKind[SyntaxKind["DoStatement"] = 162] = "DoStatement";
        SyntaxKind[SyntaxKind["DebuggerStatement"] = 163] = "DebuggerStatement";
        SyntaxKind[SyntaxKind["WithStatement"] = 164] = "WithStatement";
        // Expressions
        SyntaxKind[SyntaxKind["PlusExpression"] = 165] = "PlusExpression";
        SyntaxKind[SyntaxKind["NegateExpression"] = 166] = "NegateExpression";
        SyntaxKind[SyntaxKind["BitwiseNotExpression"] = 167] = "BitwiseNotExpression";
        SyntaxKind[SyntaxKind["LogicalNotExpression"] = 168] = "LogicalNotExpression";
        SyntaxKind[SyntaxKind["PreIncrementExpression"] = 169] = "PreIncrementExpression";
        SyntaxKind[SyntaxKind["PreDecrementExpression"] = 170] = "PreDecrementExpression";
        SyntaxKind[SyntaxKind["DeleteExpression"] = 171] = "DeleteExpression";
        SyntaxKind[SyntaxKind["TypeOfExpression"] = 172] = "TypeOfExpression";
        SyntaxKind[SyntaxKind["VoidExpression"] = 173] = "VoidExpression";
        SyntaxKind[SyntaxKind["CommaExpression"] = 174] = "CommaExpression";
        SyntaxKind[SyntaxKind["AssignmentExpression"] = 175] = "AssignmentExpression";
        SyntaxKind[SyntaxKind["AddAssignmentExpression"] = 176] = "AddAssignmentExpression";
        SyntaxKind[SyntaxKind["SubtractAssignmentExpression"] = 177] = "SubtractAssignmentExpression";
        SyntaxKind[SyntaxKind["MultiplyAssignmentExpression"] = 178] = "MultiplyAssignmentExpression";
        SyntaxKind[SyntaxKind["DivideAssignmentExpression"] = 179] = "DivideAssignmentExpression";
        SyntaxKind[SyntaxKind["ModuloAssignmentExpression"] = 180] = "ModuloAssignmentExpression";
        SyntaxKind[SyntaxKind["AndAssignmentExpression"] = 181] = "AndAssignmentExpression";
        SyntaxKind[SyntaxKind["ExclusiveOrAssignmentExpression"] = 182] = "ExclusiveOrAssignmentExpression";
        SyntaxKind[SyntaxKind["OrAssignmentExpression"] = 183] = "OrAssignmentExpression";
        SyntaxKind[SyntaxKind["LeftShiftAssignmentExpression"] = 184] = "LeftShiftAssignmentExpression";
        SyntaxKind[SyntaxKind["SignedRightShiftAssignmentExpression"] = 185] = "SignedRightShiftAssignmentExpression";
        SyntaxKind[SyntaxKind["UnsignedRightShiftAssignmentExpression"] = 186] = "UnsignedRightShiftAssignmentExpression";
        SyntaxKind[SyntaxKind["ConditionalExpression"] = 187] = "ConditionalExpression";
        SyntaxKind[SyntaxKind["LogicalOrExpression"] = 188] = "LogicalOrExpression";
        SyntaxKind[SyntaxKind["LogicalAndExpression"] = 189] = "LogicalAndExpression";
        SyntaxKind[SyntaxKind["BitwiseOrExpression"] = 190] = "BitwiseOrExpression";
        SyntaxKind[SyntaxKind["BitwiseExclusiveOrExpression"] = 191] = "BitwiseExclusiveOrExpression";
        SyntaxKind[SyntaxKind["BitwiseAndExpression"] = 192] = "BitwiseAndExpression";
        SyntaxKind[SyntaxKind["EqualsWithTypeConversionExpression"] = 193] = "EqualsWithTypeConversionExpression";
        SyntaxKind[SyntaxKind["NotEqualsWithTypeConversionExpression"] = 194] = "NotEqualsWithTypeConversionExpression";
        SyntaxKind[SyntaxKind["EqualsExpression"] = 195] = "EqualsExpression";
        SyntaxKind[SyntaxKind["NotEqualsExpression"] = 196] = "NotEqualsExpression";
        SyntaxKind[SyntaxKind["LessThanExpression"] = 197] = "LessThanExpression";
        SyntaxKind[SyntaxKind["GreaterThanExpression"] = 198] = "GreaterThanExpression";
        SyntaxKind[SyntaxKind["LessThanOrEqualExpression"] = 199] = "LessThanOrEqualExpression";
        SyntaxKind[SyntaxKind["GreaterThanOrEqualExpression"] = 200] = "GreaterThanOrEqualExpression";
        SyntaxKind[SyntaxKind["InstanceOfExpression"] = 201] = "InstanceOfExpression";
        SyntaxKind[SyntaxKind["InExpression"] = 202] = "InExpression";
        SyntaxKind[SyntaxKind["LeftShiftExpression"] = 203] = "LeftShiftExpression";
        SyntaxKind[SyntaxKind["SignedRightShiftExpression"] = 204] = "SignedRightShiftExpression";
        SyntaxKind[SyntaxKind["UnsignedRightShiftExpression"] = 205] = "UnsignedRightShiftExpression";
        SyntaxKind[SyntaxKind["MultiplyExpression"] = 206] = "MultiplyExpression";
        SyntaxKind[SyntaxKind["DivideExpression"] = 207] = "DivideExpression";
        SyntaxKind[SyntaxKind["ModuloExpression"] = 208] = "ModuloExpression";
        SyntaxKind[SyntaxKind["AddExpression"] = 209] = "AddExpression";
        SyntaxKind[SyntaxKind["SubtractExpression"] = 210] = "SubtractExpression";
        SyntaxKind[SyntaxKind["PostIncrementExpression"] = 211] = "PostIncrementExpression";
        SyntaxKind[SyntaxKind["PostDecrementExpression"] = 212] = "PostDecrementExpression";
        SyntaxKind[SyntaxKind["MemberAccessExpression"] = 213] = "MemberAccessExpression";
        SyntaxKind[SyntaxKind["InvocationExpression"] = 214] = "InvocationExpression";
        SyntaxKind[SyntaxKind["ArrayLiteralExpression"] = 215] = "ArrayLiteralExpression";
        SyntaxKind[SyntaxKind["ObjectLiteralExpression"] = 216] = "ObjectLiteralExpression";
        SyntaxKind[SyntaxKind["ObjectCreationExpression"] = 217] = "ObjectCreationExpression";
        SyntaxKind[SyntaxKind["ParenthesizedExpression"] = 218] = "ParenthesizedExpression";
        SyntaxKind[SyntaxKind["ParenthesizedArrowFunctionExpression"] = 219] = "ParenthesizedArrowFunctionExpression";
        SyntaxKind[SyntaxKind["SimpleArrowFunctionExpression"] = 220] = "SimpleArrowFunctionExpression";
        SyntaxKind[SyntaxKind["CastExpression"] = 221] = "CastExpression";
        SyntaxKind[SyntaxKind["ElementAccessExpression"] = 222] = "ElementAccessExpression";
        SyntaxKind[SyntaxKind["FunctionExpression"] = 223] = "FunctionExpression";
        SyntaxKind[SyntaxKind["OmittedExpression"] = 224] = "OmittedExpression";
        // Variable declarations
        SyntaxKind[SyntaxKind["VariableDeclaration"] = 225] = "VariableDeclaration";
        SyntaxKind[SyntaxKind["VariableDeclarator"] = 226] = "VariableDeclarator";
        // Lists
        SyntaxKind[SyntaxKind["ArgumentList"] = 227] = "ArgumentList";
        SyntaxKind[SyntaxKind["ParameterList"] = 228] = "ParameterList";
        SyntaxKind[SyntaxKind["TypeArgumentList"] = 229] = "TypeArgumentList";
        SyntaxKind[SyntaxKind["TypeParameterList"] = 230] = "TypeParameterList";
        // Clauses
        SyntaxKind[SyntaxKind["ExtendsHeritageClause"] = 231] = "ExtendsHeritageClause";
        SyntaxKind[SyntaxKind["ImplementsHeritageClause"] = 232] = "ImplementsHeritageClause";
        SyntaxKind[SyntaxKind["EqualsValueClause"] = 233] = "EqualsValueClause";
        SyntaxKind[SyntaxKind["CaseSwitchClause"] = 234] = "CaseSwitchClause";
        SyntaxKind[SyntaxKind["DefaultSwitchClause"] = 235] = "DefaultSwitchClause";
        SyntaxKind[SyntaxKind["ElseClause"] = 236] = "ElseClause";
        SyntaxKind[SyntaxKind["CatchClause"] = 237] = "CatchClause";
        SyntaxKind[SyntaxKind["FinallyClause"] = 238] = "FinallyClause";
        // Generics
        SyntaxKind[SyntaxKind["TypeParameter"] = 239] = "TypeParameter";
        SyntaxKind[SyntaxKind["Constraint"] = 240] = "Constraint";
        // Property Assignment
        SyntaxKind[SyntaxKind["SimplePropertyAssignment"] = 241] = "SimplePropertyAssignment";
        // GetAccessorPropertyAssignment,
        // SetAccessorPropertyAssignment,
        SyntaxKind[SyntaxKind["FunctionPropertyAssignment"] = 242] = "FunctionPropertyAssignment";
        // Misc.
        SyntaxKind[SyntaxKind["Parameter"] = 243] = "Parameter";
        SyntaxKind[SyntaxKind["EnumElement"] = 244] = "EnumElement";
        SyntaxKind[SyntaxKind["TypeAnnotation"] = 245] = "TypeAnnotation";
        SyntaxKind[SyntaxKind["ExternalModuleReference"] = 246] = "ExternalModuleReference";
        SyntaxKind[SyntaxKind["ModuleNameModuleReference"] = 247] = "ModuleNameModuleReference";
        SyntaxKind[SyntaxKind["FirstStandardKeyword"] = SyntaxKind.BreakKeyword] = "FirstStandardKeyword";
        SyntaxKind[SyntaxKind["LastStandardKeyword"] = SyntaxKind.WithKeyword] = "LastStandardKeyword";
        SyntaxKind[SyntaxKind["FirstFutureReservedKeyword"] = SyntaxKind.ClassKeyword] = "FirstFutureReservedKeyword";
        SyntaxKind[SyntaxKind["LastFutureReservedKeyword"] = SyntaxKind.SuperKeyword] = "LastFutureReservedKeyword";
        SyntaxKind[SyntaxKind["FirstFutureReservedStrictKeyword"] = SyntaxKind.ImplementsKeyword] = "FirstFutureReservedStrictKeyword";
        SyntaxKind[SyntaxKind["LastFutureReservedStrictKeyword"] = SyntaxKind.YieldKeyword] = "LastFutureReservedStrictKeyword";
        SyntaxKind[SyntaxKind["FirstTypeScriptKeyword"] = SyntaxKind.AnyKeyword] = "FirstTypeScriptKeyword";
        SyntaxKind[SyntaxKind["LastTypeScriptKeyword"] = SyntaxKind.StringKeyword] = "LastTypeScriptKeyword";
        SyntaxKind[SyntaxKind["FirstKeyword"] = SyntaxKind.FirstStandardKeyword] = "FirstKeyword";
        SyntaxKind[SyntaxKind["LastKeyword"] = SyntaxKind.LastTypeScriptKeyword] = "LastKeyword";
        SyntaxKind[SyntaxKind["FirstToken"] = SyntaxKind.ErrorToken] = "FirstToken";
        SyntaxKind[SyntaxKind["LastToken"] = SyntaxKind.SlashEqualsToken] = "LastToken";
        SyntaxKind[SyntaxKind["FirstPunctuation"] = SyntaxKind.OpenBraceToken] = "FirstPunctuation";
        SyntaxKind[SyntaxKind["LastPunctuation"] = SyntaxKind.SlashEqualsToken] = "LastPunctuation";
        SyntaxKind[SyntaxKind["FirstFixedWidth"] = SyntaxKind.FirstKeyword] = "FirstFixedWidth";
        SyntaxKind[SyntaxKind["LastFixedWidth"] = SyntaxKind.LastPunctuation] = "LastFixedWidth";
        SyntaxKind[SyntaxKind["FirstTrivia"] = SyntaxKind.WhitespaceTrivia] = "FirstTrivia";
        SyntaxKind[SyntaxKind["LastTrivia"] = SyntaxKind.SkippedTokenTrivia] = "LastTrivia";
        SyntaxKind[SyntaxKind["FirstNode"] = SyntaxKind.SourceUnit] = "FirstNode";
        SyntaxKind[SyntaxKind["LastNode"] = SyntaxKind.ModuleNameModuleReference] = "LastNode";
    })(TypeScript.SyntaxKind || (TypeScript.SyntaxKind = {}));
    var SyntaxKind = TypeScript.SyntaxKind;
})(TypeScript || (TypeScript = {}));
