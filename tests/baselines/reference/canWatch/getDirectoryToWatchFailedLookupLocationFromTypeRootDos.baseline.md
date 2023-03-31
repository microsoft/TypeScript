# getDirectoryToWatchFailedLookupLocationFromTypeRoot

When watched typeRoot handler is invoked, this method determines the directory for which the failedLookupLocation would need to be invalidated.
Since this is invoked only when watching default typeRoot and is used to handle flaky directory watchers, this is used as a fail safe where if failed lookup starts with returned directory we will invalidate that resolution.

## Testing for Dos root: c:/

## RootDirForResolution: c:/

Root: c:

| Directory                                                                                  | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                        |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| c:/folderAtRoot/folder1/node_modules/@types                                                | c:                                                                                         |
| c:/folderAtRoot/folder1/folder2/node_modules/@types                                        | c:                                                                                         |
| c:/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | c:                                                                                         |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | c:                                                                                         |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | c:                                                                                         |
| c:/users/username/folderAtRoot/folder1/node_modules/@types                                 | c:                                                                                         |
| c:/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | c:                                                                                         |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | c:                                                                                         |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | c:                                                                                         |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | c:                                                                                         |
| c:/user/username/node_modules/@types                                                       | c:                                                                                         |
| c:/user/username/folderAtRoot/node_modules/@types                                          | c:                                                                                         |
| c:/user/username/folderAtRoot/folder1/node_modules/@types                                  | c:                                                                                         |
| c:/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | c:                                                                                         |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | c:                                                                                         |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | c:                                                                                         |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | c:                                                                                         |

## RootDirForResolution: c:/folderAtRoot

Root: c:/folderAtRoot

| Directory                                                                                  | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                        |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| c:/folderAtRoot/node_modules/@types                                                        | c:/folderAtRoot                                                                            |
| c:/folderAtRoot/folder1/node_modules/@types                                                | c:/folderAtRoot                                                                            |
| c:/folderAtRoot/folder1/folder2/node_modules/@types                                        | c:/folderAtRoot                                                                            |
| c:/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | c:/folderAtRoot                                                                            |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | c:/folderAtRoot                                                                            |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | c:/folderAtRoot                                                                            |
| c:/users/username/folderAtRoot/folder1/node_modules/@types                                 | c:/users/username/folderAtRoot/folder1/node_modules                                        |
| c:/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | c:/users/username/folderAtRoot/folder1/folder2/node_modules                                |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | c:/users/username/folderAtRoot/folder1/folder2/folder3/node_modules                        |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules        |
| c:/user/username/node_modules/@types                                                       | c:/user/username/node_modules                                                              |
| c:/user/username/folderAtRoot/node_modules/@types                                          | c:/user/username/folderAtRoot/node_modules                                                 |
| c:/user/username/folderAtRoot/folder1/node_modules/@types                                  | c:/user/username/folderAtRoot/folder1/node_modules                                         |
| c:/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | c:/user/username/folderAtRoot/folder1/folder2/node_modules                                 |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | c:/user/username/folderAtRoot/folder1/folder2/folder3/node_modules                         |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                 |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules         |

## RootDirForResolution: c:/folderAtRoot/folder1

Root: c:/folderAtRoot/folder1

| Directory                                                                                  | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                        |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| c:/folderAtRoot/folder1/node_modules/@types                                                | c:/folderAtRoot/folder1                                                                    |
| c:/folderAtRoot/folder1/folder2/node_modules/@types                                        | c:/folderAtRoot/folder1                                                                    |
| c:/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | c:/folderAtRoot/folder1                                                                    |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | c:/folderAtRoot/folder1                                                                    |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | c:/folderAtRoot/folder1                                                                    |
| c:/users/username/folderAtRoot/folder1/node_modules/@types                                 | c:/users/username/folderAtRoot/folder1/node_modules                                        |
| c:/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | c:/users/username/folderAtRoot/folder1/folder2/node_modules                                |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | c:/users/username/folderAtRoot/folder1/folder2/folder3/node_modules                        |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules        |
| c:/user/username/node_modules/@types                                                       | c:/user/username/node_modules                                                              |
| c:/user/username/folderAtRoot/node_modules/@types                                          | c:/user/username/folderAtRoot/node_modules                                                 |
| c:/user/username/folderAtRoot/folder1/node_modules/@types                                  | c:/user/username/folderAtRoot/folder1/node_modules                                         |
| c:/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | c:/user/username/folderAtRoot/folder1/folder2/node_modules                                 |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | c:/user/username/folderAtRoot/folder1/folder2/folder3/node_modules                         |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                 |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules         |

