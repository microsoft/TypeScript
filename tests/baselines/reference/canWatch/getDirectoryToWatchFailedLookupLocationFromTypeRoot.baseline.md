# getDirectoryToWatchFailedLookupLocationFromTypeRoot

When watched typeRoot handler is invoked, this method determines the directory for which the failedLookupLocation would need to be invalidated.
Since this is invoked only when watching default typeRoot and is used to handle flaky directory watchers, this is used as a fail safe where if failed lookup starts with returned directory we will invalidate that resolution.

## Testing for root: /

## RootDirForResolution: / Root: 

| Directory                                                                                | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                      |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| /folderAtRoot/folder1/folder2/folder3/node_modules/@types                                |                                                                                          |
| /folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        |                                                                                          |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                |                                                                                          |
| /users/username/folderAtRoot/folder1/node_modules/@types                                 |                                                                                          |
| /users/username/folderAtRoot/folder1/folder2/node_modules/@types                         |                                                                                          |
| /users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 |                                                                                          |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         |                                                                                          |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types |                                                                                          |
| /user/username/folderAtRoot/folder1/node_modules/@types                                  |                                                                                          |
| /user/username/folderAtRoot/folder1/folder2/node_modules/@types                          |                                                                                          |
| /user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  |                                                                                          |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          |                                                                                          |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  |                                                                                          |

## RootDirForResolution: /folderAtRoot Root: /folderAtRoot

| Directory                                                                                | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                      |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| /folderAtRoot/node_modules/@types                                                        | /folderAtRoot                                                                            |
| /folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | /folderAtRoot                                                                            |
| /folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | /folderAtRoot                                                                            |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | /folderAtRoot                                                                            |
| /users/username/folderAtRoot/folder1/node_modules/@types                                 | /users/username/folderAtRoot/folder1/node_modules                                        |
| /users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | /users/username/folderAtRoot/folder1/folder2/node_modules                                |
| /users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | /users/username/folderAtRoot/folder1/folder2/folder3/node_modules                        |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules        |
| /user/username/folderAtRoot/folder1/node_modules/@types                                  | /user/username/folderAtRoot/folder1/node_modules                                         |
| /user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | /user/username/folderAtRoot/folder1/folder2/node_modules                                 |
| /user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | /user/username/folderAtRoot/folder1/folder2/folder3/node_modules                         |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                 |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules         |

## RootDirForResolution: /folderAtRoot/folder1 Root: /folderAtRoot/folder1

| Directory                                                                                | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                      |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| /folderAtRoot/folder1/node_modules/@types                                                | /folderAtRoot/folder1                                                                    |
| /folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | /folderAtRoot/folder1                                                                    |
| /folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | /folderAtRoot/folder1                                                                    |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | /folderAtRoot/folder1                                                                    |
| /users/username/folderAtRoot/folder1/node_modules/@types                                 | /users/username/folderAtRoot/folder1/node_modules                                        |
| /users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | /users/username/folderAtRoot/folder1/folder2/node_modules                                |
| /users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | /users/username/folderAtRoot/folder1/folder2/folder3/node_modules                        |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules        |
| /user/username/folderAtRoot/folder1/node_modules/@types                                  | /user/username/folderAtRoot/folder1/node_modules                                         |
| /user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | /user/username/folderAtRoot/folder1/folder2/node_modules                                 |
| /user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | /user/username/folderAtRoot/folder1/folder2/folder3/node_modules                         |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                 |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules         |

## RootDirForResolution: /folderAtRoot/folder1/folder2 Root: /folderAtRoot/folder1/folder2

| Directory                                                                                | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                      |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| /folderAtRoot/folder1/folder2/node_modules/@types                                        | /folderAtRoot/folder1/folder2                                                            |
| /folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | /folderAtRoot/folder1/folder2                                                            |
| /folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | /folderAtRoot/folder1/folder2                                                            |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | /folderAtRoot/folder1/folder2                                                            |
| /users/username/folderAtRoot/folder1/node_modules/@types                                 | /users/username/folderAtRoot/folder1/node_modules                                        |
| /users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | /users/username/folderAtRoot/folder1/folder2/node_modules                                |
| /users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | /users/username/folderAtRoot/folder1/folder2/folder3/node_modules                        |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules        |
| /user/username/folderAtRoot/folder1/node_modules/@types                                  | /user/username/folderAtRoot/folder1/node_modules                                         |
| /user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | /user/username/folderAtRoot/folder1/folder2/node_modules                                 |
| /user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | /user/username/folderAtRoot/folder1/folder2/folder3/node_modules                         |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                 |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules         |

