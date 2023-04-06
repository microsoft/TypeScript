# canWatchAtTypes

Determines if given node_modules/@types can be watched.
These are the typeRoots calculated because user didnt specify typeRoots in compierOptions

## Testing for Unc root: //vda1cs4850/

## RootDirForResolution: //vda1cs4850/

Root: //vda1cs4850

| Directory                                                                                            | canWatchAtTypes |
| ---------------------------------------------------------------------------------------------------- | --------------- |
| //vda1cs4850/node_modules/@types                                                                     | false           |
| //vda1cs4850/folderAtRoot/node_modules/@types                                                        | false           |
| //vda1cs4850/folderAtRoot/folder1/node_modules/@types                                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| //vda1cs4850/users/node_modules/@types                                                               | false           |
| //vda1cs4850/users/username/node_modules/@types                                                      | false           |
| //vda1cs4850/users/username/folderAtRoot/node_modules/@types                                         | false           |
| //vda1cs4850/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| //vda1cs4850/user/node_modules/@types                                                                | false           |
| //vda1cs4850/user/username/node_modules/@types                                                       | true            |
| //vda1cs4850/user/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| //vda1cs4850/usr/node_modules/@types                                                                 | false           |
| //vda1cs4850/usr/username/node_modules/@types                                                        | true            |
| //vda1cs4850/usr/username/folderAtRoot/node_modules/@types                                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| //vda1cs4850/home/node_modules/@types                                                                | false           |
| //vda1cs4850/home/username/node_modules/@types                                                       | true            |
| //vda1cs4850/home/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: //vda1cs4850/folderAtRoot

Root: //vda1cs4850/folderAtRoot

| Directory                                                                                            | canWatchAtTypes |
| ---------------------------------------------------------------------------------------------------- | --------------- |
| //vda1cs4850/node_modules/@types                                                                     | false           |
| //vda1cs4850/folderAtRoot/node_modules/@types                                                        | true            |
| //vda1cs4850/folderAtRoot/folder1/node_modules/@types                                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| //vda1cs4850/users/node_modules/@types                                                               | false           |
| //vda1cs4850/users/username/node_modules/@types                                                      | false           |
| //vda1cs4850/users/username/folderAtRoot/node_modules/@types                                         | false           |
| //vda1cs4850/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| //vda1cs4850/user/node_modules/@types                                                                | false           |
| //vda1cs4850/user/username/node_modules/@types                                                       | true            |
| //vda1cs4850/user/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| //vda1cs4850/usr/node_modules/@types                                                                 | false           |
| //vda1cs4850/usr/username/node_modules/@types                                                        | true            |
| //vda1cs4850/usr/username/folderAtRoot/node_modules/@types                                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| //vda1cs4850/home/node_modules/@types                                                                | false           |
| //vda1cs4850/home/username/node_modules/@types                                                       | true            |
| //vda1cs4850/home/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: //vda1cs4850/folderAtRoot/folder1

Root: //vda1cs4850/folderAtRoot/folder1

| Directory                                                                                            | canWatchAtTypes |
| ---------------------------------------------------------------------------------------------------- | --------------- |
| //vda1cs4850/node_modules/@types                                                                     | false           |
| //vda1cs4850/folderAtRoot/node_modules/@types                                                        | false           |
| //vda1cs4850/folderAtRoot/folder1/node_modules/@types                                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| //vda1cs4850/users/node_modules/@types                                                               | false           |
| //vda1cs4850/users/username/node_modules/@types                                                      | false           |
| //vda1cs4850/users/username/folderAtRoot/node_modules/@types                                         | false           |
| //vda1cs4850/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| //vda1cs4850/user/node_modules/@types                                                                | false           |
| //vda1cs4850/user/username/node_modules/@types                                                       | true            |
| //vda1cs4850/user/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| //vda1cs4850/usr/node_modules/@types                                                                 | false           |
| //vda1cs4850/usr/username/node_modules/@types                                                        | true            |
| //vda1cs4850/usr/username/folderAtRoot/node_modules/@types                                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| //vda1cs4850/home/node_modules/@types                                                                | false           |
| //vda1cs4850/home/username/node_modules/@types                                                       | true            |
| //vda1cs4850/home/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: //vda1cs4850/folderAtRoot/folder1/folder2

Root: //vda1cs4850/folderAtRoot/folder1/folder2

| Directory                                                                                            | canWatchAtTypes |
| ---------------------------------------------------------------------------------------------------- | --------------- |
| //vda1cs4850/node_modules/@types                                                                     | false           |
| //vda1cs4850/folderAtRoot/node_modules/@types                                                        | false           |
| //vda1cs4850/folderAtRoot/folder1/node_modules/@types                                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| //vda1cs4850/users/node_modules/@types                                                               | false           |
| //vda1cs4850/users/username/node_modules/@types                                                      | false           |
| //vda1cs4850/users/username/folderAtRoot/node_modules/@types                                         | false           |
| //vda1cs4850/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| //vda1cs4850/user/node_modules/@types                                                                | false           |
| //vda1cs4850/user/username/node_modules/@types                                                       | true            |
| //vda1cs4850/user/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| //vda1cs4850/usr/node_modules/@types                                                                 | false           |
| //vda1cs4850/usr/username/node_modules/@types                                                        | true            |
| //vda1cs4850/usr/username/folderAtRoot/node_modules/@types                                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| //vda1cs4850/home/node_modules/@types                                                                | false           |
| //vda1cs4850/home/username/node_modules/@types                                                       | true            |
| //vda1cs4850/home/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: //vda1cs4850/folderAtRoot/folder1/folder2/folder3

Root: //vda1cs4850/folderAtRoot/folder1/folder2/folder3

| Directory                                                                                            | canWatchAtTypes |
| ---------------------------------------------------------------------------------------------------- | --------------- |
| //vda1cs4850/node_modules/@types                                                                     | false           |
| //vda1cs4850/folderAtRoot/node_modules/@types                                                        | false           |
| //vda1cs4850/folderAtRoot/folder1/node_modules/@types                                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| //vda1cs4850/users/node_modules/@types                                                               | false           |
| //vda1cs4850/users/username/node_modules/@types                                                      | false           |
| //vda1cs4850/users/username/folderAtRoot/node_modules/@types                                         | false           |
| //vda1cs4850/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| //vda1cs4850/user/node_modules/@types                                                                | false           |
| //vda1cs4850/user/username/node_modules/@types                                                       | true            |
| //vda1cs4850/user/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| //vda1cs4850/usr/node_modules/@types                                                                 | false           |
| //vda1cs4850/usr/username/node_modules/@types                                                        | true            |
| //vda1cs4850/usr/username/folderAtRoot/node_modules/@types                                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| //vda1cs4850/home/node_modules/@types                                                                | false           |
| //vda1cs4850/home/username/node_modules/@types                                                       | true            |
| //vda1cs4850/home/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4

