# canWatchAtTypes

Determines if given node_modules/@types can be watched.
These are the typeRoots calculated because user didnt specify typeRoots in compierOptions

## Testing for Posix root: /

## RootDirForResolution: /

Root: 

| Directory                                                                                | canWatchAtTypes |
| ---------------------------------------------------------------------------------------- | --------------- |
| /node_modules/@types                                                                     | false           |
| /folderAtRoot/node_modules/@types                                                        | false           |
| /folderAtRoot/folder1/node_modules/@types                                                | false           |
| /folderAtRoot/folder1/folder2/node_modules/@types                                        | false           |
| /folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| /users/node_modules/@types                                                               | false           |
| /users/username/node_modules/@types                                                      | false           |
| /users/username/folderAtRoot/node_modules/@types                                         | false           |
| /users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| /users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| /user/node_modules/@types                                                                | false           |
| /user/username/node_modules/@types                                                       | false           |
| /user/username/folderAtRoot/node_modules/@types                                          | false           |
| /user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| /usr/node_modules/@types                                                                 | false           |
| /usr/username/node_modules/@types                                                        | false           |
| /usr/username/folderAtRoot/node_modules/@types                                           | false           |
| /usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| /home/node_modules/@types                                                                | false           |
| /home/username/node_modules/@types                                                       | false           |
| /home/username/folderAtRoot/node_modules/@types                                          | false           |
| /home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: /folderAtRoot

Root: /folderAtRoot

| Directory                                                                                | canWatchAtTypes |
| ---------------------------------------------------------------------------------------- | --------------- |
| /node_modules/@types                                                                     | false           |
| /folderAtRoot/node_modules/@types                                                        | true            |
| /folderAtRoot/folder1/node_modules/@types                                                | false           |
| /folderAtRoot/folder1/folder2/node_modules/@types                                        | false           |
| /folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| /users/node_modules/@types                                                               | false           |
| /users/username/node_modules/@types                                                      | false           |
| /users/username/folderAtRoot/node_modules/@types                                         | false           |
| /users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| /users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| /user/node_modules/@types                                                                | false           |
| /user/username/node_modules/@types                                                       | false           |
| /user/username/folderAtRoot/node_modules/@types                                          | false           |
| /user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| /usr/node_modules/@types                                                                 | false           |
| /usr/username/node_modules/@types                                                        | false           |
| /usr/username/folderAtRoot/node_modules/@types                                           | false           |
| /usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| /home/node_modules/@types                                                                | false           |
| /home/username/node_modules/@types                                                       | false           |
| /home/username/folderAtRoot/node_modules/@types                                          | false           |
| /home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: /folderAtRoot/folder1

Root: /folderAtRoot/folder1

| Directory                                                                                | canWatchAtTypes |
| ---------------------------------------------------------------------------------------- | --------------- |
| /node_modules/@types                                                                     | false           |
| /folderAtRoot/node_modules/@types                                                        | false           |
| /folderAtRoot/folder1/node_modules/@types                                                | true            |
| /folderAtRoot/folder1/folder2/node_modules/@types                                        | false           |
| /folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| /users/node_modules/@types                                                               | false           |
| /users/username/node_modules/@types                                                      | false           |
| /users/username/folderAtRoot/node_modules/@types                                         | false           |
| /users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| /users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| /user/node_modules/@types                                                                | false           |
| /user/username/node_modules/@types                                                       | false           |
| /user/username/folderAtRoot/node_modules/@types                                          | false           |
| /user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| /usr/node_modules/@types                                                                 | false           |
| /usr/username/node_modules/@types                                                        | false           |
| /usr/username/folderAtRoot/node_modules/@types                                           | false           |
| /usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| /home/node_modules/@types                                                                | false           |
| /home/username/node_modules/@types                                                       | false           |
| /home/username/folderAtRoot/node_modules/@types                                          | false           |
| /home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: /folderAtRoot/folder1/folder2

Root: /folderAtRoot/folder1/folder2

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
| /users/username/folderAtRoot/node_modules/@types                                         | false           |
| /users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| /users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| /user/node_modules/@types                                                                | false           |
| /user/username/node_modules/@types                                                       | false           |
| /user/username/folderAtRoot/node_modules/@types                                          | false           |
| /user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| /usr/node_modules/@types                                                                 | false           |
| /usr/username/node_modules/@types                                                        | false           |
| /usr/username/folderAtRoot/node_modules/@types                                           | false           |
| /usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| /home/node_modules/@types                                                                | false           |
| /home/username/node_modules/@types                                                       | false           |
| /home/username/folderAtRoot/node_modules/@types                                          | false           |
| /home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: /folderAtRoot/folder1/folder2/folder3

Root: /folderAtRoot/folder1/folder2/folder3

| Directory                                                                                | canWatchAtTypes |
| ---------------------------------------------------------------------------------------- | --------------- |
| /node_modules/@types                                                                     | false           |
| /folderAtRoot/node_modules/@types                                                        | false           |
| /folderAtRoot/folder1/node_modules/@types                                                | false           |
| /folderAtRoot/folder1/folder2/node_modules/@types                                        | false           |
| /folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| /users/node_modules/@types                                                               | false           |
| /users/username/node_modules/@types                                                      | false           |
| /users/username/folderAtRoot/node_modules/@types                                         | false           |
| /users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| /users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| /user/node_modules/@types                                                                | false           |
| /user/username/node_modules/@types                                                       | false           |
| /user/username/folderAtRoot/node_modules/@types                                          | false           |
| /user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| /usr/node_modules/@types                                                                 | false           |
| /usr/username/node_modules/@types                                                        | false           |
| /usr/username/folderAtRoot/node_modules/@types                                           | false           |
| /usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| /home/node_modules/@types                                                                | false           |
| /home/username/node_modules/@types                                                       | false           |
| /home/username/folderAtRoot/node_modules/@types                                          | false           |
| /home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: /folderAtRoot/folder1/folder2/folder3/folder4

Root: /folderAtRoot/folder1/folder2/folder3/folder4

