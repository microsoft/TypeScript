/// <reference path="fourslash.ts" />

////var /**/x = /aa/;

verify.quickInfoAt("", `var x: RegExp<["aa"], undefined, {
    hasIndices: false;
    global: false;
    ignoreCase: false;
    multiline: false;
    dotAll: false;
    unicode: false;
    unicodeSets: false;
    sticky: false;
}>`);