Root: //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4

| Directory                                                                                            | canWatchAtTypes |
| ---------------------------------------------------------------------------------------------------- | --------------- |
| //vda1cs4850/node_modules/@types                                                                     | false           |
| //vda1cs4850/folderAtRoot/node_modules/@types                                                        | false           |
| //vda1cs4850/folderAtRoot/folder1/node_modules/@types                                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| //vda1cs4850/users/node_modules/@types                                                               | false           |
| //vda1cs4850/users/username/node_modules/@types                                                      | false           |
| //vda1cs4850/users/username/folderAtRoot/node_modules/@types                                         | false           |
| //vda1cs4850/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| //vda1cs4850/user/node_modules/@types                                                                | false           |
| //vda1cs4850/user/username/node_modules/@types                                                       | true            |
| //vda1cs4850/user/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| //vda1cs4850/usr/node_modules/@types                                                                 | false           |
| //vda1cs4850/usr/username/node_modules/@types                                                        | true            |
| //vda1cs4850/usr/username/folderAtRoot/node_modules/@types                                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| //vda1cs4850/home/node_modules/@types                                                                | false           |
| //vda1cs4850/home/username/node_modules/@types                                                       | true            |
| //vda1cs4850/home/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5

Root: //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5

| Directory                                                                                            | canWatchAtTypes |
| ---------------------------------------------------------------------------------------------------- | --------------- |
| //vda1cs4850/node_modules/@types                                                                     | false           |
| //vda1cs4850/folderAtRoot/node_modules/@types                                                        | false           |
| //vda1cs4850/folderAtRoot/folder1/node_modules/@types                                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| //vda1cs4850/users/node_modules/@types                                                               | false           |
| //vda1cs4850/users/username/node_modules/@types                                                      | false           |
| //vda1cs4850/users/username/folderAtRoot/node_modules/@types                                         | false           |
| //vda1cs4850/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| //vda1cs4850/user/node_modules/@types                                                                | false           |
| //vda1cs4850/user/username/node_modules/@types                                                       | true            |
| //vda1cs4850/user/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| //vda1cs4850/usr/node_modules/@types                                                                 | false           |
| //vda1cs4850/usr/username/node_modules/@types                                                        | true            |
| //vda1cs4850/usr/username/folderAtRoot/node_modules/@types                                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| //vda1cs4850/home/node_modules/@types                                                                | false           |
| //vda1cs4850/home/username/node_modules/@types                                                       | true            |
| //vda1cs4850/home/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: //vda1cs4850/users

Root: //vda1cs4850/users

| Directory                                                                                            | canWatchAtTypes |
| ---------------------------------------------------------------------------------------------------- | --------------- |
| //vda1cs4850/node_modules/@types                                                                     | false           |
| //vda1cs4850/folderAtRoot/node_modules/@types                                                        | false           |
| //vda1cs4850/folderAtRoot/folder1/node_modules/@types                                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| //vda1cs4850/users/node_modules/@types                                                               | true            |
| //vda1cs4850/users/username/node_modules/@types                                                      | false           |
| //vda1cs4850/users/username/folderAtRoot/node_modules/@types                                         | false           |
| //vda1cs4850/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| //vda1cs4850/user/node_modules/@types                                                                | false           |
| //vda1cs4850/user/username/node_modules/@types                                                       | true            |
| //vda1cs4850/user/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| //vda1cs4850/usr/node_modules/@types                                                                 | false           |
| //vda1cs4850/usr/username/node_modules/@types                                                        | true            |
| //vda1cs4850/usr/username/folderAtRoot/node_modules/@types                                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| //vda1cs4850/home/node_modules/@types                                                                | false           |
| //vda1cs4850/home/username/node_modules/@types                                                       | true            |
| //vda1cs4850/home/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: //vda1cs4850/users/username

Root: //vda1cs4850/users/username

| Directory                                                                                            | canWatchAtTypes |
| ---------------------------------------------------------------------------------------------------- | --------------- |
| //vda1cs4850/node_modules/@types                                                                     | false           |
| //vda1cs4850/folderAtRoot/node_modules/@types                                                        | false           |
| //vda1cs4850/folderAtRoot/folder1/node_modules/@types                                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| //vda1cs4850/users/node_modules/@types                                                               | false           |
| //vda1cs4850/users/username/node_modules/@types                                                      | true            |
| //vda1cs4850/users/username/folderAtRoot/node_modules/@types                                         | false           |
| //vda1cs4850/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| //vda1cs4850/user/node_modules/@types                                                                | false           |
| //vda1cs4850/user/username/node_modules/@types                                                       | true            |
| //vda1cs4850/user/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| //vda1cs4850/usr/node_modules/@types                                                                 | false           |
| //vda1cs4850/usr/username/node_modules/@types                                                        | true            |
| //vda1cs4850/usr/username/folderAtRoot/node_modules/@types                                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| //vda1cs4850/home/node_modules/@types                                                                | false           |
| //vda1cs4850/home/username/node_modules/@types                                                       | true            |
| //vda1cs4850/home/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: //vda1cs4850/users/username/folderAtRoot

Root: //vda1cs4850/users/username/folderAtRoot

| Directory                                                                                            | canWatchAtTypes |
| ---------------------------------------------------------------------------------------------------- | --------------- |
| //vda1cs4850/node_modules/@types                                                                     | false           |
| //vda1cs4850/folderAtRoot/node_modules/@types                                                        | false           |
| //vda1cs4850/folderAtRoot/folder1/node_modules/@types                                                | true            |
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
| //vda1cs4850/user/username/node_modules/@types                                                       | true            |
| //vda1cs4850/user/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| //vda1cs4850/usr/node_modules/@types                                                                 | false           |
| //vda1cs4850/usr/username/node_modules/@types                                                        | true            |
| //vda1cs4850/usr/username/folderAtRoot/node_modules/@types                                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| //vda1cs4850/home/node_modules/@types                                                                | false           |
| //vda1cs4850/home/username/node_modules/@types                                                       | true            |
| //vda1cs4850/home/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: //vda1cs4850/users/username/folderAtRoot/folder1

