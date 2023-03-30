## Testing for root: /

## Root path: /

| Directory                                                                                | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                      |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| /node_modules/@types                                                                     |                                                                                          |
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

## Root path: /folderAtRoot

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

## Root path: /folderAtRoot/folder1

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

## Root path: /folderAtRoot/folder1/folder2

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

## Root path: /folderAtRoot/folder1/folder2/folder3

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

## Root path: /folderAtRoot/folder1/folder2/folder3/folder4

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

## Root path: /folderAtRoot/folder1/folder2/folder3/folder4/folder5

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

## Root path: /users

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

## Root path: /users/username

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

## Root path: /users/username/folderAtRoot

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

## Root path: /users/username/folderAtRoot/folder1

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

## Root path: /users/username/folderAtRoot/folder1/folder2

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

## Root path: /users/username/folderAtRoot/folder1/folder2/folder3

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

## Root path: /users/username/folderAtRoot/folder1/folder2/folder3/folder4

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

## Root path: /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

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

## Root path: /user

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

## Root path: /user/username

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

## Root path: /user/username/folderAtRoot

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

## Root path: /user/username/folderAtRoot/folder1

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

## Root path: /user/username/folderAtRoot/folder1/folder2

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

## Root path: /user/username/folderAtRoot/folder1/folder2/folder3

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

## Root path: /user/username/folderAtRoot/folder1/folder2/folder3/folder4

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

## Root path: /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

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

## Root path: undefined

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

## Root path: c:/

| Directory                                                                                  | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                        |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| c:/node_modules/@types                                                                     |                                                                                            |
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

## Root path: c:/folderAtRoot

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

## Root path: c:/folderAtRoot/folder1

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

## Root path: c:/folderAtRoot/folder1/folder2

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

## Root path: c:/folderAtRoot/folder1/folder2/folder3

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

## Root path: c:/folderAtRoot/folder1/folder2/folder3/folder4

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

## Root path: c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5

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

## Root path: c:/users

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

## Root path: c:/users/username

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

## Root path: c:/users/username/folderAtRoot

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

## Root path: c:/users/username/folderAtRoot/folder1

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

## Root path: c:/users/username/folderAtRoot/folder1/folder2

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

## Root path: c:/users/username/folderAtRoot/folder1/folder2/folder3

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

## Root path: c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4

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

## Root path: c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

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

## Root path: c:/user

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

## Root path: c:/user/username

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

## Root path: c:/user/username/folderAtRoot

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

## Root path: c:/user/username/folderAtRoot/folder1

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

## Root path: c:/user/username/folderAtRoot/folder1/folder2

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

## Root path: c:/user/username/folderAtRoot/folder1/folder2/folder3

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

## Root path: c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4

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

## Root path: c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

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

## Root path: undefined

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

## Root path: //vda1cs4850/

| Directory                                                                                            | getDirectoryToWatchFailedLookupLocationFromTypeRoot                                                  |
| ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| //vda1cs4850/node_modules/@types                                                                     |                                                                                                      |
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

## Root path: //vda1cs4850/folderAtRoot

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

## Root path: //vda1cs4850/folderAtRoot/folder1

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

## Root path: //vda1cs4850/folderAtRoot/folder1/folder2

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

## Root path: //vda1cs4850/folderAtRoot/folder1/folder2/folder3

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

## Root path: //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4

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

## Root path: //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5

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

## Root path: //vda1cs4850/users

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

## Root path: //vda1cs4850/users/username

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

## Root path: //vda1cs4850/users/username/folderAtRoot

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

## Root path: //vda1cs4850/users/username/folderAtRoot/folder1

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

## Root path: //vda1cs4850/users/username/folderAtRoot/folder1/folder2

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

## Root path: //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3

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

## Root path: //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4

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

## Root path: //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

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

## Root path: //vda1cs4850/user

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

## Root path: //vda1cs4850/user/username

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

## Root path: //vda1cs4850/user/username/folderAtRoot

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

## Root path: //vda1cs4850/user/username/folderAtRoot/folder1

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

## Root path: //vda1cs4850/user/username/folderAtRoot/folder1/folder2

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

## Root path: //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3

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

## Root path: //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4

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

## Root path: //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

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

## Root path: undefined

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

## Root path: //vda1cs4850/c$

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

## Root path: //vda1cs4850/c$/folderAtRoot

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

## Root path: //vda1cs4850/c$/folderAtRoot/folder1

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

## Root path: //vda1cs4850/c$/folderAtRoot/folder1/folder2

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

## Root path: //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3

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

## Root path: //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4

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

## Root path: //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5

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

## Root path: //vda1cs4850/c$/users

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

## Root path: //vda1cs4850/c$/users/username

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

## Root path: //vda1cs4850/c$/users/username/folderAtRoot

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

## Root path: //vda1cs4850/c$/users/username/folderAtRoot/folder1

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

## Root path: //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2

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

## Root path: //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3

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

## Root path: //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4

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

## Root path: //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

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

## Root path: //vda1cs4850/c$/user

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

## Root path: //vda1cs4850/c$/user/username

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

## Root path: //vda1cs4850/c$/user/username/folderAtRoot

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

## Root path: //vda1cs4850/c$/user/username/folderAtRoot/folder1

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

## Root path: //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2

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

## Root path: //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3

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

## Root path: //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4

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

## Root path: //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

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

## Root path: undefined

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

