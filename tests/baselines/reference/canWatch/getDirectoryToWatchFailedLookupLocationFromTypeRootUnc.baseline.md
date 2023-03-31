# getDirectoryToWatchFailedLookupLocationFromTypeRoot

When watched typeRoot handler is invoked, this method determines the directory for which the failedLookupLocation would need to be invalidated.
Since this is invoked only when watching default typeRoot and is used to handle flaky directory watchers, this is used as a fail safe where if failed lookup starts with returned directory we will invalidate that resolution.

## Testing for Unc root: //vda1cs4850/

## RootDirForResolution: //vda1cs4850/

Root: //vda1cs4850

| Directory                                                                                            | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                                  |
| ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| //vda1cs4850/folderAtRoot/folder1/node_modules/@types                                                | //vda1cs4850                                                                                         |
| //vda1cs4850/folderAtRoot/folder1/folder2/node_modules/@types                                        | //vda1cs4850                                                                                         |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | //vda1cs4850                                                                                         |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | //vda1cs4850                                                                                         |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | //vda1cs4850                                                                                         |
| //vda1cs4850/users/username/folderAtRoot/folder1/node_modules/@types                                 | //vda1cs4850                                                                                         |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | //vda1cs4850                                                                                         |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | //vda1cs4850                                                                                         |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | //vda1cs4850                                                                                         |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | //vda1cs4850                                                                                         |
| //vda1cs4850/user/username/node_modules/@types                                                       | //vda1cs4850                                                                                         |
| //vda1cs4850/user/username/folderAtRoot/node_modules/@types                                          | //vda1cs4850                                                                                         |
| //vda1cs4850/user/username/folderAtRoot/folder1/node_modules/@types                                  | //vda1cs4850                                                                                         |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | //vda1cs4850                                                                                         |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | //vda1cs4850                                                                                         |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | //vda1cs4850                                                                                         |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | //vda1cs4850                                                                                         |

## RootDirForResolution: //vda1cs4850/folderAtRoot

Root: //vda1cs4850/folderAtRoot

| Directory                                                                                            | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                                  |
| ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| //vda1cs4850/folderAtRoot/node_modules/@types                                                        | //vda1cs4850/folderAtRoot                                                                            |
| //vda1cs4850/folderAtRoot/folder1/node_modules/@types                                                | //vda1cs4850/folderAtRoot                                                                            |
| //vda1cs4850/folderAtRoot/folder1/folder2/node_modules/@types                                        | //vda1cs4850/folderAtRoot                                                                            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | //vda1cs4850/folderAtRoot                                                                            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | //vda1cs4850/folderAtRoot                                                                            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | //vda1cs4850/folderAtRoot                                                                            |
| //vda1cs4850/users/username/folderAtRoot/folder1/node_modules/@types                                 | //vda1cs4850/users/username/folderAtRoot/folder1/node_modules                                        |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules                                |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules                        |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules        |
| //vda1cs4850/user/username/node_modules/@types                                                       | //vda1cs4850/user/username/node_modules                                                              |
| //vda1cs4850/user/username/folderAtRoot/node_modules/@types                                          | //vda1cs4850/user/username/folderAtRoot/node_modules                                                 |
| //vda1cs4850/user/username/folderAtRoot/folder1/node_modules/@types                                  | //vda1cs4850/user/username/folderAtRoot/folder1/node_modules                                         |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules                                 |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules                         |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                 |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules         |

## RootDirForResolution: //vda1cs4850/folderAtRoot/folder1

Root: //vda1cs4850/folderAtRoot/folder1

| Directory                                                                                            | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                                  |
| ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| //vda1cs4850/folderAtRoot/folder1/node_modules/@types                                                | //vda1cs4850/folderAtRoot/folder1                                                                    |
| //vda1cs4850/folderAtRoot/folder1/folder2/node_modules/@types                                        | //vda1cs4850/folderAtRoot/folder1                                                                    |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | //vda1cs4850/folderAtRoot/folder1                                                                    |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | //vda1cs4850/folderAtRoot/folder1                                                                    |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | //vda1cs4850/folderAtRoot/folder1                                                                    |
| //vda1cs4850/users/username/folderAtRoot/folder1/node_modules/@types                                 | //vda1cs4850/users/username/folderAtRoot/folder1/node_modules                                        |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules                                |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules                        |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules        |
| //vda1cs4850/user/username/node_modules/@types                                                       | //vda1cs4850/user/username/node_modules                                                              |
| //vda1cs4850/user/username/folderAtRoot/node_modules/@types                                          | //vda1cs4850/user/username/folderAtRoot/node_modules                                                 |
| //vda1cs4850/user/username/folderAtRoot/folder1/node_modules/@types                                  | //vda1cs4850/user/username/folderAtRoot/folder1/node_modules                                         |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules                                 |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules                         |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                 |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules         |

