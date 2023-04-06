# canWatchAffectingLocation

Determines if package.json that was found during module resolution and change in it will affect resolution can be watched.

## Testing for UncDos root: //vda1cs4850/c$

## RootDirForResolution: //vda1cs4850/c$

Root: //vda1cs4850/c$

| File                                                                                             | canWatchAffectingLocation |
| ------------------------------------------------------------------------------------------------ | ------------------------- |
| //vda1cs4850/c$/package.json                                                                     | false                     |
| //vda1cs4850/c$/folderAtRoot/package.json                                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/package.json                                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| //vda1cs4850/c$/users/package.json                                                               | false                     |
| //vda1cs4850/c$/users/username/package.json                                                      | false                     |
| //vda1cs4850/c$/users/username/folderAtRoot/package.json                                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| //vda1cs4850/c$/user/package.json                                                                | true                      |
| //vda1cs4850/c$/user/username/package.json                                                       | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| //vda1cs4850/c$/usr/package.json                                                                 | true                      |
| //vda1cs4850/c$/usr/username/package.json                                                        | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/package.json                                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| //vda1cs4850/c$/home/package.json                                                                | true                      |
| //vda1cs4850/c$/home/username/package.json                                                       | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: //vda1cs4850/c$/folderAtRoot

Root: //vda1cs4850/c$/folderAtRoot

| File                                                                                             | canWatchAffectingLocation |
| ------------------------------------------------------------------------------------------------ | ------------------------- |
| //vda1cs4850/c$/package.json                                                                     | false                     |
| //vda1cs4850/c$/folderAtRoot/package.json                                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/package.json                                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| //vda1cs4850/c$/users/package.json                                                               | false                     |
| //vda1cs4850/c$/users/username/package.json                                                      | false                     |
| //vda1cs4850/c$/users/username/folderAtRoot/package.json                                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| //vda1cs4850/c$/user/package.json                                                                | true                      |
| //vda1cs4850/c$/user/username/package.json                                                       | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| //vda1cs4850/c$/usr/package.json                                                                 | true                      |
| //vda1cs4850/c$/usr/username/package.json                                                        | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/package.json                                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| //vda1cs4850/c$/home/package.json                                                                | true                      |
| //vda1cs4850/c$/home/username/package.json                                                       | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: //vda1cs4850/c$/folderAtRoot/folder1

Root: //vda1cs4850/c$/folderAtRoot/folder1

| File                                                                                             | canWatchAffectingLocation |
| ------------------------------------------------------------------------------------------------ | ------------------------- |
| //vda1cs4850/c$/package.json                                                                     | false                     |
| //vda1cs4850/c$/folderAtRoot/package.json                                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/package.json                                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| //vda1cs4850/c$/users/package.json                                                               | false                     |
| //vda1cs4850/c$/users/username/package.json                                                      | false                     |
| //vda1cs4850/c$/users/username/folderAtRoot/package.json                                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| //vda1cs4850/c$/user/package.json                                                                | true                      |
| //vda1cs4850/c$/user/username/package.json                                                       | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| //vda1cs4850/c$/usr/package.json                                                                 | true                      |
| //vda1cs4850/c$/usr/username/package.json                                                        | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/package.json                                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| //vda1cs4850/c$/home/package.json                                                                | true                      |
| //vda1cs4850/c$/home/username/package.json                                                       | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: //vda1cs4850/c$/folderAtRoot/folder1/folder2

Root: //vda1cs4850/c$/folderAtRoot/folder1/folder2

| File                                                                                             | canWatchAffectingLocation |
| ------------------------------------------------------------------------------------------------ | ------------------------- |
| //vda1cs4850/c$/package.json                                                                     | false                     |
| //vda1cs4850/c$/folderAtRoot/package.json                                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/package.json                                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| //vda1cs4850/c$/users/package.json                                                               | false                     |
| //vda1cs4850/c$/users/username/package.json                                                      | false                     |
| //vda1cs4850/c$/users/username/folderAtRoot/package.json                                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| //vda1cs4850/c$/user/package.json                                                                | true                      |
| //vda1cs4850/c$/user/username/package.json                                                       | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| //vda1cs4850/c$/usr/package.json                                                                 | true                      |
| //vda1cs4850/c$/usr/username/package.json                                                        | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/package.json                                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| //vda1cs4850/c$/home/package.json                                                                | true                      |
| //vda1cs4850/c$/home/username/package.json                                                       | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3

Root: //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3

| File                                                                                             | canWatchAffectingLocation |
| ------------------------------------------------------------------------------------------------ | ------------------------- |
| //vda1cs4850/c$/package.json                                                                     | false                     |
| //vda1cs4850/c$/folderAtRoot/package.json                                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/package.json                                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| //vda1cs4850/c$/users/package.json                                                               | false                     |
| //vda1cs4850/c$/users/username/package.json                                                      | false                     |
| //vda1cs4850/c$/users/username/folderAtRoot/package.json                                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| //vda1cs4850/c$/user/package.json                                                                | true                      |
| //vda1cs4850/c$/user/username/package.json                                                       | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| //vda1cs4850/c$/usr/package.json                                                                 | true                      |
| //vda1cs4850/c$/usr/username/package.json                                                        | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/package.json                                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| //vda1cs4850/c$/home/package.json                                                                | true                      |
| //vda1cs4850/c$/home/username/package.json                                                       | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4

