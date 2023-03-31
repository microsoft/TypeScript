# canWatchAtTypes

Determines if given node_modules/@types can be watched.
These are the typeRoots calculated because user didnt specify typeRoots in compierOptions

## Testing for Dos root: c:/

## RootDirForResolution: c:/

Root: c:

| Directory                                                                                  | canWatchAtTypes |
| ------------------------------------------------------------------------------------------ | --------------- |
| c:/node_modules/@types                                                                     | false           |
| c:/folderAtRoot/node_modules/@types                                                        | false           |
| c:/folderAtRoot/folder1/node_modules/@types                                                | true            |
| c:/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| c:/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| c:/users/node_modules/@types                                                               | false           |
| c:/users/username/node_modules/@types                                                      | false           |
| c:/users/username/folderAtRoot/node_modules/@types                                         | false           |
| c:/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| c:/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| c:/user/node_modules/@types                                                                | false           |
| c:/user/username/node_modules/@types                                                       | true            |
| c:/user/username/folderAtRoot/node_modules/@types                                          | true            |
| c:/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| c:/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: c:/folderAtRoot

Root: c:/folderAtRoot

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
| c:/users/username/folderAtRoot/node_modules/@types                                         | false           |
| c:/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| c:/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| c:/user/node_modules/@types                                                                | false           |
| c:/user/username/node_modules/@types                                                       | true            |
| c:/user/username/folderAtRoot/node_modules/@types                                          | true            |
| c:/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| c:/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: c:/folderAtRoot/folder1

Root: c:/folderAtRoot/folder1

| Directory                                                                                  | canWatchAtTypes |
| ------------------------------------------------------------------------------------------ | --------------- |
| c:/node_modules/@types                                                                     | false           |
| c:/folderAtRoot/node_modules/@types                                                        | false           |
| c:/folderAtRoot/folder1/node_modules/@types                                                | true            |
| c:/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| c:/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| c:/users/node_modules/@types                                                               | false           |
| c:/users/username/node_modules/@types                                                      | false           |
| c:/users/username/folderAtRoot/node_modules/@types                                         | false           |
| c:/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| c:/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| c:/user/node_modules/@types                                                                | false           |
| c:/user/username/node_modules/@types                                                       | true            |
| c:/user/username/folderAtRoot/node_modules/@types                                          | true            |
| c:/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| c:/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: c:/folderAtRoot/folder1/folder2

Root: c:/folderAtRoot/folder1/folder2

| Directory                                                                                  | canWatchAtTypes |
| ------------------------------------------------------------------------------------------ | --------------- |
| c:/node_modules/@types                                                                     | false           |
| c:/folderAtRoot/node_modules/@types                                                        | false           |
| c:/folderAtRoot/folder1/node_modules/@types                                                | true            |
| c:/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| c:/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| c:/users/node_modules/@types                                                               | false           |
| c:/users/username/node_modules/@types                                                      | false           |
| c:/users/username/folderAtRoot/node_modules/@types                                         | false           |
| c:/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| c:/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| c:/user/node_modules/@types                                                                | false           |
| c:/user/username/node_modules/@types                                                       | true            |
| c:/user/username/folderAtRoot/node_modules/@types                                          | true            |
| c:/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| c:/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: c:/folderAtRoot/folder1/folder2/folder3

Root: c:/folderAtRoot/folder1/folder2/folder3

| Directory                                                                                  | canWatchAtTypes |
| ------------------------------------------------------------------------------------------ | --------------- |
| c:/node_modules/@types                                                                     | false           |
| c:/folderAtRoot/node_modules/@types                                                        | false           |
| c:/folderAtRoot/folder1/node_modules/@types                                                | true            |
| c:/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| c:/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| c:/users/node_modules/@types                                                               | false           |
| c:/users/username/node_modules/@types                                                      | false           |
| c:/users/username/folderAtRoot/node_modules/@types                                         | false           |
| c:/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| c:/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| c:/user/node_modules/@types                                                                | false           |
| c:/user/username/node_modules/@types                                                       | true            |
| c:/user/username/folderAtRoot/node_modules/@types                                          | true            |
| c:/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| c:/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: c:/folderAtRoot/folder1/folder2/folder3/folder4

