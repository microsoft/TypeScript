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

///<reference path='typescript.ts' />

module TypeScript {

    export class IncrementalParser {
        
        private astLogger: AstLogger;

        constructor (private logger: TypeScript.ILogger) {
            this.astLogger = new AstLogger(this.logger);
        }

        //
        // Return "null" if "editRange" cannot be safely determined to be inside a single scope.
        //
        public getEnclosingScopeContextIfSingleScopeEdit(previousScript: Script, scriptId: string, newSourceText: ISourceText, editRange: ScriptEditRange): EnclosingScopeContext {
            this.logger.log("checkEditsInsideSingleScope(\"" + scriptId + "\")");

            if (editRange === null) {
                throw new Error("editRange should be valid");
            }

            if (editRange.isUnknown()) {
                this.logger.log("  Bailing out because edit range is unknown");
                return null;
            }

            var scope1 = TypeScript.findEnclosingScopeAt(this.logger, previousScript, newSourceText, editRange.minChar, false/*isMemberCompletion*/);
            var scope2 = TypeScript.findEnclosingScopeAt(this.logger, previousScript, newSourceText, editRange.limChar, false/*isMemberCompletion*/);
            if (scope1 == null || scope2 == null) {
                this.logger.log("  Bailing out because containing scopes cannot be determined");
                return null;
            }

            // We only support changes within a single containing scope
            if (scope1.scopeStartAST !== scope2.scopeStartAST) {
                this.logger.log("  Bailing out because edit overlaps 2 disctint scopes");
                return null;
            }

            var newScopeLength = scope1.scopeStartAST.limChar - scope1.scopeStartAST.minChar + editRange.delta;
            if (newScopeLength <= 0) {
                this.logger.log("  Bailing out because scope has been entirely removed from new source text");
                return null;
            }

            return scope1;
        }

        public attemptIncrementalUpdateUnit(previousScript: Script, scriptId: string, newSourceText: ISourceText, editRange: ScriptEditRange): UpdateUnitResult {
            this.logger.log("attemptIncrementalUpdateUnit(\"" + scriptId + "\")");

            if (editRange === null) {
                throw new Error("editRange should be valid");
            }

            var scope1 = this.getEnclosingScopeContextIfSingleScopeEdit(previousScript, scriptId, newSourceText, editRange);
            if (scope1 === null) {
                return null;
            }

            var newScopeLength = scope1.scopeStartAST.limChar - scope1.scopeStartAST.minChar + editRange.delta;

            // Heuristic: if the range to reparse is too big, bail out. 
            // This is because a full parse will be faster than an incremental parse followed by all the necessary fix-ups 
            if (newScopeLength >= newSourceText.getLength() / 2) {
                this.logger.log("  Bailing out because range of scope to reparse (" + newScopeLength + " characters) is greater than half the size of the source text");
                return null;
            }

            // Capture parsing errors so that they are part of "updateResult"
            var parseErrors: TypeScript.ErrorEntry[] = [];
            var errorCapture = function(minChar: number, charLen: number, message: string, unitIndex: number): void {
                parseErrors.push(new TypeScript.ErrorEntry(unitIndex, minChar, minChar + charLen, message));
            };

            var quickParseResult = TypeScript.quickParse(this.logger, scope1.scopeStartAST, newSourceText, scope1.scopeStartAST.minChar, scope1.scopeStartAST.minChar + newScopeLength, errorCapture);
            if (quickParseResult.endLexState != TypeScript.LexState.Start) {
                this.logger.log("  Bailing out because scope contains unterminated comment");
                return null;
            }

            var scriptFragment = quickParseResult.Script;
            if (scriptFragment.vars.members.length !== 0) {
                this.logger.log("  Bailing out because new source text defines variables");
                return null;
            }

            //if (scriptFragment.scopes.members.length !== 1) {
            //    logger.log("  Bailing out because new source text defines more than one scope (or none)");
            //    return null;
            //}

            // This detects adding close curlies, since they have the side effect of having the parser 
            // parse more members in the scope range.
            if (scriptFragment.bod.members.length !== 1) {
                this.logger.log("  Bailing out because new source text defines more than one scope (or none)");
                return null;
            }

            var oldScope = scope1.scopeStartAST;
            var newScope = scriptFragment.bod.members[0];

            if (oldScope.nodeType != newScope.nodeType) {
                this.logger.log("  Bailing out because new source text does not define the same scope type as the existing scope");
                return null;
            }

            if (!(<any>oldScope).leftCurlyCount || !(<any>oldScope).rightCurlyCount) {
                this.logger.log("  Bailing out because sopce doesn't have left/right curly count");
                return null;
            }

            if ((<any>oldScope).leftCurlyCount !== (<any>newScope).leftCurlyCount) {
                this.logger.log("  Bailing out because new source text contains more (or fewer) left curly braces");
                return null;
            }

            if ((<any>oldScope).rightCurlyCount !== (<any>newScope).rightCurlyCount) {
                this.logger.log("  Bailing out because new source text contains more (or fewer) right curly braces");
                return null;
            }

            if (newScope.minChar !== 0) {
                this.logger.log("  Bailing out because new function declaration does not start at position 0");
                return null;
            }

            if (newScope.limChar !== newScopeLength) {
                this.logger.log("  Bailing out because new function declaration does not end at the new end position");
                return null;
            }

            return TypeScript.UpdateUnitResult.singleScopeEdits(previousScript, scriptFragment, oldScope, newScope, editRange, parseErrors);
        }