Root: //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4

| File                                                                                             | canWatchAffectingLocation |
| ------------------------------------------------------------------------------------------------ | ------------------------- |
| //vda1cs4850/c$/package.json                                                                     | false                     |
| //vda1cs4850/c$/folderAtRoot/package.json                                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/package.json                                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| //vda1cs4850/c$/users/package.json                                                               | false                     |
| //vda1cs4850/c$/users/username/package.json                                                      | false                     |
| //vda1cs4850/c$/users/username/folderAtRoot/package.json                                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| //vda1cs4850/c$/user/package.json                                                                | true                      |
| //vda1cs4850/c$/user/username/package.json                                                       | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| //vda1cs4850/c$/usr/package.json                                                                 | true                      |
| //vda1cs4850/c$/usr/username/package.json                                                        | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/package.json                                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| //vda1cs4850/c$/home/package.json                                                                | true                      |
| //vda1cs4850/c$/home/username/package.json                                                       | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5

Root: //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5

| File                                                                                             | canWatchAffectingLocation |
| ------------------------------------------------------------------------------------------------ | ------------------------- |
| //vda1cs4850/c$/package.json                                                                     | false                     |
| //vda1cs4850/c$/folderAtRoot/package.json                                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/package.json                                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| //vda1cs4850/c$/users/package.json                                                               | false                     |
| //vda1cs4850/c$/users/username/package.json                                                      | false                     |
| //vda1cs4850/c$/users/username/folderAtRoot/package.json                                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| //vda1cs4850/c$/user/package.json                                                                | true                      |
| //vda1cs4850/c$/user/username/package.json                                                       | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| //vda1cs4850/c$/usr/package.json                                                                 | true                      |
| //vda1cs4850/c$/usr/username/package.json                                                        | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/package.json                                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| //vda1cs4850/c$/home/package.json                                                                | true                      |
| //vda1cs4850/c$/home/username/package.json                                                       | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: //vda1cs4850/c$/users

Root: //vda1cs4850/c$/users

| File                                                                                             | canWatchAffectingLocation |
| ------------------------------------------------------------------------------------------------ | ------------------------- |
| //vda1cs4850/c$/package.json                                                                     | false                     |
| //vda1cs4850/c$/folderAtRoot/package.json                                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/package.json                                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| //vda1cs4850/c$/users/package.json                                                               | false                     |
| //vda1cs4850/c$/users/username/package.json                                                      | false                     |
| //vda1cs4850/c$/users/username/folderAtRoot/package.json                                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| //vda1cs4850/c$/user/package.json                                                                | true                      |
| //vda1cs4850/c$/user/username/package.json                                                       | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| //vda1cs4850/c$/usr/package.json                                                                 | true                      |
| //vda1cs4850/c$/usr/username/package.json                                                        | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/package.json                                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| //vda1cs4850/c$/home/package.json                                                                | true                      |
| //vda1cs4850/c$/home/username/package.json                                                       | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: //vda1cs4850/c$/users/username

Root: //vda1cs4850/c$/users/username

| File                                                                                             | canWatchAffectingLocation |
| ------------------------------------------------------------------------------------------------ | ------------------------- |
| //vda1cs4850/c$/package.json                                                                     | false                     |
| //vda1cs4850/c$/folderAtRoot/package.json                                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/package.json                                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| //vda1cs4850/c$/users/package.json                                                               | false                     |
| //vda1cs4850/c$/users/username/package.json                                                      | false                     |
| //vda1cs4850/c$/users/username/folderAtRoot/package.json                                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| //vda1cs4850/c$/user/package.json                                                                | true                      |
| //vda1cs4850/c$/user/username/package.json                                                       | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| //vda1cs4850/c$/usr/package.json                                                                 | true                      |
| //vda1cs4850/c$/usr/username/package.json                                                        | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/package.json                                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| //vda1cs4850/c$/home/package.json                                                                | true                      |
| //vda1cs4850/c$/home/username/package.json                                                       | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: //vda1cs4850/c$/users/username/folderAtRoot

Root: //vda1cs4850/c$/users/username/folderAtRoot

| File                                                                                             | canWatchAffectingLocation |
| ------------------------------------------------------------------------------------------------ | ------------------------- |
| //vda1cs4850/c$/package.json                                                                     | false                     |
| //vda1cs4850/c$/folderAtRoot/package.json                                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/package.json                                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| //vda1cs4850/c$/users/package.json                                                               | false                     |
| //vda1cs4850/c$/users/username/package.json                                                      | false                     |
| //vda1cs4850/c$/users/username/folderAtRoot/package.json                                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| //vda1cs4850/c$/user/package.json                                                                | true                      |
| //vda1cs4850/c$/user/username/package.json                                                       | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| //vda1cs4850/c$/usr/package.json                                                                 | true                      |
| //vda1cs4850/c$/usr/username/package.json                                                        | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/package.json                                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| //vda1cs4850/c$/home/package.json                                                                | true                      |
| //vda1cs4850/c$/home/username/package.json                                                       | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: //vda1cs4850/c$/users/username/folderAtRoot/folder1

