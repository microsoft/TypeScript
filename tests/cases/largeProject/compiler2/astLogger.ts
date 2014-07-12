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

module TypeScript2 {
    export class AstLogger {

        constructor (public logger: ILogger2) { }

        public logScript(script: TypeScript2.Script): void {
            this.logLinemap(script.locationInfo.lineMap);

            var stack: AST2[]= [];

            var pre = (cur: TypeScript2.AST2, parent: TypeScript2.AST2) => {
                stack.push(cur);
                var indent = (stack.length - 1) * 2;
                this.logComments(script, cur.preComments, indent);
                this.logNode(script, cur, indent);
                this.logComments(script, cur.postComments, indent);
                return cur;
            }

            var post = (cur: TypeScript2.AST2, parent: TypeScript2.AST2) => {
                stack.pop();
                return cur;
            }

            TypeScript2.getAstWalkerFactory().walk(script, pre, post);
        }


        public logNode(script: TypeScript2.Script, cur: TypeScript2.AST2, indent: number) {
            var msg = this.addPadding("", indent, "| ", true);

            msg = msg.concat("+ " + cur.treeViewLabel());
            msg = this.addPadding(msg, 70, " ", false);

            msg = msg + this.addLineColumn(script, cur.minChar);
            msg = this.addPadding(msg, 80, " ", false);

            msg = msg + "=> ";
            msg = msg + this.addLineColumn(script, cur.limChar);
            msg = this.addPadding(msg, 102, " ", false);

            msg = msg.concat("[" + this.addPadding(cur.minChar.toString(), 1, " ", true) + ", " + this.addPadding(cur.limChar.toString(), 1, " ", true) + "]");

            msg = this.addPadding(msg, 115, " ", false);
            msg = msg.concat("sym=" + (<any>cur).sym);

            msg = this.addPadding(msg, 135, " ", false);
            msg = msg.concat("type=" + (cur.type === null ? "null" : cur.type.getTypeName()));
            this.logger.log(msg);
        }

        private logComments(script: TypeScript2.Script, comments: TypeScript2.AST2[], indent: number) {
            if (comments == null)
                return;

            for (var i = 0; i < comments.length; i++) {
                this.logNode(script, comments[i], indent);
            }
        }

        public logLinemap(linemap: number[]) {
            var result = "[";
            for (var i = 0; i < linemap.length; i++) {
                if (i > 0)
                    result += ",";
                result += linemap[i];
            }
            result += "]";
            this.logger.log("linemap: " + result);
        }

        private addPadding(s: string, targetLength: number, paddingString: string, leftPadding: boolean): string {
            var result = (leftPadding ? "" : s);
            for (var i = s.length; i < targetLength; i++) {
                result = result + paddingString;
            }
            result = result + (leftPadding ? s : "");
            return result;
        }

        private addLineColumn(script: TypeScript2.Script, position: number): string {
            // just for calling getSourceLineColFromMap
            var lineInfo = {
                line: -1,
                col: -1
            }
            TypeScript2.getSourceLineColFromMap(lineInfo, position, script.locationInfo.lineMap);

            if (lineInfo.col !== -1) {
                lineInfo.col++; //TODO: function above seems to consider line as 1-based, and column as 0-based
            }

            return "(" + lineInfo.line + ", " + lineInfo.col + ")";
        }
    }
}
