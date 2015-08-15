declare var require: any;
let fs = require('fs');
let async = require('async');
let glob = require('glob');

fs.readFile('src/compiler/diagnosticMessages.json', 'utf-8', (err, data) => {
    if (err) {
        throw err;
    }

    let messages = JSON.parse(data);
    let keys = Object.keys(messages);
    console.log('Loaded ' + keys.length + ' errors');

    for (let k of keys) {
        messages[k]['seen'] = false;
    }

    let errRegex = /\(\d+,\d+\): error TS([^:]+):/g;

    let baseDir = 'tests/baselines/reference/';
    fs.readdir(baseDir, (err, files) => {
        files = files.filter(f => f.indexOf('.errors.txt') > 0);
        let tasks: Array<(callback: () => void) => void> = [];
        files.forEach(f => tasks.push(done => {
            fs.readFile(baseDir + f, 'utf-8', (err, baseline) => {
                if (err) throw err;

                let g: string[];
                while (g = errRegex.exec(baseline)) {
                    var errCode = +g[1];
                    let msg = keys.filter(k => messages[k].code === errCode)[0];
                    messages[msg]['seen'] = true;
                }

                done();
            });
        }));

        async.parallelLimit(tasks, 25, done => {
            console.log('== List of errors not present in baselines ==');
            let count = 0;
            for (let k of keys) {
                if (messages[k]['seen'] !== true) {
                    console.log(k);
                    count++;
                }
            }
            console.log(count + ' of ' + keys.length + ' errors are not in baselines');
        });
    });
});

fs.readFile('src/compiler/diagnosticInformationMap.generated.ts', 'utf-8', (err, data) => {
    let errorRegexp = /\s(\w+): \{ code/g;
    let errorNames: string[] = [];
    let errMatch: string[];
    while (errMatch = errorRegexp.exec(data)) {
        errorNames.push(errMatch[1]);
    }

    let allSrc: string = '';
    glob('./src/**/*.ts', {}, (err, files) => {
        console.log('Reading ' + files.length + ' source files');
        for (let file of files) {
            if (file.indexOf('diagnosticInformationMap.generated.ts') > 0) {
                continue;
            }

            let src = fs.readFileSync(file, 'utf-8');
            allSrc = allSrc + src;
        }

        console.log('Consumed ' + allSrc.length + ' characters of source');

        let count = 0;
        console.log('== List of errors not used in source ==');
        for (let errName of errorNames) {
            if (allSrc.indexOf(errName) < 0) {
                console.log(errName);
                count++;
            }
        }
        console.log(count + ' of ' + errorNames.length + ' errors are not used in source');
    });
});
