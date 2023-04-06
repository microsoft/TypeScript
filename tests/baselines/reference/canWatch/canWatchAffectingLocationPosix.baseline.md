# canWatchAffectingLocation

Determines if package.json that was found during module resolution and change in it will affect resolution can be watched.

## Testing for Posix root: /

## RootDirForResolution: /

Root: 

| File                                                                              | canWatchAffectingLocation |
| --------------------------------------------------------------------------------- | ------------------------- |
| /package.json                                                                     | false                     |
| /folderAtRoot/package.json                                                        | false                     |
| /folderAtRoot/folder1/package.json                                                | false                     |
| /folderAtRoot/folder1/folder2/package.json                                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| /users/package.json                                                               | false                     |
| /users/username/package.json                                                      | false                     |
| /users/username/folderAtRoot/package.json                                         | true                      |
| /users/username/folderAtRoot/folder1/package.json                                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| /user/package.json                                                                | false                     |
| /user/username/package.json                                                       | false                     |
| /user/username/folderAtRoot/package.json                                          | true                      |
| /user/username/folderAtRoot/folder1/package.json                                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| /usr/package.json                                                                 | false                     |
| /usr/username/package.json                                                        | false                     |
| /usr/username/folderAtRoot/package.json                                           | true                      |
| /usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| /home/package.json                                                                | false                     |
| /home/username/package.json                                                       | false                     |
| /home/username/folderAtRoot/package.json                                          | true                      |
| /home/username/folderAtRoot/folder1/package.json                                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: /folderAtRoot

Root: /folderAtRoot

| File                                                                              | canWatchAffectingLocation |
| --------------------------------------------------------------------------------- | ------------------------- |
| /package.json                                                                     | false                     |
| /folderAtRoot/package.json                                                        | false                     |
| /folderAtRoot/folder1/package.json                                                | false                     |
| /folderAtRoot/folder1/folder2/package.json                                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| /users/package.json                                                               | false                     |
| /users/username/package.json                                                      | false                     |
| /users/username/folderAtRoot/package.json                                         | true                      |
| /users/username/folderAtRoot/folder1/package.json                                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| /user/package.json                                                                | false                     |
| /user/username/package.json                                                       | false                     |
| /user/username/folderAtRoot/package.json                                          | true                      |
| /user/username/folderAtRoot/folder1/package.json                                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| /usr/package.json                                                                 | false                     |
| /usr/username/package.json                                                        | false                     |
| /usr/username/folderAtRoot/package.json                                           | true                      |
| /usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| /home/package.json                                                                | false                     |
| /home/username/package.json                                                       | false                     |
| /home/username/folderAtRoot/package.json                                          | true                      |
| /home/username/folderAtRoot/folder1/package.json                                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: /folderAtRoot/folder1

Root: /folderAtRoot/folder1

| File                                                                              | canWatchAffectingLocation |
| --------------------------------------------------------------------------------- | ------------------------- |
| /package.json                                                                     | false                     |
| /folderAtRoot/package.json                                                        | false                     |
| /folderAtRoot/folder1/package.json                                                | false                     |
| /folderAtRoot/folder1/folder2/package.json                                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| /users/package.json                                                               | false                     |
| /users/username/package.json                                                      | false                     |
| /users/username/folderAtRoot/package.json                                         | true                      |
| /users/username/folderAtRoot/folder1/package.json                                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| /user/package.json                                                                | false                     |
| /user/username/package.json                                                       | false                     |
| /user/username/folderAtRoot/package.json                                          | true                      |
| /user/username/folderAtRoot/folder1/package.json                                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| /usr/package.json                                                                 | false                     |
| /usr/username/package.json                                                        | false                     |
| /usr/username/folderAtRoot/package.json                                           | true                      |
| /usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| /home/package.json                                                                | false                     |
| /home/username/package.json                                                       | false                     |
| /home/username/folderAtRoot/package.json                                          | true                      |
| /home/username/folderAtRoot/folder1/package.json                                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: /folderAtRoot/folder1/folder2

Root: /folderAtRoot/folder1/folder2

| File                                                                              | canWatchAffectingLocation |
| --------------------------------------------------------------------------------- | ------------------------- |
| /package.json                                                                     | false                     |
| /folderAtRoot/package.json                                                        | false                     |
| /folderAtRoot/folder1/package.json                                                | false                     |
| /folderAtRoot/folder1/folder2/package.json                                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| /users/package.json                                                               | false                     |
| /users/username/package.json                                                      | false                     |
| /users/username/folderAtRoot/package.json                                         | true                      |
| /users/username/folderAtRoot/folder1/package.json                                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| /user/package.json                                                                | false                     |
| /user/username/package.json                                                       | false                     |
| /user/username/folderAtRoot/package.json                                          | true                      |
| /user/username/folderAtRoot/folder1/package.json                                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| /usr/package.json                                                                 | false                     |
| /usr/username/package.json                                                        | false                     |
| /usr/username/folderAtRoot/package.json                                           | true                      |
| /usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| /home/package.json                                                                | false                     |
| /home/username/package.json                                                       | false                     |
| /home/username/folderAtRoot/package.json                                          | true                      |
| /home/username/folderAtRoot/folder1/package.json                                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: /folderAtRoot/folder1/folder2/folder3

Root: /folderAtRoot/folder1/folder2/folder3

| File                                                                              | canWatchAffectingLocation |
| --------------------------------------------------------------------------------- | ------------------------- |
| /package.json                                                                     | false                     |
| /folderAtRoot/package.json                                                        | false                     |
| /folderAtRoot/folder1/package.json                                                | false                     |
| /folderAtRoot/folder1/folder2/package.json                                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| /users/package.json                                                               | false                     |
| /users/username/package.json                                                      | false                     |
| /users/username/folderAtRoot/package.json                                         | true                      |
| /users/username/folderAtRoot/folder1/package.json                                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| /user/package.json                                                                | false                     |
| /user/username/package.json                                                       | false                     |
| /user/username/folderAtRoot/package.json                                          | true                      |
| /user/username/folderAtRoot/folder1/package.json                                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| /usr/package.json                                                                 | false                     |
| /usr/username/package.json                                                        | false                     |
| /usr/username/folderAtRoot/package.json                                           | true                      |
| /usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| /home/package.json                                                                | false                     |
| /home/username/package.json                                                       | false                     |
| /home/username/folderAtRoot/package.json                                          | true                      |
| /home/username/folderAtRoot/folder1/package.json                                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: /folderAtRoot/folder1/folder2/folder3/folder4

