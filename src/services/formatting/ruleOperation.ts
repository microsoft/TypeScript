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
    export class RuleOperation {
        public Context: RuleOperationContext;
        public Action: RuleAction;

        constructor() {
            this.Context = null;
            this.Action = null;
        }

        public toString(): string {
            return "[context=" + this.Context + "," +
                "action=" + this.Action + "]";
        }

        static create1(action: RuleAction) {
            return RuleOperation.create2(RuleOperationContext.Any, action)
        }

        static create2(context: RuleOperationContext, action: RuleAction) {
            var result = new RuleOperation();
            result.Context = context;
            result.Action = action;
            return result;
        }
    }
}