| Directory                                                                                | canWatchAtTypes |
| ---------------------------------------------------------------------------------------- | --------------- |
| /node_modules/@types                                                                     | false           |
| /folderAtRoot/node_modules/@types                                                        | false           |
| /folderAtRoot/folder1/node_modules/@types                                                | false           |
| /folderAtRoot/folder1/folder2/node_modules/@types                                        | false           |
| /folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| /users/node_modules/@types                                                               | false           |
| /users/username/node_modules/@types                                                      | false           |
| /users/username/folderAtRoot/node_modules/@types                                         | false           |
| /users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| /users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| /user/node_modules/@types                                                                | false           |
| /user/username/node_modules/@types                                                       | false           |
| /user/username/folderAtRoot/node_modules/@types                                          | false           |
| /user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| /usr/node_modules/@types                                                                 | false           |
| /usr/username/node_modules/@types                                                        | false           |
| /usr/username/folderAtRoot/node_modules/@types                                           | false           |
| /usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| /home/node_modules/@types                                                                | false           |
| /home/username/node_modules/@types                                                       | false           |
| /home/username/folderAtRoot/node_modules/@types                                          | false           |
| /home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: /folderAtRoot/folder1/folder2/folder3/folder4/folder5

Root: /folderAtRoot/folder1/folder2/folder3/folder4/folder5

| Directory                                                                                | canWatchAtTypes |
| ---------------------------------------------------------------------------------------- | --------------- |
| /node_modules/@types                                                                     | false           |
| /folderAtRoot/node_modules/@types                                                        | false           |
| /folderAtRoot/folder1/node_modules/@types                                                | false           |
| /folderAtRoot/folder1/folder2/node_modules/@types                                        | false           |
| /folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| /users/node_modules/@types                                                               | false           |
| /users/username/node_modules/@types                                                      | false           |
| /users/username/folderAtRoot/node_modules/@types                                         | false           |
| /users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| /users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| /user/node_modules/@types                                                                | false           |
| /user/username/node_modules/@types                                                       | false           |
| /user/username/folderAtRoot/node_modules/@types                                          | false           |
| /user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| /usr/node_modules/@types                                                                 | false           |
| /usr/username/node_modules/@types                                                        | false           |
| /usr/username/folderAtRoot/node_modules/@types                                           | false           |
| /usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| /home/node_modules/@types                                                                | false           |
| /home/username/node_modules/@types                                                       | false           |
| /home/username/folderAtRoot/node_modules/@types                                          | false           |
| /home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: /users

Root: /users

| Directory                                                                                | canWatchAtTypes |
| ---------------------------------------------------------------------------------------- | --------------- |
| /node_modules/@types                                                                     | false           |
| /folderAtRoot/node_modules/@types                                                        | false           |
| /folderAtRoot/folder1/node_modules/@types                                                | false           |
| /folderAtRoot/folder1/folder2/node_modules/@types                                        | false           |
| /folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| /users/node_modules/@types                                                               | true            |
| /users/username/node_modules/@types                                                      | false           |
| /users/username/folderAtRoot/node_modules/@types                                         | false           |
| /users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| /users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| /user/node_modules/@types                                                                | false           |
| /user/username/node_modules/@types                                                       | false           |
| /user/username/folderAtRoot/node_modules/@types                                          | false           |
| /user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| /usr/node_modules/@types                                                                 | false           |
| /usr/username/node_modules/@types                                                        | false           |
| /usr/username/folderAtRoot/node_modules/@types                                           | false           |
| /usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| /home/node_modules/@types                                                                | false           |
| /home/username/node_modules/@types                                                       | false           |
| /home/username/folderAtRoot/node_modules/@types                                          | false           |
| /home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: /users/username

Root: /users/username

| Directory                                                                                | canWatchAtTypes |
| ---------------------------------------------------------------------------------------- | --------------- |
| /node_modules/@types                                                                     | false           |
| /folderAtRoot/node_modules/@types                                                        | false           |
| /folderAtRoot/folder1/node_modules/@types                                                | false           |
| /folderAtRoot/folder1/folder2/node_modules/@types                                        | false           |
| /folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| /users/node_modules/@types                                                               | false           |
| /users/username/node_modules/@types                                                      | true            |
| /users/username/folderAtRoot/node_modules/@types                                         | false           |
| /users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| /users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| /user/node_modules/@types                                                                | false           |
| /user/username/node_modules/@types                                                       | false           |
| /user/username/folderAtRoot/node_modules/@types                                          | false           |
| /user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| /usr/node_modules/@types                                                                 | false           |
| /usr/username/node_modules/@types                                                        | false           |
| /usr/username/folderAtRoot/node_modules/@types                                           | false           |
| /usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| /home/node_modules/@types                                                                | false           |
| /home/username/node_modules/@types                                                       | false           |
| /home/username/folderAtRoot/node_modules/@types                                          | false           |
| /home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: /users/username/folderAtRoot

Root: /users/username/folderAtRoot

| Directory                                                                                | canWatchAtTypes |
| ---------------------------------------------------------------------------------------- | --------------- |
| /node_modules/@types                                                                     | false           |
| /folderAtRoot/node_modules/@types                                                        | false           |
| /folderAtRoot/folder1/node_modules/@types                                                | false           |
| /folderAtRoot/folder1/folder2/node_modules/@types                                        | false           |
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
| /user/username/folderAtRoot/node_modules/@types                                          | false           |
| /user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| /usr/node_modules/@types                                                                 | false           |
| /usr/username/node_modules/@types                                                        | false           |
| /usr/username/folderAtRoot/node_modules/@types                                           | false           |
| /usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| /home/node_modules/@types                                                                | false           |
| /home/username/node_modules/@types                                                       | false           |
| /home/username/folderAtRoot/node_modules/@types                                          | false           |
| /home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: /users/username/folderAtRoot/folder1

Root: /users/username/folderAtRoot/folder1