Root: //vda1cs4850/users/username/folderAtRoot/folder1

| Directory                                                                                            | canWatchAtTypes |
| ---------------------------------------------------------------------------------------------------- | --------------- |
| //vda1cs4850/node_modules/@types                                                                     | false           |
| //vda1cs4850/folderAtRoot/node_modules/@types                                                        | false           |
| //vda1cs4850/folderAtRoot/folder1/node_modules/@types                                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| //vda1cs4850/users/node_modules/@types                                                               | false           |
| //vda1cs4850/users/username/node_modules/@types                                                      | false           |
| //vda1cs4850/users/username/folderAtRoot/node_modules/@types                                         | false           |
| //vda1cs4850/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| //vda1cs4850/user/node_modules/@types                                                                | false           |
| //vda1cs4850/user/username/node_modules/@types                                                       | true            |
| //vda1cs4850/user/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| //vda1cs4850/usr/node_modules/@types                                                                 | false           |
| //vda1cs4850/usr/username/node_modules/@types                                                        | true            |
| //vda1cs4850/usr/username/folderAtRoot/node_modules/@types                                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| //vda1cs4850/home/node_modules/@types                                                                | false           |
| //vda1cs4850/home/username/node_modules/@types                                                       | true            |
| //vda1cs4850/home/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: //vda1cs4850/users/username/folderAtRoot/folder1/folder2

Root: //vda1cs4850/users/username/folderAtRoot/folder1/folder2

| Directory                                                                                            | canWatchAtTypes |
| ---------------------------------------------------------------------------------------------------- | --------------- |
| //vda1cs4850/node_modules/@types                                                                     | false           |
| //vda1cs4850/folderAtRoot/node_modules/@types                                                        | false           |
| //vda1cs4850/folderAtRoot/folder1/node_modules/@types                                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| //vda1cs4850/users/node_modules/@types                                                               | false           |
| //vda1cs4850/users/username/node_modules/@types                                                      | false           |
| //vda1cs4850/users/username/folderAtRoot/node_modules/@types                                         | false           |
| //vda1cs4850/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| //vda1cs4850/user/node_modules/@types                                                                | false           |
| //vda1cs4850/user/username/node_modules/@types                                                       | true            |
| //vda1cs4850/user/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| //vda1cs4850/usr/node_modules/@types                                                                 | false           |
| //vda1cs4850/usr/username/node_modules/@types                                                        | true            |
| //vda1cs4850/usr/username/folderAtRoot/node_modules/@types                                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| //vda1cs4850/home/node_modules/@types                                                                | false           |
| //vda1cs4850/home/username/node_modules/@types                                                       | true            |
| //vda1cs4850/home/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3

Root: //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3

| Directory                                                                                            | canWatchAtTypes |
| ---------------------------------------------------------------------------------------------------- | --------------- |
| //vda1cs4850/node_modules/@types                                                                     | false           |
| //vda1cs4850/folderAtRoot/node_modules/@types                                                        | false           |
| //vda1cs4850/folderAtRoot/folder1/node_modules/@types                                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| //vda1cs4850/users/node_modules/@types                                                               | false           |
| //vda1cs4850/users/username/node_modules/@types                                                      | false           |
| //vda1cs4850/users/username/folderAtRoot/node_modules/@types                                         | false           |
| //vda1cs4850/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| //vda1cs4850/user/node_modules/@types                                                                | false           |
| //vda1cs4850/user/username/node_modules/@types                                                       | true            |
| //vda1cs4850/user/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| //vda1cs4850/usr/node_modules/@types                                                                 | false           |
| //vda1cs4850/usr/username/node_modules/@types                                                        | true            |
| //vda1cs4850/usr/username/folderAtRoot/node_modules/@types                                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| //vda1cs4850/home/node_modules/@types                                                                | false           |
| //vda1cs4850/home/username/node_modules/@types                                                       | true            |
| //vda1cs4850/home/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4

Root: //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4

| Directory                                                                                            | canWatchAtTypes |
| ---------------------------------------------------------------------------------------------------- | --------------- |
| //vda1cs4850/node_modules/@types                                                                     | false           |
| //vda1cs4850/folderAtRoot/node_modules/@types                                                        | false           |
| //vda1cs4850/folderAtRoot/folder1/node_modules/@types                                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| //vda1cs4850/users/node_modules/@types                                                               | false           |
| //vda1cs4850/users/username/node_modules/@types                                                      | false           |
| //vda1cs4850/users/username/folderAtRoot/node_modules/@types                                         | false           |
| //vda1cs4850/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| //vda1cs4850/user/node_modules/@types                                                                | false           |
| //vda1cs4850/user/username/node_modules/@types                                                       | true            |
| //vda1cs4850/user/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| //vda1cs4850/usr/node_modules/@types                                                                 | false           |
| //vda1cs4850/usr/username/node_modules/@types                                                        | true            |
| //vda1cs4850/usr/username/folderAtRoot/node_modules/@types                                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| //vda1cs4850/home/node_modules/@types                                                                | false           |
| //vda1cs4850/home/username/node_modules/@types                                                       | true            |
| //vda1cs4850/home/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

Root: //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

| Directory                                                                                            | canWatchAtTypes |
| ---------------------------------------------------------------------------------------------------- | --------------- |
| //vda1cs4850/node_modules/@types                                                                     | false           |
| //vda1cs4850/folderAtRoot/node_modules/@types                                                        | false           |
| //vda1cs4850/folderAtRoot/folder1/node_modules/@types                                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| //vda1cs4850/users/node_modules/@types                                                               | false           |
| //vda1cs4850/users/username/node_modules/@types                                                      | false           |
| //vda1cs4850/users/username/folderAtRoot/node_modules/@types                                         | false           |
| //vda1cs4850/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| //vda1cs4850/user/node_modules/@types                                                                | false           |
| //vda1cs4850/user/username/node_modules/@types                                                       | true            |
| //vda1cs4850/user/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| //vda1cs4850/usr/node_modules/@types                                                                 | false           |
| //vda1cs4850/usr/username/node_modules/@types                                                        | true            |
| //vda1cs4850/usr/username/folderAtRoot/node_modules/@types                                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| //vda1cs4850/home/node_modules/@types                                                                | false           |
| //vda1cs4850/home/username/node_modules/@types                                                       | true            |
| //vda1cs4850/home/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: //vda1cs4850/user

