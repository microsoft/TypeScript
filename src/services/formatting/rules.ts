//
// Copyright (c) Microsoft Corporation.  All rights reserved.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

///<reference path='references.ts' />

module ts.formatting {
    export class Rules {
        public getRuleName(rule: Rule) {
            var o: ts.Map<any> = <any>this;
            for (var name in o) {
                if (o[name] === rule) {
                    return name;
                }
            }
            throw new Error("Unknown rule");
        }

        [name: string]: any;

        public IgnoreBeforeComment: Rule;
        public IgnoreAfterLineComment: Rule;

        // Space after keyword but not before ; or : or ?
        public NoSpaceBeforeSemicolon: Rule;
        public NoSpaceBeforeColon: Rule;
        public NoSpaceBeforeQMark: Rule;
        public SpaceAfterColon: Rule;
        public SpaceAfterQMark: Rule;
        public SpaceAfterSemicolon: Rule;

        // Space/new line after }.
        public SpaceAfterCloseBrace: Rule;

        // Special case for (}, else) and (}, while) since else & while tokens are not part of the tree which makes SpaceAfterCloseBrace rule not applied
        // Also should not apply to })
        public SpaceBetweenCloseBraceAndElse: Rule;
        public SpaceBetweenCloseBraceAndWhile: Rule;
        public NoSpaceAfterCloseBrace: Rule;

        // No space for indexer and dot
        public NoSpaceBeforeDot: Rule;
        public NoSpaceAfterDot: Rule;
        public NoSpaceBeforeOpenBracket: Rule;
        public NoSpaceAfterOpenBracket: Rule;
        public NoSpaceBeforeCloseBracket: Rule;
        public NoSpaceAfterCloseBracket: Rule;

        // Insert a space after { and before } in single-line contexts, but remove space from empty object literals {}.
        public SpaceAfterOpenBrace: Rule;
        public SpaceBeforeCloseBrace: Rule;
        public NoSpaceBetweenEmptyBraceBrackets: Rule;

        // Insert new line after { and before } in multi-line contexts.
        public NewLineAfterOpenBraceInBlockContext: Rule;

        // For functions and control block place } on a new line    [multi-line rule]
        public NewLineBeforeCloseBraceInBlockContext: Rule;

        // Special handling of unary operators.
        // Prefix operators generally shouldn't have a space between
        // them and their target unary expression.
        public NoSpaceAfterUnaryPrefixOperator: Rule;
        public NoSpaceAfterUnaryPreincrementOperator: Rule;
        public NoSpaceAfterUnaryPredecrementOperator: Rule;
        public NoSpaceBeforeUnaryPostincrementOperator: Rule;
        public NoSpaceBeforeUnaryPostdecrementOperator: Rule;

        // More unary operator special-casing.
        // DevDiv 181814:  Be careful when removing leading whitespace
        // around unary operators.  Examples:
        //      1 - -2  --X-->  1--2
        //      a + ++b --X-->  a+++b
        public SpaceAfterPostincrementWhenFollowedByAdd: Rule;
        public SpaceAfterAddWhenFollowedByUnaryPlus: Rule;
        public SpaceAfterAddWhenFollowedByPreincrement: Rule;
        public SpaceAfterPostdecrementWhenFollowedBySubtract: Rule;
        public SpaceAfterSubtractWhenFollowedByUnaryMinus: Rule;
        public SpaceAfterSubtractWhenFollowedByPredecrement: Rule;

        public NoSpaceBeforeComma: Rule;

        public SpaceAfterCertainKeywords: Rule;
        public NoSpaceBeforeOpenParenInFuncCall: Rule;
        public SpaceAfterFunctionInFuncDecl: Rule;
        public NoSpaceBeforeOpenParenInFuncDecl: Rule;
        public SpaceAfterVoidOperator: Rule;

        public NoSpaceBetweenReturnAndSemicolon: Rule;

        // Add a space between statements. All keywords except (do,else,case) has open/close parens after them.
        // So, we have a rule to add a space for [),Any], [do,Any], [else,Any], and [case,Any]
        public SpaceBetweenStatements: Rule;

        // This low-pri rule takes care of "try {" and "finally {" in case the rule SpaceBeforeOpenBraceInControl didn't execute on FormatOnEnter.
        public SpaceAfterTryFinally: Rule;

        // For get/set members, we check for (identifier,identifier) since get/set don't have tokens and they are represented as just an identifier token.
        // Though, we do extra check on the context to make sure we are dealing with get/set node. Example:
        //      get x() {}
        //      set x(val) {}
        public SpaceAfterGetSetInMember: Rule;

        // Special case for binary operators (that are keywords). For these we have to add a space and shouldn't follow any user options.
        public SpaceBeforeBinaryKeywordOperator: Rule;
        public SpaceAfterBinaryKeywordOperator: Rule;

        // TypeScript-specific rules

        // Treat constructor as an identifier in a function declaration, and remove spaces between constructor and following left parentheses
        public NoSpaceAfterConstructor: Rule;

        // Use of module as a function call. e.g.: import m2 = module("m2");
        public NoSpaceAfterModuleImport: Rule;

        // Add a space around certain TypeScript keywords
        public SpaceAfterCertainTypeScriptKeywords: Rule;
        public SpaceBeforeCertainTypeScriptKeywords: Rule;

        // Treat string literals in module names as identifiers, and add a space between the literal and the opening Brace braces, e.g.: module "m2" {
        public SpaceAfterModuleName: Rule;

        // Lambda expressions
        public SpaceAfterArrow: Rule;

        // Optional parameters and var args
        public NoSpaceAfterEllipsis: Rule;
        public NoSpaceAfterOptionalParameters: Rule;

