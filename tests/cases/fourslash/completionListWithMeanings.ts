/// <reference path="fourslash.ts" />

////namespace m { export interface point2 { } }
////namespace m2 { export var zz = 10; }
////namespace m3 { export var zz2 = 10; export interface point3 { } }
////interface point {
////    x: number;
////    y: number;
////}
////var xx = 10;
////var tt = /*valueExpr*/xx;
////var yy: /*typeExpr*/point = { x: 4, y: 3 + /*valueExprInObjectLiteral*/tt };
////var kk: m3.point3/*membertypeExpr*/ = m3.zz2/*membervalueExpr*/;
////var zz = </*typeExpr2*/point>{ x: 4, y: 3 };

const markers = test.markerNames();

function getVerifyBasedOnMarker(marker: string, meaning: string) {
    return marker.indexOf(meaning) === 0 ? verify : verify.not;
}

function verifyCompletions(verify: FourSlashInterface.verifyNegatable, completions: CompletionInfo[]) {
    for (const info of completions) {
        verify.completionListContains(info[0], info[1]);
    }
}

type CompletionInfo = [string, string];
function verifyCompletionsExistForMeaning(marker: string, meaning: string, completions: CompletionInfo[]) {
    verifyCompletions(getVerifyBasedOnMarker(marker, meaning), completions);
}

function verifyCompletionsDoNotExistForMeaning(marker: string, meaning: string, completions: CompletionInfo[]) {
    verifyCompletions(getVerifyBasedOnMarker(marker, meaning) === verify.not ? verify : verify.not, completions);
}

const values: CompletionInfo[] = [
    ["xx", "var xx: number"],
    ["tt", "var tt: number"],
    ["yy", "var yy: point"],
    ["zz", "var zz: point"],
    ["m2", "namespace m2"], // With no type side, allowed only in value
];

const types: CompletionInfo[] = [
    ["point", "interface point"],
    ["m", "namespace m"], // Uninstantiated namespace only allowed at type locations
];

const namespaces: CompletionInfo[] = [
    ["m3", "namespace m3"], // Has both type and values, allowed in all locations
];

const membervalues: CompletionInfo[] = [
    ["zz2", "var m3.zz2: number"],
];


const membertypes: CompletionInfo[] = [
    ["point3", "interface m3.point3"],
];

for (const marker of markers) {
    goTo.marker(marker);
    verifyCompletionsExistForMeaning(marker, "value", values);
    verifyCompletionsExistForMeaning(marker, "type", types);
    verifyCompletionsExistForMeaning(marker, "membervalue", membervalues);
    verifyCompletionsExistForMeaning(marker, "membertype", membertypes);
    verifyCompletionsDoNotExistForMeaning(marker, "member", namespaces);
}