## RootDirForResolution: c:/folderAtRoot/folder1/folder2

Root: c:/folderAtRoot/folder1/folder2

| Directory                                                                                  | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                        |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| c:/folderAtRoot/folder1/node_modules/@types                                                | c:/folderAtRoot/folder1/node_modules                                                       |
| c:/folderAtRoot/folder1/folder2/node_modules/@types                                        | c:/folderAtRoot/folder1/folder2                                                            |
| c:/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | c:/folderAtRoot/folder1/folder2                                                            |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | c:/folderAtRoot/folder1/folder2                                                            |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | c:/folderAtRoot/folder1/folder2                                                            |
| c:/users/username/folderAtRoot/folder1/node_modules/@types                                 | c:/users/username/folderAtRoot/folder1/node_modules                                        |
| c:/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | c:/users/username/folderAtRoot/folder1/folder2/node_modules                                |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | c:/users/username/folderAtRoot/folder1/folder2/folder3/node_modules                        |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules        |
| c:/user/username/node_modules/@types                                                       | c:/user/username/node_modules                                                              |
| c:/user/username/folderAtRoot/node_modules/@types                                          | c:/user/username/folderAtRoot/node_modules                                                 |
| c:/user/username/folderAtRoot/folder1/node_modules/@types                                  | c:/user/username/folderAtRoot/folder1/node_modules                                         |
| c:/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | c:/user/username/folderAtRoot/folder1/folder2/node_modules                                 |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | c:/user/username/folderAtRoot/folder1/folder2/folder3/node_modules                         |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                 |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules         |

## RootDirForResolution: c:/folderAtRoot/folder1/folder2/folder3

Root: c:/folderAtRoot/folder1/folder2/folder3

| Directory                                                                                  | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                        |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| c:/folderAtRoot/folder1/node_modules/@types                                                | c:/folderAtRoot/folder1/node_modules                                                       |
| c:/folderAtRoot/folder1/folder2/node_modules/@types                                        | c:/folderAtRoot/folder1/folder2/node_modules                                               |
| c:/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | c:/folderAtRoot/folder1/folder2/folder3                                                    |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | c:/folderAtRoot/folder1/folder2/folder3                                                    |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | c:/folderAtRoot/folder1/folder2/folder3                                                    |
| c:/users/username/folderAtRoot/folder1/node_modules/@types                                 | c:/users/username/folderAtRoot/folder1/node_modules                                        |
| c:/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | c:/users/username/folderAtRoot/folder1/folder2/node_modules                                |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | c:/users/username/folderAtRoot/folder1/folder2/folder3/node_modules                        |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules        |
| c:/user/username/node_modules/@types                                                       | c:/user/username/node_modules                                                              |
| c:/user/username/folderAtRoot/node_modules/@types                                          | c:/user/username/folderAtRoot/node_modules                                                 |
| c:/user/username/folderAtRoot/folder1/node_modules/@types                                  | c:/user/username/folderAtRoot/folder1/node_modules                                         |
| c:/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | c:/user/username/folderAtRoot/folder1/folder2/node_modules                                 |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | c:/user/username/folderAtRoot/folder1/folder2/folder3/node_modules                         |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                 |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules         |

## RootDirForResolution: c:/folderAtRoot/folder1/folder2/folder3/folder4

Root: c:/folderAtRoot/folder1/folder2/folder3/folder4

| Directory                                                                                  | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                        |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| c:/folderAtRoot/folder1/node_modules/@types                                                | c:/folderAtRoot/folder1/node_modules                                                       |
| c:/folderAtRoot/folder1/folder2/node_modules/@types                                        | c:/folderAtRoot/folder1/folder2/node_modules                                               |
| c:/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | c:/folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | c:/folderAtRoot/folder1/folder2/folder3/folder4                                            |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | c:/folderAtRoot/folder1/folder2/folder3/folder4                                            |
| c:/users/username/folderAtRoot/folder1/node_modules/@types                                 | c:/users/username/folderAtRoot/folder1/node_modules                                        |
| c:/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | c:/users/username/folderAtRoot/folder1/folder2/node_modules                                |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | c:/users/username/folderAtRoot/folder1/folder2/folder3/node_modules                        |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules        |
| c:/user/username/node_modules/@types                                                       | c:/user/username/node_modules                                                              |
| c:/user/username/folderAtRoot/node_modules/@types                                          | c:/user/username/folderAtRoot/node_modules                                                 |
| c:/user/username/folderAtRoot/folder1/node_modules/@types                                  | c:/user/username/folderAtRoot/folder1/node_modules                                         |
| c:/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | c:/user/username/folderAtRoot/folder1/folder2/node_modules                                 |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | c:/user/username/folderAtRoot/folder1/folder2/folder3/node_modules                         |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                 |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules         |