| Directory                                                                                | canWatchAtTypes |
| ---------------------------------------------------------------------------------------- | --------------- |
| /node_modules/@types                                                                     | false           |
| /folderAtRoot/node_modules/@types                                                        | false           |
| /folderAtRoot/folder1/node_modules/@types                                                | false           |
| /folderAtRoot/folder1/folder2/node_modules/@types                                        | false           |
| /folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| /users/node_modules/@types                                                               | false           |
| /users/username/node_modules/@types                                                      | false           |
| /users/username/folderAtRoot/node_modules/@types                                         | false           |
| /users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| /users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| /user/node_modules/@types                                                                | false           |
| /user/username/node_modules/@types                                                       | false           |
| /user/username/folderAtRoot/node_modules/@types                                          | false           |
| /user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| /usr/node_modules/@types                                                                 | false           |
| /usr/username/node_modules/@types                                                        | false           |
| /usr/username/folderAtRoot/node_modules/@types                                           | false           |
| /usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| /home/node_modules/@types                                                                | false           |
| /home/username/node_modules/@types                                                       | false           |
| /home/username/folderAtRoot/node_modules/@types                                          | false           |
| /home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: /users/username/folderAtRoot/folder1/folder2

Root: /users/username/folderAtRoot/folder1/folder2

| Directory                                                                                | canWatchAtTypes |
| ---------------------------------------------------------------------------------------- | --------------- |
| /node_modules/@types                                                                     | false           |
| /folderAtRoot/node_modules/@types                                                        | false           |
| /folderAtRoot/folder1/node_modules/@types                                                | false           |
| /folderAtRoot/folder1/folder2/node_modules/@types                                        | false           |
| /folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| /users/node_modules/@types                                                               | false           |
| /users/username/node_modules/@types                                                      | false           |
| /users/username/folderAtRoot/node_modules/@types                                         | false           |
| /users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| /users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| /user/node_modules/@types                                                                | false           |
| /user/username/node_modules/@types                                                       | false           |
| /user/username/folderAtRoot/node_modules/@types                                          | false           |
| /user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| /usr/node_modules/@types                                                                 | false           |
| /usr/username/node_modules/@types                                                        | false           |
| /usr/username/folderAtRoot/node_modules/@types                                           | false           |
| /usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| /home/node_modules/@types                                                                | false           |
| /home/username/node_modules/@types                                                       | false           |
| /home/username/folderAtRoot/node_modules/@types                                          | false           |
| /home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: /users/username/folderAtRoot/folder1/folder2/folder3

Root: /users/username/folderAtRoot/folder1/folder2/folder3

| Directory                                                                                | canWatchAtTypes |
| ---------------------------------------------------------------------------------------- | --------------- |
| /node_modules/@types                                                                     | false           |
| /folderAtRoot/node_modules/@types                                                        | false           |
| /folderAtRoot/folder1/node_modules/@types                                                | false           |
| /folderAtRoot/folder1/folder2/node_modules/@types                                        | false           |
| /folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| /users/node_modules/@types                                                               | false           |
| /users/username/node_modules/@types                                                      | false           |
| /users/username/folderAtRoot/node_modules/@types                                         | false           |
| /users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| /users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| /user/node_modules/@types                                                                | false           |
| /user/username/node_modules/@types                                                       | false           |
| /user/username/folderAtRoot/node_modules/@types                                          | false           |
| /user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| /usr/node_modules/@types                                                                 | false           |
| /usr/username/node_modules/@types                                                        | false           |
| /usr/username/folderAtRoot/node_modules/@types                                           | false           |
| /usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| /home/node_modules/@types                                                                | false           |
| /home/username/node_modules/@types                                                       | false           |
| /home/username/folderAtRoot/node_modules/@types                                          | false           |
| /home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: /users/username/folderAtRoot/folder1/folder2/folder3/folder4

Root: /users/username/folderAtRoot/folder1/folder2/folder3/folder4

| Directory                                                                                | canWatchAtTypes |
| ---------------------------------------------------------------------------------------- | --------------- |
| /node_modules/@types                                                                     | false           |
| /folderAtRoot/node_modules/@types                                                        | false           |
| /folderAtRoot/folder1/node_modules/@types                                                | false           |
| /folderAtRoot/folder1/folder2/node_modules/@types                                        | false           |
| /folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| /users/node_modules/@types                                                               | false           |
| /users/username/node_modules/@types                                                      | false           |
| /users/username/folderAtRoot/node_modules/@types                                         | false           |
| /users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| /users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| /user/node_modules/@types                                                                | false           |
| /user/username/node_modules/@types                                                       | false           |
| /user/username/folderAtRoot/node_modules/@types                                          | false           |
| /user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| /usr/node_modules/@types                                                                 | false           |
| /usr/username/node_modules/@types                                                        | false           |
| /usr/username/folderAtRoot/node_modules/@types                                           | false           |
| /usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| /home/node_modules/@types                                                                | false           |
| /home/username/node_modules/@types                                                       | false           |
| /home/username/folderAtRoot/node_modules/@types                                          | false           |
| /home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

Root: /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

| Directory                                                                                | canWatchAtTypes |
| ---------------------------------------------------------------------------------------- | --------------- |
| /node_modules/@types                                                                     | false           |
| /folderAtRoot/node_modules/@types                                                        | false           |
| /folderAtRoot/folder1/node_modules/@types                                                | false           |
| /folderAtRoot/folder1/folder2/node_modules/@types                                        | false           |
| /folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| /users/node_modules/@types                                                               | false           |
| /users/username/node_modules/@types                                                      | false           |
| /users/username/folderAtRoot/node_modules/@types                                         | false           |
| /users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| /users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| /user/node_modules/@types                                                                | false           |
| /user/username/node_modules/@types                                                       | false           |
| /user/username/folderAtRoot/node_modules/@types                                          | false           |
| /user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| /usr/node_modules/@types                                                                 | false           |
| /usr/username/node_modules/@types                                                        | false           |
| /usr/username/folderAtRoot/node_modules/@types                                           | false           |
| /usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| /home/node_modules/@types                                                                | false           |
| /home/username/node_modules/@types                                                       | false           |
| /home/username/folderAtRoot/node_modules/@types                                          | false           |
| /home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: /user

Root: /user

