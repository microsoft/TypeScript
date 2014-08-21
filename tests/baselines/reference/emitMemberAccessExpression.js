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
    (function (PeopleAtWork) {
        (function (Model) {
            var _Person = (function () {
                function _Person() {
                }
                _Person.prototype.populate = function (raw) {
                    var res = Model.KnockoutExtentions;
                };
                return _Person;
            })();
            Model._Person = _Person;
        })(PeopleAtWork.Model || (PeopleAtWork.Model = {}));
        var Model = PeopleAtWork.Model;
    })(Microsoft.PeopleAtWork || (Microsoft.PeopleAtWork = {}));
    var PeopleAtWork = Microsoft.PeopleAtWork;
})(Microsoft || (Microsoft = {}));
//// [emitMemberAccessExpression_file1.js]
/// <reference path="emitMemberAccessExpression_file3.ts" />
"use strict";
//// [emitMemberAccessExpression_file3.js]
var Microsoft;
(function (Microsoft) {
    (function (PeopleAtWork) {
        (function (Model) {
            var KnockoutExtentions = (function () {
                function KnockoutExtentions() {
                }
                return KnockoutExtentions;
            })();
            Model.KnockoutExtentions = KnockoutExtentions;
        })(PeopleAtWork.Model || (PeopleAtWork.Model = {}));
        var Model = PeopleAtWork.Model;
    })(Microsoft.PeopleAtWork || (Microsoft.PeopleAtWork = {}));
    var PeopleAtWork = Microsoft.PeopleAtWork;
})(Microsoft || (Microsoft = {}));
