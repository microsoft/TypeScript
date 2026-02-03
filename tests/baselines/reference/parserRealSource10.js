//// [tests/cases/conformance/parser/ecmascript5/parserRealSource10.ts] ////

//// [parserRealSource10.ts]
// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

///<reference path='typescript.ts' />

module TypeScript {
    export enum TokenID {
        // Keywords
        Any,
        Bool,
        Break,
        Case,
        Catch,
        Class,
        Const,
        Continue,
        Debugger,
        Default,
        Delete,
        Do,
        Else,
        Enum,
        Export,
        Extends,
        Declare,
        False,
        Finally,
        For,
        Function,
        Constructor,
        Get,
        If,
        Implements,
        Import,
        In,
        InstanceOf,
        Interface,
        Let,
        Module,
        New,
        Number,
        Null,
        Package,
        Private,
        Protected,
        Public,
        Return,
        Set,
        Static,
        String,
        Super,
        Switch,
        This,
        Throw,
        True,
        Try,
        TypeOf,
        Var,
        Void,
        With,
        While,
        Yield,
        // Punctuation
        Semicolon,
        OpenParen,
        CloseParen,
        OpenBracket,
        CloseBracket,
        OpenBrace,
        CloseBrace,
        Comma,
        Equals,
        PlusEquals,
        MinusEquals,
        AsteriskEquals,
        SlashEquals,
        PercentEquals,
        AmpersandEquals,
        CaretEquals,
        BarEquals,
        LessThanLessThanEquals,
        GreaterThanGreaterThanEquals,
        GreaterThanGreaterThanGreaterThanEquals,
        Question,
        Colon,
        BarBar,
        AmpersandAmpersand,
        Bar,
        Caret,
        And,
        EqualsEquals,
        ExclamationEquals,
        EqualsEqualsEquals,
        ExclamationEqualsEquals,
        LessThan,
        LessThanEquals,
        GreaterThan,
        GreaterThanEquals,
        LessThanLessThan,
        GreaterThanGreaterThan,
        GreaterThanGreaterThanGreaterThan,
        Plus,
        Minus,
        Asterisk,
        Slash,
        Percent,
        Tilde,
        Exclamation,
        PlusPlus,
        MinusMinus,
        Dot,
        DotDotDot,
        Error,
        EndOfFile,
        EqualsGreaterThan,
        Identifier,
        StringLiteral,
        RegularExpressionLiteral,
        NumberLiteral,
        Whitespace,
        Comment,
        Lim,
        LimFixed = EqualsGreaterThan,
        LimKeyword = Yield,
    }

    export var tokenTable = new TokenInfo[];
    export var nodeTypeTable = new string[];
    export var nodeTypeToTokTable = new number[];
    export var noRegexTable = new boolean[];

    noRegexTable[TokenID.Identifier] = true;
    noRegexTable[TokenID.StringLiteral] = true;
    noRegexTable[TokenID.NumberLiteral] = true;
    noRegexTable[TokenID.RegularExpressionLiteral] = true;
    noRegexTable[TokenID.This] = true;
    noRegexTable[TokenID.PlusPlus] = true;
    noRegexTable[TokenID.MinusMinus] = true;
    noRegexTable[TokenID.CloseParen] = true;
    noRegexTable[TokenID.CloseBracket] = true;
    noRegexTable[TokenID.CloseBrace] = true;
    noRegexTable[TokenID.True] = true;
    noRegexTable[TokenID.False] = true;

    export enum OperatorPrecedence {
        None,
        Comma,
        Assignment,
        Conditional,
        LogicalOr,
        LogicalAnd,
        BitwiseOr,
        BitwiseExclusiveOr,
        BitwiseAnd,
        Equality,
        Relational,
        Shift,
        Additive,
        Multiplicative,
        Unary,
        Lim
    }

    export enum Reservation {
        None = 0,
        Javascript = 1,
        JavascriptFuture = 2,
        TypeScript = 4,
        JavascriptFutureStrict = 8,
        TypeScriptAndJS = Javascript | TypeScript,
        TypeScriptAndJSFuture = JavascriptFuture | TypeScript,
        TypeScriptAndJSFutureStrict = JavascriptFutureStrict | TypeScript,
    }

    export class TokenInfo {
        constructor (public tokenId: TokenID, public reservation: Reservation,
                    public binopPrecedence: number, public binopNodeType: number,
                    public unopPrecedence: number, public unopNodeType: number,
                    public text: string, public ers: ErrorRecoverySet) { }
    }

    function setTokenInfo(tokenId: TokenID, reservation: number, binopPrecedence: number,
        binopNodeType: number, unopPrecedence: number, unopNodeType: number,
        text: string, ers: ErrorRecoverySet) {
        if (tokenId !== undefined) {
            tokenTable[tokenId] = new TokenInfo(tokenId, reservation, binopPrecedence,
                                              binopNodeType, unopPrecedence, unopNodeType, text, ers);
            if (binopNodeType != NodeType.None) {
                nodeTypeTable[binopNodeType] = text;
                nodeTypeToTokTable[binopNodeType] = tokenId;
            }
            if (unopNodeType != NodeType.None) {
                nodeTypeTable[unopNodeType] = text;
            }
        }
    }