## RootDirForResolution: /folderAtRoot/folder1/folder2/folder3 Root: /folderAtRoot/folder1/folder2/folder3

| Directory                                                                                | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                      |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| /folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | /folderAtRoot/folder1/folder2/folder3                                                    |
| /folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | /folderAtRoot/folder1/folder2/folder3                                                    |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | /folderAtRoot/folder1/folder2/folder3                                                    |
| /users/username/folderAtRoot/folder1/node_modules/@types                                 | /users/username/folderAtRoot/folder1/node_modules                                        |
| /users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | /users/username/folderAtRoot/folder1/folder2/node_modules                                |
| /users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | /users/username/folderAtRoot/folder1/folder2/folder3/node_modules                        |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules        |
| /user/username/folderAtRoot/folder1/node_modules/@types                                  | /user/username/folderAtRoot/folder1/node_modules                                         |
| /user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | /user/username/folderAtRoot/folder1/folder2/node_modules                                 |
| /user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | /user/username/folderAtRoot/folder1/folder2/folder3/node_modules                         |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                 |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules         |

## RootDirForResolution: /folderAtRoot/folder1/folder2/folder3/folder4 Root: /folderAtRoot/folder1/folder2/folder3/folder4

| Directory                                                                                | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                      |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| /folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | /folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| /folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | /folderAtRoot/folder1/folder2/folder3/folder4                                            |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | /folderAtRoot/folder1/folder2/folder3/folder4                                            |
| /users/username/folderAtRoot/folder1/node_modules/@types                                 | /users/username/folderAtRoot/folder1/node_modules                                        |
| /users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | /users/username/folderAtRoot/folder1/folder2/node_modules                                |
| /users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | /users/username/folderAtRoot/folder1/folder2/folder3/node_modules                        |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules        |
| /user/username/folderAtRoot/folder1/node_modules/@types                                  | /user/username/folderAtRoot/folder1/node_modules                                         |
| /user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | /user/username/folderAtRoot/folder1/folder2/node_modules                                 |
| /user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | /user/username/folderAtRoot/folder1/folder2/folder3/node_modules                         |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                 |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules         |

## RootDirForResolution: /folderAtRoot/folder1/folder2/folder3/folder4/folder5 Root: /folderAtRoot/folder1/folder2/folder3/folder4/folder5

| Directory                                                                                | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                      |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| /folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | /folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| /folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | /folderAtRoot/folder1/folder2/folder3/folder4/node_modules                               |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | /folderAtRoot/folder1/folder2/folder3/folder4/folder5                                    |
| /users/username/folderAtRoot/folder1/node_modules/@types                                 | /users/username/folderAtRoot/folder1/node_modules                                        |
| /users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | /users/username/folderAtRoot/folder1/folder2/node_modules                                |
| /users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | /users/username/folderAtRoot/folder1/folder2/folder3/node_modules                        |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules        |
| /user/username/folderAtRoot/folder1/node_modules/@types                                  | /user/username/folderAtRoot/folder1/node_modules                                         |
| /user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | /user/username/folderAtRoot/folder1/folder2/node_modules                                 |
| /user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | /user/username/folderAtRoot/folder1/folder2/folder3/node_modules                         |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                 |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules         |

## RootDirForResolution: /users Root: /users

