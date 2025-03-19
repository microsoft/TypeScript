//// [tests/cases/compiler/emitMemberAccessExpression.ts] ////

//// [emitMemberAccessExpression_file1.ts]
/// <reference path="emitMemberAccessExpression_file3.ts" />
"use strict";

//// [emitMemberAccessExpression_file2.ts]
/// <reference path="emitMemberAccessExpression_file3.ts" />
"use strict";
module Microsoft.PeopleAtWork.Model {
    export class _Person {
        public populate(raw: any) {
            var res = Model.KnockoutExtentions;
        }
    }
}

//// [emitMemberAccessExpression_file3.ts]
/// <reference path="emitMemberAccessExpression_file2.ts" />
/// <reference path="emitMemberAccessExpression_file1.ts" />
declare var OData: any;
module Microsoft.PeopleAtWork.Model {
    export class KnockoutExtentions {
    }
}

//// [emitMemberAccessExpression_file2.js]
/// <reference path="emitMemberAccessExpression_file3.ts" />
"use strict";
var Microsoft;
(function (Microsoft) {
    let PeopleAtWork;
    (function (PeopleAtWork) {
        let Model;
        (function (Model) {
            class _Person {
                populate(raw) {
                    var res = Model.KnockoutExtentions;
                }
            }
            Model._Person = _Person;
        })(Model = PeopleAtWork.Model || (PeopleAtWork.Model = {}));
    })(PeopleAtWork = Microsoft.PeopleAtWork || (Microsoft.PeopleAtWork = {}));
})(Microsoft || (Microsoft = {}));
//// [emitMemberAccessExpression_file1.js]
/// <reference path="emitMemberAccessExpression_file3.ts" />
"use strict";
//// [emitMemberAccessExpression_file3.js]
/// <reference path="emitMemberAccessExpression_file2.ts" />
/// <reference path="emitMemberAccessExpression_file1.ts" />
var Microsoft;
(function (Microsoft) {
    let PeopleAtWork;
    (function (PeopleAtWork) {
        let Model;
        (function (Model) {
            class KnockoutExtentions {
            }
            Model.KnockoutExtentions = KnockoutExtentions;
        })(Model = PeopleAtWork.Model || (PeopleAtWork.Model = {}));
    })(PeopleAtWork = Microsoft.PeopleAtWork || (Microsoft.PeopleAtWork = {}));
})(Microsoft || (Microsoft = {}));
