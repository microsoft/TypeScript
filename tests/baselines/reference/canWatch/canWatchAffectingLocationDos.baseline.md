# canWatchAffectingLocation

Determines if package.json that was found during module resolution and change in it will affect resolution can be watched.

## Testing for Dos root: c:/

## RootDirForResolution: c:/

Root: c:

| File                                                                                | canWatchAffectingLocation |
| ----------------------------------------------------------------------------------- | ------------------------- |
| c:/package.json                                                                     | false                     |
| c:/folderAtRoot/package.json                                                        | true                      |
| c:/folderAtRoot/folder1/package.json                                                | true                      |
| c:/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| c:/users/package.json                                                               | false                     |
| c:/users/username/package.json                                                      | false                     |
| c:/users/username/folderAtRoot/package.json                                         | true                      |
| c:/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| c:/user/package.json                                                                | true                      |
| c:/user/username/package.json                                                       | true                      |
| c:/user/username/folderAtRoot/package.json                                          | true                      |
| c:/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| c:/usr/package.json                                                                 | true                      |
| c:/usr/username/package.json                                                        | true                      |
| c:/usr/username/folderAtRoot/package.json                                           | true                      |
| c:/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| c:/home/package.json                                                                | true                      |
| c:/home/username/package.json                                                       | true                      |
| c:/home/username/folderAtRoot/package.json                                          | true                      |
| c:/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: c:/folderAtRoot

Root: c:/folderAtRoot

| File                                                                                | canWatchAffectingLocation |
| ----------------------------------------------------------------------------------- | ------------------------- |
| c:/package.json                                                                     | false                     |
| c:/folderAtRoot/package.json                                                        | true                      |
| c:/folderAtRoot/folder1/package.json                                                | true                      |
| c:/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| c:/users/package.json                                                               | false                     |
| c:/users/username/package.json                                                      | false                     |
| c:/users/username/folderAtRoot/package.json                                         | true                      |
| c:/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| c:/user/package.json                                                                | true                      |
| c:/user/username/package.json                                                       | true                      |
| c:/user/username/folderAtRoot/package.json                                          | true                      |
| c:/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| c:/usr/package.json                                                                 | true                      |
| c:/usr/username/package.json                                                        | true                      |
| c:/usr/username/folderAtRoot/package.json                                           | true                      |
| c:/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| c:/home/package.json                                                                | true                      |
| c:/home/username/package.json                                                       | true                      |
| c:/home/username/folderAtRoot/package.json                                          | true                      |
| c:/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: c:/folderAtRoot/folder1

Root: c:/folderAtRoot/folder1

| File                                                                                | canWatchAffectingLocation |
| ----------------------------------------------------------------------------------- | ------------------------- |
| c:/package.json                                                                     | false                     |
| c:/folderAtRoot/package.json                                                        | true                      |
| c:/folderAtRoot/folder1/package.json                                                | true                      |
| c:/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| c:/users/package.json                                                               | false                     |
| c:/users/username/package.json                                                      | false                     |
| c:/users/username/folderAtRoot/package.json                                         | true                      |
| c:/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| c:/user/package.json                                                                | true                      |
| c:/user/username/package.json                                                       | true                      |
| c:/user/username/folderAtRoot/package.json                                          | true                      |
| c:/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| c:/usr/package.json                                                                 | true                      |
| c:/usr/username/package.json                                                        | true                      |
| c:/usr/username/folderAtRoot/package.json                                           | true                      |
| c:/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| c:/home/package.json                                                                | true                      |
| c:/home/username/package.json                                                       | true                      |
| c:/home/username/folderAtRoot/package.json                                          | true                      |
| c:/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: c:/folderAtRoot/folder1/folder2

Root: c:/folderAtRoot/folder1/folder2

| File                                                                                | canWatchAffectingLocation |
| ----------------------------------------------------------------------------------- | ------------------------- |
| c:/package.json                                                                     | false                     |
| c:/folderAtRoot/package.json                                                        | true                      |
| c:/folderAtRoot/folder1/package.json                                                | true                      |
| c:/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| c:/users/package.json                                                               | false                     |
| c:/users/username/package.json                                                      | false                     |
| c:/users/username/folderAtRoot/package.json                                         | true                      |
| c:/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| c:/user/package.json                                                                | true                      |
| c:/user/username/package.json                                                       | true                      |
| c:/user/username/folderAtRoot/package.json                                          | true                      |
| c:/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| c:/usr/package.json                                                                 | true                      |
| c:/usr/username/package.json                                                        | true                      |
| c:/usr/username/folderAtRoot/package.json                                           | true                      |
| c:/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| c:/home/package.json                                                                | true                      |
| c:/home/username/package.json                                                       | true                      |
| c:/home/username/folderAtRoot/package.json                                          | true                      |
| c:/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: c:/folderAtRoot/folder1/folder2/folder3

Root: c:/folderAtRoot/folder1/folder2/folder3

| File                                                                                | canWatchAffectingLocation |
| ----------------------------------------------------------------------------------- | ------------------------- |
| c:/package.json                                                                     | false                     |
| c:/folderAtRoot/package.json                                                        | true                      |
| c:/folderAtRoot/folder1/package.json                                                | true                      |
| c:/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| c:/users/package.json                                                               | false                     |
| c:/users/username/package.json                                                      | false                     |
| c:/users/username/folderAtRoot/package.json                                         | true                      |
| c:/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| c:/user/package.json                                                                | true                      |
| c:/user/username/package.json                                                       | true                      |
| c:/user/username/folderAtRoot/package.json                                          | true                      |
| c:/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| c:/usr/package.json                                                                 | true                      |
| c:/usr/username/package.json                                                        | true                      |
| c:/usr/username/folderAtRoot/package.json                                           | true                      |
| c:/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| c:/home/package.json                                                                | true                      |
| c:/home/username/package.json                                                       | true                      |
| c:/home/username/folderAtRoot/package.json                                          | true                      |
| c:/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: c:/folderAtRoot/folder1/folder2/folder3/folder4