| Directory                                                                                | canWatchAtTypes |
| ---------------------------------------------------------------------------------------- | --------------- |
| /node_modules/@types                                                                     | false           |
| /folderAtRoot/node_modules/@types                                                        | false           |
| /folderAtRoot/folder1/node_modules/@types                                                | false           |
| /folderAtRoot/folder1/folder2/node_modules/@types                                        | false           |
| /folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| /users/node_modules/@types                                                               | false           |
| /users/username/node_modules/@types                                                      | false           |
| /users/username/folderAtRoot/node_modules/@types                                         | false           |
| /users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| /users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| /user/node_modules/@types                                                                | true            |
| /user/username/node_modules/@types                                                       | false           |
| /user/username/folderAtRoot/node_modules/@types                                          | false           |
| /user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| /usr/node_modules/@types                                                                 | false           |
| /usr/username/node_modules/@types                                                        | false           |
| /usr/username/folderAtRoot/node_modules/@types                                           | false           |
| /usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| /home/node_modules/@types                                                                | false           |
| /home/username/node_modules/@types                                                       | false           |
| /home/username/folderAtRoot/node_modules/@types                                          | false           |
| /home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: /user/username

Root: /user/username

| Directory                                                                                | canWatchAtTypes |
| ---------------------------------------------------------------------------------------- | --------------- |
| /node_modules/@types                                                                     | false           |
| /folderAtRoot/node_modules/@types                                                        | false           |
| /folderAtRoot/folder1/node_modules/@types                                                | false           |
| /folderAtRoot/folder1/folder2/node_modules/@types                                        | false           |
| /folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| /users/node_modules/@types                                                               | false           |
| /users/username/node_modules/@types                                                      | false           |
| /users/username/folderAtRoot/node_modules/@types                                         | false           |
| /users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| /users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| /user/node_modules/@types                                                                | false           |
| /user/username/node_modules/@types                                                       | true            |
| /user/username/folderAtRoot/node_modules/@types                                          | false           |
| /user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| /usr/node_modules/@types                                                                 | false           |
| /usr/username/node_modules/@types                                                        | false           |
| /usr/username/folderAtRoot/node_modules/@types                                           | false           |
| /usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| /home/node_modules/@types                                                                | false           |
| /home/username/node_modules/@types                                                       | false           |
| /home/username/folderAtRoot/node_modules/@types                                          | false           |
| /home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: /user/username/folderAtRoot

Root: /user/username/folderAtRoot

| Directory                                                                                | canWatchAtTypes |
| ---------------------------------------------------------------------------------------- | --------------- |
| /node_modules/@types                                                                     | false           |
| /folderAtRoot/node_modules/@types                                                        | false           |
| /folderAtRoot/folder1/node_modules/@types                                                | false           |
| /folderAtRoot/folder1/folder2/node_modules/@types                                        | false           |
| /folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| /users/node_modules/@types                                                               | false           |
| /users/username/node_modules/@types                                                      | false           |
| /users/username/folderAtRoot/node_modules/@types                                         | false           |
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
| /usr/username/folderAtRoot/node_modules/@types                                           | false           |
| /usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| /home/node_modules/@types                                                                | false           |
| /home/username/node_modules/@types                                                       | false           |
| /home/username/folderAtRoot/node_modules/@types                                          | false           |
| /home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: /user/username/folderAtRoot/folder1

Root: /user/username/folderAtRoot/folder1

| Directory                                                                                | canWatchAtTypes |
| ---------------------------------------------------------------------------------------- | --------------- |
| /node_modules/@types                                                                     | false           |
| /folderAtRoot/node_modules/@types                                                        | false           |
| /folderAtRoot/folder1/node_modules/@types                                                | false           |
| /folderAtRoot/folder1/folder2/node_modules/@types                                        | false           |
| /folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| /users/node_modules/@types                                                               | false           |
| /users/username/node_modules/@types                                                      | false           |
| /users/username/folderAtRoot/node_modules/@types                                         | false           |
| /users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| /users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| /user/node_modules/@types                                                                | false           |
| /user/username/node_modules/@types                                                       | false           |
| /user/username/folderAtRoot/node_modules/@types                                          | false           |
| /user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| /usr/node_modules/@types                                                                 | false           |
| /usr/username/node_modules/@types                                                        | false           |
| /usr/username/folderAtRoot/node_modules/@types                                           | false           |
| /usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| /home/node_modules/@types                                                                | false           |
| /home/username/node_modules/@types                                                       | false           |
| /home/username/folderAtRoot/node_modules/@types                                          | false           |
| /home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: /user/username/folderAtRoot/folder1/folder2

Root: /user/username/folderAtRoot/folder1/folder2

| Directory                                                                                | canWatchAtTypes |
| ---------------------------------------------------------------------------------------- | --------------- |
| /node_modules/@types                                                                     | false           |
| /folderAtRoot/node_modules/@types                                                        | false           |
| /folderAtRoot/folder1/node_modules/@types                                                | false           |
| /folderAtRoot/folder1/folder2/node_modules/@types                                        | false           |
| /folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| /users/node_modules/@types                                                               | false           |
| /users/username/node_modules/@types                                                      | false           |
| /users/username/folderAtRoot/node_modules/@types                                         | false           |
| /users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| /users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| /user/node_modules/@types                                                                | false           |
| /user/username/node_modules/@types                                                       | false           |
| /user/username/folderAtRoot/node_modules/@types                                          | false           |
| /user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| /usr/node_modules/@types                                                                 | false           |
| /usr/username/node_modules/@types                                                        | false           |
| /usr/username/folderAtRoot/node_modules/@types                                           | false           |
| /usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| /home/node_modules/@types                                                                | false           |
| /home/username/node_modules/@types                                                       | false           |
| /home/username/folderAtRoot/node_modules/@types                                          | false           |
| /home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: /user/username/folderAtRoot/folder1/folder2/folder3

Root: /user/username/folderAtRoot/folder1/folder2/folder3