## RootDirForResolution: //vda1cs4850/folderAtRoot/folder1/folder2

Root: //vda1cs4850/folderAtRoot/folder1/folder2

| Directory                                                                                            | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                                  |
| ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| //vda1cs4850/folderAtRoot/folder1/node_modules/@types                                                | //vda1cs4850/folderAtRoot/folder1/node_modules                                                       |
| //vda1cs4850/folderAtRoot/folder1/folder2/node_modules/@types                                        | //vda1cs4850/folderAtRoot/folder1/folder2                                                            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | //vda1cs4850/folderAtRoot/folder1/folder2                                                            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | //vda1cs4850/folderAtRoot/folder1/folder2                                                            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | //vda1cs4850/folderAtRoot/folder1/folder2                                                            |
| //vda1cs4850/users/username/folderAtRoot/folder1/node_modules/@types                                 | //vda1cs4850/users/username/folderAtRoot/folder1/node_modules                                        |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules                                |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules                        |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules        |
| //vda1cs4850/user/username/node_modules/@types                                                       | //vda1cs4850/user/username/node_modules                                                              |
| //vda1cs4850/user/username/folderAtRoot/node_modules/@types                                          | //vda1cs4850/user/username/folderAtRoot/node_modules                                                 |
| //vda1cs4850/user/username/folderAtRoot/folder1/node_modules/@types                                  | //vda1cs4850/user/username/folderAtRoot/folder1/node_modules                                         |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules                                 |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules                         |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                 |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules         |

## RootDirForResolution: //vda1cs4850/folderAtRoot/folder1/folder2/folder3

Root: //vda1cs4850/folderAtRoot/folder1/folder2/folder3

| Directory                                                                                            | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                                  |
| ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| //vda1cs4850/folderAtRoot/folder1/node_modules/@types                                                | //vda1cs4850/folderAtRoot/folder1/node_modules                                                       |
| //vda1cs4850/folderAtRoot/folder1/folder2/node_modules/@types                                        | //vda1cs4850/folderAtRoot/folder1/folder2/node_modules                                               |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | //vda1cs4850/folderAtRoot/folder1/folder2/folder3                                                    |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | //vda1cs4850/folderAtRoot/folder1/folder2/folder3                                                    |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | //vda1cs4850/folderAtRoot/folder1/folder2/folder3                                                    |
| //vda1cs4850/users/username/folderAtRoot/folder1/node_modules/@types                                 | //vda1cs4850/users/username/folderAtRoot/folder1/node_modules                                        |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules                                |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules                        |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules        |
| //vda1cs4850/user/username/node_modules/@types                                                       | //vda1cs4850/user/username/node_modules                                                              |
| //vda1cs4850/user/username/folderAtRoot/node_modules/@types                                          | //vda1cs4850/user/username/folderAtRoot/node_modules                                                 |
| //vda1cs4850/user/username/folderAtRoot/folder1/node_modules/@types                                  | //vda1cs4850/user/username/folderAtRoot/folder1/node_modules                                         |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules                                 |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules                         |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                 |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules         |

## RootDirForResolution: //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4

Root: //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4

