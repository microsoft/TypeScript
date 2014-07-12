///<reference path='..\..\..\src\harness\harness.ts'/>
///<reference path='..\..\..\src\harness\baselining.ts'/>
declare var JSON: any;

describe('Accepting local files as new reference...', function() {
    var localPath = 'tests/services/baselines/local';
    var outputPath = 'tests/services/baselines/reference';

    // Get a list of all the files in the baseline/inputs folder
    var files = IO.dir(localPath);

    // Copy them to the output folder
    for (var i = 0; i < files.length; i++) {
        var filename = files[i].substr(files[i].lastIndexOf('\\'));
        if(filename.indexOf('.html') === -1) {
            var referenceData = IO.readFile(files[i]);
            IO.writeFile(outputPath + '/' + filename, referenceData);
        }
    }
});
