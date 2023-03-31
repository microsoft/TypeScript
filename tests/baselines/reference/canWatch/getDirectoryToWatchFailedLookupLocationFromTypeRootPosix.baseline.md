# getDirectoryToWatchFailedLookupLocationFromTypeRoot

When watched typeRoot handler is invoked, this method determines the directory for which the failedLookupLocation would need to be invalidated.
Since this is invoked only when watching default typeRoot and is used to handle flaky directory watchers, this is used as a fail safe where if failed lookup starts with returned directory we will invalidate that resolution.

## Testing for Posix root: /

## RootDirForResolution: /

Root: 

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

## RootDirForResolution: /folderAtRoot

Root: /folderAtRoot

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

## RootDirForResolution: /folderAtRoot/folder1

Root: /folderAtRoot/folder1

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

## RootDirForResolution: /folderAtRoot/folder1/folder2

Root: /folderAtRoot/folder1/folder2

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

## RootDirForResolution: /folderAtRoot/folder1/folder2/folder3

Root: /folderAtRoot/folder1/folder2/folder3

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

## RootDirForResolution: /folderAtRoot/folder1/folder2/folder3/folder4

Root: /folderAtRoot/folder1/folder2/folder3/folder4

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

## RootDirForResolution: /folderAtRoot/folder1/folder2/folder3/folder4/folder5

Root: /folderAtRoot/folder1/folder2/folder3/folder4/folder5

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

## RootDirForResolution: /users

Root: /users

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

## RootDirForResolution: /users/username

Root: /users/username

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

## RootDirForResolution: /users/username/folderAtRoot

Root: /users/username/folderAtRoot

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

## RootDirForResolution: /users/username/folderAtRoot/folder1

Root: /users/username/folderAtRoot/folder1

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

## RootDirForResolution: /users/username/folderAtRoot/folder1/folder2

Root: /users/username/folderAtRoot/folder1/folder2

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

## RootDirForResolution: /users/username/folderAtRoot/folder1/folder2/folder3

Root: /users/username/folderAtRoot/folder1/folder2/folder3

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

## RootDirForResolution: /users/username/folderAtRoot/folder1/folder2/folder3/folder4

Root: /users/username/folderAtRoot/folder1/folder2/folder3/folder4

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

## RootDirForResolution: /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

Root: /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

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

## RootDirForResolution: /user

Root: /user

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

## RootDirForResolution: /user/username

Root: /user/username

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

## RootDirForResolution: /user/username/folderAtRoot

Root: /user/username/folderAtRoot

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

## RootDirForResolution: /user/username/folderAtRoot/folder1

Root: /user/username/folderAtRoot/folder1

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

## RootDirForResolution: /user/username/folderAtRoot/folder1/folder2

Root: /user/username/folderAtRoot/folder1/folder2

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

## RootDirForResolution: /user/username/folderAtRoot/folder1/folder2/folder3

Root: /user/username/folderAtRoot/folder1/folder2/folder3

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

## RootDirForResolution: /user/username/folderAtRoot/folder1/folder2/folder3/folder4

Root: /user/username/folderAtRoot/folder1/folder2/folder3/folder4

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

## RootDirForResolution: /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

Root: /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

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

## RootDirForResolution: undefined

Root: undefined

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