| Directory                                                                                            | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                                  |
| ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| //vda1cs4850/folderAtRoot/folder1/node_modules/@types                                                | //vda1cs4850/folderAtRoot/folder1/node_modules                                                       |
| //vda1cs4850/folderAtRoot/folder1/folder2/node_modules/@types                                        | //vda1cs4850/folderAtRoot/folder1/folder2/node_modules                                               |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4                                            |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4                                            |
| //vda1cs4850/users/username/folderAtRoot/folder1/node_modules/@types                                 | //vda1cs4850/users/username/folderAtRoot/folder1/node_modules                                        |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules                                |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules                        |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules        |
| //vda1cs4850/user/username/node_modules/@types                                                       | //vda1cs4850/user/username/node_modules                                                              |
| //vda1cs4850/user/username/folderAtRoot/node_modules/@types                                          | //vda1cs4850/user/username/folderAtRoot/node_modules                                                 |
| //vda1cs4850/user/username/folderAtRoot/folder1/node_modules/@types                                  | //vda1cs4850/user/username/folderAtRoot/folder1/node_modules                                         |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules                                 |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules                         |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                 |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules         |

## RootDirForResolution: //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5

Root: //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5

| Directory                                                                                            | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                                  |
| ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| //vda1cs4850/folderAtRoot/folder1/node_modules/@types                                                | //vda1cs4850/folderAtRoot/folder1/node_modules                                                       |
| //vda1cs4850/folderAtRoot/folder1/folder2/node_modules/@types                                        | //vda1cs4850/folderAtRoot/folder1/folder2/node_modules                                               |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                               |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5                                    |
| //vda1cs4850/users/username/folderAtRoot/folder1/node_modules/@types                                 | //vda1cs4850/users/username/folderAtRoot/folder1/node_modules                                        |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules                                |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules                        |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules        |
| //vda1cs4850/user/username/node_modules/@types                                                       | //vda1cs4850/user/username/node_modules                                                              |
| //vda1cs4850/user/username/folderAtRoot/node_modules/@types                                          | //vda1cs4850/user/username/folderAtRoot/node_modules                                                 |
| //vda1cs4850/user/username/folderAtRoot/folder1/node_modules/@types                                  | //vda1cs4850/user/username/folderAtRoot/folder1/node_modules                                         |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules                                 |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules                         |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                 |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules         |

## RootDirForResolution: //vda1cs4850/users

Root: //vda1cs4850/users

| Directory                                                                                            | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                                  |
| ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| //vda1cs4850/folderAtRoot/folder1/node_modules/@types                                                | //vda1cs4850/folderAtRoot/folder1/node_modules                                                       |
| //vda1cs4850/folderAtRoot/folder1/folder2/node_modules/@types                                        | //vda1cs4850/folderAtRoot/folder1/folder2/node_modules                                               |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                               |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules                       |
| //vda1cs4850/users/node_modules/@types                                                               | //vda1cs4850/users                                                                                   |
| //vda1cs4850/users/username/folderAtRoot/folder1/node_modules/@types                                 | //vda1cs4850/users                                                                                   |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | //vda1cs4850/users                                                                                   |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | //vda1cs4850/users                                                                                   |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | //vda1cs4850/users                                                                                   |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | //vda1cs4850/users                                                                                   |
| //vda1cs4850/user/username/node_modules/@types                                                       | //vda1cs4850/user/username/node_modules                                                              |
| //vda1cs4850/user/username/folderAtRoot/node_modules/@types                                          | //vda1cs4850/user/username/folderAtRoot/node_modules                                                 |
| //vda1cs4850/user/username/folderAtRoot/folder1/node_modules/@types                                  | //vda1cs4850/user/username/folderAtRoot/folder1/node_modules                                         |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules                                 |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules                         |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                 |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules         |

## RootDirForResolution: //vda1cs4850/users/username

Root: //vda1cs4850/users/username

| Directory                                                                                            | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                                  |
| ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| //vda1cs4850/folderAtRoot/folder1/node_modules/@types                                                | //vda1cs4850/folderAtRoot/folder1/node_modules                                                       |
| //vda1cs4850/folderAtRoot/folder1/folder2/node_modules/@types                                        | //vda1cs4850/folderAtRoot/folder1/folder2/node_modules                                               |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                               |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules                       |
| //vda1cs4850/users/username/node_modules/@types                                                      | //vda1cs4850/users/username                                                                          |
| //vda1cs4850/users/username/folderAtRoot/folder1/node_modules/@types                                 | //vda1cs4850/users/username                                                                          |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | //vda1cs4850/users/username                                                                          |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | //vda1cs4850/users/username                                                                          |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | //vda1cs4850/users/username                                                                          |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | //vda1cs4850/users/username                                                                          |
| //vda1cs4850/user/username/node_modules/@types                                                       | //vda1cs4850/user/username/node_modules                                                              |
| //vda1cs4850/user/username/folderAtRoot/node_modules/@types                                          | //vda1cs4850/user/username/folderAtRoot/node_modules                                                 |
| //vda1cs4850/user/username/folderAtRoot/folder1/node_modules/@types                                  | //vda1cs4850/user/username/folderAtRoot/folder1/node_modules                                         |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules                                 |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules                         |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                 |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules         |

