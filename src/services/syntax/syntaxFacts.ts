///<reference path='syntaxKind.ts' />

module TypeScript.SyntaxFacts {
    var textToKeywordKind: any = {
        "any": SyntaxKind.AnyKeyword,
        "boolean": SyntaxKind.BooleanKeyword,
        "break": SyntaxKind.BreakKeyword,
        "case": SyntaxKind.CaseKeyword,
        "catch": SyntaxKind.CatchKeyword,
        "class": SyntaxKind.ClassKeyword,
        "continue": SyntaxKind.ContinueKeyword,
        "const": SyntaxKind.ConstKeyword,
        "constructor": SyntaxKind.ConstructorKeyword,
        "debugger": SyntaxKind.DebuggerKeyword,
        "declare": SyntaxKind.DeclareKeyword,
        "default": SyntaxKind.DefaultKeyword,
        "delete": SyntaxKind.DeleteKeyword,
        "do": SyntaxKind.DoKeyword,
        "else": SyntaxKind.ElseKeyword,
        "enum": SyntaxKind.EnumKeyword,
        "export": SyntaxKind.ExportKeyword,
        "extends": SyntaxKind.ExtendsKeyword,
        "false": SyntaxKind.FalseKeyword,
        "finally": SyntaxKind.FinallyKeyword,
        "for": SyntaxKind.ForKeyword,
        "function": SyntaxKind.FunctionKeyword,
        "get": SyntaxKind.GetKeyword,
        "if": SyntaxKind.IfKeyword,
        "implements": SyntaxKind.ImplementsKeyword,
        "import": SyntaxKind.ImportKeyword,
        "in": SyntaxKind.InKeyword,
        "instanceof": SyntaxKind.InstanceOfKeyword,
        "interface": SyntaxKind.InterfaceKeyword,
        "let": SyntaxKind.LetKeyword,
        "module": SyntaxKind.ModuleKeyword,
        "new": SyntaxKind.NewKeyword,
        "null": SyntaxKind.NullKeyword,
        "number":SyntaxKind.NumberKeyword,
        "package": SyntaxKind.PackageKeyword,
        "private": SyntaxKind.PrivateKeyword,
        "protected": SyntaxKind.ProtectedKeyword,
        "public": SyntaxKind.PublicKeyword,
        "require": SyntaxKind.RequireKeyword,
        "return": SyntaxKind.ReturnKeyword,
        "set": SyntaxKind.SetKeyword,
        "static": SyntaxKind.StaticKeyword,
        "string": SyntaxKind.StringKeyword,
        "super": SyntaxKind.SuperKeyword,
        "switch": SyntaxKind.SwitchKeyword,
        "this": SyntaxKind.ThisKeyword,
        "throw": SyntaxKind.ThrowKeyword,
        "true": SyntaxKind.TrueKeyword,
        "try": SyntaxKind.TryKeyword,
        "typeof": SyntaxKind.TypeOfKeyword,
        "var": SyntaxKind.VarKeyword,
        "void": SyntaxKind.VoidKeyword,
        "while": SyntaxKind.WhileKeyword,
        "with": SyntaxKind.WithKeyword,
        "yield": SyntaxKind.YieldKeyword,

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
        "=>": SyntaxKind.EqualsGreaterThanToken,
        "!=": SyntaxKind.ExclamationEqualsToken,
        "===": SyntaxKind.EqualsEqualsEqualsToken,
        "!==": SyntaxKind.ExclamationEqualsEqualsToken,
        "+": SyntaxKind.PlusToken,
        "-": SyntaxKind.MinusToken,
        "*": SyntaxKind.AsteriskToken,
        "%": SyntaxKind.PercentToken,
        "++": SyntaxKind.PlusPlusToken,
        "--": SyntaxKind.MinusMinusToken,
        "<<": SyntaxKind.LessThanLessThanToken,
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
        ":": SyntaxKind.ColonToken,
        "=": SyntaxKind.EqualsToken,
        "+=": SyntaxKind.PlusEqualsToken,
        "-=": SyntaxKind.MinusEqualsToken,
        "*=": SyntaxKind.AsteriskEqualsToken,
        "%=": SyntaxKind.PercentEqualsToken,
        "<<=": SyntaxKind.LessThanLessThanEqualsToken,
        ">>=": SyntaxKind.GreaterThanGreaterThanEqualsToken,
        ">>>=": SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken,
        "&=": SyntaxKind.AmpersandEqualsToken,
        "|=": SyntaxKind.BarEqualsToken,
        "^=": SyntaxKind.CaretEqualsToken,
        "/": SyntaxKind.SlashToken,
        "/=": SyntaxKind.SlashEqualsToken,
    };

    var kindToText = new Array<string>();

    for (var name in textToKeywordKind) {
        if (textToKeywordKind.hasOwnProperty(name)) {
            // Debug.assert(kindToText[textToKeywordKind[name]] === undefined);
            kindToText[textToKeywordKind[name]] = name;
        }
    }

