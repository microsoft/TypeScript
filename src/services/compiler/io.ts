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

///<reference path='enumerator.ts' />
///<reference path='process.ts' />
///<reference path='core\references.ts' />

module TypeScript {

    export interface IFindFileResult {
        fileInformation: FileInformation;
        path: string;
    }

    export module IOUtils {
        // Creates the directory including its parent if not already present
        function createDirectoryStructure(ioHost: IEnvironment, dirName: string) {
            if (ioHost.directoryExists(dirName)) {
                return;
            }

            var parentDirectory = ioHost.directoryName(dirName);
            if (parentDirectory != "") {
                createDirectoryStructure(ioHost, parentDirectory);
            }
            ioHost.createDirectory(dirName);
        }

        // Creates a file including its directory structure if not already present
        export function writeFileAndFolderStructure(ioHost: IEnvironment, fileName: string, contents: string, writeByteOrderMark: boolean): void {
            var start = new Date().getTime();
            var path = ioHost.absolutePath(fileName);
            TypeScript.ioHostResolvePathTime += new Date().getTime() - start;

            var start = new Date().getTime();
            var dirName = ioHost.directoryName(path);
            TypeScript.ioHostDirectoryNameTime += new Date().getTime() - start;

            var start = new Date().getTime();
            createDirectoryStructure(ioHost, dirName);
            TypeScript.ioHostCreateDirectoryStructureTime += new Date().getTime() - start;

            var start = new Date().getTime();
            ioHost.writeFile(path, contents, writeByteOrderMark);
            TypeScript.ioHostWriteFileTime += new Date().getTime() - start;
        }

        export function combine(prefix: string, suffix: string): string {
            return prefix + "/" + suffix;
        }
    }
}