//// [tests/cases/conformance/parser/ecmascript5/RealWorld/parserindenter.ts] ////

//// [parserindenter.ts]
//﻿
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

///<reference path='formatting.ts' />


module Formatting {
    export class Indenter implements ILineIndenationResolver  {

        private indentationBag: IndentationBag;
        private scriptBlockBeginLineNumber: number;
        private offsetIndentationDeltas: Dictionary_int_int;

        constructor(
            public logger: TypeScript.ILogger,
            public tree: ParseTree,
            public snapshot: ITextSnapshot,
            public languageHostIndentation: string,
            public editorOptions: Services.EditorOptions,
            public firstToken: TokenSpan,
            public smartIndent: boolean) {

            this.indentationBag = new IndentationBag(this.snapshot);
            this.scriptBlockBeginLineNumber = -1;
            this.offsetIndentationDeltas = new Dictionary_int_int();     // text offset -> indentation delta

            // by default the root (program) has zero indendation
            this.tree.Root.SetIndentationOverride("");

            this.ApplyScriptBlockIndentation(this.languageHostIndentation, this.tree);
            this.FillInheritedIndentation(this.tree);

        }

        public GetIndentationEdits(token: TokenSpan, nextToken: TokenSpan, node: ParseNode, sameLineIndent: boolean): List_TextEditInfo {
            if (this.logger.information()) {
                this.logger.log("GetIndentationEdits(" +
                    "t1=[" + token.Span.startPosition() + "," + token.Span.endPosition()+ "], " +
                    "t2=[" + (nextToken == null ? "null" : (nextToken.Span.startPosition() + "," + nextToken.Span.endPosition())) + "]" +
                    ")");
            }

            var result = this.GetIndentationEditsWorker(token, nextToken, node, sameLineIndent);

            if (this.logger.information()) {
                for (var i = 0; i < result.count() ; i++) {
                    var edit = result.get(i);
                    this.logger.log("edit: minChar=" + edit.position + ", limChar=" + (edit.position + edit.length) + ", text=\"" + TypeScript.stringToLiteral(edit.replaceWith, 30) + "\"");
                }
            }

            return result;
        }

        public GetIndentationEditsWorker(token: TokenSpan, nextToken: TokenSpan, node: ParseNode, sameLineIndent: boolean): List_TextEditInfo {
            var result = new List_TextEditInfo();
            var indentationInfo: IndentationInfo = null;

            // This handles the case:
            //      return (
            //              function() {
            //              })
            // The given function's node indicates that the function starts directly after "return (".
            // In this case, we adjust the span to point to the function keyword.
            // The same applies to objects and arrays.
            // The reason this is done inside the Indenter is because it only affects indentation behavior.
            // It's also done in ParseTree when we traverse up the tree because we don't have the 
            // tokens for nodes outside the span we are formatting.
            this.AdjustStartOffsetIfNeeded(token, node);

            // Don't adjust indentation on the same line of a script block
            if (this.scriptBlockBeginLineNumber == token.lineNumber()) {
                return result;
            }

            // Don't indent multi-line strings
            if (!sameLineIndent && this.IsMultiLineString(token)) {
                return result;
            }

            // Special cases for the tokens that don't show up in the tree, such as curly braces and comments
            indentationInfo = this.GetSpecialCaseIndentation(token, node);
            if (indentationInfo == null) {
                //// For anything else

                // Get the indentation level only from the node that starts on the same offset as the token
                // otherwise the token is not meant to be indented
                while (!node.CanIndent() && node.Parent != null && token.Span.span.start() == node.Parent.AuthorNode.Details.StartOffset)
                    node = node.Parent;

                if (node.CanIndent() && token.Span.span.start() == node.AuthorNode.Details.StartOffset) {
                    indentationInfo = node.GetEffectiveIndentation(this);
                }
                else {
                    //// Special cases for anything else that is not in the tree and should be indented

                    // check for label (identifier followed by a colon)
                    if (token.Token == AuthorTokenKind.atkIdentifier && nextToken != null && nextToken.Token == AuthorTokenKind.atkColon) {
                        // This will make the label on the same level as the surrounding function/block
                        // ex: 
                        // {
                        //      statement;
                        //      label:
                        //          statement;
                        // }
                        indentationInfo = node.GetEffectiveChildrenIndentation(this);
                    }
                    else {
                        //// Move the token the same indentation-delta that moved its indentable parent
                        //// For example:
                        ////    var a,
                        ////        b;
                        //// The declaration 'b' would remain under 'a' even if 'var' got indented.
                        indentationInfo = this.ApplyIndentationDeltaFromParent(token, node);
                    }
                }
            }

            // Get the indent edit from the indentation info
            if (indentationInfo != null) {
                var edit = this.GetIndentEdit(indentationInfo, token.Span.startPosition(), sameLineIndent);
                if (edit != null) {
                    this.RegisterIndentation(edit, sameLineIndent);

                    result.add(edit);

                    // multi-line comments, apply delta indentation to all the other lines
                    if (token.Token == AuthorTokenKind.atkComment) {
                        var commentEdits = this.GetCommentIndentationEdits(token);
                        commentEdits.foreach((item) => {
                            result.add(item);
                        });
                    }
                }
            }

            return result;
        }

        private GetCommentIndentationEdits(token: TokenSpan): List_TextEditInfo {
            var result = new List_TextEditInfo();

            if (token.Token != AuthorTokenKind.atkComment)
                return result;

            var commentLastLineNumber = this.snapshot.GetLineNumberFromPosition(token.Span.endPosition());
            if (token.lineNumber() == commentLastLineNumber)
                return result;

            var commentFirstLineIndentationDelta = this.GetIndentationDelta(token.Span.startPosition(), null);
            if (commentFirstLineIndentationDelta != undefined) {
                for (var line = token.lineNumber() + 1; line <= commentLastLineNumber; line++) {
                    var lineStartPosition = this.snapshot.GetLineFromLineNumber(line).startPosition();
                    var lineIndent = this.GetLineIndentationForOffset(lineStartPosition);

                    var commentIndentationInfo = this.ApplyIndentationDelta2(lineIndent, commentFirstLineIndentationDelta);
                    if (commentIndentationInfo != null) {
                        var tokenStartPosition = lineStartPosition + lineIndent.length;
                        var commentIndentationEdit = this.GetIndentEdit(commentIndentationInfo, tokenStartPosition, false);
                        if (commentIndentationEdit != null) {
                            result.add(commentIndentationEdit);
                        }
                    }
                }
            }

            return result;
        }

        static GetIndentSizeFromIndentText(indentText: string, editorOptions: Services.EditorOptions): number {
            return GetIndentSizeFromText(indentText, editorOptions, /*includeNonIndentChars:*/ false);
        }

        static GetIndentSizeFromText(text: string, editorOptions: Services.EditorOptions, includeNonIndentChars: boolean): number {
            var indentSize = 0;

            for (var i = 0; i < text.length; i++) {
                var c = text.charAt(i);

                if (c == '\t')
                    indentSize = (indentSize + editorOptions.TabSize) - (indentSize % editorOptions.TabSize);
                else if (c == ' ')
                    indentSize += 1;
                else {
                    if (includeNonIndentChars)
                        indentSize += 1;
                    else
                        break;
                }
            }

            return indentSize;
        }

