/// <reference path="fourslash.ts"/>


////var Base = class { };
////class C extends Base implements [|Base|] { }

let ranges = test.ranges();
for (let range of ranges) {
    verify.referencesCountIs(0);
}