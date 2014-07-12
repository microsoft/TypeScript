//
// Copyright (c) Microsoft Corporation.  All rights reserved.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

/// <reference path="fourslash.ts" />

var testList: string[] = [];

if (IO.arguments.length === 0) {
    IO.dir(Harness.userSpecifiedroot + 'tests/ls/fourslash', /\.ts$/).forEach(fn => {
        if (!fn.match(/fourslash.ts$/i)) {
            testList.push(fn);
        }
    });
} else {
    IO.arguments.forEach(tests => tests.split(',').forEach(test => {
        testList.push(test);
    }));
}

var passCount = 0, failCount = 0;
testList.forEach(test => {
    try {
        IO.print('Running ' + test.substr(IO.dirName(test).length + 1) + '... ');
        FourSlash.runFourSlashTest(test);
        IO.printLine('passed.');
        passCount++;
    } catch (e) {
        IO.printLine(e);
        if (e.stack) {
            IO.printLine(e.stack);
        }
        failCount++;
    }
});

IO.printLine(passCount + ' passed, ' + failCount + ' failed.');