Root: /folderAtRoot/folder1/folder2/folder3/folder4

| File                                                                              | canWatchAffectingLocation |
| --------------------------------------------------------------------------------- | ------------------------- |
| /package.json                                                                     | false                     |
| /folderAtRoot/package.json                                                        | false                     |
| /folderAtRoot/folder1/package.json                                                | false                     |
| /folderAtRoot/folder1/folder2/package.json                                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| /users/package.json                                                               | false                     |
| /users/username/package.json                                                      | false                     |
| /users/username/folderAtRoot/package.json                                         | true                      |
| /users/username/folderAtRoot/folder1/package.json                                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| /user/package.json                                                                | false                     |
| /user/username/package.json                                                       | false                     |
| /user/username/folderAtRoot/package.json                                          | true                      |
| /user/username/folderAtRoot/folder1/package.json                                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| /usr/package.json                                                                 | false                     |
| /usr/username/package.json                                                        | false                     |
| /usr/username/folderAtRoot/package.json                                           | true                      |
| /usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| /home/package.json                                                                | false                     |
| /home/username/package.json                                                       | false                     |
| /home/username/folderAtRoot/package.json                                          | true                      |
| /home/username/folderAtRoot/folder1/package.json                                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: /folderAtRoot/folder1/folder2/folder3/folder4/folder5

Root: /folderAtRoot/folder1/folder2/folder3/folder4/folder5

| File                                                                              | canWatchAffectingLocation |
| --------------------------------------------------------------------------------- | ------------------------- |
| /package.json                                                                     | false                     |
| /folderAtRoot/package.json                                                        | false                     |
| /folderAtRoot/folder1/package.json                                                | false                     |
| /folderAtRoot/folder1/folder2/package.json                                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| /users/package.json                                                               | false                     |
| /users/username/package.json                                                      | false                     |
| /users/username/folderAtRoot/package.json                                         | true                      |
| /users/username/folderAtRoot/folder1/package.json                                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| /user/package.json                                                                | false                     |
| /user/username/package.json                                                       | false                     |
| /user/username/folderAtRoot/package.json                                          | true                      |
| /user/username/folderAtRoot/folder1/package.json                                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| /usr/package.json                                                                 | false                     |
| /usr/username/package.json                                                        | false                     |
| /usr/username/folderAtRoot/package.json                                           | true                      |
| /usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| /home/package.json                                                                | false                     |
| /home/username/package.json                                                       | false                     |
| /home/username/folderAtRoot/package.json                                          | true                      |
| /home/username/folderAtRoot/folder1/package.json                                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: /users

Root: /users

| File                                                                              | canWatchAffectingLocation |
| --------------------------------------------------------------------------------- | ------------------------- |
| /package.json                                                                     | false                     |
| /folderAtRoot/package.json                                                        | false                     |
| /folderAtRoot/folder1/package.json                                                | false                     |
| /folderAtRoot/folder1/folder2/package.json                                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| /users/package.json                                                               | false                     |
| /users/username/package.json                                                      | false                     |
| /users/username/folderAtRoot/package.json                                         | true                      |
| /users/username/folderAtRoot/folder1/package.json                                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| /user/package.json                                                                | false                     |
| /user/username/package.json                                                       | false                     |
| /user/username/folderAtRoot/package.json                                          | true                      |
| /user/username/folderAtRoot/folder1/package.json                                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| /usr/package.json                                                                 | false                     |
| /usr/username/package.json                                                        | false                     |
| /usr/username/folderAtRoot/package.json                                           | true                      |
| /usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| /home/package.json                                                                | false                     |
| /home/username/package.json                                                       | false                     |
| /home/username/folderAtRoot/package.json                                          | true                      |
| /home/username/folderAtRoot/folder1/package.json                                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: /users/username

Root: /users/username

| File                                                                              | canWatchAffectingLocation |
| --------------------------------------------------------------------------------- | ------------------------- |
| /package.json                                                                     | false                     |
| /folderAtRoot/package.json                                                        | false                     |
| /folderAtRoot/folder1/package.json                                                | false                     |
| /folderAtRoot/folder1/folder2/package.json                                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| /users/package.json                                                               | false                     |
| /users/username/package.json                                                      | false                     |
| /users/username/folderAtRoot/package.json                                         | true                      |
| /users/username/folderAtRoot/folder1/package.json                                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| /user/package.json                                                                | false                     |
| /user/username/package.json                                                       | false                     |
| /user/username/folderAtRoot/package.json                                          | true                      |
| /user/username/folderAtRoot/folder1/package.json                                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| /usr/package.json                                                                 | false                     |
| /usr/username/package.json                                                        | false                     |
| /usr/username/folderAtRoot/package.json                                           | true                      |
| /usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| /home/package.json                                                                | false                     |
| /home/username/package.json                                                       | false                     |
| /home/username/folderAtRoot/package.json                                          | true                      |
| /home/username/folderAtRoot/folder1/package.json                                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: /users/username/folderAtRoot

Root: /users/username/folderAtRoot

| File                                                                              | canWatchAffectingLocation |
| --------------------------------------------------------------------------------- | ------------------------- |
| /package.json                                                                     | false                     |
| /folderAtRoot/package.json                                                        | false                     |
| /folderAtRoot/folder1/package.json                                                | false                     |
| /folderAtRoot/folder1/folder2/package.json                                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| /users/package.json                                                               | false                     |
| /users/username/package.json                                                      | false                     |
| /users/username/folderAtRoot/package.json                                         | true                      |
| /users/username/folderAtRoot/folder1/package.json                                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| /user/package.json                                                                | false                     |
| /user/username/package.json                                                       | false                     |
| /user/username/folderAtRoot/package.json                                          | true                      |
| /user/username/folderAtRoot/folder1/package.json                                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| /usr/package.json                                                                 | false                     |
| /usr/username/package.json                                                        | false                     |
| /usr/username/folderAtRoot/package.json                                           | true                      |
| /usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| /home/package.json                                                                | false                     |
| /home/username/package.json                                                       | false                     |
| /home/username/folderAtRoot/package.json                                          | true                      |
| /home/username/folderAtRoot/folder1/package.json                                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: /users/username/folderAtRoot/folder1