Root: c:/folderAtRoot/folder1/folder2/folder3/folder4

| Directory                                                                                  | canWatchAtTypes |
| ------------------------------------------------------------------------------------------ | --------------- |
| c:/node_modules/@types                                                                     | false           |
| c:/folderAtRoot/node_modules/@types                                                        | false           |
| c:/folderAtRoot/folder1/node_modules/@types                                                | true            |
| c:/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| c:/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| c:/users/node_modules/@types                                                               | false           |
| c:/users/username/node_modules/@types                                                      | false           |
| c:/users/username/folderAtRoot/node_modules/@types                                         | false           |
| c:/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| c:/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| c:/user/node_modules/@types                                                                | false           |
| c:/user/username/node_modules/@types                                                       | true            |
| c:/user/username/folderAtRoot/node_modules/@types                                          | true            |
| c:/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| c:/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5

Root: c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5

| Directory                                                                                  | canWatchAtTypes |
| ------------------------------------------------------------------------------------------ | --------------- |
| c:/node_modules/@types                                                                     | false           |
| c:/folderAtRoot/node_modules/@types                                                        | false           |
| c:/folderAtRoot/folder1/node_modules/@types                                                | true            |
| c:/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| c:/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| c:/users/node_modules/@types                                                               | false           |
| c:/users/username/node_modules/@types                                                      | false           |
| c:/users/username/folderAtRoot/node_modules/@types                                         | false           |
| c:/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| c:/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| c:/user/node_modules/@types                                                                | false           |
| c:/user/username/node_modules/@types                                                       | true            |
| c:/user/username/folderAtRoot/node_modules/@types                                          | true            |
| c:/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| c:/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: c:/users

Root: c:/users

| Directory                                                                                  | canWatchAtTypes |
| ------------------------------------------------------------------------------------------ | --------------- |
| c:/node_modules/@types                                                                     | false           |
| c:/folderAtRoot/node_modules/@types                                                        | false           |
| c:/folderAtRoot/folder1/node_modules/@types                                                | true            |
| c:/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| c:/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| c:/users/node_modules/@types                                                               | true            |
| c:/users/username/node_modules/@types                                                      | false           |
| c:/users/username/folderAtRoot/node_modules/@types                                         | false           |
| c:/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| c:/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| c:/user/node_modules/@types                                                                | false           |
| c:/user/username/node_modules/@types                                                       | true            |
| c:/user/username/folderAtRoot/node_modules/@types                                          | true            |
| c:/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| c:/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: c:/users/username

Root: c:/users/username

| Directory                                                                                  | canWatchAtTypes |
| ------------------------------------------------------------------------------------------ | --------------- |
| c:/node_modules/@types                                                                     | false           |
| c:/folderAtRoot/node_modules/@types                                                        | false           |
| c:/folderAtRoot/folder1/node_modules/@types                                                | true            |
| c:/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| c:/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| c:/users/node_modules/@types                                                               | false           |
| c:/users/username/node_modules/@types                                                      | true            |
| c:/users/username/folderAtRoot/node_modules/@types                                         | false           |
| c:/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| c:/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| c:/user/node_modules/@types                                                                | false           |
| c:/user/username/node_modules/@types                                                       | true            |
| c:/user/username/folderAtRoot/node_modules/@types                                          | true            |
| c:/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| c:/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: c:/users/username/folderAtRoot

Root: c:/users/username/folderAtRoot

| Directory                                                                                  | canWatchAtTypes |
| ------------------------------------------------------------------------------------------ | --------------- |
| c:/node_modules/@types                                                                     | false           |
| c:/folderAtRoot/node_modules/@types                                                        | false           |
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
| c:/user/node_modules/@types                                                                | false           |
| c:/user/username/node_modules/@types                                                       | true            |
| c:/user/username/folderAtRoot/node_modules/@types                                          | true            |
| c:/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| c:/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: c:/users/username/folderAtRoot/folder1

