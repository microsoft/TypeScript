# canWatchAffectingLocation

Determines if package.json that was found during module resolution and change in it will affect resolution can be watched.

## Testing for Unc root: //vda1cs4850/

## RootDirForResolution: //vda1cs4850/

Root: //vda1cs4850

| File                                                                                          | canWatchAffectingLocation |
| --------------------------------------------------------------------------------------------- | ------------------------- |
| //vda1cs4850/package.json                                                                     | false                     |
| //vda1cs4850/folderAtRoot/package.json                                                        | true                      |
| //vda1cs4850/folderAtRoot/folder1/package.json                                                | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| //vda1cs4850/users/package.json                                                               | false                     |
| //vda1cs4850/users/username/package.json                                                      | false                     |
| //vda1cs4850/users/username/folderAtRoot/package.json                                         | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| //vda1cs4850/user/package.json                                                                | true                      |
| //vda1cs4850/user/username/package.json                                                       | true                      |
| //vda1cs4850/user/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: //vda1cs4850/folderAtRoot

Root: //vda1cs4850/folderAtRoot

| File                                                                                          | canWatchAffectingLocation |
| --------------------------------------------------------------------------------------------- | ------------------------- |
| //vda1cs4850/package.json                                                                     | false                     |
| //vda1cs4850/folderAtRoot/package.json                                                        | true                      |
| //vda1cs4850/folderAtRoot/folder1/package.json                                                | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| //vda1cs4850/users/package.json                                                               | false                     |
| //vda1cs4850/users/username/package.json                                                      | false                     |
| //vda1cs4850/users/username/folderAtRoot/package.json                                         | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| //vda1cs4850/user/package.json                                                                | true                      |
| //vda1cs4850/user/username/package.json                                                       | true                      |
| //vda1cs4850/user/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: //vda1cs4850/folderAtRoot/folder1

Root: //vda1cs4850/folderAtRoot/folder1

| File                                                                                          | canWatchAffectingLocation |
| --------------------------------------------------------------------------------------------- | ------------------------- |
| //vda1cs4850/package.json                                                                     | false                     |
| //vda1cs4850/folderAtRoot/package.json                                                        | true                      |
| //vda1cs4850/folderAtRoot/folder1/package.json                                                | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| //vda1cs4850/users/package.json                                                               | false                     |
| //vda1cs4850/users/username/package.json                                                      | false                     |
| //vda1cs4850/users/username/folderAtRoot/package.json                                         | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| //vda1cs4850/user/package.json                                                                | true                      |
| //vda1cs4850/user/username/package.json                                                       | true                      |
| //vda1cs4850/user/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: //vda1cs4850/folderAtRoot/folder1/folder2

Root: //vda1cs4850/folderAtRoot/folder1/folder2

| File                                                                                          | canWatchAffectingLocation |
| --------------------------------------------------------------------------------------------- | ------------------------- |
| //vda1cs4850/package.json                                                                     | false                     |
| //vda1cs4850/folderAtRoot/package.json                                                        | true                      |
| //vda1cs4850/folderAtRoot/folder1/package.json                                                | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| //vda1cs4850/users/package.json                                                               | false                     |
| //vda1cs4850/users/username/package.json                                                      | false                     |
| //vda1cs4850/users/username/folderAtRoot/package.json                                         | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| //vda1cs4850/user/package.json                                                                | true                      |
| //vda1cs4850/user/username/package.json                                                       | true                      |
| //vda1cs4850/user/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: //vda1cs4850/folderAtRoot/folder1/folder2/folder3

Root: //vda1cs4850/folderAtRoot/folder1/folder2/folder3

