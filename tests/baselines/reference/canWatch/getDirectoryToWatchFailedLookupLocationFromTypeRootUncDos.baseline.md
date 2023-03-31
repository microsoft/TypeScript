# getDirectoryToWatchFailedLookupLocationFromTypeRoot

When watched typeRoot handler is invoked, this method determines the directory for which the failedLookupLocation would need to be invalidated.
Since this is invoked only when watching default typeRoot and is used to handle flaky directory watchers, this is used as a fail safe where if failed lookup starts with returned directory we will invalidate that resolution.

## Testing for UncDos root: //vda1cs4850/c$

## RootDirForResolution: //vda1cs4850/c$

Root: //vda1cs4850/c$

| Directory                                                                                               | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                                     |
| ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| //vda1cs4850/c$/node_modules/@types                                                                     | //vda1cs4850/c$                                                                                         |
| //vda1cs4850/c$/folderAtRoot/folder1/node_modules/@types                                                | //vda1cs4850/c$                                                                                         |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/node_modules/@types                                        | //vda1cs4850/c$                                                                                         |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | //vda1cs4850/c$                                                                                         |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | //vda1cs4850/c$                                                                                         |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | //vda1cs4850/c$                                                                                         |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/node_modules/@types                                 | //vda1cs4850/c$                                                                                         |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | //vda1cs4850/c$                                                                                         |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | //vda1cs4850/c$                                                                                         |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | //vda1cs4850/c$                                                                                         |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | //vda1cs4850/c$                                                                                         |
| //vda1cs4850/c$/user/username/node_modules/@types                                                       | //vda1cs4850/c$                                                                                         |
| //vda1cs4850/c$/user/username/folderAtRoot/node_modules/@types                                          | //vda1cs4850/c$                                                                                         |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/node_modules/@types                                  | //vda1cs4850/c$                                                                                         |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | //vda1cs4850/c$                                                                                         |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | //vda1cs4850/c$                                                                                         |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | //vda1cs4850/c$                                                                                         |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | //vda1cs4850/c$                                                                                         |

## RootDirForResolution: //vda1cs4850/c$/folderAtRoot

Root: //vda1cs4850/c$/folderAtRoot

| Directory                                                                                               | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                                     |
| ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| //vda1cs4850/c$/folderAtRoot/node_modules/@types                                                        | //vda1cs4850/c$/folderAtRoot                                                                            |
| //vda1cs4850/c$/folderAtRoot/folder1/node_modules/@types                                                | //vda1cs4850/c$/folderAtRoot                                                                            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/node_modules/@types                                        | //vda1cs4850/c$/folderAtRoot                                                                            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | //vda1cs4850/c$/folderAtRoot                                                                            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | //vda1cs4850/c$/folderAtRoot                                                                            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | //vda1cs4850/c$/folderAtRoot                                                                            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/node_modules/@types                                 | //vda1cs4850/c$/users/username/folderAtRoot/folder1/node_modules                                        |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/node_modules                                |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/node_modules                        |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules        |
| //vda1cs4850/c$/user/username/node_modules/@types                                                       | //vda1cs4850/c$/user/username/node_modules                                                              |
| //vda1cs4850/c$/user/username/folderAtRoot/node_modules/@types                                          | //vda1cs4850/c$/user/username/folderAtRoot/node_modules                                                 |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/node_modules/@types                                  | //vda1cs4850/c$/user/username/folderAtRoot/folder1/node_modules                                         |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/node_modules                                 |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/node_modules                         |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                 |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules         |

## RootDirForResolution: //vda1cs4850/c$/folderAtRoot/folder1

Root: //vda1cs4850/c$/folderAtRoot/folder1