Root: c:/users/username/folderAtRoot/folder1

| Directory                                                                                  | canWatchAtTypes |
| ------------------------------------------------------------------------------------------ | --------------- |
| c:/node_modules/@types                                                                     | false           |
| c:/folderAtRoot/node_modules/@types                                                        | false           |
| c:/folderAtRoot/folder1/node_modules/@types                                                | true            |
| c:/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| c:/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| c:/users/node_modules/@types                                                               | false           |
| c:/users/username/node_modules/@types                                                      | false           |
| c:/users/username/folderAtRoot/node_modules/@types                                         | false           |
| c:/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| c:/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| c:/user/node_modules/@types                                                                | false           |
| c:/user/username/node_modules/@types                                                       | true            |
| c:/user/username/folderAtRoot/node_modules/@types                                          | true            |
| c:/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| c:/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: c:/users/username/folderAtRoot/folder1/folder2

Root: c:/users/username/folderAtRoot/folder1/folder2

| Directory                                                                                  | canWatchAtTypes |
| ------------------------------------------------------------------------------------------ | --------------- |
| c:/node_modules/@types                                                                     | false           |
| c:/folderAtRoot/node_modules/@types                                                        | false           |
| c:/folderAtRoot/folder1/node_modules/@types                                                | true            |
| c:/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| c:/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| c:/users/node_modules/@types                                                               | false           |
| c:/users/username/node_modules/@types                                                      | false           |
| c:/users/username/folderAtRoot/node_modules/@types                                         | false           |
| c:/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| c:/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| c:/user/node_modules/@types                                                                | false           |
| c:/user/username/node_modules/@types                                                       | true            |
| c:/user/username/folderAtRoot/node_modules/@types                                          | true            |
| c:/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| c:/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: c:/users/username/folderAtRoot/folder1/folder2/folder3

Root: c:/users/username/folderAtRoot/folder1/folder2/folder3

| Directory                                                                                  | canWatchAtTypes |
| ------------------------------------------------------------------------------------------ | --------------- |
| c:/node_modules/@types                                                                     | false           |
| c:/folderAtRoot/node_modules/@types                                                        | false           |
| c:/folderAtRoot/folder1/node_modules/@types                                                | true            |
| c:/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| c:/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| c:/users/node_modules/@types                                                               | false           |
| c:/users/username/node_modules/@types                                                      | false           |
| c:/users/username/folderAtRoot/node_modules/@types                                         | false           |
| c:/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| c:/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| c:/user/node_modules/@types                                                                | false           |
| c:/user/username/node_modules/@types                                                       | true            |
| c:/user/username/folderAtRoot/node_modules/@types                                          | true            |
| c:/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| c:/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4

Root: c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4

| Directory                                                                                  | canWatchAtTypes |
| ------------------------------------------------------------------------------------------ | --------------- |
| c:/node_modules/@types                                                                     | false           |
| c:/folderAtRoot/node_modules/@types                                                        | false           |
| c:/folderAtRoot/folder1/node_modules/@types                                                | true            |
| c:/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| c:/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| c:/users/node_modules/@types                                                               | false           |
| c:/users/username/node_modules/@types                                                      | false           |
| c:/users/username/folderAtRoot/node_modules/@types                                         | false           |
| c:/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| c:/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| c:/user/node_modules/@types                                                                | false           |
| c:/user/username/node_modules/@types                                                       | true            |
| c:/user/username/folderAtRoot/node_modules/@types                                          | true            |
| c:/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| c:/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

Root: c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

| Directory                                                                                  | canWatchAtTypes |
| ------------------------------------------------------------------------------------------ | --------------- |
| c:/node_modules/@types                                                                     | false           |
| c:/folderAtRoot/node_modules/@types                                                        | false           |
| c:/folderAtRoot/folder1/node_modules/@types                                                | true            |
| c:/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| c:/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| c:/users/node_modules/@types                                                               | false           |
| c:/users/username/node_modules/@types                                                      | false           |
| c:/users/username/folderAtRoot/node_modules/@types                                         | false           |
| c:/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| c:/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| c:/user/node_modules/@types                                                                | false           |
| c:/user/username/node_modules/@types                                                       | true            |
| c:/user/username/folderAtRoot/node_modules/@types                                          | true            |
| c:/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| c:/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: c:/user