Root: //vda1cs4850/c$/users/username/folderAtRoot/folder1

| File                                                                                             | canWatchAffectingLocation |
| ------------------------------------------------------------------------------------------------ | ------------------------- |
| //vda1cs4850/c$/package.json                                                                     | false                     |
| //vda1cs4850/c$/folderAtRoot/package.json                                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/package.json                                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| //vda1cs4850/c$/users/package.json                                                               | false                     |
| //vda1cs4850/c$/users/username/package.json                                                      | false                     |
| //vda1cs4850/c$/users/username/folderAtRoot/package.json                                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| //vda1cs4850/c$/user/package.json                                                                | true                      |
| //vda1cs4850/c$/user/username/package.json                                                       | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| //vda1cs4850/c$/usr/package.json                                                                 | true                      |
| //vda1cs4850/c$/usr/username/package.json                                                        | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/package.json                                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| //vda1cs4850/c$/home/package.json                                                                | true                      |
| //vda1cs4850/c$/home/username/package.json                                                       | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2

Root: //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2

| File                                                                                             | canWatchAffectingLocation |
| ------------------------------------------------------------------------------------------------ | ------------------------- |
| //vda1cs4850/c$/package.json                                                                     | false                     |
| //vda1cs4850/c$/folderAtRoot/package.json                                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/package.json                                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| //vda1cs4850/c$/users/package.json                                                               | false                     |
| //vda1cs4850/c$/users/username/package.json                                                      | false                     |
| //vda1cs4850/c$/users/username/folderAtRoot/package.json                                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| //vda1cs4850/c$/user/package.json                                                                | true                      |
| //vda1cs4850/c$/user/username/package.json                                                       | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| //vda1cs4850/c$/usr/package.json                                                                 | true                      |
| //vda1cs4850/c$/usr/username/package.json                                                        | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/package.json                                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| //vda1cs4850/c$/home/package.json                                                                | true                      |
| //vda1cs4850/c$/home/username/package.json                                                       | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3

Root: //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3

| File                                                                                             | canWatchAffectingLocation |
| ------------------------------------------------------------------------------------------------ | ------------------------- |
| //vda1cs4850/c$/package.json                                                                     | false                     |
| //vda1cs4850/c$/folderAtRoot/package.json                                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/package.json                                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| //vda1cs4850/c$/users/package.json                                                               | false                     |
| //vda1cs4850/c$/users/username/package.json                                                      | false                     |
| //vda1cs4850/c$/users/username/folderAtRoot/package.json                                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| //vda1cs4850/c$/user/package.json                                                                | true                      |
| //vda1cs4850/c$/user/username/package.json                                                       | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| //vda1cs4850/c$/usr/package.json                                                                 | true                      |
| //vda1cs4850/c$/usr/username/package.json                                                        | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/package.json                                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| //vda1cs4850/c$/home/package.json                                                                | true                      |
| //vda1cs4850/c$/home/username/package.json                                                       | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4

Root: //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4

| File                                                                                             | canWatchAffectingLocation |
| ------------------------------------------------------------------------------------------------ | ------------------------- |
| //vda1cs4850/c$/package.json                                                                     | false                     |
| //vda1cs4850/c$/folderAtRoot/package.json                                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/package.json                                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| //vda1cs4850/c$/users/package.json                                                               | false                     |
| //vda1cs4850/c$/users/username/package.json                                                      | false                     |
| //vda1cs4850/c$/users/username/folderAtRoot/package.json                                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| //vda1cs4850/c$/user/package.json                                                                | true                      |
| //vda1cs4850/c$/user/username/package.json                                                       | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| //vda1cs4850/c$/usr/package.json                                                                 | true                      |
| //vda1cs4850/c$/usr/username/package.json                                                        | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/package.json                                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| //vda1cs4850/c$/home/package.json                                                                | true                      |
| //vda1cs4850/c$/home/username/package.json                                                       | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

Root: //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

| File                                                                                             | canWatchAffectingLocation |
| ------------------------------------------------------------------------------------------------ | ------------------------- |
| //vda1cs4850/c$/package.json                                                                     | false                     |
| //vda1cs4850/c$/folderAtRoot/package.json                                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/package.json                                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| //vda1cs4850/c$/users/package.json                                                               | false                     |
| //vda1cs4850/c$/users/username/package.json                                                      | false                     |
| //vda1cs4850/c$/users/username/folderAtRoot/package.json                                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| //vda1cs4850/c$/user/package.json                                                                | true                      |
| //vda1cs4850/c$/user/username/package.json                                                       | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| //vda1cs4850/c$/usr/package.json                                                                 | true                      |
| //vda1cs4850/c$/usr/username/package.json                                                        | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/package.json                                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| //vda1cs4850/c$/home/package.json                                                                | true                      |
| //vda1cs4850/c$/home/username/package.json                                                       | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: //vda1cs4850/c$/user