| Directory                                                                                               | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                                     |
| ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| //vda1cs4850/c$/folderAtRoot/folder1/node_modules/@types                                                | //vda1cs4850/c$/folderAtRoot/folder1                                                                    |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/node_modules/@types                                        | //vda1cs4850/c$/folderAtRoot/folder1                                                                    |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | //vda1cs4850/c$/folderAtRoot/folder1                                                                    |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | //vda1cs4850/c$/folderAtRoot/folder1                                                                    |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | //vda1cs4850/c$/folderAtRoot/folder1                                                                    |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/node_modules/@types                                 | //vda1cs4850/c$/users/username/folderAtRoot/folder1/node_modules                                        |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/node_modules                                |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/node_modules                        |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules        |
| //vda1cs4850/c$/user/username/node_modules/@types                                                       | //vda1cs4850/c$/user/username/node_modules                                                              |
| //vda1cs4850/c$/user/username/folderAtRoot/node_modules/@types                                          | //vda1cs4850/c$/user/username/folderAtRoot/node_modules                                                 |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/node_modules/@types                                  | //vda1cs4850/c$/user/username/folderAtRoot/folder1/node_modules                                         |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/node_modules                                 |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/node_modules                         |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                 |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules         |

## RootDirForResolution: //vda1cs4850/c$/folderAtRoot/folder1/folder2

Root: //vda1cs4850/c$/folderAtRoot/folder1/folder2

| Directory                                                                                               | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                                     |
| ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| //vda1cs4850/c$/folderAtRoot/folder1/node_modules/@types                                                | //vda1cs4850/c$/folderAtRoot/folder1/node_modules                                                       |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/node_modules/@types                                        | //vda1cs4850/c$/folderAtRoot/folder1/folder2                                                            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | //vda1cs4850/c$/folderAtRoot/folder1/folder2                                                            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | //vda1cs4850/c$/folderAtRoot/folder1/folder2                                                            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | //vda1cs4850/c$/folderAtRoot/folder1/folder2                                                            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/node_modules/@types                                 | //vda1cs4850/c$/users/username/folderAtRoot/folder1/node_modules                                        |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/node_modules                                |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/node_modules                        |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules        |
| //vda1cs4850/c$/user/username/node_modules/@types                                                       | //vda1cs4850/c$/user/username/node_modules                                                              |
| //vda1cs4850/c$/user/username/folderAtRoot/node_modules/@types                                          | //vda1cs4850/c$/user/username/folderAtRoot/node_modules                                                 |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/node_modules/@types                                  | //vda1cs4850/c$/user/username/folderAtRoot/folder1/node_modules                                         |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/node_modules                                 |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/node_modules                         |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                 |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules         |

## RootDirForResolution: //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3

Root: //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3

| Directory                                                                                               | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                                     |
| ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| //vda1cs4850/c$/folderAtRoot/folder1/node_modules/@types                                                | //vda1cs4850/c$/folderAtRoot/folder1/node_modules                                                       |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/node_modules/@types                                        | //vda1cs4850/c$/folderAtRoot/folder1/folder2/node_modules                                               |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3                                                    |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3                                                    |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3                                                    |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/node_modules/@types                                 | //vda1cs4850/c$/users/username/folderAtRoot/folder1/node_modules                                        |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/node_modules                                |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/node_modules                        |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules        |
| //vda1cs4850/c$/user/username/node_modules/@types                                                       | //vda1cs4850/c$/user/username/node_modules                                                              |
| //vda1cs4850/c$/user/username/folderAtRoot/node_modules/@types                                          | //vda1cs4850/c$/user/username/folderAtRoot/node_modules                                                 |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/node_modules/@types                                  | //vda1cs4850/c$/user/username/folderAtRoot/folder1/node_modules                                         |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/node_modules                                 |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/node_modules                         |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                 |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules         |

## RootDirForResolution: //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4

Root: //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4