| File                                                                                          | canWatchAffectingLocation |
| --------------------------------------------------------------------------------------------- | ------------------------- |
| //vda1cs4850/package.json                                                                     | false                     |
| //vda1cs4850/folderAtRoot/package.json                                                        | true                      |
| //vda1cs4850/folderAtRoot/folder1/package.json                                                | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| //vda1cs4850/users/package.json                                                               | false                     |
| //vda1cs4850/users/username/package.json                                                      | false                     |
| //vda1cs4850/users/username/folderAtRoot/package.json                                         | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| //vda1cs4850/user/package.json                                                                | true                      |
| //vda1cs4850/user/username/package.json                                                       | true                      |
| //vda1cs4850/user/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4

Root: //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4

| File                                                                                          | canWatchAffectingLocation |
| --------------------------------------------------------------------------------------------- | ------------------------- |
| //vda1cs4850/package.json                                                                     | false                     |
| //vda1cs4850/folderAtRoot/package.json                                                        | true                      |
| //vda1cs4850/folderAtRoot/folder1/package.json                                                | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| //vda1cs4850/users/package.json                                                               | false                     |
| //vda1cs4850/users/username/package.json                                                      | false                     |
| //vda1cs4850/users/username/folderAtRoot/package.json                                         | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| //vda1cs4850/user/package.json                                                                | true                      |
| //vda1cs4850/user/username/package.json                                                       | true                      |
| //vda1cs4850/user/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5

Root: //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5

| File                                                                                          | canWatchAffectingLocation |
| --------------------------------------------------------------------------------------------- | ------------------------- |
| //vda1cs4850/package.json                                                                     | false                     |
| //vda1cs4850/folderAtRoot/package.json                                                        | true                      |
| //vda1cs4850/folderAtRoot/folder1/package.json                                                | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| //vda1cs4850/users/package.json                                                               | false                     |
| //vda1cs4850/users/username/package.json                                                      | false                     |
| //vda1cs4850/users/username/folderAtRoot/package.json                                         | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| //vda1cs4850/user/package.json                                                                | true                      |
| //vda1cs4850/user/username/package.json                                                       | true                      |
| //vda1cs4850/user/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: //vda1cs4850/users

Root: //vda1cs4850/users

| File                                                                                          | canWatchAffectingLocation |
| --------------------------------------------------------------------------------------------- | ------------------------- |
| //vda1cs4850/package.json                                                                     | false                     |
| //vda1cs4850/folderAtRoot/package.json                                                        | true                      |
| //vda1cs4850/folderAtRoot/folder1/package.json                                                | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| //vda1cs4850/users/package.json                                                               | false                     |
| //vda1cs4850/users/username/package.json                                                      | false                     |
| //vda1cs4850/users/username/folderAtRoot/package.json                                         | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| //vda1cs4850/user/package.json                                                                | true                      |
| //vda1cs4850/user/username/package.json                                                       | true                      |
| //vda1cs4850/user/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: //vda1cs4850/users/username

Root: //vda1cs4850/users/username

| File                                                                                          | canWatchAffectingLocation |
| --------------------------------------------------------------------------------------------- | ------------------------- |
| //vda1cs4850/package.json                                                                     | false                     |
| //vda1cs4850/folderAtRoot/package.json                                                        | true                      |
| //vda1cs4850/folderAtRoot/folder1/package.json                                                | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| //vda1cs4850/users/package.json                                                               | false                     |
| //vda1cs4850/users/username/package.json                                                      | false                     |
| //vda1cs4850/users/username/folderAtRoot/package.json                                         | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| //vda1cs4850/user/package.json                                                                | true                      |
| //vda1cs4850/user/username/package.json                                                       | true                      |
| //vda1cs4850/user/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: //vda1cs4850/users/username/folderAtRoot

Root: //vda1cs4850/users/username/folderAtRoot