## RootDirForResolution: c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5

Root: c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5

| Directory                                                                                  | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                        |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| c:/folderAtRoot/folder1/node_modules/@types                                                | c:/folderAtRoot/folder1/node_modules                                                       |
| c:/folderAtRoot/folder1/folder2/node_modules/@types                                        | c:/folderAtRoot/folder1/folder2/node_modules                                               |
| c:/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | c:/folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | c:/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                               |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5                                    |
| c:/users/username/folderAtRoot/folder1/node_modules/@types                                 | c:/users/username/folderAtRoot/folder1/node_modules                                        |
| c:/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | c:/users/username/folderAtRoot/folder1/folder2/node_modules                                |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | c:/users/username/folderAtRoot/folder1/folder2/folder3/node_modules                        |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules        |
| c:/user/username/node_modules/@types                                                       | c:/user/username/node_modules                                                              |
| c:/user/username/folderAtRoot/node_modules/@types                                          | c:/user/username/folderAtRoot/node_modules                                                 |
| c:/user/username/folderAtRoot/folder1/node_modules/@types                                  | c:/user/username/folderAtRoot/folder1/node_modules                                         |
| c:/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | c:/user/username/folderAtRoot/folder1/folder2/node_modules                                 |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | c:/user/username/folderAtRoot/folder1/folder2/folder3/node_modules                         |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                 |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules         |

## RootDirForResolution: c:/users

Root: c:/users

| Directory                                                                                  | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                        |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| c:/folderAtRoot/folder1/node_modules/@types                                                | c:/folderAtRoot/folder1/node_modules                                                       |
| c:/folderAtRoot/folder1/folder2/node_modules/@types                                        | c:/folderAtRoot/folder1/folder2/node_modules                                               |
| c:/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | c:/folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | c:/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                               |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules                       |
| c:/users/node_modules/@types                                                               | c:/users                                                                                   |
| c:/users/username/folderAtRoot/folder1/node_modules/@types                                 | c:/users                                                                                   |
| c:/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | c:/users                                                                                   |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | c:/users                                                                                   |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | c:/users                                                                                   |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | c:/users                                                                                   |
| c:/user/username/node_modules/@types                                                       | c:/user/username/node_modules                                                              |
| c:/user/username/folderAtRoot/node_modules/@types                                          | c:/user/username/folderAtRoot/node_modules                                                 |
| c:/user/username/folderAtRoot/folder1/node_modules/@types                                  | c:/user/username/folderAtRoot/folder1/node_modules                                         |
| c:/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | c:/user/username/folderAtRoot/folder1/folder2/node_modules                                 |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | c:/user/username/folderAtRoot/folder1/folder2/folder3/node_modules                         |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                 |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules         |

## RootDirForResolution: c:/users/username

Root: c:/users/username

| Directory                                                                                  | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                        |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| c:/folderAtRoot/folder1/node_modules/@types                                                | c:/folderAtRoot/folder1/node_modules                                                       |
| c:/folderAtRoot/folder1/folder2/node_modules/@types                                        | c:/folderAtRoot/folder1/folder2/node_modules                                               |
| c:/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | c:/folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | c:/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                               |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules                       |
| c:/users/username/node_modules/@types                                                      | c:/users/username                                                                          |
| c:/users/username/folderAtRoot/folder1/node_modules/@types                                 | c:/users/username                                                                          |
| c:/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | c:/users/username                                                                          |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | c:/users/username                                                                          |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | c:/users/username                                                                          |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | c:/users/username                                                                          |
| c:/user/username/node_modules/@types                                                       | c:/user/username/node_modules                                                              |
| c:/user/username/folderAtRoot/node_modules/@types                                          | c:/user/username/folderAtRoot/node_modules                                                 |
| c:/user/username/folderAtRoot/folder1/node_modules/@types                                  | c:/user/username/folderAtRoot/folder1/node_modules                                         |
| c:/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | c:/user/username/folderAtRoot/folder1/folder2/node_modules                                 |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | c:/user/username/folderAtRoot/folder1/folder2/folder3/node_modules                         |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                 |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules         |