| Directory                                                                                | canWatchAtTypes |
| ---------------------------------------------------------------------------------------- | --------------- |
| /node_modules/@types                                                                     | false           |
| /folderAtRoot/node_modules/@types                                                        | false           |
| /folderAtRoot/folder1/node_modules/@types                                                | false           |
| /folderAtRoot/folder1/folder2/node_modules/@types                                        | false           |
| /folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| /users/node_modules/@types                                                               | false           |
| /users/username/node_modules/@types                                                      | false           |
| /users/username/folderAtRoot/node_modules/@types                                         | false           |
| /users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| /users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| /user/node_modules/@types                                                                | false           |
| /user/username/node_modules/@types                                                       | false           |
| /user/username/folderAtRoot/node_modules/@types                                          | false           |
| /user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| /usr/node_modules/@types                                                                 | false           |
| /usr/username/node_modules/@types                                                        | false           |
| /usr/username/folderAtRoot/node_modules/@types                                           | false           |
| /usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| /home/node_modules/@types                                                                | false           |
| /home/username/node_modules/@types                                                       | false           |
| /home/username/folderAtRoot/node_modules/@types                                          | false           |
| /home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: /user/username/folderAtRoot/folder1/folder2/folder3/folder4

Root: /user/username/folderAtRoot/folder1/folder2/folder3/folder4

| Directory                                                                                | canWatchAtTypes |
| ---------------------------------------------------------------------------------------- | --------------- |
| /node_modules/@types                                                                     | false           |
| /folderAtRoot/node_modules/@types                                                        | false           |
| /folderAtRoot/folder1/node_modules/@types                                                | false           |
| /folderAtRoot/folder1/folder2/node_modules/@types                                        | false           |
| /folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| /users/node_modules/@types                                                               | false           |
| /users/username/node_modules/@types                                                      | false           |
| /users/username/folderAtRoot/node_modules/@types                                         | false           |
| /users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| /users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| /user/node_modules/@types                                                                | false           |
| /user/username/node_modules/@types                                                       | false           |
| /user/username/folderAtRoot/node_modules/@types                                          | false           |
| /user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| /usr/node_modules/@types                                                                 | false           |
| /usr/username/node_modules/@types                                                        | false           |
| /usr/username/folderAtRoot/node_modules/@types                                           | false           |
| /usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| /home/node_modules/@types                                                                | false           |
| /home/username/node_modules/@types                                                       | false           |
| /home/username/folderAtRoot/node_modules/@types                                          | false           |
| /home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

Root: /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

| Directory                                                                                | canWatchAtTypes |
| ---------------------------------------------------------------------------------------- | --------------- |
| /node_modules/@types                                                                     | false           |
| /folderAtRoot/node_modules/@types                                                        | false           |
| /folderAtRoot/folder1/node_modules/@types                                                | false           |
| /folderAtRoot/folder1/folder2/node_modules/@types                                        | false           |
| /folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| /users/node_modules/@types                                                               | false           |
| /users/username/node_modules/@types                                                      | false           |
| /users/username/folderAtRoot/node_modules/@types                                         | false           |
| /users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| /users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| /user/node_modules/@types                                                                | false           |
| /user/username/node_modules/@types                                                       | false           |
| /user/username/folderAtRoot/node_modules/@types                                          | false           |
| /user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| /usr/node_modules/@types                                                                 | false           |
| /usr/username/node_modules/@types                                                        | false           |
| /usr/username/folderAtRoot/node_modules/@types                                           | false           |
| /usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| /home/node_modules/@types                                                                | false           |
| /home/username/node_modules/@types                                                       | false           |
| /home/username/folderAtRoot/node_modules/@types                                          | false           |
| /home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: /usr

Root: /usr

| Directory                                                                                | canWatchAtTypes |
| ---------------------------------------------------------------------------------------- | --------------- |
| /node_modules/@types                                                                     | false           |
| /folderAtRoot/node_modules/@types                                                        | false           |
| /folderAtRoot/folder1/node_modules/@types                                                | false           |
| /folderAtRoot/folder1/folder2/node_modules/@types                                        | false           |
| /folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| /users/node_modules/@types                                                               | false           |
| /users/username/node_modules/@types                                                      | false           |
| /users/username/folderAtRoot/node_modules/@types                                         | false           |
| /users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| /users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| /user/node_modules/@types                                                                | false           |
| /user/username/node_modules/@types                                                       | false           |
| /user/username/folderAtRoot/node_modules/@types                                          | false           |
| /user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| /usr/node_modules/@types                                                                 | true            |
| /usr/username/node_modules/@types                                                        | false           |
| /usr/username/folderAtRoot/node_modules/@types                                           | false           |
| /usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| /home/node_modules/@types                                                                | false           |
| /home/username/node_modules/@types                                                       | false           |
| /home/username/folderAtRoot/node_modules/@types                                          | false           |
| /home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: /usr/username

Root: /usr/username

| Directory                                                                                | canWatchAtTypes |
| ---------------------------------------------------------------------------------------- | --------------- |
| /node_modules/@types                                                                     | false           |
| /folderAtRoot/node_modules/@types                                                        | false           |
| /folderAtRoot/folder1/node_modules/@types                                                | false           |
| /folderAtRoot/folder1/folder2/node_modules/@types                                        | false           |
| /folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| /users/node_modules/@types                                                               | false           |
| /users/username/node_modules/@types                                                      | false           |
| /users/username/folderAtRoot/node_modules/@types                                         | false           |
| /users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| /users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| /user/node_modules/@types                                                                | false           |
| /user/username/node_modules/@types                                                       | false           |
| /user/username/folderAtRoot/node_modules/@types                                          | false           |
| /user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| /usr/node_modules/@types                                                                 | false           |
| /usr/username/node_modules/@types                                                        | true            |
| /usr/username/folderAtRoot/node_modules/@types                                           | false           |
| /usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| /home/node_modules/@types                                                                | false           |
| /home/username/node_modules/@types                                                       | false           |
| /home/username/folderAtRoot/node_modules/@types                                          | false           |
| /home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: /usr/username/folderAtRoot

Root: /usr/username/folderAtRoot