| Directory                                                                                | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                      |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| /folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | /folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| /folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | /folderAtRoot/folder1/folder2/folder3/folder4/node_modules                               |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules                       |
| /users/node_modules/@types                                                               | /users                                                                                   |
| /users/username/folderAtRoot/folder1/node_modules/@types                                 | /users                                                                                   |
| /users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | /users                                                                                   |
| /users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | /users                                                                                   |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | /users                                                                                   |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | /users                                                                                   |
| /user/username/folderAtRoot/folder1/node_modules/@types                                  | /user/username/folderAtRoot/folder1/node_modules                                         |
| /user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | /user/username/folderAtRoot/folder1/folder2/node_modules                                 |
| /user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | /user/username/folderAtRoot/folder1/folder2/folder3/node_modules                         |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                 |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules         |

## RootDirForResolution: /users/username Root: /users/username

| Directory                                                                                | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                      |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| /folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | /folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| /folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | /folderAtRoot/folder1/folder2/folder3/folder4/node_modules                               |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules                       |
| /users/username/node_modules/@types                                                      | /users/username                                                                          |
| /users/username/folderAtRoot/folder1/node_modules/@types                                 | /users/username                                                                          |
| /users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | /users/username                                                                          |
| /users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | /users/username                                                                          |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | /users/username                                                                          |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | /users/username                                                                          |
| /user/username/folderAtRoot/folder1/node_modules/@types                                  | /user/username/folderAtRoot/folder1/node_modules                                         |
| /user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | /user/username/folderAtRoot/folder1/folder2/node_modules                                 |
| /user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | /user/username/folderAtRoot/folder1/folder2/folder3/node_modules                         |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                 |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules         |

## RootDirForResolution: /users/username/folderAtRoot Root: /users/username/folderAtRoot

| Directory                                                                                | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                      |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| /folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | /folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| /folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | /folderAtRoot/folder1/folder2/folder3/folder4/node_modules                               |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules                       |
| /users/username/folderAtRoot/node_modules/@types                                         | /users/username/folderAtRoot                                                             |
| /users/username/folderAtRoot/folder1/node_modules/@types                                 | /users/username/folderAtRoot                                                             |
| /users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | /users/username/folderAtRoot                                                             |
| /users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | /users/username/folderAtRoot                                                             |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | /users/username/folderAtRoot                                                             |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | /users/username/folderAtRoot                                                             |
| /user/username/folderAtRoot/folder1/node_modules/@types                                  | /user/username/folderAtRoot/folder1/node_modules                                         |
| /user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | /user/username/folderAtRoot/folder1/folder2/node_modules                                 |
| /user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | /user/username/folderAtRoot/folder1/folder2/folder3/node_modules                         |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                 |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules         |

## RootDirForResolution: /users/username/folderAtRoot/folder1 Root: /users/username/folderAtRoot/folder1

| Directory                                                                                | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                      |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| /folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | /folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| /folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | /folderAtRoot/folder1/folder2/folder3/folder4/node_modules                               |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules                       |
| /users/username/folderAtRoot/folder1/node_modules/@types                                 | /users/username/folderAtRoot/folder1                                                     |
| /users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | /users/username/folderAtRoot/folder1                                                     |
| /users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | /users/username/folderAtRoot/folder1                                                     |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | /users/username/folderAtRoot/folder1                                                     |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | /users/username/folderAtRoot/folder1                                                     |
| /user/username/folderAtRoot/folder1/node_modules/@types                                  | /user/username/folderAtRoot/folder1/node_modules                                         |
| /user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | /user/username/folderAtRoot/folder1/folder2/node_modules                                 |
| /user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | /user/username/folderAtRoot/folder1/folder2/folder3/node_modules                         |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                 |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules         |

## RootDirForResolution: /users/username/folderAtRoot/folder1/folder2 Root: /users/username/folderAtRoot/folder1/folder2

| Directory                                                                                | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                      |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| /folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | /folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| /folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | /folderAtRoot/folder1/folder2/folder3/folder4/node_modules                               |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules                       |
| /users/username/folderAtRoot/folder1/node_modules/@types                                 | /users/username/folderAtRoot/folder1/node_modules                                        |
| /users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | /users/username/folderAtRoot/folder1/folder2                                             |
| /users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | /users/username/folderAtRoot/folder1/folder2                                             |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | /users/username/folderAtRoot/folder1/folder2                                             |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | /users/username/folderAtRoot/folder1/folder2                                             |
| /user/username/folderAtRoot/folder1/node_modules/@types                                  | /user/username/folderAtRoot/folder1/node_modules                                         |
| /user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | /user/username/folderAtRoot/folder1/folder2/node_modules                                 |
| /user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | /user/username/folderAtRoot/folder1/folder2/folder3/node_modules                         |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                 |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules         |