## RootDirForResolution: c:/users/username/folderAtRoot

Root: c:/users/username/folderAtRoot

| Directory                                                                                  | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                        |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| c:/folderAtRoot/folder1/node_modules/@types                                                | c:/folderAtRoot/folder1/node_modules                                                       |
| c:/folderAtRoot/folder1/folder2/node_modules/@types                                        | c:/folderAtRoot/folder1/folder2/node_modules                                               |
| c:/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | c:/folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | c:/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                               |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules                       |
| c:/users/username/folderAtRoot/node_modules/@types                                         | c:/users/username/folderAtRoot                                                             |
| c:/users/username/folderAtRoot/folder1/node_modules/@types                                 | c:/users/username/folderAtRoot                                                             |
| c:/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | c:/users/username/folderAtRoot                                                             |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | c:/users/username/folderAtRoot                                                             |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | c:/users/username/folderAtRoot                                                             |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | c:/users/username/folderAtRoot                                                             |
| c:/user/username/node_modules/@types                                                       | c:/user/username/node_modules                                                              |
| c:/user/username/folderAtRoot/node_modules/@types                                          | c:/user/username/folderAtRoot/node_modules                                                 |
| c:/user/username/folderAtRoot/folder1/node_modules/@types                                  | c:/user/username/folderAtRoot/folder1/node_modules                                         |
| c:/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | c:/user/username/folderAtRoot/folder1/folder2/node_modules                                 |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | c:/user/username/folderAtRoot/folder1/folder2/folder3/node_modules                         |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                 |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules         |

## RootDirForResolution: c:/users/username/folderAtRoot/folder1

Root: c:/users/username/folderAtRoot/folder1

| Directory                                                                                  | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                        |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| c:/folderAtRoot/folder1/node_modules/@types                                                | c:/folderAtRoot/folder1/node_modules                                                       |
| c:/folderAtRoot/folder1/folder2/node_modules/@types                                        | c:/folderAtRoot/folder1/folder2/node_modules                                               |
| c:/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | c:/folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | c:/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                               |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules                       |
| c:/users/username/folderAtRoot/folder1/node_modules/@types                                 | c:/users/username/folderAtRoot/folder1                                                     |
| c:/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | c:/users/username/folderAtRoot/folder1                                                     |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | c:/users/username/folderAtRoot/folder1                                                     |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | c:/users/username/folderAtRoot/folder1                                                     |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | c:/users/username/folderAtRoot/folder1                                                     |
| c:/user/username/node_modules/@types                                                       | c:/user/username/node_modules                                                              |
| c:/user/username/folderAtRoot/node_modules/@types                                          | c:/user/username/folderAtRoot/node_modules                                                 |
| c:/user/username/folderAtRoot/folder1/node_modules/@types                                  | c:/user/username/folderAtRoot/folder1/node_modules                                         |
| c:/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | c:/user/username/folderAtRoot/folder1/folder2/node_modules                                 |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | c:/user/username/folderAtRoot/folder1/folder2/folder3/node_modules                         |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                 |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules         |

## RootDirForResolution: c:/users/username/folderAtRoot/folder1/folder2

Root: c:/users/username/folderAtRoot/folder1/folder2

| Directory                                                                                  | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                        |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| c:/folderAtRoot/folder1/node_modules/@types                                                | c:/folderAtRoot/folder1/node_modules                                                       |
| c:/folderAtRoot/folder1/folder2/node_modules/@types                                        | c:/folderAtRoot/folder1/folder2/node_modules                                               |
| c:/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | c:/folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | c:/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                               |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules                       |
| c:/users/username/folderAtRoot/folder1/node_modules/@types                                 | c:/users/username/folderAtRoot/folder1/node_modules                                        |
| c:/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | c:/users/username/folderAtRoot/folder1/folder2                                             |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | c:/users/username/folderAtRoot/folder1/folder2                                             |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | c:/users/username/folderAtRoot/folder1/folder2                                             |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | c:/users/username/folderAtRoot/folder1/folder2                                             |
| c:/user/username/node_modules/@types                                                       | c:/user/username/node_modules                                                              |
| c:/user/username/folderAtRoot/node_modules/@types                                          | c:/user/username/folderAtRoot/node_modules                                                 |
| c:/user/username/folderAtRoot/folder1/node_modules/@types                                  | c:/user/username/folderAtRoot/folder1/node_modules                                         |
| c:/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | c:/user/username/folderAtRoot/folder1/folder2/node_modules                                 |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | c:/user/username/folderAtRoot/folder1/folder2/folder3/node_modules                         |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                 |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules         |

