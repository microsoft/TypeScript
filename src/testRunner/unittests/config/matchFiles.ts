import * as fakes from "../../_namespaces/fakes";
import * as ts from "../../_namespaces/ts";
import * as vfs from "../../_namespaces/vfs";
import {
    jsonToReadableText,
} from "../helpers";
import {
    baselineParseConfig,
} from "./helpers";

const caseInsensitiveBasePath = "c:/dev/";
const caseInsensitiveTsconfigPath = "c:/dev/tsconfig.json";
const caseInsensitiveHost = new fakes.ParseConfigHost(
    new vfs.FileSystem(/*ignoreCase*/ true, {
        cwd: caseInsensitiveBasePath,
        files: {
            "c:/dev/a.ts": "",
            "c:/dev/a.d.ts": "",
            "c:/dev/a.js": "",
            "c:/dev/b.ts": "",
            "c:/dev/b.js": "",
            "c:/dev/c.d.ts": "",
            "c:/dev/z/a.ts": "",
            "c:/dev/z/abz.ts": "",
            "c:/dev/z/aba.ts": "",
            "c:/dev/z/b.ts": "",
            "c:/dev/z/bbz.ts": "",
            "c:/dev/z/bba.ts": "",
            "c:/dev/x/a.ts": "",
            "c:/dev/x/aa.ts": "",
            "c:/dev/x/b.ts": "",
            "c:/dev/x/y/a.ts": "",
            "c:/dev/x/y/b.ts": "",
            "c:/dev/js/a.js": "",
            "c:/dev/js/b.js": "",
            "c:/dev/js/d.min.js": "",
            "c:/dev/js/ab.min.js": "",
            "c:/ext/ext.ts": "",
            "c:/ext/b/a..b.ts": "",
        },
    }),
);

const caseSensitiveBasePath = "/dev/";
const caseSensitiveHost = new fakes.ParseConfigHost(
    new vfs.FileSystem(/*ignoreCase*/ false, {
        cwd: caseSensitiveBasePath,
        files: {
            "/dev/a.ts": "",
            "/dev/a.d.ts": "",
            "/dev/a.js": "",
            "/dev/b.ts": "",
            "/dev/b.js": "",
            "/dev/A.ts": "",
            "/dev/B.ts": "",
            "/dev/c.d.ts": "",
            "/dev/z/a.ts": "",
            "/dev/z/abz.ts": "",
            "/dev/z/aba.ts": "",
            "/dev/z/b.ts": "",
            "/dev/z/bbz.ts": "",
            "/dev/z/bba.ts": "",
            "/dev/x/a.ts": "",
            "/dev/x/b.ts": "",
            "/dev/x/y/a.ts": "",
            "/dev/x/y/b.ts": "",
            "/dev/q/a/c/b/d.ts": "",
            "/dev/js/a.js": "",
            "/dev/js/b.js": "",
        },
    }),
);

const caseInsensitiveMixedExtensionHost = new fakes.ParseConfigHost(
    new vfs.FileSystem(/*ignoreCase*/ true, {
        cwd: caseInsensitiveBasePath,
        files: {
            "c:/dev/a.ts": "",
            "c:/dev/a.d.ts": "",
            "c:/dev/a.js": "",
            "c:/dev/b.tsx": "",
            "c:/dev/b.d.ts": "",
            "c:/dev/b.jsx": "",
            "c:/dev/c.tsx": "",
            "c:/dev/c.js": "",
            "c:/dev/d.js": "",
            "c:/dev/e.jsx": "",
            "c:/dev/f.other": "",
        },
    }),
);

const caseInsensitiveCommonFoldersHost = new fakes.ParseConfigHost(
    new vfs.FileSystem(/*ignoreCase*/ true, {
        cwd: caseInsensitiveBasePath,
        files: {
            "c:/dev/a.ts": "",
            "c:/dev/a.d.ts": "",
            "c:/dev/a.js": "",
            "c:/dev/b.ts": "",
            "c:/dev/x/a.ts": "",
            "c:/dev/node_modules/a.ts": "",
            "c:/dev/bower_components/a.ts": "",
            "c:/dev/jspm_packages/a.ts": "",
        },
    }),
);