Root: //vda1cs4850/user

| Directory                                                                                            | canWatchAtTypes |
| ---------------------------------------------------------------------------------------------------- | --------------- |
| //vda1cs4850/node_modules/@types                                                                     | false           |
| //vda1cs4850/folderAtRoot/node_modules/@types                                                        | false           |
| //vda1cs4850/folderAtRoot/folder1/node_modules/@types                                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| //vda1cs4850/users/node_modules/@types                                                               | false           |
| //vda1cs4850/users/username/node_modules/@types                                                      | false           |
| //vda1cs4850/users/username/folderAtRoot/node_modules/@types                                         | false           |
| //vda1cs4850/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| //vda1cs4850/user/node_modules/@types                                                                | true            |
| //vda1cs4850/user/username/node_modules/@types                                                       | true            |
| //vda1cs4850/user/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| //vda1cs4850/usr/node_modules/@types                                                                 | false           |
| //vda1cs4850/usr/username/node_modules/@types                                                        | true            |
| //vda1cs4850/usr/username/folderAtRoot/node_modules/@types                                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| //vda1cs4850/home/node_modules/@types                                                                | false           |
| //vda1cs4850/home/username/node_modules/@types                                                       | true            |
| //vda1cs4850/home/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: //vda1cs4850/user/username

Root: //vda1cs4850/user/username

| Directory                                                                                            | canWatchAtTypes |
| ---------------------------------------------------------------------------------------------------- | --------------- |
| //vda1cs4850/node_modules/@types                                                                     | false           |
| //vda1cs4850/folderAtRoot/node_modules/@types                                                        | false           |
| //vda1cs4850/folderAtRoot/folder1/node_modules/@types                                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| //vda1cs4850/users/node_modules/@types                                                               | false           |
| //vda1cs4850/users/username/node_modules/@types                                                      | false           |
| //vda1cs4850/users/username/folderAtRoot/node_modules/@types                                         | false           |
| //vda1cs4850/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| //vda1cs4850/user/node_modules/@types                                                                | false           |
| //vda1cs4850/user/username/node_modules/@types                                                       | true            |
| //vda1cs4850/user/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| //vda1cs4850/usr/node_modules/@types                                                                 | false           |
| //vda1cs4850/usr/username/node_modules/@types                                                        | true            |
| //vda1cs4850/usr/username/folderAtRoot/node_modules/@types                                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| //vda1cs4850/home/node_modules/@types                                                                | false           |
| //vda1cs4850/home/username/node_modules/@types                                                       | true            |
| //vda1cs4850/home/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: //vda1cs4850/user/username/folderAtRoot

Root: //vda1cs4850/user/username/folderAtRoot

| Directory                                                                                            | canWatchAtTypes |
| ---------------------------------------------------------------------------------------------------- | --------------- |
| //vda1cs4850/node_modules/@types                                                                     | false           |
| //vda1cs4850/folderAtRoot/node_modules/@types                                                        | false           |
| //vda1cs4850/folderAtRoot/folder1/node_modules/@types                                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| //vda1cs4850/users/node_modules/@types                                                               | false           |
| //vda1cs4850/users/username/node_modules/@types                                                      | false           |
| //vda1cs4850/users/username/folderAtRoot/node_modules/@types                                         | false           |
| //vda1cs4850/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| //vda1cs4850/user/node_modules/@types                                                                | false           |
| //vda1cs4850/user/username/node_modules/@types                                                       | true            |
| //vda1cs4850/user/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| //vda1cs4850/usr/node_modules/@types                                                                 | false           |
| //vda1cs4850/usr/username/node_modules/@types                                                        | true            |
| //vda1cs4850/usr/username/folderAtRoot/node_modules/@types                                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| //vda1cs4850/home/node_modules/@types                                                                | false           |
| //vda1cs4850/home/username/node_modules/@types                                                       | true            |
| //vda1cs4850/home/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: //vda1cs4850/user/username/folderAtRoot/folder1

Root: //vda1cs4850/user/username/folderAtRoot/folder1

| Directory                                                                                            | canWatchAtTypes |
| ---------------------------------------------------------------------------------------------------- | --------------- |
| //vda1cs4850/node_modules/@types                                                                     | false           |
| //vda1cs4850/folderAtRoot/node_modules/@types                                                        | false           |
| //vda1cs4850/folderAtRoot/folder1/node_modules/@types                                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| //vda1cs4850/users/node_modules/@types                                                               | false           |
| //vda1cs4850/users/username/node_modules/@types                                                      | false           |
| //vda1cs4850/users/username/folderAtRoot/node_modules/@types                                         | false           |
| //vda1cs4850/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| //vda1cs4850/user/node_modules/@types                                                                | false           |
| //vda1cs4850/user/username/node_modules/@types                                                       | true            |
| //vda1cs4850/user/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| //vda1cs4850/usr/node_modules/@types                                                                 | false           |
| //vda1cs4850/usr/username/node_modules/@types                                                        | true            |
| //vda1cs4850/usr/username/folderAtRoot/node_modules/@types                                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| //vda1cs4850/home/node_modules/@types                                                                | false           |
| //vda1cs4850/home/username/node_modules/@types                                                       | true            |
| //vda1cs4850/home/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: //vda1cs4850/user/username/folderAtRoot/folder1/folder2

Root: //vda1cs4850/user/username/folderAtRoot/folder1/folder2

| Directory                                                                                            | canWatchAtTypes |
| ---------------------------------------------------------------------------------------------------- | --------------- |
| //vda1cs4850/node_modules/@types                                                                     | false           |
| //vda1cs4850/folderAtRoot/node_modules/@types                                                        | false           |
| //vda1cs4850/folderAtRoot/folder1/node_modules/@types                                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| //vda1cs4850/users/node_modules/@types                                                               | false           |
| //vda1cs4850/users/username/node_modules/@types                                                      | false           |
| //vda1cs4850/users/username/folderAtRoot/node_modules/@types                                         | false           |
| //vda1cs4850/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| //vda1cs4850/user/node_modules/@types                                                                | false           |
| //vda1cs4850/user/username/node_modules/@types                                                       | true            |
| //vda1cs4850/user/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| //vda1cs4850/usr/node_modules/@types                                                                 | false           |
| //vda1cs4850/usr/username/node_modules/@types                                                        | true            |
| //vda1cs4850/usr/username/folderAtRoot/node_modules/@types                                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| //vda1cs4850/home/node_modules/@types                                                                | false           |
| //vda1cs4850/home/username/node_modules/@types                                                       | true            |
| //vda1cs4850/home/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3