## RootDirForResolution: c:/users/username/folderAtRoot/folder1/folder2/folder3

Root: c:/users/username/folderAtRoot/folder1/folder2/folder3

| Directory                                                                                  | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                        |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| c:/folderAtRoot/folder1/node_modules/@types                                                | c:/folderAtRoot/folder1/node_modules                                                       |
| c:/folderAtRoot/folder1/folder2/node_modules/@types                                        | c:/folderAtRoot/folder1/folder2/node_modules                                               |
| c:/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | c:/folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | c:/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                               |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules                       |
| c:/users/username/folderAtRoot/folder1/node_modules/@types                                 | c:/users/username/folderAtRoot/folder1/node_modules                                        |
| c:/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | c:/users/username/folderAtRoot/folder1/folder2/node_modules                                |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | c:/users/username/folderAtRoot/folder1/folder2/folder3                                     |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | c:/users/username/folderAtRoot/folder1/folder2/folder3                                     |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | c:/users/username/folderAtRoot/folder1/folder2/folder3                                     |
| c:/user/username/node_modules/@types                                                       | c:/user/username/node_modules                                                              |
| c:/user/username/folderAtRoot/node_modules/@types                                          | c:/user/username/folderAtRoot/node_modules                                                 |
| c:/user/username/folderAtRoot/folder1/node_modules/@types                                  | c:/user/username/folderAtRoot/folder1/node_modules                                         |
| c:/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | c:/user/username/folderAtRoot/folder1/folder2/node_modules                                 |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | c:/user/username/folderAtRoot/folder1/folder2/folder3/node_modules                         |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                 |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules         |

## RootDirForResolution: c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4

Root: c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4

| Directory                                                                                  | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                        |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| c:/folderAtRoot/folder1/node_modules/@types                                                | c:/folderAtRoot/folder1/node_modules                                                       |
| c:/folderAtRoot/folder1/folder2/node_modules/@types                                        | c:/folderAtRoot/folder1/folder2/node_modules                                               |
| c:/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | c:/folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | c:/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                               |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules                       |
| c:/users/username/folderAtRoot/folder1/node_modules/@types                                 | c:/users/username/folderAtRoot/folder1/node_modules                                        |
| c:/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | c:/users/username/folderAtRoot/folder1/folder2/node_modules                                |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | c:/users/username/folderAtRoot/folder1/folder2/folder3/node_modules                        |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4                             |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4                             |
| c:/user/username/node_modules/@types                                                       | c:/user/username/node_modules                                                              |
| c:/user/username/folderAtRoot/node_modules/@types                                          | c:/user/username/folderAtRoot/node_modules                                                 |
| c:/user/username/folderAtRoot/folder1/node_modules/@types                                  | c:/user/username/folderAtRoot/folder1/node_modules                                         |
| c:/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | c:/user/username/folderAtRoot/folder1/folder2/node_modules                                 |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | c:/user/username/folderAtRoot/folder1/folder2/folder3/node_modules                         |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                 |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules         |

## RootDirForResolution: c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

Root: c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

| Directory                                                                                  | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                        |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| c:/folderAtRoot/folder1/node_modules/@types                                                | c:/folderAtRoot/folder1/node_modules                                                       |
| c:/folderAtRoot/folder1/folder2/node_modules/@types                                        | c:/folderAtRoot/folder1/folder2/node_modules                                               |
| c:/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | c:/folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | c:/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                               |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules                       |
| c:/users/username/folderAtRoot/folder1/node_modules/@types                                 | c:/users/username/folderAtRoot/folder1/node_modules                                        |
| c:/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | c:/users/username/folderAtRoot/folder1/folder2/node_modules                                |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | c:/users/username/folderAtRoot/folder1/folder2/folder3/node_modules                        |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5                     |
| c:/user/username/node_modules/@types                                                       | c:/user/username/node_modules                                                              |
| c:/user/username/folderAtRoot/node_modules/@types                                          | c:/user/username/folderAtRoot/node_modules                                                 |
| c:/user/username/folderAtRoot/folder1/node_modules/@types                                  | c:/user/username/folderAtRoot/folder1/node_modules                                         |
| c:/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | c:/user/username/folderAtRoot/folder1/folder2/node_modules                                 |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | c:/user/username/folderAtRoot/folder1/folder2/folder3/node_modules                         |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                 |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules         |

