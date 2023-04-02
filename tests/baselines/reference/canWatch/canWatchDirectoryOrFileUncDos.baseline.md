# canWatchDirectoryOrFile

Determines if given directory or file can be watched

## Testing for UncDos root: //vda1cs4850/c$

| Directory                                                                                        | canWatchDirectoryOrFile |
| ------------------------------------------------------------------------------------------------ | ----------------------- |
| //vda1cs4850/c$                                                                                  | false                   |
| //vda1cs4850/c$/folderAtRoot                                                                     | false                   |
| //vda1cs4850/c$/folderAtRoot/folder1                                                             | true                    |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2                                                     | true                    |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3                                             | true                    |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4                                     | true                    |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5                             | true                    |
| //vda1cs4850/c$/users                                                                            | false                   |
| //vda1cs4850/c$/users/username                                                                   | false                   |
| //vda1cs4850/c$/users/username/folderAtRoot                                                      | false                   |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1                                              | true                    |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2                                      | true                    |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3                              | true                    |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4                      | true                    |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5              | true                    |
| //vda1cs4850/c$/user                                                                             | false                   |
| //vda1cs4850/c$/user/username                                                                    | true                    |
| //vda1cs4850/c$/user/username/folderAtRoot                                                       | true                    |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1                                               | true                    |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2                                       | true                    |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3                               | true                    |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4                       | true                    |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5               | true                    |

| File                                                                                             | canWatchDirectoryOrFile |
| ------------------------------------------------------------------------------------------------ | ----------------------- |
| //vda1cs4850/c$/package.json                                                                     | false                   |
| //vda1cs4850/c$/folderAtRoot/package.json                                                        | true                    |
| //vda1cs4850/c$/folderAtRoot/folder1/package.json                                                | true                    |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/package.json                                        | true                    |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/package.json                                | true                    |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                    |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                    |
| //vda1cs4850/c$/users/package.json                                                               | false                   |
| //vda1cs4850/c$/users/username/package.json                                                      | false                   |
| //vda1cs4850/c$/users/username/folderAtRoot/package.json                                         | true                    |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/package.json                                 | true                    |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/package.json                         | true                    |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                    |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                    |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                    |
| //vda1cs4850/c$/user/package.json                                                                | true                    |
| //vda1cs4850/c$/user/username/package.json                                                       | true                    |
| //vda1cs4850/c$/user/username/folderAtRoot/package.json                                          | true                    |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/package.json                                  | true                    |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/package.json                          | true                    |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                    |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                    |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                    |