        // generics
        public NoSpaceBeforeOpenAngularBracket: Rule;
        public NoSpaceBetweenCloseParenAndAngularBracket: Rule;
        public NoSpaceAfterOpenAngularBracket: Rule;
        public NoSpaceBeforeCloseAngularBracket: Rule;
        public NoSpaceAfterCloseAngularBracket: Rule;

        // Remove spaces in empty interface literals. e.g.: x: {}
        public NoSpaceBetweenEmptyInterfaceBraceBrackets: Rule;

        // These rules are higher in priority than user-configurable rules.
        public HighPriorityCommonRules: Rule[];

        // These rules are lower in priority than user-configurable rules.
        public LowPriorityCommonRules: Rule[];

        ///
        /// Rules controlled by user options
        ///

        // Insert space after comma delimiter
        public SpaceAfterComma: Rule;
        public NoSpaceAfterComma: Rule;

        // Insert space before and after binary operators
        public SpaceBeforeBinaryOperator: Rule;
        public SpaceAfterBinaryOperator: Rule;
        public NoSpaceBeforeBinaryOperator: Rule;
        public NoSpaceAfterBinaryOperator: Rule;

        // Insert space after keywords in control flow statements
        public SpaceAfterKeywordInControl: Rule;
        public NoSpaceAfterKeywordInControl: Rule;

        // Open Brace braces after function
        //TypeScript: Function can have return types, which can be made of tons of different token kinds
        public FunctionOpenBraceLeftTokenRange: Shared.TokenRange;
        public SpaceBeforeOpenBraceInFunction: Rule;
        public NewLineBeforeOpenBraceInFunction: Rule;

        // Open Brace braces after TypeScript module/class/interface
        public TypeScriptOpenBraceLeftTokenRange: Shared.TokenRange;
        public SpaceBeforeOpenBraceInTypeScriptDeclWithBlock: Rule;
        public NewLineBeforeOpenBraceInTypeScriptDeclWithBlock: Rule;

        // Open Brace braces after control block
        public ControlOpenBraceLeftTokenRange: Shared.TokenRange;
        public SpaceBeforeOpenBraceInControl: Rule;
        public NewLineBeforeOpenBraceInControl: Rule;

        // Insert space after semicolon in for statement
        public SpaceAfterSemicolonInFor: Rule;
        public NoSpaceAfterSemicolonInFor: Rule;

        // Insert space after opening and before closing nonempty parenthesis
        public SpaceAfterOpenParen: Rule;
        public SpaceBeforeCloseParen: Rule;
        public NoSpaceBetweenParens: Rule;
        public NoSpaceAfterOpenParen: Rule;
        public NoSpaceBeforeCloseParen: Rule;

        // Insert space after function keyword for anonymous functions
        public SpaceAfterAnonymousFunctionKeyword: Rule;
        public NoSpaceAfterAnonymousFunctionKeyword: Rule;