Root: //vda1cs4850/c$/user

| File                                                                                             | canWatchAffectingLocation |
| ------------------------------------------------------------------------------------------------ | ------------------------- |
| //vda1cs4850/c$/package.json                                                                     | false                     |
| //vda1cs4850/c$/folderAtRoot/package.json                                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/package.json                                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| //vda1cs4850/c$/users/package.json                                                               | false                     |
| //vda1cs4850/c$/users/username/package.json                                                      | false                     |
| //vda1cs4850/c$/users/username/folderAtRoot/package.json                                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| //vda1cs4850/c$/user/package.json                                                                | true                      |
| //vda1cs4850/c$/user/username/package.json                                                       | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| //vda1cs4850/c$/usr/package.json                                                                 | true                      |
| //vda1cs4850/c$/usr/username/package.json                                                        | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/package.json                                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| //vda1cs4850/c$/home/package.json                                                                | true                      |
| //vda1cs4850/c$/home/username/package.json                                                       | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: //vda1cs4850/c$/user/username

Root: //vda1cs4850/c$/user/username

| File                                                                                             | canWatchAffectingLocation |
| ------------------------------------------------------------------------------------------------ | ------------------------- |
| //vda1cs4850/c$/package.json                                                                     | false                     |
| //vda1cs4850/c$/folderAtRoot/package.json                                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/package.json                                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| //vda1cs4850/c$/users/package.json                                                               | false                     |
| //vda1cs4850/c$/users/username/package.json                                                      | false                     |
| //vda1cs4850/c$/users/username/folderAtRoot/package.json                                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| //vda1cs4850/c$/user/package.json                                                                | true                      |
| //vda1cs4850/c$/user/username/package.json                                                       | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| //vda1cs4850/c$/usr/package.json                                                                 | true                      |
| //vda1cs4850/c$/usr/username/package.json                                                        | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/package.json                                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| //vda1cs4850/c$/home/package.json                                                                | true                      |
| //vda1cs4850/c$/home/username/package.json                                                       | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: //vda1cs4850/c$/user/username/folderAtRoot

Root: //vda1cs4850/c$/user/username/folderAtRoot

| File                                                                                             | canWatchAffectingLocation |
| ------------------------------------------------------------------------------------------------ | ------------------------- |
| //vda1cs4850/c$/package.json                                                                     | false                     |
| //vda1cs4850/c$/folderAtRoot/package.json                                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/package.json                                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| //vda1cs4850/c$/users/package.json                                                               | false                     |
| //vda1cs4850/c$/users/username/package.json                                                      | false                     |
| //vda1cs4850/c$/users/username/folderAtRoot/package.json                                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| //vda1cs4850/c$/user/package.json                                                                | true                      |
| //vda1cs4850/c$/user/username/package.json                                                       | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| //vda1cs4850/c$/usr/package.json                                                                 | true                      |
| //vda1cs4850/c$/usr/username/package.json                                                        | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/package.json                                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| //vda1cs4850/c$/home/package.json                                                                | true                      |
| //vda1cs4850/c$/home/username/package.json                                                       | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: //vda1cs4850/c$/user/username/folderAtRoot/folder1

Root: //vda1cs4850/c$/user/username/folderAtRoot/folder1

| File                                                                                             | canWatchAffectingLocation |
| ------------------------------------------------------------------------------------------------ | ------------------------- |
| //vda1cs4850/c$/package.json                                                                     | false                     |
| //vda1cs4850/c$/folderAtRoot/package.json                                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/package.json                                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| //vda1cs4850/c$/users/package.json                                                               | false                     |
| //vda1cs4850/c$/users/username/package.json                                                      | false                     |
| //vda1cs4850/c$/users/username/folderAtRoot/package.json                                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| //vda1cs4850/c$/user/package.json                                                                | true                      |
| //vda1cs4850/c$/user/username/package.json                                                       | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| //vda1cs4850/c$/usr/package.json                                                                 | true                      |
| //vda1cs4850/c$/usr/username/package.json                                                        | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/package.json                                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| //vda1cs4850/c$/home/package.json                                                                | true                      |
| //vda1cs4850/c$/home/username/package.json                                                       | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2

Root: //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2

| File                                                                                             | canWatchAffectingLocation |
| ------------------------------------------------------------------------------------------------ | ------------------------- |
| //vda1cs4850/c$/package.json                                                                     | false                     |
| //vda1cs4850/c$/folderAtRoot/package.json                                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/package.json                                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| //vda1cs4850/c$/users/package.json                                                               | false                     |
| //vda1cs4850/c$/users/username/package.json                                                      | false                     |
| //vda1cs4850/c$/users/username/folderAtRoot/package.json                                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| //vda1cs4850/c$/user/package.json                                                                | true                      |
| //vda1cs4850/c$/user/username/package.json                                                       | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| //vda1cs4850/c$/usr/package.json                                                                 | true                      |
| //vda1cs4850/c$/usr/username/package.json                                                        | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/package.json                                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| //vda1cs4850/c$/home/package.json                                                                | true                      |
| //vda1cs4850/c$/home/username/package.json                                                       | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3