    setTokenInfo(TokenID.Any, Reservation.TypeScript, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "any", ErrorRecoverySet.PrimType);
    setTokenInfo(TokenID.Bool, Reservation.TypeScript, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "boolean", ErrorRecoverySet.PrimType);
    setTokenInfo(TokenID.Break, Reservation.TypeScriptAndJS, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "break", ErrorRecoverySet.Stmt);
    setTokenInfo(TokenID.Case, Reservation.TypeScriptAndJS, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "case", ErrorRecoverySet.SCase);
    setTokenInfo(TokenID.Catch, Reservation.TypeScriptAndJS, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "catch", ErrorRecoverySet.Catch);
    setTokenInfo(TokenID.Class, Reservation.TypeScriptAndJSFuture, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "class", ErrorRecoverySet.TypeScriptS);
    setTokenInfo(TokenID.Const, Reservation.TypeScriptAndJSFuture, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "const", ErrorRecoverySet.Var);
    setTokenInfo(TokenID.Continue, Reservation.TypeScriptAndJS, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "continue", ErrorRecoverySet.Stmt);
    setTokenInfo(TokenID.Debugger, Reservation.TypeScriptAndJS, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.Debugger, "debugger", ErrorRecoverySet.Stmt);
    setTokenInfo(TokenID.Default, Reservation.TypeScriptAndJS, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "default", ErrorRecoverySet.SCase);
    setTokenInfo(TokenID.Delete, Reservation.TypeScriptAndJS, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.Unary, NodeType.Delete, "delete", ErrorRecoverySet.Prefix);
    setTokenInfo(TokenID.Do, Reservation.TypeScriptAndJS, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "do", ErrorRecoverySet.Stmt);
    setTokenInfo(TokenID.Else, Reservation.TypeScriptAndJS, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "else", ErrorRecoverySet.Else);
    setTokenInfo(TokenID.Enum, Reservation.TypeScriptAndJSFuture, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "enum", ErrorRecoverySet.TypeScriptS);
    setTokenInfo(TokenID.Export, Reservation.TypeScriptAndJSFuture, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "export", ErrorRecoverySet.TypeScriptS);
    setTokenInfo(TokenID.Extends, Reservation.TypeScriptAndJSFuture, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "extends", ErrorRecoverySet.None);
    setTokenInfo(TokenID.Declare, Reservation.TypeScript, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "declare", ErrorRecoverySet.Stmt);
    setTokenInfo(TokenID.False, Reservation.TypeScriptAndJS, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "false", ErrorRecoverySet.RLit);
    setTokenInfo(TokenID.Finally, Reservation.TypeScriptAndJS, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "finally", ErrorRecoverySet.Catch);
    setTokenInfo(TokenID.For, Reservation.TypeScriptAndJS, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "for", ErrorRecoverySet.Stmt);
    setTokenInfo(TokenID.Function, Reservation.TypeScriptAndJS, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "function", ErrorRecoverySet.Func);
    setTokenInfo(TokenID.Constructor, Reservation.TypeScriptAndJSFutureStrict, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "constructor", ErrorRecoverySet.Func);
    setTokenInfo(TokenID.Get, Reservation.TypeScript, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "get", ErrorRecoverySet.Func);
    setTokenInfo(TokenID.Set, Reservation.TypeScript, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "set", ErrorRecoverySet.Func);
    setTokenInfo(TokenID.If, Reservation.TypeScriptAndJS, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "if", ErrorRecoverySet.Stmt);
    setTokenInfo(TokenID.Implements, Reservation.TypeScriptAndJSFutureStrict, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "implements", ErrorRecoverySet.None);
    setTokenInfo(TokenID.Import, Reservation.TypeScriptAndJSFuture, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "import", ErrorRecoverySet.TypeScriptS);
    setTokenInfo(TokenID.In, Reservation.TypeScriptAndJS, OperatorPrecedence.Relational, NodeType.In, OperatorPrecedence.None, NodeType.None, "in", ErrorRecoverySet.None);
    setTokenInfo(TokenID.InstanceOf, Reservation.TypeScriptAndJS, OperatorPrecedence.Relational, NodeType.InstOf, OperatorPrecedence.None, NodeType.None, "instanceof", ErrorRecoverySet.BinOp);
    setTokenInfo(TokenID.Interface, Reservation.TypeScriptAndJSFutureStrict, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "interface", ErrorRecoverySet.TypeScriptS);
    setTokenInfo(TokenID.Let, Reservation.JavascriptFutureStrict, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "let", ErrorRecoverySet.None);
    setTokenInfo(TokenID.Module, Reservation.TypeScript, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "module", ErrorRecoverySet.TypeScriptS);
    setTokenInfo(TokenID.New, Reservation.TypeScriptAndJS, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "new", ErrorRecoverySet.PreOp);
    setTokenInfo(TokenID.Number, Reservation.TypeScript, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "number", ErrorRecoverySet.PrimType);
    setTokenInfo(TokenID.Null, Reservation.TypeScriptAndJS, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "null", ErrorRecoverySet.RLit);
    setTokenInfo(TokenID.Package, Reservation.JavascriptFutureStrict, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "package", ErrorRecoverySet.None);
    setTokenInfo(TokenID.Private, Reservation.TypeScriptAndJSFutureStrict, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "private", ErrorRecoverySet.TypeScriptS);
    setTokenInfo(TokenID.Protected, Reservation.JavascriptFutureStrict, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "protected", ErrorRecoverySet.None);
    setTokenInfo(TokenID.Public, Reservation.TypeScriptAndJSFutureStrict, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "public", ErrorRecoverySet.TypeScriptS);
    setTokenInfo(TokenID.Return, Reservation.TypeScriptAndJS, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "return", ErrorRecoverySet.Stmt);
    setTokenInfo(TokenID.Static, Reservation.TypeScriptAndJSFutureStrict, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "static", ErrorRecoverySet.None);
    setTokenInfo(TokenID.String, Reservation.TypeScript, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "string", ErrorRecoverySet.PrimType);
    setTokenInfo(TokenID.Super, Reservation.TypeScriptAndJSFuture, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "super", ErrorRecoverySet.RLit);
    setTokenInfo(TokenID.Switch, Reservation.TypeScriptAndJS, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "switch", ErrorRecoverySet.Stmt);
    setTokenInfo(TokenID.This, Reservation.TypeScriptAndJS, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "this", ErrorRecoverySet.RLit);
    setTokenInfo(TokenID.Throw, Reservation.TypeScriptAndJS, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "throw", ErrorRecoverySet.Stmt);
    setTokenInfo(TokenID.True, Reservation.TypeScriptAndJS, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "true", ErrorRecoverySet.RLit);
    setTokenInfo(TokenID.Try, Reservation.TypeScriptAndJS, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "try", ErrorRecoverySet.Stmt);
    setTokenInfo(TokenID.TypeOf, Reservation.TypeScriptAndJS, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.Unary, NodeType.Typeof, "typeof", ErrorRecoverySet.Prefix);
    setTokenInfo(TokenID.Var, Reservation.TypeScriptAndJS, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "var", ErrorRecoverySet.Var);
    setTokenInfo(TokenID.Void, Reservation.TypeScriptAndJS, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.Unary, NodeType.Void, "void", ErrorRecoverySet.Prefix);
    setTokenInfo(TokenID.With, Reservation.TypeScriptAndJS, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.With, "with", ErrorRecoverySet.Stmt);
    setTokenInfo(TokenID.While, Reservation.TypeScriptAndJS, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "while", ErrorRecoverySet.While);
    setTokenInfo(TokenID.Yield, Reservation.JavascriptFutureStrict, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "yield", ErrorRecoverySet.None);

    setTokenInfo(TokenID.Identifier, Reservation.None, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "identifier", ErrorRecoverySet.ID);
    setTokenInfo(TokenID.NumberLiteral, Reservation.None, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "numberLiteral", ErrorRecoverySet.Literal);
    setTokenInfo(TokenID.RegularExpressionLiteral, Reservation.None, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "regex", ErrorRecoverySet.RegExp);
    setTokenInfo(TokenID.StringLiteral, Reservation.None, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "qstring", ErrorRecoverySet.Literal);

    // Non-operator non-identifier tokens
    setTokenInfo(TokenID.Semicolon, Reservation.None, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, ";", ErrorRecoverySet.SColon); // ;
    setTokenInfo(TokenID.CloseParen, Reservation.None, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, ")", ErrorRecoverySet.RParen); // )
    setTokenInfo(TokenID.CloseBracket, Reservation.None, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "]", ErrorRecoverySet.RBrack); // ]
    setTokenInfo(TokenID.OpenBrace, Reservation.None, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "{", ErrorRecoverySet.LCurly); // {
    setTokenInfo(TokenID.CloseBrace, Reservation.None, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "}", ErrorRecoverySet.RCurly); // }
    setTokenInfo(TokenID.DotDotDot, Reservation.None, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "...", ErrorRecoverySet.None); // ...

    // Operator non-identifier tokens
    setTokenInfo(TokenID.Comma, Reservation.None, OperatorPrecedence.Comma, NodeType.Comma, OperatorPrecedence.None, NodeType.None, ",", ErrorRecoverySet.Comma); // ,
    setTokenInfo(TokenID.Equals, Reservation.None, OperatorPrecedence.Assignment, NodeType.Asg, OperatorPrecedence.None, NodeType.None, "=", ErrorRecoverySet.Asg); // =
    setTokenInfo(TokenID.PlusEquals, Reservation.None, OperatorPrecedence.Assignment, NodeType.AsgAdd, OperatorPrecedence.None, NodeType.None, "+=", ErrorRecoverySet.BinOp); // +=
    setTokenInfo(TokenID.MinusEquals, Reservation.None, OperatorPrecedence.Assignment, NodeType.AsgSub, OperatorPrecedence.None, NodeType.None, "-=", ErrorRecoverySet.BinOp); // -=
    setTokenInfo(TokenID.AsteriskEquals, Reservation.None, OperatorPrecedence.Assignment, NodeType.AsgMul, OperatorPrecedence.None, NodeType.None, "*=", ErrorRecoverySet.BinOp); // *=

