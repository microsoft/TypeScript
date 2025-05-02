# canWatchAtTypes

Determines if given node_modules/@types can be watched.
These are the typeRoots calculated because user didnt specify typeRoots in compierOptions

## Testing for Posix root: /

| Directory                                                                                | canWatchAtTypes |
| ---------------------------------------------------------------------------------------- | --------------- |
| /node_modules/@types                                                                     | false           |
| /folderAtRoot/node_modules/@types                                                        | false           |
| /folderAtRoot/folder1/node_modules/@types                                                | false           |
| /folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| /folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| /users/node_modules/@types                                                               | false           |
| /users/username/node_modules/@types                                                      | false           |
| /users/username/folderAtRoot/node_modules/@types                                         | true            |
| /users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| /users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| /user/node_modules/@types                                                                | false           |
| /user/username/node_modules/@types                                                       | false           |
| /user/username/folderAtRoot/node_modules/@types                                          | true            |
| /user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| /usr/node_modules/@types                                                                 | false           |
| /usr/username/node_modules/@types                                                        | false           |
| /usr/username/folderAtRoot/node_modules/@types                                           | true            |
| /usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| /home/node_modules/@types                                                                | false           |
| /home/username/node_modules/@types                                                       | false           |
| /home/username/folderAtRoot/node_modules/@types                                          | true            |
| /home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| /workspaces/node_modules/@types                                                          | false           |
| /workspaces/folderAtRoot/node_modules/@types                                             | true            |
| /workspaces/folderAtRoot/folder1/node_modules/@types                                     | true            |
| /workspaces/folderAtRoot/folder1/folder2/node_modules/@types                             | true            |
| /workspaces/folderAtRoot/folder1/folder2/folder3/node_modules/@types                     | true            |
| /workspaces/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types             | true            |
| /workspaces/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types     | true            |