Root: /users/username/folderAtRoot/folder1

| File                                                                              | canWatchAffectingLocation |
| --------------------------------------------------------------------------------- | ------------------------- |
| /package.json                                                                     | false                     |
| /folderAtRoot/package.json                                                        | false                     |
| /folderAtRoot/folder1/package.json                                                | false                     |
| /folderAtRoot/folder1/folder2/package.json                                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| /users/package.json                                                               | false                     |
| /users/username/package.json                                                      | false                     |
| /users/username/folderAtRoot/package.json                                         | true                      |
| /users/username/folderAtRoot/folder1/package.json                                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| /user/package.json                                                                | false                     |
| /user/username/package.json                                                       | false                     |
| /user/username/folderAtRoot/package.json                                          | true                      |
| /user/username/folderAtRoot/folder1/package.json                                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| /usr/package.json                                                                 | false                     |
| /usr/username/package.json                                                        | false                     |
| /usr/username/folderAtRoot/package.json                                           | true                      |
| /usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| /home/package.json                                                                | false                     |
| /home/username/package.json                                                       | false                     |
| /home/username/folderAtRoot/package.json                                          | true                      |
| /home/username/folderAtRoot/folder1/package.json                                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: /users/username/folderAtRoot/folder1/folder2

Root: /users/username/folderAtRoot/folder1/folder2

| File                                                                              | canWatchAffectingLocation |
| --------------------------------------------------------------------------------- | ------------------------- |
| /package.json                                                                     | false                     |
| /folderAtRoot/package.json                                                        | false                     |
| /folderAtRoot/folder1/package.json                                                | false                     |
| /folderAtRoot/folder1/folder2/package.json                                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| /users/package.json                                                               | false                     |
| /users/username/package.json                                                      | false                     |
| /users/username/folderAtRoot/package.json                                         | true                      |
| /users/username/folderAtRoot/folder1/package.json                                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| /user/package.json                                                                | false                     |
| /user/username/package.json                                                       | false                     |
| /user/username/folderAtRoot/package.json                                          | true                      |
| /user/username/folderAtRoot/folder1/package.json                                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| /usr/package.json                                                                 | false                     |
| /usr/username/package.json                                                        | false                     |
| /usr/username/folderAtRoot/package.json                                           | true                      |
| /usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| /home/package.json                                                                | false                     |
| /home/username/package.json                                                       | false                     |
| /home/username/folderAtRoot/package.json                                          | true                      |
| /home/username/folderAtRoot/folder1/package.json                                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: /users/username/folderAtRoot/folder1/folder2/folder3

Root: /users/username/folderAtRoot/folder1/folder2/folder3

| File                                                                              | canWatchAffectingLocation |
| --------------------------------------------------------------------------------- | ------------------------- |
| /package.json                                                                     | false                     |
| /folderAtRoot/package.json                                                        | false                     |
| /folderAtRoot/folder1/package.json                                                | false                     |
| /folderAtRoot/folder1/folder2/package.json                                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| /users/package.json                                                               | false                     |
| /users/username/package.json                                                      | false                     |
| /users/username/folderAtRoot/package.json                                         | true                      |
| /users/username/folderAtRoot/folder1/package.json                                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| /user/package.json                                                                | false                     |
| /user/username/package.json                                                       | false                     |
| /user/username/folderAtRoot/package.json                                          | true                      |
| /user/username/folderAtRoot/folder1/package.json                                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| /usr/package.json                                                                 | false                     |
| /usr/username/package.json                                                        | false                     |
| /usr/username/folderAtRoot/package.json                                           | true                      |
| /usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| /home/package.json                                                                | false                     |
| /home/username/package.json                                                       | false                     |
| /home/username/folderAtRoot/package.json                                          | true                      |
| /home/username/folderAtRoot/folder1/package.json                                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: /users/username/folderAtRoot/folder1/folder2/folder3/folder4

Root: /users/username/folderAtRoot/folder1/folder2/folder3/folder4

| File                                                                              | canWatchAffectingLocation |
| --------------------------------------------------------------------------------- | ------------------------- |
| /package.json                                                                     | false                     |
| /folderAtRoot/package.json                                                        | false                     |
| /folderAtRoot/folder1/package.json                                                | false                     |
| /folderAtRoot/folder1/folder2/package.json                                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| /users/package.json                                                               | false                     |
| /users/username/package.json                                                      | false                     |
| /users/username/folderAtRoot/package.json                                         | true                      |
| /users/username/folderAtRoot/folder1/package.json                                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| /user/package.json                                                                | false                     |
| /user/username/package.json                                                       | false                     |
| /user/username/folderAtRoot/package.json                                          | true                      |
| /user/username/folderAtRoot/folder1/package.json                                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| /usr/package.json                                                                 | false                     |
| /usr/username/package.json                                                        | false                     |
| /usr/username/folderAtRoot/package.json                                           | true                      |
| /usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| /home/package.json                                                                | false                     |
| /home/username/package.json                                                       | false                     |
| /home/username/folderAtRoot/package.json                                          | true                      |
| /home/username/folderAtRoot/folder1/package.json                                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

Root: /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

| File                                                                              | canWatchAffectingLocation |
| --------------------------------------------------------------------------------- | ------------------------- |
| /package.json                                                                     | false                     |
| /folderAtRoot/package.json                                                        | false                     |
| /folderAtRoot/folder1/package.json                                                | false                     |
| /folderAtRoot/folder1/folder2/package.json                                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| /users/package.json                                                               | false                     |
| /users/username/package.json                                                      | false                     |
| /users/username/folderAtRoot/package.json                                         | true                      |
| /users/username/folderAtRoot/folder1/package.json                                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| /user/package.json                                                                | false                     |
| /user/username/package.json                                                       | false                     |
| /user/username/folderAtRoot/package.json                                          | true                      |
| /user/username/folderAtRoot/folder1/package.json                                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| /usr/package.json                                                                 | false                     |
| /usr/username/package.json                                                        | false                     |
| /usr/username/folderAtRoot/package.json                                           | true                      |
| /usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| /home/package.json                                                                | false                     |
| /home/username/package.json                                                       | false                     |
| /home/username/folderAtRoot/package.json                                          | true                      |
| /home/username/folderAtRoot/folder1/package.json                                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: /user

