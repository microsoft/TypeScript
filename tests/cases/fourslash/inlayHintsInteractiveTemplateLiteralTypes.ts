/// <reference path="fourslash.ts" />

//// declare function getTemplateLiteral1(): `${string},${string}`;
//// const lit1 = getTemplateLiteral1();
//// declare function getTemplateLiteral2(): `\${${string},${string}`;
//// const lit2 = getTemplateLiteral2();
//// declare function getTemplateLiteral3(): `start${string}\${,$${string}end`;
//// const lit3 = getTemplateLiteral3();
//// declare function getTemplateLiteral4(): `${string}\`,${string}`;
//// const lit4 = getTemplateLiteral4();


verify.baselineInlayHints(undefined, {
    includeInlayVariableTypeHints: true,
    interactiveInlayHints: true
});
