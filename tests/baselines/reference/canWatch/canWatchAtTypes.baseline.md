## Testing for root: /

## Root path: /

| Directory                                                                                | canWatchAtTypes |
| ---------------------------------------------------------------------------------------- | --------------- |
| /node_modules/@types                                                                     | true            |
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

## Root path: /folderAtRoot

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

## Root path: /folderAtRoot/folder1

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

## Root path: /folderAtRoot/folder1/folder2

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

## Root path: /folderAtRoot/folder1/folder2/folder3

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

## Root path: /folderAtRoot/folder1/folder2/folder3/folder4

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

## Root path: /folderAtRoot/folder1/folder2/folder3/folder4/folder5

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

## Root path: /users

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

## Root path: /users/username

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

## Root path: /users/username/folderAtRoot

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

## Root path: /users/username/folderAtRoot/folder1

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

## Root path: /users/username/folderAtRoot/folder1/folder2

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

## Root path: /users/username/folderAtRoot/folder1/folder2/folder3

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

## Root path: /users/username/folderAtRoot/folder1/folder2/folder3/folder4

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

## Root path: /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

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

## Root path: /user

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

## Root path: /user/username

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

## Root path: /user/username/folderAtRoot

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

## Root path: /user/username/folderAtRoot/folder1

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

## Root path: /user/username/folderAtRoot/folder1/folder2

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

## Root path: /user/username/folderAtRoot/folder1/folder2/folder3

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

## Root path: /user/username/folderAtRoot/folder1/folder2/folder3/folder4

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

## Root path: /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

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

## Root path: undefined

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


## Testing for root: c:/

## Root path: c:/

| Directory                                                                                  | canWatchAtTypes |
| ------------------------------------------------------------------------------------------ | --------------- |
| c:/node_modules/@types                                                                     | true            |
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

## Root path: c:/folderAtRoot

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

## Root path: c:/folderAtRoot/folder1

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

## Root path: c:/folderAtRoot/folder1/folder2

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

## Root path: c:/folderAtRoot/folder1/folder2/folder3

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

## Root path: c:/folderAtRoot/folder1/folder2/folder3/folder4

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

## Root path: c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5

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

## Root path: c:/users

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

## Root path: c:/users/username

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

## Root path: c:/users/username/folderAtRoot

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

## Root path: c:/users/username/folderAtRoot/folder1

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

## Root path: c:/users/username/folderAtRoot/folder1/folder2

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

## Root path: c:/users/username/folderAtRoot/folder1/folder2/folder3

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

## Root path: c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4

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

## Root path: c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

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

## Root path: c:/user

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

## Root path: c:/user/username

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

## Root path: c:/user/username/folderAtRoot

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

## Root path: c:/user/username/folderAtRoot/folder1

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

## Root path: c:/user/username/folderAtRoot/folder1/folder2

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

## Root path: c:/user/username/folderAtRoot/folder1/folder2/folder3

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

## Root path: c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4

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

## Root path: c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

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

## Root path: undefined

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


## Testing for root: //vda1cs4850/

## Root path: //vda1cs4850/

| Directory                                                                                            | canWatchAtTypes |
| ---------------------------------------------------------------------------------------------------- | --------------- |
| //vda1cs4850/node_modules/@types                                                                     | true            |
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

## Root path: //vda1cs4850/folderAtRoot

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

## Root path: //vda1cs4850/folderAtRoot/folder1

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

## Root path: //vda1cs4850/folderAtRoot/folder1/folder2

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

## Root path: //vda1cs4850/folderAtRoot/folder1/folder2/folder3

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

## Root path: //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4

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

## Root path: //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5

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

## Root path: //vda1cs4850/users

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

## Root path: //vda1cs4850/users/username

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

## Root path: //vda1cs4850/users/username/folderAtRoot

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

## Root path: //vda1cs4850/users/username/folderAtRoot/folder1

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

## Root path: //vda1cs4850/users/username/folderAtRoot/folder1/folder2

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

## Root path: //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3

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

## Root path: //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4

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

## Root path: //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

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

## Root path: //vda1cs4850/user

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

## Root path: //vda1cs4850/user/username

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

## Root path: //vda1cs4850/user/username/folderAtRoot

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

## Root path: //vda1cs4850/user/username/folderAtRoot/folder1

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

## Root path: //vda1cs4850/user/username/folderAtRoot/folder1/folder2

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

## Root path: //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3

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

## Root path: //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4

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

## Root path: //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

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

## Root path: undefined

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


## Testing for root: //vda1cs4850/c$

## Root path: //vda1cs4850/c$

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

## Root path: //vda1cs4850/c$/folderAtRoot

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

## Root path: //vda1cs4850/c$/folderAtRoot/folder1

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

## Root path: //vda1cs4850/c$/folderAtRoot/folder1/folder2

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

## Root path: //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3

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

## Root path: //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4

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

## Root path: //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5

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

## Root path: //vda1cs4850/c$/users

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

## Root path: //vda1cs4850/c$/users/username

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

## Root path: //vda1cs4850/c$/users/username/folderAtRoot

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

## Root path: //vda1cs4850/c$/users/username/folderAtRoot/folder1

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

## Root path: //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2

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

## Root path: //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3

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

## Root path: //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4

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

## Root path: //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

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

## Root path: //vda1cs4850/c$/user

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

## Root path: //vda1cs4850/c$/user/username

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

## Root path: //vda1cs4850/c$/user/username/folderAtRoot

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

## Root path: //vda1cs4850/c$/user/username/folderAtRoot/folder1

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

## Root path: //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2

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

## Root path: //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3

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

## Root path: //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4

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

## Root path: //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

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

## Root path: undefined

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