Root: /user

| File                                                                              | canWatchAffectingLocation |
| --------------------------------------------------------------------------------- | ------------------------- |
| /package.json                                                                     | false                     |
| /folderAtRoot/package.json                                                        | false                     |
| /folderAtRoot/folder1/package.json                                                | false                     |
| /folderAtRoot/folder1/folder2/package.json                                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| /users/package.json                                                               | false                     |
| /users/username/package.json                                                      | false                     |
| /users/username/folderAtRoot/package.json                                         | true                      |
| /users/username/folderAtRoot/folder1/package.json                                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| /user/package.json                                                                | false                     |
| /user/username/package.json                                                       | false                     |
| /user/username/folderAtRoot/package.json                                          | true                      |
| /user/username/folderAtRoot/folder1/package.json                                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| /usr/package.json                                                                 | false                     |
| /usr/username/package.json                                                        | false                     |
| /usr/username/folderAtRoot/package.json                                           | true                      |
| /usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| /home/package.json                                                                | false                     |
| /home/username/package.json                                                       | false                     |
| /home/username/folderAtRoot/package.json                                          | true                      |
| /home/username/folderAtRoot/folder1/package.json                                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: /user/username

Root: /user/username

| File                                                                              | canWatchAffectingLocation |
| --------------------------------------------------------------------------------- | ------------------------- |
| /package.json                                                                     | false                     |
| /folderAtRoot/package.json                                                        | false                     |
| /folderAtRoot/folder1/package.json                                                | false                     |
| /folderAtRoot/folder1/folder2/package.json                                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| /users/package.json                                                               | false                     |
| /users/username/package.json                                                      | false                     |
| /users/username/folderAtRoot/package.json                                         | true                      |
| /users/username/folderAtRoot/folder1/package.json                                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| /user/package.json                                                                | false                     |
| /user/username/package.json                                                       | false                     |
| /user/username/folderAtRoot/package.json                                          | true                      |
| /user/username/folderAtRoot/folder1/package.json                                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| /usr/package.json                                                                 | false                     |
| /usr/username/package.json                                                        | false                     |
| /usr/username/folderAtRoot/package.json                                           | true                      |
| /usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| /home/package.json                                                                | false                     |
| /home/username/package.json                                                       | false                     |
| /home/username/folderAtRoot/package.json                                          | true                      |
| /home/username/folderAtRoot/folder1/package.json                                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: /user/username/folderAtRoot

Root: /user/username/folderAtRoot

| File                                                                              | canWatchAffectingLocation |
| --------------------------------------------------------------------------------- | ------------------------- |
| /package.json                                                                     | false                     |
| /folderAtRoot/package.json                                                        | false                     |
| /folderAtRoot/folder1/package.json                                                | false                     |
| /folderAtRoot/folder1/folder2/package.json                                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| /users/package.json                                                               | false                     |
| /users/username/package.json                                                      | false                     |
| /users/username/folderAtRoot/package.json                                         | true                      |
| /users/username/folderAtRoot/folder1/package.json                                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| /user/package.json                                                                | false                     |
| /user/username/package.json                                                       | false                     |
| /user/username/folderAtRoot/package.json                                          | true                      |
| /user/username/folderAtRoot/folder1/package.json                                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| /usr/package.json                                                                 | false                     |
| /usr/username/package.json                                                        | false                     |
| /usr/username/folderAtRoot/package.json                                           | true                      |
| /usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| /home/package.json                                                                | false                     |
| /home/username/package.json                                                       | false                     |
| /home/username/folderAtRoot/package.json                                          | true                      |
| /home/username/folderAtRoot/folder1/package.json                                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: /user/username/folderAtRoot/folder1

Root: /user/username/folderAtRoot/folder1

| File                                                                              | canWatchAffectingLocation |
| --------------------------------------------------------------------------------- | ------------------------- |
| /package.json                                                                     | false                     |
| /folderAtRoot/package.json                                                        | false                     |
| /folderAtRoot/folder1/package.json                                                | false                     |
| /folderAtRoot/folder1/folder2/package.json                                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| /users/package.json                                                               | false                     |
| /users/username/package.json                                                      | false                     |
| /users/username/folderAtRoot/package.json                                         | true                      |
| /users/username/folderAtRoot/folder1/package.json                                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| /user/package.json                                                                | false                     |
| /user/username/package.json                                                       | false                     |
| /user/username/folderAtRoot/package.json                                          | true                      |
| /user/username/folderAtRoot/folder1/package.json                                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| /usr/package.json                                                                 | false                     |
| /usr/username/package.json                                                        | false                     |
| /usr/username/folderAtRoot/package.json                                           | true                      |
| /usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| /home/package.json                                                                | false                     |
| /home/username/package.json                                                       | false                     |
| /home/username/folderAtRoot/package.json                                          | true                      |
| /home/username/folderAtRoot/folder1/package.json                                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: /user/username/folderAtRoot/folder1/folder2

Root: /user/username/folderAtRoot/folder1/folder2

| File                                                                              | canWatchAffectingLocation |
| --------------------------------------------------------------------------------- | ------------------------- |
| /package.json                                                                     | false                     |
| /folderAtRoot/package.json                                                        | false                     |
| /folderAtRoot/folder1/package.json                                                | false                     |
| /folderAtRoot/folder1/folder2/package.json                                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| /users/package.json                                                               | false                     |
| /users/username/package.json                                                      | false                     |
| /users/username/folderAtRoot/package.json                                         | true                      |
| /users/username/folderAtRoot/folder1/package.json                                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| /user/package.json                                                                | false                     |
| /user/username/package.json                                                       | false                     |
| /user/username/folderAtRoot/package.json                                          | true                      |
| /user/username/folderAtRoot/folder1/package.json                                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| /usr/package.json                                                                 | false                     |
| /usr/username/package.json                                                        | false                     |
| /usr/username/folderAtRoot/package.json                                           | true                      |
| /usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| /home/package.json                                                                | false                     |
| /home/username/package.json                                                       | false                     |
| /home/username/folderAtRoot/package.json                                          | true                      |
| /home/username/folderAtRoot/folder1/package.json                                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: /user/username/folderAtRoot/folder1/folder2/folder3