        private GetSpecialCaseIndentation(token: TokenSpan, node: ParseNode): IndentationInfo {
            var indentationInfo: IndentationInfo = null;

            switch (token.Token) {
                case AuthorTokenKind.atkLCurly: // { is not part of the tree
                    indentationInfo = this.GetSpecialCaseIndentationForLCurly(node);
                    return indentationInfo;

                case AuthorTokenKind.atkElse:   // else is not part of the tree
                case AuthorTokenKind.atkRBrack: // ] is not part of the tree
                    indentationInfo = node.GetNodeStartLineIndentation(this);
                    return indentationInfo;

                case AuthorTokenKind.atkRCurly: // } is not part of the tree
                    // if '}' is for a body-block, get indentation based on its parent.
                    if (node.AuthorNode.Details.Kind == AuthorParseNodeKind.apnkBlock && node.AuthorNode.EdgeLabel == AuthorParseNodeEdge.apneBody)
                        node = node.Parent;
                    indentationInfo = node.GetNodeStartLineIndentation(this);
                    return indentationInfo;

                case AuthorTokenKind.atkWhile: // while (in do-while) is not part of the tree
                    if (node.AuthorNode.Details.Kind == AuthorParseNodeKind.apnkDoWhile) {
                        indentationInfo = node.GetNodeStartLineIndentation(this);
                        return indentationInfo;
                    }

                    return null;

                case AuthorTokenKind.atkSColon:
                    return this.GetSpecialCaseIndentationForSemicolon(token, node);

                case AuthorTokenKind.atkComment:
                    return this.GetSpecialCaseIndentationForComment(token, node);

                default:
                    return indentationInfo;
            }
        }

        private GetSpecialCaseIndentationForLCurly(node: ParseNode): IndentationInfo {
            var indentationInfo: IndentationInfo = null;

            if (node.AuthorNode.Details.Kind == AuthorParseNodeKind.apnkFncDecl ||
                node.AuthorNode.EdgeLabel == AuthorParseNodeEdge.apneThen || node.AuthorNode.EdgeLabel == AuthorParseNodeEdge.apneElse) {
                    // flushed with the node (function & if)
                indentationInfo = node.GetNodeStartLineIndentation(this);
                return indentationInfo;
            }
            else if (node.AuthorNode.Details.Kind == AuthorParseNodeKind.apnkObject && !node.CanIndent()) {
                // if the open curly belongs to a non-indented object, do nothing here.
                return null;
            }

            // effective identation of the block
            indentationInfo = node.GetEffectiveIndentation(this);
            return indentationInfo;
        }

        private GetSpecialCaseIndentationForSemicolon(token: TokenSpan, node: ParseNode): IndentationInfo {
            var indentationInfo: IndentationInfo = null;

            if (this.smartIndent) {
                indentationInfo = node.GetEffectiveChildrenIndentation(this);
                return indentationInfo;
            }
            else {
                // Indent all semicolons except the ones that belong to the for statement parts (initalizer, condition, itnrement)
                if (node.AuthorNode.Details.Kind != AuthorParseNodeKind.apnkFor) {
                    // The passed node is actually either the program or the list because semicolon doesn't belong
                    // to any statement in the tree, though the statement extends up to the semicolon position.
                    // To find the correct statement, we look for the adjacent node on the left of the semicolon.
                    var semiColonStartSpan = new Span(token.Span.startPosition(), 0);
                    node = ParseTree.FindCommonParentNode(semiColonStartSpan, semiColonStartSpan, node);
                    indentationInfo = node.GetEffectiveChildrenIndentation(this);
                    return indentationInfo;
                }
            }

            return null;
        }

        private GetSpecialCaseIndentationForComment(token: TokenSpan, node: ParseNode): IndentationInfo {
            var indentationInfo: IndentationInfo = null;

            // Only indent line comment and the first line of block comment
            var twoCharSpan = token.Span.Intersection(new Span(token.Span.startPosition(), 2));
            if (twoCharSpan != null && (twoCharSpan.GetText() == "//" || twoCharSpan.GetText() == "/*")) {
                while (node.ChildrenIndentationDelta == null && node.Parent != null)
                    node = node.Parent;

                if (this.CanIndentComment(token, node)) {
                    indentationInfo = node.GetEffectiveChildrenIndentationForComment(this);
                }
                else {
                    indentationInfo = this.ApplyIndentationDeltaFromParent(token, node);
                }
            }

            return indentationInfo;
        }

        private CanIndentComment(token: TokenSpan, node: ParseNode): boolean {
            switch (node.AuthorNode.Details.Kind) {
                case AuthorParseNodeKind.apnkProg:
                case AuthorParseNodeKind.apnkBlock:
                case AuthorParseNodeKind.apnkSwitch:
                case AuthorParseNodeKind.apnkCase:
                case AuthorParseNodeKind.apnkDefaultCase:
                case AuthorParseNodeKind.apnkIf:
                case AuthorParseNodeKind.apnkFor:
                case AuthorParseNodeKind.apnkForIn:
                case AuthorParseNodeKind.apnkWhile:
                case AuthorParseNodeKind.apnkWith:
                case AuthorParseNodeKind.apnkDoWhile:
                case AuthorParseNodeKind.apnkObject:
                    return true;

                case AuthorParseNodeKind.apnkFncDecl:
                    // Comments before arguments are not indented.
                    // This code doesn't cover the cases of comment after the last argument or 
                    // when there are no arguments. Though this is okay since the only case we care about is:
                    // function foo(/* test */ a,
                    //              /* test */ b)
                    var result = true;
                    var children = ParseNodeExtensions.FindChildrenWithEdge(node, AuthorParseNodeEdge.apneArgument);
                    children.foreach((argumentNode) => {
                        if (token.Span.startPosition() < argumentNode.AuthorNode.Details.StartOffset)
                            result = false;
                    });

                    return result;
            }

            return false;
        }

        private ApplyScriptBlockIndentation(languageHostIndentation: string, tree: ParseTree): void
        {
            if (languageHostIndentation == null || tree.StartNodeSelf == null)
                return;

            var scriptBlockIndentation = this.ApplyIndentationLevel(languageHostIndentation, 1);

            //TypeScript: Projection snapshots not supported

            // Disconnect the sibling node if it belongs to a different script block
            //IProjectionSnapshot projectionSnapshot = this.snapshot as IProjectionSnapshot;
            //if (projectionSnapshot != null)
            //{
            //    // Get script block spans.
            //    foreach (SnapshotSpan sourceSpan in projectionSnapshot.GetSourceSpans())
            //    {
            //        // Map the spans to the JavaScript buffer.
            //        ReadOnlyCollection<Span> spans = projectionSnapshot.MapFromSourceSnapshot(sourceSpan);

            //        Debug.Assert(spans.Count == 1, string.Format(CultureInfo.InvariantCulture, "Unexpected span count of {0}.", spans.Count));

            //        if (spans.Count > 0)
            //        {
            //            Span span = spans.First();

            //            // If the "self" node is the first root-level node in a script block, then remove the start node.
            //            if (span.Contains(tree.StartNodethis.AuthorNode.Details.StartOffset))
            //            {
            //                this.scriptBlockBeginLineNumber = projectionSnapshot.GetLineNumberFromPosition(span.Start);

            //                if (tree.StartNodePreviousSibling.HasValue)
            //                {
            //                    int siblingStartOffset = tree.StartNodePreviousSibling.Value.Details.StartOffset;

            //                    // Don't consider sibling in these cases:
            //                    // 1. The sibling belongs to another script block
            //                    // 2. The sibling is on the same line of the script block
            //                    if (!span.Contains(siblingStartOffset) || projectionSnapshot.GetLineNumberFromPosition(siblingStartOffset) == this.scriptBlockBeginLineNumber)
            //                    {
            //                        tree.StartNodePreviousSibling = null;
            //                    }
            //                }

            //                break;
            //            }
            //        }
            //    }
            //}

            // The root is the program.
            tree.Root.SetIndentationOverride(scriptBlockIndentation);
        }