Root: c:/folderAtRoot/folder1/folder2/folder3/folder4

| File                                                                                | canWatchAffectingLocation |
| ----------------------------------------------------------------------------------- | ------------------------- |
| c:/package.json                                                                     | false                     |
| c:/folderAtRoot/package.json                                                        | true                      |
| c:/folderAtRoot/folder1/package.json                                                | true                      |
| c:/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| c:/users/package.json                                                               | false                     |
| c:/users/username/package.json                                                      | false                     |
| c:/users/username/folderAtRoot/package.json                                         | true                      |
| c:/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| c:/user/package.json                                                                | true                      |
| c:/user/username/package.json                                                       | true                      |
| c:/user/username/folderAtRoot/package.json                                          | true                      |
| c:/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| c:/usr/package.json                                                                 | true                      |
| c:/usr/username/package.json                                                        | true                      |
| c:/usr/username/folderAtRoot/package.json                                           | true                      |
| c:/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| c:/home/package.json                                                                | true                      |
| c:/home/username/package.json                                                       | true                      |
| c:/home/username/folderAtRoot/package.json                                          | true                      |
| c:/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5

Root: c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5

| File                                                                                | canWatchAffectingLocation |
| ----------------------------------------------------------------------------------- | ------------------------- |
| c:/package.json                                                                     | false                     |
| c:/folderAtRoot/package.json                                                        | true                      |
| c:/folderAtRoot/folder1/package.json                                                | true                      |
| c:/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| c:/users/package.json                                                               | false                     |
| c:/users/username/package.json                                                      | false                     |
| c:/users/username/folderAtRoot/package.json                                         | true                      |
| c:/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| c:/user/package.json                                                                | true                      |
| c:/user/username/package.json                                                       | true                      |
| c:/user/username/folderAtRoot/package.json                                          | true                      |
| c:/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| c:/usr/package.json                                                                 | true                      |
| c:/usr/username/package.json                                                        | true                      |
| c:/usr/username/folderAtRoot/package.json                                           | true                      |
| c:/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| c:/home/package.json                                                                | true                      |
| c:/home/username/package.json                                                       | true                      |
| c:/home/username/folderAtRoot/package.json                                          | true                      |
| c:/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: c:/users

Root: c:/users

| File                                                                                | canWatchAffectingLocation |
| ----------------------------------------------------------------------------------- | ------------------------- |
| c:/package.json                                                                     | false                     |
| c:/folderAtRoot/package.json                                                        | true                      |
| c:/folderAtRoot/folder1/package.json                                                | true                      |
| c:/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| c:/users/package.json                                                               | false                     |
| c:/users/username/package.json                                                      | false                     |
| c:/users/username/folderAtRoot/package.json                                         | true                      |
| c:/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| c:/user/package.json                                                                | true                      |
| c:/user/username/package.json                                                       | true                      |
| c:/user/username/folderAtRoot/package.json                                          | true                      |
| c:/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| c:/usr/package.json                                                                 | true                      |
| c:/usr/username/package.json                                                        | true                      |
| c:/usr/username/folderAtRoot/package.json                                           | true                      |
| c:/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| c:/home/package.json                                                                | true                      |
| c:/home/username/package.json                                                       | true                      |
| c:/home/username/folderAtRoot/package.json                                          | true                      |
| c:/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: c:/users/username

Root: c:/users/username

| File                                                                                | canWatchAffectingLocation |
| ----------------------------------------------------------------------------------- | ------------------------- |
| c:/package.json                                                                     | false                     |
| c:/folderAtRoot/package.json                                                        | true                      |
| c:/folderAtRoot/folder1/package.json                                                | true                      |
| c:/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| c:/users/package.json                                                               | false                     |
| c:/users/username/package.json                                                      | false                     |
| c:/users/username/folderAtRoot/package.json                                         | true                      |
| c:/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| c:/user/package.json                                                                | true                      |
| c:/user/username/package.json                                                       | true                      |
| c:/user/username/folderAtRoot/package.json                                          | true                      |
| c:/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| c:/usr/package.json                                                                 | true                      |
| c:/usr/username/package.json                                                        | true                      |
| c:/usr/username/folderAtRoot/package.json                                           | true                      |
| c:/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| c:/home/package.json                                                                | true                      |
| c:/home/username/package.json                                                       | true                      |
| c:/home/username/folderAtRoot/package.json                                          | true                      |
| c:/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: c:/users/username/folderAtRoot

Root: c:/users/username/folderAtRoot

| File                                                                                | canWatchAffectingLocation |
| ----------------------------------------------------------------------------------- | ------------------------- |
| c:/package.json                                                                     | false                     |
| c:/folderAtRoot/package.json                                                        | true                      |
| c:/folderAtRoot/folder1/package.json                                                | true                      |
| c:/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| c:/users/package.json                                                               | false                     |
| c:/users/username/package.json                                                      | false                     |
| c:/users/username/folderAtRoot/package.json                                         | true                      |
| c:/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| c:/user/package.json                                                                | true                      |
| c:/user/username/package.json                                                       | true                      |
| c:/user/username/folderAtRoot/package.json                                          | true                      |
| c:/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| c:/usr/package.json                                                                 | true                      |
| c:/usr/username/package.json                                                        | true                      |
| c:/usr/username/folderAtRoot/package.json                                           | true                      |
| c:/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| c:/home/package.json                                                                | true                      |
| c:/home/username/package.json                                                       | true                      |
| c:/home/username/folderAtRoot/package.json                                          | true                      |
| c:/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: c:/users/username/folderAtRoot/folder1

