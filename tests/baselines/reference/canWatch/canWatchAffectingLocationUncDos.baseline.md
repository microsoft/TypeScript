# canWatchAffectingLocation

Determines if package.json that was found during module resolution and change in it will affect resolution can be watched.

## Testing for UncDos root: //vda1cs4850/c$

| File                                                                                             | canWatchAffectingLocation |
| ------------------------------------------------------------------------------------------------ | ------------------------- |
| //vda1cs4850/c$/package.json                                                                     | false                     |
| //vda1cs4850/c$/folderAtRoot/package.json                                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/package.json                                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| //vda1cs4850/c$/users/package.json                                                               | false                     |
| //vda1cs4850/c$/users/username/package.json                                                      | false                     |
| //vda1cs4850/c$/users/username/folderAtRoot/package.json                                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| //vda1cs4850/c$/user/package.json                                                                | true                      |
| //vda1cs4850/c$/user/username/package.json                                                       | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| //vda1cs4850/c$/usr/package.json                                                                 | true                      |
| //vda1cs4850/c$/usr/username/package.json                                                        | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/package.json                                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| //vda1cs4850/c$/home/package.json                                                                | true                      |
| //vda1cs4850/c$/home/username/package.json                                                       | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| //vda1cs4850/c$/workspaces/package.json                                                          | true                      |
| //vda1cs4850/c$/workspaces/folderAtRoot/package.json                                             | true                      |
| //vda1cs4850/c$/workspaces/folderAtRoot/folder1/package.json                                     | true                      |
| //vda1cs4850/c$/workspaces/folderAtRoot/folder1/folder2/package.json                             | true                      |
| //vda1cs4850/c$/workspaces/folderAtRoot/folder1/folder2/folder3/package.json                     | true                      |
| //vda1cs4850/c$/workspaces/folderAtRoot/folder1/folder2/folder3/folder4/package.json             | true                      |
| //vda1cs4850/c$/workspaces/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json     | true                      |

