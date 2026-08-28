//// [tests/cases/compiler/contentMapperDeclarationEmitFailure.ts] ////

//// [package.json]
{
    "name": "mapper",
    "version": "1.0.0",
    "typescript": { "contentMapper": { "exec": ["failing-mapper"] } }
}

//// [component.vue]




//// [component.d.vue.ts]
//# sourceMappingURL=component.d.vue.ts.map