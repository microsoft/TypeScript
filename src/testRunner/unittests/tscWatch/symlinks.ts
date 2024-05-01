import {
    buildMonorepoSymlinkedSiblingPackage1,
    cleanMonorepoSymlinkedSiblingPackage1,
    getMonorepoSymlinkedSiblingPackagesSys,
} from "../helpers/monorepoSymlinkedSiblingPackages";
import {
    noopChange,
    verifyTscWatch,
} from "../helpers/tscWatch";
import {
    osFlavorToString,
    TestServerHostOsFlavor,
} from "../helpers/virtualFileSystemWithWatch";

describe("unittests:: tsc-watch:: symlinks::", () => {
    describe("monorepoSymlinkedSiblingPackages:: monorepo style sibling packages symlinked", () => {
        verify(/*built*/ false);
        verify(/*built*/ true);
        verify(/*built*/ false, TestServerHostOsFlavor.Linux);
        verify(/*built*/ true, TestServerHostOsFlavor.Linux);
        function verify(built: boolean, osFlavor?: TestServerHostOsFlavor) {
            verifyTscWatch({
                scenario: "symlinks",
                subScenario: `monorepo style sibling packages symlinked${built ? " package1 built" : ""}${osFlavor ? ` ${osFlavorToString(osFlavor)}` : ""}`,
                commandLineArgs: ["--w", "-p", "packages/package2", "--extendedDiagnostics"],
                sys: () => getMonorepoSymlinkedSiblingPackagesSys(/*forTsserver*/ false, built, osFlavor),
                edits: [
                    built ? noopChange : {
                        caption: "Build package1",
                        edit: buildMonorepoSymlinkedSiblingPackage1,
                        timeouts: sys => {
                            sys.runQueuedTimeoutCallbacks();
                            sys.runQueuedTimeoutCallbacks();
                            sys.runQueuedTimeoutCallbacks();
                        },
                    },
                    {
                        caption: "Clean package1 build",
                        edit: cleanMonorepoSymlinkedSiblingPackage1,
                        timeouts: sys => {
                            sys.runQueuedTimeoutCallbacks();
                        },
                    },
                    osFlavor === TestServerHostOsFlavor.Linux ? {
                        caption: "After updating childs",
                        edit: noopChange.edit,
                        timeouts: sys => {
                            sys.runQueuedTimeoutCallbacks();
                            sys.runQueuedTimeoutCallbacks();
                        },
                    } : noopChange,
                    {
                        caption: "Build package1",
                        edit: buildMonorepoSymlinkedSiblingPackage1,
                        timeouts: sys => {
                            sys.runQueuedTimeoutCallbacks();
                            sys.runQueuedTimeoutCallbacks();
                            sys.runQueuedTimeoutCallbacks();
                        },
                    },
                ],
            });
        }
    });
});
