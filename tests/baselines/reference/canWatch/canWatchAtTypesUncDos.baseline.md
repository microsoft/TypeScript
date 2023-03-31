# canWatchAtTypes

Determines if given node_modules/@types can be watched.
These are the typeRoots calculated because user didnt specify typeRoots in compierOptions

## Testing for UncDos root: //vda1cs4850/c$

## RootDirForResolution: //vda1cs4850/c$

Root: //vda1cs4850/c$

| Directory                                                                                               | canWatchAtTypes |
| ------------------------------------------------------------------------------------------------------- | --------------- |
| //vda1cs4850/c$/node_modules/@types                                                                     | true            |
| //vda1cs4850/c$/folderAtRoot/node_modules/@types                                                        | false           |
| //vda1cs4850/c$/folderAtRoot/folder1/node_modules/@types                                                | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| //vda1cs4850/c$/users/node_modules/@types                                                               | false           |
| //vda1cs4850/c$/users/username/node_modules/@types                                                      | false           |
| //vda1cs4850/c$/users/username/folderAtRoot/node_modules/@types                                         | false           |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| //vda1cs4850/c$/user/node_modules/@types                                                                | false           |
| //vda1cs4850/c$/user/username/node_modules/@types                                                       | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: //vda1cs4850/c$/folderAtRoot

Root: //vda1cs4850/c$/folderAtRoot

| Directory                                                                                               | canWatchAtTypes |
| ------------------------------------------------------------------------------------------------------- | --------------- |
| //vda1cs4850/c$/node_modules/@types                                                                     | false           |
| //vda1cs4850/c$/folderAtRoot/node_modules/@types                                                        | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/node_modules/@types                                                | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| //vda1cs4850/c$/users/node_modules/@types                                                               | false           |
| //vda1cs4850/c$/users/username/node_modules/@types                                                      | false           |
| //vda1cs4850/c$/users/username/folderAtRoot/node_modules/@types                                         | false           |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| //vda1cs4850/c$/user/node_modules/@types                                                                | false           |
| //vda1cs4850/c$/user/username/node_modules/@types                                                       | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: //vda1cs4850/c$/folderAtRoot/folder1

Root: //vda1cs4850/c$/folderAtRoot/folder1

| Directory                                                                                               | canWatchAtTypes |
| ------------------------------------------------------------------------------------------------------- | --------------- |
| //vda1cs4850/c$/node_modules/@types                                                                     | false           |
| //vda1cs4850/c$/folderAtRoot/node_modules/@types                                                        | false           |
| //vda1cs4850/c$/folderAtRoot/folder1/node_modules/@types                                                | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| //vda1cs4850/c$/users/node_modules/@types                                                               | false           |
| //vda1cs4850/c$/users/username/node_modules/@types                                                      | false           |
| //vda1cs4850/c$/users/username/folderAtRoot/node_modules/@types                                         | false           |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| //vda1cs4850/c$/user/node_modules/@types                                                                | false           |
| //vda1cs4850/c$/user/username/node_modules/@types                                                       | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: //vda1cs4850/c$/folderAtRoot/folder1/folder2

Root: //vda1cs4850/c$/folderAtRoot/folder1/folder2

| Directory                                                                                               | canWatchAtTypes |
| ------------------------------------------------------------------------------------------------------- | --------------- |
| //vda1cs4850/c$/node_modules/@types                                                                     | false           |
| //vda1cs4850/c$/folderAtRoot/node_modules/@types                                                        | false           |
| //vda1cs4850/c$/folderAtRoot/folder1/node_modules/@types                                                | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| //vda1cs4850/c$/users/node_modules/@types                                                               | false           |
| //vda1cs4850/c$/users/username/node_modules/@types                                                      | false           |
| //vda1cs4850/c$/users/username/folderAtRoot/node_modules/@types                                         | false           |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| //vda1cs4850/c$/user/node_modules/@types                                                                | false           |
| //vda1cs4850/c$/user/username/node_modules/@types                                                       | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3

Root: //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3