## RootDirForResolution: //vda1cs4850/users/username/folderAtRoot

Root: //vda1cs4850/users/username/folderAtRoot

| Directory                                                                                            | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                                  |
| ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| //vda1cs4850/folderAtRoot/folder1/node_modules/@types                                                | //vda1cs4850/folderAtRoot/folder1/node_modules                                                       |
| //vda1cs4850/folderAtRoot/folder1/folder2/node_modules/@types                                        | //vda1cs4850/folderAtRoot/folder1/folder2/node_modules                                               |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                               |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules                       |
| //vda1cs4850/users/username/folderAtRoot/node_modules/@types                                         | //vda1cs4850/users/username/folderAtRoot                                                             |
| //vda1cs4850/users/username/folderAtRoot/folder1/node_modules/@types                                 | //vda1cs4850/users/username/folderAtRoot                                                             |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | //vda1cs4850/users/username/folderAtRoot                                                             |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | //vda1cs4850/users/username/folderAtRoot                                                             |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | //vda1cs4850/users/username/folderAtRoot                                                             |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | //vda1cs4850/users/username/folderAtRoot                                                             |
| //vda1cs4850/user/username/node_modules/@types                                                       | //vda1cs4850/user/username/node_modules                                                              |
| //vda1cs4850/user/username/folderAtRoot/node_modules/@types                                          | //vda1cs4850/user/username/folderAtRoot/node_modules                                                 |
| //vda1cs4850/user/username/folderAtRoot/folder1/node_modules/@types                                  | //vda1cs4850/user/username/folderAtRoot/folder1/node_modules                                         |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules                                 |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules                         |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                 |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules         |

## RootDirForResolution: //vda1cs4850/users/username/folderAtRoot/folder1

Root: //vda1cs4850/users/username/folderAtRoot/folder1

| Directory                                                                                            | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                                  |
| ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| //vda1cs4850/folderAtRoot/folder1/node_modules/@types                                                | //vda1cs4850/folderAtRoot/folder1/node_modules                                                       |
| //vda1cs4850/folderAtRoot/folder1/folder2/node_modules/@types                                        | //vda1cs4850/folderAtRoot/folder1/folder2/node_modules                                               |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                               |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules                       |
| //vda1cs4850/users/username/folderAtRoot/folder1/node_modules/@types                                 | //vda1cs4850/users/username/folderAtRoot/folder1                                                     |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | //vda1cs4850/users/username/folderAtRoot/folder1                                                     |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | //vda1cs4850/users/username/folderAtRoot/folder1                                                     |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | //vda1cs4850/users/username/folderAtRoot/folder1                                                     |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | //vda1cs4850/users/username/folderAtRoot/folder1                                                     |
| //vda1cs4850/user/username/node_modules/@types                                                       | //vda1cs4850/user/username/node_modules                                                              |
| //vda1cs4850/user/username/folderAtRoot/node_modules/@types                                          | //vda1cs4850/user/username/folderAtRoot/node_modules                                                 |
| //vda1cs4850/user/username/folderAtRoot/folder1/node_modules/@types                                  | //vda1cs4850/user/username/folderAtRoot/folder1/node_modules                                         |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules                                 |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules                         |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                 |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules         |

## RootDirForResolution: //vda1cs4850/users/username/folderAtRoot/folder1/folder2

Root: //vda1cs4850/users/username/folderAtRoot/folder1/folder2

