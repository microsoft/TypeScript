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

module TypeScript {
    export class MemberName {
        public prefix: string = "";
        public suffix: string = "";

        public isString() { return false; }
        public isArray() { return false; }
        public isMarker() { return !this.isString() && !this.isArray(); }

        public toString(): string {
            return MemberName.memberNameToString(this);
        }

        static memberNameToString(memberName: MemberName, markerInfo?: number[], markerBaseLength: number = 0): string {
            var result = memberName.prefix;

            if (memberName.isString()) {
                result += (<MemberNameString>memberName).text;
            }
            else if (memberName.isArray()) {
                var ar = <MemberNameArray>memberName;
                for (var index = 0; index < ar.entries.length; index++) {
                    if (ar.entries[index].isMarker()) {
                        if (markerInfo) {
                            markerInfo.push(markerBaseLength + result.length);
                        }
                        continue;
                    }

                    result += MemberName.memberNameToString(ar.entries[index], markerInfo, markerBaseLength + result.length);
                    result += ar.delim;
                }
            }

            result += memberName.suffix;
            return result;
        }

        static create(text: string): MemberName;
        static create(entry: MemberName, prefix: string, suffix: string): MemberName;
        static create(arg1: any, arg2?: any, arg3?: any): MemberName {
            if (typeof arg1 === "string") {
                return new MemberNameString(arg1);
            }
            else {
                var result = new MemberNameArray();
                if (arg2)
                    result.prefix = arg2;
                if (arg3)
                    result.suffix = arg3;
                result.entries.push(arg1);
                return result;
            }
        }
    }

    export class MemberNameString extends MemberName {
        constructor(public text: string) {
            super();
        }

        public isString() { return true; }
    }

    export class MemberNameArray extends MemberName {
        public delim: string = "";
        public entries: MemberName[] = [];

        public isArray() { return true; }

        public add(entry: MemberName) {
            this.entries.push(entry);
        }

        public addAll(entries: MemberName[]) {
            for (var i = 0 ; i < entries.length; i++) {
                this.entries.push(entries[i]);
            }
        }

        constructor() {
            super();
        }
    }
}