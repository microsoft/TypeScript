
/// <reference path='..\server\node.d.ts' />

import child_process = require("child_process");

type RunnerTestSet = string[]

let testSets: RunnerTestSet[];

for (let testSet of testSets) {
    let child = child_process.fork("blah!");
    child.on("message", (data: ) => {
        
    }
}

function populateRunnerTestSet