| Directory                                                                                | canWatchAtTypes |
| ---------------------------------------------------------------------------------------- | --------------- |
| /node_modules/@types                                                                     | false           |
| /folderAtRoot/node_modules/@types                                                        | false           |
| /folderAtRoot/folder1/node_modules/@types                                                | false           |
| /folderAtRoot/folder1/folder2/node_modules/@types                                        | false           |
| /folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| /users/node_modules/@types                                                               | false           |
| /users/username/node_modules/@types                                                      | false           |
| /users/username/folderAtRoot/node_modules/@types                                         | false           |
| /users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| /users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| /user/node_modules/@types                                                                | false           |
| /user/username/node_modules/@types                                                       | false           |
| /user/username/folderAtRoot/node_modules/@types                                          | false           |
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
| /home/username/folderAtRoot/node_modules/@types                                          | false           |
| /home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: /usr/username/folderAtRoot/folder1

Root: /usr/username/folderAtRoot/folder1

| Directory                                                                                | canWatchAtTypes |
| ---------------------------------------------------------------------------------------- | --------------- |
| /node_modules/@types                                                                     | false           |
| /folderAtRoot/node_modules/@types                                                        | false           |
| /folderAtRoot/folder1/node_modules/@types                                                | false           |
| /folderAtRoot/folder1/folder2/node_modules/@types                                        | false           |
| /folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| /users/node_modules/@types                                                               | false           |
| /users/username/node_modules/@types                                                      | false           |
| /users/username/folderAtRoot/node_modules/@types                                         | false           |
| /users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| /users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| /user/node_modules/@types                                                                | false           |
| /user/username/node_modules/@types                                                       | false           |
| /user/username/folderAtRoot/node_modules/@types                                          | false           |
| /user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| /usr/node_modules/@types                                                                 | false           |
| /usr/username/node_modules/@types                                                        | false           |
| /usr/username/folderAtRoot/node_modules/@types                                           | false           |
| /usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| /home/node_modules/@types                                                                | false           |
| /home/username/node_modules/@types                                                       | false           |
| /home/username/folderAtRoot/node_modules/@types                                          | false           |
| /home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: /usr/username/folderAtRoot/folder1/folder2

Root: /usr/username/folderAtRoot/folder1/folder2

| Directory                                                                                | canWatchAtTypes |
| ---------------------------------------------------------------------------------------- | --------------- |
| /node_modules/@types                                                                     | false           |
| /folderAtRoot/node_modules/@types                                                        | false           |
| /folderAtRoot/folder1/node_modules/@types                                                | false           |
| /folderAtRoot/folder1/folder2/node_modules/@types                                        | false           |
| /folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| /users/node_modules/@types                                                               | false           |
| /users/username/node_modules/@types                                                      | false           |
| /users/username/folderAtRoot/node_modules/@types                                         | false           |
| /users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| /users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| /user/node_modules/@types                                                                | false           |
| /user/username/node_modules/@types                                                       | false           |
| /user/username/folderAtRoot/node_modules/@types                                          | false           |
| /user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| /usr/node_modules/@types                                                                 | false           |
| /usr/username/node_modules/@types                                                        | false           |
| /usr/username/folderAtRoot/node_modules/@types                                           | false           |
| /usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| /home/node_modules/@types                                                                | false           |
| /home/username/node_modules/@types                                                       | false           |
| /home/username/folderAtRoot/node_modules/@types                                          | false           |
| /home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: /usr/username/folderAtRoot/folder1/folder2/folder3

Root: /usr/username/folderAtRoot/folder1/folder2/folder3

| Directory                                                                                | canWatchAtTypes |
| ---------------------------------------------------------------------------------------- | --------------- |
| /node_modules/@types                                                                     | false           |
| /folderAtRoot/node_modules/@types                                                        | false           |
| /folderAtRoot/folder1/node_modules/@types                                                | false           |
| /folderAtRoot/folder1/folder2/node_modules/@types                                        | false           |
| /folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| /users/node_modules/@types                                                               | false           |
| /users/username/node_modules/@types                                                      | false           |
| /users/username/folderAtRoot/node_modules/@types                                         | false           |
| /users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| /users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| /user/node_modules/@types                                                                | false           |
| /user/username/node_modules/@types                                                       | false           |
| /user/username/folderAtRoot/node_modules/@types                                          | false           |
| /user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| /usr/node_modules/@types                                                                 | false           |
| /usr/username/node_modules/@types                                                        | false           |
| /usr/username/folderAtRoot/node_modules/@types                                           | false           |
| /usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| /home/node_modules/@types                                                                | false           |
| /home/username/node_modules/@types                                                       | false           |
| /home/username/folderAtRoot/node_modules/@types                                          | false           |
| /home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: /usr/username/folderAtRoot/folder1/folder2/folder3/folder4

Root: /usr/username/folderAtRoot/folder1/folder2/folder3/folder4

| Directory                                                                                | canWatchAtTypes |
| ---------------------------------------------------------------------------------------- | --------------- |
| /node_modules/@types                                                                     | false           |
| /folderAtRoot/node_modules/@types                                                        | false           |
| /folderAtRoot/folder1/node_modules/@types                                                | false           |
| /folderAtRoot/folder1/folder2/node_modules/@types                                        | false           |
| /folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| /users/node_modules/@types                                                               | false           |
| /users/username/node_modules/@types                                                      | false           |
| /users/username/folderAtRoot/node_modules/@types                                         | false           |
| /users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| /users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| /user/node_modules/@types                                                                | false           |
| /user/username/node_modules/@types                                                       | false           |
| /user/username/folderAtRoot/node_modules/@types                                          | false           |
| /user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| /usr/node_modules/@types                                                                 | false           |
| /usr/username/node_modules/@types                                                        | false           |
| /usr/username/folderAtRoot/node_modules/@types                                           | false           |
| /usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| /home/node_modules/@types                                                                | false           |
| /home/username/node_modules/@types                                                       | false           |
| /home/username/folderAtRoot/node_modules/@types                                          | false           |
| /home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

Root: /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