Root: /user/username/folderAtRoot/folder1/folder2/folder3

| File                                                                              | canWatchAffectingLocation |
| --------------------------------------------------------------------------------- | ------------------------- |
| /package.json                                                                     | false                     |
| /folderAtRoot/package.json                                                        | false                     |
| /folderAtRoot/folder1/package.json                                                | false                     |
| /folderAtRoot/folder1/folder2/package.json                                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| /users/package.json                                                               | false                     |
| /users/username/package.json                                                      | false                     |
| /users/username/folderAtRoot/package.json                                         | true                      |
| /users/username/folderAtRoot/folder1/package.json                                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| /user/package.json                                                                | false                     |
| /user/username/package.json                                                       | false                     |
| /user/username/folderAtRoot/package.json                                          | true                      |
| /user/username/folderAtRoot/folder1/package.json                                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| /usr/package.json                                                                 | false                     |
| /usr/username/package.json                                                        | false                     |
| /usr/username/folderAtRoot/package.json                                           | true                      |
| /usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| /home/package.json                                                                | false                     |
| /home/username/package.json                                                       | false                     |
| /home/username/folderAtRoot/package.json                                          | true                      |
| /home/username/folderAtRoot/folder1/package.json                                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: /user/username/folderAtRoot/folder1/folder2/folder3/folder4

Root: /user/username/folderAtRoot/folder1/folder2/folder3/folder4

| File                                                                              | canWatchAffectingLocation |
| --------------------------------------------------------------------------------- | ------------------------- |
| /package.json                                                                     | false                     |
| /folderAtRoot/package.json                                                        | false                     |
| /folderAtRoot/folder1/package.json                                                | false                     |
| /folderAtRoot/folder1/folder2/package.json                                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| /users/package.json                                                               | false                     |
| /users/username/package.json                                                      | false                     |
| /users/username/folderAtRoot/package.json                                         | true                      |
| /users/username/folderAtRoot/folder1/package.json                                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| /user/package.json                                                                | false                     |
| /user/username/package.json                                                       | false                     |
| /user/username/folderAtRoot/package.json                                          | true                      |
| /user/username/folderAtRoot/folder1/package.json                                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| /usr/package.json                                                                 | false                     |
| /usr/username/package.json                                                        | false                     |
| /usr/username/folderAtRoot/package.json                                           | true                      |
| /usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| /home/package.json                                                                | false                     |
| /home/username/package.json                                                       | false                     |
| /home/username/folderAtRoot/package.json                                          | true                      |
| /home/username/folderAtRoot/folder1/package.json                                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

Root: /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

| File                                                                              | canWatchAffectingLocation |
| --------------------------------------------------------------------------------- | ------------------------- |
| /package.json                                                                     | false                     |
| /folderAtRoot/package.json                                                        | false                     |
| /folderAtRoot/folder1/package.json                                                | false                     |
| /folderAtRoot/folder1/folder2/package.json                                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| /users/package.json                                                               | false                     |
| /users/username/package.json                                                      | false                     |
| /users/username/folderAtRoot/package.json                                         | true                      |
| /users/username/folderAtRoot/folder1/package.json                                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| /user/package.json                                                                | false                     |
| /user/username/package.json                                                       | false                     |
| /user/username/folderAtRoot/package.json                                          | true                      |
| /user/username/folderAtRoot/folder1/package.json                                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| /usr/package.json                                                                 | false                     |
| /usr/username/package.json                                                        | false                     |
| /usr/username/folderAtRoot/package.json                                           | true                      |
| /usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| /home/package.json                                                                | false                     |
| /home/username/package.json                                                       | false                     |
| /home/username/folderAtRoot/package.json                                          | true                      |
| /home/username/folderAtRoot/folder1/package.json                                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: /usr

Root: /usr

| File                                                                              | canWatchAffectingLocation |
| --------------------------------------------------------------------------------- | ------------------------- |
| /package.json                                                                     | false                     |
| /folderAtRoot/package.json                                                        | false                     |
| /folderAtRoot/folder1/package.json                                                | false                     |
| /folderAtRoot/folder1/folder2/package.json                                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| /users/package.json                                                               | false                     |
| /users/username/package.json                                                      | false                     |
| /users/username/folderAtRoot/package.json                                         | true                      |
| /users/username/folderAtRoot/folder1/package.json                                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| /user/package.json                                                                | false                     |
| /user/username/package.json                                                       | false                     |
| /user/username/folderAtRoot/package.json                                          | true                      |
| /user/username/folderAtRoot/folder1/package.json                                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| /usr/package.json                                                                 | false                     |
| /usr/username/package.json                                                        | false                     |
| /usr/username/folderAtRoot/package.json                                           | true                      |
| /usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| /home/package.json                                                                | false                     |
| /home/username/package.json                                                       | false                     |
| /home/username/folderAtRoot/package.json                                          | true                      |
| /home/username/folderAtRoot/folder1/package.json                                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: /usr/username

Root: /usr/username

| File                                                                              | canWatchAffectingLocation |
| --------------------------------------------------------------------------------- | ------------------------- |
| /package.json                                                                     | false                     |
| /folderAtRoot/package.json                                                        | false                     |
| /folderAtRoot/folder1/package.json                                                | false                     |
| /folderAtRoot/folder1/folder2/package.json                                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| /users/package.json                                                               | false                     |
| /users/username/package.json                                                      | false                     |
| /users/username/folderAtRoot/package.json                                         | true                      |
| /users/username/folderAtRoot/folder1/package.json                                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| /user/package.json                                                                | false                     |
| /user/username/package.json                                                       | false                     |
| /user/username/folderAtRoot/package.json                                          | true                      |
| /user/username/folderAtRoot/folder1/package.json                                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| /usr/package.json                                                                 | false                     |
| /usr/username/package.json                                                        | false                     |
| /usr/username/folderAtRoot/package.json                                           | true                      |
| /usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| /home/package.json                                                                | false                     |
| /home/username/package.json                                                       | false                     |
| /home/username/folderAtRoot/package.json                                          | true                      |
| /home/username/folderAtRoot/folder1/package.json                                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: /usr/username/folderAtRoot

