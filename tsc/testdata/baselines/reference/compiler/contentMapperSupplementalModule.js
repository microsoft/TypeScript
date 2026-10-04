//// [tests/cases/compiler/contentMapperSupplementalModule.ts] ////

//// [package.json]
{
    "name": "mapper",
    "version": "1.0.0",
    "typescript": { "contentMapper": { "exec": ["supplemental-module-mapper"] } }
}

//// [component.vue]
export default 1;



//// [component.vue.0.d.ts]
export declare const privateValue: number;
//// [component.d.vue.ts]
/// <reference path="./component.vue.0.d.ts" />
declare const _default = 1;
export default _default;
