# canWatchAffectingLocation

Determines if package.json that was found during module resolution and change in it will affect resolution can be watched.

## Testing for Posix root: /

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
| /usr/package.json                                                                 | false                     |
| /usr/username/package.json                                                        | false                     |
| /usr/username/folderAtRoot/package.json                                           | true                      |
| /usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| /home/package.json                                                                | false                     |
| /home/username/package.json                                                       | false                     |
| /home/username/folderAtRoot/package.json                                          | true                      |
| /home/username/folderAtRoot/folder1/package.json                                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| /workspaces/package.json                                                          | false                     |
| /workspaces/folderAtRoot/package.json                                             | true                      |
| /workspaces/folderAtRoot/folder1/package.json                                     | true                      |
| /workspaces/folderAtRoot/folder1/folder2/package.json                             | true                      |
| /workspaces/folderAtRoot/folder1/folder2/folder3/package.json                     | true                      |
| /workspaces/folderAtRoot/folder1/folder2/folder3/folder4/package.json             | true                      |
| /workspaces/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json     | true                      |

