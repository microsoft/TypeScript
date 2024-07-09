// @Filename: emitMemberAccessExpression_file1.ts
/// <reference path="emitMemberAccessExpression_file3.ts" />
"use strict";

// @Filename: emitMemberAccessExpression_file2.ts
/// <reference path="emitMemberAccessExpression_file3.ts" />
"use strict";
module Microsoft.PeopleAtWork.Model {
    export class _Person {
        public populate(raw: any) {
            var res = Model.KnockoutExtentions;
        }
    }
}

// @Filename: emitMemberAccessExpression_file3.ts
/// <reference path="emitMemberAccessExpression_file2.ts" />
/// <reference path="emitMemberAccessExpression_file1.ts" />
declare var OData: any;
module Microsoft.PeopleAtWork.Model {
    export class KnockoutExtentions {
    }
}