        constructor() {
            ///
            /// Common Rules
            ///

            // Leave comments alone
            this.IgnoreBeforeComment = new Rule(RuleDescriptor.create4(Shared.TokenRange.Any, Shared.TokenRange.Comments), RuleOperation.create1(RuleAction.Ignore));
            this.IgnoreAfterLineComment = new Rule(RuleDescriptor.create3(SyntaxKind.SingleLineCommentTrivia, Shared.TokenRange.Any), RuleOperation.create1(RuleAction.Ignore));

            // Space after keyword but not before ; or : or ?
            this.NoSpaceBeforeSemicolon = new Rule(RuleDescriptor.create2(Shared.TokenRange.Any, SyntaxKind.SemicolonToken), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext), RuleAction.Delete));
            this.NoSpaceBeforeColon = new Rule(RuleDescriptor.create2(Shared.TokenRange.Any, SyntaxKind.ColonToken), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext, Rules.IsNotBinaryOpContext), RuleAction.Delete));
            this.NoSpaceBeforeQMark = new Rule(RuleDescriptor.create2(Shared.TokenRange.Any, SyntaxKind.QuestionToken), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext, Rules.IsNotBinaryOpContext), RuleAction.Delete));
            this.SpaceAfterColon = new Rule(RuleDescriptor.create3(SyntaxKind.ColonToken, Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext, Rules.IsNotBinaryOpContext), RuleAction.Space));
            this.SpaceAfterQMark = new Rule(RuleDescriptor.create3(SyntaxKind.QuestionToken, Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext, Rules.IsNotBinaryOpContext), RuleAction.Space));
            this.SpaceAfterSemicolon = new Rule(RuleDescriptor.create3(SyntaxKind.SemicolonToken, Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext), RuleAction.Space));

            // Space after }.
            this.SpaceAfterCloseBrace = new Rule(RuleDescriptor.create3(SyntaxKind.CloseBraceToken, Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext, Rules.IsAfterCodeBlockContext), RuleAction.Space));

            // Special case for (}, else) and (}, while) since else & while tokens are not part of the tree which makes SpaceAfterCloseBrace rule not applied
            this.SpaceBetweenCloseBraceAndElse = new Rule(RuleDescriptor.create1(SyntaxKind.CloseBraceToken, SyntaxKind.ElseKeyword), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext), RuleAction.Space));
            this.SpaceBetweenCloseBraceAndWhile = new Rule(RuleDescriptor.create1(SyntaxKind.CloseBraceToken, SyntaxKind.WhileKeyword), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext), RuleAction.Space));
            this.NoSpaceAfterCloseBrace = new Rule(RuleDescriptor.create3(SyntaxKind.CloseBraceToken, Shared.TokenRange.FromTokens([SyntaxKind.CloseParenToken, SyntaxKind.CloseBracketToken, SyntaxKind.CommaToken, SyntaxKind.SemicolonToken])), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext), RuleAction.Delete));

            // No space for indexer and dot
            this.NoSpaceBeforeDot = new Rule(RuleDescriptor.create2(Shared.TokenRange.Any, SyntaxKind.DotToken), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext), RuleAction.Delete));
            this.NoSpaceAfterDot = new Rule(RuleDescriptor.create3(SyntaxKind.DotToken, Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext), RuleAction.Delete));
            this.NoSpaceBeforeOpenBracket = new Rule(RuleDescriptor.create2(Shared.TokenRange.Any, SyntaxKind.OpenBracketToken), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext), RuleAction.Delete));
            this.NoSpaceAfterOpenBracket = new Rule(RuleDescriptor.create3(SyntaxKind.OpenBracketToken, Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext), RuleAction.Delete));
            this.NoSpaceBeforeCloseBracket = new Rule(RuleDescriptor.create2(Shared.TokenRange.Any, SyntaxKind.CloseBracketToken), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext), RuleAction.Delete));
            this.NoSpaceAfterCloseBracket = new Rule(RuleDescriptor.create3(SyntaxKind.CloseBracketToken, Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext), RuleAction.Delete));

            // Place a space before open brace in a function declaration
            this.FunctionOpenBraceLeftTokenRange = Shared.TokenRange.AnyIncludingMultilineComments;
            this.SpaceBeforeOpenBraceInFunction = new Rule(RuleDescriptor.create2(this.FunctionOpenBraceLeftTokenRange, SyntaxKind.OpenBraceToken), RuleOperation.create2(new RuleOperationContext(Rules.IsFunctionDeclContext, Rules.IsNotFormatOnEnter, Rules.IsSameLineTokenOrBeforeMultilineBlockContext), RuleAction.Space), RuleFlags.CanDeleteNewLines);

            // Place a space before open brace in a TypeScript declaration that has braces as children (class, module, enum, etc)
            this.TypeScriptOpenBraceLeftTokenRange = Shared.TokenRange.FromTokens([SyntaxKind.Identifier, SyntaxKind.MultiLineCommentTrivia]);
            this.SpaceBeforeOpenBraceInTypeScriptDeclWithBlock = new Rule(RuleDescriptor.create2(this.TypeScriptOpenBraceLeftTokenRange, SyntaxKind.OpenBraceToken), RuleOperation.create2(new RuleOperationContext(Rules.IsTypeScriptDeclWithBlockContext, Rules.IsNotFormatOnEnter, Rules.IsSameLineTokenOrBeforeMultilineBlockContext), RuleAction.Space), RuleFlags.CanDeleteNewLines);

            // Place a space before open brace in a control flow construct
            this.ControlOpenBraceLeftTokenRange = Shared.TokenRange.FromTokens([SyntaxKind.CloseParenToken, SyntaxKind.MultiLineCommentTrivia, SyntaxKind.DoKeyword, SyntaxKind.TryKeyword, SyntaxKind.FinallyKeyword, SyntaxKind.ElseKeyword]);
            this.SpaceBeforeOpenBraceInControl = new Rule(RuleDescriptor.create2(this.ControlOpenBraceLeftTokenRange, SyntaxKind.OpenBraceToken), RuleOperation.create2(new RuleOperationContext(Rules.IsControlDeclContext, Rules.IsNotFormatOnEnter, Rules.IsSameLineTokenOrBeforeMultilineBlockContext), RuleAction.Space), RuleFlags.CanDeleteNewLines);

            // Insert a space after { and before } in single-line contexts, but remove space from empty object literals {}.
            this.SpaceAfterOpenBrace = new Rule(RuleDescriptor.create3(SyntaxKind.OpenBraceToken, Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsSingleLineBlockContext), RuleAction.Space));
            this.SpaceBeforeCloseBrace = new Rule(RuleDescriptor.create2(Shared.TokenRange.Any, SyntaxKind.CloseBraceToken), RuleOperation.create2(new RuleOperationContext(Rules.IsSingleLineBlockContext), RuleAction.Space));
            this.NoSpaceBetweenEmptyBraceBrackets = new Rule(RuleDescriptor.create1(SyntaxKind.OpenBraceToken, SyntaxKind.CloseBraceToken), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext, Rules.IsObjectContext), RuleAction.Delete));

            // Insert new line after { and before } in multi-line contexts.
            this.NewLineAfterOpenBraceInBlockContext = new Rule(RuleDescriptor.create3(SyntaxKind.OpenBraceToken, Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsMultilineBlockContext), RuleAction.NewLine));

            // For functions and control block place } on a new line    [multi-line rule]
            this.NewLineBeforeCloseBraceInBlockContext = new Rule(RuleDescriptor.create2(Shared.TokenRange.AnyIncludingMultilineComments, SyntaxKind.CloseBraceToken), RuleOperation.create2(new RuleOperationContext(Rules.IsMultilineBlockContext), RuleAction.NewLine));

            // Special handling of unary operators.
            // Prefix operators generally shouldn't have a space between
            // them and their target unary expression.
            this.NoSpaceAfterUnaryPrefixOperator = new Rule(RuleDescriptor.create4(Shared.TokenRange.UnaryPrefixOperators, Shared.TokenRange.UnaryPrefixExpressions), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext, Rules.IsNotBinaryOpContext), RuleAction.Delete));
            this.NoSpaceAfterUnaryPreincrementOperator = new Rule(RuleDescriptor.create3(SyntaxKind.PlusPlusToken, Shared.TokenRange.UnaryPreincrementExpressions), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext), RuleAction.Delete));
            this.NoSpaceAfterUnaryPredecrementOperator = new Rule(RuleDescriptor.create3(SyntaxKind.MinusMinusToken, Shared.TokenRange.UnaryPredecrementExpressions), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext), RuleAction.Delete));
            this.NoSpaceBeforeUnaryPostincrementOperator = new Rule(RuleDescriptor.create2(Shared.TokenRange.UnaryPostincrementExpressions, SyntaxKind.PlusPlusToken), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext), RuleAction.Delete));
            this.NoSpaceBeforeUnaryPostdecrementOperator = new Rule(RuleDescriptor.create2(Shared.TokenRange.UnaryPostdecrementExpressions, SyntaxKind.MinusMinusToken), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext), RuleAction.Delete));

            // More unary operator special-casing.
            // DevDiv 181814:  Be careful when removing leading whitespace
            // around unary operators.  Examples:
            //      1 - -2  --X-->  1--2
            //      a + ++b --X-->  a+++b
            this.SpaceAfterPostincrementWhenFollowedByAdd = new Rule(RuleDescriptor.create1(SyntaxKind.PlusPlusToken, SyntaxKind.PlusToken), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext, Rules.IsBinaryOpContext), RuleAction.Space));
            this.SpaceAfterAddWhenFollowedByUnaryPlus = new Rule(RuleDescriptor.create1(SyntaxKind.PlusToken, SyntaxKind.PlusToken), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext, Rules.IsBinaryOpContext), RuleAction.Space));
            this.SpaceAfterAddWhenFollowedByPreincrement = new Rule(RuleDescriptor.create1(SyntaxKind.PlusToken, SyntaxKind.PlusPlusToken), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext, Rules.IsBinaryOpContext), RuleAction.Space));
            this.SpaceAfterPostdecrementWhenFollowedBySubtract = new Rule(RuleDescriptor.create1(SyntaxKind.MinusMinusToken, SyntaxKind.MinusToken), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext, Rules.IsBinaryOpContext), RuleAction.Space));
            this.SpaceAfterSubtractWhenFollowedByUnaryMinus = new Rule(RuleDescriptor.create1(SyntaxKind.MinusToken, SyntaxKind.MinusToken), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext, Rules.IsBinaryOpContext), RuleAction.Space));
            this.SpaceAfterSubtractWhenFollowedByPredecrement = new Rule(RuleDescriptor.create1(SyntaxKind.MinusToken, SyntaxKind.MinusMinusToken), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext, Rules.IsBinaryOpContext), RuleAction.Space));

            this.NoSpaceBeforeComma = new Rule(RuleDescriptor.create2(Shared.TokenRange.Any, SyntaxKind.CommaToken), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext), RuleAction.Delete));

            this.SpaceAfterCertainKeywords = new Rule(RuleDescriptor.create4(Shared.TokenRange.FromTokens([SyntaxKind.VarKeyword, SyntaxKind.ThrowKeyword, SyntaxKind.NewKeyword, SyntaxKind.DeleteKeyword, SyntaxKind.ReturnKeyword, SyntaxKind.TypeOfKeyword]), Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext), RuleAction.Space));
            this.NoSpaceBeforeOpenParenInFuncCall = new Rule(RuleDescriptor.create2(Shared.TokenRange.Any, SyntaxKind.OpenParenToken), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext, Rules.IsFunctionCallOrNewContext), RuleAction.Delete));
            this.SpaceAfterFunctionInFuncDecl = new Rule(RuleDescriptor.create3(SyntaxKind.FunctionKeyword, Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsFunctionDeclContext), RuleAction.Space));
            this.NoSpaceBeforeOpenParenInFuncDecl = new Rule(RuleDescriptor.create2(Shared.TokenRange.Any, SyntaxKind.OpenParenToken), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext, Rules.IsFunctionDeclContext), RuleAction.Delete));
            this.SpaceAfterVoidOperator = new Rule(RuleDescriptor.create3(SyntaxKind.VoidKeyword, Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext, Rules.IsVoidOpContext), RuleAction.Space));

            this.NoSpaceBetweenReturnAndSemicolon = new Rule(RuleDescriptor.create1(SyntaxKind.ReturnKeyword, SyntaxKind.SemicolonToken), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext), RuleAction.Delete));
            
            // Add a space between statements. All keywords except (do,else,case) has open/close parens after them.
            // So, we have a rule to add a space for [),Any], [do,Any], [else,Any], and [case,Any]
            this.SpaceBetweenStatements = new Rule(RuleDescriptor.create4(Shared.TokenRange.FromTokens([SyntaxKind.CloseParenToken, SyntaxKind.DoKeyword, SyntaxKind.ElseKeyword, SyntaxKind.CaseKeyword]), Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext, Rules.IsNotForContext), RuleAction.Space));

            // This low-pri rule takes care of "try {" and "finally {" in case the rule SpaceBeforeOpenBraceInControl didn't execute on FormatOnEnter.
            this.SpaceAfterTryFinally = new Rule(RuleDescriptor.create2(Shared.TokenRange.FromTokens([SyntaxKind.TryKeyword, SyntaxKind.FinallyKeyword]), SyntaxKind.OpenBraceToken), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext), RuleAction.Space));

            //      get x() {}
            //      set x(val) {}
            this.SpaceAfterGetSetInMember = new Rule(RuleDescriptor.create2(Shared.TokenRange.FromTokens([SyntaxKind.GetKeyword, SyntaxKind.SetKeyword]), SyntaxKind.Identifier), RuleOperation.create2(new RuleOperationContext(Rules.IsFunctionDeclContext), RuleAction.Space));

            // Special case for binary operators (that are keywords). For these we have to add a space and shouldn't follow any user options.
            this.SpaceBeforeBinaryKeywordOperator = new Rule(RuleDescriptor.create4(Shared.TokenRange.Any, Shared.TokenRange.BinaryKeywordOperators), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext, Rules.IsBinaryOpContext), RuleAction.Space));
            this.SpaceAfterBinaryKeywordOperator = new Rule(RuleDescriptor.create4(Shared.TokenRange.BinaryKeywordOperators, Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext, Rules.IsBinaryOpContext), RuleAction.Space));

            // TypeScript-specific higher priority rules

            // Treat constructor as an identifier in a function declaration, and remove spaces between constructor and following left parentheses
            this.NoSpaceAfterConstructor = new Rule(RuleDescriptor.create1(SyntaxKind.ConstructorKeyword, SyntaxKind.OpenParenToken), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext), RuleAction.Delete));

            // Use of module as a function call. e.g.: import m2 = module("m2");
            this.NoSpaceAfterModuleImport = new Rule(RuleDescriptor.create2(Shared.TokenRange.FromTokens([SyntaxKind.ModuleKeyword, SyntaxKind.RequireKeyword]), SyntaxKind.OpenParenToken), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext), RuleAction.Delete));

            // Add a space around certain TypeScript keywords
            this.SpaceAfterCertainTypeScriptKeywords = new Rule(RuleDescriptor.create4(Shared.TokenRange.FromTokens([SyntaxKind.ClassKeyword, SyntaxKind.DeclareKeyword, SyntaxKind.EnumKeyword, SyntaxKind.ExportKeyword, SyntaxKind.ExtendsKeyword, SyntaxKind.GetKeyword, SyntaxKind.ImplementsKeyword, SyntaxKind.ImportKeyword, SyntaxKind.InterfaceKeyword, SyntaxKind.ModuleKeyword, SyntaxKind.PrivateKeyword, SyntaxKind.PublicKeyword, SyntaxKind.SetKeyword, SyntaxKind.StaticKeyword]), Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext), RuleAction.Space));
            this.SpaceBeforeCertainTypeScriptKeywords = new Rule(RuleDescriptor.create4(Shared.TokenRange.Any, Shared.TokenRange.FromTokens([SyntaxKind.ExtendsKeyword, SyntaxKind.ImplementsKeyword])), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext), RuleAction.Space));

            // Treat string literals in module names as identifiers, and add a space between the literal and the opening Brace braces, e.g.: module "m2" {
            this.SpaceAfterModuleName = new Rule(RuleDescriptor.create1(SyntaxKind.StringLiteral, SyntaxKind.OpenBraceToken), RuleOperation.create2(new RuleOperationContext(Rules.IsModuleDeclContext), RuleAction.Space));

            // Lambda expressions
            this.SpaceAfterArrow = new Rule(RuleDescriptor.create3(SyntaxKind.EqualsGreaterThanToken, Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext), RuleAction.Space));

            // Optional parameters and var args
            this.NoSpaceAfterEllipsis = new Rule(RuleDescriptor.create1(SyntaxKind.DotDotDotToken, SyntaxKind.Identifier), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext), RuleAction.Delete));
            this.NoSpaceAfterOptionalParameters = new Rule(RuleDescriptor.create3(SyntaxKind.QuestionToken, Shared.TokenRange.FromTokens([SyntaxKind.CloseParenToken, SyntaxKind.CommaToken])), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext, Rules.IsNotBinaryOpContext), RuleAction.Delete));

            // generics
            this.NoSpaceBeforeOpenAngularBracket = new Rule(RuleDescriptor.create2(Shared.TokenRange.TypeNames, SyntaxKind.LessThanToken), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext, Rules.IsTypeArgumentOrParameterContext), RuleAction.Delete));
            this.NoSpaceBetweenCloseParenAndAngularBracket = new Rule(RuleDescriptor.create1(SyntaxKind.CloseParenToken, SyntaxKind.LessThanToken), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext, Rules.IsTypeArgumentOrParameterContext), RuleAction.Delete));
            this.NoSpaceAfterOpenAngularBracket = new Rule(RuleDescriptor.create3(SyntaxKind.LessThanToken, Shared.TokenRange.TypeNames), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext, Rules.IsTypeArgumentOrParameterContext), RuleAction.Delete));
            this.NoSpaceBeforeCloseAngularBracket = new Rule(RuleDescriptor.create2(Shared.TokenRange.Any, SyntaxKind.GreaterThanToken), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext, Rules.IsTypeArgumentOrParameterContext), RuleAction.Delete));
            this.NoSpaceAfterCloseAngularBracket = new Rule(RuleDescriptor.create3(SyntaxKind.GreaterThanToken, Shared.TokenRange.FromTokens([SyntaxKind.OpenParenToken, SyntaxKind.OpenBracketToken, SyntaxKind.GreaterThanToken, SyntaxKind.CommaToken])), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext, Rules.IsTypeArgumentOrParameterContext), RuleAction.Delete));

            // Remove spaces in empty interface literals. e.g.: x: {}
            this.NoSpaceBetweenEmptyInterfaceBraceBrackets = new Rule(RuleDescriptor.create1(SyntaxKind.OpenBraceToken, SyntaxKind.CloseBraceToken), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext, Rules.IsObjectTypeContext), RuleAction.Delete));

            // These rules are higher in priority than user-configurable rules.
            this.HighPriorityCommonRules =
            [
                this.IgnoreBeforeComment, this.IgnoreAfterLineComment,
                this.NoSpaceBeforeColon, this.SpaceAfterColon, this.NoSpaceBeforeQMark, this.SpaceAfterQMark,
                this.NoSpaceBeforeDot, this.NoSpaceAfterDot,
                this.NoSpaceAfterUnaryPrefixOperator,
                this.NoSpaceAfterUnaryPreincrementOperator, this.NoSpaceAfterUnaryPredecrementOperator,
                this.NoSpaceBeforeUnaryPostincrementOperator, this.NoSpaceBeforeUnaryPostdecrementOperator,
                this.SpaceAfterPostincrementWhenFollowedByAdd,
                this.SpaceAfterAddWhenFollowedByUnaryPlus, this.SpaceAfterAddWhenFollowedByPreincrement,
                this.SpaceAfterPostdecrementWhenFollowedBySubtract,
                this.SpaceAfterSubtractWhenFollowedByUnaryMinus, this.SpaceAfterSubtractWhenFollowedByPredecrement,
                this.NoSpaceAfterCloseBrace,
                this.SpaceAfterOpenBrace, this.SpaceBeforeCloseBrace, this.NewLineBeforeCloseBraceInBlockContext,
                this.SpaceAfterCloseBrace, this.SpaceBetweenCloseBraceAndElse, this.SpaceBetweenCloseBraceAndWhile, this.NoSpaceBetweenEmptyBraceBrackets,
                this.SpaceAfterFunctionInFuncDecl, this.NewLineAfterOpenBraceInBlockContext, this.SpaceAfterGetSetInMember,
                this.NoSpaceBetweenReturnAndSemicolon,
                this.SpaceAfterCertainKeywords,
                this.NoSpaceBeforeOpenParenInFuncCall,
                this.SpaceBeforeBinaryKeywordOperator, this.SpaceAfterBinaryKeywordOperator,
                this.SpaceAfterVoidOperator,

                // TypeScript-specific rules
                this.NoSpaceAfterConstructor, this.NoSpaceAfterModuleImport,
                this.SpaceAfterCertainTypeScriptKeywords, this.SpaceBeforeCertainTypeScriptKeywords,
                this.SpaceAfterModuleName,
                this.SpaceAfterArrow,
                this.NoSpaceAfterEllipsis,
                this.NoSpaceAfterOptionalParameters,
                this.NoSpaceBetweenEmptyInterfaceBraceBrackets,
                this.NoSpaceBeforeOpenAngularBracket,
                this.NoSpaceBetweenCloseParenAndAngularBracket,
                this.NoSpaceAfterOpenAngularBracket,
                this.NoSpaceBeforeCloseAngularBracket,
                this.NoSpaceAfterCloseAngularBracket
            ];

            // These rules are lower in priority than user-configurable rules.
            this.LowPriorityCommonRules =
            [
                this.NoSpaceBeforeSemicolon,
                this.SpaceBeforeOpenBraceInControl, this.SpaceBeforeOpenBraceInFunction, this.SpaceBeforeOpenBraceInTypeScriptDeclWithBlock,
                this.NoSpaceBeforeComma,
                this.NoSpaceBeforeOpenBracket, this.NoSpaceAfterOpenBracket,
                this.NoSpaceBeforeCloseBracket, this.NoSpaceAfterCloseBracket,
                this.SpaceAfterSemicolon,
                this.NoSpaceBeforeOpenParenInFuncDecl,
                this.SpaceBetweenStatements, this.SpaceAfterTryFinally
            ];

            ///
            /// Rules controlled by user options
            ///

            // Insert space after comma delimiter
            this.SpaceAfterComma = new Rule(RuleDescriptor.create3(SyntaxKind.CommaToken, Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext), RuleAction.Space));
            this.NoSpaceAfterComma = new Rule(RuleDescriptor.create3(SyntaxKind.CommaToken, Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext), RuleAction.Delete));

            // Insert space before and after binary operators
            this.SpaceBeforeBinaryOperator = new Rule(RuleDescriptor.create4(Shared.TokenRange.Any, Shared.TokenRange.BinaryOperators), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext, Rules.IsBinaryOpContext), RuleAction.Space));
            this.SpaceAfterBinaryOperator = new Rule(RuleDescriptor.create4(Shared.TokenRange.BinaryOperators, Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext, Rules.IsBinaryOpContext), RuleAction.Space));
            this.NoSpaceBeforeBinaryOperator = new Rule(RuleDescriptor.create4(Shared.TokenRange.Any, Shared.TokenRange.BinaryOperators), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext, Rules.IsBinaryOpContext), RuleAction.Delete));
            this.NoSpaceAfterBinaryOperator = new Rule(RuleDescriptor.create4(Shared.TokenRange.BinaryOperators, Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext, Rules.IsBinaryOpContext), RuleAction.Delete));

            // Insert space after keywords in control flow statements
            this.SpaceAfterKeywordInControl = new Rule(RuleDescriptor.create2(Shared.TokenRange.Keywords, SyntaxKind.OpenParenToken), RuleOperation.create2(new RuleOperationContext(Rules.IsControlDeclContext), RuleAction.Space));
            this.NoSpaceAfterKeywordInControl = new Rule(RuleDescriptor.create2(Shared.TokenRange.Keywords, SyntaxKind.OpenParenToken), RuleOperation.create2(new RuleOperationContext(Rules.IsControlDeclContext), RuleAction.Delete));

            // Open Brace braces after function
            //TypeScript: Function can have return types, which can be made of tons of different token kinds
            this.NewLineBeforeOpenBraceInFunction = new Rule(RuleDescriptor.create2(this.FunctionOpenBraceLeftTokenRange, SyntaxKind.OpenBraceToken), RuleOperation.create2(new RuleOperationContext(Rules.IsFunctionDeclContext, Rules.IsBeforeMultilineBlockContext), RuleAction.NewLine), RuleFlags.CanDeleteNewLines);

            // Open Brace braces after TypeScript module/class/interface
            this.NewLineBeforeOpenBraceInTypeScriptDeclWithBlock = new Rule(RuleDescriptor.create2(this.TypeScriptOpenBraceLeftTokenRange, SyntaxKind.OpenBraceToken), RuleOperation.create2(new RuleOperationContext(Rules.IsTypeScriptDeclWithBlockContext, Rules.IsBeforeMultilineBlockContext), RuleAction.NewLine), RuleFlags.CanDeleteNewLines);

            // Open Brace braces after control block
            this.NewLineBeforeOpenBraceInControl = new Rule(RuleDescriptor.create2(this.ControlOpenBraceLeftTokenRange, SyntaxKind.OpenBraceToken), RuleOperation.create2(new RuleOperationContext(Rules.IsControlDeclContext, Rules.IsBeforeMultilineBlockContext), RuleAction.NewLine), RuleFlags.CanDeleteNewLines);

            // Insert space after semicolon in for statement
            this.SpaceAfterSemicolonInFor = new Rule(RuleDescriptor.create3(SyntaxKind.SemicolonToken, Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext, Rules.IsForContext), RuleAction.Space));
            this.NoSpaceAfterSemicolonInFor = new Rule(RuleDescriptor.create3(SyntaxKind.SemicolonToken, Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext, Rules.IsForContext), RuleAction.Delete));

            // Insert space after opening and before closing nonempty parenthesis
            this.SpaceAfterOpenParen = new Rule(RuleDescriptor.create3(SyntaxKind.OpenParenToken, Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext), RuleAction.Space));
            this.SpaceBeforeCloseParen = new Rule(RuleDescriptor.create2(Shared.TokenRange.Any, SyntaxKind.CloseParenToken), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext), RuleAction.Space));
            this.NoSpaceBetweenParens = new Rule(RuleDescriptor.create1(SyntaxKind.OpenParenToken, SyntaxKind.CloseParenToken), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext), RuleAction.Delete));
            this.NoSpaceAfterOpenParen = new Rule(RuleDescriptor.create3(SyntaxKind.OpenParenToken, Shared.TokenRange.Any), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext), RuleAction.Delete));
            this.NoSpaceBeforeCloseParen = new Rule(RuleDescriptor.create2(Shared.TokenRange.Any, SyntaxKind.CloseParenToken), RuleOperation.create2(new RuleOperationContext(Rules.IsSameLineTokenContext), RuleAction.Delete));

            // Insert space after function keyword for anonymous functions
            this.SpaceAfterAnonymousFunctionKeyword = new Rule(RuleDescriptor.create1(SyntaxKind.FunctionKeyword, SyntaxKind.OpenParenToken), RuleOperation.create2(new RuleOperationContext(Rules.IsFunctionDeclContext), RuleAction.Space));
            this.NoSpaceAfterAnonymousFunctionKeyword = new Rule(RuleDescriptor.create1(SyntaxKind.FunctionKeyword, SyntaxKind.OpenParenToken), RuleOperation.create2(new RuleOperationContext(Rules.IsFunctionDeclContext), RuleAction.Delete));
        }

        ///
        /// Contexts
        ///

        static IsForContext(context: FormattingContext): boolean {
            return context.contextNode.kind === SyntaxKind.ForStatement;
        }

        static IsNotForContext(context: FormattingContext): boolean {
            return !Rules.IsForContext(context);
        }

        static IsBinaryOpContext(context: FormattingContext): boolean {

            switch (context.contextNode.kind) {
                case SyntaxKind.BinaryExpression:
                case SyntaxKind.ConditionalExpression:
                    return true;

                // equal in import a = module('a');
                case SyntaxKind.ImportDeclaration:
                // equal in var a = 0;
                case SyntaxKind.VariableDeclaration:
                // equal in p = 0;
                case SyntaxKind.Parameter:
                case SyntaxKind.EnumMember:
                case SyntaxKind.Property:
                    return context.currentTokenSpan.kind === SyntaxKind.EqualsToken || context.nextTokenSpan.kind === SyntaxKind.EqualsToken;
                // "in" keyword in for (var x in []) { }
                case SyntaxKind.ForInStatement:
                    return context.currentTokenSpan.kind === SyntaxKind.InKeyword || context.nextTokenSpan.kind === SyntaxKind.InKeyword;
            }
            return false;
        }

        static IsNotBinaryOpContext(context: FormattingContext): boolean {
            return !Rules.IsBinaryOpContext(context);
        }

        static IsSameLineTokenOrBeforeMultilineBlockContext(context: FormattingContext): boolean {
            //// This check is mainly used inside SpaceBeforeOpenBraceInControl and SpaceBeforeOpenBraceInFunction.
            ////
            //// Ex: 
            //// if (1)     { ....
            ////      * ) and { are on the same line so apply the rule. Here we don't care whether it's same or multi block context
            ////
            //// Ex: 
            //// if (1)
            //// { ... }
            ////      * ) and { are on differnet lines. We only need to format if the block is multiline context. So in this case we don't format.
            ////
            //// Ex:
            //// if (1) 
            //// { ...
            //// }
            ////      * ) and { are on differnet lines. We only need to format if the block is multiline context. So in this case we format.

            return context.TokensAreOnSameLine() || Rules.IsBeforeMultilineBlockContext(context);
        }

        // This check is done before an open brace in a control construct, a function, or a typescript block declaration
        static IsBeforeMultilineBlockContext(context: FormattingContext): boolean {
            return Rules.IsBeforeBlockContext(context) && !(context.NextNodeAllOnSameLine() || context.NextNodeBlockIsOnOneLine());
        }

        static IsMultilineBlockContext(context: FormattingContext): boolean {
            return Rules.IsBlockContext(context) && !(context.ContextNodeAllOnSameLine() || context.ContextNodeBlockIsOnOneLine());
        }

        static IsSingleLineBlockContext(context: FormattingContext): boolean {
            return Rules.IsBlockContext(context) && (context.ContextNodeAllOnSameLine() || context.ContextNodeBlockIsOnOneLine());
        }

        static IsBlockContext(context: FormattingContext): boolean {
            return Rules.NodeIsBlockContext(context.contextNode);
        }

        static IsBeforeBlockContext(context: FormattingContext): boolean {
            return Rules.NodeIsBlockContext(context.nextTokenParent);
        }

        // IMPORTANT!!! This method must return true ONLY for nodes with open and close braces as immediate children
        static NodeIsBlockContext(node: Node): boolean {
            if (Rules.NodeIsTypeScriptDeclWithBlockContext(node)) {
                // This means we are in a context that looks like a block to the user, but in the grammar is actually not a node (it's a class, module, enum, object type literal, etc).
                return true;
            }

            switch (node.kind) {
                case SyntaxKind.Block:
                case SyntaxKind.SwitchStatement:
                case SyntaxKind.ObjectLiteralExpression:
                case SyntaxKind.TryBlock:
                case SyntaxKind.FinallyBlock:
                case SyntaxKind.ModuleBlock:
                    return true;
            }

            return false;
        }

        static IsFunctionDeclContext(context: FormattingContext): boolean {
            switch (context.contextNode.kind) {
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.Method:
                //case SyntaxKind.MemberFunctionDeclaration:
                case SyntaxKind.GetAccessor:
                case SyntaxKind.SetAccessor:
                ///case SyntaxKind.MethodSignature:
                case SyntaxKind.CallSignature:
                case SyntaxKind.FunctionExpression:
                case SyntaxKind.Constructor:
                case SyntaxKind.ArrowFunction:
                //case SyntaxKind.ConstructorDeclaration:
                //case SyntaxKind.SimpleArrowFunctionExpression:
                //case SyntaxKind.ParenthesizedArrowFunctionExpression:
                case SyntaxKind.InterfaceDeclaration: // This one is not truly a function, but for formatting purposes, it acts just like one
                    return true;
            }

            return false;
        }

        static IsTypeScriptDeclWithBlockContext(context: FormattingContext): boolean {
            return Rules.NodeIsTypeScriptDeclWithBlockContext(context.contextNode);
        }

        static NodeIsTypeScriptDeclWithBlockContext(node: Node): boolean {
            switch (node.kind) {
                case SyntaxKind.ClassDeclaration:
                case SyntaxKind.InterfaceDeclaration:
                case SyntaxKind.EnumDeclaration:
                case SyntaxKind.TypeLiteral:
                case SyntaxKind.ModuleDeclaration:
                    return true;
            }

            return false;
        }

        static IsAfterCodeBlockContext(context: FormattingContext): boolean {
            switch (context.currentTokenParent.kind) {
                case SyntaxKind.ClassDeclaration:
                case SyntaxKind.ModuleDeclaration:
                case SyntaxKind.EnumDeclaration:
                case SyntaxKind.Block:
                case SyntaxKind.TryBlock:
                case SyntaxKind.CatchClause:
                case SyntaxKind.FinallyBlock:
                case SyntaxKind.ModuleBlock:
                case SyntaxKind.SwitchStatement:
                    return true;
            }
            return false;
        }

        static IsControlDeclContext(context: FormattingContext): boolean {
            switch (context.contextNode.kind) {
                case SyntaxKind.IfStatement:
                case SyntaxKind.SwitchStatement:
                case SyntaxKind.ForStatement:
                case SyntaxKind.ForInStatement:
                case SyntaxKind.WhileStatement:
                case SyntaxKind.TryStatement:
                case SyntaxKind.DoStatement:
                case SyntaxKind.WithStatement:
                // TODO
                // case SyntaxKind.ElseClause:
                case SyntaxKind.CatchClause:
                case SyntaxKind.FinallyBlock:
                    return true;

                default:
                    return false;
            }
        }

        static IsObjectContext(context: FormattingContext): boolean {
            return context.contextNode.kind === SyntaxKind.ObjectLiteralExpression;
        }

        static IsFunctionCallContext(context: FormattingContext): boolean {
            return context.contextNode.kind === SyntaxKind.CallExpression;
        }

        static IsNewContext(context: FormattingContext): boolean {
            return context.contextNode.kind === SyntaxKind.NewExpression;
        }

        static IsFunctionCallOrNewContext(context: FormattingContext): boolean {
            return Rules.IsFunctionCallContext(context) || Rules.IsNewContext(context);
        }

        static IsSameLineTokenContext(context: FormattingContext): boolean {
            return context.TokensAreOnSameLine();
        }

        static IsNotFormatOnEnter(context: FormattingContext): boolean {
            return context.formattingRequestKind != FormattingRequestKind.FormatOnEnter;
        }

        static IsModuleDeclContext(context: FormattingContext): boolean {
            return context.contextNode.kind === SyntaxKind.ModuleDeclaration;
        }

        static IsObjectTypeContext(context: FormattingContext): boolean {
            return context.contextNode.kind === SyntaxKind.TypeLiteral;// && context.contextNode.parent.kind !== SyntaxKind.InterfaceDeclaration;
        }

        static IsTypeArgumentOrParameter(token: TextRangeWithKind, parent: Node): boolean {
            if (token.kind !== SyntaxKind.LessThanToken && token.kind !== SyntaxKind.GreaterThanToken) {
                return false;
            }
            switch (parent.kind) {
                case SyntaxKind.TypeReference:
                case SyntaxKind.ClassDeclaration:
                case SyntaxKind.InterfaceDeclaration:
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.FunctionExpression:
                case SyntaxKind.ArrowFunction:
                case SyntaxKind.Method:
                case SyntaxKind.CallSignature:
                case SyntaxKind.ConstructSignature:
                case SyntaxKind.CallExpression:
                case SyntaxKind.NewExpression:
                    return true;
                default:
                    return false;

            }
        }

        static IsTypeArgumentOrParameterContext(context: FormattingContext): boolean {
            return Rules.IsTypeArgumentOrParameter(context.currentTokenSpan, context.currentTokenParent) ||
                Rules.IsTypeArgumentOrParameter(context.nextTokenSpan, context.nextTokenParent);
        }

        static IsVoidOpContext(context: FormattingContext): boolean {
            return context.currentTokenSpan.kind === SyntaxKind.VoidKeyword && context.currentTokenParent.kind === SyntaxKind.VoidExpression;
        }
    }
}