Root: //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3

| Directory                                                                                            | canWatchAtTypes |
| ---------------------------------------------------------------------------------------------------- | --------------- |
| //vda1cs4850/node_modules/@types                                                                     | false           |
| //vda1cs4850/folderAtRoot/node_modules/@types                                                        | false           |
| //vda1cs4850/folderAtRoot/folder1/node_modules/@types                                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| //vda1cs4850/users/node_modules/@types                                                               | false           |
| //vda1cs4850/users/username/node_modules/@types                                                      | false           |
| //vda1cs4850/users/username/folderAtRoot/node_modules/@types                                         | false           |
| //vda1cs4850/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| //vda1cs4850/user/node_modules/@types                                                                | false           |
| //vda1cs4850/user/username/node_modules/@types                                                       | true            |
| //vda1cs4850/user/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| //vda1cs4850/usr/node_modules/@types                                                                 | false           |
| //vda1cs4850/usr/username/node_modules/@types                                                        | true            |
| //vda1cs4850/usr/username/folderAtRoot/node_modules/@types                                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| //vda1cs4850/home/node_modules/@types                                                                | false           |
| //vda1cs4850/home/username/node_modules/@types                                                       | true            |
| //vda1cs4850/home/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4

Root: //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4

| Directory                                                                                            | canWatchAtTypes |
| ---------------------------------------------------------------------------------------------------- | --------------- |
| //vda1cs4850/node_modules/@types                                                                     | false           |
| //vda1cs4850/folderAtRoot/node_modules/@types                                                        | false           |
| //vda1cs4850/folderAtRoot/folder1/node_modules/@types                                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| //vda1cs4850/users/node_modules/@types                                                               | false           |
| //vda1cs4850/users/username/node_modules/@types                                                      | false           |
| //vda1cs4850/users/username/folderAtRoot/node_modules/@types                                         | false           |
| //vda1cs4850/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| //vda1cs4850/user/node_modules/@types                                                                | false           |
| //vda1cs4850/user/username/node_modules/@types                                                       | true            |
| //vda1cs4850/user/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| //vda1cs4850/usr/node_modules/@types                                                                 | false           |
| //vda1cs4850/usr/username/node_modules/@types                                                        | true            |
| //vda1cs4850/usr/username/folderAtRoot/node_modules/@types                                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| //vda1cs4850/home/node_modules/@types                                                                | false           |
| //vda1cs4850/home/username/node_modules/@types                                                       | true            |
| //vda1cs4850/home/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

Root: //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

| Directory                                                                                            | canWatchAtTypes |
| ---------------------------------------------------------------------------------------------------- | --------------- |
| //vda1cs4850/node_modules/@types                                                                     | false           |
| //vda1cs4850/folderAtRoot/node_modules/@types                                                        | false           |
| //vda1cs4850/folderAtRoot/folder1/node_modules/@types                                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| //vda1cs4850/users/node_modules/@types                                                               | false           |
| //vda1cs4850/users/username/node_modules/@types                                                      | false           |
| //vda1cs4850/users/username/folderAtRoot/node_modules/@types                                         | false           |
| //vda1cs4850/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| //vda1cs4850/user/node_modules/@types                                                                | false           |
| //vda1cs4850/user/username/node_modules/@types                                                       | true            |
| //vda1cs4850/user/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| //vda1cs4850/usr/node_modules/@types                                                                 | false           |
| //vda1cs4850/usr/username/node_modules/@types                                                        | true            |
| //vda1cs4850/usr/username/folderAtRoot/node_modules/@types                                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| //vda1cs4850/home/node_modules/@types                                                                | false           |
| //vda1cs4850/home/username/node_modules/@types                                                       | true            |
| //vda1cs4850/home/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: //vda1cs4850/usr

Root: //vda1cs4850/usr

| Directory                                                                                            | canWatchAtTypes |
| ---------------------------------------------------------------------------------------------------- | --------------- |
| //vda1cs4850/node_modules/@types                                                                     | false           |
| //vda1cs4850/folderAtRoot/node_modules/@types                                                        | false           |
| //vda1cs4850/folderAtRoot/folder1/node_modules/@types                                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| //vda1cs4850/users/node_modules/@types                                                               | false           |
| //vda1cs4850/users/username/node_modules/@types                                                      | false           |
| //vda1cs4850/users/username/folderAtRoot/node_modules/@types                                         | false           |
| //vda1cs4850/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| //vda1cs4850/user/node_modules/@types                                                                | false           |
| //vda1cs4850/user/username/node_modules/@types                                                       | true            |
| //vda1cs4850/user/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| //vda1cs4850/usr/node_modules/@types                                                                 | true            |
| //vda1cs4850/usr/username/node_modules/@types                                                        | true            |
| //vda1cs4850/usr/username/folderAtRoot/node_modules/@types                                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| //vda1cs4850/home/node_modules/@types                                                                | false           |
| //vda1cs4850/home/username/node_modules/@types                                                       | true            |
| //vda1cs4850/home/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: //vda1cs4850/usr/username

Root: //vda1cs4850/usr/username

| Directory                                                                                            | canWatchAtTypes |
| ---------------------------------------------------------------------------------------------------- | --------------- |
| //vda1cs4850/node_modules/@types                                                                     | false           |
| //vda1cs4850/folderAtRoot/node_modules/@types                                                        | false           |
| //vda1cs4850/folderAtRoot/folder1/node_modules/@types                                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| //vda1cs4850/users/node_modules/@types                                                               | false           |
| //vda1cs4850/users/username/node_modules/@types                                                      | false           |
| //vda1cs4850/users/username/folderAtRoot/node_modules/@types                                         | false           |
| //vda1cs4850/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| //vda1cs4850/user/node_modules/@types                                                                | false           |
| //vda1cs4850/user/username/node_modules/@types                                                       | true            |
| //vda1cs4850/user/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| //vda1cs4850/usr/node_modules/@types                                                                 | false           |
| //vda1cs4850/usr/username/node_modules/@types                                                        | true            |
| //vda1cs4850/usr/username/folderAtRoot/node_modules/@types                                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| //vda1cs4850/home/node_modules/@types                                                                | false           |
| //vda1cs4850/home/username/node_modules/@types                                                       | true            |
| //vda1cs4850/home/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: //vda1cs4850/usr/username/folderAtRoot

