# canWatchAtTypes

Determines if given node_modules/@types can be watched.
These are the typeRoots calculated because user didnt specify typeRoots in compierOptions

## Testing for Unc root: //vda1cs4850/

| Directory                                                                                            | canWatchAtTypes |
| ---------------------------------------------------------------------------------------------------- | --------------- |
| //vda1cs4850/node_modules/@types                                                                     | false           |
| //vda1cs4850/folderAtRoot/node_modules/@types                                                        | false           |
| //vda1cs4850/folderAtRoot/folder1/node_modules/@types                                                | false           |
| //vda1cs4850/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| //vda1cs4850/users/node_modules/@types                                                               | false           |
| //vda1cs4850/users/username/node_modules/@types                                                      | false           |
| //vda1cs4850/users/username/folderAtRoot/node_modules/@types                                         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| //vda1cs4850/user/node_modules/@types                                                                | false           |
| //vda1cs4850/user/username/node_modules/@types                                                       | false           |
| //vda1cs4850/user/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| //vda1cs4850/usr/node_modules/@types                                                                 | false           |
| //vda1cs4850/usr/username/node_modules/@types                                                        | false           |
| //vda1cs4850/usr/username/folderAtRoot/node_modules/@types                                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| //vda1cs4850/home/node_modules/@types                                                                | false           |
| //vda1cs4850/home/username/node_modules/@types                                                       | false           |
| //vda1cs4850/home/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| //vda1cs4850/workspaces/node_modules/@types                                                          | false           |
| //vda1cs4850/workspaces/folderAtRoot/node_modules/@types                                             | true            |
| //vda1cs4850/workspaces/folderAtRoot/folder1/node_modules/@types                                     | true            |
| //vda1cs4850/workspaces/folderAtRoot/folder1/folder2/node_modules/@types                             | true            |
| //vda1cs4850/workspaces/folderAtRoot/folder1/folder2/folder3/node_modules/@types                     | true            |
| //vda1cs4850/workspaces/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types             | true            |
| //vda1cs4850/workspaces/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types     | true            |