## RootDirForResolution: /users/username/folderAtRoot/folder1/folder2/folder3 Root: /users/username/folderAtRoot/folder1/folder2/folder3

| Directory                                                                                | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                      |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| /folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | /folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| /folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | /folderAtRoot/folder1/folder2/folder3/folder4/node_modules                               |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules                       |
| /users/username/folderAtRoot/folder1/node_modules/@types                                 | /users/username/folderAtRoot/folder1/node_modules                                        |
| /users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | /users/username/folderAtRoot/folder1/folder2/node_modules                                |
| /users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | /users/username/folderAtRoot/folder1/folder2/folder3                                     |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | /users/username/folderAtRoot/folder1/folder2/folder3                                     |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | /users/username/folderAtRoot/folder1/folder2/folder3                                     |
| /user/username/folderAtRoot/folder1/node_modules/@types                                  | /user/username/folderAtRoot/folder1/node_modules                                         |
| /user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | /user/username/folderAtRoot/folder1/folder2/node_modules                                 |
| /user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | /user/username/folderAtRoot/folder1/folder2/folder3/node_modules                         |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                 |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules         |

## RootDirForResolution: /users/username/folderAtRoot/folder1/folder2/folder3/folder4 Root: /users/username/folderAtRoot/folder1/folder2/folder3/folder4

| Directory                                                                                | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                      |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| /folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | /folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| /folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | /folderAtRoot/folder1/folder2/folder3/folder4/node_modules                               |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules                       |
| /users/username/folderAtRoot/folder1/node_modules/@types                                 | /users/username/folderAtRoot/folder1/node_modules                                        |
| /users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | /users/username/folderAtRoot/folder1/folder2/node_modules                                |
| /users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | /users/username/folderAtRoot/folder1/folder2/folder3/node_modules                        |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | /users/username/folderAtRoot/folder1/folder2/folder3/folder4                             |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | /users/username/folderAtRoot/folder1/folder2/folder3/folder4                             |
| /user/username/folderAtRoot/folder1/node_modules/@types                                  | /user/username/folderAtRoot/folder1/node_modules                                         |
| /user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | /user/username/folderAtRoot/folder1/folder2/node_modules                                 |
| /user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | /user/username/folderAtRoot/folder1/folder2/folder3/node_modules                         |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                 |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules         |

## RootDirForResolution: /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5 Root: /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

| Directory                                                                                | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                      |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| /folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | /folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| /folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | /folderAtRoot/folder1/folder2/folder3/folder4/node_modules                               |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules                       |
| /users/username/folderAtRoot/folder1/node_modules/@types                                 | /users/username/folderAtRoot/folder1/node_modules                                        |
| /users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | /users/username/folderAtRoot/folder1/folder2/node_modules                                |
| /users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | /users/username/folderAtRoot/folder1/folder2/folder3/node_modules                        |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5                     |
| /user/username/folderAtRoot/folder1/node_modules/@types                                  | /user/username/folderAtRoot/folder1/node_modules                                         |
| /user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | /user/username/folderAtRoot/folder1/folder2/node_modules                                 |
| /user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | /user/username/folderAtRoot/folder1/folder2/folder3/node_modules                         |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                 |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules         |

## RootDirForResolution: /user Root: /user

| Directory                                                                                | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                      |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| /folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | /folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| /folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | /folderAtRoot/folder1/folder2/folder3/folder4/node_modules                               |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules                       |
| /users/username/folderAtRoot/folder1/node_modules/@types                                 | /users/username/folderAtRoot/folder1/node_modules                                        |
| /users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | /users/username/folderAtRoot/folder1/folder2/node_modules                                |
| /users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | /users/username/folderAtRoot/folder1/folder2/folder3/node_modules                        |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules        |
| /user/node_modules/@types                                                                | /user                                                                                    |
| /user/username/folderAtRoot/folder1/node_modules/@types                                  | /user                                                                                    |
| /user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | /user                                                                                    |
| /user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | /user                                                                                    |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | /user                                                                                    |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | /user                                                                                    |