        public mergeTrees(updateResult: UpdateUnitResult): void {
            TypeScript.timeFunction(this.logger, "mergeTrees()", () => {
                var editRange = new ScriptEditRange(updateResult.scope1.minChar, updateResult.scope1.limChar, updateResult.editRange.delta);
                // Update positions in current ast
                this.applyDeltaPosition(updateResult.script1, editRange.limChar, editRange.delta);
                // Update positions in new (partial) ast
                this.applyDeltaPosition(updateResult.script2, 0, editRange.minChar);
                // Merge linemaps
                this.mergeLocationInfo(updateResult.script1, updateResult.script2, editRange);
                //  Replace old AST for scope with new one
                this.replaceAST(updateResult.script1, updateResult.scope1, updateResult.scope2);
            });
        }

        private replaceAST(script: TypeScript.AST, oldAst: TypeScript.AST, newAst: TypeScript.AST) {
            var pre = (cur: TypeScript.AST, parent: TypeScript.AST, walker: TypeScript.IAstWalker) => {
                if (cur === oldAst) {
                    // Transfer comments ownership to new AST. We need this because when "quick parsing" the
                    // new AST, we don't take into account the text before and after the "minChar/limChar" pair
                    // of the scope, which don't include pre/post-comments.
                    newAst.preComments = cur.preComments;
                    newAst.postComments = cur.postComments;

                    this.logger.log("replaced old AST node with new one in script AST");
                    walker.options.stopWalk();
                    return newAst;
                }

                // Avoid visiting sub-trees outside of the edit range
                if (TypeScript.isValidAstNode(cur)) {
                    if (cur.limChar < oldAst.minChar || cur.minChar > oldAst.limChar) {
                        walker.options.goChildren = false;
                    }
                }
                return cur;
            }

            TypeScript.getAstWalkerFactory().walk(script, pre);
        }

        private mergeLocationInfo(script: TypeScript.Script, partial: TypeScript.Script, editRange: ScriptEditRange) {
            // Don't merger these fields, as the original script has the right values
            //script.locationInfo.unitIndex = partial.locationInfo.unitIndex;
            //script.locationInfo.filename = partial.locationInfo.filename;

            var lineMap1 = script.locationInfo.lineMap;
            var lineMap2 = partial.locationInfo.lineMap;

            if (this.logger.information()) {
                this.logger.log("lineMap1 (before):");
                this.astLogger.logLinemap(lineMap1);
                this.logger.log("lineMap2 (quick parse):");
                this.astLogger.logLinemap(lineMap2);
                this.logger.log("EditRange=" + editRange);
            }

            // Skip entries < minChar
            var i1 = 2; // lineMap[0] is always undefined, lineMap[1] is always 0.
            var i2 = 2; // lineMap[0] is always undefined, lineMap[1] is always 0.
            var len1 = lineMap1.length;
            var len2 = lineMap2.length;
            while (i1 < len1) {
                if (lineMap1[i1] <= editRange.minChar) {
                    // Nothing to do for this entry, since it's before the range of the change
                    i1++;
                } else if (lineMap1[i1] >= editRange.limChar) {
                    // Apply delta to this entry, since it's outside the range of the change
                    lineMap1[i1] += editRange.delta;
                    i1++;
                }
                else {
                    if (i2 < len2) {
                        // Add a new entry to lineMap1 corresponding to lineMap2 in new range
                        lineMap1.splice(i1, 0, lineMap2[i2] + editRange.minChar);
                        i1++;
                        len1++;
                        i2++;
                    }
                    else { /* i2 >= len 2 */
                        // Remove this entry, since there is no corresponding entry in the new map
                        lineMap1.splice(i1, 1);
                        len1--;
                    }
                }
            }
            // Merge the remaining entries in lineMap2 while maintaing the constraint that a lineMap is sorted
            if (i2 < len2) {
                // i1 >= len1 && i2 < len2 
                if (lineMap1[len1 - 1] >= (lineMap2[i2] + editRange.minChar)) {
                    // lineMap2 needs to be merged within lineMap1
                    i1 = 2;
                    while (i1 < len1 && i2 < len2) {
                        if (lineMap1[i1] < (lineMap2[i2] + editRange.minChar)) {
                            i1++;
                        }
                        else {
                            lineMap1.splice(i1, 0, lineMap2[i2] + editRange.minChar);
                            i1++;
                            len1++;
                            i2++;
                        }
                    }
                }

                // Append all the remaining entries in lineMap2 to the end of lineMap1
                for (; i2 < len2; i2++) {
                    lineMap1.push(lineMap2[i2] + editRange.minChar);
                }
            }

            if (this.logger.information()) {
                this.logger.log("lineMap1 (after merge):");
                this.astLogger.logLinemap(lineMap1);
            }
        }

        private applyDeltaPosition(ast: TypeScript.AST, start: number, delta: number) {
            var applyDelta = (ast: TypeScript.AST) => {
                if (ast.minChar !== -1 && ast.minChar >= start) {
                    ast.minChar += delta;
                }
                if (ast.limChar !== -1 && ast.limChar >= start) {
                    ast.limChar += delta;
                }
            }

            var applyDeltaToComments = (comments: TypeScript.Comment[]) => {
                if (comments && comments.length > 0) {
                    for (var i = 0; i < comments.length; i++) {
                        applyDelta(comments[i]);
                    }
                }
            }

            var pre = function(cur: TypeScript.AST, parent: TypeScript.AST, walker: TypeScript.IAstWalker) {
                // *Before* applying delta to this, check if we need to go to children
                if (cur.limChar !== -1 && cur.limChar < start) {
                    walker.options.goChildren = false; // Done with applying Delta for this sub-tree
                }

                // Apply delta to this node
                applyDelta(cur);
                applyDeltaToComments(cur.preComments);
                applyDeltaToComments(cur.postComments);

                return cur;
            }

            TypeScript.getAstWalkerFactory().walk(ast, pre);
        }
    }
}
