import * as fakes from "../../_namespaces/fakes";
import * as vfs from "../../_namespaces/vfs";
import {
    jsonToReadableText,
} from "../helpers";
import {
    baselineParseConfig,
} from "./helpers";

describe("unittests:: config:: convertCompilerOptionsFromJson", () => {
    function baselineCompilerOptions(subScenario: string, json: any, configFileName: string) {
        baselineCompilerOptionsJsonText(
            subScenario,
            jsonToReadableText(json),
            configFileName,
            /*skipJson*/ false,
        );
    }

    function baselineCompilerOptionsJsonText(subScenario: string, jsonText: string, configFileName: string, skipJson = true) {
        baselineParseConfig({
            scenario: "convertCompilerOptionsFromJson",
            subScenario,
            input: () => [{
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
                baselineParsed: (baseline, parsed) => baseline.push("CompilerOptions::", jsonToReadableText(parsed.options)),
            }],
            skipJson,
        });
    }

    // tsconfig.json tests
    baselineCompilerOptions("Convert correctly format tsconfig.json to compiler-options", {
        compilerOptions: {
            module: "commonjs",
            target: "es5",
            noImplicitAny: false,
            sourceMap: false,
            lib: ["es5", "es2015.core", "es2015.symbol"],
        },
    }, "tsconfig.json");

    baselineCompilerOptions("Convert correctly format tsconfig.json with allowJs is false to compiler-options", {
        compilerOptions: {
            module: "commonjs",
            target: "es5",
            noImplicitAny: false,
            sourceMap: false,
            allowJs: false,
            lib: ["es5", "es2015.core", "es2015.symbol"],
        },
    }, "tsconfig.json");

    baselineCompilerOptions("Convert incorrect option of jsx to compiler-options", {
        compilerOptions: {
            module: "commonjs",
            target: "es5",
            noImplicitAny: false,
            sourceMap: false,
            jsx: "",
        },
    }, "tsconfig.json");

    baselineCompilerOptions("Convert incorrect option of module to compiler-options", {
        compilerOptions: {
            module: "",
            target: "es5",
            noImplicitAny: false,
            sourceMap: false,
        },
    }, "tsconfig.json");

    baselineCompilerOptions("Convert incorrect option of newLine to compiler-options", {
        compilerOptions: {
            newLine: "",
            target: "es5",
            noImplicitAny: false,
            sourceMap: false,
        },
    }, "tsconfig.json");

    baselineCompilerOptions("Convert incorrect option of target to compiler-options", {
        compilerOptions: {
            target: "",
            noImplicitAny: false,
            sourceMap: false,
        },
    }, "tsconfig.json");

    baselineCompilerOptions("Convert incorrect option of module-resolution to compiler-options", {
        compilerOptions: {
            moduleResolution: "",
            noImplicitAny: false,
            sourceMap: false,
        },
    }, "tsconfig.json");

    baselineCompilerOptions("Convert incorrect option of libs to compiler-options", {
        compilerOptions: {
            module: "commonjs",
            target: "es5",
            noImplicitAny: false,
            sourceMap: false,
            lib: ["es5", "es2015.core", "incorrectLib"],
        },
    }, "tsconfig.json");

    baselineCompilerOptions("Convert empty string option of libs to compiler-options", {
        compilerOptions: {
            module: "commonjs",
            target: "es5",
            noImplicitAny: false,
            sourceMap: false,
            lib: ["es5", ""],
        },
    }, "tsconfig.json");

    baselineCompilerOptions("Convert empty string option of libs array to compiler-options", {
        compilerOptions: {
            module: "commonjs",
            target: "es5",
            noImplicitAny: false,
            sourceMap: false,
            lib: [""],
        },
    }, "tsconfig.json");

    baselineCompilerOptions("Convert trailing-whitespace string option of libs to compiler-options", {
        compilerOptions: {
            module: "commonjs",
            target: "es5",
            noImplicitAny: false,
            sourceMap: false,
            lib: ["   "],
        },
    }, "tsconfig.json");

    baselineCompilerOptions("Convert empty option of libs to compiler-options", {
        compilerOptions: {
            module: "commonjs",
            target: "es5",
            noImplicitAny: false,
            sourceMap: false,
            lib: [],
        },
    }, "tsconfig.json");

    baselineCompilerOptions("Convert empty string option of moduleSuffixes to compiler-options", {
        compilerOptions: {
            moduleSuffixes: [".ios", ""],
        },
    }, "tsconfig.json");

    baselineCompilerOptions("Convert empty string option of moduleSuffixes single to compiler-options", {
        compilerOptions: {
            moduleSuffixes: [""],
        },
    }, "tsconfig.json");

    baselineCompilerOptions("Convert trailing-whitespace string option of moduleSuffixes to compiler-options", {
        compilerOptions: {
            moduleSuffixes: ["   "],
        },
    }, "tsconfig.json");

    baselineCompilerOptions("Convert empty option of moduleSuffixes to compiler-options", {
        compilerOptions: {
            moduleSuffixes: [],
        },
    }, "tsconfig.json");

    baselineCompilerOptions("Convert incorrectly format tsconfig.json to compiler-options", {
        compilerOptions: {
            modu: "commonjs",
        },
    }, "tsconfig.json");

    baselineCompilerOptions("Convert default tsconfig.json to compiler-options", {}, "tsconfig.json");

    baselineCompilerOptions("Convert negative numbers in tsconfig.json", {
        compilerOptions: {
            allowJs: true,
            maxNodeModuleJsDepth: -1,
        },
    }, "tsconfig.json");

    // jsconfig.json
    baselineCompilerOptions("Convert correctly format jsconfig.json to compiler-options", {
        compilerOptions: {
            module: "commonjs",
            target: "es5",
            noImplicitAny: false,
            sourceMap: false,
            lib: ["es5", "es2015.core", "es2015.symbol"],
        },
    }, "jsconfig.json");

    baselineCompilerOptions("Convert correctly format jsconfig.json with allowJs is false to compiler-options", {
        compilerOptions: {
            module: "commonjs",
            target: "es5",
            noImplicitAny: false,
            sourceMap: false,
            allowJs: false,
            lib: ["es5", "es2015.core", "es2015.symbol"],
        },
    }, "jsconfig.json");

    baselineCompilerOptions("Convert incorrectly format jsconfig.json to compiler-options", {
        compilerOptions: {
            modu: "commonjs",
        },
    }, "jsconfig.json");

    baselineCompilerOptions("Convert default jsconfig.json to compiler-options", {}, "jsconfig.json");

    baselineCompilerOptionsJsonText(
        "Convert tsconfig options when there are multiple invalid strings",
        `{
  "compilerOptions": {
    "target": "<%- options.useTsWithBabel ? 'esnext' : 'es5' %>",
    "module": "esnext",
    <%_ if (options.classComponent) { _%>
    "experimentalDecorators": true,
    <%_ } _%>
    "sourceMap": true,
    "types": [
      "webpack-env"<% if (hasMocha || hasJest) { %>,<% } %>
      <%_ if (hasMocha) { _%>
      "mocha",
      "chai"
      <%_ } else if (hasJest) { _%>
      "jest"
      <%_ } _%>
    ]
  }
}
`,
        "tsconfig.json",
    );

    baselineCompilerOptionsJsonText(
        "Convert a tsconfig file with stray trailing characters",
        `{
            "compilerOptions": {
                "target": "esnext"
            }
        } blah`,
        "tsconfig.json",
    );

    baselineCompilerOptionsJsonText(
        "Convert a tsconfig file with stray leading characters",
        `blah {
            "compilerOptions": {
                "target": "esnext"
            }
        }`,
        "tsconfig.json",
    );

    baselineCompilerOptionsJsonText(
        "Convert a tsconfig file as an array",
        `[{
            "compilerOptions": {
                "target": "esnext"
            }
        }]`,
        "tsconfig.json",
    );

    baselineCompilerOptionsJsonText(
        "raises an error if you've set a compiler flag in the root without including compilerOptions",
        `{
            "module": "esnext",
        }`,
        "tsconfig.json",
    );

    baselineCompilerOptionsJsonText(
        "does not raise an error if you've set a compiler flag in the root when you have included 'compilerOptions'",
        `{
            "target": "esnext",
            "compilerOptions": {
                "module": "esnext"
            }
        }`,
        "tsconfig.json",
    );

    baselineCompilerOptionsJsonText("Don't crash when root expression is not object at all", `42`, "tsconfig.json");

    baselineCompilerOptionsJsonText("Allow trailing comments", `{} // no options`, "tsconfig.json");
});
