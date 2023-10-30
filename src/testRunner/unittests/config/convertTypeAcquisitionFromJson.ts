import * as fakes from "../../_namespaces/fakes";
import * as vfs from "../../_namespaces/vfs";
import {
    jsonToReadableText,
} from "../helpers";
import {
    baselineParseConfig,
} from "./helpers";

describe("unittests:: config:: convertTypeAcquisitionFromJson", () => {
    function baselineTypeAcquisition(subScenario: string, json: any, configFileName: string) {
        baselineParseConfig({
            scenario: "convertTypeAcquisitionFromJson",
            subScenario,
            input: () => {
                const jsonText = jsonToReadableText(json);
                return [{
                    createHost: () =>
                        new fakes.ParseConfigHost(
                            new vfs.FileSystem(
                                /*ignoreCase*/ false,
                                {
                                    cwd: "/apath/",
                                    files: {
                                        [`/apath/${configFileName}`]: jsonText,
                                        "/apath/a.ts": "",
                                        "/apath/b.js": "",
                                    },
                                },
                            ),
                        ),
                    jsonText,
                    configFileName,
                    basePath: "/apath",
                    baselineParsed: (baseline, parsed) => baseline.push("TypeAcquisition::", jsonToReadableText(parsed.typeAcquisition)),
                }];
            },
        });
    }

    baselineTypeAcquisition("Convert correctly format tsconfig.json to typeAcquisition ", {
        typeAcquisition: {
            enable: true,
            include: ["0.d.ts", "1.d.ts"],
            exclude: ["0.js", "1.js"],
        },
    }, "tsconfig.json");

    baselineTypeAcquisition("Convert incorrect format tsconfig.json to typeAcquisition ", {
        typeAcquisition: {
            enableAutoDiscovy: true,
        },
    }, "tsconfig.json");

    baselineTypeAcquisition("Convert default tsconfig.json to typeAcquisition ", {}, "tsconfig.json");

    baselineTypeAcquisition("Convert tsconfig.json with only enable property to typeAcquisition ", {
        typeAcquisition: {
            enable: true,
        },
    }, "tsconfig.json");

    // jsconfig.json
    baselineTypeAcquisition("Convert jsconfig.json to typeAcquisition ", {
        typeAcquisition: {
            enable: false,
            include: ["0.d.ts"],
            exclude: ["0.js"],
        },
    }, "jsconfig.json");

    baselineTypeAcquisition("Convert default jsconfig.json to typeAcquisition ", {}, "jsconfig.json");

    baselineTypeAcquisition("Convert incorrect format jsconfig.json to typeAcquisition ", {
        typeAcquisition: {
            enableAutoDiscovy: true,
        },
    }, "jsconfig.json");

    baselineTypeAcquisition("Convert jsconfig.json with only enable property to typeAcquisition ", {
        typeAcquisition: {
            enable: false,
        },
    }, "jsconfig.json");
});
