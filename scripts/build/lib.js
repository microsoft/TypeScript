// @ts-check
const readJson = require("./readJson");
const path = require("path");
const gulp = require("./gulp");
const newer = require("gulp-newer");
const concat = require("gulp-concat");
const merge2 = require("merge2");

/** @type {{ libs: string[], paths?: Record<string, string>, sources?: Record<string, string[]> }} */
const libraries = readJson("./src/lib/libs.json");
const libs = libraries.libs.map(lib => {
    const relativeSources = ["header.d.ts"].concat(libraries.sources && libraries.sources[lib] || [lib + ".d.ts"]);
    const relativeTarget = libraries.paths && libraries.paths[lib] || ("lib." + lib + ".d.ts");
    const sources = relativeSources.map(s => path.posix.join("src/lib", s));
    const target = `built/local/${relativeTarget}`;
    return { target, relativeTarget, sources };
});
exports.libraryTargets = libs.map(lib => lib.target);

/**
 * @param {string[]} prepends 
 */
function generateLibs(prepends) {
    return merge2(libs.map(({ sources, target, relativeTarget }) => 
        gulp.src(prepends.concat(sources))
            .pipe(newer(target))
            .pipe(concat(relativeTarget, { newLine: "\n\n" }))
            .pipe(gulp.dest("built/local"))));
}
exports.generateLibs = generateLibs;