Root: //vda1cs4850/usr/username/folderAtRoot

| Directory                                                                                            | canWatchAtTypes |
| ---------------------------------------------------------------------------------------------------- | --------------- |
| //vda1cs4850/node_modules/@types                                                                     | false           |
| //vda1cs4850/folderAtRoot/node_modules/@types                                                        | false           |
| //vda1cs4850/folderAtRoot/folder1/node_modules/@types                                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| //vda1cs4850/users/node_modules/@types                                                               | false           |
| //vda1cs4850/users/username/node_modules/@types                                                      | false           |
| //vda1cs4850/users/username/folderAtRoot/node_modules/@types                                         | false           |
| //vda1cs4850/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| //vda1cs4850/user/node_modules/@types                                                                | false           |
| //vda1cs4850/user/username/node_modules/@types                                                       | true            |
| //vda1cs4850/user/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| //vda1cs4850/usr/node_modules/@types                                                                 | false           |
| //vda1cs4850/usr/username/node_modules/@types                                                        | true            |
| //vda1cs4850/usr/username/folderAtRoot/node_modules/@types                                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| //vda1cs4850/home/node_modules/@types                                                                | false           |
| //vda1cs4850/home/username/node_modules/@types                                                       | true            |
| //vda1cs4850/home/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: //vda1cs4850/usr/username/folderAtRoot/folder1

Root: //vda1cs4850/usr/username/folderAtRoot/folder1

| Directory                                                                                            | canWatchAtTypes |
| ---------------------------------------------------------------------------------------------------- | --------------- |
| //vda1cs4850/node_modules/@types                                                                     | false           |
| //vda1cs4850/folderAtRoot/node_modules/@types                                                        | false           |
| //vda1cs4850/folderAtRoot/folder1/node_modules/@types                                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| //vda1cs4850/users/node_modules/@types                                                               | false           |
| //vda1cs4850/users/username/node_modules/@types                                                      | false           |
| //vda1cs4850/users/username/folderAtRoot/node_modules/@types                                         | false           |
| //vda1cs4850/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| //vda1cs4850/user/node_modules/@types                                                                | false           |
| //vda1cs4850/user/username/node_modules/@types                                                       | true            |
| //vda1cs4850/user/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| //vda1cs4850/usr/node_modules/@types                                                                 | false           |
| //vda1cs4850/usr/username/node_modules/@types                                                        | true            |
| //vda1cs4850/usr/username/folderAtRoot/node_modules/@types                                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| //vda1cs4850/home/node_modules/@types                                                                | false           |
| //vda1cs4850/home/username/node_modules/@types                                                       | true            |
| //vda1cs4850/home/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: //vda1cs4850/usr/username/folderAtRoot/folder1/folder2

Root: //vda1cs4850/usr/username/folderAtRoot/folder1/folder2

| Directory                                                                                            | canWatchAtTypes |
| ---------------------------------------------------------------------------------------------------- | --------------- |
| //vda1cs4850/node_modules/@types                                                                     | false           |
| //vda1cs4850/folderAtRoot/node_modules/@types                                                        | false           |
| //vda1cs4850/folderAtRoot/folder1/node_modules/@types                                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| //vda1cs4850/users/node_modules/@types                                                               | false           |
| //vda1cs4850/users/username/node_modules/@types                                                      | false           |
| //vda1cs4850/users/username/folderAtRoot/node_modules/@types                                         | false           |
| //vda1cs4850/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| //vda1cs4850/user/node_modules/@types                                                                | false           |
| //vda1cs4850/user/username/node_modules/@types                                                       | true            |
| //vda1cs4850/user/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| //vda1cs4850/usr/node_modules/@types                                                                 | false           |
| //vda1cs4850/usr/username/node_modules/@types                                                        | true            |
| //vda1cs4850/usr/username/folderAtRoot/node_modules/@types                                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| //vda1cs4850/home/node_modules/@types                                                                | false           |
| //vda1cs4850/home/username/node_modules/@types                                                       | true            |
| //vda1cs4850/home/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3

Root: //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3

| Directory                                                                                            | canWatchAtTypes |
| ---------------------------------------------------------------------------------------------------- | --------------- |
| //vda1cs4850/node_modules/@types                                                                     | false           |
| //vda1cs4850/folderAtRoot/node_modules/@types                                                        | false           |
| //vda1cs4850/folderAtRoot/folder1/node_modules/@types                                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| //vda1cs4850/users/node_modules/@types                                                               | false           |
| //vda1cs4850/users/username/node_modules/@types                                                      | false           |
| //vda1cs4850/users/username/folderAtRoot/node_modules/@types                                         | false           |
| //vda1cs4850/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| //vda1cs4850/user/node_modules/@types                                                                | false           |
| //vda1cs4850/user/username/node_modules/@types                                                       | true            |
| //vda1cs4850/user/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| //vda1cs4850/usr/node_modules/@types                                                                 | false           |
| //vda1cs4850/usr/username/node_modules/@types                                                        | true            |
| //vda1cs4850/usr/username/folderAtRoot/node_modules/@types                                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| //vda1cs4850/home/node_modules/@types                                                                | false           |
| //vda1cs4850/home/username/node_modules/@types                                                       | true            |
| //vda1cs4850/home/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4

Root: //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4

| Directory                                                                                            | canWatchAtTypes |
| ---------------------------------------------------------------------------------------------------- | --------------- |
| //vda1cs4850/node_modules/@types                                                                     | false           |
| //vda1cs4850/folderAtRoot/node_modules/@types                                                        | false           |
| //vda1cs4850/folderAtRoot/folder1/node_modules/@types                                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| //vda1cs4850/users/node_modules/@types                                                               | false           |
| //vda1cs4850/users/username/node_modules/@types                                                      | false           |
| //vda1cs4850/users/username/folderAtRoot/node_modules/@types                                         | false           |
| //vda1cs4850/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| //vda1cs4850/user/node_modules/@types                                                                | false           |
| //vda1cs4850/user/username/node_modules/@types                                                       | true            |
| //vda1cs4850/user/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| //vda1cs4850/usr/node_modules/@types                                                                 | false           |
| //vda1cs4850/usr/username/node_modules/@types                                                        | true            |
| //vda1cs4850/usr/username/folderAtRoot/node_modules/@types                                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| //vda1cs4850/home/node_modules/@types                                                                | false           |
| //vda1cs4850/home/username/node_modules/@types                                                       | true            |
| //vda1cs4850/home/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