## RootDirForResolution: c:/user

Root: c:/user

| Directory                                                                                  | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                        |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| c:/folderAtRoot/folder1/node_modules/@types                                                | c:/folderAtRoot/folder1/node_modules                                                       |
| c:/folderAtRoot/folder1/folder2/node_modules/@types                                        | c:/folderAtRoot/folder1/folder2/node_modules                                               |
| c:/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | c:/folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | c:/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                               |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules                       |
| c:/users/username/folderAtRoot/folder1/node_modules/@types                                 | c:/users/username/folderAtRoot/folder1/node_modules                                        |
| c:/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | c:/users/username/folderAtRoot/folder1/folder2/node_modules                                |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | c:/users/username/folderAtRoot/folder1/folder2/folder3/node_modules                        |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules        |
| c:/user/node_modules/@types                                                                | c:/user                                                                                    |
| c:/user/username/node_modules/@types                                                       | c:/user                                                                                    |
| c:/user/username/folderAtRoot/node_modules/@types                                          | c:/user                                                                                    |
| c:/user/username/folderAtRoot/folder1/node_modules/@types                                  | c:/user                                                                                    |
| c:/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | c:/user                                                                                    |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | c:/user                                                                                    |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | c:/user                                                                                    |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | c:/user                                                                                    |

## RootDirForResolution: c:/user/username

Root: c:/user/username

| Directory                                                                                  | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                        |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| c:/folderAtRoot/folder1/node_modules/@types                                                | c:/folderAtRoot/folder1/node_modules                                                       |
| c:/folderAtRoot/folder1/folder2/node_modules/@types                                        | c:/folderAtRoot/folder1/folder2/node_modules                                               |
| c:/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | c:/folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | c:/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                               |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules                       |
| c:/users/username/folderAtRoot/folder1/node_modules/@types                                 | c:/users/username/folderAtRoot/folder1/node_modules                                        |
| c:/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | c:/users/username/folderAtRoot/folder1/folder2/node_modules                                |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | c:/users/username/folderAtRoot/folder1/folder2/folder3/node_modules                        |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules        |
| c:/user/username/node_modules/@types                                                       | c:/user/username                                                                           |
| c:/user/username/folderAtRoot/node_modules/@types                                          | c:/user/username                                                                           |
| c:/user/username/folderAtRoot/folder1/node_modules/@types                                  | c:/user/username                                                                           |
| c:/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | c:/user/username                                                                           |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | c:/user/username                                                                           |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | c:/user/username                                                                           |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | c:/user/username                                                                           |

## RootDirForResolution: c:/user/username/folderAtRoot

Root: c:/user/username/folderAtRoot

| Directory                                                                                  | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                        |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| c:/folderAtRoot/folder1/node_modules/@types                                                | c:/folderAtRoot/folder1/node_modules                                                       |
| c:/folderAtRoot/folder1/folder2/node_modules/@types                                        | c:/folderAtRoot/folder1/folder2/node_modules                                               |
| c:/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | c:/folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | c:/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                               |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules                       |
| c:/users/username/folderAtRoot/folder1/node_modules/@types                                 | c:/users/username/folderAtRoot/folder1/node_modules                                        |
| c:/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | c:/users/username/folderAtRoot/folder1/folder2/node_modules                                |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | c:/users/username/folderAtRoot/folder1/folder2/folder3/node_modules                        |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules        |
| c:/user/username/node_modules/@types                                                       | c:/user/username/node_modules                                                              |
| c:/user/username/folderAtRoot/node_modules/@types                                          | c:/user/username/folderAtRoot                                                              |
| c:/user/username/folderAtRoot/folder1/node_modules/@types                                  | c:/user/username/folderAtRoot                                                              |
| c:/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | c:/user/username/folderAtRoot                                                              |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | c:/user/username/folderAtRoot                                                              |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | c:/user/username/folderAtRoot                                                              |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | c:/user/username/folderAtRoot                                                              |