| Directory                                                                                            | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                                  |
| ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| //vda1cs4850/folderAtRoot/folder1/node_modules/@types                                                | //vda1cs4850/folderAtRoot/folder1/node_modules                                                       |
| //vda1cs4850/folderAtRoot/folder1/folder2/node_modules/@types                                        | //vda1cs4850/folderAtRoot/folder1/folder2/node_modules                                               |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                               |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules                       |
| //vda1cs4850/users/username/folderAtRoot/folder1/node_modules/@types                                 | //vda1cs4850/users/username/folderAtRoot/folder1/node_modules                                        |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | //vda1cs4850/users/username/folderAtRoot/folder1/folder2                                             |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | //vda1cs4850/users/username/folderAtRoot/folder1/folder2                                             |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | //vda1cs4850/users/username/folderAtRoot/folder1/folder2                                             |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | //vda1cs4850/users/username/folderAtRoot/folder1/folder2                                             |
| //vda1cs4850/user/username/node_modules/@types                                                       | //vda1cs4850/user/username/node_modules                                                              |
| //vda1cs4850/user/username/folderAtRoot/node_modules/@types                                          | //vda1cs4850/user/username/folderAtRoot/node_modules                                                 |
| //vda1cs4850/user/username/folderAtRoot/folder1/node_modules/@types                                  | //vda1cs4850/user/username/folderAtRoot/folder1/node_modules                                         |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules                                 |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules                         |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                 |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules         |

## RootDirForResolution: //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3

Root: //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3

| Directory                                                                                            | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                                  |
| ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| //vda1cs4850/folderAtRoot/folder1/node_modules/@types                                                | //vda1cs4850/folderAtRoot/folder1/node_modules                                                       |
| //vda1cs4850/folderAtRoot/folder1/folder2/node_modules/@types                                        | //vda1cs4850/folderAtRoot/folder1/folder2/node_modules                                               |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                               |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules                       |
| //vda1cs4850/users/username/folderAtRoot/folder1/node_modules/@types                                 | //vda1cs4850/users/username/folderAtRoot/folder1/node_modules                                        |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules                                |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3                                     |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3                                     |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3                                     |
| //vda1cs4850/user/username/node_modules/@types                                                       | //vda1cs4850/user/username/node_modules                                                              |
| //vda1cs4850/user/username/folderAtRoot/node_modules/@types                                          | //vda1cs4850/user/username/folderAtRoot/node_modules                                                 |
| //vda1cs4850/user/username/folderAtRoot/folder1/node_modules/@types                                  | //vda1cs4850/user/username/folderAtRoot/folder1/node_modules                                         |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules                                 |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules                         |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                 |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules         |

## RootDirForResolution: //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4

Root: //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4

| Directory                                                                                            | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                                  |
| ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| //vda1cs4850/folderAtRoot/folder1/node_modules/@types                                                | //vda1cs4850/folderAtRoot/folder1/node_modules                                                       |
| //vda1cs4850/folderAtRoot/folder1/folder2/node_modules/@types                                        | //vda1cs4850/folderAtRoot/folder1/folder2/node_modules                                               |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                               |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules                       |
| //vda1cs4850/users/username/folderAtRoot/folder1/node_modules/@types                                 | //vda1cs4850/users/username/folderAtRoot/folder1/node_modules                                        |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules                                |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules                        |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4                             |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4                             |
| //vda1cs4850/user/username/node_modules/@types                                                       | //vda1cs4850/user/username/node_modules                                                              |
| //vda1cs4850/user/username/folderAtRoot/node_modules/@types                                          | //vda1cs4850/user/username/folderAtRoot/node_modules                                                 |
| //vda1cs4850/user/username/folderAtRoot/folder1/node_modules/@types                                  | //vda1cs4850/user/username/folderAtRoot/folder1/node_modules                                         |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules                                 |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules                         |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                 |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules         |

## RootDirForResolution: //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

Root: //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

| Directory                                                                                            | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                                  |
| ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| //vda1cs4850/folderAtRoot/folder1/node_modules/@types                                                | //vda1cs4850/folderAtRoot/folder1/node_modules                                                       |
| //vda1cs4850/folderAtRoot/folder1/folder2/node_modules/@types                                        | //vda1cs4850/folderAtRoot/folder1/folder2/node_modules                                               |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                               |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules                       |
| //vda1cs4850/users/username/folderAtRoot/folder1/node_modules/@types                                 | //vda1cs4850/users/username/folderAtRoot/folder1/node_modules                                        |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules                                |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules                        |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5                     |
| //vda1cs4850/user/username/node_modules/@types                                                       | //vda1cs4850/user/username/node_modules                                                              |
| //vda1cs4850/user/username/folderAtRoot/node_modules/@types                                          | //vda1cs4850/user/username/folderAtRoot/node_modules                                                 |
| //vda1cs4850/user/username/folderAtRoot/folder1/node_modules/@types                                  | //vda1cs4850/user/username/folderAtRoot/folder1/node_modules                                         |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules                                 |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules                         |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                 |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules         |