        private GetIndentEdit(indentInfo: IndentationInfo, tokenStartPosition: number, sameLineIndent: boolean): TextEditInfo {
            var indentText = this.ApplyIndentationLevel(indentInfo.Prefix, indentInfo.Level);

            if (sameLineIndent) {
                return new TextEditInfo(tokenStartPosition, 0, indentText);
            }
            else {
                var snapshotLine = this.snapshot.GetLineFromPosition(tokenStartPosition);
                var currentIndentSpan = new Span(snapshotLine.startPosition(), tokenStartPosition - snapshotLine.startPosition());
                var currentIndentText = this.snapshot.GetText(currentIndentSpan);

                if (currentIndentText !== indentText) {
                    if (this.logger.debug()) {
                        // Verify that currentIndentText is all whitespaces
                        for (var i = 0, len = currentIndentText.length; i < len; i++) {
                            var c = currentIndentText.charCodeAt(i);
                            if (!StringUtils.IsWhiteSpace(c)) {
                                Debug.Fail("Formatting error: Will remove user code when indenting the line: " + snapshotLine.getText());
                                break;
                            }
                        }
                    }
                    return new TextEditInfo(currentIndentSpan.start(), currentIndentSpan.length(), indentText);
                }
            }

            return null;
        }

        private ApplyIndentationLevel(existingIndentation: string, level: number): string {
            var indentSize = this.editorOptions.IndentSize;
            var tabSize = this.editorOptions.TabSize;
            var convertTabsToSpaces = this.editorOptions.ConvertTabsToSpaces;

            if (level < 0) {
                if (StringUtils.IsNullOrEmpty(existingIndentation))
                    return "";

                var totalIndent = 0;
                StringUtils.foreach(existingIndentation, (c) => {
                    if (c == '\t')
                        totalIndent += tabSize;
                    else
                        totalIndent++;
                });

                totalIndent += level * indentSize;
                if (totalIndent < 0)
                    return "";
                else
                    return this.GetIndentString(null, totalIndent, tabSize, convertTabsToSpaces);
            }

            var totalIndentSize = level * indentSize;
            return this.GetIndentString(existingIndentation, totalIndentSize, tabSize, convertTabsToSpaces);
        }

        private GetIndentString(prefix: string, totalIndentSize: number, tabSize: number, convertTabsToSpaces: boolean): string {
            var tabString = convertTabsToSpaces ? StringUtils.create(' ', tabSize) : "\t";

            var text = "";
            if (!StringUtils.IsNullOrEmpty(prefix))
                text += prefix;

            var pos = 0;

            // fill first with tabs
            while (pos <= totalIndentSize - tabSize) {
                text += tabString;
                pos += tabSize;
            }

            // fill the reminder with spaces
            while (pos < totalIndentSize) {
                text += ' ';
                pos++;
            }

            return text;
        }

        private  ApplyIndentationDeltaFromParent(token: TokenSpan, node: ParseNode): IndentationInfo {
            var indentationInfo: IndentationInfo = null;

            var indentableParent = node;
            while (indentableParent != null && !indentableParent.CanIndent())
                indentableParent = indentableParent.Parent;

            if (indentableParent != null && indentableParent.AuthorNode.Details.Kind != AuthorParseNodeKind.apnkProg) {
                var parentIndentationDeltaSize = this.GetIndentationDelta(indentableParent.AuthorNode.Details.StartOffset, token.Span.startPosition());
                if (parentIndentationDeltaSize !== undefined) {
                    indentationInfo = this.ApplyIndentationDelta1(token.Span.startPosition(), parentIndentationDeltaSize);
                }
            }

            return indentationInfo;
        }

        private ApplyIndentationDelta1(tokenStartPosition: number, delta: number): IndentationInfo {
            // Get current indentation
            var snapshotLine = this.snapshot.GetLineFromPosition(tokenStartPosition);
            var currentIndentSpan = new Span(snapshotLine.startPosition(), tokenStartPosition - snapshotLine.startPosition());
            var currentIndent = this.snapshot.GetText(currentIndentSpan);

            // Calculate new indentation from current-indentation and delta
            return this.ApplyIndentationDelta2(currentIndent, delta);
        }

        private ApplyIndentationDelta2(currentIndent: string, delta: number): IndentationInfo {
            if (delta == 0)
                return null;

            var currentIndentSize = Indenter.GetIndentSizeFromIndentText(currentIndent, this.editorOptions);

            var newIndentSize = currentIndentSize + delta;
            if (newIndentSize < 0) {
                newIndentSize = 0;
            }

            var newIndent = this.GetIndentString(null, newIndentSize, this.editorOptions.TabSize, this.editorOptions.ConvertTabsToSpaces);
            if (newIndent != null) {
                return new IndentationInfo(newIndent, 0);
            }

            return null;
        }

        private GetIndentationDelta(tokenStartPosition: number, childTokenStartPosition: number/*?*/): number/*?*/ {
            Debug.Assert(childTokenStartPosition !== undefined, "Error: caller must pass 'null' for undefined position");

            var indentationDeltaSize = this.offsetIndentationDeltas.GetValue(tokenStartPosition);
            if (indentationDeltaSize === null) {
                var indentEditInfo = this.indentationBag.FindIndent(tokenStartPosition);

                // No recorded indentation, return null
                if (indentEditInfo == null)
                    return null;

                var origIndentText = this.snapshot.GetText(new Span(indentEditInfo.OrigIndentPosition, indentEditInfo.OrigIndentLength()));
                var newIndentText = indentEditInfo.Indentation();

                var origIndentSize = Indenter.GetIndentSizeFromText(origIndentText, this.editorOptions, /*includeNonIndentChars*/true);
                var newIndentSize = Indenter.GetIndentSizeFromIndentText(newIndentText, this.editorOptions);

                // Check the child's position whether it's before the parent position
                // if so indent the child based on the first token on the line as opposed to the parent position
                //
                // Example of relative to parent (not line), relative indentation should be "4 (newIndentSize) - 9 (indentSize up to for) = -5"
                //
                // if (1) { for (i = 0; i < 10;       =>          if (1) {
                //                      i++) {                       for (i = 0; i < 10;
                //                                                               i++) {
                //
                // Example of relative to line, relative indentation should be "4 (newIndentSize) - 0 (indentSize up to if) = 4"
                //
                // if (1) { for (i = 0; i < 10;      =>          if (1) {
                //     i++) {                                        for (i = 0; i < 10;
                //                                                       i++) {
                if (childTokenStartPosition !== null) {
                    var childTokenLineStartPosition = this.snapshot.GetLineFromPosition(childTokenStartPosition).startPosition();
                    var childIndentText = this.snapshot.GetText(new Span(childTokenLineStartPosition, childTokenStartPosition - childTokenLineStartPosition));

                    var childIndentSize = Indenter.GetIndentSizeFromIndentText(childIndentText, this.editorOptions);

                    if (childIndentSize < origIndentSize)
                        origIndentSize = Indenter.GetIndentSizeFromIndentText(origIndentText, this.editorOptions);
                }

                indentationDeltaSize = newIndentSize - origIndentSize;
                this.offsetIndentationDeltas.Add(tokenStartPosition, indentationDeltaSize);
            }

            return indentationDeltaSize;
        }