## RootDirForResolution: /user/username Root: /user/username

| Directory                                                                                | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                      |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| /folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | /folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| /folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | /folderAtRoot/folder1/folder2/folder3/folder4/node_modules                               |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules                       |
| /users/username/folderAtRoot/folder1/node_modules/@types                                 | /users/username/folderAtRoot/folder1/node_modules                                        |
| /users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | /users/username/folderAtRoot/folder1/folder2/node_modules                                |
| /users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | /users/username/folderAtRoot/folder1/folder2/folder3/node_modules                        |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules        |
| /user/username/node_modules/@types                                                       | /user/username                                                                           |
| /user/username/folderAtRoot/folder1/node_modules/@types                                  | /user/username                                                                           |
| /user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | /user/username                                                                           |
| /user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | /user/username                                                                           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | /user/username                                                                           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | /user/username                                                                           |

## RootDirForResolution: /user/username/folderAtRoot Root: /user/username/folderAtRoot

| Directory                                                                                | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                      |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| /folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | /folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| /folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | /folderAtRoot/folder1/folder2/folder3/folder4/node_modules                               |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules                       |
| /users/username/folderAtRoot/folder1/node_modules/@types                                 | /users/username/folderAtRoot/folder1/node_modules                                        |
| /users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | /users/username/folderAtRoot/folder1/folder2/node_modules                                |
| /users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | /users/username/folderAtRoot/folder1/folder2/folder3/node_modules                        |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules        |
| /user/username/folderAtRoot/node_modules/@types                                          | /user/username/folderAtRoot                                                              |
| /user/username/folderAtRoot/folder1/node_modules/@types                                  | /user/username/folderAtRoot                                                              |
| /user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | /user/username/folderAtRoot                                                              |
| /user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | /user/username/folderAtRoot                                                              |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | /user/username/folderAtRoot                                                              |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | /user/username/folderAtRoot                                                              |

## RootDirForResolution: /user/username/folderAtRoot/folder1 Root: /user/username/folderAtRoot/folder1

| Directory                                                                                | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                      |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| /folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | /folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| /folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | /folderAtRoot/folder1/folder2/folder3/folder4/node_modules                               |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules                       |
| /users/username/folderAtRoot/folder1/node_modules/@types                                 | /users/username/folderAtRoot/folder1/node_modules                                        |
| /users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | /users/username/folderAtRoot/folder1/folder2/node_modules                                |
| /users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | /users/username/folderAtRoot/folder1/folder2/folder3/node_modules                        |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules        |
| /user/username/folderAtRoot/folder1/node_modules/@types                                  | /user/username/folderAtRoot/folder1                                                      |
| /user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | /user/username/folderAtRoot/folder1                                                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | /user/username/folderAtRoot/folder1                                                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | /user/username/folderAtRoot/folder1                                                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | /user/username/folderAtRoot/folder1                                                      |

## RootDirForResolution: /user/username/folderAtRoot/folder1/folder2 Root: /user/username/folderAtRoot/folder1/folder2

| Directory                                                                                | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                      |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| /folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | /folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| /folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | /folderAtRoot/folder1/folder2/folder3/folder4/node_modules                               |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules                       |
| /users/username/folderAtRoot/folder1/node_modules/@types                                 | /users/username/folderAtRoot/folder1/node_modules                                        |
| /users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | /users/username/folderAtRoot/folder1/folder2/node_modules                                |
| /users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | /users/username/folderAtRoot/folder1/folder2/folder3/node_modules                        |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules        |
| /user/username/folderAtRoot/folder1/node_modules/@types                                  | /user/username/folderAtRoot/folder1/node_modules                                         |
| /user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | /user/username/folderAtRoot/folder1/folder2                                              |
| /user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | /user/username/folderAtRoot/folder1/folder2                                              |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | /user/username/folderAtRoot/folder1/folder2                                              |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | /user/username/folderAtRoot/folder1/folder2                                              |