## RootDirForResolution: //vda1cs4850/user

Root: //vda1cs4850/user

| Directory                                                                                            | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                                  |
| ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| //vda1cs4850/folderAtRoot/folder1/node_modules/@types                                                | //vda1cs4850/folderAtRoot/folder1/node_modules                                                       |
| //vda1cs4850/folderAtRoot/folder1/folder2/node_modules/@types                                        | //vda1cs4850/folderAtRoot/folder1/folder2/node_modules                                               |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                               |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules                       |
| //vda1cs4850/users/username/folderAtRoot/folder1/node_modules/@types                                 | //vda1cs4850/users/username/folderAtRoot/folder1/node_modules                                        |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules                                |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules                        |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules        |
| //vda1cs4850/user/node_modules/@types                                                                | //vda1cs4850/user                                                                                    |
| //vda1cs4850/user/username/node_modules/@types                                                       | //vda1cs4850/user                                                                                    |
| //vda1cs4850/user/username/folderAtRoot/node_modules/@types                                          | //vda1cs4850/user                                                                                    |
| //vda1cs4850/user/username/folderAtRoot/folder1/node_modules/@types                                  | //vda1cs4850/user                                                                                    |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | //vda1cs4850/user                                                                                    |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | //vda1cs4850/user                                                                                    |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | //vda1cs4850/user                                                                                    |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | //vda1cs4850/user                                                                                    |

## RootDirForResolution: //vda1cs4850/user/username

Root: //vda1cs4850/user/username

| Directory                                                                                            | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                                  |
| ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| //vda1cs4850/folderAtRoot/folder1/node_modules/@types                                                | //vda1cs4850/folderAtRoot/folder1/node_modules                                                       |
| //vda1cs4850/folderAtRoot/folder1/folder2/node_modules/@types                                        | //vda1cs4850/folderAtRoot/folder1/folder2/node_modules                                               |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                               |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules                       |
| //vda1cs4850/users/username/folderAtRoot/folder1/node_modules/@types                                 | //vda1cs4850/users/username/folderAtRoot/folder1/node_modules                                        |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules                                |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules                        |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules        |
| //vda1cs4850/user/username/node_modules/@types                                                       | //vda1cs4850/user/username                                                                           |
| //vda1cs4850/user/username/folderAtRoot/node_modules/@types                                          | //vda1cs4850/user/username                                                                           |
| //vda1cs4850/user/username/folderAtRoot/folder1/node_modules/@types                                  | //vda1cs4850/user/username                                                                           |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | //vda1cs4850/user/username                                                                           |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | //vda1cs4850/user/username                                                                           |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | //vda1cs4850/user/username                                                                           |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | //vda1cs4850/user/username                                                                           |

## RootDirForResolution: //vda1cs4850/user/username/folderAtRoot

Root: //vda1cs4850/user/username/folderAtRoot

| Directory                                                                                            | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                                  |
| ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| //vda1cs4850/folderAtRoot/folder1/node_modules/@types                                                | //vda1cs4850/folderAtRoot/folder1/node_modules                                                       |
| //vda1cs4850/folderAtRoot/folder1/folder2/node_modules/@types                                        | //vda1cs4850/folderAtRoot/folder1/folder2/node_modules                                               |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                               |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules                       |
| //vda1cs4850/users/username/folderAtRoot/folder1/node_modules/@types                                 | //vda1cs4850/users/username/folderAtRoot/folder1/node_modules                                        |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules                                |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules                        |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules        |
| //vda1cs4850/user/username/node_modules/@types                                                       | //vda1cs4850/user/username/node_modules                                                              |
| //vda1cs4850/user/username/folderAtRoot/node_modules/@types                                          | //vda1cs4850/user/username/folderAtRoot                                                              |
| //vda1cs4850/user/username/folderAtRoot/folder1/node_modules/@types                                  | //vda1cs4850/user/username/folderAtRoot                                                              |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | //vda1cs4850/user/username/folderAtRoot                                                              |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | //vda1cs4850/user/username/folderAtRoot                                                              |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | //vda1cs4850/user/username/folderAtRoot                                                              |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | //vda1cs4850/user/username/folderAtRoot                                                              |