Root: //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3

| File                                                                                             | canWatchAffectingLocation |
| ------------------------------------------------------------------------------------------------ | ------------------------- |
| //vda1cs4850/c$/package.json                                                                     | false                     |
| //vda1cs4850/c$/folderAtRoot/package.json                                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/package.json                                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| //vda1cs4850/c$/users/package.json                                                               | false                     |
| //vda1cs4850/c$/users/username/package.json                                                      | false                     |
| //vda1cs4850/c$/users/username/folderAtRoot/package.json                                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| //vda1cs4850/c$/user/package.json                                                                | true                      |
| //vda1cs4850/c$/user/username/package.json                                                       | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| //vda1cs4850/c$/usr/package.json                                                                 | true                      |
| //vda1cs4850/c$/usr/username/package.json                                                        | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/package.json                                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| //vda1cs4850/c$/home/package.json                                                                | true                      |
| //vda1cs4850/c$/home/username/package.json                                                       | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4

Root: //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4

| File                                                                                             | canWatchAffectingLocation |
| ------------------------------------------------------------------------------------------------ | ------------------------- |
| //vda1cs4850/c$/package.json                                                                     | false                     |
| //vda1cs4850/c$/folderAtRoot/package.json                                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/package.json                                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| //vda1cs4850/c$/users/package.json                                                               | false                     |
| //vda1cs4850/c$/users/username/package.json                                                      | false                     |
| //vda1cs4850/c$/users/username/folderAtRoot/package.json                                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| //vda1cs4850/c$/user/package.json                                                                | true                      |
| //vda1cs4850/c$/user/username/package.json                                                       | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| //vda1cs4850/c$/usr/package.json                                                                 | true                      |
| //vda1cs4850/c$/usr/username/package.json                                                        | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/package.json                                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| //vda1cs4850/c$/home/package.json                                                                | true                      |
| //vda1cs4850/c$/home/username/package.json                                                       | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

Root: //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

| File                                                                                             | canWatchAffectingLocation |
| ------------------------------------------------------------------------------------------------ | ------------------------- |
| //vda1cs4850/c$/package.json                                                                     | false                     |
| //vda1cs4850/c$/folderAtRoot/package.json                                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/package.json                                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| //vda1cs4850/c$/users/package.json                                                               | false                     |
| //vda1cs4850/c$/users/username/package.json                                                      | false                     |
| //vda1cs4850/c$/users/username/folderAtRoot/package.json                                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| //vda1cs4850/c$/user/package.json                                                                | true                      |
| //vda1cs4850/c$/user/username/package.json                                                       | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| //vda1cs4850/c$/usr/package.json                                                                 | true                      |
| //vda1cs4850/c$/usr/username/package.json                                                        | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/package.json                                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| //vda1cs4850/c$/home/package.json                                                                | true                      |
| //vda1cs4850/c$/home/username/package.json                                                       | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: //vda1cs4850/c$/usr

Root: //vda1cs4850/c$/usr

| File                                                                                             | canWatchAffectingLocation |
| ------------------------------------------------------------------------------------------------ | ------------------------- |
| //vda1cs4850/c$/package.json                                                                     | false                     |
| //vda1cs4850/c$/folderAtRoot/package.json                                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/package.json                                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| //vda1cs4850/c$/users/package.json                                                               | false                     |
| //vda1cs4850/c$/users/username/package.json                                                      | false                     |
| //vda1cs4850/c$/users/username/folderAtRoot/package.json                                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| //vda1cs4850/c$/user/package.json                                                                | true                      |
| //vda1cs4850/c$/user/username/package.json                                                       | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| //vda1cs4850/c$/usr/package.json                                                                 | true                      |
| //vda1cs4850/c$/usr/username/package.json                                                        | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/package.json                                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| //vda1cs4850/c$/home/package.json                                                                | true                      |
| //vda1cs4850/c$/home/username/package.json                                                       | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: //vda1cs4850/c$/usr/username

Root: //vda1cs4850/c$/usr/username

| File                                                                                             | canWatchAffectingLocation |
| ------------------------------------------------------------------------------------------------ | ------------------------- |
| //vda1cs4850/c$/package.json                                                                     | false                     |
| //vda1cs4850/c$/folderAtRoot/package.json                                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/package.json                                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| //vda1cs4850/c$/users/package.json                                                               | false                     |
| //vda1cs4850/c$/users/username/package.json                                                      | false                     |
| //vda1cs4850/c$/users/username/folderAtRoot/package.json                                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| //vda1cs4850/c$/user/package.json                                                                | true                      |
| //vda1cs4850/c$/user/username/package.json                                                       | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| //vda1cs4850/c$/usr/package.json                                                                 | true                      |
| //vda1cs4850/c$/usr/username/package.json                                                        | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/package.json                                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| //vda1cs4850/c$/home/package.json                                                                | true                      |
| //vda1cs4850/c$/home/username/package.json                                                       | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: //vda1cs4850/c$/usr/username/folderAtRoot

