# canWatchAtTypes

Determines if given node_modules/@types can be watched.
These are the typeRoots calculated because user didnt specify typeRoots in compierOptions

## Testing for Dos root: c:/

| Directory                                                                                  | canWatchAtTypes |
| ------------------------------------------------------------------------------------------ | --------------- |
| c:/node_modules/@types                                                                     | false           |
| c:/folderAtRoot/node_modules/@types                                                        | true            |
| c:/folderAtRoot/folder1/node_modules/@types                                                | true            |
| c:/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| c:/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| c:/users/node_modules/@types                                                               | false           |
| c:/users/username/node_modules/@types                                                      | false           |
| c:/users/username/folderAtRoot/node_modules/@types                                         | true            |
| c:/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| c:/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| c:/user/node_modules/@types                                                                | true            |
| c:/user/username/node_modules/@types                                                       | true            |
| c:/user/username/folderAtRoot/node_modules/@types                                          | true            |
| c:/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| c:/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| c:/usr/node_modules/@types                                                                 | true            |
| c:/usr/username/node_modules/@types                                                        | true            |
| c:/usr/username/folderAtRoot/node_modules/@types                                           | true            |
| c:/usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| c:/usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| c:/home/node_modules/@types                                                                | true            |
| c:/home/username/node_modules/@types                                                       | true            |
| c:/home/username/folderAtRoot/node_modules/@types                                          | true            |
| c:/home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| c:/home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| c:/workspaces/node_modules/@types                                                          | true            |
| c:/workspaces/folderAtRoot/node_modules/@types                                             | true            |
| c:/workspaces/folderAtRoot/folder1/node_modules/@types                                     | true            |
| c:/workspaces/folderAtRoot/folder1/folder2/node_modules/@types                             | true            |
| c:/workspaces/folderAtRoot/folder1/folder2/folder3/node_modules/@types                     | true            |
| c:/workspaces/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types             | true            |
| c:/workspaces/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types     | true            |