## RootDirForResolution: //vda1cs4850/user/username/folderAtRoot/folder1

Root: //vda1cs4850/user/username/folderAtRoot/folder1

| Directory                                                                                            | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                                  |
| ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| //vda1cs4850/folderAtRoot/folder1/node_modules/@types                                                | //vda1cs4850/folderAtRoot/folder1/node_modules                                                       |
| //vda1cs4850/folderAtRoot/folder1/folder2/node_modules/@types                                        | //vda1cs4850/folderAtRoot/folder1/folder2/node_modules                                               |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                               |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules                       |
| //vda1cs4850/users/username/folderAtRoot/folder1/node_modules/@types                                 | //vda1cs4850/users/username/folderAtRoot/folder1/node_modules                                        |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules                                |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules                        |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules        |
| //vda1cs4850/user/username/node_modules/@types                                                       | //vda1cs4850/user/username/node_modules                                                              |
| //vda1cs4850/user/username/folderAtRoot/node_modules/@types                                          | //vda1cs4850/user/username/folderAtRoot/node_modules                                                 |
| //vda1cs4850/user/username/folderAtRoot/folder1/node_modules/@types                                  | //vda1cs4850/user/username/folderAtRoot/folder1                                                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | //vda1cs4850/user/username/folderAtRoot/folder1                                                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | //vda1cs4850/user/username/folderAtRoot/folder1                                                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | //vda1cs4850/user/username/folderAtRoot/folder1                                                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | //vda1cs4850/user/username/folderAtRoot/folder1                                                      |

## RootDirForResolution: //vda1cs4850/user/username/folderAtRoot/folder1/folder2

Root: //vda1cs4850/user/username/folderAtRoot/folder1/folder2

| Directory                                                                                            | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                                  |
| ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| //vda1cs4850/folderAtRoot/folder1/node_modules/@types                                                | //vda1cs4850/folderAtRoot/folder1/node_modules                                                       |
| //vda1cs4850/folderAtRoot/folder1/folder2/node_modules/@types                                        | //vda1cs4850/folderAtRoot/folder1/folder2/node_modules                                               |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                               |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules                       |
| //vda1cs4850/users/username/folderAtRoot/folder1/node_modules/@types                                 | //vda1cs4850/users/username/folderAtRoot/folder1/node_modules                                        |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules                                |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules                        |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules        |
| //vda1cs4850/user/username/node_modules/@types                                                       | //vda1cs4850/user/username/node_modules                                                              |
| //vda1cs4850/user/username/folderAtRoot/node_modules/@types                                          | //vda1cs4850/user/username/folderAtRoot/node_modules                                                 |
| //vda1cs4850/user/username/folderAtRoot/folder1/node_modules/@types                                  | //vda1cs4850/user/username/folderAtRoot/folder1/node_modules                                         |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | //vda1cs4850/user/username/folderAtRoot/folder1/folder2                                              |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | //vda1cs4850/user/username/folderAtRoot/folder1/folder2                                              |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | //vda1cs4850/user/username/folderAtRoot/folder1/folder2                                              |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | //vda1cs4850/user/username/folderAtRoot/folder1/folder2                                              |

## RootDirForResolution: //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3

Root: //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3

| Directory                                                                                            | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                                  |
| ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| //vda1cs4850/folderAtRoot/folder1/node_modules/@types                                                | //vda1cs4850/folderAtRoot/folder1/node_modules                                                       |
| //vda1cs4850/folderAtRoot/folder1/folder2/node_modules/@types                                        | //vda1cs4850/folderAtRoot/folder1/folder2/node_modules                                               |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                               |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules                       |
| //vda1cs4850/users/username/folderAtRoot/folder1/node_modules/@types                                 | //vda1cs4850/users/username/folderAtRoot/folder1/node_modules                                        |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules                                |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules                        |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules        |
| //vda1cs4850/user/username/node_modules/@types                                                       | //vda1cs4850/user/username/node_modules                                                              |
| //vda1cs4850/user/username/folderAtRoot/node_modules/@types                                          | //vda1cs4850/user/username/folderAtRoot/node_modules                                                 |
| //vda1cs4850/user/username/folderAtRoot/folder1/node_modules/@types                                  | //vda1cs4850/user/username/folderAtRoot/folder1/node_modules                                         |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules                                 |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3                                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3                                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3                                      |

