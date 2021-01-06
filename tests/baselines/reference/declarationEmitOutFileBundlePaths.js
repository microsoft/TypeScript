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
declare module "mylib/versions.static" {
    var _default: {
        "@a/b": string;
        "@a/c": string;
    };
    export default _default;
}
declare module "mylib" {
    export { versions };
    import versions from "./versions.static.js";
}


//// [DtsFileErrors]


js/index.d.ts(10,5): error TS2439: Import or export declaration in an ambient module declaration cannot reference module through relative module name.
js/index.d.ts(10,26): error TS2307: Cannot find module './versions.static.js' or its corresponding type declarations.


==== ./js/index.d.ts (2 errors) ====
    declare module "mylib/versions.static" {
        var _default: {
            "@a/b": string;
            "@a/c": string;
        };
        export default _default;
    }
    declare module "mylib" {
        export { versions };
        import versions from "./versions.static.js";
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS2439: Import or export declaration in an ambient module declaration cannot reference module through relative module name.
                             ~~~~~~~~~~~~~~~~~~~~~~
!!! error TS2307: Cannot find module './versions.static.js' or its corresponding type declarations.
    }
    