Root: //vda1cs4850/c$/usr/username/folderAtRoot

| File                                                                                             | canWatchAffectingLocation |
| ------------------------------------------------------------------------------------------------ | ------------------------- |
| //vda1cs4850/c$/package.json                                                                     | false                     |
| //vda1cs4850/c$/folderAtRoot/package.json                                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/package.json                                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| //vda1cs4850/c$/users/package.json                                                               | false                     |
| //vda1cs4850/c$/users/username/package.json                                                      | false                     |
| //vda1cs4850/c$/users/username/folderAtRoot/package.json                                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| //vda1cs4850/c$/user/package.json                                                                | true                      |
| //vda1cs4850/c$/user/username/package.json                                                       | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| //vda1cs4850/c$/usr/package.json                                                                 | true                      |
| //vda1cs4850/c$/usr/username/package.json                                                        | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/package.json                                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| //vda1cs4850/c$/home/package.json                                                                | true                      |
| //vda1cs4850/c$/home/username/package.json                                                       | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: //vda1cs4850/c$/usr/username/folderAtRoot/folder1

Root: //vda1cs4850/c$/usr/username/folderAtRoot/folder1

| File                                                                                             | canWatchAffectingLocation |
| ------------------------------------------------------------------------------------------------ | ------------------------- |
| //vda1cs4850/c$/package.json                                                                     | false                     |
| //vda1cs4850/c$/folderAtRoot/package.json                                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/package.json                                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| //vda1cs4850/c$/users/package.json                                                               | false                     |
| //vda1cs4850/c$/users/username/package.json                                                      | false                     |
| //vda1cs4850/c$/users/username/folderAtRoot/package.json                                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| //vda1cs4850/c$/user/package.json                                                                | true                      |
| //vda1cs4850/c$/user/username/package.json                                                       | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| //vda1cs4850/c$/usr/package.json                                                                 | true                      |
| //vda1cs4850/c$/usr/username/package.json                                                        | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/package.json                                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| //vda1cs4850/c$/home/package.json                                                                | true                      |
| //vda1cs4850/c$/home/username/package.json                                                       | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2

Root: //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2

| File                                                                                             | canWatchAffectingLocation |
| ------------------------------------------------------------------------------------------------ | ------------------------- |
| //vda1cs4850/c$/package.json                                                                     | false                     |
| //vda1cs4850/c$/folderAtRoot/package.json                                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/package.json                                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| //vda1cs4850/c$/users/package.json                                                               | false                     |
| //vda1cs4850/c$/users/username/package.json                                                      | false                     |
| //vda1cs4850/c$/users/username/folderAtRoot/package.json                                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| //vda1cs4850/c$/user/package.json                                                                | true                      |
| //vda1cs4850/c$/user/username/package.json                                                       | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| //vda1cs4850/c$/usr/package.json                                                                 | true                      |
| //vda1cs4850/c$/usr/username/package.json                                                        | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/package.json                                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| //vda1cs4850/c$/home/package.json                                                                | true                      |
| //vda1cs4850/c$/home/username/package.json                                                       | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3

Root: //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3

| File                                                                                             | canWatchAffectingLocation |
| ------------------------------------------------------------------------------------------------ | ------------------------- |
| //vda1cs4850/c$/package.json                                                                     | false                     |
| //vda1cs4850/c$/folderAtRoot/package.json                                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/package.json                                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| //vda1cs4850/c$/users/package.json                                                               | false                     |
| //vda1cs4850/c$/users/username/package.json                                                      | false                     |
| //vda1cs4850/c$/users/username/folderAtRoot/package.json                                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| //vda1cs4850/c$/user/package.json                                                                | true                      |
| //vda1cs4850/c$/user/username/package.json                                                       | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| //vda1cs4850/c$/usr/package.json                                                                 | true                      |
| //vda1cs4850/c$/usr/username/package.json                                                        | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/package.json                                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| //vda1cs4850/c$/home/package.json                                                                | true                      |
| //vda1cs4850/c$/home/username/package.json                                                       | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4

Root: //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4

| File                                                                                             | canWatchAffectingLocation |
| ------------------------------------------------------------------------------------------------ | ------------------------- |
| //vda1cs4850/c$/package.json                                                                     | false                     |
| //vda1cs4850/c$/folderAtRoot/package.json                                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/package.json                                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| //vda1cs4850/c$/users/package.json                                                               | false                     |
| //vda1cs4850/c$/users/username/package.json                                                      | false                     |
| //vda1cs4850/c$/users/username/folderAtRoot/package.json                                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| //vda1cs4850/c$/user/package.json                                                                | true                      |
| //vda1cs4850/c$/user/username/package.json                                                       | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| //vda1cs4850/c$/usr/package.json                                                                 | true                      |
| //vda1cs4850/c$/usr/username/package.json                                                        | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/package.json                                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| //vda1cs4850/c$/home/package.json                                                                | true                      |
| //vda1cs4850/c$/home/username/package.json                                                       | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

Root: //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

