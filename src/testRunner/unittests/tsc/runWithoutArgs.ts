import { verifyTsc } from "./helpers";
import { loadProjectFromFiles } from "../tsbuild/helpers";

    describe("unittests:: tsc:: runWithoutArgs::", () => {
        verifyTsc({
            scenario: "runWithoutArgs",
            subScenario: "show help with ExitStatus.DiagnosticsPresent_OutputsSkipped",
            fs: () => loadProjectFromFiles({}),
            commandLineArgs: []
        });
    });