Root: //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

| Directory                                                                                            | canWatchAtTypes |
| ---------------------------------------------------------------------------------------------------- | --------------- |
| //vda1cs4850/node_modules/@types                                                                     | false           |
| //vda1cs4850/folderAtRoot/node_modules/@types                                                        | false           |
| //vda1cs4850/folderAtRoot/folder1/node_modules/@types                                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| //vda1cs4850/users/node_modules/@types                                                               | false           |
| //vda1cs4850/users/username/node_modules/@types                                                      | false           |
| //vda1cs4850/users/username/folderAtRoot/node_modules/@types                                         | false           |
| //vda1cs4850/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| //vda1cs4850/user/node_modules/@types                                                                | false           |
| //vda1cs4850/user/username/node_modules/@types                                                       | true            |
| //vda1cs4850/user/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| //vda1cs4850/usr/node_modules/@types                                                                 | false           |
| //vda1cs4850/usr/username/node_modules/@types                                                        | true            |
| //vda1cs4850/usr/username/folderAtRoot/node_modules/@types                                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| //vda1cs4850/home/node_modules/@types                                                                | false           |
| //vda1cs4850/home/username/node_modules/@types                                                       | true            |
| //vda1cs4850/home/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: //vda1cs4850/home

Root: //vda1cs4850/home

| Directory                                                                                            | canWatchAtTypes |
| ---------------------------------------------------------------------------------------------------- | --------------- |
| //vda1cs4850/node_modules/@types                                                                     | false           |
| //vda1cs4850/folderAtRoot/node_modules/@types                                                        | false           |
| //vda1cs4850/folderAtRoot/folder1/node_modules/@types                                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| //vda1cs4850/users/node_modules/@types                                                               | false           |
| //vda1cs4850/users/username/node_modules/@types                                                      | false           |
| //vda1cs4850/users/username/folderAtRoot/node_modules/@types                                         | false           |
| //vda1cs4850/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| //vda1cs4850/user/node_modules/@types                                                                | false           |
| //vda1cs4850/user/username/node_modules/@types                                                       | true            |
| //vda1cs4850/user/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| //vda1cs4850/usr/node_modules/@types                                                                 | false           |
| //vda1cs4850/usr/username/node_modules/@types                                                        | true            |
| //vda1cs4850/usr/username/folderAtRoot/node_modules/@types                                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| //vda1cs4850/home/node_modules/@types                                                                | true            |
| //vda1cs4850/home/username/node_modules/@types                                                       | true            |
| //vda1cs4850/home/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: //vda1cs4850/home/username

Root: //vda1cs4850/home/username

| Directory                                                                                            | canWatchAtTypes |
| ---------------------------------------------------------------------------------------------------- | --------------- |
| //vda1cs4850/node_modules/@types                                                                     | false           |
| //vda1cs4850/folderAtRoot/node_modules/@types                                                        | false           |
| //vda1cs4850/folderAtRoot/folder1/node_modules/@types                                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| //vda1cs4850/users/node_modules/@types                                                               | false           |
| //vda1cs4850/users/username/node_modules/@types                                                      | false           |
| //vda1cs4850/users/username/folderAtRoot/node_modules/@types                                         | false           |
| //vda1cs4850/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| //vda1cs4850/user/node_modules/@types                                                                | false           |
| //vda1cs4850/user/username/node_modules/@types                                                       | true            |
| //vda1cs4850/user/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| //vda1cs4850/usr/node_modules/@types                                                                 | false           |
| //vda1cs4850/usr/username/node_modules/@types                                                        | true            |
| //vda1cs4850/usr/username/folderAtRoot/node_modules/@types                                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| //vda1cs4850/home/node_modules/@types                                                                | false           |
| //vda1cs4850/home/username/node_modules/@types                                                       | true            |
| //vda1cs4850/home/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: //vda1cs4850/home/username/folderAtRoot

Root: //vda1cs4850/home/username/folderAtRoot

| Directory                                                                                            | canWatchAtTypes |
| ---------------------------------------------------------------------------------------------------- | --------------- |
| //vda1cs4850/node_modules/@types                                                                     | false           |
| //vda1cs4850/folderAtRoot/node_modules/@types                                                        | false           |
| //vda1cs4850/folderAtRoot/folder1/node_modules/@types                                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| //vda1cs4850/users/node_modules/@types                                                               | false           |
| //vda1cs4850/users/username/node_modules/@types                                                      | false           |
| //vda1cs4850/users/username/folderAtRoot/node_modules/@types                                         | false           |
| //vda1cs4850/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| //vda1cs4850/user/node_modules/@types                                                                | false           |
| //vda1cs4850/user/username/node_modules/@types                                                       | true            |
| //vda1cs4850/user/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| //vda1cs4850/usr/node_modules/@types                                                                 | false           |
| //vda1cs4850/usr/username/node_modules/@types                                                        | true            |
| //vda1cs4850/usr/username/folderAtRoot/node_modules/@types                                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| //vda1cs4850/home/node_modules/@types                                                                | false           |
| //vda1cs4850/home/username/node_modules/@types                                                       | true            |
| //vda1cs4850/home/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: //vda1cs4850/home/username/folderAtRoot/folder1

Root: //vda1cs4850/home/username/folderAtRoot/folder1

| Directory                                                                                            | canWatchAtTypes |
| ---------------------------------------------------------------------------------------------------- | --------------- |
| //vda1cs4850/node_modules/@types                                                                     | false           |
| //vda1cs4850/folderAtRoot/node_modules/@types                                                        | false           |
| //vda1cs4850/folderAtRoot/folder1/node_modules/@types                                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| //vda1cs4850/users/node_modules/@types                                                               | false           |
| //vda1cs4850/users/username/node_modules/@types                                                      | false           |
| //vda1cs4850/users/username/folderAtRoot/node_modules/@types                                         | false           |
| //vda1cs4850/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| //vda1cs4850/user/node_modules/@types                                                                | false           |
| //vda1cs4850/user/username/node_modules/@types                                                       | true            |
| //vda1cs4850/user/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| //vda1cs4850/usr/node_modules/@types                                                                 | false           |
| //vda1cs4850/usr/username/node_modules/@types                                                        | true            |
| //vda1cs4850/usr/username/folderAtRoot/node_modules/@types                                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| //vda1cs4850/home/node_modules/@types                                                                | false           |
| //vda1cs4850/home/username/node_modules/@types                                                       | true            |
| //vda1cs4850/home/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: //vda1cs4850/home/username/folderAtRoot/folder1/folder2