| File                                                                                             | canWatchAffectingLocation |
| ------------------------------------------------------------------------------------------------ | ------------------------- |
| //vda1cs4850/c$/package.json                                                                     | false                     |
| //vda1cs4850/c$/folderAtRoot/package.json                                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/package.json                                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| //vda1cs4850/c$/users/package.json                                                               | false                     |
| //vda1cs4850/c$/users/username/package.json                                                      | false                     |
| //vda1cs4850/c$/users/username/folderAtRoot/package.json                                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| //vda1cs4850/c$/user/package.json                                                                | true                      |
| //vda1cs4850/c$/user/username/package.json                                                       | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| //vda1cs4850/c$/usr/package.json                                                                 | true                      |
| //vda1cs4850/c$/usr/username/package.json                                                        | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/package.json                                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| //vda1cs4850/c$/home/package.json                                                                | true                      |
| //vda1cs4850/c$/home/username/package.json                                                       | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: //vda1cs4850/c$/home

Root: //vda1cs4850/c$/home

| File                                                                                             | canWatchAffectingLocation |
| ------------------------------------------------------------------------------------------------ | ------------------------- |
| //vda1cs4850/c$/package.json                                                                     | false                     |
| //vda1cs4850/c$/folderAtRoot/package.json                                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/package.json                                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| //vda1cs4850/c$/users/package.json                                                               | false                     |
| //vda1cs4850/c$/users/username/package.json                                                      | false                     |
| //vda1cs4850/c$/users/username/folderAtRoot/package.json                                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| //vda1cs4850/c$/user/package.json                                                                | true                      |
| //vda1cs4850/c$/user/username/package.json                                                       | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| //vda1cs4850/c$/usr/package.json                                                                 | true                      |
| //vda1cs4850/c$/usr/username/package.json                                                        | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/package.json                                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| //vda1cs4850/c$/home/package.json                                                                | true                      |
| //vda1cs4850/c$/home/username/package.json                                                       | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: //vda1cs4850/c$/home/username

Root: //vda1cs4850/c$/home/username

| File                                                                                             | canWatchAffectingLocation |
| ------------------------------------------------------------------------------------------------ | ------------------------- |
| //vda1cs4850/c$/package.json                                                                     | false                     |
| //vda1cs4850/c$/folderAtRoot/package.json                                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/package.json                                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| //vda1cs4850/c$/users/package.json                                                               | false                     |
| //vda1cs4850/c$/users/username/package.json                                                      | false                     |
| //vda1cs4850/c$/users/username/folderAtRoot/package.json                                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| //vda1cs4850/c$/user/package.json                                                                | true                      |
| //vda1cs4850/c$/user/username/package.json                                                       | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| //vda1cs4850/c$/usr/package.json                                                                 | true                      |
| //vda1cs4850/c$/usr/username/package.json                                                        | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/package.json                                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| //vda1cs4850/c$/home/package.json                                                                | true                      |
| //vda1cs4850/c$/home/username/package.json                                                       | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: //vda1cs4850/c$/home/username/folderAtRoot

Root: //vda1cs4850/c$/home/username/folderAtRoot

| File                                                                                             | canWatchAffectingLocation |
| ------------------------------------------------------------------------------------------------ | ------------------------- |
| //vda1cs4850/c$/package.json                                                                     | false                     |
| //vda1cs4850/c$/folderAtRoot/package.json                                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/package.json                                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| //vda1cs4850/c$/users/package.json                                                               | false                     |
| //vda1cs4850/c$/users/username/package.json                                                      | false                     |
| //vda1cs4850/c$/users/username/folderAtRoot/package.json                                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| //vda1cs4850/c$/user/package.json                                                                | true                      |
| //vda1cs4850/c$/user/username/package.json                                                       | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| //vda1cs4850/c$/usr/package.json                                                                 | true                      |
| //vda1cs4850/c$/usr/username/package.json                                                        | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/package.json                                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| //vda1cs4850/c$/home/package.json                                                                | true                      |
| //vda1cs4850/c$/home/username/package.json                                                       | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: //vda1cs4850/c$/home/username/folderAtRoot/folder1

Root: //vda1cs4850/c$/home/username/folderAtRoot/folder1

| File                                                                                             | canWatchAffectingLocation |
| ------------------------------------------------------------------------------------------------ | ------------------------- |
| //vda1cs4850/c$/package.json                                                                     | false                     |
| //vda1cs4850/c$/folderAtRoot/package.json                                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/package.json                                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| //vda1cs4850/c$/users/package.json                                                               | false                     |
| //vda1cs4850/c$/users/username/package.json                                                      | false                     |
| //vda1cs4850/c$/users/username/folderAtRoot/package.json                                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| //vda1cs4850/c$/user/package.json                                                                | true                      |
| //vda1cs4850/c$/user/username/package.json                                                       | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| //vda1cs4850/c$/usr/package.json                                                                 | true                      |
| //vda1cs4850/c$/usr/username/package.json                                                        | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/package.json                                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| //vda1cs4850/c$/home/package.json                                                                | true                      |
| //vda1cs4850/c$/home/username/package.json                                                       | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2

