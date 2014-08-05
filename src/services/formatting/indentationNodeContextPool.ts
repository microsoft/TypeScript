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

///<reference path='formatting.ts' />

module TypeScript.Services.Formatting {
    export class IndentationNodeContextPool {
        private nodes: IndentationNodeContext[] = [];

        public getNode(parent: IndentationNodeContext, node: ISyntaxNode, fullStart: number, indentationLevel: number, childIndentationLevelDelta: number): IndentationNodeContext {
            if (this.nodes.length > 0) {
                var cachedNode = this.nodes.pop();
                cachedNode.update(parent, node, fullStart, indentationLevel, childIndentationLevelDelta);
                return cachedNode;
            }

            return new IndentationNodeContext(parent, node, fullStart, indentationLevel, childIndentationLevelDelta);
        }

        public releaseNode(node: IndentationNodeContext, recursive: boolean = false): void {
            this.nodes.push(node);

            if (recursive) {
                var parent = node.parent();
                if (parent) {
                    this.releaseNode(parent, recursive);
                }
            }
        }
    }
}