Root: c:/users/username/folderAtRoot/folder1

| File                                                                                | canWatchAffectingLocation |
| ----------------------------------------------------------------------------------- | ------------------------- |
| c:/package.json                                                                     | false                     |
| c:/folderAtRoot/package.json                                                        | true                      |
| c:/folderAtRoot/folder1/package.json                                                | true                      |
| c:/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| c:/users/package.json                                                               | false                     |
| c:/users/username/package.json                                                      | false                     |
| c:/users/username/folderAtRoot/package.json                                         | true                      |
| c:/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| c:/user/package.json                                                                | true                      |
| c:/user/username/package.json                                                       | true                      |
| c:/user/username/folderAtRoot/package.json                                          | true                      |
| c:/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| c:/usr/package.json                                                                 | true                      |
| c:/usr/username/package.json                                                        | true                      |
| c:/usr/username/folderAtRoot/package.json                                           | true                      |
| c:/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| c:/home/package.json                                                                | true                      |
| c:/home/username/package.json                                                       | true                      |
| c:/home/username/folderAtRoot/package.json                                          | true                      |
| c:/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: c:/users/username/folderAtRoot/folder1/folder2

Root: c:/users/username/folderAtRoot/folder1/folder2

| File                                                                                | canWatchAffectingLocation |
| ----------------------------------------------------------------------------------- | ------------------------- |
| c:/package.json                                                                     | false                     |
| c:/folderAtRoot/package.json                                                        | true                      |
| c:/folderAtRoot/folder1/package.json                                                | true                      |
| c:/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| c:/users/package.json                                                               | false                     |
| c:/users/username/package.json                                                      | false                     |
| c:/users/username/folderAtRoot/package.json                                         | true                      |
| c:/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| c:/user/package.json                                                                | true                      |
| c:/user/username/package.json                                                       | true                      |
| c:/user/username/folderAtRoot/package.json                                          | true                      |
| c:/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| c:/usr/package.json                                                                 | true                      |
| c:/usr/username/package.json                                                        | true                      |
| c:/usr/username/folderAtRoot/package.json                                           | true                      |
| c:/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| c:/home/package.json                                                                | true                      |
| c:/home/username/package.json                                                       | true                      |
| c:/home/username/folderAtRoot/package.json                                          | true                      |
| c:/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: c:/users/username/folderAtRoot/folder1/folder2/folder3

Root: c:/users/username/folderAtRoot/folder1/folder2/folder3

| File                                                                                | canWatchAffectingLocation |
| ----------------------------------------------------------------------------------- | ------------------------- |
| c:/package.json                                                                     | false                     |
| c:/folderAtRoot/package.json                                                        | true                      |
| c:/folderAtRoot/folder1/package.json                                                | true                      |
| c:/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| c:/users/package.json                                                               | false                     |
| c:/users/username/package.json                                                      | false                     |
| c:/users/username/folderAtRoot/package.json                                         | true                      |
| c:/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| c:/user/package.json                                                                | true                      |
| c:/user/username/package.json                                                       | true                      |
| c:/user/username/folderAtRoot/package.json                                          | true                      |
| c:/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| c:/usr/package.json                                                                 | true                      |
| c:/usr/username/package.json                                                        | true                      |
| c:/usr/username/folderAtRoot/package.json                                           | true                      |
| c:/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| c:/home/package.json                                                                | true                      |
| c:/home/username/package.json                                                       | true                      |
| c:/home/username/folderAtRoot/package.json                                          | true                      |
| c:/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4

Root: c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4

| File                                                                                | canWatchAffectingLocation |
| ----------------------------------------------------------------------------------- | ------------------------- |
| c:/package.json                                                                     | false                     |
| c:/folderAtRoot/package.json                                                        | true                      |
| c:/folderAtRoot/folder1/package.json                                                | true                      |
| c:/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| c:/users/package.json                                                               | false                     |
| c:/users/username/package.json                                                      | false                     |
| c:/users/username/folderAtRoot/package.json                                         | true                      |
| c:/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| c:/user/package.json                                                                | true                      |
| c:/user/username/package.json                                                       | true                      |
| c:/user/username/folderAtRoot/package.json                                          | true                      |
| c:/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| c:/usr/package.json                                                                 | true                      |
| c:/usr/username/package.json                                                        | true                      |
| c:/usr/username/folderAtRoot/package.json                                           | true                      |
| c:/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| c:/home/package.json                                                                | true                      |
| c:/home/username/package.json                                                       | true                      |
| c:/home/username/folderAtRoot/package.json                                          | true                      |
| c:/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

Root: c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

| File                                                                                | canWatchAffectingLocation |
| ----------------------------------------------------------------------------------- | ------------------------- |
| c:/package.json                                                                     | false                     |
| c:/folderAtRoot/package.json                                                        | true                      |
| c:/folderAtRoot/folder1/package.json                                                | true                      |
| c:/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| c:/users/package.json                                                               | false                     |
| c:/users/username/package.json                                                      | false                     |
| c:/users/username/folderAtRoot/package.json                                         | true                      |
| c:/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| c:/user/package.json                                                                | true                      |
| c:/user/username/package.json                                                       | true                      |
| c:/user/username/folderAtRoot/package.json                                          | true                      |
| c:/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| c:/usr/package.json                                                                 | true                      |
| c:/usr/username/package.json                                                        | true                      |
| c:/usr/username/folderAtRoot/package.json                                           | true                      |
| c:/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| c:/home/package.json                                                                | true                      |
| c:/home/username/package.json                                                       | true                      |
| c:/home/username/folderAtRoot/package.json                                          | true                      |
| c:/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: c:/user