| Directory                                                                                               | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                                     |
| ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| //vda1cs4850/c$/folderAtRoot/folder1/node_modules/@types                                                | //vda1cs4850/c$/folderAtRoot/folder1/node_modules                                                       |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/node_modules/@types                                        | //vda1cs4850/c$/folderAtRoot/folder1/folder2/node_modules                                               |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4                                            |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4                                            |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/node_modules/@types                                 | //vda1cs4850/c$/users/username/folderAtRoot/folder1/node_modules                                        |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/node_modules                                |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/node_modules                        |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules        |
| //vda1cs4850/c$/user/username/node_modules/@types                                                       | //vda1cs4850/c$/user/username/node_modules                                                              |
| //vda1cs4850/c$/user/username/folderAtRoot/node_modules/@types                                          | //vda1cs4850/c$/user/username/folderAtRoot/node_modules                                                 |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/node_modules/@types                                  | //vda1cs4850/c$/user/username/folderAtRoot/folder1/node_modules                                         |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/node_modules                                 |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/node_modules                         |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                 |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules         |

## RootDirForResolution: //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5

Root: //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5

| Directory                                                                                               | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                                     |
| ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| //vda1cs4850/c$/folderAtRoot/folder1/node_modules/@types                                                | //vda1cs4850/c$/folderAtRoot/folder1/node_modules                                                       |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/node_modules/@types                                        | //vda1cs4850/c$/folderAtRoot/folder1/folder2/node_modules                                               |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                               |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5                                    |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/node_modules/@types                                 | //vda1cs4850/c$/users/username/folderAtRoot/folder1/node_modules                                        |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/node_modules                                |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/node_modules                        |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules        |
| //vda1cs4850/c$/user/username/node_modules/@types                                                       | //vda1cs4850/c$/user/username/node_modules                                                              |
| //vda1cs4850/c$/user/username/folderAtRoot/node_modules/@types                                          | //vda1cs4850/c$/user/username/folderAtRoot/node_modules                                                 |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/node_modules/@types                                  | //vda1cs4850/c$/user/username/folderAtRoot/folder1/node_modules                                         |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/node_modules                                 |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/node_modules                         |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                 |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules         |

## RootDirForResolution: //vda1cs4850/c$/users

Root: //vda1cs4850/c$/users

| Directory                                                                                               | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                                     |
| ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| //vda1cs4850/c$/folderAtRoot/folder1/node_modules/@types                                                | //vda1cs4850/c$/folderAtRoot/folder1/node_modules                                                       |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/node_modules/@types                                        | //vda1cs4850/c$/folderAtRoot/folder1/folder2/node_modules                                               |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                               |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules                       |
| //vda1cs4850/c$/users/node_modules/@types                                                               | //vda1cs4850/c$/users                                                                                   |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/node_modules/@types                                 | //vda1cs4850/c$/users                                                                                   |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | //vda1cs4850/c$/users                                                                                   |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | //vda1cs4850/c$/users                                                                                   |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | //vda1cs4850/c$/users                                                                                   |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | //vda1cs4850/c$/users                                                                                   |
| //vda1cs4850/c$/user/username/node_modules/@types                                                       | //vda1cs4850/c$/user/username/node_modules                                                              |
| //vda1cs4850/c$/user/username/folderAtRoot/node_modules/@types                                          | //vda1cs4850/c$/user/username/folderAtRoot/node_modules                                                 |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/node_modules/@types                                  | //vda1cs4850/c$/user/username/folderAtRoot/folder1/node_modules                                         |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/node_modules                                 |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/node_modules                         |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                 |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules         |

## RootDirForResolution: //vda1cs4850/c$/users/username

Root: //vda1cs4850/c$/users/username