## RootDirForResolution: /user/username/folderAtRoot/folder1/folder2/folder3 Root: /user/username/folderAtRoot/folder1/folder2/folder3

| Directory                                                                                | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                      |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| /folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | /folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| /folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | /folderAtRoot/folder1/folder2/folder3/folder4/node_modules                               |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules                       |
| /users/username/folderAtRoot/folder1/node_modules/@types                                 | /users/username/folderAtRoot/folder1/node_modules                                        |
| /users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | /users/username/folderAtRoot/folder1/folder2/node_modules                                |
| /users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | /users/username/folderAtRoot/folder1/folder2/folder3/node_modules                        |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules        |
| /user/username/folderAtRoot/folder1/node_modules/@types                                  | /user/username/folderAtRoot/folder1/node_modules                                         |
| /user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | /user/username/folderAtRoot/folder1/folder2/node_modules                                 |
| /user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | /user/username/folderAtRoot/folder1/folder2/folder3                                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | /user/username/folderAtRoot/folder1/folder2/folder3                                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | /user/username/folderAtRoot/folder1/folder2/folder3                                      |

## RootDirForResolution: /user/username/folderAtRoot/folder1/folder2/folder3/folder4 Root: /user/username/folderAtRoot/folder1/folder2/folder3/folder4

| Directory                                                                                | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                      |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| /folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | /folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| /folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | /folderAtRoot/folder1/folder2/folder3/folder4/node_modules                               |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules                       |
| /users/username/folderAtRoot/folder1/node_modules/@types                                 | /users/username/folderAtRoot/folder1/node_modules                                        |
| /users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | /users/username/folderAtRoot/folder1/folder2/node_modules                                |
| /users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | /users/username/folderAtRoot/folder1/folder2/folder3/node_modules                        |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules        |
| /user/username/folderAtRoot/folder1/node_modules/@types                                  | /user/username/folderAtRoot/folder1/node_modules                                         |
| /user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | /user/username/folderAtRoot/folder1/folder2/node_modules                                 |
| /user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | /user/username/folderAtRoot/folder1/folder2/folder3/node_modules                         |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | /user/username/folderAtRoot/folder1/folder2/folder3/folder4                              |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | /user/username/folderAtRoot/folder1/folder2/folder3/folder4                              |

## RootDirForResolution: /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5 Root: /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

| Directory                                                                                | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                      |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| /folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | /folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| /folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | /folderAtRoot/folder1/folder2/folder3/folder4/node_modules                               |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules                       |
| /users/username/folderAtRoot/folder1/node_modules/@types                                 | /users/username/folderAtRoot/folder1/node_modules                                        |
| /users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | /users/username/folderAtRoot/folder1/folder2/node_modules                                |
| /users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | /users/username/folderAtRoot/folder1/folder2/folder3/node_modules                        |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules        |
| /user/username/folderAtRoot/folder1/node_modules/@types                                  | /user/username/folderAtRoot/folder1/node_modules                                         |
| /user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | /user/username/folderAtRoot/folder1/folder2/node_modules                                 |
| /user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | /user/username/folderAtRoot/folder1/folder2/folder3/node_modules                         |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                 |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5                      |

## RootDirForResolution: undefined Root: undefined