| Directory                                                                                | canWatchAtTypes |
| ---------------------------------------------------------------------------------------- | --------------- |
| /node_modules/@types                                                                     | false           |
| /folderAtRoot/node_modules/@types                                                        | false           |
| /folderAtRoot/folder1/node_modules/@types                                                | false           |
| /folderAtRoot/folder1/folder2/node_modules/@types                                        | false           |
| /folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| /users/node_modules/@types                                                               | false           |
| /users/username/node_modules/@types                                                      | false           |
| /users/username/folderAtRoot/node_modules/@types                                         | false           |
| /users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| /users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| /user/node_modules/@types                                                                | false           |
| /user/username/node_modules/@types                                                       | false           |
| /user/username/folderAtRoot/node_modules/@types                                          | false           |
| /user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| /usr/node_modules/@types                                                                 | false           |
| /usr/username/node_modules/@types                                                        | false           |
| /usr/username/folderAtRoot/node_modules/@types                                           | false           |
| /usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| /home/node_modules/@types                                                                | false           |
| /home/username/node_modules/@types                                                       | false           |
| /home/username/folderAtRoot/node_modules/@types                                          | false           |
| /home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: /home

Root: /home

| Directory                                                                                | canWatchAtTypes |
| ---------------------------------------------------------------------------------------- | --------------- |
| /node_modules/@types                                                                     | false           |
| /folderAtRoot/node_modules/@types                                                        | false           |
| /folderAtRoot/folder1/node_modules/@types                                                | false           |
| /folderAtRoot/folder1/folder2/node_modules/@types                                        | false           |
| /folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| /users/node_modules/@types                                                               | false           |
| /users/username/node_modules/@types                                                      | false           |
| /users/username/folderAtRoot/node_modules/@types                                         | false           |
| /users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| /users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| /user/node_modules/@types                                                                | false           |
| /user/username/node_modules/@types                                                       | false           |
| /user/username/folderAtRoot/node_modules/@types                                          | false           |
| /user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| /usr/node_modules/@types                                                                 | false           |
| /usr/username/node_modules/@types                                                        | false           |
| /usr/username/folderAtRoot/node_modules/@types                                           | false           |
| /usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| /home/node_modules/@types                                                                | true            |
| /home/username/node_modules/@types                                                       | false           |
| /home/username/folderAtRoot/node_modules/@types                                          | false           |
| /home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: /home/username

Root: /home/username

| Directory                                                                                | canWatchAtTypes |
| ---------------------------------------------------------------------------------------- | --------------- |
| /node_modules/@types                                                                     | false           |
| /folderAtRoot/node_modules/@types                                                        | false           |
| /folderAtRoot/folder1/node_modules/@types                                                | false           |
| /folderAtRoot/folder1/folder2/node_modules/@types                                        | false           |
| /folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| /users/node_modules/@types                                                               | false           |
| /users/username/node_modules/@types                                                      | false           |
| /users/username/folderAtRoot/node_modules/@types                                         | false           |
| /users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| /users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| /user/node_modules/@types                                                                | false           |
| /user/username/node_modules/@types                                                       | false           |
| /user/username/folderAtRoot/node_modules/@types                                          | false           |
| /user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| /usr/node_modules/@types                                                                 | false           |
| /usr/username/node_modules/@types                                                        | false           |
| /usr/username/folderAtRoot/node_modules/@types                                           | false           |
| /usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| /home/node_modules/@types                                                                | false           |
| /home/username/node_modules/@types                                                       | true            |
| /home/username/folderAtRoot/node_modules/@types                                          | false           |
| /home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: /home/username/folderAtRoot

Root: /home/username/folderAtRoot

| Directory                                                                                | canWatchAtTypes |
| ---------------------------------------------------------------------------------------- | --------------- |
| /node_modules/@types                                                                     | false           |
| /folderAtRoot/node_modules/@types                                                        | false           |
| /folderAtRoot/folder1/node_modules/@types                                                | false           |
| /folderAtRoot/folder1/folder2/node_modules/@types                                        | false           |
| /folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| /users/node_modules/@types                                                               | false           |
| /users/username/node_modules/@types                                                      | false           |
| /users/username/folderAtRoot/node_modules/@types                                         | false           |
| /users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| /users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| /user/node_modules/@types                                                                | false           |
| /user/username/node_modules/@types                                                       | false           |
| /user/username/folderAtRoot/node_modules/@types                                          | false           |
| /user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| /usr/node_modules/@types                                                                 | false           |
| /usr/username/node_modules/@types                                                        | false           |
| /usr/username/folderAtRoot/node_modules/@types                                           | false           |
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

## RootDirForResolution: /home/username/folderAtRoot/folder1

Root: /home/username/folderAtRoot/folder1

| Directory                                                                                | canWatchAtTypes |
| ---------------------------------------------------------------------------------------- | --------------- |
| /node_modules/@types                                                                     | false           |
| /folderAtRoot/node_modules/@types                                                        | false           |
| /folderAtRoot/folder1/node_modules/@types                                                | false           |
| /folderAtRoot/folder1/folder2/node_modules/@types                                        | false           |
| /folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| /users/node_modules/@types                                                               | false           |
| /users/username/node_modules/@types                                                      | false           |
| /users/username/folderAtRoot/node_modules/@types                                         | false           |
| /users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| /users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| /user/node_modules/@types                                                                | false           |
| /user/username/node_modules/@types                                                       | false           |
| /user/username/folderAtRoot/node_modules/@types                                          | false           |
| /user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| /usr/node_modules/@types                                                                 | false           |
| /usr/username/node_modules/@types                                                        | false           |
| /usr/username/folderAtRoot/node_modules/@types                                           | false           |
| /usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| /home/node_modules/@types                                                                | false           |
| /home/username/node_modules/@types                                                       | false           |
| /home/username/folderAtRoot/node_modules/@types                                          | false           |
| /home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: /home/username/folderAtRoot/folder1/folder2

Root: /home/username/folderAtRoot/folder1/folder2