## RootDirForResolution: c:/user/username/folderAtRoot/folder1

Root: c:/user/username/folderAtRoot/folder1

| Directory                                                                                  | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                        |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| c:/folderAtRoot/folder1/node_modules/@types                                                | c:/folderAtRoot/folder1/node_modules                                                       |
| c:/folderAtRoot/folder1/folder2/node_modules/@types                                        | c:/folderAtRoot/folder1/folder2/node_modules                                               |
| c:/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | c:/folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | c:/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                               |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules                       |
| c:/users/username/folderAtRoot/folder1/node_modules/@types                                 | c:/users/username/folderAtRoot/folder1/node_modules                                        |
| c:/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | c:/users/username/folderAtRoot/folder1/folder2/node_modules                                |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | c:/users/username/folderAtRoot/folder1/folder2/folder3/node_modules                        |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules        |
| c:/user/username/node_modules/@types                                                       | c:/user/username/node_modules                                                              |
| c:/user/username/folderAtRoot/node_modules/@types                                          | c:/user/username/folderAtRoot/node_modules                                                 |
| c:/user/username/folderAtRoot/folder1/node_modules/@types                                  | c:/user/username/folderAtRoot/folder1                                                      |
| c:/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | c:/user/username/folderAtRoot/folder1                                                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | c:/user/username/folderAtRoot/folder1                                                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | c:/user/username/folderAtRoot/folder1                                                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | c:/user/username/folderAtRoot/folder1                                                      |

## RootDirForResolution: c:/user/username/folderAtRoot/folder1/folder2

Root: c:/user/username/folderAtRoot/folder1/folder2

| Directory                                                                                  | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                        |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| c:/folderAtRoot/folder1/node_modules/@types                                                | c:/folderAtRoot/folder1/node_modules                                                       |
| c:/folderAtRoot/folder1/folder2/node_modules/@types                                        | c:/folderAtRoot/folder1/folder2/node_modules                                               |
| c:/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | c:/folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | c:/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                               |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules                       |
| c:/users/username/folderAtRoot/folder1/node_modules/@types                                 | c:/users/username/folderAtRoot/folder1/node_modules                                        |
| c:/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | c:/users/username/folderAtRoot/folder1/folder2/node_modules                                |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | c:/users/username/folderAtRoot/folder1/folder2/folder3/node_modules                        |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules        |
| c:/user/username/node_modules/@types                                                       | c:/user/username/node_modules                                                              |
| c:/user/username/folderAtRoot/node_modules/@types                                          | c:/user/username/folderAtRoot/node_modules                                                 |
| c:/user/username/folderAtRoot/folder1/node_modules/@types                                  | c:/user/username/folderAtRoot/folder1/node_modules                                         |
| c:/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | c:/user/username/folderAtRoot/folder1/folder2                                              |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | c:/user/username/folderAtRoot/folder1/folder2                                              |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | c:/user/username/folderAtRoot/folder1/folder2                                              |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | c:/user/username/folderAtRoot/folder1/folder2                                              |

## RootDirForResolution: c:/user/username/folderAtRoot/folder1/folder2/folder3

Root: c:/user/username/folderAtRoot/folder1/folder2/folder3

| Directory                                                                                  | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                        |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| c:/folderAtRoot/folder1/node_modules/@types                                                | c:/folderAtRoot/folder1/node_modules                                                       |
| c:/folderAtRoot/folder1/folder2/node_modules/@types                                        | c:/folderAtRoot/folder1/folder2/node_modules                                               |
| c:/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | c:/folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | c:/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                               |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules                       |
| c:/users/username/folderAtRoot/folder1/node_modules/@types                                 | c:/users/username/folderAtRoot/folder1/node_modules                                        |
| c:/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | c:/users/username/folderAtRoot/folder1/folder2/node_modules                                |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | c:/users/username/folderAtRoot/folder1/folder2/folder3/node_modules                        |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules        |
| c:/user/username/node_modules/@types                                                       | c:/user/username/node_modules                                                              |
| c:/user/username/folderAtRoot/node_modules/@types                                          | c:/user/username/folderAtRoot/node_modules                                                 |
| c:/user/username/folderAtRoot/folder1/node_modules/@types                                  | c:/user/username/folderAtRoot/folder1/node_modules                                         |
| c:/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | c:/user/username/folderAtRoot/folder1/folder2/node_modules                                 |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | c:/user/username/folderAtRoot/folder1/folder2/folder3                                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | c:/user/username/folderAtRoot/folder1/folder2/folder3                                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | c:/user/username/folderAtRoot/folder1/folder2/folder3                                      |