| File                                                                                          | canWatchAffectingLocation |
| --------------------------------------------------------------------------------------------- | ------------------------- |
| //vda1cs4850/package.json                                                                     | false                     |
| //vda1cs4850/folderAtRoot/package.json                                                        | true                      |
| //vda1cs4850/folderAtRoot/folder1/package.json                                                | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| //vda1cs4850/users/package.json                                                               | false                     |
| //vda1cs4850/users/username/package.json                                                      | false                     |
| //vda1cs4850/users/username/folderAtRoot/package.json                                         | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| //vda1cs4850/user/package.json                                                                | true                      |
| //vda1cs4850/user/username/package.json                                                       | true                      |
| //vda1cs4850/user/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: //vda1cs4850/users/username/folderAtRoot/folder1

Root: //vda1cs4850/users/username/folderAtRoot/folder1

| File                                                                                          | canWatchAffectingLocation |
| --------------------------------------------------------------------------------------------- | ------------------------- |
| //vda1cs4850/package.json                                                                     | false                     |
| //vda1cs4850/folderAtRoot/package.json                                                        | true                      |
| //vda1cs4850/folderAtRoot/folder1/package.json                                                | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| //vda1cs4850/users/package.json                                                               | false                     |
| //vda1cs4850/users/username/package.json                                                      | false                     |
| //vda1cs4850/users/username/folderAtRoot/package.json                                         | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| //vda1cs4850/user/package.json                                                                | true                      |
| //vda1cs4850/user/username/package.json                                                       | true                      |
| //vda1cs4850/user/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: //vda1cs4850/users/username/folderAtRoot/folder1/folder2

Root: //vda1cs4850/users/username/folderAtRoot/folder1/folder2

| File                                                                                          | canWatchAffectingLocation |
| --------------------------------------------------------------------------------------------- | ------------------------- |
| //vda1cs4850/package.json                                                                     | false                     |
| //vda1cs4850/folderAtRoot/package.json                                                        | true                      |
| //vda1cs4850/folderAtRoot/folder1/package.json                                                | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| //vda1cs4850/users/package.json                                                               | false                     |
| //vda1cs4850/users/username/package.json                                                      | false                     |
| //vda1cs4850/users/username/folderAtRoot/package.json                                         | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| //vda1cs4850/user/package.json                                                                | true                      |
| //vda1cs4850/user/username/package.json                                                       | true                      |
| //vda1cs4850/user/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3

Root: //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3

| File                                                                                          | canWatchAffectingLocation |
| --------------------------------------------------------------------------------------------- | ------------------------- |
| //vda1cs4850/package.json                                                                     | false                     |
| //vda1cs4850/folderAtRoot/package.json                                                        | true                      |
| //vda1cs4850/folderAtRoot/folder1/package.json                                                | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| //vda1cs4850/users/package.json                                                               | false                     |
| //vda1cs4850/users/username/package.json                                                      | false                     |
| //vda1cs4850/users/username/folderAtRoot/package.json                                         | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| //vda1cs4850/user/package.json                                                                | true                      |
| //vda1cs4850/user/username/package.json                                                       | true                      |
| //vda1cs4850/user/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4

Root: //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4

| File                                                                                          | canWatchAffectingLocation |
| --------------------------------------------------------------------------------------------- | ------------------------- |
| //vda1cs4850/package.json                                                                     | false                     |
| //vda1cs4850/folderAtRoot/package.json                                                        | true                      |
| //vda1cs4850/folderAtRoot/folder1/package.json                                                | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| //vda1cs4850/users/package.json                                                               | false                     |
| //vda1cs4850/users/username/package.json                                                      | false                     |
| //vda1cs4850/users/username/folderAtRoot/package.json                                         | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| //vda1cs4850/user/package.json                                                                | true                      |
| //vda1cs4850/user/username/package.json                                                       | true                      |
| //vda1cs4850/user/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

Root: //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

| File                                                                                          | canWatchAffectingLocation |
| --------------------------------------------------------------------------------------------- | ------------------------- |
| //vda1cs4850/package.json                                                                     | false                     |
| //vda1cs4850/folderAtRoot/package.json                                                        | true                      |
| //vda1cs4850/folderAtRoot/folder1/package.json                                                | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| //vda1cs4850/users/package.json                                                               | false                     |
| //vda1cs4850/users/username/package.json                                                      | false                     |
| //vda1cs4850/users/username/folderAtRoot/package.json                                         | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| //vda1cs4850/user/package.json                                                                | true                      |
| //vda1cs4850/user/username/package.json                                                       | true                      |
| //vda1cs4850/user/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: //vda1cs4850/user