    setTokenInfo(TokenID.SlashEquals, Reservation.None, OperatorPrecedence.Assignment, NodeType.AsgDiv, OperatorPrecedence.None, NodeType.None, "/=", ErrorRecoverySet.BinOp); // /=
    setTokenInfo(TokenID.PercentEquals, Reservation.None, OperatorPrecedence.Assignment, NodeType.AsgMod, OperatorPrecedence.None, NodeType.None, "%=", ErrorRecoverySet.BinOp); // %=
    setTokenInfo(TokenID.AmpersandEquals, Reservation.None, OperatorPrecedence.Assignment, NodeType.AsgAnd, OperatorPrecedence.None, NodeType.None, "&=", ErrorRecoverySet.BinOp); // &=
    setTokenInfo(TokenID.CaretEquals, Reservation.None, OperatorPrecedence.Assignment, NodeType.AsgXor, OperatorPrecedence.None, NodeType.None, "^=", ErrorRecoverySet.BinOp); // ^=
    setTokenInfo(TokenID.BarEquals, Reservation.None, OperatorPrecedence.Assignment, NodeType.AsgOr, OperatorPrecedence.None, NodeType.None, "|=", ErrorRecoverySet.BinOp); // |=
    setTokenInfo(TokenID.LessThanLessThanEquals, Reservation.None, OperatorPrecedence.Assignment, NodeType.AsgLsh, OperatorPrecedence.None, NodeType.None, "<<=", ErrorRecoverySet.BinOp); // <<=
    setTokenInfo(TokenID.GreaterThanGreaterThanEquals, Reservation.None, OperatorPrecedence.Assignment, NodeType.AsgRsh, OperatorPrecedence.None, NodeType.None, ">>=", ErrorRecoverySet.BinOp); // >>=
    setTokenInfo(TokenID.GreaterThanGreaterThanGreaterThanEquals, Reservation.None, OperatorPrecedence.Assignment, NodeType.AsgRs2, OperatorPrecedence.None, NodeType.None, ">>>=", ErrorRecoverySet.BinOp); // >>>=
    setTokenInfo(TokenID.Question, Reservation.None, OperatorPrecedence.Conditional, NodeType.ConditionalExpression, OperatorPrecedence.None, NodeType.None, "?", ErrorRecoverySet.BinOp); // ?
    setTokenInfo(TokenID.Colon, Reservation.None, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, ":", ErrorRecoverySet.Colon); // :
    setTokenInfo(TokenID.BarBar, Reservation.None, OperatorPrecedence.LogicalOr, NodeType.LogOr, OperatorPrecedence.None, NodeType.None, "||", ErrorRecoverySet.BinOp); // ||
    setTokenInfo(TokenID.AmpersandAmpersand, Reservation.None, OperatorPrecedence.LogicalAnd, NodeType.LogAnd, OperatorPrecedence.None, NodeType.None, "&&", ErrorRecoverySet.BinOp); // &&
    setTokenInfo(TokenID.Bar, Reservation.None, OperatorPrecedence.BitwiseOr, NodeType.Or, OperatorPrecedence.None, NodeType.None, "|", ErrorRecoverySet.BinOp); // |
    setTokenInfo(TokenID.Caret, Reservation.None, OperatorPrecedence.BitwiseExclusiveOr, NodeType.Xor, OperatorPrecedence.None, NodeType.None, "^", ErrorRecoverySet.BinOp); // ^
    setTokenInfo(TokenID.And, Reservation.None, OperatorPrecedence.BitwiseAnd, NodeType.And, OperatorPrecedence.None, NodeType.None, "&", ErrorRecoverySet.BinOp); // &
    setTokenInfo(TokenID.EqualsEquals, Reservation.None, OperatorPrecedence.Equality, NodeType.Eq, OperatorPrecedence.None, NodeType.None, "==", ErrorRecoverySet.BinOp); // ==
    setTokenInfo(TokenID.ExclamationEquals, Reservation.None, OperatorPrecedence.Equality, NodeType.Ne, OperatorPrecedence.None, NodeType.None, "!=", ErrorRecoverySet.BinOp); // !=
    setTokenInfo(TokenID.EqualsEqualsEquals, Reservation.None, OperatorPrecedence.Equality, NodeType.Eqv, OperatorPrecedence.None, NodeType.None, "===", ErrorRecoverySet.BinOp); // ===
    setTokenInfo(TokenID.ExclamationEqualsEquals, Reservation.None, OperatorPrecedence.Equality, NodeType.NEqv, OperatorPrecedence.None, NodeType.None, "!==", ErrorRecoverySet.BinOp); // !==
    setTokenInfo(TokenID.LessThan, Reservation.None, OperatorPrecedence.Relational, NodeType.Lt, OperatorPrecedence.None, NodeType.None, "<", ErrorRecoverySet.BinOp); // <
    setTokenInfo(TokenID.LessThanEquals, Reservation.None, OperatorPrecedence.Relational, NodeType.Le, OperatorPrecedence.None, NodeType.None, "<=", ErrorRecoverySet.BinOp); // <=
    setTokenInfo(TokenID.GreaterThan, Reservation.None, OperatorPrecedence.Relational, NodeType.Gt, OperatorPrecedence.None, NodeType.None, ">", ErrorRecoverySet.BinOp); // >
    setTokenInfo(TokenID.GreaterThanEquals, Reservation.None, OperatorPrecedence.Relational, NodeType.Ge, OperatorPrecedence.None, NodeType.None, ">=", ErrorRecoverySet.BinOp); // >=
    setTokenInfo(TokenID.LessThanLessThan, Reservation.None, OperatorPrecedence.Shift, NodeType.Lsh, OperatorPrecedence.None, NodeType.None, "<<", ErrorRecoverySet.BinOp); // <<
    setTokenInfo(TokenID.GreaterThanGreaterThan, Reservation.None, OperatorPrecedence.Shift, NodeType.Rsh, OperatorPrecedence.None, NodeType.None, ">>", ErrorRecoverySet.BinOp); // >>
    setTokenInfo(TokenID.GreaterThanGreaterThanGreaterThan, Reservation.None, OperatorPrecedence.Shift, NodeType.Rs2, OperatorPrecedence.None, NodeType.None, ">>>", ErrorRecoverySet.BinOp); // >>>
    setTokenInfo(TokenID.Plus, Reservation.None, OperatorPrecedence.Additive, NodeType.Add, OperatorPrecedence.Unary, NodeType.Pos, "+", ErrorRecoverySet.AddOp); // +
    setTokenInfo(TokenID.Minus, Reservation.None, OperatorPrecedence.Additive, NodeType.Sub, OperatorPrecedence.Unary, NodeType.Neg, "-", ErrorRecoverySet.AddOp); // -
    setTokenInfo(TokenID.Asterisk, Reservation.None, OperatorPrecedence.Multiplicative, NodeType.Mul, OperatorPrecedence.None, NodeType.None, "*", ErrorRecoverySet.BinOp); // *
    setTokenInfo(TokenID.Slash, Reservation.None, OperatorPrecedence.Multiplicative, NodeType.Div, OperatorPrecedence.None, NodeType.None, "/", ErrorRecoverySet.BinOp); // /
    setTokenInfo(TokenID.Percent, Reservation.None, OperatorPrecedence.Multiplicative, NodeType.Mod, OperatorPrecedence.None, NodeType.None, "%", ErrorRecoverySet.BinOp); // %
    setTokenInfo(TokenID.Tilde, Reservation.None, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.Unary, NodeType.Not, "~", ErrorRecoverySet.PreOp); // ~
    setTokenInfo(TokenID.Exclamation, Reservation.None, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.Unary, NodeType.LogNot, "!", ErrorRecoverySet.PreOp); // !
    setTokenInfo(TokenID.PlusPlus, Reservation.None, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.Unary, NodeType.IncPre, "++", ErrorRecoverySet.PreOp); // ++
    setTokenInfo(TokenID.MinusMinus, Reservation.None, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.Unary, NodeType.DecPre, "--", ErrorRecoverySet.PreOp); // --
    setTokenInfo(TokenID.OpenParen, Reservation.None, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "(", ErrorRecoverySet.LParen); // (
    setTokenInfo(TokenID.OpenBracket, Reservation.None, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "[", ErrorRecoverySet.LBrack); // [
    setTokenInfo(TokenID.Dot, Reservation.None, OperatorPrecedence.Unary, NodeType.None, OperatorPrecedence.None, NodeType.None, ".", ErrorRecoverySet.Dot); // .
    setTokenInfo(TokenID.EndOfFile, Reservation.None, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "<EOF>", ErrorRecoverySet.EOF); // EOF
    setTokenInfo(TokenID.EqualsGreaterThan, Reservation.None, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "=>", ErrorRecoverySet.None); // =>

    export function lookupToken(tokenId: TokenID): TokenInfo {
        return tokenTable[tokenId];
    }

    export enum TokenClass {
        Punctuation,
        Keyword,
        Operator,
        Comment,
        Whitespace,
        Identifier,
        Literal,
    }

    export class SavedToken {
        constructor (public tok: Token, public minChar: number, public limChar: number) { }
    }

    export class Token {
        constructor (public tokenId: TokenID) {
        }

        public toString() {
            return "token: " + this.tokenId + " " + this.getText() + " (" + (<any>TokenID)._map[this.tokenId] + ")";
        }

        public print(line: number, outfile) {
            outfile.WriteLine(this.toString() + ",on line" + line);
        }

        public getText(): string {
            return tokenTable[this.tokenId].text;
        }

