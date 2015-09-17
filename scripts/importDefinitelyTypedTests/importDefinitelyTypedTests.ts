import * as fs from "fs";
import * as path from "path";
import * as child_process from "child_process";

interface Map<T> {
    [key: string]: T;
}

declare const __dirname: string;
declare const process: {
    argv: string[];
    env: Map<string>
}

const tscRoot = path.join(__dirname, "..\\");
const tscPath = path.join(tscRoot, "built", "instrumented", "tsc.js");
const rwcTestPath = path.join(tscRoot, "tests", "cases", "rwc", "dt");
const definitelyTypedRoot = process.argv[2];

function fileExtensionIs(path: string, extension: string): boolean {
    const pathLen = path.length;
    const extLen = extension.length;
    return pathLen > extLen && path.substr(pathLen - extLen, extLen).toLocaleLowerCase() === extension.toLocaleLowerCase();
}

function copyFileSync(source: string, destination: string) {
    let text = fs.readFileSync(source);
    fs.writeFileSync(destination, text);
}

function importDefinitelyTypedTest(testCaseName: string, testFiles: string[], responseFile: string ) {
    let cmd = "node " + tscPath + " --module commonjs " + testFiles.join(" ");
    if (responseFile) {
        cmd += " @" + responseFile;
    }

    let testDirectoryName = testCaseName + "_" + Math.floor((Math.random() * 10000) + 1); 
    let testDirectoryPath = path.join(process.env["temp"], testDirectoryName);
    if (fs.existsSync(testDirectoryPath)) {
        throw new Error("Could not create test directory");
    }
    fs.mkdirSync(testDirectoryPath);

    child_process.exec(cmd, {
        maxBuffer: 1 * 1024 * 1024,
        cwd: testDirectoryPath
    }, (error, stdout, stderr) => {
            console.log("importing " + testCaseName + " ...");
            console.log(cmd);

            if (error) {
                console.log("importing " + testCaseName + " ...");
                console.log(cmd);
                console.log("==> error " + JSON.stringify(error));
                console.log("==> stdout " + String(stdout));
                console.log("==> stderr " + String(stderr));
                console.log("\r\n");
                return;
            }

            // copy generated file to output location
            let outputFilePath = path.join(testDirectoryPath, "iocapture0.json");
            let testCasePath = path.join(rwcTestPath, "DefinitelyTyped_" + testCaseName + ".json");
            copyFileSync(outputFilePath, testCasePath);

            //console.log("output generated at: " + outputFilePath);

            if (!fs.existsSync(testCasePath)) {
                throw new Error("could not find test case at: " + testCasePath);
            }
            else {
                fs.unlinkSync(outputFilePath);
                fs.rmdirSync(testDirectoryPath);
                //console.log("testcase generated at: " + testCasePath);
                //console.log("Done.");
            }
            //console.log("\r\n");

        })
        .on('error', (error: any) => {
            console.log("==> error " + JSON.stringify(error));
            console.log("\r\n");
        });
}

function importDefinitelyTypedTests(definitelyTypedRoot: string): void {
    fs.readdir(definitelyTypedRoot, (err, subDirectories) => {
        if (err) {
            throw err;
        }

        subDirectories
            .filter(d => ["_infrastructure", "node_modules", ".git"].indexOf(d) < 0)
            .filter(i => i.indexOf("sipml") >=0 )
            .filter(i => fs.statSync(path.join(definitelyTypedRoot, i)).isDirectory())
            .forEach(d => {
                let directoryPath = path.join(definitelyTypedRoot, d);
                fs.readdir(directoryPath, function (err, files) {
                    if (err) {
                        throw err;
                    }

                    let tsFiles: string[] = [];
                    let testFiles: string[] = [];
                    let paramFile: string;

                    files
                        .map(f => path.join(directoryPath, f))
                        .forEach(f => {
                            if (fileExtensionIs(f, ".ts")) tsFiles.push(f);
                            else if (fileExtensionIs(f, ".tscparams")) paramFile = f;

                            if (fileExtensionIs(f, "-tests.ts")) testFiles.push(f);
                        });

                    if (testFiles.length === 0) {
                        // no test files but multiple d.ts's, e.g. winjs
                        let regexp = new RegExp(d + "(([-][0-9])|([\.]d[\.]ts))");
                        if (tsFiles.length > 1 && tsFiles.every(t => fileExtensionIs(t, ".d.ts") && regexp.test(t))) {
                            tsFiles.forEach(filename => {
                                importDefinitelyTypedTest(path.basename(filename, ".d.ts"), [filename], paramFile);
                            });
                        }
                        else {
                           importDefinitelyTypedTest(d, tsFiles, paramFile);
                        }
                    }
                    else {
                        testFiles.forEach(filename => {
                            importDefinitelyTypedTest(path.basename(filename, "-tests.ts"), [filename], paramFile);
                        });
                    }
                });
            })
    });
}

importDefinitelyTypedTests(definitelyTypedRoot);