| Directory                                                                                               | canWatchAtTypes |
| ------------------------------------------------------------------------------------------------------- | --------------- |
| //vda1cs4850/c$/node_modules/@types                                                                     | false           |
| //vda1cs4850/c$/folderAtRoot/node_modules/@types                                                        | false           |
| //vda1cs4850/c$/folderAtRoot/folder1/node_modules/@types                                                | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| //vda1cs4850/c$/users/node_modules/@types                                                               | false           |
| //vda1cs4850/c$/users/username/node_modules/@types                                                      | false           |
| //vda1cs4850/c$/users/username/folderAtRoot/node_modules/@types                                         | false           |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| //vda1cs4850/c$/user/node_modules/@types                                                                | false           |
| //vda1cs4850/c$/user/username/node_modules/@types                                                       | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4

Root: //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4

| Directory                                                                                               | canWatchAtTypes |
| ------------------------------------------------------------------------------------------------------- | --------------- |
| //vda1cs4850/c$/node_modules/@types                                                                     | false           |
| //vda1cs4850/c$/folderAtRoot/node_modules/@types                                                        | false           |
| //vda1cs4850/c$/folderAtRoot/folder1/node_modules/@types                                                | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| //vda1cs4850/c$/users/node_modules/@types                                                               | false           |
| //vda1cs4850/c$/users/username/node_modules/@types                                                      | false           |
| //vda1cs4850/c$/users/username/folderAtRoot/node_modules/@types                                         | false           |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| //vda1cs4850/c$/user/node_modules/@types                                                                | false           |
| //vda1cs4850/c$/user/username/node_modules/@types                                                       | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5

Root: //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5

| Directory                                                                                               | canWatchAtTypes |
| ------------------------------------------------------------------------------------------------------- | --------------- |
| //vda1cs4850/c$/node_modules/@types                                                                     | false           |
| //vda1cs4850/c$/folderAtRoot/node_modules/@types                                                        | false           |
| //vda1cs4850/c$/folderAtRoot/folder1/node_modules/@types                                                | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| //vda1cs4850/c$/users/node_modules/@types                                                               | false           |
| //vda1cs4850/c$/users/username/node_modules/@types                                                      | false           |
| //vda1cs4850/c$/users/username/folderAtRoot/node_modules/@types                                         | false           |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| //vda1cs4850/c$/user/node_modules/@types                                                                | false           |
| //vda1cs4850/c$/user/username/node_modules/@types                                                       | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: //vda1cs4850/c$/users

Root: //vda1cs4850/c$/users

| Directory                                                                                               | canWatchAtTypes |
| ------------------------------------------------------------------------------------------------------- | --------------- |
| //vda1cs4850/c$/node_modules/@types                                                                     | false           |
| //vda1cs4850/c$/folderAtRoot/node_modules/@types                                                        | false           |
| //vda1cs4850/c$/folderAtRoot/folder1/node_modules/@types                                                | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| //vda1cs4850/c$/users/node_modules/@types                                                               | true            |
| //vda1cs4850/c$/users/username/node_modules/@types                                                      | false           |
| //vda1cs4850/c$/users/username/folderAtRoot/node_modules/@types                                         | false           |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| //vda1cs4850/c$/user/node_modules/@types                                                                | false           |
| //vda1cs4850/c$/user/username/node_modules/@types                                                       | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: //vda1cs4850/c$/users/username

Root: //vda1cs4850/c$/users/username

| Directory                                                                                               | canWatchAtTypes |
| ------------------------------------------------------------------------------------------------------- | --------------- |
| //vda1cs4850/c$/node_modules/@types                                                                     | false           |
| //vda1cs4850/c$/folderAtRoot/node_modules/@types                                                        | false           |
| //vda1cs4850/c$/folderAtRoot/folder1/node_modules/@types                                                | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| //vda1cs4850/c$/users/node_modules/@types                                                               | false           |
| //vda1cs4850/c$/users/username/node_modules/@types                                                      | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/node_modules/@types                                         | false           |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| //vda1cs4850/c$/user/node_modules/@types                                                                | false           |
| //vda1cs4850/c$/user/username/node_modules/@types                                                       | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: //vda1cs4850/c$/users/username/folderAtRoot

Root: //vda1cs4850/c$/users/username/folderAtRoot