    // Manually work around a bug in the CScript 5.8 runtime where 'constructor' is not
    // listed when SyntaxFacts.textToKeywordKind is enumerated because it is the name of
    // the constructor function.
    kindToText[SyntaxKind.ConstructorKeyword] = "constructor";

    export function getTokenKind(text: string): SyntaxKind {
        if (textToKeywordKind.hasOwnProperty(text)) {
            return textToKeywordKind[text];
        }

        return SyntaxKind.None;
    }

    export function getText(kind: SyntaxKind): string {
        var result = kindToText[kind];
        return result;//  !== undefined ? result : undefined;
    }

    export function isAnyKeyword(kind: SyntaxKind): boolean {
        return kind >= SyntaxKind.FirstKeyword && kind <= SyntaxKind.LastKeyword;
    }

    export function isAnyPunctuation(kind: SyntaxKind): boolean {
        return kind >= SyntaxKind.FirstPunctuation && kind <= SyntaxKind.LastPunctuation;
    }

    export function isPrefixUnaryExpressionOperatorToken(tokenKind: SyntaxKind): boolean {
        switch (tokenKind) {
            case SyntaxKind.PlusToken: 
            case SyntaxKind.MinusToken: 
            case SyntaxKind.TildeToken: 
            case SyntaxKind.ExclamationToken: 
            case SyntaxKind.PlusPlusToken: 
            case SyntaxKind.MinusMinusToken: 
                return true;
            default: 
                return false;
        }
    }

    export function isBinaryExpressionOperatorToken(tokenKind: SyntaxKind): boolean {
        switch (tokenKind) {
            case SyntaxKind.AsteriskToken:
            case SyntaxKind.SlashToken:
            case SyntaxKind.PercentToken:
            case SyntaxKind.PlusToken:
            case SyntaxKind.MinusToken:
            case SyntaxKind.LessThanLessThanToken:
            case SyntaxKind.GreaterThanGreaterThanToken:
            case SyntaxKind.GreaterThanGreaterThanGreaterThanToken:
            case SyntaxKind.LessThanToken:
            case SyntaxKind.GreaterThanToken:
            case SyntaxKind.LessThanEqualsToken:
            case SyntaxKind.GreaterThanEqualsToken:
            case SyntaxKind.InstanceOfKeyword:
            case SyntaxKind.InKeyword:
            case SyntaxKind.EqualsEqualsToken:
            case SyntaxKind.ExclamationEqualsToken:
            case SyntaxKind.EqualsEqualsEqualsToken:
            case SyntaxKind.ExclamationEqualsEqualsToken:
            case SyntaxKind.AmpersandToken:
            case SyntaxKind.CaretToken:
            case SyntaxKind.BarToken:
            case SyntaxKind.AmpersandAmpersandToken:
            case SyntaxKind.BarBarToken:
            case SyntaxKind.BarEqualsToken:
            case SyntaxKind.AmpersandEqualsToken:
            case SyntaxKind.CaretEqualsToken:
            case SyntaxKind.LessThanLessThanEqualsToken:
            case SyntaxKind.GreaterThanGreaterThanEqualsToken:
            case SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken:
            case SyntaxKind.PlusEqualsToken:
            case SyntaxKind.MinusEqualsToken:
            case SyntaxKind.AsteriskEqualsToken:
            case SyntaxKind.SlashEqualsToken:
            case SyntaxKind.PercentEqualsToken:
            case SyntaxKind.EqualsToken:
            case SyntaxKind.CommaToken:
                return true;
            default:
                return false;
        }
    }

    export function isAssignmentOperatorToken(tokenKind: SyntaxKind): boolean {
        switch (tokenKind) {
            case SyntaxKind.BarEqualsToken:
            case SyntaxKind.AmpersandEqualsToken:
            case SyntaxKind.CaretEqualsToken:
            case SyntaxKind.LessThanLessThanEqualsToken:
            case SyntaxKind.GreaterThanGreaterThanEqualsToken:
            case SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken:
            case SyntaxKind.PlusEqualsToken:
            case SyntaxKind.MinusEqualsToken:
            case SyntaxKind.AsteriskEqualsToken:
            case SyntaxKind.SlashEqualsToken:
            case SyntaxKind.PercentEqualsToken:
            case SyntaxKind.EqualsToken:
                return true;

            default:
                return false;
        }
    }

    export function isType(kind: SyntaxKind): boolean {
        switch (kind) {
            case SyntaxKind.ArrayType:
            case SyntaxKind.AnyKeyword:
            case SyntaxKind.NumberKeyword:
            case SyntaxKind.BooleanKeyword:
            case SyntaxKind.StringKeyword:
            case SyntaxKind.VoidKeyword:
            case SyntaxKind.FunctionType:
            case SyntaxKind.ObjectType:
            case SyntaxKind.ConstructorType:
            case SyntaxKind.TypeQuery:
            case SyntaxKind.GenericType:
            case SyntaxKind.QualifiedName:
            case SyntaxKind.IdentifierName:
                return true;
        }

        return false;
    }
}