Root: //vda1cs4850/user

| File                                                                                          | canWatchAffectingLocation |
| --------------------------------------------------------------------------------------------- | ------------------------- |
| //vda1cs4850/package.json                                                                     | false                     |
| //vda1cs4850/folderAtRoot/package.json                                                        | true                      |
| //vda1cs4850/folderAtRoot/folder1/package.json                                                | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| //vda1cs4850/users/package.json                                                               | false                     |
| //vda1cs4850/users/username/package.json                                                      | false                     |
| //vda1cs4850/users/username/folderAtRoot/package.json                                         | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| //vda1cs4850/user/package.json                                                                | true                      |
| //vda1cs4850/user/username/package.json                                                       | true                      |
| //vda1cs4850/user/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: //vda1cs4850/user/username

Root: //vda1cs4850/user/username

| File                                                                                          | canWatchAffectingLocation |
| --------------------------------------------------------------------------------------------- | ------------------------- |
| //vda1cs4850/package.json                                                                     | false                     |
| //vda1cs4850/folderAtRoot/package.json                                                        | true                      |
| //vda1cs4850/folderAtRoot/folder1/package.json                                                | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| //vda1cs4850/users/package.json                                                               | false                     |
| //vda1cs4850/users/username/package.json                                                      | false                     |
| //vda1cs4850/users/username/folderAtRoot/package.json                                         | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| //vda1cs4850/user/package.json                                                                | true                      |
| //vda1cs4850/user/username/package.json                                                       | true                      |
| //vda1cs4850/user/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: //vda1cs4850/user/username/folderAtRoot

Root: //vda1cs4850/user/username/folderAtRoot

| File                                                                                          | canWatchAffectingLocation |
| --------------------------------------------------------------------------------------------- | ------------------------- |
| //vda1cs4850/package.json                                                                     | false                     |
| //vda1cs4850/folderAtRoot/package.json                                                        | true                      |
| //vda1cs4850/folderAtRoot/folder1/package.json                                                | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| //vda1cs4850/users/package.json                                                               | false                     |
| //vda1cs4850/users/username/package.json                                                      | false                     |
| //vda1cs4850/users/username/folderAtRoot/package.json                                         | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| //vda1cs4850/user/package.json                                                                | true                      |
| //vda1cs4850/user/username/package.json                                                       | true                      |
| //vda1cs4850/user/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: //vda1cs4850/user/username/folderAtRoot/folder1

Root: //vda1cs4850/user/username/folderAtRoot/folder1

| File                                                                                          | canWatchAffectingLocation |
| --------------------------------------------------------------------------------------------- | ------------------------- |
| //vda1cs4850/package.json                                                                     | false                     |
| //vda1cs4850/folderAtRoot/package.json                                                        | true                      |
| //vda1cs4850/folderAtRoot/folder1/package.json                                                | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| //vda1cs4850/users/package.json                                                               | false                     |
| //vda1cs4850/users/username/package.json                                                      | false                     |
| //vda1cs4850/users/username/folderAtRoot/package.json                                         | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| //vda1cs4850/user/package.json                                                                | true                      |
| //vda1cs4850/user/username/package.json                                                       | true                      |
| //vda1cs4850/user/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: //vda1cs4850/user/username/folderAtRoot/folder1/folder2

Root: //vda1cs4850/user/username/folderAtRoot/folder1/folder2