Root: c:/user

| Directory                                                                                  | canWatchAtTypes |
| ------------------------------------------------------------------------------------------ | --------------- |
| c:/node_modules/@types                                                                     | false           |
| c:/folderAtRoot/node_modules/@types                                                        | false           |
| c:/folderAtRoot/folder1/node_modules/@types                                                | true            |
| c:/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| c:/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| c:/users/node_modules/@types                                                               | false           |
| c:/users/username/node_modules/@types                                                      | false           |
| c:/users/username/folderAtRoot/node_modules/@types                                         | false           |
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

## RootDirForResolution: c:/user/username

Root: c:/user/username

| Directory                                                                                  | canWatchAtTypes |
| ------------------------------------------------------------------------------------------ | --------------- |
| c:/node_modules/@types                                                                     | false           |
| c:/folderAtRoot/node_modules/@types                                                        | false           |
| c:/folderAtRoot/folder1/node_modules/@types                                                | true            |
| c:/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| c:/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| c:/users/node_modules/@types                                                               | false           |
| c:/users/username/node_modules/@types                                                      | false           |
| c:/users/username/folderAtRoot/node_modules/@types                                         | false           |
| c:/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| c:/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| c:/user/node_modules/@types                                                                | false           |
| c:/user/username/node_modules/@types                                                       | true            |
| c:/user/username/folderAtRoot/node_modules/@types                                          | true            |
| c:/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| c:/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: c:/user/username/folderAtRoot

Root: c:/user/username/folderAtRoot

| Directory                                                                                  | canWatchAtTypes |
| ------------------------------------------------------------------------------------------ | --------------- |
| c:/node_modules/@types                                                                     | false           |
| c:/folderAtRoot/node_modules/@types                                                        | false           |
| c:/folderAtRoot/folder1/node_modules/@types                                                | true            |
| c:/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| c:/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| c:/users/node_modules/@types                                                               | false           |
| c:/users/username/node_modules/@types                                                      | false           |
| c:/users/username/folderAtRoot/node_modules/@types                                         | false           |
| c:/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| c:/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| c:/user/node_modules/@types                                                                | false           |
| c:/user/username/node_modules/@types                                                       | true            |
| c:/user/username/folderAtRoot/node_modules/@types                                          | true            |
| c:/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| c:/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: c:/user/username/folderAtRoot/folder1

Root: c:/user/username/folderAtRoot/folder1

| Directory                                                                                  | canWatchAtTypes |
| ------------------------------------------------------------------------------------------ | --------------- |
| c:/node_modules/@types                                                                     | false           |
| c:/folderAtRoot/node_modules/@types                                                        | false           |
| c:/folderAtRoot/folder1/node_modules/@types                                                | true            |
| c:/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| c:/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| c:/users/node_modules/@types                                                               | false           |
| c:/users/username/node_modules/@types                                                      | false           |
| c:/users/username/folderAtRoot/node_modules/@types                                         | false           |
| c:/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| c:/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| c:/user/node_modules/@types                                                                | false           |
| c:/user/username/node_modules/@types                                                       | true            |
| c:/user/username/folderAtRoot/node_modules/@types                                          | true            |
| c:/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| c:/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: c:/user/username/folderAtRoot/folder1/folder2

Root: c:/user/username/folderAtRoot/folder1/folder2

| Directory                                                                                  | canWatchAtTypes |
| ------------------------------------------------------------------------------------------ | --------------- |
| c:/node_modules/@types                                                                     | false           |
| c:/folderAtRoot/node_modules/@types                                                        | false           |
| c:/folderAtRoot/folder1/node_modules/@types                                                | true            |
| c:/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| c:/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| c:/users/node_modules/@types                                                               | false           |
| c:/users/username/node_modules/@types                                                      | false           |
| c:/users/username/folderAtRoot/node_modules/@types                                         | false           |
| c:/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| c:/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| c:/user/node_modules/@types                                                                | false           |
| c:/user/username/node_modules/@types                                                       | true            |
| c:/user/username/folderAtRoot/node_modules/@types                                          | true            |
| c:/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| c:/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: c:/user/username/folderAtRoot/folder1/folder2/folder3