| Directory                                                                                               | canWatchAtTypes |
| ------------------------------------------------------------------------------------------------------- | --------------- |
| //vda1cs4850/c$/node_modules/@types                                                                     | false           |
| //vda1cs4850/c$/folderAtRoot/node_modules/@types                                                        | false           |
| //vda1cs4850/c$/folderAtRoot/folder1/node_modules/@types                                                | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| //vda1cs4850/c$/users/node_modules/@types                                                               | false           |
| //vda1cs4850/c$/users/username/node_modules/@types                                                      | false           |
| //vda1cs4850/c$/users/username/folderAtRoot/node_modules/@types                                         | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| //vda1cs4850/c$/user/node_modules/@types                                                                | false           |
| //vda1cs4850/c$/user/username/node_modules/@types                                                       | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: //vda1cs4850/c$/users/username/folderAtRoot/folder1

Root: //vda1cs4850/c$/users/username/folderAtRoot/folder1

| Directory                                                                                               | canWatchAtTypes |
| ------------------------------------------------------------------------------------------------------- | --------------- |
| //vda1cs4850/c$/node_modules/@types                                                                     | false           |
| //vda1cs4850/c$/folderAtRoot/node_modules/@types                                                        | false           |
| //vda1cs4850/c$/folderAtRoot/folder1/node_modules/@types                                                | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| //vda1cs4850/c$/users/node_modules/@types                                                               | false           |
| //vda1cs4850/c$/users/username/node_modules/@types                                                      | false           |
| //vda1cs4850/c$/users/username/folderAtRoot/node_modules/@types                                         | false           |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| //vda1cs4850/c$/user/node_modules/@types                                                                | false           |
| //vda1cs4850/c$/user/username/node_modules/@types                                                       | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2

Root: //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2

| Directory                                                                                               | canWatchAtTypes |
| ------------------------------------------------------------------------------------------------------- | --------------- |
| //vda1cs4850/c$/node_modules/@types                                                                     | false           |
| //vda1cs4850/c$/folderAtRoot/node_modules/@types                                                        | false           |
| //vda1cs4850/c$/folderAtRoot/folder1/node_modules/@types                                                | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| //vda1cs4850/c$/users/node_modules/@types                                                               | false           |
| //vda1cs4850/c$/users/username/node_modules/@types                                                      | false           |
| //vda1cs4850/c$/users/username/folderAtRoot/node_modules/@types                                         | false           |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| //vda1cs4850/c$/user/node_modules/@types                                                                | false           |
| //vda1cs4850/c$/user/username/node_modules/@types                                                       | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3

Root: //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3

| Directory                                                                                               | canWatchAtTypes |
| ------------------------------------------------------------------------------------------------------- | --------------- |
| //vda1cs4850/c$/node_modules/@types                                                                     | false           |
| //vda1cs4850/c$/folderAtRoot/node_modules/@types                                                        | false           |
| //vda1cs4850/c$/folderAtRoot/folder1/node_modules/@types                                                | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| //vda1cs4850/c$/users/node_modules/@types                                                               | false           |
| //vda1cs4850/c$/users/username/node_modules/@types                                                      | false           |
| //vda1cs4850/c$/users/username/folderAtRoot/node_modules/@types                                         | false           |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| //vda1cs4850/c$/user/node_modules/@types                                                                | false           |
| //vda1cs4850/c$/user/username/node_modules/@types                                                       | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4

Root: //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4

| Directory                                                                                               | canWatchAtTypes |
| ------------------------------------------------------------------------------------------------------- | --------------- |
| //vda1cs4850/c$/node_modules/@types                                                                     | false           |
| //vda1cs4850/c$/folderAtRoot/node_modules/@types                                                        | false           |
| //vda1cs4850/c$/folderAtRoot/folder1/node_modules/@types                                                | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| //vda1cs4850/c$/users/node_modules/@types                                                               | false           |
| //vda1cs4850/c$/users/username/node_modules/@types                                                      | false           |
| //vda1cs4850/c$/users/username/folderAtRoot/node_modules/@types                                         | false           |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| //vda1cs4850/c$/user/node_modules/@types                                                                | false           |
| //vda1cs4850/c$/user/username/node_modules/@types                                                       | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

Root: //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

