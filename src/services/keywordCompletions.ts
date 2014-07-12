// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

///<reference path='typescriptServices.ts' />

module TypeScript.Services {
    export class KeywordCompletions {
        private static keywords = [
            "break",
            "case",
            "catch",
            "class",
            "constructor",
            "continue",
            "debugger",
            "declare",
            "default",
            "delete",
            "do",
            "else",
            "enum",
            "export",
            "extends",
            "false",
            "finally",
            "for",
            "function",
            "get",
            "if",
            "implements",
            "import",
            "in",
            "instanceof",
            "interface",
            "module",
            "new",
            "null",
            "private",
            "public",
            "require",
            "return",
            "set",
            "static",
            "super",
            "switch",
            "this",
            "throw",
            "true",
            "try",
            "typeof",
            "var",
            "while",
            "with",
        ];

        private static keywordCompletions: ResolvedCompletionEntry[] = null;

        public static getKeywordCompltions(): ResolvedCompletionEntry[]{
            if (KeywordCompletions.keywordCompletions === null) {
                var completions: ResolvedCompletionEntry[] = [];
                for (var i = 0, n = KeywordCompletions.keywords.length; i < n; i++) {
                    var keyword = KeywordCompletions.keywords[i];
                    var entry = new ResolvedCompletionEntry(/*name*/ keyword, ScriptElementKind.keyword, ScriptElementKindModifier.none, /*type*/null, /*fullName*/ keyword, /*docComment*/ null);
                    completions.push(entry);
                }

                KeywordCompletions.keywordCompletions = completions;            }

            return KeywordCompletions.keywordCompletions;
        }
    }
}