Root: c:/user/username/folderAtRoot/folder1/folder2/folder3

| Directory                                                                                  | canWatchAtTypes |
| ------------------------------------------------------------------------------------------ | --------------- |
| c:/node_modules/@types                                                                     | false           |
| c:/folderAtRoot/node_modules/@types                                                        | false           |
| c:/folderAtRoot/folder1/node_modules/@types                                                | true            |
| c:/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| c:/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| c:/users/node_modules/@types                                                               | false           |
| c:/users/username/node_modules/@types                                                      | false           |
| c:/users/username/folderAtRoot/node_modules/@types                                         | false           |
| c:/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| c:/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| c:/user/node_modules/@types                                                                | false           |
| c:/user/username/node_modules/@types                                                       | true            |
| c:/user/username/folderAtRoot/node_modules/@types                                          | true            |
| c:/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| c:/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4

Root: c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4

| Directory                                                                                  | canWatchAtTypes |
| ------------------------------------------------------------------------------------------ | --------------- |
| c:/node_modules/@types                                                                     | false           |
| c:/folderAtRoot/node_modules/@types                                                        | false           |
| c:/folderAtRoot/folder1/node_modules/@types                                                | true            |
| c:/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| c:/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| c:/users/node_modules/@types                                                               | false           |
| c:/users/username/node_modules/@types                                                      | false           |
| c:/users/username/folderAtRoot/node_modules/@types                                         | false           |
| c:/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| c:/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| c:/user/node_modules/@types                                                                | false           |
| c:/user/username/node_modules/@types                                                       | true            |
| c:/user/username/folderAtRoot/node_modules/@types                                          | true            |
| c:/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| c:/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

Root: c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

| Directory                                                                                  | canWatchAtTypes |
| ------------------------------------------------------------------------------------------ | --------------- |
| c:/node_modules/@types                                                                     | false           |
| c:/folderAtRoot/node_modules/@types                                                        | false           |
| c:/folderAtRoot/folder1/node_modules/@types                                                | true            |
| c:/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| c:/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| c:/users/node_modules/@types                                                               | false           |
| c:/users/username/node_modules/@types                                                      | false           |
| c:/users/username/folderAtRoot/node_modules/@types                                         | false           |
| c:/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| c:/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| c:/user/node_modules/@types                                                                | false           |
| c:/user/username/node_modules/@types                                                       | true            |
| c:/user/username/folderAtRoot/node_modules/@types                                          | true            |
| c:/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| c:/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

## RootDirForResolution: undefined

Root: undefined

| Directory                                                                                  | canWatchAtTypes |
| ------------------------------------------------------------------------------------------ | --------------- |
| c:/node_modules/@types                                                                     | false           |
| c:/folderAtRoot/node_modules/@types                                                        | false           |
| c:/folderAtRoot/folder1/node_modules/@types                                                | true            |
| c:/folderAtRoot/folder1/folder2/node_modules/@types                                        | true            |
| c:/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | true            |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | true            |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | true            |
| c:/users/node_modules/@types                                                               | false           |
| c:/users/username/node_modules/@types                                                      | false           |
| c:/users/username/folderAtRoot/node_modules/@types                                         | false           |
| c:/users/username/folderAtRoot/folder1/node_modules/@types                                 | true            |
| c:/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | true            |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | true            |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | true            |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | true            |
| c:/user/node_modules/@types                                                                | false           |
| c:/user/username/node_modules/@types                                                       | true            |
| c:/user/username/folderAtRoot/node_modules/@types                                          | true            |
| c:/user/username/folderAtRoot/folder1/node_modules/@types                                  | true            |
| c:/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | true            |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | true            |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | true            |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | true            |

