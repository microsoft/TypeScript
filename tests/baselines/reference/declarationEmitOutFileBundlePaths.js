//// [tests/cases/compiler/declarationEmitOutFileBundlePaths.ts] ////

//// [versions.static.js]
export default {
    "@a/b": "1.0.0",
    "@a/c": "1.2.3"
};
//// [index.js]
import versions from './versions.static.js';

export {
    versions
};




//// [index.d.ts]
declare module "versions.static" {
    const _default: {
        "@a/b": string;
        "@a/c": string;
    };
    export default _default;
}
declare module "index" {
    export { versions };
    import versions from "js/versions.static";
}


//// [DtsFileErrors]


js/index.d.ts(10,26): error TS2307: Cannot find module 'js/versions.static' or its corresponding type declarations.


==== js/index.d.ts (1 errors) ====
    declare module "versions.static" {
        const _default: {
            "@a/b": string;
            "@a/c": string;
        };
        export default _default;
    }
    declare module "index" {
        export { versions };
        import versions from "js/versions.static";
                             ~~~~~~~~~~~~~~~~~~~~
!!! error TS2307: Cannot find module 'js/versions.static' or its corresponding type declarations.
    }
    