# canWatchAffectingLocation

Determines if package.json that was found during module resolution and change in it will affect resolution can be watched.

## Testing for Dos root: c:/

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
| c:/usr/package.json                                                                 | true                      |
| c:/usr/username/package.json                                                        | true                      |
| c:/usr/username/folderAtRoot/package.json                                           | true                      |
| c:/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| c:/home/package.json                                                                | true                      |
| c:/home/username/package.json                                                       | true                      |
| c:/home/username/folderAtRoot/package.json                                          | true                      |
| c:/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| c:/workspaces/package.json                                                          | true                      |
| c:/workspaces/folderAtRoot/package.json                                             | true                      |
| c:/workspaces/folderAtRoot/folder1/package.json                                     | true                      |
| c:/workspaces/folderAtRoot/folder1/folder2/package.json                             | true                      |
| c:/workspaces/folderAtRoot/folder1/folder2/folder3/package.json                     | true                      |
| c:/workspaces/folderAtRoot/folder1/folder2/folder3/folder4/package.json             | true                      |
| c:/workspaces/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json     | true                      |