        private FillInheritedIndentation(tree: ParseTree): void
        {
            var offset = -1;
            var indentNode: ParseNode = null;

            if (tree.StartNodeSelf != null) {
                if (!this.smartIndent && tree.StartNodePreviousSibling !== null && tree.StartNodeSelf.AuthorNode.Label == 0 && tree.StartNodePreviousSibling.Label == 0) {
                    indentNode = tree.StartNodeSelf;
                    offset = tree.StartNodePreviousSibling.Details.StartOffset;

                    // In case the sibling node is on the same line of a parent node, ex:
                    //      case 1: a++;
                    //          break;
                    // In this example, the sibling of break is a++ but a++ is on the same line of its parent.
                    var lineNum = this.snapshot.GetLineNumberFromPosition(offset);
                    var node = indentNode;
                    while (node.Parent != null && this.snapshot.GetLineNumberFromPosition(node.Parent.AuthorNode.Details.StartOffset) == lineNum) {
                        node = node.Parent;
                        if (node.CanIndent()) {
                            indentNode = node;
                            indentNode.IndentationDelta = 0;
                        }
                    }
                }
                else {
                    var parent: ParseNode;

                    // Otherwise base on parent indentation.
                    if (this.smartIndent) {
                        // in smartIndent the self node is the parent node since it's the closest node to the new line
                        // ... unless in case if the startNodeSelf represents the firstToken then we need to choose its parent
                        parent = tree.StartNodeSelf;
                        while (parent != null && parent.AuthorNode.Details.StartOffset == this.firstToken.Span.startPosition())
                            parent = parent.Parent;
                    }
                    else {
                        // Get the parent that is really on a different line from the self node
                        var startNodeLineNumber = this.snapshot.GetLineNumberFromPosition(tree.StartNodeSelf.AuthorNode.Details.StartOffset);
                        parent = tree.StartNodeSelf.Parent;
                        while (parent != null &&
                                startNodeLineNumber == this.snapshot.GetLineNumberFromPosition(parent.AuthorNode.Details.StartOffset)) {
                            parent = parent.Parent;
                        }
                    }

                    // The parent node to take its indentation is the first parent that has indentation.
                    while (parent != null && !parent.CanIndent()) {
                        parent = parent.Parent;
                    }

                    // Skip Program since it has no indentation
                    if (parent != null && parent.AuthorNode.Details.Kind != AuthorParseNodeKind.apnkProg) {
                        offset = parent.AuthorNode.Details.StartOffset;
                        indentNode = parent;
                    }
                }
            }

            if (indentNode != null) {
                var indentOverride = this.GetLineIndentationForOffset(offset);

                // Set the indentation on all the siblings to be the same as indentNode
                if (!this.smartIndent && tree.StartNodePreviousSibling !== null && indentNode.Parent != null) {
                    ParseNodeExtensions.GetChildren(indentNode.Parent).foreach((sibling) => {
                        if (sibling !== indentNode) {
                            if (sibling.CanIndent())
                                sibling.SetIndentationOverride(indentOverride);
                        }
                    });
                }

                // Set the indent override string on the indent node and on every parent (on different line) after adjusting the indent by the negative delta
                var lastDelta = 0;
                var lastLine = this.snapshot.GetLineNumberFromPosition(indentNode.AuthorNode.Details.StartOffset);
                do {
                    var currentLine = this.snapshot.GetLineNumberFromPosition(indentNode.AuthorNode.Details.StartOffset);
                    if (lastLine != currentLine) {
                        lastLine = currentLine;
                        indentOverride = this.ApplyIndentationLevel(indentOverride, -lastDelta);
                        lastDelta = 0;
                    }

                    if (indentNode.CanIndent()) {
                        indentNode.SetIndentationOverride(indentOverride);
                        lastDelta = indentNode.IndentationDelta;
                    }

                    indentNode = indentNode.Parent;
                }
                while (indentNode != null);
            }
        }

        public GetLineIndentationForOffset(offset: number): string {
            var indentationEdit: IndentationEditInfo;

            // First check if we already have indentation info in our indentation bag
            indentationEdit = this.indentationBag.FindIndent(offset);
            if (indentationEdit != null) {
                return indentationEdit.Indentation();
            }
            else {
                // Otherwise, use the indentation from the textBuffer
                var line = this.snapshot.GetLineFromPosition(offset);
                var lineText = line.getText();
                var index = 0;

                while (index < lineText.length && (lineText.charAt(index) == ' ' || lineText.charAt(index) == '\t')) {
                    ++index;
                }

                return lineText.substr(0, index);
            }
        }

        private RegisterIndentation(indent: TextEditInfo, sameLineIndent: boolean): void
        {
            var indentationInfo: IndentationEditInfo = null;

            if (sameLineIndent) {
                // Consider the original indentation from the beginning of the line up to the indent position (or really the token position)
                var lineStartPosition = this.snapshot.GetLineFromPosition(indent.Position).startPosition();
                var lineIndentLength = indent.Position - lineStartPosition;

                indentationInfo = IndentationEditInfo.create2(indent.Position, indent.ReplaceWith, lineStartPosition, lineIndentLength);
            }
            else {
                indentationInfo = new IndentationEditInfo(indent);
            }

            this.indentationBag.AddIndent(indentationInfo);
        }

        public RegisterIndentation2(position: number, indent: string): void
        {
            this.RegisterIndentation(new TextEditInfo(position, 0, indent), false);
        }

        private AdjustStartOffsetIfNeeded(token: TokenSpan, node: ParseNode): void
        {
            if (token == null)
                return;

            var updateStartOffset = false;

            switch (token.Token) {
                case AuthorTokenKind.atkFunction:
                    updateStartOffset = node.AuthorNode.Details.Kind == AuthorParseNodeKind.apnkFncDecl;
                    break;

                case AuthorTokenKind.atkLCurly:
                    updateStartOffset = node.AuthorNode.Details.Kind == AuthorParseNodeKind.apnkObject;
                    break;

                case AuthorTokenKind.atkLBrack:
                    updateStartOffset = node.AuthorNode.Details.Kind == AuthorParseNodeKind.apnkArray;
                    break;
            }

            if (updateStartOffset) {
                ParseNodeExtensions.SetNodeSpan(node, token.Span.startPosition(), node.AuthorNode.Details.EndOffset);
            }
        }