Root: c:/user

| File                                                                                | canWatchAffectingLocation |
| ----------------------------------------------------------------------------------- | ------------------------- |
| c:/package.json                                                                     | false                     |
| c:/folderAtRoot/package.json                                                        | true                      |
| c:/folderAtRoot/folder1/package.json                                                | true                      |
| c:/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| c:/users/package.json                                                               | false                     |
| c:/users/username/package.json                                                      | false                     |
| c:/users/username/folderAtRoot/package.json                                         | true                      |
| c:/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| c:/user/package.json                                                                | true                      |
| c:/user/username/package.json                                                       | true                      |
| c:/user/username/folderAtRoot/package.json                                          | true                      |
| c:/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| c:/usr/package.json                                                                 | true                      |
| c:/usr/username/package.json                                                        | true                      |
| c:/usr/username/folderAtRoot/package.json                                           | true                      |
| c:/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| c:/home/package.json                                                                | true                      |
| c:/home/username/package.json                                                       | true                      |
| c:/home/username/folderAtRoot/package.json                                          | true                      |
| c:/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: c:/user/username

Root: c:/user/username

| File                                                                                | canWatchAffectingLocation |
| ----------------------------------------------------------------------------------- | ------------------------- |
| c:/package.json                                                                     | false                     |
| c:/folderAtRoot/package.json                                                        | true                      |
| c:/folderAtRoot/folder1/package.json                                                | true                      |
| c:/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| c:/users/package.json                                                               | false                     |
| c:/users/username/package.json                                                      | false                     |
| c:/users/username/folderAtRoot/package.json                                         | true                      |
| c:/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| c:/user/package.json                                                                | true                      |
| c:/user/username/package.json                                                       | true                      |
| c:/user/username/folderAtRoot/package.json                                          | true                      |
| c:/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| c:/usr/package.json                                                                 | true                      |
| c:/usr/username/package.json                                                        | true                      |
| c:/usr/username/folderAtRoot/package.json                                           | true                      |
| c:/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| c:/home/package.json                                                                | true                      |
| c:/home/username/package.json                                                       | true                      |
| c:/home/username/folderAtRoot/package.json                                          | true                      |
| c:/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: c:/user/username/folderAtRoot

Root: c:/user/username/folderAtRoot

| File                                                                                | canWatchAffectingLocation |
| ----------------------------------------------------------------------------------- | ------------------------- |
| c:/package.json                                                                     | false                     |
| c:/folderAtRoot/package.json                                                        | true                      |
| c:/folderAtRoot/folder1/package.json                                                | true                      |
| c:/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| c:/users/package.json                                                               | false                     |
| c:/users/username/package.json                                                      | false                     |
| c:/users/username/folderAtRoot/package.json                                         | true                      |
| c:/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| c:/user/package.json                                                                | true                      |
| c:/user/username/package.json                                                       | true                      |
| c:/user/username/folderAtRoot/package.json                                          | true                      |
| c:/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| c:/usr/package.json                                                                 | true                      |
| c:/usr/username/package.json                                                        | true                      |
| c:/usr/username/folderAtRoot/package.json                                           | true                      |
| c:/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| c:/home/package.json                                                                | true                      |
| c:/home/username/package.json                                                       | true                      |
| c:/home/username/folderAtRoot/package.json                                          | true                      |
| c:/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: c:/user/username/folderAtRoot/folder1

Root: c:/user/username/folderAtRoot/folder1

| File                                                                                | canWatchAffectingLocation |
| ----------------------------------------------------------------------------------- | ------------------------- |
| c:/package.json                                                                     | false                     |
| c:/folderAtRoot/package.json                                                        | true                      |
| c:/folderAtRoot/folder1/package.json                                                | true                      |
| c:/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| c:/users/package.json                                                               | false                     |
| c:/users/username/package.json                                                      | false                     |
| c:/users/username/folderAtRoot/package.json                                         | true                      |
| c:/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| c:/user/package.json                                                                | true                      |
| c:/user/username/package.json                                                       | true                      |
| c:/user/username/folderAtRoot/package.json                                          | true                      |
| c:/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| c:/usr/package.json                                                                 | true                      |
| c:/usr/username/package.json                                                        | true                      |
| c:/usr/username/folderAtRoot/package.json                                           | true                      |
| c:/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| c:/home/package.json                                                                | true                      |
| c:/home/username/package.json                                                       | true                      |
| c:/home/username/folderAtRoot/package.json                                          | true                      |
| c:/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: c:/user/username/folderAtRoot/folder1/folder2

Root: c:/user/username/folderAtRoot/folder1/folder2

| File                                                                                | canWatchAffectingLocation |
| ----------------------------------------------------------------------------------- | ------------------------- |
| c:/package.json                                                                     | false                     |
| c:/folderAtRoot/package.json                                                        | true                      |
| c:/folderAtRoot/folder1/package.json                                                | true                      |
| c:/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| c:/users/package.json                                                               | false                     |
| c:/users/username/package.json                                                      | false                     |
| c:/users/username/folderAtRoot/package.json                                         | true                      |
| c:/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| c:/user/package.json                                                                | true                      |
| c:/user/username/package.json                                                       | true                      |
| c:/user/username/folderAtRoot/package.json                                          | true                      |
| c:/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| c:/usr/package.json                                                                 | true                      |
| c:/usr/username/package.json                                                        | true                      |
| c:/usr/username/folderAtRoot/package.json                                           | true                      |
| c:/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| c:/home/package.json                                                                | true                      |
| c:/home/username/package.json                                                       | true                      |
| c:/home/username/folderAtRoot/package.json                                          | true                      |
| c:/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: c:/user/username/folderAtRoot/folder1/folder2/folder3