Root: //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2

| File                                                                                             | canWatchAffectingLocation |
| ------------------------------------------------------------------------------------------------ | ------------------------- |
| //vda1cs4850/c$/package.json                                                                     | false                     |
| //vda1cs4850/c$/folderAtRoot/package.json                                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/package.json                                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| //vda1cs4850/c$/users/package.json                                                               | false                     |
| //vda1cs4850/c$/users/username/package.json                                                      | false                     |
| //vda1cs4850/c$/users/username/folderAtRoot/package.json                                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| //vda1cs4850/c$/user/package.json                                                                | true                      |
| //vda1cs4850/c$/user/username/package.json                                                       | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| //vda1cs4850/c$/usr/package.json                                                                 | true                      |
| //vda1cs4850/c$/usr/username/package.json                                                        | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/package.json                                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| //vda1cs4850/c$/home/package.json                                                                | true                      |
| //vda1cs4850/c$/home/username/package.json                                                       | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3

Root: //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3

| File                                                                                             | canWatchAffectingLocation |
| ------------------------------------------------------------------------------------------------ | ------------------------- |
| //vda1cs4850/c$/package.json                                                                     | false                     |
| //vda1cs4850/c$/folderAtRoot/package.json                                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/package.json                                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| //vda1cs4850/c$/users/package.json                                                               | false                     |
| //vda1cs4850/c$/users/username/package.json                                                      | false                     |
| //vda1cs4850/c$/users/username/folderAtRoot/package.json                                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| //vda1cs4850/c$/user/package.json                                                                | true                      |
| //vda1cs4850/c$/user/username/package.json                                                       | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| //vda1cs4850/c$/usr/package.json                                                                 | true                      |
| //vda1cs4850/c$/usr/username/package.json                                                        | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/package.json                                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| //vda1cs4850/c$/home/package.json                                                                | true                      |
| //vda1cs4850/c$/home/username/package.json                                                       | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4

Root: //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4

| File                                                                                             | canWatchAffectingLocation |
| ------------------------------------------------------------------------------------------------ | ------------------------- |
| //vda1cs4850/c$/package.json                                                                     | false                     |
| //vda1cs4850/c$/folderAtRoot/package.json                                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/package.json                                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| //vda1cs4850/c$/users/package.json                                                               | false                     |
| //vda1cs4850/c$/users/username/package.json                                                      | false                     |
| //vda1cs4850/c$/users/username/folderAtRoot/package.json                                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| //vda1cs4850/c$/user/package.json                                                                | true                      |
| //vda1cs4850/c$/user/username/package.json                                                       | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| //vda1cs4850/c$/usr/package.json                                                                 | true                      |
| //vda1cs4850/c$/usr/username/package.json                                                        | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/package.json                                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| //vda1cs4850/c$/home/package.json                                                                | true                      |
| //vda1cs4850/c$/home/username/package.json                                                       | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

Root: //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

| File                                                                                             | canWatchAffectingLocation |
| ------------------------------------------------------------------------------------------------ | ------------------------- |
| //vda1cs4850/c$/package.json                                                                     | false                     |
| //vda1cs4850/c$/folderAtRoot/package.json                                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/package.json                                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| //vda1cs4850/c$/users/package.json                                                               | false                     |
| //vda1cs4850/c$/users/username/package.json                                                      | false                     |
| //vda1cs4850/c$/users/username/folderAtRoot/package.json                                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| //vda1cs4850/c$/user/package.json                                                                | true                      |
| //vda1cs4850/c$/user/username/package.json                                                       | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| //vda1cs4850/c$/usr/package.json                                                                 | true                      |
| //vda1cs4850/c$/usr/username/package.json                                                        | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/package.json                                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| //vda1cs4850/c$/home/package.json                                                                | true                      |
| //vda1cs4850/c$/home/username/package.json                                                       | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: undefined

Root: undefined

| File                                                                                             | canWatchAffectingLocation |
| ------------------------------------------------------------------------------------------------ | ------------------------- |
| //vda1cs4850/c$/package.json                                                                     | false                     |
| //vda1cs4850/c$/folderAtRoot/package.json                                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/package.json                                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| //vda1cs4850/c$/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| //vda1cs4850/c$/users/package.json                                                               | false                     |
| //vda1cs4850/c$/users/username/package.json                                                      | false                     |
| //vda1cs4850/c$/users/username/folderAtRoot/package.json                                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| //vda1cs4850/c$/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| //vda1cs4850/c$/user/package.json                                                                | true                      |
| //vda1cs4850/c$/user/username/package.json                                                       | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |
| //vda1cs4850/c$/usr/package.json                                                                 | true                      |
| //vda1cs4850/c$/usr/username/package.json                                                        | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/package.json                                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/package.json                                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/package.json                           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/package.json                   | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json           | true                      |
| //vda1cs4850/c$/usr/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json   | true                      |
| //vda1cs4850/c$/home/package.json                                                                | true                      |
| //vda1cs4850/c$/home/username/package.json                                                       | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/c$/home/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