const caseInsensitiveDottedFoldersHost = new fakes.ParseConfigHost(
    new vfs.FileSystem(/*ignoreCase*/ true, {
        cwd: caseInsensitiveBasePath,
        files: {
            "c:/dev/x/d.ts": "",
            "c:/dev/x/y/d.ts": "",
            "c:/dev/x/y/.e.ts": "",
            "c:/dev/x/.y/a.ts": "",
            "c:/dev/.z/.b.ts": "",
            "c:/dev/.z/c.ts": "",
            "c:/dev/w/.u/e.ts": "",
            "c:/dev/g.min.js/.g/g.ts": "",
        },
    }),
);

const caseInsensitiveOrderingDiffersWithCaseHost = new fakes.ParseConfigHost(
    new vfs.FileSystem(/*ignoreCase*/ true, {
        cwd: caseInsensitiveBasePath,
        files: {
            "c:/dev/xylophone.ts": "",
            "c:/dev/Yosemite.ts": "",
            "c:/dev/zebra.ts": "",
        },
    }),
);

const caseSensitiveOrderingDiffersWithCaseHost = new fakes.ParseConfigHost(
    new vfs.FileSystem(/*ignoreCase*/ false, {
        cwd: caseSensitiveBasePath,
        files: {
            "/dev/xylophone.ts": "",
            "/dev/Yosemite.ts": "",
            "/dev/zebra.ts": "",
        },
    }),
);

const caseInsensitiveHostWithSameFileNamesWithDifferentExtensions = new fakes.ParseConfigHost(
    new vfs.FileSystem(/*ignoreCase*/ true, {
        cwd: caseInsensitiveBasePath,
        files: {
            "c:/dev/a.tsx": "",
            "c:/dev/a.d.ts": "",
            "c:/dev/b.tsx": "",
            "c:/dev/b.ts": "",
            "c:/dev/c.tsx": "",
            "c:/dev/m.ts": "",
            "c:/dev/m.d.ts": "",
            "c:/dev/n.tsx": "",
            "c:/dev/n.ts": "",
            "c:/dev/n.d.ts": "",
            "c:/dev/o.ts": "",
            "c:/dev/x.d.ts": "",
        },
    }),
);

function baselineMatches(subScenario: string, json: any, host: fakes.ParseConfigHost, basePath: string) {
    const jsonText = jsonToReadableText(json);
    baselineParseConfig({
        scenario: "matchFiles",
        subScenario,
        input: () => [{
            createHost: () => host,
            jsonText,
            configFileName: caseInsensitiveTsconfigPath,
            basePath,
            baselineParsed: (baseline, parsed) => {
                const wildcardDirectories = parsed.wildcardDirectories ? {} as ts.MapLike<string> : undefined;
                if (parsed.wildcardDirectories) ts.getOwnKeys(parsed.wildcardDirectories).forEach(dir => wildcardDirectories![dir] = `WatchDirectoryFlags.${(ts as any).WatchDirectoryFlags[parsed.wildcardDirectories![dir]]}`);
                baseline.push(
                    "Result",
                    jsonToReadableText({
                        ...parsed,
                        errors: undefined,
                        wildcardDirectories,
                    }),
                );
            },
        }],
        header: baseline => baseline.push("config:", jsonText),
    });
}