Root: c:/user/username/folderAtRoot/folder1/folder2/folder3

| File                                                                                | canWatchAffectingLocation |
| ----------------------------------------------------------------------------------- | ------------------------- |
| c:/package.json                                                                     | false                     |
| c:/folderAtRoot/package.json                                                        | true                      |
| c:/folderAtRoot/folder1/package.json                                                | true                      |
| c:/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| c:/users/package.json                                                               | false                     |
| c:/users/username/package.json                                                      | false                     |
| c:/users/username/folderAtRoot/package.json                                         | true                      |
| c:/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| c:/user/package.json                                                                | true                      |
| c:/user/username/package.json                                                       | true                      |
| c:/user/username/folderAtRoot/package.json                                          | true                      |
| c:/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| c:/usr/package.json                                                                 | true                      |
| c:/usr/username/package.json                                                        | true                      |
| c:/usr/username/folderAtRoot/package.json                                           | true                      |
| c:/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| c:/home/package.json                                                                | true                      |
| c:/home/username/package.json                                                       | true                      |
| c:/home/username/folderAtRoot/package.json                                          | true                      |
| c:/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4

Root: c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4

| File                                                                                | canWatchAffectingLocation |
| ----------------------------------------------------------------------------------- | ------------------------- |
| c:/package.json                                                                     | false                     |
| c:/folderAtRoot/package.json                                                        | true                      |
| c:/folderAtRoot/folder1/package.json                                                | true                      |
| c:/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| c:/users/package.json                                                               | false                     |
| c:/users/username/package.json                                                      | false                     |
| c:/users/username/folderAtRoot/package.json                                         | true                      |
| c:/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| c:/user/package.json                                                                | true                      |
| c:/user/username/package.json                                                       | true                      |
| c:/user/username/folderAtRoot/package.json                                          | true                      |
| c:/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| c:/usr/package.json                                                                 | true                      |
| c:/usr/username/package.json                                                        | true                      |
| c:/usr/username/folderAtRoot/package.json                                           | true                      |
| c:/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| c:/home/package.json                                                                | true                      |
| c:/home/username/package.json                                                       | true                      |
| c:/home/username/folderAtRoot/package.json                                          | true                      |
| c:/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

Root: c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

| File                                                                                | canWatchAffectingLocation |
| ----------------------------------------------------------------------------------- | ------------------------- |
| c:/package.json                                                                     | false                     |
| c:/folderAtRoot/package.json                                                        | true                      |
| c:/folderAtRoot/folder1/package.json                                                | true                      |
| c:/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| c:/users/package.json                                                               | false                     |
| c:/users/username/package.json                                                      | false                     |
| c:/users/username/folderAtRoot/package.json                                         | true                      |
| c:/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| c:/user/package.json                                                                | true                      |
| c:/user/username/package.json                                                       | true                      |
| c:/user/username/folderAtRoot/package.json                                          | true                      |
| c:/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| c:/usr/package.json                                                                 | true                      |
| c:/usr/username/package.json                                                        | true                      |
| c:/usr/username/folderAtRoot/package.json                                           | true                      |
| c:/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| c:/home/package.json                                                                | true                      |
| c:/home/username/package.json                                                       | true                      |
| c:/home/username/folderAtRoot/package.json                                          | true                      |
| c:/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: c:/usr

Root: c:/usr

| File                                                                                | canWatchAffectingLocation |
| ----------------------------------------------------------------------------------- | ------------------------- |
| c:/package.json                                                                     | false                     |
| c:/folderAtRoot/package.json                                                        | true                      |
| c:/folderAtRoot/folder1/package.json                                                | true                      |
| c:/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| c:/users/package.json                                                               | false                     |
| c:/users/username/package.json                                                      | false                     |
| c:/users/username/folderAtRoot/package.json                                         | true                      |
| c:/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| c:/user/package.json                                                                | true                      |
| c:/user/username/package.json                                                       | true                      |
| c:/user/username/folderAtRoot/package.json                                          | true                      |
| c:/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| c:/usr/package.json                                                                 | true                      |
| c:/usr/username/package.json                                                        | true                      |
| c:/usr/username/folderAtRoot/package.json                                           | true                      |
| c:/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| c:/home/package.json                                                                | true                      |
| c:/home/username/package.json                                                       | true                      |
| c:/home/username/folderAtRoot/package.json                                          | true                      |
| c:/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: c:/usr/username

Root: c:/usr/username

| File                                                                                | canWatchAffectingLocation |
| ----------------------------------------------------------------------------------- | ------------------------- |
| c:/package.json                                                                     | false                     |
| c:/folderAtRoot/package.json                                                        | true                      |
| c:/folderAtRoot/folder1/package.json                                                | true                      |
| c:/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| c:/users/package.json                                                               | false                     |
| c:/users/username/package.json                                                      | false                     |
| c:/users/username/folderAtRoot/package.json                                         | true                      |
| c:/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| c:/user/package.json                                                                | true                      |
| c:/user/username/package.json                                                       | true                      |
| c:/user/username/folderAtRoot/package.json                                          | true                      |
| c:/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| c:/usr/package.json                                                                 | true                      |
| c:/usr/username/package.json                                                        | true                      |
| c:/usr/username/folderAtRoot/package.json                                           | true                      |
| c:/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| c:/home/package.json                                                                | true                      |
| c:/home/username/package.json                                                       | true                      |
| c:/home/username/folderAtRoot/package.json                                          | true                      |
| c:/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: c:/usr/username/folderAtRoot