| Directory                                                                                               | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                                     |
| ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| //vda1cs4850/c$/folderAtRoot/folder1/node_modules/@types                                                | //vda1cs4850/c$/folderAtRoot/folder1/node_modules                                                       |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/node_modules/@types                                        | //vda1cs4850/c$/folderAtRoot/folder1/folder2/node_modules                                               |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                               |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules                       |
| //vda1cs4850/c$/users/username/node_modules/@types                                                      | //vda1cs4850/c$/users/username                                                                          |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/node_modules/@types                                 | //vda1cs4850/c$/users/username                                                                          |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | //vda1cs4850/c$/users/username                                                                          |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | //vda1cs4850/c$/users/username                                                                          |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | //vda1cs4850/c$/users/username                                                                          |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | //vda1cs4850/c$/users/username                                                                          |
| //vda1cs4850/c$/user/username/node_modules/@types                                                       | //vda1cs4850/c$/user/username/node_modules                                                              |
| //vda1cs4850/c$/user/username/folderAtRoot/node_modules/@types                                          | //vda1cs4850/c$/user/username/folderAtRoot/node_modules                                                 |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/node_modules/@types                                  | //vda1cs4850/c$/user/username/folderAtRoot/folder1/node_modules                                         |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/node_modules                                 |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/node_modules                         |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                 |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules         |

## RootDirForResolution: //vda1cs4850/c$/users/username/folderAtRoot

Root: //vda1cs4850/c$/users/username/folderAtRoot

| Directory                                                                                               | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                                     |
| ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| //vda1cs4850/c$/folderAtRoot/folder1/node_modules/@types                                                | //vda1cs4850/c$/folderAtRoot/folder1/node_modules                                                       |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/node_modules/@types                                        | //vda1cs4850/c$/folderAtRoot/folder1/folder2/node_modules                                               |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                               |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules                       |
| //vda1cs4850/c$/users/username/folderAtRoot/node_modules/@types                                         | //vda1cs4850/c$/users/username/folderAtRoot                                                             |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/node_modules/@types                                 | //vda1cs4850/c$/users/username/folderAtRoot                                                             |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | //vda1cs4850/c$/users/username/folderAtRoot                                                             |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | //vda1cs4850/c$/users/username/folderAtRoot                                                             |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | //vda1cs4850/c$/users/username/folderAtRoot                                                             |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | //vda1cs4850/c$/users/username/folderAtRoot                                                             |
| //vda1cs4850/c$/user/username/node_modules/@types                                                       | //vda1cs4850/c$/user/username/node_modules                                                              |
| //vda1cs4850/c$/user/username/folderAtRoot/node_modules/@types                                          | //vda1cs4850/c$/user/username/folderAtRoot/node_modules                                                 |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/node_modules/@types                                  | //vda1cs4850/c$/user/username/folderAtRoot/folder1/node_modules                                         |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/node_modules                                 |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/node_modules                         |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                 |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules         |

## RootDirForResolution: //vda1cs4850/c$/users/username/folderAtRoot/folder1

Root: //vda1cs4850/c$/users/username/folderAtRoot/folder1

| Directory                                                                                               | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                                     |
| ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| //vda1cs4850/c$/folderAtRoot/folder1/node_modules/@types                                                | //vda1cs4850/c$/folderAtRoot/folder1/node_modules                                                       |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/node_modules/@types                                        | //vda1cs4850/c$/folderAtRoot/folder1/folder2/node_modules                                               |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                               |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules                       |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/node_modules/@types                                 | //vda1cs4850/c$/users/username/folderAtRoot/folder1                                                     |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | //vda1cs4850/c$/users/username/folderAtRoot/folder1                                                     |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | //vda1cs4850/c$/users/username/folderAtRoot/folder1                                                     |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | //vda1cs4850/c$/users/username/folderAtRoot/folder1                                                     |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | //vda1cs4850/c$/users/username/folderAtRoot/folder1                                                     |
| //vda1cs4850/c$/user/username/node_modules/@types                                                       | //vda1cs4850/c$/user/username/node_modules                                                              |
| //vda1cs4850/c$/user/username/folderAtRoot/node_modules/@types                                          | //vda1cs4850/c$/user/username/folderAtRoot/node_modules                                                 |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/node_modules/@types                                  | //vda1cs4850/c$/user/username/folderAtRoot/folder1/node_modules                                         |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/node_modules                                 |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/node_modules                         |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                 |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules         |

