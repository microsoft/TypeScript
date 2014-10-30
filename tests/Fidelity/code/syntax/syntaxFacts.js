///<reference path='syntaxKind.ts' />
var TypeScript;
(function (TypeScript) {
    var SyntaxFacts;
    (function (SyntaxFacts) {
        var textToKeywordKind = {
            "any": 60 /* AnyKeyword */,
            "boolean": 61 /* BooleanKeyword */,
            "break": 15 /* BreakKeyword */,
            "case": 16 /* CaseKeyword */,
            "catch": 17 /* CatchKeyword */,
            "class": 44 /* ClassKeyword */,
            "continue": 18 /* ContinueKeyword */,
            "const": 45 /* ConstKeyword */,
            "constructor": 62 /* ConstructorKeyword */,
            "debugger": 19 /* DebuggerKeyword */,
            "declare": 63 /* DeclareKeyword */,
            "default": 20 /* DefaultKeyword */,
            "delete": 21 /* DeleteKeyword */,
            "do": 22 /* DoKeyword */,
            "else": 23 /* ElseKeyword */,
            "enum": 46 /* EnumKeyword */,
            "export": 47 /* ExportKeyword */,
            "extends": 48 /* ExtendsKeyword */,
            "false": 24 /* FalseKeyword */,
            "finally": 25 /* FinallyKeyword */,
            "for": 26 /* ForKeyword */,
            "function": 27 /* FunctionKeyword */,
            "get": 64 /* GetKeyword */,
            "if": 28 /* IfKeyword */,
            "implements": 51 /* ImplementsKeyword */,
            "import": 49 /* ImportKeyword */,
            "in": 29 /* InKeyword */,
            "instanceof": 30 /* InstanceOfKeyword */,
            "interface": 52 /* InterfaceKeyword */,
            "let": 53 /* LetKeyword */,
            "module": 65 /* ModuleKeyword */,
            "new": 31 /* NewKeyword */,
            "null": 32 /* NullKeyword */,
            "number": 67 /* NumberKeyword */,
            "package": 54 /* PackageKeyword */,
            "private": 55 /* PrivateKeyword */,
            "protected": 56 /* ProtectedKeyword */,
            "public": 57 /* PublicKeyword */,
            "require": 66 /* RequireKeyword */,
            "return": 33 /* ReturnKeyword */,
            "set": 68 /* SetKeyword */,
            "static": 58 /* StaticKeyword */,
            "string": 69 /* StringKeyword */,
            "super": 50 /* SuperKeyword */,
            "switch": 34 /* SwitchKeyword */,
            "this": 35 /* ThisKeyword */,
            "throw": 36 /* ThrowKeyword */,
            "true": 37 /* TrueKeyword */,
            "try": 38 /* TryKeyword */,
            "typeof": 39 /* TypeOfKeyword */,
            "var": 40 /* VarKeyword */,
            "void": 41 /* VoidKeyword */,
            "while": 42 /* WhileKeyword */,
            "with": 43 /* WithKeyword */,
            "yield": 59 /* YieldKeyword */,
            "{": 70 /* OpenBraceToken */,
            "}": 71 /* CloseBraceToken */,
            "(": 72 /* OpenParenToken */,
            ")": 73 /* CloseParenToken */,
            "[": 74 /* OpenBracketToken */,
            "]": 75 /* CloseBracketToken */,
            ".": 76 /* DotToken */,
            "...": 77 /* DotDotDotToken */,
            ";": 78 /* SemicolonToken */,
            ",": 79 /* CommaToken */,
            "<": 80 /* LessThanToken */,
            ">": 81 /* GreaterThanToken */,
            "<=": 82 /* LessThanEqualsToken */,
            ">=": 83 /* GreaterThanEqualsToken */,
            "==": 84 /* EqualsEqualsToken */,
            "=>": 85 /* EqualsGreaterThanToken */,
            "!=": 86 /* ExclamationEqualsToken */,
            "===": 87 /* EqualsEqualsEqualsToken */,
            "!==": 88 /* ExclamationEqualsEqualsToken */,
            "+": 89 /* PlusToken */,
            "-": 90 /* MinusToken */,
            "*": 91 /* AsteriskToken */,
            "%": 92 /* PercentToken */,
            "++": 93 /* PlusPlusToken */,
            "--": 94 /* MinusMinusToken */,
            "<<": 95 /* LessThanLessThanToken */,
            ">>": 96 /* GreaterThanGreaterThanToken */,
            ">>>": 97 /* GreaterThanGreaterThanGreaterThanToken */,
            "&": 98 /* AmpersandToken */,
            "|": 99 /* BarToken */,
            "^": 100 /* CaretToken */,
            "!": 101 /* ExclamationToken */,
            "~": 102 /* TildeToken */,
            "&&": 103 /* AmpersandAmpersandToken */,
            "||": 104 /* BarBarToken */,
            "?": 105 /* QuestionToken */,
            ":": 106 /* ColonToken */,
            "=": 107 /* EqualsToken */,
            "+=": 108 /* PlusEqualsToken */,
            "-=": 109 /* MinusEqualsToken */,
            "*=": 110 /* AsteriskEqualsToken */,
            "%=": 111 /* PercentEqualsToken */,
            "<<=": 112 /* LessThanLessThanEqualsToken */,
            ">>=": 113 /* GreaterThanGreaterThanEqualsToken */,
            ">>>=": 114 /* GreaterThanGreaterThanGreaterThanEqualsToken */,
            "&=": 115 /* AmpersandEqualsToken */,
            "|=": 116 /* BarEqualsToken */,
            "^=": 117 /* CaretEqualsToken */,
            "/": 118 /* SlashToken */,
            "/=": 119 /* SlashEqualsToken */
        };
        var kindToText = new Array();
        for (var name in textToKeywordKind) {
            if (textToKeywordKind.hasOwnProperty(name)) {
                // Debug.assert(kindToText[textToKeywordKind[name]] === undefined);
                kindToText[textToKeywordKind[name]] = name;
            }
        }
        // Manually work around a bug in the CScript 5.8 runtime where 'constructor' is not
        // listed when SyntaxFacts.textToKeywordKind is enumerated because it is the name of
        // the constructor function.
        kindToText[62 /* ConstructorKeyword */] = "constructor";
        function getTokenKind(text) {
            if (textToKeywordKind.hasOwnProperty(text)) {
                return textToKeywordKind[text];
            }
            return 0 /* None */;
        }
        SyntaxFacts.getTokenKind = getTokenKind;
        function getText(kind) {
            var result = kindToText[kind];
            return result !== undefined ? result : null;
        }
        SyntaxFacts.getText = getText;
        function isAnyKeyword(kind) {
            return kind >= TypeScript.SyntaxKind.FirstKeyword && kind <= TypeScript.SyntaxKind.LastKeyword;
        }
        SyntaxFacts.isAnyKeyword = isAnyKeyword;
        function isAnyPunctuation(kind) {
            return kind >= TypeScript.SyntaxKind.FirstPunctuation && kind <= TypeScript.SyntaxKind.LastPunctuation;
        }
        SyntaxFacts.isAnyPunctuation = isAnyPunctuation;
        function isPrefixUnaryExpressionOperatorToken(tokenKind) {
            return getPrefixUnaryExpressionFromOperatorToken(tokenKind) !== 0 /* None */;
        }
        SyntaxFacts.isPrefixUnaryExpressionOperatorToken = isPrefixUnaryExpressionOperatorToken;
        function isBinaryExpressionOperatorToken(tokenKind) {
            return getBinaryExpressionFromOperatorToken(tokenKind) !== 0 /* None */;
        }
        SyntaxFacts.isBinaryExpressionOperatorToken = isBinaryExpressionOperatorToken;
        function getPrefixUnaryExpressionFromOperatorToken(tokenKind) {
            switch (tokenKind) {
                case 89 /* PlusToken */:
                    return 165 /* PlusExpression */;
                case 90 /* MinusToken */:
                    return 166 /* NegateExpression */;
                case 102 /* TildeToken */:
                    return 167 /* BitwiseNotExpression */;
                case 101 /* ExclamationToken */:
                    return 168 /* LogicalNotExpression */;
                case 93 /* PlusPlusToken */:
                    return 169 /* PreIncrementExpression */;
                case 94 /* MinusMinusToken */:
                    return 170 /* PreDecrementExpression */;
                default:
                    return 0 /* None */;
            }
        }
        SyntaxFacts.getPrefixUnaryExpressionFromOperatorToken = getPrefixUnaryExpressionFromOperatorToken;
        function getPostfixUnaryExpressionFromOperatorToken(tokenKind) {
            switch (tokenKind) {
                case 93 /* PlusPlusToken */:
                    return 211 /* PostIncrementExpression */;
                case 94 /* MinusMinusToken */:
                    return 212 /* PostDecrementExpression */;
                default:
                    return 0 /* None */;
            }
        }
        SyntaxFacts.getPostfixUnaryExpressionFromOperatorToken = getPostfixUnaryExpressionFromOperatorToken;
        function getBinaryExpressionFromOperatorToken(tokenKind) {
            switch (tokenKind) {
                case 91 /* AsteriskToken */:
                    return 206 /* MultiplyExpression */;
                case 118 /* SlashToken */:
                    return 207 /* DivideExpression */;
                case 92 /* PercentToken */:
                    return 208 /* ModuloExpression */;
                case 89 /* PlusToken */:
                    return 209 /* AddExpression */;
                case 90 /* MinusToken */:
                    return 210 /* SubtractExpression */;
                case 95 /* LessThanLessThanToken */:
                    return 203 /* LeftShiftExpression */;
                case 96 /* GreaterThanGreaterThanToken */:
                    return 204 /* SignedRightShiftExpression */;
                case 97 /* GreaterThanGreaterThanGreaterThanToken */:
                    return 205 /* UnsignedRightShiftExpression */;
                case 80 /* LessThanToken */:
                    return 197 /* LessThanExpression */;
                case 81 /* GreaterThanToken */:
                    return 198 /* GreaterThanExpression */;
                case 82 /* LessThanEqualsToken */:
                    return 199 /* LessThanOrEqualExpression */;
                case 83 /* GreaterThanEqualsToken */:
                    return 200 /* GreaterThanOrEqualExpression */;
                case 30 /* InstanceOfKeyword */:
                    return 201 /* InstanceOfExpression */;
                case 29 /* InKeyword */:
                    return 202 /* InExpression */;
                case 84 /* EqualsEqualsToken */:
                    return 193 /* EqualsWithTypeConversionExpression */;
                case 86 /* ExclamationEqualsToken */:
                    return 194 /* NotEqualsWithTypeConversionExpression */;
                case 87 /* EqualsEqualsEqualsToken */:
                    return 195 /* EqualsExpression */;
                case 88 /* ExclamationEqualsEqualsToken */:
                    return 196 /* NotEqualsExpression */;
                case 98 /* AmpersandToken */:
                    return 192 /* BitwiseAndExpression */;
                case 100 /* CaretToken */:
                    return 191 /* BitwiseExclusiveOrExpression */;
                case 99 /* BarToken */:
                    return 190 /* BitwiseOrExpression */;
                case 103 /* AmpersandAmpersandToken */:
                    return 189 /* LogicalAndExpression */;
                case 104 /* BarBarToken */:
                    return 188 /* LogicalOrExpression */;
                case 116 /* BarEqualsToken */:
                    return 183 /* OrAssignmentExpression */;
                case 115 /* AmpersandEqualsToken */:
                    return 181 /* AndAssignmentExpression */;
                case 117 /* CaretEqualsToken */:
                    return 182 /* ExclusiveOrAssignmentExpression */;
                case 112 /* LessThanLessThanEqualsToken */:
                    return 184 /* LeftShiftAssignmentExpression */;
                case 113 /* GreaterThanGreaterThanEqualsToken */:
                    return 185 /* SignedRightShiftAssignmentExpression */;
                case 114 /* GreaterThanGreaterThanGreaterThanEqualsToken */:
                    return 186 /* UnsignedRightShiftAssignmentExpression */;
                case 108 /* PlusEqualsToken */:
                    return 176 /* AddAssignmentExpression */;
                case 109 /* MinusEqualsToken */:
                    return 177 /* SubtractAssignmentExpression */;
                case 110 /* AsteriskEqualsToken */:
                    return 178 /* MultiplyAssignmentExpression */;
                case 119 /* SlashEqualsToken */:
                    return 179 /* DivideAssignmentExpression */;
                case 111 /* PercentEqualsToken */:
                    return 180 /* ModuloAssignmentExpression */;
                case 107 /* EqualsToken */:
                    return 175 /* AssignmentExpression */;
                case 79 /* CommaToken */:
                    return 174 /* CommaExpression */;
                default:
                    return 0 /* None */;
            }
        }
        SyntaxFacts.getBinaryExpressionFromOperatorToken = getBinaryExpressionFromOperatorToken;
        function getOperatorTokenFromBinaryExpression(tokenKind) {
            switch (tokenKind) {
                case 206 /* MultiplyExpression */:
                    return 91 /* AsteriskToken */;
                case 207 /* DivideExpression */:
                    return 118 /* SlashToken */;
                case 208 /* ModuloExpression */:
                    return 92 /* PercentToken */;
                case 209 /* AddExpression */:
                    return 89 /* PlusToken */;
                case 210 /* SubtractExpression */:
                    return 90 /* MinusToken */;
                case 203 /* LeftShiftExpression */:
                    return 95 /* LessThanLessThanToken */;
                case 204 /* SignedRightShiftExpression */:
                    return 96 /* GreaterThanGreaterThanToken */;
                case 205 /* UnsignedRightShiftExpression */:
                    return 97 /* GreaterThanGreaterThanGreaterThanToken */;
                case 197 /* LessThanExpression */:
                    return 80 /* LessThanToken */;
                case 198 /* GreaterThanExpression */:
                    return 81 /* GreaterThanToken */;
                case 199 /* LessThanOrEqualExpression */:
                    return 82 /* LessThanEqualsToken */;
                case 200 /* GreaterThanOrEqualExpression */:
                    return 83 /* GreaterThanEqualsToken */;
                case 201 /* InstanceOfExpression */:
                    return 30 /* InstanceOfKeyword */;
                case 202 /* InExpression */:
                    return 29 /* InKeyword */;
                case 193 /* EqualsWithTypeConversionExpression */:
                    return 84 /* EqualsEqualsToken */;
                case 194 /* NotEqualsWithTypeConversionExpression */:
                    return 86 /* ExclamationEqualsToken */;
                case 195 /* EqualsExpression */:
                    return 87 /* EqualsEqualsEqualsToken */;
                case 196 /* NotEqualsExpression */:
                    return 88 /* ExclamationEqualsEqualsToken */;
                case 192 /* BitwiseAndExpression */:
                    return 98 /* AmpersandToken */;
                case 191 /* BitwiseExclusiveOrExpression */:
                    return 100 /* CaretToken */;
                case 190 /* BitwiseOrExpression */:
                    return 99 /* BarToken */;
                case 189 /* LogicalAndExpression */:
                    return 103 /* AmpersandAmpersandToken */;
                case 188 /* LogicalOrExpression */:
                    return 104 /* BarBarToken */;
                case 183 /* OrAssignmentExpression */:
                    return 116 /* BarEqualsToken */;
                case 181 /* AndAssignmentExpression */:
                    return 115 /* AmpersandEqualsToken */;
                case 182 /* ExclusiveOrAssignmentExpression */:
                    return 117 /* CaretEqualsToken */;
                case 184 /* LeftShiftAssignmentExpression */:
                    return 112 /* LessThanLessThanEqualsToken */;
                case 185 /* SignedRightShiftAssignmentExpression */:
                    return 113 /* GreaterThanGreaterThanEqualsToken */;
                case 186 /* UnsignedRightShiftAssignmentExpression */:
                    return 114 /* GreaterThanGreaterThanGreaterThanEqualsToken */;
                case 176 /* AddAssignmentExpression */:
                    return 108 /* PlusEqualsToken */;
                case 177 /* SubtractAssignmentExpression */:
                    return 109 /* MinusEqualsToken */;
                case 178 /* MultiplyAssignmentExpression */:
                    return 110 /* AsteriskEqualsToken */;
                case 179 /* DivideAssignmentExpression */:
                    return 119 /* SlashEqualsToken */;
                case 180 /* ModuloAssignmentExpression */:
                    return 111 /* PercentEqualsToken */;
                case 175 /* AssignmentExpression */:
                    return 107 /* EqualsToken */;
                case 174 /* CommaExpression */:
                    return 79 /* CommaToken */;
                default:
                    return 0 /* None */;
            }
        }
        SyntaxFacts.getOperatorTokenFromBinaryExpression = getOperatorTokenFromBinaryExpression;
        function isAssignmentOperatorToken(tokenKind) {
            switch (tokenKind) {
                case 116 /* BarEqualsToken */:
                case 115 /* AmpersandEqualsToken */:
                case 117 /* CaretEqualsToken */:
                case 112 /* LessThanLessThanEqualsToken */:
                case 113 /* GreaterThanGreaterThanEqualsToken */:
                case 114 /* GreaterThanGreaterThanGreaterThanEqualsToken */:
                case 108 /* PlusEqualsToken */:
                case 109 /* MinusEqualsToken */:
                case 110 /* AsteriskEqualsToken */:
                case 119 /* SlashEqualsToken */:
                case 111 /* PercentEqualsToken */:
                case 107 /* EqualsToken */:
                    return true;
                default:
                    return false;
            }
        }
        SyntaxFacts.isAssignmentOperatorToken = isAssignmentOperatorToken;
        function isType(kind) {
            switch (kind) {
                case 124 /* ArrayType */:
                case 60 /* AnyKeyword */:
                case 67 /* NumberKeyword */:
                case 61 /* BooleanKeyword */:
                case 69 /* StringKeyword */:
                case 41 /* VoidKeyword */:
                case 123 /* FunctionType */:
                case 122 /* ObjectType */:
                case 125 /* ConstructorType */:
                case 127 /* TypeQuery */:
                case 126 /* GenericType */:
                case 121 /* QualifiedName */:
                case 11 /* IdentifierName */:
                    return true;
            }
            return false;
        }
        SyntaxFacts.isType = isType;
    })(SyntaxFacts = TypeScript.SyntaxFacts || (TypeScript.SyntaxFacts = {}));
})(TypeScript || (TypeScript = {}));
