# canWatchAffectingLocation

Determines if package.json that was found during module resolution and change in it will affect resolution can be watched.

## Testing for root: //vda1cs4850/

| File                                                                                          | canWatchAffectingLocation |
| --------------------------------------------------------------------------------------------- | ------------------------- |
| //vda1cs4850/package.json                                                                     | false                     |
| //vda1cs4850/folderAtRoot/package.json                                                        | true                      |
| //vda1cs4850/folderAtRoot/folder1/package.json                                                | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| //vda1cs4850/users/package.json                                                               | false                     |
| //vda1cs4850/users/username/package.json                                                      | false                     |
| //vda1cs4850/users/username/folderAtRoot/package.json                                         | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| //vda1cs4850/user/package.json                                                                | true                      |
| //vda1cs4850/user/username/package.json                                                       | true                      |
| //vda1cs4850/user/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