## RootDirForResolution: //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2

Root: //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2

| Directory                                                                                               | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                                     |
| ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| //vda1cs4850/c$/folderAtRoot/folder1/node_modules/@types                                                | //vda1cs4850/c$/folderAtRoot/folder1/node_modules                                                       |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/node_modules/@types                                        | //vda1cs4850/c$/folderAtRoot/folder1/folder2/node_modules                                               |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                               |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules                       |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/node_modules/@types                                 | //vda1cs4850/c$/users/username/folderAtRoot/folder1/node_modules                                        |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2                                             |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2                                             |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2                                             |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2                                             |
| //vda1cs4850/c$/user/username/node_modules/@types                                                       | //vda1cs4850/c$/user/username/node_modules                                                              |
| //vda1cs4850/c$/user/username/folderAtRoot/node_modules/@types                                          | //vda1cs4850/c$/user/username/folderAtRoot/node_modules                                                 |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/node_modules/@types                                  | //vda1cs4850/c$/user/username/folderAtRoot/folder1/node_modules                                         |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/node_modules                                 |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/node_modules                         |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                 |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules         |

## RootDirForResolution: //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3

Root: //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3

| Directory                                                                                               | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                                     |
| ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| //vda1cs4850/c$/folderAtRoot/folder1/node_modules/@types                                                | //vda1cs4850/c$/folderAtRoot/folder1/node_modules                                                       |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/node_modules/@types                                        | //vda1cs4850/c$/folderAtRoot/folder1/folder2/node_modules                                               |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                               |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules                       |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/node_modules/@types                                 | //vda1cs4850/c$/users/username/folderAtRoot/folder1/node_modules                                        |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/node_modules                                |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3                                     |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3                                     |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3                                     |
| //vda1cs4850/c$/user/username/node_modules/@types                                                       | //vda1cs4850/c$/user/username/node_modules                                                              |
| //vda1cs4850/c$/user/username/folderAtRoot/node_modules/@types                                          | //vda1cs4850/c$/user/username/folderAtRoot/node_modules                                                 |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/node_modules/@types                                  | //vda1cs4850/c$/user/username/folderAtRoot/folder1/node_modules                                         |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/node_modules                                 |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/node_modules                         |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                 |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules         |

## RootDirForResolution: //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4

Root: //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4

| Directory                                                                                               | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                                     |
| ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| //vda1cs4850/c$/folderAtRoot/folder1/node_modules/@types                                                | //vda1cs4850/c$/folderAtRoot/folder1/node_modules                                                       |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/node_modules/@types                                        | //vda1cs4850/c$/folderAtRoot/folder1/folder2/node_modules                                               |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                               |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules                       |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/node_modules/@types                                 | //vda1cs4850/c$/users/username/folderAtRoot/folder1/node_modules                                        |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/node_modules                                |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/node_modules                        |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4                             |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4                             |
| //vda1cs4850/c$/user/username/node_modules/@types                                                       | //vda1cs4850/c$/user/username/node_modules                                                              |
| //vda1cs4850/c$/user/username/folderAtRoot/node_modules/@types                                          | //vda1cs4850/c$/user/username/folderAtRoot/node_modules                                                 |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/node_modules/@types                                  | //vda1cs4850/c$/user/username/folderAtRoot/folder1/node_modules                                         |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/node_modules                                 |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/node_modules                         |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                 |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules         |

## RootDirForResolution: //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

Root: //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