## RootDirForResolution: c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4

Root: c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4

| Directory                                                                                  | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                        |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| c:/folderAtRoot/folder1/node_modules/@types                                                | c:/folderAtRoot/folder1/node_modules                                                       |
| c:/folderAtRoot/folder1/folder2/node_modules/@types                                        | c:/folderAtRoot/folder1/folder2/node_modules                                               |
| c:/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | c:/folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | c:/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                               |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules                       |
| c:/users/username/folderAtRoot/folder1/node_modules/@types                                 | c:/users/username/folderAtRoot/folder1/node_modules                                        |
| c:/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | c:/users/username/folderAtRoot/folder1/folder2/node_modules                                |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | c:/users/username/folderAtRoot/folder1/folder2/folder3/node_modules                        |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules        |
| c:/user/username/node_modules/@types                                                       | c:/user/username/node_modules                                                              |
| c:/user/username/folderAtRoot/node_modules/@types                                          | c:/user/username/folderAtRoot/node_modules                                                 |
| c:/user/username/folderAtRoot/folder1/node_modules/@types                                  | c:/user/username/folderAtRoot/folder1/node_modules                                         |
| c:/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | c:/user/username/folderAtRoot/folder1/folder2/node_modules                                 |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | c:/user/username/folderAtRoot/folder1/folder2/folder3/node_modules                         |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4                              |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4                              |

## RootDirForResolution: c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

Root: c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

| Directory                                                                                  | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                        |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| c:/folderAtRoot/folder1/node_modules/@types                                                | c:/folderAtRoot/folder1/node_modules                                                       |
| c:/folderAtRoot/folder1/folder2/node_modules/@types                                        | c:/folderAtRoot/folder1/folder2/node_modules                                               |
| c:/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | c:/folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | c:/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                               |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules                       |
| c:/users/username/folderAtRoot/folder1/node_modules/@types                                 | c:/users/username/folderAtRoot/folder1/node_modules                                        |
| c:/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | c:/users/username/folderAtRoot/folder1/folder2/node_modules                                |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | c:/users/username/folderAtRoot/folder1/folder2/folder3/node_modules                        |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules        |
| c:/user/username/node_modules/@types                                                       | c:/user/username/node_modules                                                              |
| c:/user/username/folderAtRoot/node_modules/@types                                          | c:/user/username/folderAtRoot/node_modules                                                 |
| c:/user/username/folderAtRoot/folder1/node_modules/@types                                  | c:/user/username/folderAtRoot/folder1/node_modules                                         |
| c:/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | c:/user/username/folderAtRoot/folder1/folder2/node_modules                                 |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | c:/user/username/folderAtRoot/folder1/folder2/folder3/node_modules                         |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                 |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5                      |

## RootDirForResolution: undefined

Root: undefined

| Directory                                                                                  | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                        |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| c:/folderAtRoot/folder1/node_modules/@types                                                | c:/folderAtRoot/folder1/node_modules                                                       |
| c:/folderAtRoot/folder1/folder2/node_modules/@types                                        | c:/folderAtRoot/folder1/folder2/node_modules                                               |
| c:/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | c:/folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | c:/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                               |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules                       |
| c:/users/username/folderAtRoot/folder1/node_modules/@types                                 | c:/users/username/folderAtRoot/folder1/node_modules                                        |
| c:/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | c:/users/username/folderAtRoot/folder1/folder2/node_modules                                |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | c:/users/username/folderAtRoot/folder1/folder2/folder3/node_modules                        |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules        |
| c:/user/username/node_modules/@types                                                       | c:/user/username/node_modules                                                              |
| c:/user/username/folderAtRoot/node_modules/@types                                          | c:/user/username/folderAtRoot/node_modules                                                 |
| c:/user/username/folderAtRoot/folder1/node_modules/@types                                  | c:/user/username/folderAtRoot/folder1/node_modules                                         |
| c:/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | c:/user/username/folderAtRoot/folder1/folder2/node_modules                                 |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | c:/user/username/folderAtRoot/folder1/folder2/folder3/node_modules                         |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                 |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules         |