| Directory                                                                                               | canWatchAtTypes |
| ------------------------------------------------------------------------------------------------------- | --------------- |
| //vda1cs4850/c$/node_modules/@types                                                                     | false           |
| //vda1cs4850/c$/folderAtRoot/node_modules/@types                                                        | false           |
| //vda1cs4850/c$/folderAtRoot/folder1/node_modules/@types                                                | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| //vda1cs4850/c$/users/node_modules/@types                                                               | false           |
| //vda1cs4850/c$/users/username/node_modules/@types                                                      | false           |
| //vda1cs4850/c$/users/username/folderAtRoot/node_modules/@types                                         | false           |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| //vda1cs4850/c$/user/node_modules/@types                                                                | false           |
| //vda1cs4850/c$/user/username/node_modules/@types                                                       | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: //vda1cs4850/c$/user

Root: //vda1cs4850/c$/user

| Directory                                                                                               | canWatchAtTypes |
| ------------------------------------------------------------------------------------------------------- | --------------- |
| //vda1cs4850/c$/node_modules/@types                                                                     | false           |
| //vda1cs4850/c$/folderAtRoot/node_modules/@types                                                        | false           |
| //vda1cs4850/c$/folderAtRoot/folder1/node_modules/@types                                                | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| //vda1cs4850/c$/users/node_modules/@types                                                               | false           |
| //vda1cs4850/c$/users/username/node_modules/@types                                                      | false           |
| //vda1cs4850/c$/users/username/folderAtRoot/node_modules/@types                                         | false           |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| //vda1cs4850/c$/user/node_modules/@types                                                                | true            |
| //vda1cs4850/c$/user/username/node_modules/@types                                                       | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: //vda1cs4850/c$/user/username

Root: //vda1cs4850/c$/user/username

| Directory                                                                                               | canWatchAtTypes |
| ------------------------------------------------------------------------------------------------------- | --------------- |
| //vda1cs4850/c$/node_modules/@types                                                                     | false           |
| //vda1cs4850/c$/folderAtRoot/node_modules/@types                                                        | false           |
| //vda1cs4850/c$/folderAtRoot/folder1/node_modules/@types                                                | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| //vda1cs4850/c$/users/node_modules/@types                                                               | false           |
| //vda1cs4850/c$/users/username/node_modules/@types                                                      | false           |
| //vda1cs4850/c$/users/username/folderAtRoot/node_modules/@types                                         | false           |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| //vda1cs4850/c$/user/node_modules/@types                                                                | false           |
| //vda1cs4850/c$/user/username/node_modules/@types                                                       | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: //vda1cs4850/c$/user/username/folderAtRoot

Root: //vda1cs4850/c$/user/username/folderAtRoot

| Directory                                                                                               | canWatchAtTypes |
| ------------------------------------------------------------------------------------------------------- | --------------- |
| //vda1cs4850/c$/node_modules/@types                                                                     | false           |
| //vda1cs4850/c$/folderAtRoot/node_modules/@types                                                        | false           |
| //vda1cs4850/c$/folderAtRoot/folder1/node_modules/@types                                                | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| //vda1cs4850/c$/users/node_modules/@types                                                               | false           |
| //vda1cs4850/c$/users/username/node_modules/@types                                                      | false           |
| //vda1cs4850/c$/users/username/folderAtRoot/node_modules/@types                                         | false           |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| //vda1cs4850/c$/user/node_modules/@types                                                                | false           |
| //vda1cs4850/c$/user/username/node_modules/@types                                                       | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: //vda1cs4850/c$/user/username/folderAtRoot/folder1

Root: //vda1cs4850/c$/user/username/folderAtRoot/folder1

| Directory                                                                                               | canWatchAtTypes |
| ------------------------------------------------------------------------------------------------------- | --------------- |
| //vda1cs4850/c$/node_modules/@types                                                                     | false           |
| //vda1cs4850/c$/folderAtRoot/node_modules/@types                                                        | false           |
| //vda1cs4850/c$/folderAtRoot/folder1/node_modules/@types                                                | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| //vda1cs4850/c$/users/node_modules/@types                                                               | false           |
| //vda1cs4850/c$/users/username/node_modules/@types                                                      | false           |
| //vda1cs4850/c$/users/username/folderAtRoot/node_modules/@types                                         | false           |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| //vda1cs4850/c$/user/node_modules/@types                                                                | false           |
| //vda1cs4850/c$/user/username/node_modules/@types                                                       | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2