Root: /usr/username/folderAtRoot

| File                                                                              | canWatchAffectingLocation |
| --------------------------------------------------------------------------------- | ------------------------- |
| /package.json                                                                     | false                     |
| /folderAtRoot/package.json                                                        | false                     |
| /folderAtRoot/folder1/package.json                                                | false                     |
| /folderAtRoot/folder1/folder2/package.json                                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| /users/package.json                                                               | false                     |
| /users/username/package.json                                                      | false                     |
| /users/username/folderAtRoot/package.json                                         | true                      |
| /users/username/folderAtRoot/folder1/package.json                                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| /user/package.json                                                                | false                     |
| /user/username/package.json                                                       | false                     |
| /user/username/folderAtRoot/package.json                                          | true                      |
| /user/username/folderAtRoot/folder1/package.json                                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| /usr/package.json                                                                 | false                     |
| /usr/username/package.json                                                        | false                     |
| /usr/username/folderAtRoot/package.json                                           | true                      |
| /usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| /home/package.json                                                                | false                     |
| /home/username/package.json                                                       | false                     |
| /home/username/folderAtRoot/package.json                                          | true                      |
| /home/username/folderAtRoot/folder1/package.json                                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: /usr/username/folderAtRoot/folder1

Root: /usr/username/folderAtRoot/folder1

| File                                                                              | canWatchAffectingLocation |
| --------------------------------------------------------------------------------- | ------------------------- |
| /package.json                                                                     | false                     |
| /folderAtRoot/package.json                                                        | false                     |
| /folderAtRoot/folder1/package.json                                                | false                     |
| /folderAtRoot/folder1/folder2/package.json                                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| /users/package.json                                                               | false                     |
| /users/username/package.json                                                      | false                     |
| /users/username/folderAtRoot/package.json                                         | true                      |
| /users/username/folderAtRoot/folder1/package.json                                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| /user/package.json                                                                | false                     |
| /user/username/package.json                                                       | false                     |
| /user/username/folderAtRoot/package.json                                          | true                      |
| /user/username/folderAtRoot/folder1/package.json                                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| /usr/package.json                                                                 | false                     |
| /usr/username/package.json                                                        | false                     |
| /usr/username/folderAtRoot/package.json                                           | true                      |
| /usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| /home/package.json                                                                | false                     |
| /home/username/package.json                                                       | false                     |
| /home/username/folderAtRoot/package.json                                          | true                      |
| /home/username/folderAtRoot/folder1/package.json                                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: /usr/username/folderAtRoot/folder1/folder2

Root: /usr/username/folderAtRoot/folder1/folder2

| File                                                                              | canWatchAffectingLocation |
| --------------------------------------------------------------------------------- | ------------------------- |
| /package.json                                                                     | false                     |
| /folderAtRoot/package.json                                                        | false                     |
| /folderAtRoot/folder1/package.json                                                | false                     |
| /folderAtRoot/folder1/folder2/package.json                                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| /users/package.json                                                               | false                     |
| /users/username/package.json                                                      | false                     |
| /users/username/folderAtRoot/package.json                                         | true                      |
| /users/username/folderAtRoot/folder1/package.json                                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| /user/package.json                                                                | false                     |
| /user/username/package.json                                                       | false                     |
| /user/username/folderAtRoot/package.json                                          | true                      |
| /user/username/folderAtRoot/folder1/package.json                                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| /usr/package.json                                                                 | false                     |
| /usr/username/package.json                                                        | false                     |
| /usr/username/folderAtRoot/package.json                                           | true                      |
| /usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| /home/package.json                                                                | false                     |
| /home/username/package.json                                                       | false                     |
| /home/username/folderAtRoot/package.json                                          | true                      |
| /home/username/folderAtRoot/folder1/package.json                                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: /usr/username/folderAtRoot/folder1/folder2/folder3

Root: /usr/username/folderAtRoot/folder1/folder2/folder3

| File                                                                              | canWatchAffectingLocation |
| --------------------------------------------------------------------------------- | ------------------------- |
| /package.json                                                                     | false                     |
| /folderAtRoot/package.json                                                        | false                     |
| /folderAtRoot/folder1/package.json                                                | false                     |
| /folderAtRoot/folder1/folder2/package.json                                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| /users/package.json                                                               | false                     |
| /users/username/package.json                                                      | false                     |
| /users/username/folderAtRoot/package.json                                         | true                      |
| /users/username/folderAtRoot/folder1/package.json                                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| /user/package.json                                                                | false                     |
| /user/username/package.json                                                       | false                     |
| /user/username/folderAtRoot/package.json                                          | true                      |
| /user/username/folderAtRoot/folder1/package.json                                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| /usr/package.json                                                                 | false                     |
| /usr/username/package.json                                                        | false                     |
| /usr/username/folderAtRoot/package.json                                           | true                      |
| /usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| /home/package.json                                                                | false                     |
| /home/username/package.json                                                       | false                     |
| /home/username/folderAtRoot/package.json                                          | true                      |
| /home/username/folderAtRoot/folder1/package.json                                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: /usr/username/folderAtRoot/folder1/folder2/folder3/folder4

Root: /usr/username/folderAtRoot/folder1/folder2/folder3/folder4

| File                                                                              | canWatchAffectingLocation |
| --------------------------------------------------------------------------------- | ------------------------- |
| /package.json                                                                     | false                     |
| /folderAtRoot/package.json                                                        | false                     |
| /folderAtRoot/folder1/package.json                                                | false                     |
| /folderAtRoot/folder1/folder2/package.json                                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| /users/package.json                                                               | false                     |
| /users/username/package.json                                                      | false                     |
| /users/username/folderAtRoot/package.json                                         | true                      |
| /users/username/folderAtRoot/folder1/package.json                                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| /user/package.json                                                                | false                     |
| /user/username/package.json                                                       | false                     |
| /user/username/folderAtRoot/package.json                                          | true                      |
| /user/username/folderAtRoot/folder1/package.json                                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| /usr/package.json                                                                 | false                     |
| /usr/username/package.json                                                        | false                     |
| /usr/username/folderAtRoot/package.json                                           | true                      |
| /usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| /home/package.json                                                                | false                     |
| /home/username/package.json                                                       | false                     |
| /home/username/folderAtRoot/package.json                                          | true                      |
| /home/username/folderAtRoot/folder1/package.json                                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

