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

    export class RuleOperationContext {
        private customContextChecks: { (context: FormattingContext): boolean; }[];
        
        constructor(...funcs: { (context: FormattingContext): boolean; }[]) {
            this.customContextChecks = funcs;
        }

        static Any: RuleOperationContext = new RuleOperationContext();


        public IsAny(): boolean {
            return this == RuleOperationContext.Any;
        }

        public  InContext(context: FormattingContext): boolean {
            if (this.IsAny()) {
                return true;
            }

            for (var i = 0, len = this.customContextChecks.length; i < len; i++) {
                if (!this.customContextChecks[i](context)) {
                    return false;
                }
            }
            return true;
        }
    }
}