Root: //vda1cs4850/home/username/folderAtRoot/folder1/folder2

| Directory                                                                                            | canWatchAtTypes |
| ---------------------------------------------------------------------------------------------------- | --------------- |
| //vda1cs4850/node_modules/@types                                                                     | false           |
| //vda1cs4850/folderAtRoot/node_modules/@types                                                        | false           |
| //vda1cs4850/folderAtRoot/folder1/node_modules/@types                                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| //vda1cs4850/users/node_modules/@types                                                               | false           |
| //vda1cs4850/users/username/node_modules/@types                                                      | false           |
| //vda1cs4850/users/username/folderAtRoot/node_modules/@types                                         | false           |
| //vda1cs4850/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| //vda1cs4850/user/node_modules/@types                                                                | false           |
| //vda1cs4850/user/username/node_modules/@types                                                       | true            |
| //vda1cs4850/user/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| //vda1cs4850/usr/node_modules/@types                                                                 | false           |
| //vda1cs4850/usr/username/node_modules/@types                                                        | true            |
| //vda1cs4850/usr/username/folderAtRoot/node_modules/@types                                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| //vda1cs4850/home/node_modules/@types                                                                | false           |
| //vda1cs4850/home/username/node_modules/@types                                                       | true            |
| //vda1cs4850/home/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3

Root: //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3

| Directory                                                                                            | canWatchAtTypes |
| ---------------------------------------------------------------------------------------------------- | --------------- |
| //vda1cs4850/node_modules/@types                                                                     | false           |
| //vda1cs4850/folderAtRoot/node_modules/@types                                                        | false           |
| //vda1cs4850/folderAtRoot/folder1/node_modules/@types                                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| //vda1cs4850/users/node_modules/@types                                                               | false           |
| //vda1cs4850/users/username/node_modules/@types                                                      | false           |
| //vda1cs4850/users/username/folderAtRoot/node_modules/@types                                         | false           |
| //vda1cs4850/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| //vda1cs4850/user/node_modules/@types                                                                | false           |
| //vda1cs4850/user/username/node_modules/@types                                                       | true            |
| //vda1cs4850/user/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| //vda1cs4850/usr/node_modules/@types                                                                 | false           |
| //vda1cs4850/usr/username/node_modules/@types                                                        | true            |
| //vda1cs4850/usr/username/folderAtRoot/node_modules/@types                                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| //vda1cs4850/home/node_modules/@types                                                                | false           |
| //vda1cs4850/home/username/node_modules/@types                                                       | true            |
| //vda1cs4850/home/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4

Root: //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4

| Directory                                                                                            | canWatchAtTypes |
| ---------------------------------------------------------------------------------------------------- | --------------- |
| //vda1cs4850/node_modules/@types                                                                     | false           |
| //vda1cs4850/folderAtRoot/node_modules/@types                                                        | false           |
| //vda1cs4850/folderAtRoot/folder1/node_modules/@types                                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| //vda1cs4850/users/node_modules/@types                                                               | false           |
| //vda1cs4850/users/username/node_modules/@types                                                      | false           |
| //vda1cs4850/users/username/folderAtRoot/node_modules/@types                                         | false           |
| //vda1cs4850/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| //vda1cs4850/user/node_modules/@types                                                                | false           |
| //vda1cs4850/user/username/node_modules/@types                                                       | true            |
| //vda1cs4850/user/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| //vda1cs4850/usr/node_modules/@types                                                                 | false           |
| //vda1cs4850/usr/username/node_modules/@types                                                        | true            |
| //vda1cs4850/usr/username/folderAtRoot/node_modules/@types                                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| //vda1cs4850/home/node_modules/@types                                                                | false           |
| //vda1cs4850/home/username/node_modules/@types                                                       | true            |
| //vda1cs4850/home/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

Root: //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

| Directory                                                                                            | canWatchAtTypes |
| ---------------------------------------------------------------------------------------------------- | --------------- |
| //vda1cs4850/node_modules/@types                                                                     | false           |
| //vda1cs4850/folderAtRoot/node_modules/@types                                                        | false           |
| //vda1cs4850/folderAtRoot/folder1/node_modules/@types                                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| //vda1cs4850/users/node_modules/@types                                                               | false           |
| //vda1cs4850/users/username/node_modules/@types                                                      | false           |
| //vda1cs4850/users/username/folderAtRoot/node_modules/@types                                         | false           |
| //vda1cs4850/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| //vda1cs4850/user/node_modules/@types                                                                | false           |
| //vda1cs4850/user/username/node_modules/@types                                                       | true            |
| //vda1cs4850/user/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| //vda1cs4850/usr/node_modules/@types                                                                 | false           |
| //vda1cs4850/usr/username/node_modules/@types                                                        | true            |
| //vda1cs4850/usr/username/folderAtRoot/node_modules/@types                                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| //vda1cs4850/home/node_modules/@types                                                                | false           |
| //vda1cs4850/home/username/node_modules/@types                                                       | true            |
| //vda1cs4850/home/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: undefined

Root: undefined

| Directory                                                                                            | canWatchAtTypes |
| ---------------------------------------------------------------------------------------------------- | --------------- |
| //vda1cs4850/node_modules/@types                                                                     | false           |
| //vda1cs4850/folderAtRoot/node_modules/@types                                                        | false           |
| //vda1cs4850/folderAtRoot/folder1/node_modules/@types                                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| //vda1cs4850/users/node_modules/@types                                                               | false           |
| //vda1cs4850/users/username/node_modules/@types                                                      | false           |
| //vda1cs4850/users/username/folderAtRoot/node_modules/@types                                         | false           |
| //vda1cs4850/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| //vda1cs4850/user/node_modules/@types                                                                | false           |
| //vda1cs4850/user/username/node_modules/@types                                                       | true            |
| //vda1cs4850/user/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |
| //vda1cs4850/usr/node_modules/@types                                                                 | false           |
| //vda1cs4850/usr/username/node_modules/@types                                                        | true            |
| //vda1cs4850/usr/username/folderAtRoot/node_modules/@types                                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/node_modules/@types                                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/node_modules/@types                           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                   | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types           | true            |
| //vda1cs4850/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types   | true            |
| //vda1cs4850/home/node_modules/@types                                                                | false           |
| //vda1cs4850/home/username/node_modules/@types                                                       | true            |
| //vda1cs4850/home/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