Root: /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

| File                                                                              | canWatchAffectingLocation |
| --------------------------------------------------------------------------------- | ------------------------- |
| /package.json                                                                     | false                     |
| /folderAtRoot/package.json                                                        | false                     |
| /folderAtRoot/folder1/package.json                                                | false                     |
| /folderAtRoot/folder1/folder2/package.json                                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| /users/package.json                                                               | false                     |
| /users/username/package.json                                                      | false                     |
| /users/username/folderAtRoot/package.json                                         | true                      |
| /users/username/folderAtRoot/folder1/package.json                                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| /user/package.json                                                                | false                     |
| /user/username/package.json                                                       | false                     |
| /user/username/folderAtRoot/package.json                                          | true                      |
| /user/username/folderAtRoot/folder1/package.json                                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| /usr/package.json                                                                 | false                     |
| /usr/username/package.json                                                        | false                     |
| /usr/username/folderAtRoot/package.json                                           | true                      |
| /usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| /home/package.json                                                                | false                     |
| /home/username/package.json                                                       | false                     |
| /home/username/folderAtRoot/package.json                                          | true                      |
| /home/username/folderAtRoot/folder1/package.json                                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: /home

Root: /home

| File                                                                              | canWatchAffectingLocation |
| --------------------------------------------------------------------------------- | ------------------------- |
| /package.json                                                                     | false                     |
| /folderAtRoot/package.json                                                        | false                     |
| /folderAtRoot/folder1/package.json                                                | false                     |
| /folderAtRoot/folder1/folder2/package.json                                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| /users/package.json                                                               | false                     |
| /users/username/package.json                                                      | false                     |
| /users/username/folderAtRoot/package.json                                         | true                      |
| /users/username/folderAtRoot/folder1/package.json                                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| /user/package.json                                                                | false                     |
| /user/username/package.json                                                       | false                     |
| /user/username/folderAtRoot/package.json                                          | true                      |
| /user/username/folderAtRoot/folder1/package.json                                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| /usr/package.json                                                                 | false                     |
| /usr/username/package.json                                                        | false                     |
| /usr/username/folderAtRoot/package.json                                           | true                      |
| /usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| /home/package.json                                                                | false                     |
| /home/username/package.json                                                       | false                     |
| /home/username/folderAtRoot/package.json                                          | true                      |
| /home/username/folderAtRoot/folder1/package.json                                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: /home/username

Root: /home/username

| File                                                                              | canWatchAffectingLocation |
| --------------------------------------------------------------------------------- | ------------------------- |
| /package.json                                                                     | false                     |
| /folderAtRoot/package.json                                                        | false                     |
| /folderAtRoot/folder1/package.json                                                | false                     |
| /folderAtRoot/folder1/folder2/package.json                                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| /users/package.json                                                               | false                     |
| /users/username/package.json                                                      | false                     |
| /users/username/folderAtRoot/package.json                                         | true                      |
| /users/username/folderAtRoot/folder1/package.json                                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| /user/package.json                                                                | false                     |
| /user/username/package.json                                                       | false                     |
| /user/username/folderAtRoot/package.json                                          | true                      |
| /user/username/folderAtRoot/folder1/package.json                                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| /usr/package.json                                                                 | false                     |
| /usr/username/package.json                                                        | false                     |
| /usr/username/folderAtRoot/package.json                                           | true                      |
| /usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| /home/package.json                                                                | false                     |
| /home/username/package.json                                                       | false                     |
| /home/username/folderAtRoot/package.json                                          | true                      |
| /home/username/folderAtRoot/folder1/package.json                                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: /home/username/folderAtRoot

Root: /home/username/folderAtRoot

| File                                                                              | canWatchAffectingLocation |
| --------------------------------------------------------------------------------- | ------------------------- |
| /package.json                                                                     | false                     |
| /folderAtRoot/package.json                                                        | false                     |
| /folderAtRoot/folder1/package.json                                                | false                     |
| /folderAtRoot/folder1/folder2/package.json                                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| /users/package.json                                                               | false                     |
| /users/username/package.json                                                      | false                     |
| /users/username/folderAtRoot/package.json                                         | true                      |
| /users/username/folderAtRoot/folder1/package.json                                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| /user/package.json                                                                | false                     |
| /user/username/package.json                                                       | false                     |
| /user/username/folderAtRoot/package.json                                          | true                      |
| /user/username/folderAtRoot/folder1/package.json                                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| /usr/package.json                                                                 | false                     |
| /usr/username/package.json                                                        | false                     |
| /usr/username/folderAtRoot/package.json                                           | true                      |
| /usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| /home/package.json                                                                | false                     |
| /home/username/package.json                                                       | false                     |
| /home/username/folderAtRoot/package.json                                          | true                      |
| /home/username/folderAtRoot/folder1/package.json                                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: /home/username/folderAtRoot/folder1

Root: /home/username/folderAtRoot/folder1

| File                                                                              | canWatchAffectingLocation |
| --------------------------------------------------------------------------------- | ------------------------- |
| /package.json                                                                     | false                     |
| /folderAtRoot/package.json                                                        | false                     |
| /folderAtRoot/folder1/package.json                                                | false                     |
| /folderAtRoot/folder1/folder2/package.json                                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| /users/package.json                                                               | false                     |
| /users/username/package.json                                                      | false                     |
| /users/username/folderAtRoot/package.json                                         | true                      |
| /users/username/folderAtRoot/folder1/package.json                                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| /user/package.json                                                                | false                     |
| /user/username/package.json                                                       | false                     |
| /user/username/folderAtRoot/package.json                                          | true                      |
| /user/username/folderAtRoot/folder1/package.json                                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| /usr/package.json                                                                 | false                     |
| /usr/username/package.json                                                        | false                     |
| /usr/username/folderAtRoot/package.json                                           | true                      |
| /usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| /home/package.json                                                                | false                     |
| /home/username/package.json                                                       | false                     |
| /home/username/folderAtRoot/package.json                                          | true                      |
| /home/username/folderAtRoot/folder1/package.json                                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: /home/username/folderAtRoot/folder1/folder2