| Directory                                                                                | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                      |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| /folderAtRoot/folder1/folder2/folder3/node_modules/@types                                | /folderAtRoot/folder1/folder2/folder3/node_modules                                       |
| /folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types                        | /folderAtRoot/folder1/folder2/folder3/folder4/node_modules                               |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types                | /folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules                       |
| /users/username/folderAtRoot/folder1/node_modules/@types                                 | /users/username/folderAtRoot/folder1/node_modules                                        |
| /users/username/folderAtRoot/folder1/folder2/node_modules/@types                         | /users/username/folderAtRoot/folder1/folder2/node_modules                                |
| /users/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                 | /users/username/folderAtRoot/folder1/folder2/folder3/node_modules                        |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types         | /users/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types | /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules        |
| /user/username/folderAtRoot/folder1/node_modules/@types                                  | /user/username/folderAtRoot/folder1/node_modules                                         |
| /user/username/folderAtRoot/folder1/folder2/node_modules/@types                          | /user/username/folderAtRoot/folder1/folder2/node_modules                                 |
| /user/username/folderAtRoot/folder1/folder2/folder3/node_modules/@types                  | /user/username/folderAtRoot/folder1/folder2/folder3/node_modules                         |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules/@types          | /user/username/folderAtRoot/folder1/folder2/folder3/folder4/node_modules                 |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules/@types  | /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/node_modules         |


## Testing for root: c:/

## RootDirForResolution: c:/ Root: c:

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

## RootDirForResolution: c:/folderAtRoot Root: c:/folderAtRoot

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

## RootDirForResolution: c:/folderAtRoot/folder1 Root: c:/folderAtRoot/folder1

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

## RootDirForResolution: c:/folderAtRoot/folder1/folder2 Root: c:/folderAtRoot/folder1/folder2

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

## RootDirForResolution: c:/folderAtRoot/folder1/folder2/folder3 Root: c:/folderAtRoot/folder1/folder2/folder3

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

## RootDirForResolution: c:/folderAtRoot/folder1/folder2/folder3/folder4 Root: c:/folderAtRoot/folder1/folder2/folder3/folder4

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

## RootDirForResolution: c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5 Root: c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5

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

## RootDirForResolution: c:/users Root: c:/users

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

## RootDirForResolution: c:/users/username Root: c:/users/username

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

## RootDirForResolution: c:/users/username/folderAtRoot Root: c:/users/username/folderAtRoot

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

## RootDirForResolution: c:/users/username/folderAtRoot/folder1 Root: c:/users/username/folderAtRoot/folder1

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

## RootDirForResolution: c:/users/username/folderAtRoot/folder1/folder2 Root: c:/users/username/folderAtRoot/folder1/folder2

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

## RootDirForResolution: c:/users/username/folderAtRoot/folder1/folder2/folder3 Root: c:/users/username/folderAtRoot/folder1/folder2/folder3

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

## RootDirForResolution: c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4 Root: c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4

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

## RootDirForResolution: c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5 Root: c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

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

## RootDirForResolution: c:/user Root: c:/user

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

## RootDirForResolution: c:/user/username Root: c:/user/username

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

## RootDirForResolution: c:/user/username/folderAtRoot Root: c:/user/username/folderAtRoot

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

## RootDirForResolution: c:/user/username/folderAtRoot/folder1 Root: c:/user/username/folderAtRoot/folder1

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

## RootDirForResolution: c:/user/username/folderAtRoot/folder1/folder2 Root: c:/user/username/folderAtRoot/folder1/folder2

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

## RootDirForResolution: c:/user/username/folderAtRoot/folder1/folder2/folder3 Root: c:/user/username/folderAtRoot/folder1/folder2/folder3

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

## RootDirForResolution: c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4 Root: c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4

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

## RootDirForResolution: c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5 Root: c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

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

## RootDirForResolution: undefined Root: undefined

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


## Testing for root: //vda1cs4850/

## RootDirForResolution: //vda1cs4850/ Root: //vda1cs4850

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

## RootDirForResolution: //vda1cs4850/folderAtRoot Root: //vda1cs4850/folderAtRoot

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

## RootDirForResolution: //vda1cs4850/folderAtRoot/folder1 Root: //vda1cs4850/folderAtRoot/folder1

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

## RootDirForResolution: //vda1cs4850/folderAtRoot/folder1/folder2 Root: //vda1cs4850/folderAtRoot/folder1/folder2

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

## RootDirForResolution: //vda1cs4850/folderAtRoot/folder1/folder2/folder3 Root: //vda1cs4850/folderAtRoot/folder1/folder2/folder3

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

## RootDirForResolution: //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4 Root: //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4

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

## RootDirForResolution: //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5 Root: //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5

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

## RootDirForResolution: //vda1cs4850/users Root: //vda1cs4850/users

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