        private IsMultiLineString(token: TokenSpan): boolean {
            return token.tokenID === TypeScript.TokenID.StringLiteral &&
                this.snapshot.GetLineNumberFromPosition(token.Span.endPosition()) > this.snapshot.GetLineNumberFromPosition(token.Span.startPosition());
        }
    }
}


//// [parserindenter.js]
//﻿
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
///<reference path='formatting.ts' />
var Formatting;
(function (Formatting) {
    var Indenter = /** @class */ (function () {
        function Indenter(logger, tree, snapshot, languageHostIndentation, editorOptions, firstToken, smartIndent) {
            this.logger = logger;
            this.tree = tree;
            this.snapshot = snapshot;
            this.languageHostIndentation = languageHostIndentation;
            this.editorOptions = editorOptions;
            this.firstToken = firstToken;
            this.smartIndent = smartIndent;
            this.indentationBag = new IndentationBag(this.snapshot);
            this.scriptBlockBeginLineNumber = -1;
            this.offsetIndentationDeltas = new Dictionary_int_int(); // text offset -> indentation delta
            // by default the root (program) has zero indendation
            this.tree.Root.SetIndentationOverride("");
            this.ApplyScriptBlockIndentation(this.languageHostIndentation, this.tree);
            this.FillInheritedIndentation(this.tree);
        }
        Indenter.prototype.GetIndentationEdits = function (token, nextToken, node, sameLineIndent) {
            if (this.logger.information()) {
                this.logger.log("GetIndentationEdits(" +
                    "t1=[" + token.Span.startPosition() + "," + token.Span.endPosition() + "], " +
                    "t2=[" + (nextToken == null ? "null" : (nextToken.Span.startPosition() + "," + nextToken.Span.endPosition())) + "]" +
                    ")");
            }
            var result = this.GetIndentationEditsWorker(token, nextToken, node, sameLineIndent);
            if (this.logger.information()) {
                for (var i = 0; i < result.count(); i++) {
                    var edit = result.get(i);
                    this.logger.log("edit: minChar=" + edit.position + ", limChar=" + (edit.position + edit.length) + ", text=\"" + TypeScript.stringToLiteral(edit.replaceWith, 30) + "\"");
                }
            }
            return result;
        };
        Indenter.prototype.GetIndentationEditsWorker = function (token, nextToken, node, sameLineIndent) {
            var result = new List_TextEditInfo();
            var indentationInfo = null;
            // This handles the case:
            //      return (
            //              function() {
            //              })
            // The given function's node indicates that the function starts directly after "return (".
            // In this case, we adjust the span to point to the function keyword.
            // The same applies to objects and arrays.
            // The reason this is done inside the Indenter is because it only affects indentation behavior.
            // It's also done in ParseTree when we traverse up the tree because we don't have the 
            // tokens for nodes outside the span we are formatting.
            this.AdjustStartOffsetIfNeeded(token, node);
            // Don't adjust indentation on the same line of a script block
            if (this.scriptBlockBeginLineNumber == token.lineNumber()) {
                return result;
            }
            // Don't indent multi-line strings
            if (!sameLineIndent && this.IsMultiLineString(token)) {
                return result;
            }
            // Special cases for the tokens that don't show up in the tree, such as curly braces and comments
            indentationInfo = this.GetSpecialCaseIndentation(token, node);
            if (indentationInfo == null) {
                //// For anything else
                // Get the indentation level only from the node that starts on the same offset as the token
                // otherwise the token is not meant to be indented
                while (!node.CanIndent() && node.Parent != null && token.Span.span.start() == node.Parent.AuthorNode.Details.StartOffset)
                    node = node.Parent;
                if (node.CanIndent() && token.Span.span.start() == node.AuthorNode.Details.StartOffset) {
                    indentationInfo = node.GetEffectiveIndentation(this);
                }
                else {
                    //// Special cases for anything else that is not in the tree and should be indented
                    // check for label (identifier followed by a colon)
                    if (token.Token == AuthorTokenKind.atkIdentifier && nextToken != null && nextToken.Token == AuthorTokenKind.atkColon) {
                        // This will make the label on the same level as the surrounding function/block
                        // ex: 
                        // {
                        //      statement;
                        //      label:
                        //          statement;
                        // }
                        indentationInfo = node.GetEffectiveChildrenIndentation(this);
                    }
                    else {
                        //// Move the token the same indentation-delta that moved its indentable parent
                        //// For example:
                        ////    var a,
                        ////        b;
                        //// The declaration 'b' would remain under 'a' even if 'var' got indented.
                        indentationInfo = this.ApplyIndentationDeltaFromParent(token, node);
                    }
                }
            }
            // Get the indent edit from the indentation info
            if (indentationInfo != null) {
                var edit = this.GetIndentEdit(indentationInfo, token.Span.startPosition(), sameLineIndent);
                if (edit != null) {
                    this.RegisterIndentation(edit, sameLineIndent);
                    result.add(edit);
                    // multi-line comments, apply delta indentation to all the other lines
                    if (token.Token == AuthorTokenKind.atkComment) {
                        var commentEdits = this.GetCommentIndentationEdits(token);
                        commentEdits.foreach(function (item) {
                            result.add(item);
                        });
                    }
                }
            }
            return result;
        };
        Indenter.prototype.GetCommentIndentationEdits = function (token) {
            var result = new List_TextEditInfo();
            if (token.Token != AuthorTokenKind.atkComment)
                return result;
            var commentLastLineNumber = this.snapshot.GetLineNumberFromPosition(token.Span.endPosition());
            if (token.lineNumber() == commentLastLineNumber)
                return result;
            var commentFirstLineIndentationDelta = this.GetIndentationDelta(token.Span.startPosition(), null);
            if (commentFirstLineIndentationDelta != undefined) {
                for (var line = token.lineNumber() + 1; line <= commentLastLineNumber; line++) {
                    var lineStartPosition = this.snapshot.GetLineFromLineNumber(line).startPosition();
                    var lineIndent = this.GetLineIndentationForOffset(lineStartPosition);
                    var commentIndentationInfo = this.ApplyIndentationDelta2(lineIndent, commentFirstLineIndentationDelta);
                    if (commentIndentationInfo != null) {
                        var tokenStartPosition = lineStartPosition + lineIndent.length;
                        var commentIndentationEdit = this.GetIndentEdit(commentIndentationInfo, tokenStartPosition, false);
                        if (commentIndentationEdit != null) {
                            result.add(commentIndentationEdit);
                        }
                    }
                }
            }
            return result;
        };
        Indenter.GetIndentSizeFromIndentText = function (indentText, editorOptions) {
            return GetIndentSizeFromText(indentText, editorOptions, /*includeNonIndentChars:*/ false);
        };
        Indenter.GetIndentSizeFromText = function (text, editorOptions, includeNonIndentChars) {
            var indentSize = 0;
            for (var i = 0; i < text.length; i++) {
                var c = text.charAt(i);
                if (c == '\t')
                    indentSize = (indentSize + editorOptions.TabSize) - (indentSize % editorOptions.TabSize);
                else if (c == ' ')
                    indentSize += 1;
                else {
                    if (includeNonIndentChars)
                        indentSize += 1;
                    else
                        break;
                }
            }
            return indentSize;
        };
        Indenter.prototype.GetSpecialCaseIndentation = function (token, node) {
            var indentationInfo = null;
            switch (token.Token) {
                case AuthorTokenKind.atkLCurly: // { is not part of the tree
                    indentationInfo = this.GetSpecialCaseIndentationForLCurly(node);
                    return indentationInfo;
                case AuthorTokenKind.atkElse: // else is not part of the tree
                case AuthorTokenKind.atkRBrack: // ] is not part of the tree
                    indentationInfo = node.GetNodeStartLineIndentation(this);
                    return indentationInfo;
                case AuthorTokenKind.atkRCurly: // } is not part of the tree
                    // if '}' is for a body-block, get indentation based on its parent.
                    if (node.AuthorNode.Details.Kind == AuthorParseNodeKind.apnkBlock && node.AuthorNode.EdgeLabel == AuthorParseNodeEdge.apneBody)
                        node = node.Parent;
                    indentationInfo = node.GetNodeStartLineIndentation(this);
                    return indentationInfo;
                case AuthorTokenKind.atkWhile: // while (in do-while) is not part of the tree
                    if (node.AuthorNode.Details.Kind == AuthorParseNodeKind.apnkDoWhile) {
                        indentationInfo = node.GetNodeStartLineIndentation(this);
                        return indentationInfo;
                    }
                    return null;
                case AuthorTokenKind.atkSColon:
                    return this.GetSpecialCaseIndentationForSemicolon(token, node);
                case AuthorTokenKind.atkComment:
                    return this.GetSpecialCaseIndentationForComment(token, node);
                default:
                    return indentationInfo;
            }
        };
        Indenter.prototype.GetSpecialCaseIndentationForLCurly = function (node) {
            var indentationInfo = null;
            if (node.AuthorNode.Details.Kind == AuthorParseNodeKind.apnkFncDecl ||
                node.AuthorNode.EdgeLabel == AuthorParseNodeEdge.apneThen || node.AuthorNode.EdgeLabel == AuthorParseNodeEdge.apneElse) {
                // flushed with the node (function & if)
                indentationInfo = node.GetNodeStartLineIndentation(this);
                return indentationInfo;
            }
            else if (node.AuthorNode.Details.Kind == AuthorParseNodeKind.apnkObject && !node.CanIndent()) {
                // if the open curly belongs to a non-indented object, do nothing here.
                return null;
            }
            // effective identation of the block
            indentationInfo = node.GetEffectiveIndentation(this);
            return indentationInfo;
        };
        Indenter.prototype.GetSpecialCaseIndentationForSemicolon = function (token, node) {
            var indentationInfo = null;
            if (this.smartIndent) {
                indentationInfo = node.GetEffectiveChildrenIndentation(this);
                return indentationInfo;
            }
            else {
                // Indent all semicolons except the ones that belong to the for statement parts (initalizer, condition, itnrement)
                if (node.AuthorNode.Details.Kind != AuthorParseNodeKind.apnkFor) {
                    // The passed node is actually either the program or the list because semicolon doesn't belong
                    // to any statement in the tree, though the statement extends up to the semicolon position.
                    // To find the correct statement, we look for the adjacent node on the left of the semicolon.
                    var semiColonStartSpan = new Span(token.Span.startPosition(), 0);
                    node = ParseTree.FindCommonParentNode(semiColonStartSpan, semiColonStartSpan, node);
                    indentationInfo = node.GetEffectiveChildrenIndentation(this);
                    return indentationInfo;
                }
            }
            return null;
        };
        Indenter.prototype.GetSpecialCaseIndentationForComment = function (token, node) {
            var indentationInfo = null;
            // Only indent line comment and the first line of block comment
            var twoCharSpan = token.Span.Intersection(new Span(token.Span.startPosition(), 2));
            if (twoCharSpan != null && (twoCharSpan.GetText() == "//" || twoCharSpan.GetText() == "/*")) {
                while (node.ChildrenIndentationDelta == null && node.Parent != null)
                    node = node.Parent;
                if (this.CanIndentComment(token, node)) {
                    indentationInfo = node.GetEffectiveChildrenIndentationForComment(this);
                }
                else {
                    indentationInfo = this.ApplyIndentationDeltaFromParent(token, node);
                }
            }
            return indentationInfo;
        };
        Indenter.prototype.CanIndentComment = function (token, node) {
            switch (node.AuthorNode.Details.Kind) {
                case AuthorParseNodeKind.apnkProg:
                case AuthorParseNodeKind.apnkBlock:
                case AuthorParseNodeKind.apnkSwitch:
                case AuthorParseNodeKind.apnkCase:
                case AuthorParseNodeKind.apnkDefaultCase:
                case AuthorParseNodeKind.apnkIf:
                case AuthorParseNodeKind.apnkFor:
                case AuthorParseNodeKind.apnkForIn:
                case AuthorParseNodeKind.apnkWhile:
                case AuthorParseNodeKind.apnkWith:
                case AuthorParseNodeKind.apnkDoWhile:
                case AuthorParseNodeKind.apnkObject:
                    return true;
                case AuthorParseNodeKind.apnkFncDecl:
                    // Comments before arguments are not indented.
                    // This code doesn't cover the cases of comment after the last argument or 
                    // when there are no arguments. Though this is okay since the only case we care about is:
                    // function foo(/* test */ a,
                    //              /* test */ b)
                    var result = true;
                    var children = ParseNodeExtensions.FindChildrenWithEdge(node, AuthorParseNodeEdge.apneArgument);
                    children.foreach(function (argumentNode) {
                        if (token.Span.startPosition() < argumentNode.AuthorNode.Details.StartOffset)
                            result = false;
                    });
                    return result;
            }
            return false;
        };
        Indenter.prototype.ApplyScriptBlockIndentation = function (languageHostIndentation, tree) {
            if (languageHostIndentation == null || tree.StartNodeSelf == null)
                return;
            var scriptBlockIndentation = this.ApplyIndentationLevel(languageHostIndentation, 1);
            //TypeScript: Projection snapshots not supported
            // Disconnect the sibling node if it belongs to a different script block
            //IProjectionSnapshot projectionSnapshot = this.snapshot as IProjectionSnapshot;
            //if (projectionSnapshot != null)
            //{
            //    // Get script block spans.
            //    foreach (SnapshotSpan sourceSpan in projectionSnapshot.GetSourceSpans())
            //    {
            //        // Map the spans to the JavaScript buffer.
            //        ReadOnlyCollection<Span> spans = projectionSnapshot.MapFromSourceSnapshot(sourceSpan);
            //        Debug.Assert(spans.Count == 1, string.Format(CultureInfo.InvariantCulture, "Unexpected span count of {0}.", spans.Count));
            //        if (spans.Count > 0)
            //        {
            //            Span span = spans.First();
            //            // If the "self" node is the first root-level node in a script block, then remove the start node.
            //            if (span.Contains(tree.StartNodethis.AuthorNode.Details.StartOffset))
            //            {
            //                this.scriptBlockBeginLineNumber = projectionSnapshot.GetLineNumberFromPosition(span.Start);
            //                if (tree.StartNodePreviousSibling.HasValue)
            //                {
            //                    int siblingStartOffset = tree.StartNodePreviousSibling.Value.Details.StartOffset;
            //                    // Don't consider sibling in these cases:
            //                    // 1. The sibling belongs to another script block
            //                    // 2. The sibling is on the same line of the script block
            //                    if (!span.Contains(siblingStartOffset) || projectionSnapshot.GetLineNumberFromPosition(siblingStartOffset) == this.scriptBlockBeginLineNumber)
            //                    {
            //                        tree.StartNodePreviousSibling = null;
            //                    }
            //                }
            //                break;
            //            }
            //        }
            //    }
            //}
            // The root is the program.
            tree.Root.SetIndentationOverride(scriptBlockIndentation);
        };
        Indenter.prototype.GetIndentEdit = function (indentInfo, tokenStartPosition, sameLineIndent) {
            var indentText = this.ApplyIndentationLevel(indentInfo.Prefix, indentInfo.Level);
            if (sameLineIndent) {
                return new TextEditInfo(tokenStartPosition, 0, indentText);
            }
            else {
                var snapshotLine = this.snapshot.GetLineFromPosition(tokenStartPosition);
                var currentIndentSpan = new Span(snapshotLine.startPosition(), tokenStartPosition - snapshotLine.startPosition());
                var currentIndentText = this.snapshot.GetText(currentIndentSpan);
                if (currentIndentText !== indentText) {
                    if (this.logger.debug()) {
                        // Verify that currentIndentText is all whitespaces
                        for (var i = 0, len = currentIndentText.length; i < len; i++) {
                            var c = currentIndentText.charCodeAt(i);
                            if (!StringUtils.IsWhiteSpace(c)) {
                                Debug.Fail("Formatting error: Will remove user code when indenting the line: " + snapshotLine.getText());
                                break;
                            }
                        }
                    }
                    return new TextEditInfo(currentIndentSpan.start(), currentIndentSpan.length(), indentText);
                }
            }
            return null;
        };
        Indenter.prototype.ApplyIndentationLevel = function (existingIndentation, level) {
            var indentSize = this.editorOptions.IndentSize;
            var tabSize = this.editorOptions.TabSize;
            var convertTabsToSpaces = this.editorOptions.ConvertTabsToSpaces;
            if (level < 0) {
                if (StringUtils.IsNullOrEmpty(existingIndentation))
                    return "";
                var totalIndent = 0;
                StringUtils.foreach(existingIndentation, function (c) {
                    if (c == '\t')
                        totalIndent += tabSize;
                    else
                        totalIndent++;
                });
                totalIndent += level * indentSize;
                if (totalIndent < 0)
                    return "";
                else
                    return this.GetIndentString(null, totalIndent, tabSize, convertTabsToSpaces);
            }
            var totalIndentSize = level * indentSize;
            return this.GetIndentString(existingIndentation, totalIndentSize, tabSize, convertTabsToSpaces);
        };
        Indenter.prototype.GetIndentString = function (prefix, totalIndentSize, tabSize, convertTabsToSpaces) {
            var tabString = convertTabsToSpaces ? StringUtils.create(' ', tabSize) : "\t";
            var text = "";
            if (!StringUtils.IsNullOrEmpty(prefix))
                text += prefix;
            var pos = 0;
            // fill first with tabs
            while (pos <= totalIndentSize - tabSize) {
                text += tabString;
                pos += tabSize;
            }
            // fill the reminder with spaces
            while (pos < totalIndentSize) {
                text += ' ';
                pos++;
            }
            return text;
        };
        Indenter.prototype.ApplyIndentationDeltaFromParent = function (token, node) {
            var indentationInfo = null;
            var indentableParent = node;
            while (indentableParent != null && !indentableParent.CanIndent())
                indentableParent = indentableParent.Parent;
            if (indentableParent != null && indentableParent.AuthorNode.Details.Kind != AuthorParseNodeKind.apnkProg) {
                var parentIndentationDeltaSize = this.GetIndentationDelta(indentableParent.AuthorNode.Details.StartOffset, token.Span.startPosition());
                if (parentIndentationDeltaSize !== undefined) {
                    indentationInfo = this.ApplyIndentationDelta1(token.Span.startPosition(), parentIndentationDeltaSize);
                }
            }
            return indentationInfo;
        };
        Indenter.prototype.ApplyIndentationDelta1 = function (tokenStartPosition, delta) {
            // Get current indentation
            var snapshotLine = this.snapshot.GetLineFromPosition(tokenStartPosition);
            var currentIndentSpan = new Span(snapshotLine.startPosition(), tokenStartPosition - snapshotLine.startPosition());
            var currentIndent = this.snapshot.GetText(currentIndentSpan);
            // Calculate new indentation from current-indentation and delta
            return this.ApplyIndentationDelta2(currentIndent, delta);
        };
        Indenter.prototype.ApplyIndentationDelta2 = function (currentIndent, delta) {
            if (delta == 0)
                return null;
            var currentIndentSize = Indenter.GetIndentSizeFromIndentText(currentIndent, this.editorOptions);
            var newIndentSize = currentIndentSize + delta;
            if (newIndentSize < 0) {
                newIndentSize = 0;
            }
            var newIndent = this.GetIndentString(null, newIndentSize, this.editorOptions.TabSize, this.editorOptions.ConvertTabsToSpaces);
            if (newIndent != null) {
                return new IndentationInfo(newIndent, 0);
            }
            return null;
        };
        Indenter.prototype.GetIndentationDelta = function (tokenStartPosition, childTokenStartPosition /*?*/) {
            Debug.Assert(childTokenStartPosition !== undefined, "Error: caller must pass 'null' for undefined position");
            var indentationDeltaSize = this.offsetIndentationDeltas.GetValue(tokenStartPosition);
            if (indentationDeltaSize === null) {
                var indentEditInfo = this.indentationBag.FindIndent(tokenStartPosition);
                // No recorded indentation, return null
                if (indentEditInfo == null)
                    return null;
                var origIndentText = this.snapshot.GetText(new Span(indentEditInfo.OrigIndentPosition, indentEditInfo.OrigIndentLength()));
                var newIndentText = indentEditInfo.Indentation();
                var origIndentSize = Indenter.GetIndentSizeFromText(origIndentText, this.editorOptions, /*includeNonIndentChars*/ true);
                var newIndentSize = Indenter.GetIndentSizeFromIndentText(newIndentText, this.editorOptions);
                // Check the child's position whether it's before the parent position
                // if so indent the child based on the first token on the line as opposed to the parent position
                //
                // Example of relative to parent (not line), relative indentation should be "4 (newIndentSize) - 9 (indentSize up to for) = -5"
                //
                // if (1) { for (i = 0; i < 10;       =>          if (1) {
                //                      i++) {                       for (i = 0; i < 10;
                //                                                               i++) {
                //
                // Example of relative to line, relative indentation should be "4 (newIndentSize) - 0 (indentSize up to if) = 4"
                //
                // if (1) { for (i = 0; i < 10;      =>          if (1) {
                //     i++) {                                        for (i = 0; i < 10;
                //                                                       i++) {
                if (childTokenStartPosition !== null) {
                    var childTokenLineStartPosition = this.snapshot.GetLineFromPosition(childTokenStartPosition).startPosition();
                    var childIndentText = this.snapshot.GetText(new Span(childTokenLineStartPosition, childTokenStartPosition - childTokenLineStartPosition));
                    var childIndentSize = Indenter.GetIndentSizeFromIndentText(childIndentText, this.editorOptions);
                    if (childIndentSize < origIndentSize)
                        origIndentSize = Indenter.GetIndentSizeFromIndentText(origIndentText, this.editorOptions);
                }
                indentationDeltaSize = newIndentSize - origIndentSize;
                this.offsetIndentationDeltas.Add(tokenStartPosition, indentationDeltaSize);
            }
            return indentationDeltaSize;
        };
        Indenter.prototype.FillInheritedIndentation = function (tree) {
            var offset = -1;
            var indentNode = null;
            if (tree.StartNodeSelf != null) {
                if (!this.smartIndent && tree.StartNodePreviousSibling !== null && tree.StartNodeSelf.AuthorNode.Label == 0 && tree.StartNodePreviousSibling.Label == 0) {
                    indentNode = tree.StartNodeSelf;
                    offset = tree.StartNodePreviousSibling.Details.StartOffset;
                    // In case the sibling node is on the same line of a parent node, ex:
                    //      case 1: a++;
                    //          break;
                    // In this example, the sibling of break is a++ but a++ is on the same line of its parent.
                    var lineNum = this.snapshot.GetLineNumberFromPosition(offset);
                    var node = indentNode;
                    while (node.Parent != null && this.snapshot.GetLineNumberFromPosition(node.Parent.AuthorNode.Details.StartOffset) == lineNum) {
                        node = node.Parent;
                        if (node.CanIndent()) {
                            indentNode = node;
                            indentNode.IndentationDelta = 0;
                        }
                    }
                }
                else {
                    var parent;
                    // Otherwise base on parent indentation.
                    if (this.smartIndent) {
                        // in smartIndent the self node is the parent node since it's the closest node to the new line
                        // ... unless in case if the startNodeSelf represents the firstToken then we need to choose its parent
                        parent = tree.StartNodeSelf;
                        while (parent != null && parent.AuthorNode.Details.StartOffset == this.firstToken.Span.startPosition())
                            parent = parent.Parent;
                    }
                    else {
                        // Get the parent that is really on a different line from the self node
                        var startNodeLineNumber = this.snapshot.GetLineNumberFromPosition(tree.StartNodeSelf.AuthorNode.Details.StartOffset);
                        parent = tree.StartNodeSelf.Parent;
                        while (parent != null &&
                            startNodeLineNumber == this.snapshot.GetLineNumberFromPosition(parent.AuthorNode.Details.StartOffset)) {
                            parent = parent.Parent;
                        }
                    }
                    // The parent node to take its indentation is the first parent that has indentation.
                    while (parent != null && !parent.CanIndent()) {
                        parent = parent.Parent;
                    }
                    // Skip Program since it has no indentation
                    if (parent != null && parent.AuthorNode.Details.Kind != AuthorParseNodeKind.apnkProg) {
                        offset = parent.AuthorNode.Details.StartOffset;
                        indentNode = parent;
                    }
                }
            }
            if (indentNode != null) {
                var indentOverride = this.GetLineIndentationForOffset(offset);
                // Set the indentation on all the siblings to be the same as indentNode
                if (!this.smartIndent && tree.StartNodePreviousSibling !== null && indentNode.Parent != null) {
                    ParseNodeExtensions.GetChildren(indentNode.Parent).foreach(function (sibling) {
                        if (sibling !== indentNode) {
                            if (sibling.CanIndent())
                                sibling.SetIndentationOverride(indentOverride);
                        }
                    });
                }
                // Set the indent override string on the indent node and on every parent (on different line) after adjusting the indent by the negative delta
                var lastDelta = 0;
                var lastLine = this.snapshot.GetLineNumberFromPosition(indentNode.AuthorNode.Details.StartOffset);
                do {
                    var currentLine = this.snapshot.GetLineNumberFromPosition(indentNode.AuthorNode.Details.StartOffset);
                    if (lastLine != currentLine) {
                        lastLine = currentLine;
                        indentOverride = this.ApplyIndentationLevel(indentOverride, -lastDelta);
                        lastDelta = 0;
                    }
                    if (indentNode.CanIndent()) {
                        indentNode.SetIndentationOverride(indentOverride);
                        lastDelta = indentNode.IndentationDelta;
                    }
                    indentNode = indentNode.Parent;
                } while (indentNode != null);
            }
        };
        Indenter.prototype.GetLineIndentationForOffset = function (offset) {
            var indentationEdit;
            // First check if we already have indentation info in our indentation bag
            indentationEdit = this.indentationBag.FindIndent(offset);
            if (indentationEdit != null) {
                return indentationEdit.Indentation();
            }
            else {
                // Otherwise, use the indentation from the textBuffer
                var line = this.snapshot.GetLineFromPosition(offset);
                var lineText = line.getText();
                var index = 0;
                while (index < lineText.length && (lineText.charAt(index) == ' ' || lineText.charAt(index) == '\t')) {
                    ++index;
                }
                return lineText.substr(0, index);
            }
        };
        Indenter.prototype.RegisterIndentation = function (indent, sameLineIndent) {
            var indentationInfo = null;
            if (sameLineIndent) {
                // Consider the original indentation from the beginning of the line up to the indent position (or really the token position)
                var lineStartPosition = this.snapshot.GetLineFromPosition(indent.Position).startPosition();
                var lineIndentLength = indent.Position - lineStartPosition;
                indentationInfo = IndentationEditInfo.create2(indent.Position, indent.ReplaceWith, lineStartPosition, lineIndentLength);
            }
            else {
                indentationInfo = new IndentationEditInfo(indent);
            }
            this.indentationBag.AddIndent(indentationInfo);
        };
        Indenter.prototype.RegisterIndentation2 = function (position, indent) {
            this.RegisterIndentation(new TextEditInfo(position, 0, indent), false);
        };
        Indenter.prototype.AdjustStartOffsetIfNeeded = function (token, node) {
            if (token == null)
                return;
            var updateStartOffset = false;
            switch (token.Token) {
                case AuthorTokenKind.atkFunction:
                    updateStartOffset = node.AuthorNode.Details.Kind == AuthorParseNodeKind.apnkFncDecl;
                    break;
                case AuthorTokenKind.atkLCurly:
                    updateStartOffset = node.AuthorNode.Details.Kind == AuthorParseNodeKind.apnkObject;
                    break;
                case AuthorTokenKind.atkLBrack:
                    updateStartOffset = node.AuthorNode.Details.Kind == AuthorParseNodeKind.apnkArray;
                    break;
            }
            if (updateStartOffset) {
                ParseNodeExtensions.SetNodeSpan(node, token.Span.startPosition(), node.AuthorNode.Details.EndOffset);
            }
        };
        Indenter.prototype.IsMultiLineString = function (token) {
            return token.tokenID === TypeScript.TokenID.StringLiteral &&
                this.snapshot.GetLineNumberFromPosition(token.Span.endPosition()) > this.snapshot.GetLineNumberFromPosition(token.Span.startPosition());
        };
        return Indenter;
    }());
    Formatting.Indenter = Indenter;
})(Formatting || (Formatting = {}));