Root: c:/usr/username/folderAtRoot

| File                                                                                | canWatchAffectingLocation |
| ----------------------------------------------------------------------------------- | ------------------------- |
| c:/package.json                                                                     | false                     |
| c:/folderAtRoot/package.json                                                        | true                      |
| c:/folderAtRoot/folder1/package.json                                                | true                      |
| c:/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| c:/users/package.json                                                               | false                     |
| c:/users/username/package.json                                                      | false                     |
| c:/users/username/folderAtRoot/package.json                                         | true                      |
| c:/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| c:/user/package.json                                                                | true                      |
| c:/user/username/package.json                                                       | true                      |
| c:/user/username/folderAtRoot/package.json                                          | true                      |
| c:/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| c:/usr/package.json                                                                 | true                      |
| c:/usr/username/package.json                                                        | true                      |
| c:/usr/username/folderAtRoot/package.json                                           | true                      |
| c:/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| c:/home/package.json                                                                | true                      |
| c:/home/username/package.json                                                       | true                      |
| c:/home/username/folderAtRoot/package.json                                          | true                      |
| c:/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: c:/usr/username/folderAtRoot/folder1

Root: c:/usr/username/folderAtRoot/folder1

| File                                                                                | canWatchAffectingLocation |
| ----------------------------------------------------------------------------------- | ------------------------- |
| c:/package.json                                                                     | false                     |
| c:/folderAtRoot/package.json                                                        | true                      |
| c:/folderAtRoot/folder1/package.json                                                | true                      |
| c:/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| c:/users/package.json                                                               | false                     |
| c:/users/username/package.json                                                      | false                     |
| c:/users/username/folderAtRoot/package.json                                         | true                      |
| c:/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| c:/user/package.json                                                                | true                      |
| c:/user/username/package.json                                                       | true                      |
| c:/user/username/folderAtRoot/package.json                                          | true                      |
| c:/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| c:/usr/package.json                                                                 | true                      |
| c:/usr/username/package.json                                                        | true                      |
| c:/usr/username/folderAtRoot/package.json                                           | true                      |
| c:/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| c:/home/package.json                                                                | true                      |
| c:/home/username/package.json                                                       | true                      |
| c:/home/username/folderAtRoot/package.json                                          | true                      |
| c:/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: c:/usr/username/folderAtRoot/folder1/folder2

Root: c:/usr/username/folderAtRoot/folder1/folder2

| File                                                                                | canWatchAffectingLocation |
| ----------------------------------------------------------------------------------- | ------------------------- |
| c:/package.json                                                                     | false                     |
| c:/folderAtRoot/package.json                                                        | true                      |
| c:/folderAtRoot/folder1/package.json                                                | true                      |
| c:/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| c:/users/package.json                                                               | false                     |
| c:/users/username/package.json                                                      | false                     |
| c:/users/username/folderAtRoot/package.json                                         | true                      |
| c:/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| c:/user/package.json                                                                | true                      |
| c:/user/username/package.json                                                       | true                      |
| c:/user/username/folderAtRoot/package.json                                          | true                      |
| c:/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| c:/usr/package.json                                                                 | true                      |
| c:/usr/username/package.json                                                        | true                      |
| c:/usr/username/folderAtRoot/package.json                                           | true                      |
| c:/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| c:/home/package.json                                                                | true                      |
| c:/home/username/package.json                                                       | true                      |
| c:/home/username/folderAtRoot/package.json                                          | true                      |
| c:/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: c:/usr/username/folderAtRoot/folder1/folder2/folder3

Root: c:/usr/username/folderAtRoot/folder1/folder2/folder3

| File                                                                                | canWatchAffectingLocation |
| ----------------------------------------------------------------------------------- | ------------------------- |
| c:/package.json                                                                     | false                     |
| c:/folderAtRoot/package.json                                                        | true                      |
| c:/folderAtRoot/folder1/package.json                                                | true                      |
| c:/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| c:/users/package.json                                                               | false                     |
| c:/users/username/package.json                                                      | false                     |
| c:/users/username/folderAtRoot/package.json                                         | true                      |
| c:/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| c:/user/package.json                                                                | true                      |
| c:/user/username/package.json                                                       | true                      |
| c:/user/username/folderAtRoot/package.json                                          | true                      |
| c:/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| c:/usr/package.json                                                                 | true                      |
| c:/usr/username/package.json                                                        | true                      |
| c:/usr/username/folderAtRoot/package.json                                           | true                      |
| c:/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| c:/home/package.json                                                                | true                      |
| c:/home/username/package.json                                                       | true                      |
| c:/home/username/folderAtRoot/package.json                                          | true                      |
| c:/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4

Root: c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4

| File                                                                                | canWatchAffectingLocation |
| ----------------------------------------------------------------------------------- | ------------------------- |
| c:/package.json                                                                     | false                     |
| c:/folderAtRoot/package.json                                                        | true                      |
| c:/folderAtRoot/folder1/package.json                                                | true                      |
| c:/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| c:/users/package.json                                                               | false                     |
| c:/users/username/package.json                                                      | false                     |
| c:/users/username/folderAtRoot/package.json                                         | true                      |
| c:/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| c:/user/package.json                                                                | true                      |
| c:/user/username/package.json                                                       | true                      |
| c:/user/username/folderAtRoot/package.json                                          | true                      |
| c:/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| c:/usr/package.json                                                                 | true                      |
| c:/usr/username/package.json                                                        | true                      |
| c:/usr/username/folderAtRoot/package.json                                           | true                      |
| c:/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| c:/home/package.json                                                                | true                      |
| c:/home/username/package.json                                                       | true                      |
| c:/home/username/folderAtRoot/package.json                                          | true                      |
| c:/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