| Directory                                                                                               | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                                     |
| ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| //vda1cs4850/c$/folderAtRoot/folder1/node_modules/@types                                                | //vda1cs4850/c$/folderAtRoot/folder1/node_modules                                                       |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/node_modules/@types                                        | //vda1cs4850/c$/folderAtRoot/folder1/folder2/node_modules                                               |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                               |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules                       |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/node_modules/@types                                 | //vda1cs4850/c$/users/username/folderAtRoot/folder1/node_modules                                        |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/node_modules                                |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/node_modules                        |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5                     |
| //vda1cs4850/c$/user/username/node_modules/@types                                                       | //vda1cs4850/c$/user/username/node_modules                                                              |
| //vda1cs4850/c$/user/username/folderAtRoot/node_modules/@types                                          | //vda1cs4850/c$/user/username/folderAtRoot/node_modules                                                 |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/node_modules/@types                                  | //vda1cs4850/c$/user/username/folderAtRoot/folder1/node_modules                                         |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/node_modules                                 |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/node_modules                         |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                 |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules         |

## RootDirForResolution: //vda1cs4850/c$/user

Root: //vda1cs4850/c$/user

| Directory                                                                                               | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                                     |
| ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| //vda1cs4850/c$/folderAtRoot/folder1/node_modules/@types                                                | //vda1cs4850/c$/folderAtRoot/folder1/node_modules                                                       |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/node_modules/@types                                        | //vda1cs4850/c$/folderAtRoot/folder1/folder2/node_modules                                               |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                               |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules                       |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/node_modules/@types                                 | //vda1cs4850/c$/users/username/folderAtRoot/folder1/node_modules                                        |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/node_modules                                |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/node_modules                        |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules        |
| //vda1cs4850/c$/user/node_modules/@types                                                                | //vda1cs4850/c$/user                                                                                    |
| //vda1cs4850/c$/user/username/node_modules/@types                                                       | //vda1cs4850/c$/user                                                                                    |
| //vda1cs4850/c$/user/username/folderAtRoot/node_modules/@types                                          | //vda1cs4850/c$/user                                                                                    |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/node_modules/@types                                  | //vda1cs4850/c$/user                                                                                    |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | //vda1cs4850/c$/user                                                                                    |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | //vda1cs4850/c$/user                                                                                    |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | //vda1cs4850/c$/user                                                                                    |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | //vda1cs4850/c$/user                                                                                    |

## RootDirForResolution: //vda1cs4850/c$/user/username

Root: //vda1cs4850/c$/user/username

| Directory                                                                                               | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                                     |
| ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| //vda1cs4850/c$/folderAtRoot/folder1/node_modules/@types                                                | //vda1cs4850/c$/folderAtRoot/folder1/node_modules                                                       |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/node_modules/@types                                        | //vda1cs4850/c$/folderAtRoot/folder1/folder2/node_modules                                               |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                               |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules                       |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/node_modules/@types                                 | //vda1cs4850/c$/users/username/folderAtRoot/folder1/node_modules                                        |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/node_modules                                |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/node_modules                        |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules        |
| //vda1cs4850/c$/user/username/node_modules/@types                                                       | //vda1cs4850/c$/user/username                                                                           |
| //vda1cs4850/c$/user/username/folderAtRoot/node_modules/@types                                          | //vda1cs4850/c$/user/username                                                                           |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/node_modules/@types                                  | //vda1cs4850/c$/user/username                                                                           |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | //vda1cs4850/c$/user/username                                                                           |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | //vda1cs4850/c$/user/username                                                                           |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | //vda1cs4850/c$/user/username                                                                           |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | //vda1cs4850/c$/user/username                                                                           |

## RootDirForResolution: //vda1cs4850/c$/user/username/folderAtRoot

Root: //vda1cs4850/c$/user/username/folderAtRoot