Root: //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2

| Directory                                                                                               | canWatchAtTypes |
| ------------------------------------------------------------------------------------------------------- | --------------- |
| //vda1cs4850/c$/node_modules/@types                                                                     | false           |
| //vda1cs4850/c$/folderAtRoot/node_modules/@types                                                        | false           |
| //vda1cs4850/c$/folderAtRoot/folder1/node_modules/@types                                                | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| //vda1cs4850/c$/users/node_modules/@types                                                               | false           |
| //vda1cs4850/c$/users/username/node_modules/@types                                                      | false           |
| //vda1cs4850/c$/users/username/folderAtRoot/node_modules/@types                                         | false           |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| //vda1cs4850/c$/user/node_modules/@types                                                                | false           |
| //vda1cs4850/c$/user/username/node_modules/@types                                                       | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3

Root: //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3

| Directory                                                                                               | canWatchAtTypes |
| ------------------------------------------------------------------------------------------------------- | --------------- |
| //vda1cs4850/c$/node_modules/@types                                                                     | false           |
| //vda1cs4850/c$/folderAtRoot/node_modules/@types                                                        | false           |
| //vda1cs4850/c$/folderAtRoot/folder1/node_modules/@types                                                | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| //vda1cs4850/c$/users/node_modules/@types                                                               | false           |
| //vda1cs4850/c$/users/username/node_modules/@types                                                      | false           |
| //vda1cs4850/c$/users/username/folderAtRoot/node_modules/@types                                         | false           |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| //vda1cs4850/c$/user/node_modules/@types                                                                | false           |
| //vda1cs4850/c$/user/username/node_modules/@types                                                       | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4

Root: //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4

| Directory                                                                                               | canWatchAtTypes |
| ------------------------------------------------------------------------------------------------------- | --------------- |
| //vda1cs4850/c$/node_modules/@types                                                                     | false           |
| //vda1cs4850/c$/folderAtRoot/node_modules/@types                                                        | false           |
| //vda1cs4850/c$/folderAtRoot/folder1/node_modules/@types                                                | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| //vda1cs4850/c$/users/node_modules/@types                                                               | false           |
| //vda1cs4850/c$/users/username/node_modules/@types                                                      | false           |
| //vda1cs4850/c$/users/username/folderAtRoot/node_modules/@types                                         | false           |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| //vda1cs4850/c$/user/node_modules/@types                                                                | false           |
| //vda1cs4850/c$/user/username/node_modules/@types                                                       | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

Root: //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

| Directory                                                                                               | canWatchAtTypes |
| ------------------------------------------------------------------------------------------------------- | --------------- |
| //vda1cs4850/c$/node_modules/@types                                                                     | false           |
| //vda1cs4850/c$/folderAtRoot/node_modules/@types                                                        | false           |
| //vda1cs4850/c$/folderAtRoot/folder1/node_modules/@types                                                | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| //vda1cs4850/c$/users/node_modules/@types                                                               | false           |
| //vda1cs4850/c$/users/username/node_modules/@types                                                      | false           |
| //vda1cs4850/c$/users/username/folderAtRoot/node_modules/@types                                         | false           |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| //vda1cs4850/c$/user/node_modules/@types                                                                | false           |
| //vda1cs4850/c$/user/username/node_modules/@types                                                       | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: undefined

Root: undefined

| Directory                                                                                               | canWatchAtTypes |
| ------------------------------------------------------------------------------------------------------- | --------------- |
| //vda1cs4850/c$/node_modules/@types                                                                     | false           |
| //vda1cs4850/c$/folderAtRoot/node_modules/@types                                                        | false           |
| //vda1cs4850/c$/folderAtRoot/folder1/node_modules/@types                                                | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| //vda1cs4850/c$/users/node_modules/@types                                                               | false           |
| //vda1cs4850/c$/users/username/node_modules/@types                                                      | false           |
| //vda1cs4850/c$/users/username/folderAtRoot/node_modules/@types                                         | false           |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| //vda1cs4850/c$/user/node_modules/@types                                                                | false           |
| //vda1cs4850/c$/user/username/node_modules/@types                                                       | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/node_modules/@types                                          | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