Root: c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

| File                                                                                | canWatchAffectingLocation |
| ----------------------------------------------------------------------------------- | ------------------------- |
| c:/package.json                                                                     | false                     |
| c:/folderAtRoot/package.json                                                        | true                      |
| c:/folderAtRoot/folder1/package.json                                                | true                      |
| c:/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| c:/users/package.json                                                               | false                     |
| c:/users/username/package.json                                                      | false                     |
| c:/users/username/folderAtRoot/package.json                                         | true                      |
| c:/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| c:/user/package.json                                                                | true                      |
| c:/user/username/package.json                                                       | true                      |
| c:/user/username/folderAtRoot/package.json                                          | true                      |
| c:/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| c:/usr/package.json                                                                 | true                      |
| c:/usr/username/package.json                                                        | true                      |
| c:/usr/username/folderAtRoot/package.json                                           | true                      |
| c:/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| c:/home/package.json                                                                | true                      |
| c:/home/username/package.json                                                       | true                      |
| c:/home/username/folderAtRoot/package.json                                          | true                      |
| c:/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: c:/home

Root: c:/home

| File                                                                                | canWatchAffectingLocation |
| ----------------------------------------------------------------------------------- | ------------------------- |
| c:/package.json                                                                     | false                     |
| c:/folderAtRoot/package.json                                                        | true                      |
| c:/folderAtRoot/folder1/package.json                                                | true                      |
| c:/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| c:/users/package.json                                                               | false                     |
| c:/users/username/package.json                                                      | false                     |
| c:/users/username/folderAtRoot/package.json                                         | true                      |
| c:/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| c:/user/package.json                                                                | true                      |
| c:/user/username/package.json                                                       | true                      |
| c:/user/username/folderAtRoot/package.json                                          | true                      |
| c:/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| c:/usr/package.json                                                                 | true                      |
| c:/usr/username/package.json                                                        | true                      |
| c:/usr/username/folderAtRoot/package.json                                           | true                      |
| c:/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| c:/home/package.json                                                                | true                      |
| c:/home/username/package.json                                                       | true                      |
| c:/home/username/folderAtRoot/package.json                                          | true                      |
| c:/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: c:/home/username

Root: c:/home/username

| File                                                                                | canWatchAffectingLocation |
| ----------------------------------------------------------------------------------- | ------------------------- |
| c:/package.json                                                                     | false                     |
| c:/folderAtRoot/package.json                                                        | true                      |
| c:/folderAtRoot/folder1/package.json                                                | true                      |
| c:/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| c:/users/package.json                                                               | false                     |
| c:/users/username/package.json                                                      | false                     |
| c:/users/username/folderAtRoot/package.json                                         | true                      |
| c:/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| c:/user/package.json                                                                | true                      |
| c:/user/username/package.json                                                       | true                      |
| c:/user/username/folderAtRoot/package.json                                          | true                      |
| c:/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| c:/usr/package.json                                                                 | true                      |
| c:/usr/username/package.json                                                        | true                      |
| c:/usr/username/folderAtRoot/package.json                                           | true                      |
| c:/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| c:/home/package.json                                                                | true                      |
| c:/home/username/package.json                                                       | true                      |
| c:/home/username/folderAtRoot/package.json                                          | true                      |
| c:/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: c:/home/username/folderAtRoot

Root: c:/home/username/folderAtRoot

| File                                                                                | canWatchAffectingLocation |
| ----------------------------------------------------------------------------------- | ------------------------- |
| c:/package.json                                                                     | false                     |
| c:/folderAtRoot/package.json                                                        | true                      |
| c:/folderAtRoot/folder1/package.json                                                | true                      |
| c:/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| c:/users/package.json                                                               | false                     |
| c:/users/username/package.json                                                      | false                     |
| c:/users/username/folderAtRoot/package.json                                         | true                      |
| c:/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| c:/user/package.json                                                                | true                      |
| c:/user/username/package.json                                                       | true                      |
| c:/user/username/folderAtRoot/package.json                                          | true                      |
| c:/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| c:/usr/package.json                                                                 | true                      |
| c:/usr/username/package.json                                                        | true                      |
| c:/usr/username/folderAtRoot/package.json                                           | true                      |
| c:/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| c:/home/package.json                                                                | true                      |
| c:/home/username/package.json                                                       | true                      |
| c:/home/username/folderAtRoot/package.json                                          | true                      |
| c:/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: c:/home/username/folderAtRoot/folder1

Root: c:/home/username/folderAtRoot/folder1

| File                                                                                | canWatchAffectingLocation |
| ----------------------------------------------------------------------------------- | ------------------------- |
| c:/package.json                                                                     | false                     |
| c:/folderAtRoot/package.json                                                        | true                      |
| c:/folderAtRoot/folder1/package.json                                                | true                      |
| c:/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| c:/users/package.json                                                               | false                     |
| c:/users/username/package.json                                                      | false                     |
| c:/users/username/folderAtRoot/package.json                                         | true                      |
| c:/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| c:/user/package.json                                                                | true                      |
| c:/user/username/package.json                                                       | true                      |
| c:/user/username/folderAtRoot/package.json                                          | true                      |
| c:/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| c:/usr/package.json                                                                 | true                      |
| c:/usr/username/package.json                                                        | true                      |
| c:/usr/username/folderAtRoot/package.json                                           | true                      |
| c:/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| c:/home/package.json                                                                | true                      |
| c:/home/username/package.json                                                       | true                      |
| c:/home/username/folderAtRoot/package.json                                          | true                      |
| c:/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: c:/home/username/folderAtRoot/folder1/folder2