        public classification(): TokenClass {
            if (this.tokenId <= TokenID.LimKeyword) {
                return TokenClass.Keyword;
            }
            else {
                var tokenInfo = lookupToken(this.tokenId);
                if (tokenInfo != undefined) {
                    if ((tokenInfo.unopNodeType != NodeType.None) ||
                        (tokenInfo.binopNodeType != NodeType.None)) {
                        return TokenClass.Operator;
                    }
                }
            }

            return TokenClass.Punctuation;
        }
    }

    export class NumberLiteralToken extends Token {
        constructor (public value: number, public hasEmptyFraction?: boolean) {
            super(TokenID.NumberLiteral);
        }

        public getText(): string {
            return this.hasEmptyFraction ? this.value.toString() + ".0" : this.value.toString();
        }

        public classification(): TokenClass {
            return TokenClass.Literal;
        }
    }

    export class StringLiteralToken extends Token {
        constructor (public value: string) {
            super(TokenID.StringLiteral);
        }

        public getText(): string {
            return this.value;
        }

        public classification(): TokenClass {
            return TokenClass.Literal;
        }
    }

    export class IdentifierToken extends Token {
        constructor (public value: string, public hasEscapeSequence : boolean) {
            super(TokenID.Identifier);
        }
        public getText(): string {
            return this.value;
        }
        public classification(): TokenClass {
            return TokenClass.Identifier;
        }
    }

    export class WhitespaceToken extends Token {
        constructor (tokenId: TokenID, public value: string) {
            super(tokenId);
        }

        public getText(): string {
            return this.value;
        }

        public classification(): TokenClass {
            return TokenClass.Whitespace;
        }
    }

    export class CommentToken extends Token {
        constructor (tokenID: TokenID, public value: string, public isBlock: boolean, public startPos: number, public line: number, public endsLine: boolean) {
            super(tokenID);
        }

        public getText(): string {
            return this.value;
        }

        public classification(): TokenClass {
            return TokenClass.Comment;
        }
    }

    export class RegularExpressionLiteralToken extends Token {
        constructor(public regex) {
            super(TokenID.RegularExpressionLiteral);
        }

        public getText(): string {
            return this.regex.toString();
        }

        public classification(): TokenClass {
            return TokenClass.Literal;
        }
    }

    // TODO: new with length TokenID.LimFixed
    export var staticTokens = new Token[];
    export function initializeStaticTokens() {
        for (var i = 0; i <= TokenID.LimFixed; i++) {
            staticTokens[i] = new Token(i);
        }
    }
}

