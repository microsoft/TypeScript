import {
    getFsConentsForAlternateResultAtTypesPackageJson,
    getFsContentsForAlternateResult,
    getFsContentsForAlternateResultDts,
    getFsContentsForAlternateResultPackageJson,
} from "../helpers/alternateResult";
import {
    verifyTsc,
} from "../helpers/tsc";
import {
    loadProjectFromFiles,
} from "../helpers/vfs";

describe("unittests:: tsc:: moduleResolution::", () => {
    verifyTsc({
        scenario: "moduleResolution",
        subScenario: "alternateResult",
        fs: () => loadProjectFromFiles(getFsContentsForAlternateResult()),
        commandLineArgs: ["-p", "/home/src/projects/project"],
        baselinePrograms: true,
        edits: [
            {
                caption: "delete the alternateResult in @types",
                edit: fs => fs.unlinkSync("/home/src/projects/project/node_modules/@types/bar/index.d.ts"),
            },
            {
                caption: "delete the ndoe10Result in package/types",
                edit: fs => fs.unlinkSync("/home/src/projects/project/node_modules/foo/index.d.ts"),
            },
            {
                caption: "add the alternateResult in @types",
                edit: fs => fs.writeFileSync("/home/src/projects/project/node_modules/@types/bar/index.d.ts", getFsContentsForAlternateResultDts("bar")),
            },
            {
                caption: "add the ndoe10Result in package/types",
                edit: fs => fs.writeFileSync("/home/src/projects/project/node_modules/foo/index.d.ts", getFsContentsForAlternateResultDts("foo")),
            },
            {
                caption: "update package.json from @types so error is fixed",
                edit: fs => fs.writeFileSync("/home/src/projects/project/node_modules/@types/bar/package.json", getFsConentsForAlternateResultAtTypesPackageJson("bar", /*addTypesCondition*/ true)),
            },
            {
                caption: "update package.json so error is fixed",
                edit: fs => fs.writeFileSync("/home/src/projects/project/node_modules/foo/package.json", getFsContentsForAlternateResultPackageJson("foo", /*addTypes*/ true, /*addTypesCondition*/ true)),
            },
            {
                caption: "update package.json from @types so error is introduced",
                edit: fs => fs.writeFileSync("/home/src/projects/project/node_modules/@types/bar2/package.json", getFsConentsForAlternateResultAtTypesPackageJson("bar2", /*addTypesCondition*/ false)),
            },
            {
                caption: "update package.json so error is introduced",
                edit: fs => fs.writeFileSync("/home/src/projects/project/node_modules/foo2/package.json", getFsContentsForAlternateResultPackageJson("foo2", /*addTypes*/ true, /*addTypesCondition*/ false)),
            },
            {
                caption: "delete the alternateResult in @types",
                edit: fs => fs.unlinkSync("/home/src/projects/project/node_modules/@types/bar2/index.d.ts"),
            },
            {
                caption: "delete the ndoe10Result in package/types",
                edit: fs => fs.unlinkSync("/home/src/projects/project/node_modules/foo2/index.d.ts"),
            },
            {
                caption: "add the alternateResult in @types",
                edit: fs => fs.writeFileSync("/home/src/projects/project/node_modules/@types/bar2/index.d.ts", getFsContentsForAlternateResultDts("bar2")),
            },
            {
                caption: "add the ndoe10Result in package/types",
                edit: fs => fs.writeFileSync("/home/src/projects/project/node_modules/foo2/index.d.ts", getFsContentsForAlternateResultDts("foo2")),
            },
        ],
    });
});
