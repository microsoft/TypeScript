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
    import versions from "mylib/versions.static";
}