//// [parserRealSource10.js]
// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
///<reference path='typescript.ts' />
var TypeScript;
(function (TypeScript) {
    var TokenID;
    (function (TokenID) {
        // Keywords
        TokenID[TokenID["Any"] = 0] = "Any";
        TokenID[TokenID["Bool"] = 1] = "Bool";
        TokenID[TokenID["Break"] = 2] = "Break";
        TokenID[TokenID["Case"] = 3] = "Case";
        TokenID[TokenID["Catch"] = 4] = "Catch";
        TokenID[TokenID["Class"] = 5] = "Class";
        TokenID[TokenID["Const"] = 6] = "Const";
        TokenID[TokenID["Continue"] = 7] = "Continue";
        TokenID[TokenID["Debugger"] = 8] = "Debugger";
        TokenID[TokenID["Default"] = 9] = "Default";
        TokenID[TokenID["Delete"] = 10] = "Delete";
        TokenID[TokenID["Do"] = 11] = "Do";
        TokenID[TokenID["Else"] = 12] = "Else";
        TokenID[TokenID["Enum"] = 13] = "Enum";
        TokenID[TokenID["Export"] = 14] = "Export";
        TokenID[TokenID["Extends"] = 15] = "Extends";
        TokenID[TokenID["Declare"] = 16] = "Declare";
        TokenID[TokenID["False"] = 17] = "False";
        TokenID[TokenID["Finally"] = 18] = "Finally";
        TokenID[TokenID["For"] = 19] = "For";
        TokenID[TokenID["Function"] = 20] = "Function";
        TokenID[TokenID["Constructor"] = 21] = "Constructor";
        TokenID[TokenID["Get"] = 22] = "Get";
        TokenID[TokenID["If"] = 23] = "If";
        TokenID[TokenID["Implements"] = 24] = "Implements";
        TokenID[TokenID["Import"] = 25] = "Import";
        TokenID[TokenID["In"] = 26] = "In";
        TokenID[TokenID["InstanceOf"] = 27] = "InstanceOf";
        TokenID[TokenID["Interface"] = 28] = "Interface";
        TokenID[TokenID["Let"] = 29] = "Let";
        TokenID[TokenID["Module"] = 30] = "Module";
        TokenID[TokenID["New"] = 31] = "New";
        TokenID[TokenID["Number"] = 32] = "Number";
        TokenID[TokenID["Null"] = 33] = "Null";
        TokenID[TokenID["Package"] = 34] = "Package";
        TokenID[TokenID["Private"] = 35] = "Private";
        TokenID[TokenID["Protected"] = 36] = "Protected";
        TokenID[TokenID["Public"] = 37] = "Public";
        TokenID[TokenID["Return"] = 38] = "Return";
        TokenID[TokenID["Set"] = 39] = "Set";
        TokenID[TokenID["Static"] = 40] = "Static";
        TokenID[TokenID["String"] = 41] = "String";
        TokenID[TokenID["Super"] = 42] = "Super";
        TokenID[TokenID["Switch"] = 43] = "Switch";
        TokenID[TokenID["This"] = 44] = "This";
        TokenID[TokenID["Throw"] = 45] = "Throw";
        TokenID[TokenID["True"] = 46] = "True";
        TokenID[TokenID["Try"] = 47] = "Try";
        TokenID[TokenID["TypeOf"] = 48] = "TypeOf";
        TokenID[TokenID["Var"] = 49] = "Var";
        TokenID[TokenID["Void"] = 50] = "Void";
        TokenID[TokenID["With"] = 51] = "With";
        TokenID[TokenID["While"] = 52] = "While";
        TokenID[TokenID["Yield"] = 53] = "Yield";
        // Punctuation
        TokenID[TokenID["Semicolon"] = 54] = "Semicolon";
        TokenID[TokenID["OpenParen"] = 55] = "OpenParen";
        TokenID[TokenID["CloseParen"] = 56] = "CloseParen";
        TokenID[TokenID["OpenBracket"] = 57] = "OpenBracket";
        TokenID[TokenID["CloseBracket"] = 58] = "CloseBracket";
        TokenID[TokenID["OpenBrace"] = 59] = "OpenBrace";
        TokenID[TokenID["CloseBrace"] = 60] = "CloseBrace";
        TokenID[TokenID["Comma"] = 61] = "Comma";
        TokenID[TokenID["Equals"] = 62] = "Equals";
        TokenID[TokenID["PlusEquals"] = 63] = "PlusEquals";
        TokenID[TokenID["MinusEquals"] = 64] = "MinusEquals";
        TokenID[TokenID["AsteriskEquals"] = 65] = "AsteriskEquals";
        TokenID[TokenID["SlashEquals"] = 66] = "SlashEquals";
        TokenID[TokenID["PercentEquals"] = 67] = "PercentEquals";
        TokenID[TokenID["AmpersandEquals"] = 68] = "AmpersandEquals";
        TokenID[TokenID["CaretEquals"] = 69] = "CaretEquals";
        TokenID[TokenID["BarEquals"] = 70] = "BarEquals";
        TokenID[TokenID["LessThanLessThanEquals"] = 71] = "LessThanLessThanEquals";
        TokenID[TokenID["GreaterThanGreaterThanEquals"] = 72] = "GreaterThanGreaterThanEquals";
        TokenID[TokenID["GreaterThanGreaterThanGreaterThanEquals"] = 73] = "GreaterThanGreaterThanGreaterThanEquals";
        TokenID[TokenID["Question"] = 74] = "Question";
        TokenID[TokenID["Colon"] = 75] = "Colon";
        TokenID[TokenID["BarBar"] = 76] = "BarBar";
        TokenID[TokenID["AmpersandAmpersand"] = 77] = "AmpersandAmpersand";
        TokenID[TokenID["Bar"] = 78] = "Bar";
        TokenID[TokenID["Caret"] = 79] = "Caret";
        TokenID[TokenID["And"] = 80] = "And";
        TokenID[TokenID["EqualsEquals"] = 81] = "EqualsEquals";
        TokenID[TokenID["ExclamationEquals"] = 82] = "ExclamationEquals";
        TokenID[TokenID["EqualsEqualsEquals"] = 83] = "EqualsEqualsEquals";
        TokenID[TokenID["ExclamationEqualsEquals"] = 84] = "ExclamationEqualsEquals";
        TokenID[TokenID["LessThan"] = 85] = "LessThan";
        TokenID[TokenID["LessThanEquals"] = 86] = "LessThanEquals";
        TokenID[TokenID["GreaterThan"] = 87] = "GreaterThan";
        TokenID[TokenID["GreaterThanEquals"] = 88] = "GreaterThanEquals";
        TokenID[TokenID["LessThanLessThan"] = 89] = "LessThanLessThan";
        TokenID[TokenID["GreaterThanGreaterThan"] = 90] = "GreaterThanGreaterThan";
        TokenID[TokenID["GreaterThanGreaterThanGreaterThan"] = 91] = "GreaterThanGreaterThanGreaterThan";
        TokenID[TokenID["Plus"] = 92] = "Plus";
        TokenID[TokenID["Minus"] = 93] = "Minus";
        TokenID[TokenID["Asterisk"] = 94] = "Asterisk";
        TokenID[TokenID["Slash"] = 95] = "Slash";
        TokenID[TokenID["Percent"] = 96] = "Percent";
        TokenID[TokenID["Tilde"] = 97] = "Tilde";
        TokenID[TokenID["Exclamation"] = 98] = "Exclamation";
        TokenID[TokenID["PlusPlus"] = 99] = "PlusPlus";
        TokenID[TokenID["MinusMinus"] = 100] = "MinusMinus";
        TokenID[TokenID["Dot"] = 101] = "Dot";
        TokenID[TokenID["DotDotDot"] = 102] = "DotDotDot";
        TokenID[TokenID["Error"] = 103] = "Error";
        TokenID[TokenID["EndOfFile"] = 104] = "EndOfFile";
        TokenID[TokenID["EqualsGreaterThan"] = 105] = "EqualsGreaterThan";
        TokenID[TokenID["Identifier"] = 106] = "Identifier";
        TokenID[TokenID["StringLiteral"] = 107] = "StringLiteral";
        TokenID[TokenID["RegularExpressionLiteral"] = 108] = "RegularExpressionLiteral";
        TokenID[TokenID["NumberLiteral"] = 109] = "NumberLiteral";
        TokenID[TokenID["Whitespace"] = 110] = "Whitespace";
        TokenID[TokenID["Comment"] = 111] = "Comment";
        TokenID[TokenID["Lim"] = 112] = "Lim";
        TokenID[TokenID["LimFixed"] = 105] = "LimFixed";
        TokenID[TokenID["LimKeyword"] = 53] = "LimKeyword";
    })(TokenID = TypeScript.TokenID || (TypeScript.TokenID = {}));
    TypeScript.tokenTable = new TokenInfo[];
    TypeScript.nodeTypeTable = new string[];
    TypeScript.nodeTypeToTokTable = new number[];
    TypeScript.noRegexTable = new boolean[];
    TypeScript.noRegexTable[TokenID.Identifier] = true;
    TypeScript.noRegexTable[TokenID.StringLiteral] = true;
    TypeScript.noRegexTable[TokenID.NumberLiteral] = true;
    TypeScript.noRegexTable[TokenID.RegularExpressionLiteral] = true;
    TypeScript.noRegexTable[TokenID.This] = true;
    TypeScript.noRegexTable[TokenID.PlusPlus] = true;
    TypeScript.noRegexTable[TokenID.MinusMinus] = true;
    TypeScript.noRegexTable[TokenID.CloseParen] = true;
    TypeScript.noRegexTable[TokenID.CloseBracket] = true;
    TypeScript.noRegexTable[TokenID.CloseBrace] = true;
    TypeScript.noRegexTable[TokenID.True] = true;
    TypeScript.noRegexTable[TokenID.False] = true;
    var OperatorPrecedence;
    (function (OperatorPrecedence) {
        OperatorPrecedence[OperatorPrecedence["None"] = 0] = "None";
        OperatorPrecedence[OperatorPrecedence["Comma"] = 1] = "Comma";
        OperatorPrecedence[OperatorPrecedence["Assignment"] = 2] = "Assignment";
        OperatorPrecedence[OperatorPrecedence["Conditional"] = 3] = "Conditional";
        OperatorPrecedence[OperatorPrecedence["LogicalOr"] = 4] = "LogicalOr";
        OperatorPrecedence[OperatorPrecedence["LogicalAnd"] = 5] = "LogicalAnd";
        OperatorPrecedence[OperatorPrecedence["BitwiseOr"] = 6] = "BitwiseOr";
        OperatorPrecedence[OperatorPrecedence["BitwiseExclusiveOr"] = 7] = "BitwiseExclusiveOr";
        OperatorPrecedence[OperatorPrecedence["BitwiseAnd"] = 8] = "BitwiseAnd";
        OperatorPrecedence[OperatorPrecedence["Equality"] = 9] = "Equality";
        OperatorPrecedence[OperatorPrecedence["Relational"] = 10] = "Relational";
        OperatorPrecedence[OperatorPrecedence["Shift"] = 11] = "Shift";
        OperatorPrecedence[OperatorPrecedence["Additive"] = 12] = "Additive";
        OperatorPrecedence[OperatorPrecedence["Multiplicative"] = 13] = "Multiplicative";
        OperatorPrecedence[OperatorPrecedence["Unary"] = 14] = "Unary";
        OperatorPrecedence[OperatorPrecedence["Lim"] = 15] = "Lim";
    })(OperatorPrecedence = TypeScript.OperatorPrecedence || (TypeScript.OperatorPrecedence = {}));
    var Reservation;
    (function (Reservation) {
        Reservation[Reservation["None"] = 0] = "None";
        Reservation[Reservation["Javascript"] = 1] = "Javascript";
        Reservation[Reservation["JavascriptFuture"] = 2] = "JavascriptFuture";
        Reservation[Reservation["TypeScript"] = 4] = "TypeScript";
        Reservation[Reservation["JavascriptFutureStrict"] = 8] = "JavascriptFutureStrict";
        Reservation[Reservation["TypeScriptAndJS"] = 5] = "TypeScriptAndJS";
        Reservation[Reservation["TypeScriptAndJSFuture"] = 6] = "TypeScriptAndJSFuture";
        Reservation[Reservation["TypeScriptAndJSFutureStrict"] = 12] = "TypeScriptAndJSFutureStrict";
    })(Reservation = TypeScript.Reservation || (TypeScript.Reservation = {}));
    var TokenInfo = /** @class */ (function () {
        function TokenInfo(tokenId, reservation, binopPrecedence, binopNodeType, unopPrecedence, unopNodeType, text, ers) {
            this.tokenId = tokenId;
            this.reservation = reservation;
            this.binopPrecedence = binopPrecedence;
            this.binopNodeType = binopNodeType;
            this.unopPrecedence = unopPrecedence;
            this.unopNodeType = unopNodeType;
            this.text = text;
            this.ers = ers;
        }
        return TokenInfo;
    }());
    TypeScript.TokenInfo = TokenInfo;
    function setTokenInfo(tokenId, reservation, binopPrecedence, binopNodeType, unopPrecedence, unopNodeType, text, ers) {
        if (tokenId !== undefined) {
            TypeScript.tokenTable[tokenId] = new TokenInfo(tokenId, reservation, binopPrecedence, binopNodeType, unopPrecedence, unopNodeType, text, ers);
            if (binopNodeType != NodeType.None) {
                TypeScript.nodeTypeTable[binopNodeType] = text;
                TypeScript.nodeTypeToTokTable[binopNodeType] = tokenId;
            }
            if (unopNodeType != NodeType.None) {
                TypeScript.nodeTypeTable[unopNodeType] = text;
            }
        }
    }
    setTokenInfo(TokenID.Any, Reservation.TypeScript, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "any", ErrorRecoverySet.PrimType);
    setTokenInfo(TokenID.Bool, Reservation.TypeScript, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "boolean", ErrorRecoverySet.PrimType);
    setTokenInfo(TokenID.Break, Reservation.TypeScriptAndJS, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "break", ErrorRecoverySet.Stmt);
    setTokenInfo(TokenID.Case, Reservation.TypeScriptAndJS, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "case", ErrorRecoverySet.SCase);
    setTokenInfo(TokenID.Catch, Reservation.TypeScriptAndJS, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "catch", ErrorRecoverySet.Catch);
    setTokenInfo(TokenID.Class, Reservation.TypeScriptAndJSFuture, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "class", ErrorRecoverySet.TypeScriptS);
    setTokenInfo(TokenID.Const, Reservation.TypeScriptAndJSFuture, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "const", ErrorRecoverySet.Var);
    setTokenInfo(TokenID.Continue, Reservation.TypeScriptAndJS, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "continue", ErrorRecoverySet.Stmt);
    setTokenInfo(TokenID.Debugger, Reservation.TypeScriptAndJS, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.Debugger, "debugger", ErrorRecoverySet.Stmt);
    setTokenInfo(TokenID.Default, Reservation.TypeScriptAndJS, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "default", ErrorRecoverySet.SCase);
    setTokenInfo(TokenID.Delete, Reservation.TypeScriptAndJS, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.Unary, NodeType.Delete, "delete", ErrorRecoverySet.Prefix);
    setTokenInfo(TokenID.Do, Reservation.TypeScriptAndJS, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "do", ErrorRecoverySet.Stmt);
    setTokenInfo(TokenID.Else, Reservation.TypeScriptAndJS, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "else", ErrorRecoverySet.Else);
    setTokenInfo(TokenID.Enum, Reservation.TypeScriptAndJSFuture, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "enum", ErrorRecoverySet.TypeScriptS);
    setTokenInfo(TokenID.Export, Reservation.TypeScriptAndJSFuture, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "export", ErrorRecoverySet.TypeScriptS);
    setTokenInfo(TokenID.Extends, Reservation.TypeScriptAndJSFuture, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "extends", ErrorRecoverySet.None);
    setTokenInfo(TokenID.Declare, Reservation.TypeScript, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "declare", ErrorRecoverySet.Stmt);
    setTokenInfo(TokenID.False, Reservation.TypeScriptAndJS, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "false", ErrorRecoverySet.RLit);
    setTokenInfo(TokenID.Finally, Reservation.TypeScriptAndJS, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "finally", ErrorRecoverySet.Catch);
    setTokenInfo(TokenID.For, Reservation.TypeScriptAndJS, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "for", ErrorRecoverySet.Stmt);
    setTokenInfo(TokenID.Function, Reservation.TypeScriptAndJS, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "function", ErrorRecoverySet.Func);
    setTokenInfo(TokenID.Constructor, Reservation.TypeScriptAndJSFutureStrict, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "constructor", ErrorRecoverySet.Func);
    setTokenInfo(TokenID.Get, Reservation.TypeScript, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "get", ErrorRecoverySet.Func);
    setTokenInfo(TokenID.Set, Reservation.TypeScript, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "set", ErrorRecoverySet.Func);
    setTokenInfo(TokenID.If, Reservation.TypeScriptAndJS, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "if", ErrorRecoverySet.Stmt);
    setTokenInfo(TokenID.Implements, Reservation.TypeScriptAndJSFutureStrict, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "implements", ErrorRecoverySet.None);
    setTokenInfo(TokenID.Import, Reservation.TypeScriptAndJSFuture, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "import", ErrorRecoverySet.TypeScriptS);
    setTokenInfo(TokenID.In, Reservation.TypeScriptAndJS, OperatorPrecedence.Relational, NodeType.In, OperatorPrecedence.None, NodeType.None, "in", ErrorRecoverySet.None);
    setTokenInfo(TokenID.InstanceOf, Reservation.TypeScriptAndJS, OperatorPrecedence.Relational, NodeType.InstOf, OperatorPrecedence.None, NodeType.None, "instanceof", ErrorRecoverySet.BinOp);
    setTokenInfo(TokenID.Interface, Reservation.TypeScriptAndJSFutureStrict, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "interface", ErrorRecoverySet.TypeScriptS);
    setTokenInfo(TokenID.Let, Reservation.JavascriptFutureStrict, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "let", ErrorRecoverySet.None);
    setTokenInfo(TokenID.Module, Reservation.TypeScript, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "module", ErrorRecoverySet.TypeScriptS);
    setTokenInfo(TokenID.New, Reservation.TypeScriptAndJS, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "new", ErrorRecoverySet.PreOp);
    setTokenInfo(TokenID.Number, Reservation.TypeScript, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "number", ErrorRecoverySet.PrimType);
    setTokenInfo(TokenID.Null, Reservation.TypeScriptAndJS, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "null", ErrorRecoverySet.RLit);
    setTokenInfo(TokenID.Package, Reservation.JavascriptFutureStrict, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "package", ErrorRecoverySet.None);
    setTokenInfo(TokenID.Private, Reservation.TypeScriptAndJSFutureStrict, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "private", ErrorRecoverySet.TypeScriptS);
    setTokenInfo(TokenID.Protected, Reservation.JavascriptFutureStrict, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "protected", ErrorRecoverySet.None);
    setTokenInfo(TokenID.Public, Reservation.TypeScriptAndJSFutureStrict, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "public", ErrorRecoverySet.TypeScriptS);
    setTokenInfo(TokenID.Return, Reservation.TypeScriptAndJS, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "return", ErrorRecoverySet.Stmt);
    setTokenInfo(TokenID.Static, Reservation.TypeScriptAndJSFutureStrict, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "static", ErrorRecoverySet.None);
    setTokenInfo(TokenID.String, Reservation.TypeScript, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "string", ErrorRecoverySet.PrimType);
    setTokenInfo(TokenID.Super, Reservation.TypeScriptAndJSFuture, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "super", ErrorRecoverySet.RLit);
    setTokenInfo(TokenID.Switch, Reservation.TypeScriptAndJS, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "switch", ErrorRecoverySet.Stmt);
    setTokenInfo(TokenID.This, Reservation.TypeScriptAndJS, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "this", ErrorRecoverySet.RLit);
    setTokenInfo(TokenID.Throw, Reservation.TypeScriptAndJS, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "throw", ErrorRecoverySet.Stmt);
    setTokenInfo(TokenID.True, Reservation.TypeScriptAndJS, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "true", ErrorRecoverySet.RLit);
    setTokenInfo(TokenID.Try, Reservation.TypeScriptAndJS, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "try", ErrorRecoverySet.Stmt);
    setTokenInfo(TokenID.TypeOf, Reservation.TypeScriptAndJS, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.Unary, NodeType.Typeof, "typeof", ErrorRecoverySet.Prefix);
    setTokenInfo(TokenID.Var, Reservation.TypeScriptAndJS, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "var", ErrorRecoverySet.Var);
    setTokenInfo(TokenID.Void, Reservation.TypeScriptAndJS, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.Unary, NodeType.Void, "void", ErrorRecoverySet.Prefix);
    setTokenInfo(TokenID.With, Reservation.TypeScriptAndJS, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.With, "with", ErrorRecoverySet.Stmt);
    setTokenInfo(TokenID.While, Reservation.TypeScriptAndJS, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "while", ErrorRecoverySet.While);
    setTokenInfo(TokenID.Yield, Reservation.JavascriptFutureStrict, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "yield", ErrorRecoverySet.None);
    setTokenInfo(TokenID.Identifier, Reservation.None, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "identifier", ErrorRecoverySet.ID);
    setTokenInfo(TokenID.NumberLiteral, Reservation.None, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "numberLiteral", ErrorRecoverySet.Literal);
    setTokenInfo(TokenID.RegularExpressionLiteral, Reservation.None, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "regex", ErrorRecoverySet.RegExp);
    setTokenInfo(TokenID.StringLiteral, Reservation.None, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "qstring", ErrorRecoverySet.Literal);
    // Non-operator non-identifier tokens
    setTokenInfo(TokenID.Semicolon, Reservation.None, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, ";", ErrorRecoverySet.SColon); // ;
    setTokenInfo(TokenID.CloseParen, Reservation.None, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, ")", ErrorRecoverySet.RParen); // )
    setTokenInfo(TokenID.CloseBracket, Reservation.None, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "]", ErrorRecoverySet.RBrack); // ]
    setTokenInfo(TokenID.OpenBrace, Reservation.None, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "{", ErrorRecoverySet.LCurly); // {
    setTokenInfo(TokenID.CloseBrace, Reservation.None, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "}", ErrorRecoverySet.RCurly); // }
    setTokenInfo(TokenID.DotDotDot, Reservation.None, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "...", ErrorRecoverySet.None); // ...
    // Operator non-identifier tokens
    setTokenInfo(TokenID.Comma, Reservation.None, OperatorPrecedence.Comma, NodeType.Comma, OperatorPrecedence.None, NodeType.None, ",", ErrorRecoverySet.Comma); // ,
    setTokenInfo(TokenID.Equals, Reservation.None, OperatorPrecedence.Assignment, NodeType.Asg, OperatorPrecedence.None, NodeType.None, "=", ErrorRecoverySet.Asg); // =
    setTokenInfo(TokenID.PlusEquals, Reservation.None, OperatorPrecedence.Assignment, NodeType.AsgAdd, OperatorPrecedence.None, NodeType.None, "+=", ErrorRecoverySet.BinOp); // +=
    setTokenInfo(TokenID.MinusEquals, Reservation.None, OperatorPrecedence.Assignment, NodeType.AsgSub, OperatorPrecedence.None, NodeType.None, "-=", ErrorRecoverySet.BinOp); // -=
    setTokenInfo(TokenID.AsteriskEquals, Reservation.None, OperatorPrecedence.Assignment, NodeType.AsgMul, OperatorPrecedence.None, NodeType.None, "*=", ErrorRecoverySet.BinOp); // *=
    setTokenInfo(TokenID.SlashEquals, Reservation.None, OperatorPrecedence.Assignment, NodeType.AsgDiv, OperatorPrecedence.None, NodeType.None, "/=", ErrorRecoverySet.BinOp); // /=
    setTokenInfo(TokenID.PercentEquals, Reservation.None, OperatorPrecedence.Assignment, NodeType.AsgMod, OperatorPrecedence.None, NodeType.None, "%=", ErrorRecoverySet.BinOp); // %=
    setTokenInfo(TokenID.AmpersandEquals, Reservation.None, OperatorPrecedence.Assignment, NodeType.AsgAnd, OperatorPrecedence.None, NodeType.None, "&=", ErrorRecoverySet.BinOp); // &=
    setTokenInfo(TokenID.CaretEquals, Reservation.None, OperatorPrecedence.Assignment, NodeType.AsgXor, OperatorPrecedence.None, NodeType.None, "^=", ErrorRecoverySet.BinOp); // ^=
    setTokenInfo(TokenID.BarEquals, Reservation.None, OperatorPrecedence.Assignment, NodeType.AsgOr, OperatorPrecedence.None, NodeType.None, "|=", ErrorRecoverySet.BinOp); // |=
    setTokenInfo(TokenID.LessThanLessThanEquals, Reservation.None, OperatorPrecedence.Assignment, NodeType.AsgLsh, OperatorPrecedence.None, NodeType.None, "<<=", ErrorRecoverySet.BinOp); // <<=
    setTokenInfo(TokenID.GreaterThanGreaterThanEquals, Reservation.None, OperatorPrecedence.Assignment, NodeType.AsgRsh, OperatorPrecedence.None, NodeType.None, ">>=", ErrorRecoverySet.BinOp); // >>=
    setTokenInfo(TokenID.GreaterThanGreaterThanGreaterThanEquals, Reservation.None, OperatorPrecedence.Assignment, NodeType.AsgRs2, OperatorPrecedence.None, NodeType.None, ">>>=", ErrorRecoverySet.BinOp); // >>>=
    setTokenInfo(TokenID.Question, Reservation.None, OperatorPrecedence.Conditional, NodeType.ConditionalExpression, OperatorPrecedence.None, NodeType.None, "?", ErrorRecoverySet.BinOp); // ?
    setTokenInfo(TokenID.Colon, Reservation.None, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, ":", ErrorRecoverySet.Colon); // :
    setTokenInfo(TokenID.BarBar, Reservation.None, OperatorPrecedence.LogicalOr, NodeType.LogOr, OperatorPrecedence.None, NodeType.None, "||", ErrorRecoverySet.BinOp); // ||
    setTokenInfo(TokenID.AmpersandAmpersand, Reservation.None, OperatorPrecedence.LogicalAnd, NodeType.LogAnd, OperatorPrecedence.None, NodeType.None, "&&", ErrorRecoverySet.BinOp); // &&
    setTokenInfo(TokenID.Bar, Reservation.None, OperatorPrecedence.BitwiseOr, NodeType.Or, OperatorPrecedence.None, NodeType.None, "|", ErrorRecoverySet.BinOp); // |
    setTokenInfo(TokenID.Caret, Reservation.None, OperatorPrecedence.BitwiseExclusiveOr, NodeType.Xor, OperatorPrecedence.None, NodeType.None, "^", ErrorRecoverySet.BinOp); // ^
    setTokenInfo(TokenID.And, Reservation.None, OperatorPrecedence.BitwiseAnd, NodeType.And, OperatorPrecedence.None, NodeType.None, "&", ErrorRecoverySet.BinOp); // &
    setTokenInfo(TokenID.EqualsEquals, Reservation.None, OperatorPrecedence.Equality, NodeType.Eq, OperatorPrecedence.None, NodeType.None, "==", ErrorRecoverySet.BinOp); // ==
    setTokenInfo(TokenID.ExclamationEquals, Reservation.None, OperatorPrecedence.Equality, NodeType.Ne, OperatorPrecedence.None, NodeType.None, "!=", ErrorRecoverySet.BinOp); // !=
    setTokenInfo(TokenID.EqualsEqualsEquals, Reservation.None, OperatorPrecedence.Equality, NodeType.Eqv, OperatorPrecedence.None, NodeType.None, "===", ErrorRecoverySet.BinOp); // ===
    setTokenInfo(TokenID.ExclamationEqualsEquals, Reservation.None, OperatorPrecedence.Equality, NodeType.NEqv, OperatorPrecedence.None, NodeType.None, "!==", ErrorRecoverySet.BinOp); // !==
    setTokenInfo(TokenID.LessThan, Reservation.None, OperatorPrecedence.Relational, NodeType.Lt, OperatorPrecedence.None, NodeType.None, "<", ErrorRecoverySet.BinOp); // <
    setTokenInfo(TokenID.LessThanEquals, Reservation.None, OperatorPrecedence.Relational, NodeType.Le, OperatorPrecedence.None, NodeType.None, "<=", ErrorRecoverySet.BinOp); // <=
    setTokenInfo(TokenID.GreaterThan, Reservation.None, OperatorPrecedence.Relational, NodeType.Gt, OperatorPrecedence.None, NodeType.None, ">", ErrorRecoverySet.BinOp); // >
    setTokenInfo(TokenID.GreaterThanEquals, Reservation.None, OperatorPrecedence.Relational, NodeType.Ge, OperatorPrecedence.None, NodeType.None, ">=", ErrorRecoverySet.BinOp); // >=
    setTokenInfo(TokenID.LessThanLessThan, Reservation.None, OperatorPrecedence.Shift, NodeType.Lsh, OperatorPrecedence.None, NodeType.None, "<<", ErrorRecoverySet.BinOp); // <<
    setTokenInfo(TokenID.GreaterThanGreaterThan, Reservation.None, OperatorPrecedence.Shift, NodeType.Rsh, OperatorPrecedence.None, NodeType.None, ">>", ErrorRecoverySet.BinOp); // >>
    setTokenInfo(TokenID.GreaterThanGreaterThanGreaterThan, Reservation.None, OperatorPrecedence.Shift, NodeType.Rs2, OperatorPrecedence.None, NodeType.None, ">>>", ErrorRecoverySet.BinOp); // >>>
    setTokenInfo(TokenID.Plus, Reservation.None, OperatorPrecedence.Additive, NodeType.Add, OperatorPrecedence.Unary, NodeType.Pos, "+", ErrorRecoverySet.AddOp); // +
    setTokenInfo(TokenID.Minus, Reservation.None, OperatorPrecedence.Additive, NodeType.Sub, OperatorPrecedence.Unary, NodeType.Neg, "-", ErrorRecoverySet.AddOp); // -
    setTokenInfo(TokenID.Asterisk, Reservation.None, OperatorPrecedence.Multiplicative, NodeType.Mul, OperatorPrecedence.None, NodeType.None, "*", ErrorRecoverySet.BinOp); // *
    setTokenInfo(TokenID.Slash, Reservation.None, OperatorPrecedence.Multiplicative, NodeType.Div, OperatorPrecedence.None, NodeType.None, "/", ErrorRecoverySet.BinOp); // /
    setTokenInfo(TokenID.Percent, Reservation.None, OperatorPrecedence.Multiplicative, NodeType.Mod, OperatorPrecedence.None, NodeType.None, "%", ErrorRecoverySet.BinOp); // %
    setTokenInfo(TokenID.Tilde, Reservation.None, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.Unary, NodeType.Not, "~", ErrorRecoverySet.PreOp); // ~
    setTokenInfo(TokenID.Exclamation, Reservation.None, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.Unary, NodeType.LogNot, "!", ErrorRecoverySet.PreOp); // !
    setTokenInfo(TokenID.PlusPlus, Reservation.None, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.Unary, NodeType.IncPre, "++", ErrorRecoverySet.PreOp); // ++
    setTokenInfo(TokenID.MinusMinus, Reservation.None, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.Unary, NodeType.DecPre, "--", ErrorRecoverySet.PreOp); // --
    setTokenInfo(TokenID.OpenParen, Reservation.None, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "(", ErrorRecoverySet.LParen); // (
    setTokenInfo(TokenID.OpenBracket, Reservation.None, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "[", ErrorRecoverySet.LBrack); // [
    setTokenInfo(TokenID.Dot, Reservation.None, OperatorPrecedence.Unary, NodeType.None, OperatorPrecedence.None, NodeType.None, ".", ErrorRecoverySet.Dot); // .
    setTokenInfo(TokenID.EndOfFile, Reservation.None, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "<EOF>", ErrorRecoverySet.EOF); // EOF
    setTokenInfo(TokenID.EqualsGreaterThan, Reservation.None, OperatorPrecedence.None, NodeType.None, OperatorPrecedence.None, NodeType.None, "=>", ErrorRecoverySet.None); // =>
    function lookupToken(tokenId) {
        return TypeScript.tokenTable[tokenId];
    }
    TypeScript.lookupToken = lookupToken;
    var TokenClass;
    (function (TokenClass) {
        TokenClass[TokenClass["Punctuation"] = 0] = "Punctuation";
        TokenClass[TokenClass["Keyword"] = 1] = "Keyword";
        TokenClass[TokenClass["Operator"] = 2] = "Operator";
        TokenClass[TokenClass["Comment"] = 3] = "Comment";
        TokenClass[TokenClass["Whitespace"] = 4] = "Whitespace";
        TokenClass[TokenClass["Identifier"] = 5] = "Identifier";
        TokenClass[TokenClass["Literal"] = 6] = "Literal";
    })(TokenClass = TypeScript.TokenClass || (TypeScript.TokenClass = {}));
    var SavedToken = /** @class */ (function () {
        function SavedToken(tok, minChar, limChar) {
            this.tok = tok;
            this.minChar = minChar;
            this.limChar = limChar;
        }
        return SavedToken;
    }());
    TypeScript.SavedToken = SavedToken;
    var Token = /** @class */ (function () {
        function Token(tokenId) {
            this.tokenId = tokenId;
        }
        Token.prototype.toString = function () {
            return "token: " + this.tokenId + " " + this.getText() + " (" + TokenID._map[this.tokenId] + ")";
        };
        Token.prototype.print = function (line, outfile) {
            outfile.WriteLine(this.toString() + ",on line" + line);
        };
        Token.prototype.getText = function () {
            return TypeScript.tokenTable[this.tokenId].text;
        };
        Token.prototype.classification = function () {
            if (this.tokenId <= TokenID.LimKeyword) {
                return TokenClass.Keyword;
            }
            else {
                var tokenInfo = lookupToken(this.tokenId);
                if (tokenInfo != undefined) {
                    if ((tokenInfo.unopNodeType != NodeType.None) ||
                        (tokenInfo.binopNodeType != NodeType.None)) {
                        return TokenClass.Operator;
                    }
                }
            }
            return TokenClass.Punctuation;
        };
        return Token;
    }());
    TypeScript.Token = Token;
    var NumberLiteralToken = /** @class */ (function (_super) {
        __extends(NumberLiteralToken, _super);
        function NumberLiteralToken(value, hasEmptyFraction) {
            var _this = _super.call(this, TokenID.NumberLiteral) || this;
            _this.value = value;
            _this.hasEmptyFraction = hasEmptyFraction;
            return _this;
        }
        NumberLiteralToken.prototype.getText = function () {
            return this.hasEmptyFraction ? this.value.toString() + ".0" : this.value.toString();
        };
        NumberLiteralToken.prototype.classification = function () {
            return TokenClass.Literal;
        };
        return NumberLiteralToken;
    }(Token));
    TypeScript.NumberLiteralToken = NumberLiteralToken;
    var StringLiteralToken = /** @class */ (function (_super) {
        __extends(StringLiteralToken, _super);
        function StringLiteralToken(value) {
            var _this = _super.call(this, TokenID.StringLiteral) || this;
            _this.value = value;
            return _this;
        }
        StringLiteralToken.prototype.getText = function () {
            return this.value;
        };
        StringLiteralToken.prototype.classification = function () {
            return TokenClass.Literal;
        };
        return StringLiteralToken;
    }(Token));
    TypeScript.StringLiteralToken = StringLiteralToken;
    var IdentifierToken = /** @class */ (function (_super) {
        __extends(IdentifierToken, _super);
        function IdentifierToken(value, hasEscapeSequence) {
            var _this = _super.call(this, TokenID.Identifier) || this;
            _this.value = value;
            _this.hasEscapeSequence = hasEscapeSequence;
            return _this;
        }
        IdentifierToken.prototype.getText = function () {
            return this.value;
        };
        IdentifierToken.prototype.classification = function () {
            return TokenClass.Identifier;
        };
        return IdentifierToken;
    }(Token));
    TypeScript.IdentifierToken = IdentifierToken;
    var WhitespaceToken = /** @class */ (function (_super) {
        __extends(WhitespaceToken, _super);
        function WhitespaceToken(tokenId, value) {
            var _this = _super.call(this, tokenId) || this;
            _this.value = value;
            return _this;
        }
        WhitespaceToken.prototype.getText = function () {
            return this.value;
        };
        WhitespaceToken.prototype.classification = function () {
            return TokenClass.Whitespace;
        };
        return WhitespaceToken;
    }(Token));
    TypeScript.WhitespaceToken = WhitespaceToken;
    var CommentToken = /** @class */ (function (_super) {
        __extends(CommentToken, _super);
        function CommentToken(tokenID, value, isBlock, startPos, line, endsLine) {
            var _this = _super.call(this, tokenID) || this;
            _this.value = value;
            _this.isBlock = isBlock;
            _this.startPos = startPos;
            _this.line = line;
            _this.endsLine = endsLine;
            return _this;
        }
        CommentToken.prototype.getText = function () {
            return this.value;
        };
        CommentToken.prototype.classification = function () {
            return TokenClass.Comment;
        };
        return CommentToken;
    }(Token));
    TypeScript.CommentToken = CommentToken;
    var RegularExpressionLiteralToken = /** @class */ (function (_super) {
        __extends(RegularExpressionLiteralToken, _super);
        function RegularExpressionLiteralToken(regex) {
            var _this = _super.call(this, TokenID.RegularExpressionLiteral) || this;
            _this.regex = regex;
            return _this;
        }
        RegularExpressionLiteralToken.prototype.getText = function () {
            return this.regex.toString();
        };
        RegularExpressionLiteralToken.prototype.classification = function () {
            return TokenClass.Literal;
        };
        return RegularExpressionLiteralToken;
    }(Token));
    TypeScript.RegularExpressionLiteralToken = RegularExpressionLiteralToken;
    // TODO: new with length TokenID.LimFixed
    TypeScript.staticTokens = new Token[];
    function initializeStaticTokens() {
        for (var i = 0; i <= TokenID.LimFixed; i++) {
            TypeScript.staticTokens[i] = new Token(i);
        }
    }
    TypeScript.initializeStaticTokens = initializeStaticTokens;
})(TypeScript || (TypeScript = {}));