| Directory                                                                                | canWatchAtTypes |
| ---------------------------------------------------------------------------------------- | --------------- |
| /node_modules/@types                                                                     | false           |
| /folderAtRoot/node_modules/@types                                                        | false           |
| /folderAtRoot/folder1/node_modules/@types                                                | false           |
| /folderAtRoot/folder1/folder2/node_modules/@types                                        | false           |
| /folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| /users/node_modules/@types                                                               | false           |
| /users/username/node_modules/@types                                                      | false           |
| /users/username/folderAtRoot/node_modules/@types                                         | false           |
| /users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| /users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| /user/node_modules/@types                                                                | false           |
| /user/username/node_modules/@types                                                       | false           |
| /user/username/folderAtRoot/node_modules/@types                                          | false           |
| /user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| /usr/node_modules/@types                                                                 | false           |
| /usr/username/node_modules/@types                                                        | false           |
| /usr/username/folderAtRoot/node_modules/@types                                           | false           |
| /usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| /home/node_modules/@types                                                                | false           |
| /home/username/node_modules/@types                                                       | false           |
| /home/username/folderAtRoot/node_modules/@types                                          | false           |
| /home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: /home/username/folderAtRoot/folder1/folder2/folder3

Root: /home/username/folderAtRoot/folder1/folder2/folder3

| Directory                                                                                | canWatchAtTypes |
| ---------------------------------------------------------------------------------------- | --------------- |
| /node_modules/@types                                                                     | false           |
| /folderAtRoot/node_modules/@types                                                        | false           |
| /folderAtRoot/folder1/node_modules/@types                                                | false           |
| /folderAtRoot/folder1/folder2/node_modules/@types                                        | false           |
| /folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| /users/node_modules/@types                                                               | false           |
| /users/username/node_modules/@types                                                      | false           |
| /users/username/folderAtRoot/node_modules/@types                                         | false           |
| /users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| /users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| /user/node_modules/@types                                                                | false           |
| /user/username/node_modules/@types                                                       | false           |
| /user/username/folderAtRoot/node_modules/@types                                          | false           |
| /user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| /usr/node_modules/@types                                                                 | false           |
| /usr/username/node_modules/@types                                                        | false           |
| /usr/username/folderAtRoot/node_modules/@types                                           | false           |
| /usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| /home/node_modules/@types                                                                | false           |
| /home/username/node_modules/@types                                                       | false           |
| /home/username/folderAtRoot/node_modules/@types                                          | false           |
| /home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: /home/username/folderAtRoot/folder1/folder2/folder3/folder4

Root: /home/username/folderAtRoot/folder1/folder2/folder3/folder4

| Directory                                                                                | canWatchAtTypes |
| ---------------------------------------------------------------------------------------- | --------------- |
| /node_modules/@types                                                                     | false           |
| /folderAtRoot/node_modules/@types                                                        | false           |
| /folderAtRoot/folder1/node_modules/@types                                                | false           |
| /folderAtRoot/folder1/folder2/node_modules/@types                                        | false           |
| /folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| /users/node_modules/@types                                                               | false           |
| /users/username/node_modules/@types                                                      | false           |
| /users/username/folderAtRoot/node_modules/@types                                         | false           |
| /users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| /users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| /user/node_modules/@types                                                                | false           |
| /user/username/node_modules/@types                                                       | false           |
| /user/username/folderAtRoot/node_modules/@types                                          | false           |
| /user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| /usr/node_modules/@types                                                                 | false           |
| /usr/username/node_modules/@types                                                        | false           |
| /usr/username/folderAtRoot/node_modules/@types                                           | false           |
| /usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| /home/node_modules/@types                                                                | false           |
| /home/username/node_modules/@types                                                       | false           |
| /home/username/folderAtRoot/node_modules/@types                                          | false           |
| /home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

Root: /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

| Directory                                                                                | canWatchAtTypes |
| ---------------------------------------------------------------------------------------- | --------------- |
| /node_modules/@types                                                                     | false           |
| /folderAtRoot/node_modules/@types                                                        | false           |
| /folderAtRoot/folder1/node_modules/@types                                                | false           |
| /folderAtRoot/folder1/folder2/node_modules/@types                                        | false           |
| /folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| /users/node_modules/@types                                                               | false           |
| /users/username/node_modules/@types                                                      | false           |
| /users/username/folderAtRoot/node_modules/@types                                         | false           |
| /users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| /users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| /user/node_modules/@types                                                                | false           |
| /user/username/node_modules/@types                                                       | false           |
| /user/username/folderAtRoot/node_modules/@types                                          | false           |
| /user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| /usr/node_modules/@types                                                                 | false           |
| /usr/username/node_modules/@types                                                        | false           |
| /usr/username/folderAtRoot/node_modules/@types                                           | false           |
| /usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| /home/node_modules/@types                                                                | false           |
| /home/username/node_modules/@types                                                       | false           |
| /home/username/folderAtRoot/node_modules/@types                                          | false           |
| /home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: undefined

Root: undefined

| Directory                                                                                | canWatchAtTypes |
| ---------------------------------------------------------------------------------------- | --------------- |
| /node_modules/@types                                                                     | false           |
| /folderAtRoot/node_modules/@types                                                        | false           |
| /folderAtRoot/folder1/node_modules/@types                                                | false           |
| /folderAtRoot/folder1/folder2/node_modules/@types                                        | false           |
| /folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| /users/node_modules/@types                                                               | false           |
| /users/username/node_modules/@types                                                      | false           |
| /users/username/folderAtRoot/node_modules/@types                                         | false           |
| /users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| /users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| /user/node_modules/@types                                                                | false           |
| /user/username/node_modules/@types                                                       | false           |
| /user/username/folderAtRoot/node_modules/@types                                          | false           |
| /user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| /usr/node_modules/@types                                                                 | false           |
| /usr/username/node_modules/@types                                                        | false           |
| /usr/username/folderAtRoot/node_modules/@types                                           | false           |
| /usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| /home/node_modules/@types                                                                | false           |
| /home/username/node_modules/@types                                                       | false           |
| /home/username/folderAtRoot/node_modules/@types                                          | false           |
| /home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| /home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

