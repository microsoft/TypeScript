// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

///<reference path='references.ts' />

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

        private static keywordCompletions: CompletionEntry[] = null;

        public static getKeywordCompltions(): CompletionEntry[]{
            if (KeywordCompletions.keywordCompletions === null) {
                var completions: CompletionEntry[] = [];
                for (var i = 0, n = KeywordCompletions.keywords.length; i < n; i++) {
                    var keyword = KeywordCompletions.keywords[i];
                    completions.push({
                        name: keyword,
                        kind: ScriptElementKind.keyword,
                        kindModifiers: ScriptElementKindModifier.none
                    });
                }

                KeywordCompletions.keywordCompletions = completions;
            }

            return KeywordCompletions.keywordCompletions;
        }
    }
}