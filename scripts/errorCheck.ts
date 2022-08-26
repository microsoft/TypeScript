import * as fs from "fs";
import * as async from "async";
import * as glob from "glob";

fs.readFile("src/compiler/diagnosticMessages.json", "utf-8", (err, data) => {
    if (err) {
        throw err;
    }

    const messages = JSON.parse(data);
    const keys = Object.keys(messages);
    console.log("Loaded " + keys.length + " errors");

    for (const k of keys) {
        messages[k].seen = false;
    }

    const errRegex = /\(\d+,\d+\): error TS([^:]+):/g;
    const baseDir = "tests/baselines/reference/";

    fs.readdir(baseDir, (err, files) => {
        files = files.filter(f => f.indexOf(".errors.txt") > 0);
        const tasks: ((callback: () => void) => void)[] = [];
        files.forEach(f => tasks.push(done => {
            fs.readFile(baseDir + f, "utf-8", (err, baseline) => {
                if (err) throw err;

                let g: RegExpExecArray | null;
                while (g = errRegex.exec(baseline)) {
                    const errCode = +g[1];
                    const msg = keys.filter(k => messages[k].code === errCode)[0];
                    messages[msg].seen = true;
                }

                done();
            });
        }));

        async.parallelLimit(tasks, 25, done => {
            console.log("== List of errors not present in baselines ==");
            let count = 0;
            for (const k of keys) {
                if (messages[k].seen !== true) {
                    console.log(k);
                    count++;
                }
            }
            console.log(count + " of " + keys.length + " errors are not in baselines");
        });
    });
});

fs.readFile("src/compiler/diagnosticInformationMap.generated.ts", "utf-8", (err, data) => {
    const errorRegexp = /\s(\w+): \{ code/g;
    const errorNames: string[] = [];
    let errMatch: RegExpExecArray | null;
    while (errMatch = errorRegexp.exec(data)) {
        errorNames.push(errMatch[1]);
    }

    let allSrc = "";
    glob("./src/**/*.ts", {}, (err, files) => {
        console.log("Reading " + files.length + " source files");
        for (const file of files) {
            if (file.indexOf("diagnosticInformationMap.generated.ts") > 0) {
                continue;
            }

            const src = fs.readFileSync(file, "utf-8");
            allSrc = allSrc + src;
        }

        console.log("Consumed " + allSrc.length + " characters of source");

        let count = 0;
        console.log("== List of errors not used in source ==");
        for (const errName of errorNames) {
            if (allSrc.indexOf(errName) < 0) {
                console.log(errName);
                count++;
            }
        }
        console.log(count + " of " + errorNames.length + " errors are not used in source");
    });
});