describe("unittests:: config:: matchFiles", () => {
    baselineMatches("with defaults", {}, caseInsensitiveCommonFoldersHost, caseInsensitiveBasePath);
    describe("with literal file list", () => {
        baselineMatches(
            "without exclusions with literal file list",
            {
                files: [
                    "a.ts",
                    "b.ts",
                ],
            },
            caseInsensitiveHost,
            caseInsensitiveBasePath,
        );
        baselineMatches(
            "missing files are still present",
            {
                files: [
                    "z.ts",
                    "x.ts",
                ],
            },
            caseInsensitiveHost,
            caseInsensitiveBasePath,
        );
        baselineMatches(
            "are not removed due to excludes",
            {
                files: [
                    "a.ts",
                    "b.ts",
                ],
                exclude: [
                    "b.ts",
                ],
            },
            caseInsensitiveHost,
            caseInsensitiveBasePath,
        );
    });

    describe("with literal include list", () => {
        baselineMatches(
            "without exclusions with literal include list",
            {
                include: [
                    "a.ts",
                    "b.ts",
                ],
            },
            caseInsensitiveHost,
            caseInsensitiveBasePath,
        );
        baselineMatches(
            "with non .ts file extensions are excluded",
            {
                include: [
                    "a.js",
                    "b.js",
                ],
            },
            caseInsensitiveHost,
            caseInsensitiveBasePath,
        );
        baselineMatches(
            "with missing files are excluded with literal include list",
            {
                include: [
                    "z.ts",
                    "x.ts",
                ],
            },
            caseInsensitiveHost,
            caseInsensitiveBasePath,
        );
        baselineMatches(
            "with literal excludes",
            {
                include: [
                    "a.ts",
                    "b.ts",
                ],
                exclude: [
                    "b.ts",
                ],
            },
            caseInsensitiveHost,
            caseInsensitiveBasePath,
        );
        baselineMatches(
            "with wildcard excludes",
            {
                include: [
                    "a.ts",
                    "b.ts",
                    "z/a.ts",
                    "z/abz.ts",
                    "z/aba.ts",
                    "x/b.ts",
                ],
                exclude: [
                    "*.ts",
                    "z/??z.ts",
                    "*/b.ts",
                ],
            },
            caseInsensitiveHost,
            caseInsensitiveBasePath,
        );
        baselineMatches(
            "with recursive excludes",
            {
                include: [
                    "a.ts",
                    "b.ts",
                    "x/a.ts",
                    "x/b.ts",
                    "x/y/a.ts",
                    "x/y/b.ts",
                ],
                exclude: [
                    "**/b.ts",
                ],
            },
            caseInsensitiveHost,
            caseInsensitiveBasePath,
        );
        baselineMatches(
            "with case sensitive exclude",
            {
                include: [
                    "B.ts",
                ],
                exclude: [
                    "**/b.ts",
                ],
            },
            caseSensitiveHost,
            caseSensitiveBasePath,
        );
        baselineMatches(
            "with common package folders and no exclusions",
            {
                include: [
                    "a.ts",
                    "b.ts",
                    "node_modules/a.ts",
                    "bower_components/a.ts",
                    "jspm_packages/a.ts",
                ],
            },
            caseInsensitiveCommonFoldersHost,
            caseInsensitiveBasePath,
        );
        baselineMatches(
            "with common package folders and exclusions",
            {
                include: [
                    "a.ts",
                    "b.ts",
                    "node_modules/a.ts",
                    "bower_components/a.ts",
                    "jspm_packages/a.ts",
                ],
                exclude: [
                    "a.ts",
                    "b.ts",
                ],
            },
            caseInsensitiveCommonFoldersHost,
            caseInsensitiveBasePath,
        );
        baselineMatches(
            "with common package folders and empty exclude",
            {
                include: [
                    "a.ts",
                    "b.ts",
                    "node_modules/a.ts",
                    "bower_components/a.ts",
                    "jspm_packages/a.ts",
                ],
            },
            caseInsensitiveCommonFoldersHost,
            caseInsensitiveBasePath,
        );
    });

    describe("with wildcard include list", () => {
        baselineMatches(
            "is sorted in include order, then in alphabetical order",
            {
                include: [
                    "z/*.ts",
                    "x/*.ts",
                ],
            },
            caseInsensitiveHost,
            caseInsensitiveBasePath,
        );
        baselineMatches(
            "same named declarations are excluded",
            {
                include: [
                    "*.ts",
                ],
            },
            caseInsensitiveHost,
            caseInsensitiveBasePath,
        );
        baselineMatches(
            "star matches only ts files",
            {
                include: [
                    "*",
                ],
            },
            caseInsensitiveHost,
            caseInsensitiveBasePath,
        );
        baselineMatches(
            "question matches only a single character",
            {
                include: [
                    "x/?.ts",
                ],
            },
            caseInsensitiveHost,
            caseInsensitiveBasePath,
        );
        baselineMatches(
            "with recursive directory",
            {
                include: [
                    "**/a.ts",
                ],
            },
            caseInsensitiveHost,
            caseInsensitiveBasePath,
        );
        baselineMatches(
            "with multiple recursive directories",
            {
                include: [
                    "x/y/**/a.ts",
                    "x/**/a.ts",
                    "z/**/a.ts",
                ],
            },
            caseInsensitiveHost,
            caseInsensitiveBasePath,
        );
        baselineMatches(
            "case sensitive",
            {
                include: [
                    "**/A.ts",
                ],
            },
            caseSensitiveHost,
            caseSensitiveBasePath,
        );
        baselineMatches(
            "with missing files are excluded with wildcard include list",
            {
                include: [
                    "*/z.ts",
                ],
            },
            caseInsensitiveHost,
            caseInsensitiveBasePath,
        );
        baselineMatches(
            "always include literal files",
            {
                files: [
                    "a.ts",
                ],
                include: [
                    "*/z.ts",
                ],
                exclude: [
                    "**/a.ts",
                ],
            },
            caseInsensitiveHost,
            caseInsensitiveBasePath,
        );
        baselineMatches(
            "exclude folders",
            {
                include: [
                    "**/*",
                ],
                exclude: [
                    "z",
                    "x",
                ],
            },
            caseInsensitiveHost,
            caseInsensitiveBasePath,
        );
        describe("with common package folders", () => {
            baselineMatches(
                "and no exclusions",
                {
                    include: [
                        "**/a.ts",
                    ],
                },
                caseInsensitiveCommonFoldersHost,
                caseInsensitiveBasePath,
            );
            baselineMatches(
                "and exclusions",
                {
                    include: [
                        "**/?.ts",
                    ],
                    exclude: [
                        "a.ts",
                    ],
                },
                caseInsensitiveCommonFoldersHost,
                caseInsensitiveBasePath,
            );
            baselineMatches(
                "and empty exclude",
                {
                    include: [
                        "**/a.ts",
                    ],
                    exclude: [] as string[],
                },
                caseInsensitiveCommonFoldersHost,
                caseInsensitiveBasePath,
            );
            baselineMatches(
                "and explicit recursive include",
                {
                    include: [
                        "**/a.ts",
                        "**/node_modules/a.ts",
                    ],
                },
                caseInsensitiveCommonFoldersHost,
                caseInsensitiveBasePath,
            );
            baselineMatches(
                "and wildcard include",
                {
                    include: [
                        "*/a.ts",
                    ],
                },
                caseInsensitiveCommonFoldersHost,
                caseInsensitiveBasePath,
            );
            baselineMatches(
                "and explicit wildcard include",
                {
                    include: [
                        "*/a.ts",
                        "node_modules/a.ts",
                    ],
                },
                caseInsensitiveCommonFoldersHost,
                caseInsensitiveBasePath,
            );
        });
        baselineMatches(
            "exclude .js files when allowJs=false",
            {
                compilerOptions: {
                    allowJs: false,
                },
                include: [
                    "js/*",
                ],
            },
            caseInsensitiveHost,
            caseInsensitiveBasePath,
        );
        baselineMatches(
            "include .js files when allowJs=true",
            {
                compilerOptions: {
                    allowJs: true,
                },
                include: [
                    "js/*",
                ],
            },
            caseInsensitiveHost,
            caseInsensitiveBasePath,
        );
        baselineMatches(
            "include explicitly listed .min.js files when allowJs=true",
            {
                compilerOptions: {
                    allowJs: true,
                },
                include: [
                    "js/*.min.js",
                ],
            },
            caseInsensitiveHost,
            caseInsensitiveBasePath,
        );
        baselineMatches(
            "include paths outside of the project",
            {
                include: [
                    "*",
                    "c:/ext/*",
                ],
            },
            caseInsensitiveHost,
            caseInsensitiveBasePath,
        );
        baselineMatches(
            "include paths outside of the project using relative paths",
            {
                include: [
                    "*",
                    "../ext/*",
                ],
                exclude: [
                    "**",
                ],
            },
            caseInsensitiveHost,
            caseInsensitiveBasePath,
        );
        baselineMatches(
            "exclude paths outside of the project using relative paths",
            {
                include: [
                    "c:/**/*",
                ],
                exclude: [
                    "../**",
                ],
            },
            caseInsensitiveHost,
            caseInsensitiveBasePath,
        );
        baselineMatches(
            "include files with .. in their name",
            {
                include: [
                    "c:/ext/b/a..b.ts",
                ],
                exclude: [
                    "**",
                ],
            },
            caseInsensitiveHost,
            caseInsensitiveBasePath,
        );
        baselineMatches(
            "exclude files with .. in their name",
            {
                include: [
                    "c:/ext/**/*",
                ],
                exclude: [
                    "c:/ext/b/a..b.ts",
                ],
            },
            caseInsensitiveHost,
            caseInsensitiveBasePath,
        );
        baselineMatches(
            "with jsx=none, allowJs=false",
            {
                compilerOptions: {
                    allowJs: false,
                },
            },
            caseInsensitiveMixedExtensionHost,
            caseInsensitiveBasePath,
        );
        baselineMatches(
            "with jsx=preserve, allowJs=false",
            {
                compilerOptions: {
                    jsx: "preserve",
                    allowJs: false,
                },
            },
            caseInsensitiveMixedExtensionHost,
            caseInsensitiveBasePath,
        );
        baselineMatches(
            "with jsx=react-native, allowJs=false",
            {
                compilerOptions: {
                    jsx: "react-native",
                    allowJs: false,
                },
            },
            caseInsensitiveMixedExtensionHost,
            caseInsensitiveBasePath,
        );
        baselineMatches(
            "with jsx=none, allowJs=true",
            {
                compilerOptions: {
                    allowJs: true,
                },
            },
            caseInsensitiveMixedExtensionHost,
            caseInsensitiveBasePath,
        );
        baselineMatches(
            "with jsx=preserve, allowJs=true",
            {
                compilerOptions: {
                    jsx: "preserve",
                    allowJs: true,
                },
            },
            caseInsensitiveMixedExtensionHost,
            caseInsensitiveBasePath,
        );
        baselineMatches(
            "with jsx=react-native, allowJs=true",
            {
                compilerOptions: {
                    jsx: "react-native",
                    allowJs: true,
                },
            },
            caseInsensitiveMixedExtensionHost,
            caseInsensitiveBasePath,
        );
        baselineMatches(
            "exclude .min.js files using wildcards",
            {
                compilerOptions: {
                    allowJs: true,
                },
                include: [
                    "js/*.min.js",
                ],
                exclude: [
                    "js/a*",
                ],
            },
            caseInsensitiveHost,
            caseInsensitiveBasePath,
        );

        describe("with trailing recursive directory", () => {
            baselineMatches(
                "in includes with trailing recursive directory",
                {
                    include: [
                        "**",
                    ],
                },
                caseInsensitiveHost,
                caseInsensitiveBasePath,
            );
            baselineMatches(
                "in excludes with trailing recursive directory",
                {
                    include: [
                        "**/*",
                    ],
                    exclude: [
                        "**",
                    ],
                },
                caseInsensitiveHost,
                caseInsensitiveBasePath,
            );
        });
        describe("with multiple recursive directory patterns", () => {
            baselineMatches(
                "in includes with multiple recursive directory patterns",
                {
                    include: [
                        "**/x/**/*",
                    ],
                },
                caseInsensitiveHost,
                caseInsensitiveBasePath,
            );
        });
        baselineMatches(
            "in excludes",
            {
                include: [
                    "**/a.ts",
                ],
                exclude: [
                    "**/x/**",
                ],
            },
            caseInsensitiveHost,
            caseInsensitiveBasePath,
        );

        describe("with parent directory symbols after a recursive directory pattern", () => {
            baselineMatches(
                "in includes immediately after",
                {
                    include: [
                        "**/../*",
                    ],
                },
                caseInsensitiveHost,
                caseInsensitiveBasePath,
            );

            baselineMatches(
                "in includes after a subdirectory",
                {
                    include: [
                        "**/y/../*",
                    ],
                },
                caseInsensitiveHost,
                caseInsensitiveBasePath,
            );

            baselineMatches(
                "in excludes immediately after",
                {
                    include: [
                        "**/a.ts",
                    ],
                    exclude: [
                        "**/..",
                    ],
                },
                caseInsensitiveHost,
                caseInsensitiveBasePath,
            );

            baselineMatches(
                "in excludes after a subdirectory",
                {
                    include: [
                        "**/a.ts",
                    ],
                    exclude: [
                        "**/y/..",
                    ],
                },
                caseInsensitiveHost,
                caseInsensitiveBasePath,
            );
        });

        describe("with implicit globbification", () => {
            baselineMatches(
                "Expands z to z/starstart/star",
                {
                    include: ["z"],
                },
                caseInsensitiveHost,
                caseInsensitiveBasePath,
            );
        });

        describe("sameNamedDeclarations", () => {
            baselineMatches(
                "same named declarations with include ts",
                { include: ["*.ts"] },
                caseInsensitiveHostWithSameFileNamesWithDifferentExtensions,
                caseInsensitiveBasePath,
            );
            baselineMatches(
                "same named declarations with include ts dts",
                { include: ["*.ts", "*.d.ts"] },
                caseInsensitiveHostWithSameFileNamesWithDifferentExtensions,
                caseInsensitiveBasePath,
            );
            baselineMatches(
                "same named declarations with include tsx",
                { include: ["*.tsx"] },
                caseInsensitiveHostWithSameFileNamesWithDifferentExtensions,
                caseInsensitiveBasePath,
            );
            baselineMatches(
                "same named declarations with include tsx ts",
                { include: ["*.tsx", "*.ts"] },
                caseInsensitiveHostWithSameFileNamesWithDifferentExtensions,
                caseInsensitiveBasePath,
            );
            baselineMatches(
                "same named declarations with include ts tsx",
                { include: ["*.tsx", "*.ts"] },
                caseInsensitiveHostWithSameFileNamesWithDifferentExtensions,
                caseInsensitiveBasePath,
            );
            baselineMatches(
                "same named declarations with include tsx dts",
                { include: ["*.tsx", "*.d.ts"] },
                caseInsensitiveHostWithSameFileNamesWithDifferentExtensions,
                caseInsensitiveBasePath,
            );
            baselineMatches(
                "same named declarations with include dts tsx",
                { include: ["*.tsx", "*.d.ts"] },
                caseInsensitiveHostWithSameFileNamesWithDifferentExtensions,
                caseInsensitiveBasePath,
            );
        });
    });

    describe("with files or folders that begin with a .", () => {
        baselineMatches(
            "that are not explicitly included",
            {
                include: [
                    "x/**/*",
                    "w/*/*",
                ],
            },
            caseInsensitiveDottedFoldersHost,
            caseInsensitiveBasePath,
        );
        describe("that are explicitly included", () => {
            baselineMatches(
                "without wildcards",
                {
                    include: [
                        "x/.y/a.ts",
                        "c:/dev/.z/.b.ts",
                    ],
                },
                caseInsensitiveDottedFoldersHost,
                caseInsensitiveBasePath,
            );
            baselineMatches(
                "with recursive wildcards that match directories",
                {
                    include: [
                        "**/.*/*",
                    ],
                },
                caseInsensitiveDottedFoldersHost,
                caseInsensitiveBasePath,
            );
            baselineMatches(
                "with recursive wildcards that match nothing",
                {
                    include: [
                        "x/**/.y/*",
                        ".z/**/.*",
                    ],
                },
                caseInsensitiveDottedFoldersHost,
                caseInsensitiveBasePath,
            );
            baselineMatches(
                "with wildcard excludes that implicitly exclude dotted files",
                {
                    include: [
                        "**/.*/*",
                    ],
                    exclude: [
                        "**/*",
                    ],
                },
                caseInsensitiveDottedFoldersHost,
                caseInsensitiveBasePath,
            );
        });
    });

    describe("exclude or include patterns which start with **", () => {
        baselineMatches(
            "can exclude dirs whose pattern starts with starstar",
            {
                exclude: [
                    "**/x",
                ],
            },
            caseSensitiveHost,
            caseSensitiveBasePath,
        );
        baselineMatches(
            "can include dirs whose pattern starts with starstart",
            {
                include: [
                    "**/x",
                    "**/a/**/b",
                ],
            },
            caseSensitiveHost,
            caseSensitiveBasePath,
        );
    });

    baselineMatches("can include files in the same order on multiple platforms case sensitive", {}, caseSensitiveOrderingDiffersWithCaseHost, caseSensitiveBasePath);
    baselineMatches("can include files in the same order on multiple platforms case insensitive", {}, caseInsensitiveOrderingDiffersWithCaseHost, caseInsensitiveBasePath);

    describe("when recursive symlinked directories are present", () => {
        const fs = new vfs.FileSystem(/*ignoreCase*/ true, {
            cwd: caseInsensitiveBasePath,
            files: {
                "c:/dev/index.ts": "",
            },
        });
        fs.mkdirpSync("c:/dev/a/b/c");
        fs.symlinkSync("c:/dev/A", "c:/dev/a/self");
        fs.symlinkSync("c:/dev/a", "c:/dev/a/b/parent");
        fs.symlinkSync("c:/dev/a", "c:/dev/a/b/c/grandparent");
        const host = new fakes.ParseConfigHost(fs);
        const json = {};
        baselineMatches("when recursive symlinked directories are present", json, host, caseInsensitiveBasePath);
    });
});