## RootDirForResolution: //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4

Root: //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4

| Directory                                                                                            | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                                  |
| ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| //vda1cs4850/folderAtRoot/folder1/node_modules/@types                                                | //vda1cs4850/folderAtRoot/folder1/node_modules                                                       |
| //vda1cs4850/folderAtRoot/folder1/folder2/node_modules/@types                                        | //vda1cs4850/folderAtRoot/folder1/folder2/node_modules                                               |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                               |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules                       |
| //vda1cs4850/users/username/folderAtRoot/folder1/node_modules/@types                                 | //vda1cs4850/users/username/folderAtRoot/folder1/node_modules                                        |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules                                |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules                        |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules        |
| //vda1cs4850/user/username/node_modules/@types                                                       | //vda1cs4850/user/username/node_modules                                                              |
| //vda1cs4850/user/username/folderAtRoot/node_modules/@types                                          | //vda1cs4850/user/username/folderAtRoot/node_modules                                                 |
| //vda1cs4850/user/username/folderAtRoot/folder1/node_modules/@types                                  | //vda1cs4850/user/username/folderAtRoot/folder1/node_modules                                         |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules                                 |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules                         |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4                              |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4                              |

## RootDirForResolution: //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

Root: //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

| Directory                                                                                            | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                                  |
| ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| //vda1cs4850/folderAtRoot/folder1/node_modules/@types                                                | //vda1cs4850/folderAtRoot/folder1/node_modules                                                       |
| //vda1cs4850/folderAtRoot/folder1/folder2/node_modules/@types                                        | //vda1cs4850/folderAtRoot/folder1/folder2/node_modules                                               |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                               |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules                       |
| //vda1cs4850/users/username/folderAtRoot/folder1/node_modules/@types                                 | //vda1cs4850/users/username/folderAtRoot/folder1/node_modules                                        |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules                                |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules                        |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules        |
| //vda1cs4850/user/username/node_modules/@types                                                       | //vda1cs4850/user/username/node_modules                                                              |
| //vda1cs4850/user/username/folderAtRoot/node_modules/@types                                          | //vda1cs4850/user/username/folderAtRoot/node_modules                                                 |
| //vda1cs4850/user/username/folderAtRoot/folder1/node_modules/@types                                  | //vda1cs4850/user/username/folderAtRoot/folder1/node_modules                                         |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules                                 |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules                         |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                 |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5                      |

## RootDirForResolution: undefined

Root: undefined

| Directory                                                                                            | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                                  |
| ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| //vda1cs4850/folderAtRoot/folder1/node_modules/@types                                                | //vda1cs4850/folderAtRoot/folder1/node_modules                                                       |
| //vda1cs4850/folderAtRoot/folder1/folder2/node_modules/@types                                        | //vda1cs4850/folderAtRoot/folder1/folder2/node_modules                                               |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | //vda1cs4850/folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                               |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules                       |
| //vda1cs4850/users/username/folderAtRoot/folder1/node_modules/@types                                 | //vda1cs4850/users/username/folderAtRoot/folder1/node_modules                                        |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | //vda1cs4850/users/username/folderAtRoot/folder1/folder2/node_modules                                |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/node_modules                        |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules        |
| //vda1cs4850/user/username/node_modules/@types                                                       | //vda1cs4850/user/username/node_modules                                                              |
| //vda1cs4850/user/username/folderAtRoot/node_modules/@types                                          | //vda1cs4850/user/username/folderAtRoot/node_modules                                                 |
| //vda1cs4850/user/username/folderAtRoot/folder1/node_modules/@types                                  | //vda1cs4850/user/username/folderAtRoot/folder1/node_modules                                         |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | //vda1cs4850/user/username/folderAtRoot/folder1/folder2/node_modules                                 |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/node_modules                         |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                 |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules         |

