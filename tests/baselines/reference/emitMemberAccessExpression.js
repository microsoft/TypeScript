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
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true, writable: false, enumerable: false
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
var Microsoft;
(function (Microsoft) {
    var PeopleAtWork;
    (function (PeopleAtWork) {
        var Model;
        (function (Model) {
            var _Person = (function () {
                function _Person() {
                }
                _Person.prototype.populate = function (raw) {
                    var res = Model.KnockoutExtentions;
                };
                __names(_Person.prototype, ["populate"]);
                return _Person;
            }());
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
    var PeopleAtWork;
    (function (PeopleAtWork) {
        var Model;
        (function (Model) {
            var KnockoutExtentions = (function () {
                function KnockoutExtentions() {
                }
                return KnockoutExtentions;
            }());
            Model.KnockoutExtentions = KnockoutExtentions;
        })(Model = PeopleAtWork.Model || (PeopleAtWork.Model = {}));
    })(PeopleAtWork = Microsoft.PeopleAtWork || (Microsoft.PeopleAtWork = {}));
})(Microsoft || (Microsoft = {}));