## RootDirForResolution: //vda1cs4850/users/username Root: //vda1cs4850/users/username

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

## RootDirForResolution: //vda1cs4850/users/username/folderAtRoot Root: //vda1cs4850/users/username/folderAtRoot

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

## RootDirForResolution: //vda1cs4850/users/username/folderAtRoot/folder1 Root: //vda1cs4850/users/username/folderAtRoot/folder1

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

## RootDirForResolution: //vda1cs4850/users/username/folderAtRoot/folder1/folder2 Root: //vda1cs4850/users/username/folderAtRoot/folder1/folder2

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

## RootDirForResolution: //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3 Root: //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3

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

## RootDirForResolution: //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4 Root: //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4

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

## RootDirForResolution: //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5 Root: //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

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

## RootDirForResolution: //vda1cs4850/user Root: //vda1cs4850/user

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

## RootDirForResolution: //vda1cs4850/user/username Root: //vda1cs4850/user/username

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

## RootDirForResolution: //vda1cs4850/user/username/folderAtRoot Root: //vda1cs4850/user/username/folderAtRoot

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

## RootDirForResolution: //vda1cs4850/user/username/folderAtRoot/folder1 Root: //vda1cs4850/user/username/folderAtRoot/folder1

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

## RootDirForResolution: //vda1cs4850/user/username/folderAtRoot/folder1/folder2 Root: //vda1cs4850/user/username/folderAtRoot/folder1/folder2

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

## RootDirForResolution: //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3 Root: //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3

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

## RootDirForResolution: //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4 Root: //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4

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

## RootDirForResolution: //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5 Root: //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

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

## RootDirForResolution: undefined Root: undefined

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


## Testing for root: //vda1cs4850/c$

## RootDirForResolution: //vda1cs4850/c$ Root: //vda1cs4850/c$

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

## RootDirForResolution: //vda1cs4850/c$/folderAtRoot Root: //vda1cs4850/c$/folderAtRoot

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

## RootDirForResolution: //vda1cs4850/c$/folderAtRoot/folder1 Root: //vda1cs4850/c$/folderAtRoot/folder1

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

## RootDirForResolution: //vda1cs4850/c$/folderAtRoot/folder1/folder2 Root: //vda1cs4850/c$/folderAtRoot/folder1/folder2

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

## RootDirForResolution: //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3 Root: //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3

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

## RootDirForResolution: //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4 Root: //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4

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

## RootDirForResolution: //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5 Root: //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5

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

## RootDirForResolution: //vda1cs4850/c$/users Root: //vda1cs4850/c$/users

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

## RootDirForResolution: //vda1cs4850/c$/users/username Root: //vda1cs4850/c$/users/username

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

## RootDirForResolution: //vda1cs4850/c$/users/username/folderAtRoot Root: //vda1cs4850/c$/users/username/folderAtRoot

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

## RootDirForResolution: //vda1cs4850/c$/users/username/folderAtRoot/folder1 Root: //vda1cs4850/c$/users/username/folderAtRoot/folder1

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

## RootDirForResolution: //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2 Root: //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2

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

## RootDirForResolution: //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3 Root: //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3

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

## RootDirForResolution: //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4 Root: //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4

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

## RootDirForResolution: //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5 Root: //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

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

## RootDirForResolution: //vda1cs4850/c$/user Root: //vda1cs4850/c$/user

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

## RootDirForResolution: //vda1cs4850/c$/user/username Root: //vda1cs4850/c$/user/username

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

## RootDirForResolution: //vda1cs4850/c$/user/username/folderAtRoot Root: //vda1cs4850/c$/user/username/folderAtRoot

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

## RootDirForResolution: //vda1cs4850/c$/user/username/folderAtRoot/folder1 Root: //vda1cs4850/c$/user/username/folderAtRoot/folder1

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

## RootDirForResolution: //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2 Root: //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2

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

## RootDirForResolution: //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3 Root: //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3

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

## RootDirForResolution: //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4 Root: //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4

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

## RootDirForResolution: //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5 Root: //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

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

## RootDirForResolution: undefined Root: undefined

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

