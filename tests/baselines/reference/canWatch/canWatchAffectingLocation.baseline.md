# canWatchAffectingLocation

Determines if package.json that was found during module resolution and change in it will affect resolution can be watched.

## Testing for root: /

| File                                                                              | canWatchAffectingLocation |
| --------------------------------------------------------------------------------- | ------------------------- |
| /package.json                                                                     | false                     |
| /folderAtRoot/package.json                                                        | false                     |
| /folderAtRoot/folder1/package.json                                                | false                     |
| /folderAtRoot/folder1/folder2/package.json                                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| /users/package.json                                                               | false                     |
| /users/username/package.json                                                      | false                     |
| /users/username/folderAtRoot/package.json                                         | true                      |
| /users/username/folderAtRoot/folder1/package.json                                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| /user/package.json                                                                | false                     |
| /user/username/package.json                                                       | false                     |
| /user/username/folderAtRoot/package.json                                          | true                      |
| /user/username/folderAtRoot/folder1/package.json                                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |


## Testing for root: c:/

| File                                                                                | canWatchAffectingLocation |
| ----------------------------------------------------------------------------------- | ------------------------- |
| c:/package.json                                                                     | false                     |
| c:/folderAtRoot/package.json                                                        | true                      |
| c:/folderAtRoot/folder1/package.json                                                | true                      |
| c:/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| c:/users/package.json                                                               | false                     |
| c:/users/username/package.json                                                      | false                     |
| c:/users/username/folderAtRoot/package.json                                         | true                      |
| c:/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| c:/user/package.json                                                                | true                      |
| c:/user/username/package.json                                                       | true                      |
| c:/user/username/folderAtRoot/package.json                                          | true                      |
| c:/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |


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


## Testing for root: //vda1cs4850/c$

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

