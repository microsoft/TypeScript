import {
    getFsConentsForNode10ResultAtTypesPackageJson,
    getFsContentsForNode10Result,
    getFsContentsForNode10ResultDts,
    getFsContentsForNode10ResultPackageJson,
} from "../helpers/node10Result";
import {
    verifyTsc,
} from "../helpers/tsc";
import {
    loadProjectFromFiles,
} from "../helpers/vfs";

describe("unittests:: tsc:: moduleResolution::", () => {
    verifyTsc({
        scenario: "moduleResolution",
        subScenario: "node10Result",
        fs: () => loadProjectFromFiles(getFsContentsForNode10Result()),
        commandLineArgs: ["-p", "/home/src/projects/project"],
        baselinePrograms: true,
        edits: [
            {
                caption: "delete the node10Result in @types",
                edit: fs => fs.unlinkSync("/home/src/projects/project/node_modules/@types/bar/index.d.ts"),
            },
            {
                caption: "delete the ndoe10Result in package/types",
                edit: fs => fs.unlinkSync("/home/src/projects/project/node_modules/foo/index.d.ts"),
            },
            {
                caption: "add the node10Result in @types",
                edit: fs => fs.writeFileSync("/home/src/projects/project/node_modules/@types/bar/index.d.ts", getFsContentsForNode10ResultDts("bar")),
            },
            {
                caption: "add the ndoe10Result in package/types",
                edit: fs => fs.writeFileSync("/home/src/projects/project/node_modules/foo/index.d.ts", getFsContentsForNode10ResultDts("foo")),
            },
            {
                caption: "update package.json from @types so error is fixed",
                edit: fs => fs.writeFileSync("/home/src/projects/project/node_modules/@types/bar/package.json", getFsConentsForNode10ResultAtTypesPackageJson("bar", /*addTypesCondition*/ true)),
            },
            {
                caption: "update package.json so error is fixed",
                edit: fs => fs.writeFileSync("/home/src/projects/project/node_modules/foo/package.json", getFsContentsForNode10ResultPackageJson("foo", /*addTypes*/ true, /*addTypesCondition*/ true)),
            },
            {
                caption: "update package.json from @types so error is introduced",
                edit: fs => fs.writeFileSync("/home/src/projects/project/node_modules/@types/bar2/package.json", getFsConentsForNode10ResultAtTypesPackageJson("bar2", /*addTypesCondition*/ false)),
            },
            {
                caption: "update package.json so error is introduced",
                edit: fs => fs.writeFileSync("/home/src/projects/project/node_modules/foo2/package.json", getFsContentsForNode10ResultPackageJson("foo2", /*addTypes*/ true, /*addTypesCondition*/ false)),
            },
            {
                caption: "delete the node10Result in @types",
                edit: fs => fs.unlinkSync("/home/src/projects/project/node_modules/@types/bar2/index.d.ts"),
            },
            {
                caption: "delete the ndoe10Result in package/types",
                edit: fs => fs.unlinkSync("/home/src/projects/project/node_modules/foo2/index.d.ts"),
            },
            {
                caption: "add the node10Result in @types",
                edit: fs => fs.writeFileSync("/home/src/projects/project/node_modules/@types/bar2/index.d.ts", getFsContentsForNode10ResultDts("bar2")),
            },
            {
                caption: "add the ndoe10Result in package/types",
                edit: fs => fs.writeFileSync("/home/src/projects/project/node_modules/foo2/index.d.ts", getFsContentsForNode10ResultDts("foo2")),
            },
        ],
    });
});