Root: c:/home/username/folderAtRoot/folder1/folder2

| File                                                                                | canWatchAffectingLocation |
| ----------------------------------------------------------------------------------- | ------------------------- |
| c:/package.json                                                                     | false                     |
| c:/folderAtRoot/package.json                                                        | true                      |
| c:/folderAtRoot/folder1/package.json                                                | true                      |
| c:/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| c:/users/package.json                                                               | false                     |
| c:/users/username/package.json                                                      | false                     |
| c:/users/username/folderAtRoot/package.json                                         | true                      |
| c:/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| c:/user/package.json                                                                | true                      |
| c:/user/username/package.json                                                       | true                      |
| c:/user/username/folderAtRoot/package.json                                          | true                      |
| c:/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| c:/usr/package.json                                                                 | true                      |
| c:/usr/username/package.json                                                        | true                      |
| c:/usr/username/folderAtRoot/package.json                                           | true                      |
| c:/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| c:/home/package.json                                                                | true                      |
| c:/home/username/package.json                                                       | true                      |
| c:/home/username/folderAtRoot/package.json                                          | true                      |
| c:/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: c:/home/username/folderAtRoot/folder1/folder2/folder3

Root: c:/home/username/folderAtRoot/folder1/folder2/folder3

| File                                                                                | canWatchAffectingLocation |
| ----------------------------------------------------------------------------------- | ------------------------- |
| c:/package.json                                                                     | false                     |
| c:/folderAtRoot/package.json                                                        | true                      |
| c:/folderAtRoot/folder1/package.json                                                | true                      |
| c:/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| c:/users/package.json                                                               | false                     |
| c:/users/username/package.json                                                      | false                     |
| c:/users/username/folderAtRoot/package.json                                         | true                      |
| c:/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| c:/user/package.json                                                                | true                      |
| c:/user/username/package.json                                                       | true                      |
| c:/user/username/folderAtRoot/package.json                                          | true                      |
| c:/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| c:/usr/package.json                                                                 | true                      |
| c:/usr/username/package.json                                                        | true                      |
| c:/usr/username/folderAtRoot/package.json                                           | true                      |
| c:/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| c:/home/package.json                                                                | true                      |
| c:/home/username/package.json                                                       | true                      |
| c:/home/username/folderAtRoot/package.json                                          | true                      |
| c:/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4

Root: c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4

| File                                                                                | canWatchAffectingLocation |
| ----------------------------------------------------------------------------------- | ------------------------- |
| c:/package.json                                                                     | false                     |
| c:/folderAtRoot/package.json                                                        | true                      |
| c:/folderAtRoot/folder1/package.json                                                | true                      |
| c:/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| c:/users/package.json                                                               | false                     |
| c:/users/username/package.json                                                      | false                     |
| c:/users/username/folderAtRoot/package.json                                         | true                      |
| c:/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| c:/user/package.json                                                                | true                      |
| c:/user/username/package.json                                                       | true                      |
| c:/user/username/folderAtRoot/package.json                                          | true                      |
| c:/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| c:/usr/package.json                                                                 | true                      |
| c:/usr/username/package.json                                                        | true                      |
| c:/usr/username/folderAtRoot/package.json                                           | true                      |
| c:/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| c:/home/package.json                                                                | true                      |
| c:/home/username/package.json                                                       | true                      |
| c:/home/username/folderAtRoot/package.json                                          | true                      |
| c:/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

Root: c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

| File                                                                                | canWatchAffectingLocation |
| ----------------------------------------------------------------------------------- | ------------------------- |
| c:/package.json                                                                     | false                     |
| c:/folderAtRoot/package.json                                                        | true                      |
| c:/folderAtRoot/folder1/package.json                                                | true                      |
| c:/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| c:/users/package.json                                                               | false                     |
| c:/users/username/package.json                                                      | false                     |
| c:/users/username/folderAtRoot/package.json                                         | true                      |
| c:/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| c:/user/package.json                                                                | true                      |
| c:/user/username/package.json                                                       | true                      |
| c:/user/username/folderAtRoot/package.json                                          | true                      |
| c:/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| c:/usr/package.json                                                                 | true                      |
| c:/usr/username/package.json                                                        | true                      |
| c:/usr/username/folderAtRoot/package.json                                           | true                      |
| c:/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| c:/home/package.json                                                                | true                      |
| c:/home/username/package.json                                                       | true                      |
| c:/home/username/folderAtRoot/package.json                                          | true                      |
| c:/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: undefined

Root: undefined

| File                                                                                | canWatchAffectingLocation |
| ----------------------------------------------------------------------------------- | ------------------------- |
| c:/package.json                                                                     | false                     |
| c:/folderAtRoot/package.json                                                        | true                      |
| c:/folderAtRoot/folder1/package.json                                                | true                      |
| c:/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| c:/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| c:/users/package.json                                                               | false                     |
| c:/users/username/package.json                                                      | false                     |
| c:/users/username/folderAtRoot/package.json                                         | true                      |
| c:/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| c:/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| c:/user/package.json                                                                | true                      |
| c:/user/username/package.json                                                       | true                      |
| c:/user/username/folderAtRoot/package.json                                          | true                      |
| c:/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| c:/usr/package.json                                                                 | true                      |
| c:/usr/username/package.json                                                        | true                      |
| c:/usr/username/folderAtRoot/package.json                                           | true                      |
| c:/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| c:/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| c:/home/package.json                                                                | true                      |
| c:/home/username/package.json                                                       | true                      |
| c:/home/username/folderAtRoot/package.json                                          | true                      |
| c:/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| c:/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