| Directory                                                                                               | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                                     |
| ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| //vda1cs4850/c$/folderAtRoot/folder1/node_modules/@types                                                | //vda1cs4850/c$/folderAtRoot/folder1/node_modules                                                       |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/node_modules/@types                                        | //vda1cs4850/c$/folderAtRoot/folder1/folder2/node_modules                                               |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                               |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules                       |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/node_modules/@types                                 | //vda1cs4850/c$/users/username/folderAtRoot/folder1/node_modules                                        |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/node_modules                                |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/node_modules                        |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules        |
| //vda1cs4850/c$/user/username/node_modules/@types                                                       | //vda1cs4850/c$/user/username/node_modules                                                              |
| //vda1cs4850/c$/user/username/folderAtRoot/node_modules/@types                                          | //vda1cs4850/c$/user/username/folderAtRoot                                                              |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/node_modules/@types                                  | //vda1cs4850/c$/user/username/folderAtRoot                                                              |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | //vda1cs4850/c$/user/username/folderAtRoot                                                              |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | //vda1cs4850/c$/user/username/folderAtRoot                                                              |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | //vda1cs4850/c$/user/username/folderAtRoot                                                              |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | //vda1cs4850/c$/user/username/folderAtRoot                                                              |

## RootDirForResolution: //vda1cs4850/c$/user/username/folderAtRoot/folder1

Root: //vda1cs4850/c$/user/username/folderAtRoot/folder1

| Directory                                                                                               | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                                     |
| ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| //vda1cs4850/c$/folderAtRoot/folder1/node_modules/@types                                                | //vda1cs4850/c$/folderAtRoot/folder1/node_modules                                                       |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/node_modules/@types                                        | //vda1cs4850/c$/folderAtRoot/folder1/folder2/node_modules                                               |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                               |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules                       |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/node_modules/@types                                 | //vda1cs4850/c$/users/username/folderAtRoot/folder1/node_modules                                        |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/node_modules                                |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/node_modules                        |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules        |
| //vda1cs4850/c$/user/username/node_modules/@types                                                       | //vda1cs4850/c$/user/username/node_modules                                                              |
| //vda1cs4850/c$/user/username/folderAtRoot/node_modules/@types                                          | //vda1cs4850/c$/user/username/folderAtRoot/node_modules                                                 |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/node_modules/@types                                  | //vda1cs4850/c$/user/username/folderAtRoot/folder1                                                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | //vda1cs4850/c$/user/username/folderAtRoot/folder1                                                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | //vda1cs4850/c$/user/username/folderAtRoot/folder1                                                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | //vda1cs4850/c$/user/username/folderAtRoot/folder1                                                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | //vda1cs4850/c$/user/username/folderAtRoot/folder1                                                      |

## RootDirForResolution: //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2

Root: //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2

| Directory                                                                                               | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                                     |
| ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| //vda1cs4850/c$/folderAtRoot/folder1/node_modules/@types                                                | //vda1cs4850/c$/folderAtRoot/folder1/node_modules                                                       |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/node_modules/@types                                        | //vda1cs4850/c$/folderAtRoot/folder1/folder2/node_modules                                               |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                               |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules                       |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/node_modules/@types                                 | //vda1cs4850/c$/users/username/folderAtRoot/folder1/node_modules                                        |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/node_modules                                |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/node_modules                        |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules        |
| //vda1cs4850/c$/user/username/node_modules/@types                                                       | //vda1cs4850/c$/user/username/node_modules                                                              |
| //vda1cs4850/c$/user/username/folderAtRoot/node_modules/@types                                          | //vda1cs4850/c$/user/username/folderAtRoot/node_modules                                                 |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/node_modules/@types                                  | //vda1cs4850/c$/user/username/folderAtRoot/folder1/node_modules                                         |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2                                              |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2                                              |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2                                              |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2                                              |

## RootDirForResolution: //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3

Root: //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3

