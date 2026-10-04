//// [tests/cases/compiler/contentMapperSupplementalFileCollision.ts] ////

//// [package.json]
{
    "name": "mapper",
    "version": "1.0.0",
    "typescript": { "contentMapper": { "exec": ["supplemental-mapper"] } }
}

//// [component.astro]

//// [component.astro.0.ts]
export const existing = true;


//// [component.astro.0.js]
export const existing = true;