| File                                                                                          | canWatchAffectingLocation |
| --------------------------------------------------------------------------------------------- | ------------------------- |
| //vda1cs4850/package.json                                                                     | false                     |
| //vda1cs4850/folderAtRoot/package.json                                                        | true                      |
| //vda1cs4850/folderAtRoot/folder1/package.json                                                | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| //vda1cs4850/users/package.json                                                               | false                     |
| //vda1cs4850/users/username/package.json                                                      | false                     |
| //vda1cs4850/users/username/folderAtRoot/package.json                                         | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| //vda1cs4850/user/package.json                                                                | true                      |
| //vda1cs4850/user/username/package.json                                                       | true                      |
| //vda1cs4850/user/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3

Root: //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3

| File                                                                                          | canWatchAffectingLocation |
| --------------------------------------------------------------------------------------------- | ------------------------- |
| //vda1cs4850/package.json                                                                     | false                     |
| //vda1cs4850/folderAtRoot/package.json                                                        | true                      |
| //vda1cs4850/folderAtRoot/folder1/package.json                                                | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| //vda1cs4850/users/package.json                                                               | false                     |
| //vda1cs4850/users/username/package.json                                                      | false                     |
| //vda1cs4850/users/username/folderAtRoot/package.json                                         | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| //vda1cs4850/user/package.json                                                                | true                      |
| //vda1cs4850/user/username/package.json                                                       | true                      |
| //vda1cs4850/user/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4

Root: //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4

| File                                                                                          | canWatchAffectingLocation |
| --------------------------------------------------------------------------------------------- | ------------------------- |
| //vda1cs4850/package.json                                                                     | false                     |
| //vda1cs4850/folderAtRoot/package.json                                                        | true                      |
| //vda1cs4850/folderAtRoot/folder1/package.json                                                | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| //vda1cs4850/users/package.json                                                               | false                     |
| //vda1cs4850/users/username/package.json                                                      | false                     |
| //vda1cs4850/users/username/folderAtRoot/package.json                                         | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| //vda1cs4850/user/package.json                                                                | true                      |
| //vda1cs4850/user/username/package.json                                                       | true                      |
| //vda1cs4850/user/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

Root: //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

| File                                                                                          | canWatchAffectingLocation |
| --------------------------------------------------------------------------------------------- | ------------------------- |
| //vda1cs4850/package.json                                                                     | false                     |
| //vda1cs4850/folderAtRoot/package.json                                                        | true                      |
| //vda1cs4850/folderAtRoot/folder1/package.json                                                | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| //vda1cs4850/users/package.json                                                               | false                     |
| //vda1cs4850/users/username/package.json                                                      | false                     |
| //vda1cs4850/users/username/folderAtRoot/package.json                                         | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| //vda1cs4850/user/package.json                                                                | true                      |
| //vda1cs4850/user/username/package.json                                                       | true                      |
| //vda1cs4850/user/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

## RootDirForResolution: undefined

Root: undefined

| File                                                                                          | canWatchAffectingLocation |
| --------------------------------------------------------------------------------------------- | ------------------------- |
| //vda1cs4850/package.json                                                                     | false                     |
| //vda1cs4850/folderAtRoot/package.json                                                        | true                      |
| //vda1cs4850/folderAtRoot/folder1/package.json                                                | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/package.json                                        | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/package.json                                | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/package.json                        | true                      |
| //vda1cs4850/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json                | true                      |
| //vda1cs4850/users/package.json                                                               | false                     |
| //vda1cs4850/users/username/package.json                                                      | false                     |
| //vda1cs4850/users/username/folderAtRoot/package.json                                         | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/package.json                                 | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/package.json                         | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/package.json                 | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json         | true                      |
| //vda1cs4850/users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json | true                      |
| //vda1cs4850/user/package.json                                                                | true                      |
| //vda1cs4850/user/username/package.json                                                       | true                      |
| //vda1cs4850/user/username/folderAtRoot/package.json                                          | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/package.json                                  | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/package.json                          | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/package.json                  | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/package.json          | true                      |
| //vda1cs4850/user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/package.json  | true                      |

