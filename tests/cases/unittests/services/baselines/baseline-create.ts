/// <reference path='..\..\..\src\harness\harness.ts'/>
/// <reference path='..\..\..\src\harness\baselining.ts'/>
/// <reference path='..\..\..\src\harness\external\json2.ts'/>

describe('Baseline files match (intellisense data)', function() {
    var inputPath = 'tests/services/baselines/inputs';
    var outputPath = 'tests/services/baselines/local';
    var referencePath = 'tests/services/baselines/reference';

    var i;

    // Might need to create this
    IO.createDirectory(outputPath);

    // Delete any old reports from the local path
    var localFiles = IO.dir(outputPath);
    for (i = 0; i < localFiles.length; i++) {
        var localFilename = localFiles[i];
        if(localFilename.indexOf('.html') > 0) {
            IO.deleteFile(localFilename);
        }
    }

    // Get a list of all the files in the baseline/inputs folder
    var files = IO.dir(inputPath);

    var template = IO.readFile('tests/services/baselines/diff-template.html');

    // For each file, get data:
    // a) Completion
    // b) Type signature
    // c) etc...
    for (i = 0; i < files.length; i++) {
        var filename = files[i].substr(files[i].lastIndexOf('\\'));
        var scriptText = IO.readFile(files[i]).trim();

        var outputAndCheck = function(nameSuffix: string, process: any) {
            describe(nameSuffix + ' data for ' + filename + ' matches the baseline', function() {
                var data = process(scriptText);
                var stringified = JSON.stringify(data).trim();

                var baseFilename = filename + '-' + nameSuffix + '.json';
                IO.writeFile(outputPath + '/' + baseFilename, stringified);

                var referenceFilename = referencePath + '/' + baseFilename;
                var reference = IO.fileExists(referenceFilename) ? IO.readFile(referenceFilename) : '[{file: "(no file)"}]';
                reference = reference.trim();

                if (reference != stringified) {
                    // Emit a report file in 'local'
                    var errorReportFile = outputPath + filename + '-' + nameSuffix +  '-diff.html';
                    IO.writeFile(errorReportFile,
                        template.replace('/**REFERENCE**/', reference).replace('/**ACTUAL**/', stringified));
                    throw new Error('Data does not match reference. Refer to diff report ' + errorReportFile);
                }
            });
        };

        // Write that data out to a JSON file in the 'local' folder
        outputAndCheck('signatures', getIntellisenseSignatureRegions);
        outputAndCheck('completions', getIntellisenseCompletionListRegions);
        outputAndCheck('definitions', getIntellisenseDefinitionRegions);
        outputAndCheck('types', getIntellisenseTypeRegions);
        outputAndCheck('members', getIntellisenseMemberListRegions);
    }
});
