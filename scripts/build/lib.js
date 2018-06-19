// @ts-check
const readJson = require("./readJson");
const path = require("path");
const gulp = require("./gulp");
const newer = require("gulp-newer");
const concat = require("gulp-concat");

module.exports = exports = makeLibraryTargets;

/** @type {{ libs: string[], paths?: Record<string, string>, sources?: Record<string, string[]> }} */
const libraries = readJson("./src/lib/libs.json");

/**
 * @param {string[]} prepends 
 */
function makeLibraryTargets(prepends) {
    return libraries.libs.map(lib => {
        const relativeSources = ["header.d.ts"].concat(libraries.sources && libraries.sources[lib] || [lib + ".d.ts"]);
        const relativeTarget = libraries.paths && libraries.paths[lib] || ("lib." + lib + ".d.ts");
        const sources = prepends.concat(relativeSources.map(s => path.posix.join("src/lib", s)));
        const target = `built/local/${relativeTarget}`;
        gulp.task(target, /*help*/ false, [], () =>
            gulp.src(sources)
                .pipe(newer(target))
                .pipe(concat(relativeTarget, { newLine: "\n\n" }))
                .pipe(gulp.dest("built/local")));
        return target;
    });
}