Root: /home/username/folderAtRoot/folder1/folder2

| File                                                                              | canWatchAffectingLocation |
| --------------------------------------------------------------------------------- | ------------------------- |
| /package.json                                                                     | false                     |
| /folderAtRoot/package.json                                                        | false                     |
| /folderAtRoot/folder1/package.json                                                | false                     |
| /folderAtRoot/folder1/folder2/package.json                                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| /users/package.json                                                               | false                     |
| /users/username/package.json                                                      | false                     |
| /users/username/folderAtRoot/package.json                                         | true                      |
| /users/username/folderAtRoot/folder1/package.json                                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| /user/package.json                                                                | false                     |
| /user/username/package.json                                                       | false                     |
| /user/username/folderAtRoot/package.json                                          | true                      |
| /user/username/folderAtRoot/folder1/package.json                                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| /usr/package.json                                                                 | false                     |
| /usr/username/package.json                                                        | false                     |
| /usr/username/folderAtRoot/package.json                                           | true                      |
| /usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| /home/package.json                                                                | false                     |
| /home/username/package.json                                                       | false                     |
| /home/username/folderAtRoot/package.json                                          | true                      |
| /home/username/folderAtRoot/folder1/package.json                                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: /home/username/folderAtRoot/folder1/folder2/folder3

Root: /home/username/folderAtRoot/folder1/folder2/folder3

| File                                                                              | canWatchAffectingLocation |
| --------------------------------------------------------------------------------- | ------------------------- |
| /package.json                                                                     | false                     |
| /folderAtRoot/package.json                                                        | false                     |
| /folderAtRoot/folder1/package.json                                                | false                     |
| /folderAtRoot/folder1/folder2/package.json                                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| /users/package.json                                                               | false                     |
| /users/username/package.json                                                      | false                     |
| /users/username/folderAtRoot/package.json                                         | true                      |
| /users/username/folderAtRoot/folder1/package.json                                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| /user/package.json                                                                | false                     |
| /user/username/package.json                                                       | false                     |
| /user/username/folderAtRoot/package.json                                          | true                      |
| /user/username/folderAtRoot/folder1/package.json                                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| /usr/package.json                                                                 | false                     |
| /usr/username/package.json                                                        | false                     |
| /usr/username/folderAtRoot/package.json                                           | true                      |
| /usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| /home/package.json                                                                | false                     |
| /home/username/package.json                                                       | false                     |
| /home/username/folderAtRoot/package.json                                          | true                      |
| /home/username/folderAtRoot/folder1/package.json                                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: /home/username/folderAtRoot/folder1/folder2/folder3/folder4

Root: /home/username/folderAtRoot/folder1/folder2/folder3/folder4

| File                                                                              | canWatchAffectingLocation |
| --------------------------------------------------------------------------------- | ------------------------- |
| /package.json                                                                     | false                     |
| /folderAtRoot/package.json                                                        | false                     |
| /folderAtRoot/folder1/package.json                                                | false                     |
| /folderAtRoot/folder1/folder2/package.json                                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| /users/package.json                                                               | false                     |
| /users/username/package.json                                                      | false                     |
| /users/username/folderAtRoot/package.json                                         | true                      |
| /users/username/folderAtRoot/folder1/package.json                                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| /user/package.json                                                                | false                     |
| /user/username/package.json                                                       | false                     |
| /user/username/folderAtRoot/package.json                                          | true                      |
| /user/username/folderAtRoot/folder1/package.json                                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| /usr/package.json                                                                 | false                     |
| /usr/username/package.json                                                        | false                     |
| /usr/username/folderAtRoot/package.json                                           | true                      |
| /usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| /home/package.json                                                                | false                     |
| /home/username/package.json                                                       | false                     |
| /home/username/folderAtRoot/package.json                                          | true                      |
| /home/username/folderAtRoot/folder1/package.json                                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

Root: /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

| File                                                                              | canWatchAffectingLocation |
| --------------------------------------------------------------------------------- | ------------------------- |
| /package.json                                                                     | false                     |
| /folderAtRoot/package.json                                                        | false                     |
| /folderAtRoot/folder1/package.json                                                | false                     |
| /folderAtRoot/folder1/folder2/package.json                                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| /users/package.json                                                               | false                     |
| /users/username/package.json                                                      | false                     |
| /users/username/folderAtRoot/package.json                                         | true                      |
| /users/username/folderAtRoot/folder1/package.json                                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| /user/package.json                                                                | false                     |
| /user/username/package.json                                                       | false                     |
| /user/username/folderAtRoot/package.json                                          | true                      |
| /user/username/folderAtRoot/folder1/package.json                                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| /usr/package.json                                                                 | false                     |
| /usr/username/package.json                                                        | false                     |
| /usr/username/folderAtRoot/package.json                                           | true                      |
| /usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| /home/package.json                                                                | false                     |
| /home/username/package.json                                                       | false                     |
| /home/username/folderAtRoot/package.json                                          | true                      |
| /home/username/folderAtRoot/folder1/package.json                                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: undefined

Root: undefined

| File                                                                              | canWatchAffectingLocation |
| --------------------------------------------------------------------------------- | ------------------------- |
| /package.json                                                                     | false                     |
| /folderAtRoot/package.json                                                        | false                     |
| /folderAtRoot/folder1/package.json                                                | false                     |
| /folderAtRoot/folder1/folder2/package.json                                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| /users/package.json                                                               | false                     |
| /users/username/package.json                                                      | false                     |
| /users/username/folderAtRoot/package.json                                         | true                      |
| /users/username/folderAtRoot/folder1/package.json                                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| /user/package.json                                                                | false                     |
| /user/username/package.json                                                       | false                     |
| /user/username/folderAtRoot/package.json                                          | true                      |
| /user/username/folderAtRoot/folder1/package.json                                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| /usr/package.json                                                                 | false                     |
| /usr/username/package.json                                                        | false                     |
| /usr/username/folderAtRoot/package.json                                           | true                      |
| /usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| /usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| /home/package.json                                                                | false                     |
| /home/username/package.json                                                       | false                     |
| /home/username/folderAtRoot/package.json                                          | true                      |
| /home/username/folderAtRoot/folder1/package.json                                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| /home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