| Directory                                                                                               | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                                     |
| ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| //vda1cs4850/c$/folderAtRoot/folder1/node_modules/@types                                                | //vda1cs4850/c$/folderAtRoot/folder1/node_modules                                                       |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/node_modules/@types                                        | //vda1cs4850/c$/folderAtRoot/folder1/folder2/node_modules                                               |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                               |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules                       |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/node_modules/@types                                 | //vda1cs4850/c$/users/username/folderAtRoot/folder1/node_modules                                        |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/node_modules                                |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/node_modules                        |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules        |
| //vda1cs4850/c$/user/username/node_modules/@types                                                       | //vda1cs4850/c$/user/username/node_modules                                                              |
| //vda1cs4850/c$/user/username/folderAtRoot/node_modules/@types                                          | //vda1cs4850/c$/user/username/folderAtRoot/node_modules                                                 |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/node_modules/@types                                  | //vda1cs4850/c$/user/username/folderAtRoot/folder1/node_modules                                         |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/node_modules                                 |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3                                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3                                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3                                      |

## RootDirForResolution: //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4

Root: //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4

| Directory                                                                                               | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                                     |
| ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| //vda1cs4850/c$/folderAtRoot/folder1/node_modules/@types                                                | //vda1cs4850/c$/folderAtRoot/folder1/node_modules                                                       |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/node_modules/@types                                        | //vda1cs4850/c$/folderAtRoot/folder1/folder2/node_modules                                               |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                               |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules                       |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/node_modules/@types                                 | //vda1cs4850/c$/users/username/folderAtRoot/folder1/node_modules                                        |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/node_modules                                |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/node_modules                        |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules        |
| //vda1cs4850/c$/user/username/node_modules/@types                                                       | //vda1cs4850/c$/user/username/node_modules                                                              |
| //vda1cs4850/c$/user/username/folderAtRoot/node_modules/@types                                          | //vda1cs4850/c$/user/username/folderAtRoot/node_modules                                                 |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/node_modules/@types                                  | //vda1cs4850/c$/user/username/folderAtRoot/folder1/node_modules                                         |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/node_modules                                 |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/node_modules                         |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4                              |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4                              |

## RootDirForResolution: //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

Root: //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

| Directory                                                                                               | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                                     |
| ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| //vda1cs4850/c$/folderAtRoot/folder1/node_modules/@types                                                | //vda1cs4850/c$/folderAtRoot/folder1/node_modules                                                       |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/node_modules/@types                                        | //vda1cs4850/c$/folderAtRoot/folder1/folder2/node_modules                                               |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                               |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules                       |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/node_modules/@types                                 | //vda1cs4850/c$/users/username/folderAtRoot/folder1/node_modules                                        |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/node_modules                                |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/node_modules                        |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules        |
| //vda1cs4850/c$/user/username/node_modules/@types                                                       | //vda1cs4850/c$/user/username/node_modules                                                              |
| //vda1cs4850/c$/user/username/folderAtRoot/node_modules/@types                                          | //vda1cs4850/c$/user/username/folderAtRoot/node_modules                                                 |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/node_modules/@types                                  | //vda1cs4850/c$/user/username/folderAtRoot/folder1/node_modules                                         |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/node_modules                                 |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/node_modules                         |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                 |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5                      |

## RootDirForResolution: undefined

Root: undefined

| Directory                                                                                               | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                                     |
| ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| //vda1cs4850/c$/folderAtRoot/folder1/node_modules/@types                                                | //vda1cs4850/c$/folderAtRoot/folder1/node_modules                                                       |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/node_modules/@types                                        | //vda1cs4850/c$/folderAtRoot/folder1/folder2/node_modules                                               |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                               |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules                       |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/node_modules/@types                                 | //vda1cs4850/c$/users/username/folderAtRoot/folder1/node_modules                                        |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/node_modules                                |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/node_modules                        |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules        |
| //vda1cs4850/c$/user/username/node_modules/@types                                                       | //vda1cs4850/c$/user/username/node_modules                                                              |
| //vda1cs4850/c$/user/username/folderAtRoot/node_modules/@types                                          | //vda1cs4850/c$/user/username/folderAtRoot/node_modules                                                 |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/node_modules/@types                                  | //vda1cs4850/c$/user/username/folderAtRoot/folder1/node_modules                                         |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/node_modules                                 |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/node_modules                         |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                 |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules         |

