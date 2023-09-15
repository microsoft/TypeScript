# canWatchAtTypes

Determines if given node_modules/@types can be watched.
These are the typeRoots calculated because user didnt specify typeRoots in compierOptions

## Testing for UncDos root: //vda1cs4850/c$

| Directory                                                                                               | canWatchAtTypes |
| ------------------------------------------------------------------------------------------------------- | --------------- |
| //vda1cs4850/c$/node_modules/@types                                                                     | false           |
| //vda1cs4850/c$/folderAtRoot/node_modules/@types                                                        | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/node_modules/@types                                                | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| //vda1cs4850/c$/users/node_modules/@types                                                               | false           |
| //vda1cs4850/c$/users/username/node_modules/@types                                                      | false           |
| //vda1cs4850/c$/users/username/folderAtRoot/node_modules/@types                                         | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| //vda1cs4850/c$/user/node_modules/@types                                                                | true            |
| //vda1cs4850/c$/user/username/node_modules/@types                                                       | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| //vda1cs4850/c$/usr/node_modules/@types                                                                 | true            |
| //vda1cs4850/c$/usr/username/node_modules/@types                                                        | true            |
| //vda1cs4850/c$/usr/username/folderAtRoot/node_modules/@types                                           | true            |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| //vda1cs4850/c$/home/node_modules/@types                                                                | true            |
| //vda1cs4850/c$/home/username/node_modules/@types                                                       | true            |
| //vda1cs4850/c$/home/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| //vda1cs4850/c$/workspaces/node_modules/@types                                                          | true            |
| //vda1cs4850/c$/workspaces/folderAtRoot/node_modules/@types                                             | true            |
| //vda1cs4850/c$/workspaces/folderAtRoot/folder1/node_modules/@types                                     | true            |
| //vda1cs4850/c$/workspaces/folderAtRoot/folder1/folder2/node_modules/@types                             | true            |
| //vda1cs4850/c$/workspaces/folderAtRoot/folder1/folder2/folder3/node_modules/@types                     | true            |
| //vda1cs4850/c$/workspaces/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types             | true            |
| //vda1cs4850/c$/workspaces/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types     | true            |

