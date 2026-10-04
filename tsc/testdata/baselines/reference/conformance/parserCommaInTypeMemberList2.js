//// [tests/cases/conformance/parser/ecmascript5/ErrorRecovery/parserCommaInTypeMemberList2.ts] ////

//// [parserCommaInTypeMemberList2.ts]
var s = $.extend< { workItem: any }, { workItem: any, width: string }>({ workItem: this._workItem }, {});


//// [parserCommaInTypeMemberList2.js]
"use strict";
var s = $.extend({ workItem: this._workItem }, {});
