# getDirectoryToWatchFailedLookupLocation

Determines whether to watch given failed lookup location (file that didnt exist) when resolving module.
It also determines the directory to watch and whether to watch it recursively or not.

## Testing for Posix root: /

## RootDirForResolution: /

Root: 

| Location                                                                                     | getDirectoryToWatchFailedLookupLocation                                                      | Recursive |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | --------- |
| /somefile.d.ts                                                                               |                                                                                              | true      |
| /dir/somefile.d.ts                                                                           | /dir                                                                                         | true      |
| /dir/subdir/somefile.d.ts                                                                    | /dir                                                                                         | true      |
| /folderAtRoot/somefile.d.ts                                                                  | /folderAtRoot                                                                                | true      |
| /folderAtRoot/dir/somefile.d.ts                                                              | /folderAtRoot                                                                                | true      |
| /folderAtRoot/dir/subdir/somefile.d.ts                                                       | /folderAtRoot                                                                                | true      |
| /folderAtRoot/folder1/somefile.d.ts                                                          | /folderAtRoot                                                                                | true      |
| /folderAtRoot/folder1/dir/somefile.d.ts                                                      | /folderAtRoot                                                                                | true      |
| /folderAtRoot/folder1/dir/subdir/somefile.d.ts                                               | /folderAtRoot                                                                                | true      |
| /folderAtRoot/folder1/folder2/somefile.d.ts                                                  | /folderAtRoot                                                                                | true      |
| /folderAtRoot/folder1/folder2/dir/somefile.d.ts                                              | /folderAtRoot                                                                                | true      |
| /folderAtRoot/folder1/folder2/dir/subdir/somefile.d.ts                                       | /folderAtRoot                                                                                | true      |
| /folderAtRoot/folder1/folder2/folder3/somefile.d.ts                                          | /folderAtRoot                                                                                | true      |
| /folderAtRoot/folder1/folder2/folder3/dir/somefile.d.ts                                      | /folderAtRoot                                                                                | true      |
| /folderAtRoot/folder1/folder2/folder3/dir/subdir/somefile.d.ts                               | /folderAtRoot                                                                                | true      |
| /folderAtRoot/folder1/folder2/folder3/folder4/somefile.d.ts                                  | /folderAtRoot                                                                                | true      |
| /folderAtRoot/folder1/folder2/folder3/folder4/dir/somefile.d.ts                              | /folderAtRoot                                                                                | true      |
| /folderAtRoot/folder1/folder2/folder3/folder4/dir/subdir/somefile.d.ts                       | /folderAtRoot                                                                                | true      |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/somefile.d.ts                          | /folderAtRoot                                                                                | true      |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/somefile.d.ts                      | /folderAtRoot                                                                                | true      |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/subdir/somefile.d.ts               | /folderAtRoot                                                                                | true      |
| /users/somefile.d.ts                                                                         | /users                                                                                       | true      |
| /users/dir/somefile.d.ts                                                                     | /users                                                                                       | true      |
| /users/dir/subdir/somefile.d.ts                                                              | /users                                                                                       | true      |
| /users/username/somefile.d.ts                                                                | /users                                                                                       | true      |
| /users/username/dir/somefile.d.ts                                                            | /users                                                                                       | true      |
| /users/username/dir/subdir/somefile.d.ts                                                     | /users                                                                                       | true      |
| /users/username/folderAtRoot/somefile.d.ts                                                   | /users                                                                                       | true      |
| /users/username/folderAtRoot/dir/somefile.d.ts                                               | /users                                                                                       | true      |
| /users/username/folderAtRoot/dir/subdir/somefile.d.ts                                        | /users                                                                                       | true      |
| /users/username/folderAtRoot/folder1/somefile.d.ts                                           | /users                                                                                       | true      |
| /users/username/folderAtRoot/folder1/dir/somefile.d.ts                                       | /users                                                                                       | true      |
| /users/username/folderAtRoot/folder1/dir/subdir/somefile.d.ts                                | /users                                                                                       | true      |
| /users/username/folderAtRoot/folder1/folder2/somefile.d.ts                                   | /users                                                                                       | true      |
| /users/username/folderAtRoot/folder1/folder2/dir/somefile.d.ts                               | /users                                                                                       | true      |
| /users/username/folderAtRoot/folder1/folder2/dir/subdir/somefile.d.ts                        | /users                                                                                       | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/somefile.d.ts                           | /users                                                                                       | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/dir/somefile.d.ts                       | /users                                                                                       | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/dir/subdir/somefile.d.ts                | /users                                                                                       | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/somefile.d.ts                   | /users                                                                                       | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/somefile.d.ts               | /users                                                                                       | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/subdir/somefile.d.ts        | /users                                                                                       | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/somefile.d.ts           | /users                                                                                       | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/somefile.d.ts       | /users                                                                                       | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/subdir/somefile.d.ts | /users                                                                                       | true      |
| /user/somefile.d.ts                                                                          | /user                                                                                        | true      |
| /user/dir/somefile.d.ts                                                                      | /user                                                                                        | true      |
| /user/dir/subdir/somefile.d.ts                                                               | /user                                                                                        | true      |
| /user/username/somefile.d.ts                                                                 | /user                                                                                        | true      |
| /user/username/dir/somefile.d.ts                                                             | /user                                                                                        | true      |
| /user/username/dir/subdir/somefile.d.ts                                                      | /user                                                                                        | true      |
| /user/username/folderAtRoot/somefile.d.ts                                                    | /user                                                                                        | true      |
| /user/username/folderAtRoot/dir/somefile.d.ts                                                | /user                                                                                        | true      |
| /user/username/folderAtRoot/dir/subdir/somefile.d.ts                                         | /user                                                                                        | true      |
| /user/username/folderAtRoot/folder1/somefile.d.ts                                            | /user                                                                                        | true      |
| /user/username/folderAtRoot/folder1/dir/somefile.d.ts                                        | /user                                                                                        | true      |
| /user/username/folderAtRoot/folder1/dir/subdir/somefile.d.ts                                 | /user                                                                                        | true      |
| /user/username/folderAtRoot/folder1/folder2/somefile.d.ts                                    | /user                                                                                        | true      |
| /user/username/folderAtRoot/folder1/folder2/dir/somefile.d.ts                                | /user                                                                                        | true      |
| /user/username/folderAtRoot/folder1/folder2/dir/subdir/somefile.d.ts                         | /user                                                                                        | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/somefile.d.ts                            | /user                                                                                        | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/dir/somefile.d.ts                        | /user                                                                                        | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/dir/subdir/somefile.d.ts                 | /user                                                                                        | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/somefile.d.ts                    | /user                                                                                        | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/somefile.d.ts                | /user                                                                                        | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/subdir/somefile.d.ts         | /user                                                                                        | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/somefile.d.ts            | /user                                                                                        | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/somefile.d.ts        | /user                                                                                        | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/subdir/somefile.d.ts | /user                                                                                        | true      |

## RootDirForResolution: /folderAtRoot

Root: /folderAtRoot

| Location                                                                                     | getDirectoryToWatchFailedLookupLocation                                                      | Recursive |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | --------- |
| /somefile.d.ts                                                                               |                                                                                              |           |
| /dir/somefile.d.ts                                                                           |                                                                                              |           |
| /dir/subdir/somefile.d.ts                                                                    |                                                                                              |           |
| /folderAtRoot/somefile.d.ts                                                                  | /folderAtRoot                                                                                | true      |
| /folderAtRoot/dir/somefile.d.ts                                                              | /folderAtRoot/dir                                                                            | true      |
| /folderAtRoot/dir/subdir/somefile.d.ts                                                       | /folderAtRoot/dir                                                                            | true      |
| /folderAtRoot/folder1/somefile.d.ts                                                          | /folderAtRoot/folder1                                                                        | true      |
| /folderAtRoot/folder1/dir/somefile.d.ts                                                      | /folderAtRoot/folder1                                                                        | true      |
| /folderAtRoot/folder1/dir/subdir/somefile.d.ts                                               | /folderAtRoot/folder1                                                                        | true      |
| /folderAtRoot/folder1/folder2/somefile.d.ts                                                  | /folderAtRoot/folder1                                                                        | true      |
| /folderAtRoot/folder1/folder2/dir/somefile.d.ts                                              | /folderAtRoot/folder1                                                                        | true      |
| /folderAtRoot/folder1/folder2/dir/subdir/somefile.d.ts                                       | /folderAtRoot/folder1                                                                        | true      |
| /folderAtRoot/folder1/folder2/folder3/somefile.d.ts                                          | /folderAtRoot/folder1                                                                        | true      |
| /folderAtRoot/folder1/folder2/folder3/dir/somefile.d.ts                                      | /folderAtRoot/folder1                                                                        | true      |
| /folderAtRoot/folder1/folder2/folder3/dir/subdir/somefile.d.ts                               | /folderAtRoot/folder1                                                                        | true      |
| /folderAtRoot/folder1/folder2/folder3/folder4/somefile.d.ts                                  | /folderAtRoot/folder1                                                                        | true      |
| /folderAtRoot/folder1/folder2/folder3/folder4/dir/somefile.d.ts                              | /folderAtRoot/folder1                                                                        | true      |
| /folderAtRoot/folder1/folder2/folder3/folder4/dir/subdir/somefile.d.ts                       | /folderAtRoot/folder1                                                                        | true      |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/somefile.d.ts                          | /folderAtRoot/folder1                                                                        | true      |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/somefile.d.ts                      | /folderAtRoot/folder1                                                                        | true      |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/subdir/somefile.d.ts               | /folderAtRoot/folder1                                                                        | true      |
| /users/somefile.d.ts                                                                         |                                                                                              |           |
| /users/dir/somefile.d.ts                                                                     |                                                                                              |           |
| /users/dir/subdir/somefile.d.ts                                                              |                                                                                              |           |
| /users/username/somefile.d.ts                                                                |                                                                                              |           |
| /users/username/dir/somefile.d.ts                                                            |                                                                                              |           |
| /users/username/dir/subdir/somefile.d.ts                                                     |                                                                                              |           |
| /users/username/folderAtRoot/somefile.d.ts                                                   |                                                                                              |           |
| /users/username/folderAtRoot/dir/somefile.d.ts                                               |                                                                                              |           |
| /users/username/folderAtRoot/dir/subdir/somefile.d.ts                                        |                                                                                              |           |
| /users/username/folderAtRoot/folder1/somefile.d.ts                                           |                                                                                              |           |
| /users/username/folderAtRoot/folder1/dir/somefile.d.ts                                       |                                                                                              |           |
| /users/username/folderAtRoot/folder1/dir/subdir/somefile.d.ts                                |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/somefile.d.ts                                   |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/dir/somefile.d.ts                               |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/dir/subdir/somefile.d.ts                        |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/somefile.d.ts                           |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/dir/somefile.d.ts                       |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/dir/subdir/somefile.d.ts                |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/somefile.d.ts                   |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/somefile.d.ts               |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/subdir/somefile.d.ts        |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/somefile.d.ts           |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/somefile.d.ts       |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/subdir/somefile.d.ts |                                                                                              |           |
| /user/somefile.d.ts                                                                          |                                                                                              |           |
| /user/dir/somefile.d.ts                                                                      |                                                                                              |           |
| /user/dir/subdir/somefile.d.ts                                                               |                                                                                              |           |
| /user/username/somefile.d.ts                                                                 |                                                                                              |           |
| /user/username/dir/somefile.d.ts                                                             |                                                                                              |           |
| /user/username/dir/subdir/somefile.d.ts                                                      |                                                                                              |           |
| /user/username/folderAtRoot/somefile.d.ts                                                    |                                                                                              |           |
| /user/username/folderAtRoot/dir/somefile.d.ts                                                |                                                                                              |           |
| /user/username/folderAtRoot/dir/subdir/somefile.d.ts                                         |                                                                                              |           |
| /user/username/folderAtRoot/folder1/somefile.d.ts                                            |                                                                                              |           |
| /user/username/folderAtRoot/folder1/dir/somefile.d.ts                                        |                                                                                              |           |
| /user/username/folderAtRoot/folder1/dir/subdir/somefile.d.ts                                 |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/somefile.d.ts                                    |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/dir/somefile.d.ts                                |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/dir/subdir/somefile.d.ts                         |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/somefile.d.ts                            |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/dir/somefile.d.ts                        |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/dir/subdir/somefile.d.ts                 |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/somefile.d.ts                    |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/somefile.d.ts                |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/subdir/somefile.d.ts         |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/somefile.d.ts            |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/somefile.d.ts        |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/subdir/somefile.d.ts |                                                                                              |           |

## RootDirForResolution: /folderAtRoot/folder1

Root: /folderAtRoot/folder1

| Location                                                                                     | getDirectoryToWatchFailedLookupLocation                                                      | Recursive |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | --------- |
| /somefile.d.ts                                                                               |                                                                                              |           |
| /dir/somefile.d.ts                                                                           |                                                                                              |           |
| /dir/subdir/somefile.d.ts                                                                    |                                                                                              |           |
| /folderAtRoot/somefile.d.ts                                                                  |                                                                                              |           |
| /folderAtRoot/dir/somefile.d.ts                                                              |                                                                                              |           |
| /folderAtRoot/dir/subdir/somefile.d.ts                                                       |                                                                                              |           |
| /folderAtRoot/folder1/somefile.d.ts                                                          | /folderAtRoot/folder1                                                                        | true      |
| /folderAtRoot/folder1/dir/somefile.d.ts                                                      | /folderAtRoot/folder1/dir                                                                    | true      |
| /folderAtRoot/folder1/dir/subdir/somefile.d.ts                                               | /folderAtRoot/folder1/dir                                                                    | true      |
| /folderAtRoot/folder1/folder2/somefile.d.ts                                                  | /folderAtRoot/folder1/folder2                                                                | true      |
| /folderAtRoot/folder1/folder2/dir/somefile.d.ts                                              | /folderAtRoot/folder1/folder2                                                                | true      |
| /folderAtRoot/folder1/folder2/dir/subdir/somefile.d.ts                                       | /folderAtRoot/folder1/folder2                                                                | true      |
| /folderAtRoot/folder1/folder2/folder3/somefile.d.ts                                          | /folderAtRoot/folder1/folder2                                                                | true      |
| /folderAtRoot/folder1/folder2/folder3/dir/somefile.d.ts                                      | /folderAtRoot/folder1/folder2                                                                | true      |
| /folderAtRoot/folder1/folder2/folder3/dir/subdir/somefile.d.ts                               | /folderAtRoot/folder1/folder2                                                                | true      |
| /folderAtRoot/folder1/folder2/folder3/folder4/somefile.d.ts                                  | /folderAtRoot/folder1/folder2                                                                | true      |
| /folderAtRoot/folder1/folder2/folder3/folder4/dir/somefile.d.ts                              | /folderAtRoot/folder1/folder2                                                                | true      |
| /folderAtRoot/folder1/folder2/folder3/folder4/dir/subdir/somefile.d.ts                       | /folderAtRoot/folder1/folder2                                                                | true      |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/somefile.d.ts                          | /folderAtRoot/folder1/folder2                                                                | true      |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/somefile.d.ts                      | /folderAtRoot/folder1/folder2                                                                | true      |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/subdir/somefile.d.ts               | /folderAtRoot/folder1/folder2                                                                | true      |
| /users/somefile.d.ts                                                                         |                                                                                              |           |
| /users/dir/somefile.d.ts                                                                     |                                                                                              |           |
| /users/dir/subdir/somefile.d.ts                                                              |                                                                                              |           |
| /users/username/somefile.d.ts                                                                |                                                                                              |           |
| /users/username/dir/somefile.d.ts                                                            |                                                                                              |           |
| /users/username/dir/subdir/somefile.d.ts                                                     |                                                                                              |           |
| /users/username/folderAtRoot/somefile.d.ts                                                   |                                                                                              |           |
| /users/username/folderAtRoot/dir/somefile.d.ts                                               |                                                                                              |           |
| /users/username/folderAtRoot/dir/subdir/somefile.d.ts                                        |                                                                                              |           |
| /users/username/folderAtRoot/folder1/somefile.d.ts                                           |                                                                                              |           |
| /users/username/folderAtRoot/folder1/dir/somefile.d.ts                                       |                                                                                              |           |
| /users/username/folderAtRoot/folder1/dir/subdir/somefile.d.ts                                |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/somefile.d.ts                                   |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/dir/somefile.d.ts                               |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/dir/subdir/somefile.d.ts                        |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/somefile.d.ts                           |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/dir/somefile.d.ts                       |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/dir/subdir/somefile.d.ts                |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/somefile.d.ts                   |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/somefile.d.ts               |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/subdir/somefile.d.ts        |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/somefile.d.ts           |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/somefile.d.ts       |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/subdir/somefile.d.ts |                                                                                              |           |
| /user/somefile.d.ts                                                                          |                                                                                              |           |
| /user/dir/somefile.d.ts                                                                      |                                                                                              |           |
| /user/dir/subdir/somefile.d.ts                                                               |                                                                                              |           |
| /user/username/somefile.d.ts                                                                 |                                                                                              |           |
| /user/username/dir/somefile.d.ts                                                             |                                                                                              |           |
| /user/username/dir/subdir/somefile.d.ts                                                      |                                                                                              |           |
| /user/username/folderAtRoot/somefile.d.ts                                                    |                                                                                              |           |
| /user/username/folderAtRoot/dir/somefile.d.ts                                                |                                                                                              |           |
| /user/username/folderAtRoot/dir/subdir/somefile.d.ts                                         |                                                                                              |           |
| /user/username/folderAtRoot/folder1/somefile.d.ts                                            |                                                                                              |           |
| /user/username/folderAtRoot/folder1/dir/somefile.d.ts                                        |                                                                                              |           |
| /user/username/folderAtRoot/folder1/dir/subdir/somefile.d.ts                                 |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/somefile.d.ts                                    |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/dir/somefile.d.ts                                |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/dir/subdir/somefile.d.ts                         |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/somefile.d.ts                            |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/dir/somefile.d.ts                        |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/dir/subdir/somefile.d.ts                 |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/somefile.d.ts                    |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/somefile.d.ts                |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/subdir/somefile.d.ts         |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/somefile.d.ts            |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/somefile.d.ts        |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/subdir/somefile.d.ts |                                                                                              |           |

## RootDirForResolution: /folderAtRoot/folder1/folder2

Root: /folderAtRoot/folder1/folder2

| Location                                                                                     | getDirectoryToWatchFailedLookupLocation                                                      | Recursive |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | --------- |
| /somefile.d.ts                                                                               |                                                                                              |           |
| /dir/somefile.d.ts                                                                           |                                                                                              |           |
| /dir/subdir/somefile.d.ts                                                                    |                                                                                              |           |
| /folderAtRoot/somefile.d.ts                                                                  |                                                                                              |           |
| /folderAtRoot/dir/somefile.d.ts                                                              |                                                                                              |           |
| /folderAtRoot/dir/subdir/somefile.d.ts                                                       |                                                                                              |           |
| /folderAtRoot/folder1/somefile.d.ts                                                          |                                                                                              |           |
| /folderAtRoot/folder1/dir/somefile.d.ts                                                      |                                                                                              |           |
| /folderAtRoot/folder1/dir/subdir/somefile.d.ts                                               |                                                                                              |           |
| /folderAtRoot/folder1/folder2/somefile.d.ts                                                  | /folderAtRoot/folder1/folder2                                                                | true      |
| /folderAtRoot/folder1/folder2/dir/somefile.d.ts                                              | /folderAtRoot/folder1/folder2/dir                                                            | true      |
| /folderAtRoot/folder1/folder2/dir/subdir/somefile.d.ts                                       | /folderAtRoot/folder1/folder2/dir                                                            | true      |
| /folderAtRoot/folder1/folder2/folder3/somefile.d.ts                                          | /folderAtRoot/folder1/folder2/folder3                                                        | true      |
| /folderAtRoot/folder1/folder2/folder3/dir/somefile.d.ts                                      | /folderAtRoot/folder1/folder2/folder3                                                        | true      |
| /folderAtRoot/folder1/folder2/folder3/dir/subdir/somefile.d.ts                               | /folderAtRoot/folder1/folder2/folder3                                                        | true      |
| /folderAtRoot/folder1/folder2/folder3/folder4/somefile.d.ts                                  | /folderAtRoot/folder1/folder2/folder3                                                        | true      |
| /folderAtRoot/folder1/folder2/folder3/folder4/dir/somefile.d.ts                              | /folderAtRoot/folder1/folder2/folder3                                                        | true      |
| /folderAtRoot/folder1/folder2/folder3/folder4/dir/subdir/somefile.d.ts                       | /folderAtRoot/folder1/folder2/folder3                                                        | true      |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/somefile.d.ts                          | /folderAtRoot/folder1/folder2/folder3                                                        | true      |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/somefile.d.ts                      | /folderAtRoot/folder1/folder2/folder3                                                        | true      |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/subdir/somefile.d.ts               | /folderAtRoot/folder1/folder2/folder3                                                        | true      |
| /users/somefile.d.ts                                                                         |                                                                                              |           |
| /users/dir/somefile.d.ts                                                                     |                                                                                              |           |
| /users/dir/subdir/somefile.d.ts                                                              |                                                                                              |           |
| /users/username/somefile.d.ts                                                                |                                                                                              |           |
| /users/username/dir/somefile.d.ts                                                            |                                                                                              |           |
| /users/username/dir/subdir/somefile.d.ts                                                     |                                                                                              |           |
| /users/username/folderAtRoot/somefile.d.ts                                                   |                                                                                              |           |
| /users/username/folderAtRoot/dir/somefile.d.ts                                               |                                                                                              |           |
| /users/username/folderAtRoot/dir/subdir/somefile.d.ts                                        |                                                                                              |           |
| /users/username/folderAtRoot/folder1/somefile.d.ts                                           |                                                                                              |           |
| /users/username/folderAtRoot/folder1/dir/somefile.d.ts                                       |                                                                                              |           |
| /users/username/folderAtRoot/folder1/dir/subdir/somefile.d.ts                                |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/somefile.d.ts                                   |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/dir/somefile.d.ts                               |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/dir/subdir/somefile.d.ts                        |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/somefile.d.ts                           |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/dir/somefile.d.ts                       |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/dir/subdir/somefile.d.ts                |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/somefile.d.ts                   |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/somefile.d.ts               |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/subdir/somefile.d.ts        |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/somefile.d.ts           |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/somefile.d.ts       |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/subdir/somefile.d.ts |                                                                                              |           |
| /user/somefile.d.ts                                                                          |                                                                                              |           |
| /user/dir/somefile.d.ts                                                                      |                                                                                              |           |
| /user/dir/subdir/somefile.d.ts                                                               |                                                                                              |           |
| /user/username/somefile.d.ts                                                                 |                                                                                              |           |
| /user/username/dir/somefile.d.ts                                                             |                                                                                              |           |
| /user/username/dir/subdir/somefile.d.ts                                                      |                                                                                              |           |
| /user/username/folderAtRoot/somefile.d.ts                                                    |                                                                                              |           |
| /user/username/folderAtRoot/dir/somefile.d.ts                                                |                                                                                              |           |
| /user/username/folderAtRoot/dir/subdir/somefile.d.ts                                         |                                                                                              |           |
| /user/username/folderAtRoot/folder1/somefile.d.ts                                            |                                                                                              |           |
| /user/username/folderAtRoot/folder1/dir/somefile.d.ts                                        |                                                                                              |           |
| /user/username/folderAtRoot/folder1/dir/subdir/somefile.d.ts                                 |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/somefile.d.ts                                    |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/dir/somefile.d.ts                                |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/dir/subdir/somefile.d.ts                         |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/somefile.d.ts                            |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/dir/somefile.d.ts                        |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/dir/subdir/somefile.d.ts                 |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/somefile.d.ts                    |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/somefile.d.ts                |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/subdir/somefile.d.ts         |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/somefile.d.ts            |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/somefile.d.ts        |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/subdir/somefile.d.ts |                                                                                              |           |

## RootDirForResolution: /folderAtRoot/folder1/folder2/folder3

Root: /folderAtRoot/folder1/folder2/folder3

| Location                                                                                     | getDirectoryToWatchFailedLookupLocation                                                      | Recursive |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | --------- |
| /somefile.d.ts                                                                               |                                                                                              |           |
| /dir/somefile.d.ts                                                                           |                                                                                              |           |
| /dir/subdir/somefile.d.ts                                                                    |                                                                                              |           |
| /folderAtRoot/somefile.d.ts                                                                  |                                                                                              |           |
| /folderAtRoot/dir/somefile.d.ts                                                              |                                                                                              |           |
| /folderAtRoot/dir/subdir/somefile.d.ts                                                       |                                                                                              |           |
| /folderAtRoot/folder1/somefile.d.ts                                                          |                                                                                              |           |
| /folderAtRoot/folder1/dir/somefile.d.ts                                                      |                                                                                              |           |
| /folderAtRoot/folder1/dir/subdir/somefile.d.ts                                               |                                                                                              |           |
| /folderAtRoot/folder1/folder2/somefile.d.ts                                                  |                                                                                              |           |
| /folderAtRoot/folder1/folder2/dir/somefile.d.ts                                              |                                                                                              |           |
| /folderAtRoot/folder1/folder2/dir/subdir/somefile.d.ts                                       |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/somefile.d.ts                                          | /folderAtRoot/folder1/folder2/folder3                                                        | true      |
| /folderAtRoot/folder1/folder2/folder3/dir/somefile.d.ts                                      | /folderAtRoot/folder1/folder2/folder3/dir                                                    | true      |
| /folderAtRoot/folder1/folder2/folder3/dir/subdir/somefile.d.ts                               | /folderAtRoot/folder1/folder2/folder3/dir                                                    | true      |
| /folderAtRoot/folder1/folder2/folder3/folder4/somefile.d.ts                                  | /folderAtRoot/folder1/folder2/folder3/folder4                                                | true      |
| /folderAtRoot/folder1/folder2/folder3/folder4/dir/somefile.d.ts                              | /folderAtRoot/folder1/folder2/folder3/folder4                                                | true      |
| /folderAtRoot/folder1/folder2/folder3/folder4/dir/subdir/somefile.d.ts                       | /folderAtRoot/folder1/folder2/folder3/folder4                                                | true      |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/somefile.d.ts                          | /folderAtRoot/folder1/folder2/folder3/folder4                                                | true      |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/somefile.d.ts                      | /folderAtRoot/folder1/folder2/folder3/folder4                                                | true      |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/subdir/somefile.d.ts               | /folderAtRoot/folder1/folder2/folder3/folder4                                                | true      |
| /users/somefile.d.ts                                                                         |                                                                                              |           |
| /users/dir/somefile.d.ts                                                                     |                                                                                              |           |
| /users/dir/subdir/somefile.d.ts                                                              |                                                                                              |           |
| /users/username/somefile.d.ts                                                                |                                                                                              |           |
| /users/username/dir/somefile.d.ts                                                            |                                                                                              |           |
| /users/username/dir/subdir/somefile.d.ts                                                     |                                                                                              |           |
| /users/username/folderAtRoot/somefile.d.ts                                                   |                                                                                              |           |
| /users/username/folderAtRoot/dir/somefile.d.ts                                               |                                                                                              |           |
| /users/username/folderAtRoot/dir/subdir/somefile.d.ts                                        |                                                                                              |           |
| /users/username/folderAtRoot/folder1/somefile.d.ts                                           |                                                                                              |           |
| /users/username/folderAtRoot/folder1/dir/somefile.d.ts                                       |                                                                                              |           |
| /users/username/folderAtRoot/folder1/dir/subdir/somefile.d.ts                                |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/somefile.d.ts                                   |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/dir/somefile.d.ts                               |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/dir/subdir/somefile.d.ts                        |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/somefile.d.ts                           |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/dir/somefile.d.ts                       |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/dir/subdir/somefile.d.ts                |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/somefile.d.ts                   |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/somefile.d.ts               |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/subdir/somefile.d.ts        |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/somefile.d.ts           |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/somefile.d.ts       |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/subdir/somefile.d.ts |                                                                                              |           |
| /user/somefile.d.ts                                                                          |                                                                                              |           |
| /user/dir/somefile.d.ts                                                                      |                                                                                              |           |
| /user/dir/subdir/somefile.d.ts                                                               |                                                                                              |           |
| /user/username/somefile.d.ts                                                                 |                                                                                              |           |
| /user/username/dir/somefile.d.ts                                                             |                                                                                              |           |
| /user/username/dir/subdir/somefile.d.ts                                                      |                                                                                              |           |
| /user/username/folderAtRoot/somefile.d.ts                                                    |                                                                                              |           |
| /user/username/folderAtRoot/dir/somefile.d.ts                                                |                                                                                              |           |
| /user/username/folderAtRoot/dir/subdir/somefile.d.ts                                         |                                                                                              |           |
| /user/username/folderAtRoot/folder1/somefile.d.ts                                            |                                                                                              |           |
| /user/username/folderAtRoot/folder1/dir/somefile.d.ts                                        |                                                                                              |           |
| /user/username/folderAtRoot/folder1/dir/subdir/somefile.d.ts                                 |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/somefile.d.ts                                    |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/dir/somefile.d.ts                                |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/dir/subdir/somefile.d.ts                         |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/somefile.d.ts                            |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/dir/somefile.d.ts                        |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/dir/subdir/somefile.d.ts                 |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/somefile.d.ts                    |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/somefile.d.ts                |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/subdir/somefile.d.ts         |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/somefile.d.ts            |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/somefile.d.ts        |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/subdir/somefile.d.ts |                                                                                              |           |

## RootDirForResolution: /folderAtRoot/folder1/folder2/folder3/folder4

Root: /folderAtRoot/folder1/folder2/folder3/folder4

| Location                                                                                     | getDirectoryToWatchFailedLookupLocation                                                      | Recursive |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | --------- |
| /somefile.d.ts                                                                               |                                                                                              |           |
| /dir/somefile.d.ts                                                                           |                                                                                              |           |
| /dir/subdir/somefile.d.ts                                                                    |                                                                                              |           |
| /folderAtRoot/somefile.d.ts                                                                  |                                                                                              |           |
| /folderAtRoot/dir/somefile.d.ts                                                              |                                                                                              |           |
| /folderAtRoot/dir/subdir/somefile.d.ts                                                       |                                                                                              |           |
| /folderAtRoot/folder1/somefile.d.ts                                                          |                                                                                              |           |
| /folderAtRoot/folder1/dir/somefile.d.ts                                                      |                                                                                              |           |
| /folderAtRoot/folder1/dir/subdir/somefile.d.ts                                               |                                                                                              |           |
| /folderAtRoot/folder1/folder2/somefile.d.ts                                                  |                                                                                              |           |
| /folderAtRoot/folder1/folder2/dir/somefile.d.ts                                              |                                                                                              |           |
| /folderAtRoot/folder1/folder2/dir/subdir/somefile.d.ts                                       |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/somefile.d.ts                                          | /folderAtRoot/folder1/folder2/folder3                                                        | false     |
| /folderAtRoot/folder1/folder2/folder3/dir/somefile.d.ts                                      | /folderAtRoot/folder1/folder2/folder3/dir                                                    | true      |
| /folderAtRoot/folder1/folder2/folder3/dir/subdir/somefile.d.ts                               | /folderAtRoot/folder1/folder2/folder3/dir                                                    | true      |
| /folderAtRoot/folder1/folder2/folder3/folder4/somefile.d.ts                                  | /folderAtRoot/folder1/folder2/folder3/folder4                                                | true      |
| /folderAtRoot/folder1/folder2/folder3/folder4/dir/somefile.d.ts                              | /folderAtRoot/folder1/folder2/folder3/folder4/dir                                            | true      |
| /folderAtRoot/folder1/folder2/folder3/folder4/dir/subdir/somefile.d.ts                       | /folderAtRoot/folder1/folder2/folder3/folder4/dir                                            | true      |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/somefile.d.ts                          | /folderAtRoot/folder1/folder2/folder3/folder4/folder5                                        | true      |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/somefile.d.ts                      | /folderAtRoot/folder1/folder2/folder3/folder4/folder5                                        | true      |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/subdir/somefile.d.ts               | /folderAtRoot/folder1/folder2/folder3/folder4/folder5                                        | true      |
| /users/somefile.d.ts                                                                         |                                                                                              |           |
| /users/dir/somefile.d.ts                                                                     |                                                                                              |           |
| /users/dir/subdir/somefile.d.ts                                                              |                                                                                              |           |
| /users/username/somefile.d.ts                                                                |                                                                                              |           |
| /users/username/dir/somefile.d.ts                                                            |                                                                                              |           |
| /users/username/dir/subdir/somefile.d.ts                                                     |                                                                                              |           |
| /users/username/folderAtRoot/somefile.d.ts                                                   |                                                                                              |           |
| /users/username/folderAtRoot/dir/somefile.d.ts                                               |                                                                                              |           |
| /users/username/folderAtRoot/dir/subdir/somefile.d.ts                                        |                                                                                              |           |
| /users/username/folderAtRoot/folder1/somefile.d.ts                                           |                                                                                              |           |
| /users/username/folderAtRoot/folder1/dir/somefile.d.ts                                       |                                                                                              |           |
| /users/username/folderAtRoot/folder1/dir/subdir/somefile.d.ts                                |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/somefile.d.ts                                   |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/dir/somefile.d.ts                               |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/dir/subdir/somefile.d.ts                        |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/somefile.d.ts                           |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/dir/somefile.d.ts                       |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/dir/subdir/somefile.d.ts                |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/somefile.d.ts                   |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/somefile.d.ts               |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/subdir/somefile.d.ts        |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/somefile.d.ts           |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/somefile.d.ts       |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/subdir/somefile.d.ts |                                                                                              |           |
| /user/somefile.d.ts                                                                          |                                                                                              |           |
| /user/dir/somefile.d.ts                                                                      |                                                                                              |           |
| /user/dir/subdir/somefile.d.ts                                                               |                                                                                              |           |
| /user/username/somefile.d.ts                                                                 |                                                                                              |           |
| /user/username/dir/somefile.d.ts                                                             |                                                                                              |           |
| /user/username/dir/subdir/somefile.d.ts                                                      |                                                                                              |           |
| /user/username/folderAtRoot/somefile.d.ts                                                    |                                                                                              |           |
| /user/username/folderAtRoot/dir/somefile.d.ts                                                |                                                                                              |           |
| /user/username/folderAtRoot/dir/subdir/somefile.d.ts                                         |                                                                                              |           |
| /user/username/folderAtRoot/folder1/somefile.d.ts                                            |                                                                                              |           |
| /user/username/folderAtRoot/folder1/dir/somefile.d.ts                                        |                                                                                              |           |
| /user/username/folderAtRoot/folder1/dir/subdir/somefile.d.ts                                 |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/somefile.d.ts                                    |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/dir/somefile.d.ts                                |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/dir/subdir/somefile.d.ts                         |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/somefile.d.ts                            |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/dir/somefile.d.ts                        |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/dir/subdir/somefile.d.ts                 |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/somefile.d.ts                    |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/somefile.d.ts                |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/subdir/somefile.d.ts         |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/somefile.d.ts            |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/somefile.d.ts        |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/subdir/somefile.d.ts |                                                                                              |           |

## RootDirForResolution: /folderAtRoot/folder1/folder2/folder3/folder4/folder5

Root: /folderAtRoot/folder1/folder2/folder3/folder4/folder5

| Location                                                                                     | getDirectoryToWatchFailedLookupLocation                                                      | Recursive |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | --------- |
| /somefile.d.ts                                                                               |                                                                                              |           |
| /dir/somefile.d.ts                                                                           |                                                                                              |           |
| /dir/subdir/somefile.d.ts                                                                    |                                                                                              |           |
| /folderAtRoot/somefile.d.ts                                                                  |                                                                                              |           |
| /folderAtRoot/dir/somefile.d.ts                                                              |                                                                                              |           |
| /folderAtRoot/dir/subdir/somefile.d.ts                                                       |                                                                                              |           |
| /folderAtRoot/folder1/somefile.d.ts                                                          |                                                                                              |           |
| /folderAtRoot/folder1/dir/somefile.d.ts                                                      |                                                                                              |           |
| /folderAtRoot/folder1/dir/subdir/somefile.d.ts                                               |                                                                                              |           |
| /folderAtRoot/folder1/folder2/somefile.d.ts                                                  |                                                                                              |           |
| /folderAtRoot/folder1/folder2/dir/somefile.d.ts                                              |                                                                                              |           |
| /folderAtRoot/folder1/folder2/dir/subdir/somefile.d.ts                                       |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/somefile.d.ts                                          | /folderAtRoot/folder1/folder2/folder3                                                        | false     |
| /folderAtRoot/folder1/folder2/folder3/dir/somefile.d.ts                                      | /folderAtRoot/folder1/folder2/folder3/dir                                                    | true      |
| /folderAtRoot/folder1/folder2/folder3/dir/subdir/somefile.d.ts                               | /folderAtRoot/folder1/folder2/folder3/dir                                                    | true      |
| /folderAtRoot/folder1/folder2/folder3/folder4/somefile.d.ts                                  | /folderAtRoot/folder1/folder2/folder3/folder4                                                | false     |
| /folderAtRoot/folder1/folder2/folder3/folder4/dir/somefile.d.ts                              | /folderAtRoot/folder1/folder2/folder3/folder4/dir                                            | true      |
| /folderAtRoot/folder1/folder2/folder3/folder4/dir/subdir/somefile.d.ts                       | /folderAtRoot/folder1/folder2/folder3/folder4/dir                                            | true      |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/somefile.d.ts                          | /folderAtRoot/folder1/folder2/folder3/folder4/folder5                                        | true      |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/somefile.d.ts                      | /folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir                                    | true      |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/subdir/somefile.d.ts               | /folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir                                    | true      |
| /users/somefile.d.ts                                                                         |                                                                                              |           |
| /users/dir/somefile.d.ts                                                                     |                                                                                              |           |
| /users/dir/subdir/somefile.d.ts                                                              |                                                                                              |           |
| /users/username/somefile.d.ts                                                                |                                                                                              |           |
| /users/username/dir/somefile.d.ts                                                            |                                                                                              |           |
| /users/username/dir/subdir/somefile.d.ts                                                     |                                                                                              |           |
| /users/username/folderAtRoot/somefile.d.ts                                                   |                                                                                              |           |
| /users/username/folderAtRoot/dir/somefile.d.ts                                               |                                                                                              |           |
| /users/username/folderAtRoot/dir/subdir/somefile.d.ts                                        |                                                                                              |           |
| /users/username/folderAtRoot/folder1/somefile.d.ts                                           |                                                                                              |           |
| /users/username/folderAtRoot/folder1/dir/somefile.d.ts                                       |                                                                                              |           |
| /users/username/folderAtRoot/folder1/dir/subdir/somefile.d.ts                                |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/somefile.d.ts                                   |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/dir/somefile.d.ts                               |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/dir/subdir/somefile.d.ts                        |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/somefile.d.ts                           |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/dir/somefile.d.ts                       |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/dir/subdir/somefile.d.ts                |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/somefile.d.ts                   |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/somefile.d.ts               |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/subdir/somefile.d.ts        |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/somefile.d.ts           |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/somefile.d.ts       |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/subdir/somefile.d.ts |                                                                                              |           |
| /user/somefile.d.ts                                                                          |                                                                                              |           |
| /user/dir/somefile.d.ts                                                                      |                                                                                              |           |
| /user/dir/subdir/somefile.d.ts                                                               |                                                                                              |           |
| /user/username/somefile.d.ts                                                                 |                                                                                              |           |
| /user/username/dir/somefile.d.ts                                                             |                                                                                              |           |
| /user/username/dir/subdir/somefile.d.ts                                                      |                                                                                              |           |
| /user/username/folderAtRoot/somefile.d.ts                                                    |                                                                                              |           |
| /user/username/folderAtRoot/dir/somefile.d.ts                                                |                                                                                              |           |
| /user/username/folderAtRoot/dir/subdir/somefile.d.ts                                         |                                                                                              |           |
| /user/username/folderAtRoot/folder1/somefile.d.ts                                            |                                                                                              |           |
| /user/username/folderAtRoot/folder1/dir/somefile.d.ts                                        |                                                                                              |           |
| /user/username/folderAtRoot/folder1/dir/subdir/somefile.d.ts                                 |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/somefile.d.ts                                    |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/dir/somefile.d.ts                                |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/dir/subdir/somefile.d.ts                         |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/somefile.d.ts                            |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/dir/somefile.d.ts                        |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/dir/subdir/somefile.d.ts                 |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/somefile.d.ts                    |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/somefile.d.ts                |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/subdir/somefile.d.ts         |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/somefile.d.ts            |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/somefile.d.ts        |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/subdir/somefile.d.ts |                                                                                              |           |

## RootDirForResolution: /users

Root: /users

| Location                                                                                     | getDirectoryToWatchFailedLookupLocation                                                      | Recursive |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | --------- |
| /somefile.d.ts                                                                               |                                                                                              |           |
| /dir/somefile.d.ts                                                                           |                                                                                              |           |
| /dir/subdir/somefile.d.ts                                                                    |                                                                                              |           |
| /folderAtRoot/somefile.d.ts                                                                  |                                                                                              |           |
| /folderAtRoot/dir/somefile.d.ts                                                              |                                                                                              |           |
| /folderAtRoot/dir/subdir/somefile.d.ts                                                       |                                                                                              |           |
| /folderAtRoot/folder1/somefile.d.ts                                                          |                                                                                              |           |
| /folderAtRoot/folder1/dir/somefile.d.ts                                                      |                                                                                              |           |
| /folderAtRoot/folder1/dir/subdir/somefile.d.ts                                               |                                                                                              |           |
| /folderAtRoot/folder1/folder2/somefile.d.ts                                                  |                                                                                              |           |
| /folderAtRoot/folder1/folder2/dir/somefile.d.ts                                              |                                                                                              |           |
| /folderAtRoot/folder1/folder2/dir/subdir/somefile.d.ts                                       |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/somefile.d.ts                                          |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/dir/somefile.d.ts                                      |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/dir/subdir/somefile.d.ts                               |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/somefile.d.ts                                  |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/dir/somefile.d.ts                              |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/dir/subdir/somefile.d.ts                       |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/somefile.d.ts                          |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/somefile.d.ts                      |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/subdir/somefile.d.ts               |                                                                                              |           |
| /users/somefile.d.ts                                                                         | /users                                                                                       | true      |
| /users/dir/somefile.d.ts                                                                     | /users/dir                                                                                   | true      |
| /users/dir/subdir/somefile.d.ts                                                              | /users/dir                                                                                   | true      |
| /users/username/somefile.d.ts                                                                | /users/username                                                                              | true      |
| /users/username/dir/somefile.d.ts                                                            | /users/username                                                                              | true      |
| /users/username/dir/subdir/somefile.d.ts                                                     | /users/username                                                                              | true      |
| /users/username/folderAtRoot/somefile.d.ts                                                   | /users/username                                                                              | true      |
| /users/username/folderAtRoot/dir/somefile.d.ts                                               | /users/username                                                                              | true      |
| /users/username/folderAtRoot/dir/subdir/somefile.d.ts                                        | /users/username                                                                              | true      |
| /users/username/folderAtRoot/folder1/somefile.d.ts                                           | /users/username                                                                              | true      |
| /users/username/folderAtRoot/folder1/dir/somefile.d.ts                                       | /users/username                                                                              | true      |
| /users/username/folderAtRoot/folder1/dir/subdir/somefile.d.ts                                | /users/username                                                                              | true      |
| /users/username/folderAtRoot/folder1/folder2/somefile.d.ts                                   | /users/username                                                                              | true      |
| /users/username/folderAtRoot/folder1/folder2/dir/somefile.d.ts                               | /users/username                                                                              | true      |
| /users/username/folderAtRoot/folder1/folder2/dir/subdir/somefile.d.ts                        | /users/username                                                                              | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/somefile.d.ts                           | /users/username                                                                              | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/dir/somefile.d.ts                       | /users/username                                                                              | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/dir/subdir/somefile.d.ts                | /users/username                                                                              | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/somefile.d.ts                   | /users/username                                                                              | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/somefile.d.ts               | /users/username                                                                              | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/subdir/somefile.d.ts        | /users/username                                                                              | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/somefile.d.ts           | /users/username                                                                              | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/somefile.d.ts       | /users/username                                                                              | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/subdir/somefile.d.ts | /users/username                                                                              | true      |
| /user/somefile.d.ts                                                                          |                                                                                              |           |
| /user/dir/somefile.d.ts                                                                      |                                                                                              |           |
| /user/dir/subdir/somefile.d.ts                                                               |                                                                                              |           |
| /user/username/somefile.d.ts                                                                 |                                                                                              |           |
| /user/username/dir/somefile.d.ts                                                             |                                                                                              |           |
| /user/username/dir/subdir/somefile.d.ts                                                      |                                                                                              |           |
| /user/username/folderAtRoot/somefile.d.ts                                                    |                                                                                              |           |
| /user/username/folderAtRoot/dir/somefile.d.ts                                                |                                                                                              |           |
| /user/username/folderAtRoot/dir/subdir/somefile.d.ts                                         |                                                                                              |           |
| /user/username/folderAtRoot/folder1/somefile.d.ts                                            |                                                                                              |           |
| /user/username/folderAtRoot/folder1/dir/somefile.d.ts                                        |                                                                                              |           |
| /user/username/folderAtRoot/folder1/dir/subdir/somefile.d.ts                                 |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/somefile.d.ts                                    |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/dir/somefile.d.ts                                |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/dir/subdir/somefile.d.ts                         |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/somefile.d.ts                            |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/dir/somefile.d.ts                        |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/dir/subdir/somefile.d.ts                 |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/somefile.d.ts                    |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/somefile.d.ts                |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/subdir/somefile.d.ts         |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/somefile.d.ts            |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/somefile.d.ts        |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/subdir/somefile.d.ts |                                                                                              |           |

## RootDirForResolution: /users/username

Root: /users/username

| Location                                                                                     | getDirectoryToWatchFailedLookupLocation                                                      | Recursive |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | --------- |
| /somefile.d.ts                                                                               |                                                                                              |           |
| /dir/somefile.d.ts                                                                           |                                                                                              |           |
| /dir/subdir/somefile.d.ts                                                                    |                                                                                              |           |
| /folderAtRoot/somefile.d.ts                                                                  |                                                                                              |           |
| /folderAtRoot/dir/somefile.d.ts                                                              |                                                                                              |           |
| /folderAtRoot/dir/subdir/somefile.d.ts                                                       |                                                                                              |           |
| /folderAtRoot/folder1/somefile.d.ts                                                          |                                                                                              |           |
| /folderAtRoot/folder1/dir/somefile.d.ts                                                      |                                                                                              |           |
| /folderAtRoot/folder1/dir/subdir/somefile.d.ts                                               |                                                                                              |           |
| /folderAtRoot/folder1/folder2/somefile.d.ts                                                  |                                                                                              |           |
| /folderAtRoot/folder1/folder2/dir/somefile.d.ts                                              |                                                                                              |           |
| /folderAtRoot/folder1/folder2/dir/subdir/somefile.d.ts                                       |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/somefile.d.ts                                          |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/dir/somefile.d.ts                                      |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/dir/subdir/somefile.d.ts                               |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/somefile.d.ts                                  |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/dir/somefile.d.ts                              |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/dir/subdir/somefile.d.ts                       |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/somefile.d.ts                          |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/somefile.d.ts                      |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/subdir/somefile.d.ts               |                                                                                              |           |
| /users/somefile.d.ts                                                                         |                                                                                              |           |
| /users/dir/somefile.d.ts                                                                     |                                                                                              |           |
| /users/dir/subdir/somefile.d.ts                                                              |                                                                                              |           |
| /users/username/somefile.d.ts                                                                | /users/username                                                                              | true      |
| /users/username/dir/somefile.d.ts                                                            | /users/username/dir                                                                          | true      |
| /users/username/dir/subdir/somefile.d.ts                                                     | /users/username/dir                                                                          | true      |
| /users/username/folderAtRoot/somefile.d.ts                                                   | /users/username/folderAtRoot                                                                 | true      |
| /users/username/folderAtRoot/dir/somefile.d.ts                                               | /users/username/folderAtRoot                                                                 | true      |
| /users/username/folderAtRoot/dir/subdir/somefile.d.ts                                        | /users/username/folderAtRoot                                                                 | true      |
| /users/username/folderAtRoot/folder1/somefile.d.ts                                           | /users/username/folderAtRoot                                                                 | true      |
| /users/username/folderAtRoot/folder1/dir/somefile.d.ts                                       | /users/username/folderAtRoot                                                                 | true      |
| /users/username/folderAtRoot/folder1/dir/subdir/somefile.d.ts                                | /users/username/folderAtRoot                                                                 | true      |
| /users/username/folderAtRoot/folder1/folder2/somefile.d.ts                                   | /users/username/folderAtRoot                                                                 | true      |
| /users/username/folderAtRoot/folder1/folder2/dir/somefile.d.ts                               | /users/username/folderAtRoot                                                                 | true      |
| /users/username/folderAtRoot/folder1/folder2/dir/subdir/somefile.d.ts                        | /users/username/folderAtRoot                                                                 | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/somefile.d.ts                           | /users/username/folderAtRoot                                                                 | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/dir/somefile.d.ts                       | /users/username/folderAtRoot                                                                 | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/dir/subdir/somefile.d.ts                | /users/username/folderAtRoot                                                                 | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/somefile.d.ts                   | /users/username/folderAtRoot                                                                 | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/somefile.d.ts               | /users/username/folderAtRoot                                                                 | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/subdir/somefile.d.ts        | /users/username/folderAtRoot                                                                 | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/somefile.d.ts           | /users/username/folderAtRoot                                                                 | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/somefile.d.ts       | /users/username/folderAtRoot                                                                 | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/subdir/somefile.d.ts | /users/username/folderAtRoot                                                                 | true      |
| /user/somefile.d.ts                                                                          |                                                                                              |           |
| /user/dir/somefile.d.ts                                                                      |                                                                                              |           |
| /user/dir/subdir/somefile.d.ts                                                               |                                                                                              |           |
| /user/username/somefile.d.ts                                                                 |                                                                                              |           |
| /user/username/dir/somefile.d.ts                                                             |                                                                                              |           |
| /user/username/dir/subdir/somefile.d.ts                                                      |                                                                                              |           |
| /user/username/folderAtRoot/somefile.d.ts                                                    |                                                                                              |           |
| /user/username/folderAtRoot/dir/somefile.d.ts                                                |                                                                                              |           |
| /user/username/folderAtRoot/dir/subdir/somefile.d.ts                                         |                                                                                              |           |
| /user/username/folderAtRoot/folder1/somefile.d.ts                                            |                                                                                              |           |
| /user/username/folderAtRoot/folder1/dir/somefile.d.ts                                        |                                                                                              |           |
| /user/username/folderAtRoot/folder1/dir/subdir/somefile.d.ts                                 |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/somefile.d.ts                                    |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/dir/somefile.d.ts                                |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/dir/subdir/somefile.d.ts                         |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/somefile.d.ts                            |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/dir/somefile.d.ts                        |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/dir/subdir/somefile.d.ts                 |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/somefile.d.ts                    |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/somefile.d.ts                |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/subdir/somefile.d.ts         |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/somefile.d.ts            |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/somefile.d.ts        |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/subdir/somefile.d.ts |                                                                                              |           |

## RootDirForResolution: /users/username/folderAtRoot

Root: /users/username/folderAtRoot

| Location                                                                                     | getDirectoryToWatchFailedLookupLocation                                                      | Recursive |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | --------- |
| /somefile.d.ts                                                                               |                                                                                              |           |
| /dir/somefile.d.ts                                                                           |                                                                                              |           |
| /dir/subdir/somefile.d.ts                                                                    |                                                                                              |           |
| /folderAtRoot/somefile.d.ts                                                                  |                                                                                              |           |
| /folderAtRoot/dir/somefile.d.ts                                                              |                                                                                              |           |
| /folderAtRoot/dir/subdir/somefile.d.ts                                                       |                                                                                              |           |
| /folderAtRoot/folder1/somefile.d.ts                                                          |                                                                                              |           |
| /folderAtRoot/folder1/dir/somefile.d.ts                                                      |                                                                                              |           |
| /folderAtRoot/folder1/dir/subdir/somefile.d.ts                                               |                                                                                              |           |
| /folderAtRoot/folder1/folder2/somefile.d.ts                                                  |                                                                                              |           |
| /folderAtRoot/folder1/folder2/dir/somefile.d.ts                                              |                                                                                              |           |
| /folderAtRoot/folder1/folder2/dir/subdir/somefile.d.ts                                       |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/somefile.d.ts                                          |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/dir/somefile.d.ts                                      |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/dir/subdir/somefile.d.ts                               |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/somefile.d.ts                                  |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/dir/somefile.d.ts                              |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/dir/subdir/somefile.d.ts                       |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/somefile.d.ts                          |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/somefile.d.ts                      |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/subdir/somefile.d.ts               |                                                                                              |           |
| /users/somefile.d.ts                                                                         |                                                                                              |           |
| /users/dir/somefile.d.ts                                                                     |                                                                                              |           |
| /users/dir/subdir/somefile.d.ts                                                              |                                                                                              |           |
| /users/username/somefile.d.ts                                                                |                                                                                              |           |
| /users/username/dir/somefile.d.ts                                                            |                                                                                              |           |
| /users/username/dir/subdir/somefile.d.ts                                                     |                                                                                              |           |
| /users/username/folderAtRoot/somefile.d.ts                                                   | /users/username/folderAtRoot                                                                 | true      |
| /users/username/folderAtRoot/dir/somefile.d.ts                                               | /users/username/folderAtRoot/dir                                                             | true      |
| /users/username/folderAtRoot/dir/subdir/somefile.d.ts                                        | /users/username/folderAtRoot/dir                                                             | true      |
| /users/username/folderAtRoot/folder1/somefile.d.ts                                           | /users/username/folderAtRoot/folder1                                                         | true      |
| /users/username/folderAtRoot/folder1/dir/somefile.d.ts                                       | /users/username/folderAtRoot/folder1                                                         | true      |
| /users/username/folderAtRoot/folder1/dir/subdir/somefile.d.ts                                | /users/username/folderAtRoot/folder1                                                         | true      |
| /users/username/folderAtRoot/folder1/folder2/somefile.d.ts                                   | /users/username/folderAtRoot/folder1                                                         | true      |
| /users/username/folderAtRoot/folder1/folder2/dir/somefile.d.ts                               | /users/username/folderAtRoot/folder1                                                         | true      |
| /users/username/folderAtRoot/folder1/folder2/dir/subdir/somefile.d.ts                        | /users/username/folderAtRoot/folder1                                                         | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/somefile.d.ts                           | /users/username/folderAtRoot/folder1                                                         | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/dir/somefile.d.ts                       | /users/username/folderAtRoot/folder1                                                         | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/dir/subdir/somefile.d.ts                | /users/username/folderAtRoot/folder1                                                         | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/somefile.d.ts                   | /users/username/folderAtRoot/folder1                                                         | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/somefile.d.ts               | /users/username/folderAtRoot/folder1                                                         | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/subdir/somefile.d.ts        | /users/username/folderAtRoot/folder1                                                         | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/somefile.d.ts           | /users/username/folderAtRoot/folder1                                                         | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/somefile.d.ts       | /users/username/folderAtRoot/folder1                                                         | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/subdir/somefile.d.ts | /users/username/folderAtRoot/folder1                                                         | true      |
| /user/somefile.d.ts                                                                          |                                                                                              |           |
| /user/dir/somefile.d.ts                                                                      |                                                                                              |           |
| /user/dir/subdir/somefile.d.ts                                                               |                                                                                              |           |
| /user/username/somefile.d.ts                                                                 |                                                                                              |           |
| /user/username/dir/somefile.d.ts                                                             |                                                                                              |           |
| /user/username/dir/subdir/somefile.d.ts                                                      |                                                                                              |           |
| /user/username/folderAtRoot/somefile.d.ts                                                    |                                                                                              |           |
| /user/username/folderAtRoot/dir/somefile.d.ts                                                |                                                                                              |           |
| /user/username/folderAtRoot/dir/subdir/somefile.d.ts                                         |                                                                                              |           |
| /user/username/folderAtRoot/folder1/somefile.d.ts                                            |                                                                                              |           |
| /user/username/folderAtRoot/folder1/dir/somefile.d.ts                                        |                                                                                              |           |
| /user/username/folderAtRoot/folder1/dir/subdir/somefile.d.ts                                 |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/somefile.d.ts                                    |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/dir/somefile.d.ts                                |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/dir/subdir/somefile.d.ts                         |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/somefile.d.ts                            |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/dir/somefile.d.ts                        |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/dir/subdir/somefile.d.ts                 |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/somefile.d.ts                    |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/somefile.d.ts                |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/subdir/somefile.d.ts         |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/somefile.d.ts            |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/somefile.d.ts        |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/subdir/somefile.d.ts |                                                                                              |           |

## RootDirForResolution: /users/username/folderAtRoot/folder1

Root: /users/username/folderAtRoot/folder1

| Location                                                                                     | getDirectoryToWatchFailedLookupLocation                                                      | Recursive |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | --------- |
| /somefile.d.ts                                                                               |                                                                                              |           |
| /dir/somefile.d.ts                                                                           |                                                                                              |           |
| /dir/subdir/somefile.d.ts                                                                    |                                                                                              |           |
| /folderAtRoot/somefile.d.ts                                                                  |                                                                                              |           |
| /folderAtRoot/dir/somefile.d.ts                                                              |                                                                                              |           |
| /folderAtRoot/dir/subdir/somefile.d.ts                                                       |                                                                                              |           |
| /folderAtRoot/folder1/somefile.d.ts                                                          |                                                                                              |           |
| /folderAtRoot/folder1/dir/somefile.d.ts                                                      |                                                                                              |           |
| /folderAtRoot/folder1/dir/subdir/somefile.d.ts                                               |                                                                                              |           |
| /folderAtRoot/folder1/folder2/somefile.d.ts                                                  |                                                                                              |           |
| /folderAtRoot/folder1/folder2/dir/somefile.d.ts                                              |                                                                                              |           |
| /folderAtRoot/folder1/folder2/dir/subdir/somefile.d.ts                                       |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/somefile.d.ts                                          |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/dir/somefile.d.ts                                      |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/dir/subdir/somefile.d.ts                               |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/somefile.d.ts                                  |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/dir/somefile.d.ts                              |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/dir/subdir/somefile.d.ts                       |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/somefile.d.ts                          |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/somefile.d.ts                      |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/subdir/somefile.d.ts               |                                                                                              |           |
| /users/somefile.d.ts                                                                         |                                                                                              |           |
| /users/dir/somefile.d.ts                                                                     |                                                                                              |           |
| /users/dir/subdir/somefile.d.ts                                                              |                                                                                              |           |
| /users/username/somefile.d.ts                                                                |                                                                                              |           |
| /users/username/dir/somefile.d.ts                                                            |                                                                                              |           |
| /users/username/dir/subdir/somefile.d.ts                                                     |                                                                                              |           |
| /users/username/folderAtRoot/somefile.d.ts                                                   |                                                                                              |           |
| /users/username/folderAtRoot/dir/somefile.d.ts                                               |                                                                                              |           |
| /users/username/folderAtRoot/dir/subdir/somefile.d.ts                                        |                                                                                              |           |
| /users/username/folderAtRoot/folder1/somefile.d.ts                                           | /users/username/folderAtRoot/folder1                                                         | true      |
| /users/username/folderAtRoot/folder1/dir/somefile.d.ts                                       | /users/username/folderAtRoot/folder1/dir                                                     | true      |
| /users/username/folderAtRoot/folder1/dir/subdir/somefile.d.ts                                | /users/username/folderAtRoot/folder1/dir                                                     | true      |
| /users/username/folderAtRoot/folder1/folder2/somefile.d.ts                                   | /users/username/folderAtRoot/folder1/folder2                                                 | true      |
| /users/username/folderAtRoot/folder1/folder2/dir/somefile.d.ts                               | /users/username/folderAtRoot/folder1/folder2                                                 | true      |
| /users/username/folderAtRoot/folder1/folder2/dir/subdir/somefile.d.ts                        | /users/username/folderAtRoot/folder1/folder2                                                 | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/somefile.d.ts                           | /users/username/folderAtRoot/folder1/folder2                                                 | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/dir/somefile.d.ts                       | /users/username/folderAtRoot/folder1/folder2                                                 | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/dir/subdir/somefile.d.ts                | /users/username/folderAtRoot/folder1/folder2                                                 | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/somefile.d.ts                   | /users/username/folderAtRoot/folder1/folder2                                                 | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/somefile.d.ts               | /users/username/folderAtRoot/folder1/folder2                                                 | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/subdir/somefile.d.ts        | /users/username/folderAtRoot/folder1/folder2                                                 | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/somefile.d.ts           | /users/username/folderAtRoot/folder1/folder2                                                 | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/somefile.d.ts       | /users/username/folderAtRoot/folder1/folder2                                                 | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/subdir/somefile.d.ts | /users/username/folderAtRoot/folder1/folder2                                                 | true      |
| /user/somefile.d.ts                                                                          |                                                                                              |           |
| /user/dir/somefile.d.ts                                                                      |                                                                                              |           |
| /user/dir/subdir/somefile.d.ts                                                               |                                                                                              |           |
| /user/username/somefile.d.ts                                                                 |                                                                                              |           |
| /user/username/dir/somefile.d.ts                                                             |                                                                                              |           |
| /user/username/dir/subdir/somefile.d.ts                                                      |                                                                                              |           |
| /user/username/folderAtRoot/somefile.d.ts                                                    |                                                                                              |           |
| /user/username/folderAtRoot/dir/somefile.d.ts                                                |                                                                                              |           |
| /user/username/folderAtRoot/dir/subdir/somefile.d.ts                                         |                                                                                              |           |
| /user/username/folderAtRoot/folder1/somefile.d.ts                                            |                                                                                              |           |
| /user/username/folderAtRoot/folder1/dir/somefile.d.ts                                        |                                                                                              |           |
| /user/username/folderAtRoot/folder1/dir/subdir/somefile.d.ts                                 |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/somefile.d.ts                                    |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/dir/somefile.d.ts                                |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/dir/subdir/somefile.d.ts                         |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/somefile.d.ts                            |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/dir/somefile.d.ts                        |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/dir/subdir/somefile.d.ts                 |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/somefile.d.ts                    |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/somefile.d.ts                |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/subdir/somefile.d.ts         |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/somefile.d.ts            |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/somefile.d.ts        |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/subdir/somefile.d.ts |                                                                                              |           |

## RootDirForResolution: /users/username/folderAtRoot/folder1/folder2

Root: /users/username/folderAtRoot/folder1/folder2

| Location                                                                                     | getDirectoryToWatchFailedLookupLocation                                                      | Recursive |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | --------- |
| /somefile.d.ts                                                                               |                                                                                              |           |
| /dir/somefile.d.ts                                                                           |                                                                                              |           |
| /dir/subdir/somefile.d.ts                                                                    |                                                                                              |           |
| /folderAtRoot/somefile.d.ts                                                                  |                                                                                              |           |
| /folderAtRoot/dir/somefile.d.ts                                                              |                                                                                              |           |
| /folderAtRoot/dir/subdir/somefile.d.ts                                                       |                                                                                              |           |
| /folderAtRoot/folder1/somefile.d.ts                                                          |                                                                                              |           |
| /folderAtRoot/folder1/dir/somefile.d.ts                                                      |                                                                                              |           |
| /folderAtRoot/folder1/dir/subdir/somefile.d.ts                                               |                                                                                              |           |
| /folderAtRoot/folder1/folder2/somefile.d.ts                                                  |                                                                                              |           |
| /folderAtRoot/folder1/folder2/dir/somefile.d.ts                                              |                                                                                              |           |
| /folderAtRoot/folder1/folder2/dir/subdir/somefile.d.ts                                       |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/somefile.d.ts                                          |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/dir/somefile.d.ts                                      |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/dir/subdir/somefile.d.ts                               |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/somefile.d.ts                                  |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/dir/somefile.d.ts                              |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/dir/subdir/somefile.d.ts                       |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/somefile.d.ts                          |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/somefile.d.ts                      |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/subdir/somefile.d.ts               |                                                                                              |           |
| /users/somefile.d.ts                                                                         |                                                                                              |           |
| /users/dir/somefile.d.ts                                                                     |                                                                                              |           |
| /users/dir/subdir/somefile.d.ts                                                              |                                                                                              |           |
| /users/username/somefile.d.ts                                                                |                                                                                              |           |
| /users/username/dir/somefile.d.ts                                                            |                                                                                              |           |
| /users/username/dir/subdir/somefile.d.ts                                                     |                                                                                              |           |
| /users/username/folderAtRoot/somefile.d.ts                                                   |                                                                                              |           |
| /users/username/folderAtRoot/dir/somefile.d.ts                                               |                                                                                              |           |
| /users/username/folderAtRoot/dir/subdir/somefile.d.ts                                        |                                                                                              |           |
| /users/username/folderAtRoot/folder1/somefile.d.ts                                           | /users/username/folderAtRoot/folder1                                                         | false     |
| /users/username/folderAtRoot/folder1/dir/somefile.d.ts                                       | /users/username/folderAtRoot/folder1/dir                                                     | true      |
| /users/username/folderAtRoot/folder1/dir/subdir/somefile.d.ts                                | /users/username/folderAtRoot/folder1/dir                                                     | true      |
| /users/username/folderAtRoot/folder1/folder2/somefile.d.ts                                   | /users/username/folderAtRoot/folder1/folder2                                                 | true      |
| /users/username/folderAtRoot/folder1/folder2/dir/somefile.d.ts                               | /users/username/folderAtRoot/folder1/folder2/dir                                             | true      |
| /users/username/folderAtRoot/folder1/folder2/dir/subdir/somefile.d.ts                        | /users/username/folderAtRoot/folder1/folder2/dir                                             | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/somefile.d.ts                           | /users/username/folderAtRoot/folder1/folder2/folder3                                         | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/dir/somefile.d.ts                       | /users/username/folderAtRoot/folder1/folder2/folder3                                         | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/dir/subdir/somefile.d.ts                | /users/username/folderAtRoot/folder1/folder2/folder3                                         | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/somefile.d.ts                   | /users/username/folderAtRoot/folder1/folder2/folder3                                         | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/somefile.d.ts               | /users/username/folderAtRoot/folder1/folder2/folder3                                         | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/subdir/somefile.d.ts        | /users/username/folderAtRoot/folder1/folder2/folder3                                         | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/somefile.d.ts           | /users/username/folderAtRoot/folder1/folder2/folder3                                         | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/somefile.d.ts       | /users/username/folderAtRoot/folder1/folder2/folder3                                         | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/subdir/somefile.d.ts | /users/username/folderAtRoot/folder1/folder2/folder3                                         | true      |
| /user/somefile.d.ts                                                                          |                                                                                              |           |
| /user/dir/somefile.d.ts                                                                      |                                                                                              |           |
| /user/dir/subdir/somefile.d.ts                                                               |                                                                                              |           |
| /user/username/somefile.d.ts                                                                 |                                                                                              |           |
| /user/username/dir/somefile.d.ts                                                             |                                                                                              |           |
| /user/username/dir/subdir/somefile.d.ts                                                      |                                                                                              |           |
| /user/username/folderAtRoot/somefile.d.ts                                                    |                                                                                              |           |
| /user/username/folderAtRoot/dir/somefile.d.ts                                                |                                                                                              |           |
| /user/username/folderAtRoot/dir/subdir/somefile.d.ts                                         |                                                                                              |           |
| /user/username/folderAtRoot/folder1/somefile.d.ts                                            |                                                                                              |           |
| /user/username/folderAtRoot/folder1/dir/somefile.d.ts                                        |                                                                                              |           |
| /user/username/folderAtRoot/folder1/dir/subdir/somefile.d.ts                                 |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/somefile.d.ts                                    |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/dir/somefile.d.ts                                |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/dir/subdir/somefile.d.ts                         |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/somefile.d.ts                            |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/dir/somefile.d.ts                        |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/dir/subdir/somefile.d.ts                 |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/somefile.d.ts                    |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/somefile.d.ts                |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/subdir/somefile.d.ts         |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/somefile.d.ts            |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/somefile.d.ts        |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/subdir/somefile.d.ts |                                                                                              |           |

## RootDirForResolution: /users/username/folderAtRoot/folder1/folder2/folder3

Root: /users/username/folderAtRoot/folder1/folder2/folder3

| Location                                                                                     | getDirectoryToWatchFailedLookupLocation                                                      | Recursive |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | --------- |
| /somefile.d.ts                                                                               |                                                                                              |           |
| /dir/somefile.d.ts                                                                           |                                                                                              |           |
| /dir/subdir/somefile.d.ts                                                                    |                                                                                              |           |
| /folderAtRoot/somefile.d.ts                                                                  |                                                                                              |           |
| /folderAtRoot/dir/somefile.d.ts                                                              |                                                                                              |           |
| /folderAtRoot/dir/subdir/somefile.d.ts                                                       |                                                                                              |           |
| /folderAtRoot/folder1/somefile.d.ts                                                          |                                                                                              |           |
| /folderAtRoot/folder1/dir/somefile.d.ts                                                      |                                                                                              |           |
| /folderAtRoot/folder1/dir/subdir/somefile.d.ts                                               |                                                                                              |           |
| /folderAtRoot/folder1/folder2/somefile.d.ts                                                  |                                                                                              |           |
| /folderAtRoot/folder1/folder2/dir/somefile.d.ts                                              |                                                                                              |           |
| /folderAtRoot/folder1/folder2/dir/subdir/somefile.d.ts                                       |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/somefile.d.ts                                          |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/dir/somefile.d.ts                                      |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/dir/subdir/somefile.d.ts                               |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/somefile.d.ts                                  |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/dir/somefile.d.ts                              |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/dir/subdir/somefile.d.ts                       |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/somefile.d.ts                          |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/somefile.d.ts                      |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/subdir/somefile.d.ts               |                                                                                              |           |
| /users/somefile.d.ts                                                                         |                                                                                              |           |
| /users/dir/somefile.d.ts                                                                     |                                                                                              |           |
| /users/dir/subdir/somefile.d.ts                                                              |                                                                                              |           |
| /users/username/somefile.d.ts                                                                |                                                                                              |           |
| /users/username/dir/somefile.d.ts                                                            |                                                                                              |           |
| /users/username/dir/subdir/somefile.d.ts                                                     |                                                                                              |           |
| /users/username/folderAtRoot/somefile.d.ts                                                   |                                                                                              |           |
| /users/username/folderAtRoot/dir/somefile.d.ts                                               |                                                                                              |           |
| /users/username/folderAtRoot/dir/subdir/somefile.d.ts                                        |                                                                                              |           |
| /users/username/folderAtRoot/folder1/somefile.d.ts                                           | /users/username/folderAtRoot/folder1                                                         | false     |
| /users/username/folderAtRoot/folder1/dir/somefile.d.ts                                       | /users/username/folderAtRoot/folder1/dir                                                     | true      |
| /users/username/folderAtRoot/folder1/dir/subdir/somefile.d.ts                                | /users/username/folderAtRoot/folder1/dir                                                     | true      |
| /users/username/folderAtRoot/folder1/folder2/somefile.d.ts                                   | /users/username/folderAtRoot/folder1/folder2                                                 | false     |
| /users/username/folderAtRoot/folder1/folder2/dir/somefile.d.ts                               | /users/username/folderAtRoot/folder1/folder2/dir                                             | true      |
| /users/username/folderAtRoot/folder1/folder2/dir/subdir/somefile.d.ts                        | /users/username/folderAtRoot/folder1/folder2/dir                                             | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/somefile.d.ts                           | /users/username/folderAtRoot/folder1/folder2/folder3                                         | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/dir/somefile.d.ts                       | /users/username/folderAtRoot/folder1/folder2/folder3/dir                                     | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/dir/subdir/somefile.d.ts                | /users/username/folderAtRoot/folder1/folder2/folder3/dir                                     | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/somefile.d.ts                   | /users/username/folderAtRoot/folder1/folder2/folder3/folder4                                 | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/somefile.d.ts               | /users/username/folderAtRoot/folder1/folder2/folder3/folder4                                 | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/subdir/somefile.d.ts        | /users/username/folderAtRoot/folder1/folder2/folder3/folder4                                 | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/somefile.d.ts           | /users/username/folderAtRoot/folder1/folder2/folder3/folder4                                 | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/somefile.d.ts       | /users/username/folderAtRoot/folder1/folder2/folder3/folder4                                 | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/subdir/somefile.d.ts | /users/username/folderAtRoot/folder1/folder2/folder3/folder4                                 | true      |
| /user/somefile.d.ts                                                                          |                                                                                              |           |
| /user/dir/somefile.d.ts                                                                      |                                                                                              |           |
| /user/dir/subdir/somefile.d.ts                                                               |                                                                                              |           |
| /user/username/somefile.d.ts                                                                 |                                                                                              |           |
| /user/username/dir/somefile.d.ts                                                             |                                                                                              |           |
| /user/username/dir/subdir/somefile.d.ts                                                      |                                                                                              |           |
| /user/username/folderAtRoot/somefile.d.ts                                                    |                                                                                              |           |
| /user/username/folderAtRoot/dir/somefile.d.ts                                                |                                                                                              |           |
| /user/username/folderAtRoot/dir/subdir/somefile.d.ts                                         |                                                                                              |           |
| /user/username/folderAtRoot/folder1/somefile.d.ts                                            |                                                                                              |           |
| /user/username/folderAtRoot/folder1/dir/somefile.d.ts                                        |                                                                                              |           |
| /user/username/folderAtRoot/folder1/dir/subdir/somefile.d.ts                                 |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/somefile.d.ts                                    |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/dir/somefile.d.ts                                |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/dir/subdir/somefile.d.ts                         |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/somefile.d.ts                            |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/dir/somefile.d.ts                        |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/dir/subdir/somefile.d.ts                 |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/somefile.d.ts                    |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/somefile.d.ts                |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/subdir/somefile.d.ts         |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/somefile.d.ts            |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/somefile.d.ts        |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/subdir/somefile.d.ts |                                                                                              |           |

## RootDirForResolution: /users/username/folderAtRoot/folder1/folder2/folder3/folder4

Root: /users/username/folderAtRoot/folder1/folder2/folder3/folder4

| Location                                                                                     | getDirectoryToWatchFailedLookupLocation                                                      | Recursive |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | --------- |
| /somefile.d.ts                                                                               |                                                                                              |           |
| /dir/somefile.d.ts                                                                           |                                                                                              |           |
| /dir/subdir/somefile.d.ts                                                                    |                                                                                              |           |
| /folderAtRoot/somefile.d.ts                                                                  |                                                                                              |           |
| /folderAtRoot/dir/somefile.d.ts                                                              |                                                                                              |           |
| /folderAtRoot/dir/subdir/somefile.d.ts                                                       |                                                                                              |           |
| /folderAtRoot/folder1/somefile.d.ts                                                          |                                                                                              |           |
| /folderAtRoot/folder1/dir/somefile.d.ts                                                      |                                                                                              |           |
| /folderAtRoot/folder1/dir/subdir/somefile.d.ts                                               |                                                                                              |           |
| /folderAtRoot/folder1/folder2/somefile.d.ts                                                  |                                                                                              |           |
| /folderAtRoot/folder1/folder2/dir/somefile.d.ts                                              |                                                                                              |           |
| /folderAtRoot/folder1/folder2/dir/subdir/somefile.d.ts                                       |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/somefile.d.ts                                          |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/dir/somefile.d.ts                                      |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/dir/subdir/somefile.d.ts                               |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/somefile.d.ts                                  |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/dir/somefile.d.ts                              |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/dir/subdir/somefile.d.ts                       |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/somefile.d.ts                          |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/somefile.d.ts                      |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/subdir/somefile.d.ts               |                                                                                              |           |
| /users/somefile.d.ts                                                                         |                                                                                              |           |
| /users/dir/somefile.d.ts                                                                     |                                                                                              |           |
| /users/dir/subdir/somefile.d.ts                                                              |                                                                                              |           |
| /users/username/somefile.d.ts                                                                |                                                                                              |           |
| /users/username/dir/somefile.d.ts                                                            |                                                                                              |           |
| /users/username/dir/subdir/somefile.d.ts                                                     |                                                                                              |           |
| /users/username/folderAtRoot/somefile.d.ts                                                   |                                                                                              |           |
| /users/username/folderAtRoot/dir/somefile.d.ts                                               |                                                                                              |           |
| /users/username/folderAtRoot/dir/subdir/somefile.d.ts                                        |                                                                                              |           |
| /users/username/folderAtRoot/folder1/somefile.d.ts                                           | /users/username/folderAtRoot/folder1                                                         | false     |
| /users/username/folderAtRoot/folder1/dir/somefile.d.ts                                       | /users/username/folderAtRoot/folder1/dir                                                     | true      |
| /users/username/folderAtRoot/folder1/dir/subdir/somefile.d.ts                                | /users/username/folderAtRoot/folder1/dir                                                     | true      |
| /users/username/folderAtRoot/folder1/folder2/somefile.d.ts                                   | /users/username/folderAtRoot/folder1/folder2                                                 | false     |
| /users/username/folderAtRoot/folder1/folder2/dir/somefile.d.ts                               | /users/username/folderAtRoot/folder1/folder2/dir                                             | true      |
| /users/username/folderAtRoot/folder1/folder2/dir/subdir/somefile.d.ts                        | /users/username/folderAtRoot/folder1/folder2/dir                                             | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/somefile.d.ts                           | /users/username/folderAtRoot/folder1/folder2/folder3                                         | false     |
| /users/username/folderAtRoot/folder1/folder2/folder3/dir/somefile.d.ts                       | /users/username/folderAtRoot/folder1/folder2/folder3/dir                                     | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/dir/subdir/somefile.d.ts                | /users/username/folderAtRoot/folder1/folder2/folder3/dir                                     | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/somefile.d.ts                   | /users/username/folderAtRoot/folder1/folder2/folder3/folder4                                 | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/somefile.d.ts               | /users/username/folderAtRoot/folder1/folder2/folder3/folder4/dir                             | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/subdir/somefile.d.ts        | /users/username/folderAtRoot/folder1/folder2/folder3/folder4/dir                             | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/somefile.d.ts           | /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5                         | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/somefile.d.ts       | /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5                         | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/subdir/somefile.d.ts | /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5                         | true      |
| /user/somefile.d.ts                                                                          |                                                                                              |           |
| /user/dir/somefile.d.ts                                                                      |                                                                                              |           |
| /user/dir/subdir/somefile.d.ts                                                               |                                                                                              |           |
| /user/username/somefile.d.ts                                                                 |                                                                                              |           |
| /user/username/dir/somefile.d.ts                                                             |                                                                                              |           |
| /user/username/dir/subdir/somefile.d.ts                                                      |                                                                                              |           |
| /user/username/folderAtRoot/somefile.d.ts                                                    |                                                                                              |           |
| /user/username/folderAtRoot/dir/somefile.d.ts                                                |                                                                                              |           |
| /user/username/folderAtRoot/dir/subdir/somefile.d.ts                                         |                                                                                              |           |
| /user/username/folderAtRoot/folder1/somefile.d.ts                                            |                                                                                              |           |
| /user/username/folderAtRoot/folder1/dir/somefile.d.ts                                        |                                                                                              |           |
| /user/username/folderAtRoot/folder1/dir/subdir/somefile.d.ts                                 |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/somefile.d.ts                                    |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/dir/somefile.d.ts                                |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/dir/subdir/somefile.d.ts                         |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/somefile.d.ts                            |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/dir/somefile.d.ts                        |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/dir/subdir/somefile.d.ts                 |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/somefile.d.ts                    |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/somefile.d.ts                |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/subdir/somefile.d.ts         |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/somefile.d.ts            |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/somefile.d.ts        |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/subdir/somefile.d.ts |                                                                                              |           |

## RootDirForResolution: /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

Root: /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

| Location                                                                                     | getDirectoryToWatchFailedLookupLocation                                                      | Recursive |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | --------- |
| /somefile.d.ts                                                                               |                                                                                              |           |
| /dir/somefile.d.ts                                                                           |                                                                                              |           |
| /dir/subdir/somefile.d.ts                                                                    |                                                                                              |           |
| /folderAtRoot/somefile.d.ts                                                                  |                                                                                              |           |
| /folderAtRoot/dir/somefile.d.ts                                                              |                                                                                              |           |
| /folderAtRoot/dir/subdir/somefile.d.ts                                                       |                                                                                              |           |
| /folderAtRoot/folder1/somefile.d.ts                                                          |                                                                                              |           |
| /folderAtRoot/folder1/dir/somefile.d.ts                                                      |                                                                                              |           |
| /folderAtRoot/folder1/dir/subdir/somefile.d.ts                                               |                                                                                              |           |
| /folderAtRoot/folder1/folder2/somefile.d.ts                                                  |                                                                                              |           |
| /folderAtRoot/folder1/folder2/dir/somefile.d.ts                                              |                                                                                              |           |
| /folderAtRoot/folder1/folder2/dir/subdir/somefile.d.ts                                       |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/somefile.d.ts                                          |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/dir/somefile.d.ts                                      |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/dir/subdir/somefile.d.ts                               |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/somefile.d.ts                                  |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/dir/somefile.d.ts                              |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/dir/subdir/somefile.d.ts                       |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/somefile.d.ts                          |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/somefile.d.ts                      |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/subdir/somefile.d.ts               |                                                                                              |           |
| /users/somefile.d.ts                                                                         |                                                                                              |           |
| /users/dir/somefile.d.ts                                                                     |                                                                                              |           |
| /users/dir/subdir/somefile.d.ts                                                              |                                                                                              |           |
| /users/username/somefile.d.ts                                                                |                                                                                              |           |
| /users/username/dir/somefile.d.ts                                                            |                                                                                              |           |
| /users/username/dir/subdir/somefile.d.ts                                                     |                                                                                              |           |
| /users/username/folderAtRoot/somefile.d.ts                                                   |                                                                                              |           |
| /users/username/folderAtRoot/dir/somefile.d.ts                                               |                                                                                              |           |
| /users/username/folderAtRoot/dir/subdir/somefile.d.ts                                        |                                                                                              |           |
| /users/username/folderAtRoot/folder1/somefile.d.ts                                           | /users/username/folderAtRoot/folder1                                                         | false     |
| /users/username/folderAtRoot/folder1/dir/somefile.d.ts                                       | /users/username/folderAtRoot/folder1/dir                                                     | true      |
| /users/username/folderAtRoot/folder1/dir/subdir/somefile.d.ts                                | /users/username/folderAtRoot/folder1/dir                                                     | true      |
| /users/username/folderAtRoot/folder1/folder2/somefile.d.ts                                   | /users/username/folderAtRoot/folder1/folder2                                                 | false     |
| /users/username/folderAtRoot/folder1/folder2/dir/somefile.d.ts                               | /users/username/folderAtRoot/folder1/folder2/dir                                             | true      |
| /users/username/folderAtRoot/folder1/folder2/dir/subdir/somefile.d.ts                        | /users/username/folderAtRoot/folder1/folder2/dir                                             | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/somefile.d.ts                           | /users/username/folderAtRoot/folder1/folder2/folder3                                         | false     |
| /users/username/folderAtRoot/folder1/folder2/folder3/dir/somefile.d.ts                       | /users/username/folderAtRoot/folder1/folder2/folder3/dir                                     | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/dir/subdir/somefile.d.ts                | /users/username/folderAtRoot/folder1/folder2/folder3/dir                                     | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/somefile.d.ts                   | /users/username/folderAtRoot/folder1/folder2/folder3/folder4                                 | false     |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/somefile.d.ts               | /users/username/folderAtRoot/folder1/folder2/folder3/folder4/dir                             | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/subdir/somefile.d.ts        | /users/username/folderAtRoot/folder1/folder2/folder3/folder4/dir                             | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/somefile.d.ts           | /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5                         | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/somefile.d.ts       | /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir                     | true      |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/subdir/somefile.d.ts | /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir                     | true      |
| /user/somefile.d.ts                                                                          |                                                                                              |           |
| /user/dir/somefile.d.ts                                                                      |                                                                                              |           |
| /user/dir/subdir/somefile.d.ts                                                               |                                                                                              |           |
| /user/username/somefile.d.ts                                                                 |                                                                                              |           |
| /user/username/dir/somefile.d.ts                                                             |                                                                                              |           |
| /user/username/dir/subdir/somefile.d.ts                                                      |                                                                                              |           |
| /user/username/folderAtRoot/somefile.d.ts                                                    |                                                                                              |           |
| /user/username/folderAtRoot/dir/somefile.d.ts                                                |                                                                                              |           |
| /user/username/folderAtRoot/dir/subdir/somefile.d.ts                                         |                                                                                              |           |
| /user/username/folderAtRoot/folder1/somefile.d.ts                                            |                                                                                              |           |
| /user/username/folderAtRoot/folder1/dir/somefile.d.ts                                        |                                                                                              |           |
| /user/username/folderAtRoot/folder1/dir/subdir/somefile.d.ts                                 |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/somefile.d.ts                                    |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/dir/somefile.d.ts                                |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/dir/subdir/somefile.d.ts                         |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/somefile.d.ts                            |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/dir/somefile.d.ts                        |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/dir/subdir/somefile.d.ts                 |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/somefile.d.ts                    |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/somefile.d.ts                |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/subdir/somefile.d.ts         |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/somefile.d.ts            |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/somefile.d.ts        |                                                                                              |           |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/subdir/somefile.d.ts |                                                                                              |           |

## RootDirForResolution: /user

Root: /user

| Location                                                                                     | getDirectoryToWatchFailedLookupLocation                                                      | Recursive |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | --------- |
| /somefile.d.ts                                                                               |                                                                                              |           |
| /dir/somefile.d.ts                                                                           |                                                                                              |           |
| /dir/subdir/somefile.d.ts                                                                    |                                                                                              |           |
| /folderAtRoot/somefile.d.ts                                                                  |                                                                                              |           |
| /folderAtRoot/dir/somefile.d.ts                                                              |                                                                                              |           |
| /folderAtRoot/dir/subdir/somefile.d.ts                                                       |                                                                                              |           |
| /folderAtRoot/folder1/somefile.d.ts                                                          |                                                                                              |           |
| /folderAtRoot/folder1/dir/somefile.d.ts                                                      |                                                                                              |           |
| /folderAtRoot/folder1/dir/subdir/somefile.d.ts                                               |                                                                                              |           |
| /folderAtRoot/folder1/folder2/somefile.d.ts                                                  |                                                                                              |           |
| /folderAtRoot/folder1/folder2/dir/somefile.d.ts                                              |                                                                                              |           |
| /folderAtRoot/folder1/folder2/dir/subdir/somefile.d.ts                                       |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/somefile.d.ts                                          |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/dir/somefile.d.ts                                      |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/dir/subdir/somefile.d.ts                               |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/somefile.d.ts                                  |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/dir/somefile.d.ts                              |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/dir/subdir/somefile.d.ts                       |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/somefile.d.ts                          |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/somefile.d.ts                      |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/subdir/somefile.d.ts               |                                                                                              |           |
| /users/somefile.d.ts                                                                         |                                                                                              |           |
| /users/dir/somefile.d.ts                                                                     |                                                                                              |           |
| /users/dir/subdir/somefile.d.ts                                                              |                                                                                              |           |
| /users/username/somefile.d.ts                                                                |                                                                                              |           |
| /users/username/dir/somefile.d.ts                                                            |                                                                                              |           |
| /users/username/dir/subdir/somefile.d.ts                                                     |                                                                                              |           |
| /users/username/folderAtRoot/somefile.d.ts                                                   |                                                                                              |           |
| /users/username/folderAtRoot/dir/somefile.d.ts                                               |                                                                                              |           |
| /users/username/folderAtRoot/dir/subdir/somefile.d.ts                                        |                                                                                              |           |
| /users/username/folderAtRoot/folder1/somefile.d.ts                                           |                                                                                              |           |
| /users/username/folderAtRoot/folder1/dir/somefile.d.ts                                       |                                                                                              |           |
| /users/username/folderAtRoot/folder1/dir/subdir/somefile.d.ts                                |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/somefile.d.ts                                   |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/dir/somefile.d.ts                               |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/dir/subdir/somefile.d.ts                        |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/somefile.d.ts                           |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/dir/somefile.d.ts                       |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/dir/subdir/somefile.d.ts                |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/somefile.d.ts                   |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/somefile.d.ts               |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/subdir/somefile.d.ts        |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/somefile.d.ts           |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/somefile.d.ts       |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/subdir/somefile.d.ts |                                                                                              |           |
| /user/somefile.d.ts                                                                          | /user                                                                                        | true      |
| /user/dir/somefile.d.ts                                                                      | /user/dir                                                                                    | true      |
| /user/dir/subdir/somefile.d.ts                                                               | /user/dir                                                                                    | true      |
| /user/username/somefile.d.ts                                                                 | /user/username                                                                               | true      |
| /user/username/dir/somefile.d.ts                                                             | /user/username                                                                               | true      |
| /user/username/dir/subdir/somefile.d.ts                                                      | /user/username                                                                               | true      |
| /user/username/folderAtRoot/somefile.d.ts                                                    | /user/username                                                                               | true      |
| /user/username/folderAtRoot/dir/somefile.d.ts                                                | /user/username                                                                               | true      |
| /user/username/folderAtRoot/dir/subdir/somefile.d.ts                                         | /user/username                                                                               | true      |
| /user/username/folderAtRoot/folder1/somefile.d.ts                                            | /user/username                                                                               | true      |
| /user/username/folderAtRoot/folder1/dir/somefile.d.ts                                        | /user/username                                                                               | true      |
| /user/username/folderAtRoot/folder1/dir/subdir/somefile.d.ts                                 | /user/username                                                                               | true      |
| /user/username/folderAtRoot/folder1/folder2/somefile.d.ts                                    | /user/username                                                                               | true      |
| /user/username/folderAtRoot/folder1/folder2/dir/somefile.d.ts                                | /user/username                                                                               | true      |
| /user/username/folderAtRoot/folder1/folder2/dir/subdir/somefile.d.ts                         | /user/username                                                                               | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/somefile.d.ts                            | /user/username                                                                               | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/dir/somefile.d.ts                        | /user/username                                                                               | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/dir/subdir/somefile.d.ts                 | /user/username                                                                               | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/somefile.d.ts                    | /user/username                                                                               | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/somefile.d.ts                | /user/username                                                                               | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/subdir/somefile.d.ts         | /user/username                                                                               | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/somefile.d.ts            | /user/username                                                                               | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/somefile.d.ts        | /user/username                                                                               | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/subdir/somefile.d.ts | /user/username                                                                               | true      |

## RootDirForResolution: /user/username

Root: /user/username

| Location                                                                                     | getDirectoryToWatchFailedLookupLocation                                                      | Recursive |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | --------- |
| /somefile.d.ts                                                                               |                                                                                              |           |
| /dir/somefile.d.ts                                                                           |                                                                                              |           |
| /dir/subdir/somefile.d.ts                                                                    |                                                                                              |           |
| /folderAtRoot/somefile.d.ts                                                                  |                                                                                              |           |
| /folderAtRoot/dir/somefile.d.ts                                                              |                                                                                              |           |
| /folderAtRoot/dir/subdir/somefile.d.ts                                                       |                                                                                              |           |
| /folderAtRoot/folder1/somefile.d.ts                                                          |                                                                                              |           |
| /folderAtRoot/folder1/dir/somefile.d.ts                                                      |                                                                                              |           |
| /folderAtRoot/folder1/dir/subdir/somefile.d.ts                                               |                                                                                              |           |
| /folderAtRoot/folder1/folder2/somefile.d.ts                                                  |                                                                                              |           |
| /folderAtRoot/folder1/folder2/dir/somefile.d.ts                                              |                                                                                              |           |
| /folderAtRoot/folder1/folder2/dir/subdir/somefile.d.ts                                       |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/somefile.d.ts                                          |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/dir/somefile.d.ts                                      |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/dir/subdir/somefile.d.ts                               |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/somefile.d.ts                                  |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/dir/somefile.d.ts                              |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/dir/subdir/somefile.d.ts                       |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/somefile.d.ts                          |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/somefile.d.ts                      |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/subdir/somefile.d.ts               |                                                                                              |           |
| /users/somefile.d.ts                                                                         |                                                                                              |           |
| /users/dir/somefile.d.ts                                                                     |                                                                                              |           |
| /users/dir/subdir/somefile.d.ts                                                              |                                                                                              |           |
| /users/username/somefile.d.ts                                                                |                                                                                              |           |
| /users/username/dir/somefile.d.ts                                                            |                                                                                              |           |
| /users/username/dir/subdir/somefile.d.ts                                                     |                                                                                              |           |
| /users/username/folderAtRoot/somefile.d.ts                                                   |                                                                                              |           |
| /users/username/folderAtRoot/dir/somefile.d.ts                                               |                                                                                              |           |
| /users/username/folderAtRoot/dir/subdir/somefile.d.ts                                        |                                                                                              |           |
| /users/username/folderAtRoot/folder1/somefile.d.ts                                           |                                                                                              |           |
| /users/username/folderAtRoot/folder1/dir/somefile.d.ts                                       |                                                                                              |           |
| /users/username/folderAtRoot/folder1/dir/subdir/somefile.d.ts                                |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/somefile.d.ts                                   |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/dir/somefile.d.ts                               |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/dir/subdir/somefile.d.ts                        |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/somefile.d.ts                           |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/dir/somefile.d.ts                       |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/dir/subdir/somefile.d.ts                |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/somefile.d.ts                   |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/somefile.d.ts               |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/subdir/somefile.d.ts        |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/somefile.d.ts           |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/somefile.d.ts       |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/subdir/somefile.d.ts |                                                                                              |           |
| /user/somefile.d.ts                                                                          |                                                                                              |           |
| /user/dir/somefile.d.ts                                                                      |                                                                                              |           |
| /user/dir/subdir/somefile.d.ts                                                               |                                                                                              |           |
| /user/username/somefile.d.ts                                                                 | /user/username                                                                               | true      |
| /user/username/dir/somefile.d.ts                                                             | /user/username/dir                                                                           | true      |
| /user/username/dir/subdir/somefile.d.ts                                                      | /user/username/dir                                                                           | true      |
| /user/username/folderAtRoot/somefile.d.ts                                                    | /user/username/folderAtRoot                                                                  | true      |
| /user/username/folderAtRoot/dir/somefile.d.ts                                                | /user/username/folderAtRoot                                                                  | true      |
| /user/username/folderAtRoot/dir/subdir/somefile.d.ts                                         | /user/username/folderAtRoot                                                                  | true      |
| /user/username/folderAtRoot/folder1/somefile.d.ts                                            | /user/username/folderAtRoot                                                                  | true      |
| /user/username/folderAtRoot/folder1/dir/somefile.d.ts                                        | /user/username/folderAtRoot                                                                  | true      |
| /user/username/folderAtRoot/folder1/dir/subdir/somefile.d.ts                                 | /user/username/folderAtRoot                                                                  | true      |
| /user/username/folderAtRoot/folder1/folder2/somefile.d.ts                                    | /user/username/folderAtRoot                                                                  | true      |
| /user/username/folderAtRoot/folder1/folder2/dir/somefile.d.ts                                | /user/username/folderAtRoot                                                                  | true      |
| /user/username/folderAtRoot/folder1/folder2/dir/subdir/somefile.d.ts                         | /user/username/folderAtRoot                                                                  | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/somefile.d.ts                            | /user/username/folderAtRoot                                                                  | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/dir/somefile.d.ts                        | /user/username/folderAtRoot                                                                  | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/dir/subdir/somefile.d.ts                 | /user/username/folderAtRoot                                                                  | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/somefile.d.ts                    | /user/username/folderAtRoot                                                                  | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/somefile.d.ts                | /user/username/folderAtRoot                                                                  | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/subdir/somefile.d.ts         | /user/username/folderAtRoot                                                                  | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/somefile.d.ts            | /user/username/folderAtRoot                                                                  | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/somefile.d.ts        | /user/username/folderAtRoot                                                                  | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/subdir/somefile.d.ts | /user/username/folderAtRoot                                                                  | true      |

## RootDirForResolution: /user/username/folderAtRoot

Root: /user/username/folderAtRoot

| Location                                                                                     | getDirectoryToWatchFailedLookupLocation                                                      | Recursive |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | --------- |
| /somefile.d.ts                                                                               |                                                                                              |           |
| /dir/somefile.d.ts                                                                           |                                                                                              |           |
| /dir/subdir/somefile.d.ts                                                                    |                                                                                              |           |
| /folderAtRoot/somefile.d.ts                                                                  |                                                                                              |           |
| /folderAtRoot/dir/somefile.d.ts                                                              |                                                                                              |           |
| /folderAtRoot/dir/subdir/somefile.d.ts                                                       |                                                                                              |           |
| /folderAtRoot/folder1/somefile.d.ts                                                          |                                                                                              |           |
| /folderAtRoot/folder1/dir/somefile.d.ts                                                      |                                                                                              |           |
| /folderAtRoot/folder1/dir/subdir/somefile.d.ts                                               |                                                                                              |           |
| /folderAtRoot/folder1/folder2/somefile.d.ts                                                  |                                                                                              |           |
| /folderAtRoot/folder1/folder2/dir/somefile.d.ts                                              |                                                                                              |           |
| /folderAtRoot/folder1/folder2/dir/subdir/somefile.d.ts                                       |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/somefile.d.ts                                          |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/dir/somefile.d.ts                                      |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/dir/subdir/somefile.d.ts                               |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/somefile.d.ts                                  |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/dir/somefile.d.ts                              |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/dir/subdir/somefile.d.ts                       |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/somefile.d.ts                          |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/somefile.d.ts                      |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/subdir/somefile.d.ts               |                                                                                              |           |
| /users/somefile.d.ts                                                                         |                                                                                              |           |
| /users/dir/somefile.d.ts                                                                     |                                                                                              |           |
| /users/dir/subdir/somefile.d.ts                                                              |                                                                                              |           |
| /users/username/somefile.d.ts                                                                |                                                                                              |           |
| /users/username/dir/somefile.d.ts                                                            |                                                                                              |           |
| /users/username/dir/subdir/somefile.d.ts                                                     |                                                                                              |           |
| /users/username/folderAtRoot/somefile.d.ts                                                   |                                                                                              |           |
| /users/username/folderAtRoot/dir/somefile.d.ts                                               |                                                                                              |           |
| /users/username/folderAtRoot/dir/subdir/somefile.d.ts                                        |                                                                                              |           |
| /users/username/folderAtRoot/folder1/somefile.d.ts                                           |                                                                                              |           |
| /users/username/folderAtRoot/folder1/dir/somefile.d.ts                                       |                                                                                              |           |
| /users/username/folderAtRoot/folder1/dir/subdir/somefile.d.ts                                |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/somefile.d.ts                                   |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/dir/somefile.d.ts                               |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/dir/subdir/somefile.d.ts                        |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/somefile.d.ts                           |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/dir/somefile.d.ts                       |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/dir/subdir/somefile.d.ts                |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/somefile.d.ts                   |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/somefile.d.ts               |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/subdir/somefile.d.ts        |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/somefile.d.ts           |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/somefile.d.ts       |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/subdir/somefile.d.ts |                                                                                              |           |
| /user/somefile.d.ts                                                                          |                                                                                              |           |
| /user/dir/somefile.d.ts                                                                      |                                                                                              |           |
| /user/dir/subdir/somefile.d.ts                                                               |                                                                                              |           |
| /user/username/somefile.d.ts                                                                 |                                                                                              |           |
| /user/username/dir/somefile.d.ts                                                             |                                                                                              |           |
| /user/username/dir/subdir/somefile.d.ts                                                      |                                                                                              |           |
| /user/username/folderAtRoot/somefile.d.ts                                                    | /user/username/folderAtRoot                                                                  | true      |
| /user/username/folderAtRoot/dir/somefile.d.ts                                                | /user/username/folderAtRoot/dir                                                              | true      |
| /user/username/folderAtRoot/dir/subdir/somefile.d.ts                                         | /user/username/folderAtRoot/dir                                                              | true      |
| /user/username/folderAtRoot/folder1/somefile.d.ts                                            | /user/username/folderAtRoot/folder1                                                          | true      |
| /user/username/folderAtRoot/folder1/dir/somefile.d.ts                                        | /user/username/folderAtRoot/folder1                                                          | true      |
| /user/username/folderAtRoot/folder1/dir/subdir/somefile.d.ts                                 | /user/username/folderAtRoot/folder1                                                          | true      |
| /user/username/folderAtRoot/folder1/folder2/somefile.d.ts                                    | /user/username/folderAtRoot/folder1                                                          | true      |
| /user/username/folderAtRoot/folder1/folder2/dir/somefile.d.ts                                | /user/username/folderAtRoot/folder1                                                          | true      |
| /user/username/folderAtRoot/folder1/folder2/dir/subdir/somefile.d.ts                         | /user/username/folderAtRoot/folder1                                                          | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/somefile.d.ts                            | /user/username/folderAtRoot/folder1                                                          | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/dir/somefile.d.ts                        | /user/username/folderAtRoot/folder1                                                          | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/dir/subdir/somefile.d.ts                 | /user/username/folderAtRoot/folder1                                                          | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/somefile.d.ts                    | /user/username/folderAtRoot/folder1                                                          | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/somefile.d.ts                | /user/username/folderAtRoot/folder1                                                          | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/subdir/somefile.d.ts         | /user/username/folderAtRoot/folder1                                                          | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/somefile.d.ts            | /user/username/folderAtRoot/folder1                                                          | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/somefile.d.ts        | /user/username/folderAtRoot/folder1                                                          | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/subdir/somefile.d.ts | /user/username/folderAtRoot/folder1                                                          | true      |

## RootDirForResolution: /user/username/folderAtRoot/folder1

Root: /user/username/folderAtRoot/folder1

| Location                                                                                     | getDirectoryToWatchFailedLookupLocation                                                      | Recursive |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | --------- |
| /somefile.d.ts                                                                               |                                                                                              |           |
| /dir/somefile.d.ts                                                                           |                                                                                              |           |
| /dir/subdir/somefile.d.ts                                                                    |                                                                                              |           |
| /folderAtRoot/somefile.d.ts                                                                  |                                                                                              |           |
| /folderAtRoot/dir/somefile.d.ts                                                              |                                                                                              |           |
| /folderAtRoot/dir/subdir/somefile.d.ts                                                       |                                                                                              |           |
| /folderAtRoot/folder1/somefile.d.ts                                                          |                                                                                              |           |
| /folderAtRoot/folder1/dir/somefile.d.ts                                                      |                                                                                              |           |
| /folderAtRoot/folder1/dir/subdir/somefile.d.ts                                               |                                                                                              |           |
| /folderAtRoot/folder1/folder2/somefile.d.ts                                                  |                                                                                              |           |
| /folderAtRoot/folder1/folder2/dir/somefile.d.ts                                              |                                                                                              |           |
| /folderAtRoot/folder1/folder2/dir/subdir/somefile.d.ts                                       |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/somefile.d.ts                                          |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/dir/somefile.d.ts                                      |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/dir/subdir/somefile.d.ts                               |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/somefile.d.ts                                  |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/dir/somefile.d.ts                              |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/dir/subdir/somefile.d.ts                       |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/somefile.d.ts                          |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/somefile.d.ts                      |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/subdir/somefile.d.ts               |                                                                                              |           |
| /users/somefile.d.ts                                                                         |                                                                                              |           |
| /users/dir/somefile.d.ts                                                                     |                                                                                              |           |
| /users/dir/subdir/somefile.d.ts                                                              |                                                                                              |           |
| /users/username/somefile.d.ts                                                                |                                                                                              |           |
| /users/username/dir/somefile.d.ts                                                            |                                                                                              |           |
| /users/username/dir/subdir/somefile.d.ts                                                     |                                                                                              |           |
| /users/username/folderAtRoot/somefile.d.ts                                                   |                                                                                              |           |
| /users/username/folderAtRoot/dir/somefile.d.ts                                               |                                                                                              |           |
| /users/username/folderAtRoot/dir/subdir/somefile.d.ts                                        |                                                                                              |           |
| /users/username/folderAtRoot/folder1/somefile.d.ts                                           |                                                                                              |           |
| /users/username/folderAtRoot/folder1/dir/somefile.d.ts                                       |                                                                                              |           |
| /users/username/folderAtRoot/folder1/dir/subdir/somefile.d.ts                                |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/somefile.d.ts                                   |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/dir/somefile.d.ts                               |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/dir/subdir/somefile.d.ts                        |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/somefile.d.ts                           |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/dir/somefile.d.ts                       |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/dir/subdir/somefile.d.ts                |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/somefile.d.ts                   |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/somefile.d.ts               |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/subdir/somefile.d.ts        |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/somefile.d.ts           |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/somefile.d.ts       |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/subdir/somefile.d.ts |                                                                                              |           |
| /user/somefile.d.ts                                                                          |                                                                                              |           |
| /user/dir/somefile.d.ts                                                                      |                                                                                              |           |
| /user/dir/subdir/somefile.d.ts                                                               |                                                                                              |           |
| /user/username/somefile.d.ts                                                                 |                                                                                              |           |
| /user/username/dir/somefile.d.ts                                                             |                                                                                              |           |
| /user/username/dir/subdir/somefile.d.ts                                                      |                                                                                              |           |
| /user/username/folderAtRoot/somefile.d.ts                                                    |                                                                                              |           |
| /user/username/folderAtRoot/dir/somefile.d.ts                                                |                                                                                              |           |
| /user/username/folderAtRoot/dir/subdir/somefile.d.ts                                         |                                                                                              |           |
| /user/username/folderAtRoot/folder1/somefile.d.ts                                            | /user/username/folderAtRoot/folder1                                                          | true      |
| /user/username/folderAtRoot/folder1/dir/somefile.d.ts                                        | /user/username/folderAtRoot/folder1/dir                                                      | true      |
| /user/username/folderAtRoot/folder1/dir/subdir/somefile.d.ts                                 | /user/username/folderAtRoot/folder1/dir                                                      | true      |
| /user/username/folderAtRoot/folder1/folder2/somefile.d.ts                                    | /user/username/folderAtRoot/folder1/folder2                                                  | true      |
| /user/username/folderAtRoot/folder1/folder2/dir/somefile.d.ts                                | /user/username/folderAtRoot/folder1/folder2                                                  | true      |
| /user/username/folderAtRoot/folder1/folder2/dir/subdir/somefile.d.ts                         | /user/username/folderAtRoot/folder1/folder2                                                  | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/somefile.d.ts                            | /user/username/folderAtRoot/folder1/folder2                                                  | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/dir/somefile.d.ts                        | /user/username/folderAtRoot/folder1/folder2                                                  | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/dir/subdir/somefile.d.ts                 | /user/username/folderAtRoot/folder1/folder2                                                  | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/somefile.d.ts                    | /user/username/folderAtRoot/folder1/folder2                                                  | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/somefile.d.ts                | /user/username/folderAtRoot/folder1/folder2                                                  | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/subdir/somefile.d.ts         | /user/username/folderAtRoot/folder1/folder2                                                  | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/somefile.d.ts            | /user/username/folderAtRoot/folder1/folder2                                                  | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/somefile.d.ts        | /user/username/folderAtRoot/folder1/folder2                                                  | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/subdir/somefile.d.ts | /user/username/folderAtRoot/folder1/folder2                                                  | true      |

## RootDirForResolution: /user/username/folderAtRoot/folder1/folder2

Root: /user/username/folderAtRoot/folder1/folder2

| Location                                                                                     | getDirectoryToWatchFailedLookupLocation                                                      | Recursive |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | --------- |
| /somefile.d.ts                                                                               |                                                                                              |           |
| /dir/somefile.d.ts                                                                           |                                                                                              |           |
| /dir/subdir/somefile.d.ts                                                                    |                                                                                              |           |
| /folderAtRoot/somefile.d.ts                                                                  |                                                                                              |           |
| /folderAtRoot/dir/somefile.d.ts                                                              |                                                                                              |           |
| /folderAtRoot/dir/subdir/somefile.d.ts                                                       |                                                                                              |           |
| /folderAtRoot/folder1/somefile.d.ts                                                          |                                                                                              |           |
| /folderAtRoot/folder1/dir/somefile.d.ts                                                      |                                                                                              |           |
| /folderAtRoot/folder1/dir/subdir/somefile.d.ts                                               |                                                                                              |           |
| /folderAtRoot/folder1/folder2/somefile.d.ts                                                  |                                                                                              |           |
| /folderAtRoot/folder1/folder2/dir/somefile.d.ts                                              |                                                                                              |           |
| /folderAtRoot/folder1/folder2/dir/subdir/somefile.d.ts                                       |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/somefile.d.ts                                          |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/dir/somefile.d.ts                                      |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/dir/subdir/somefile.d.ts                               |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/somefile.d.ts                                  |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/dir/somefile.d.ts                              |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/dir/subdir/somefile.d.ts                       |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/somefile.d.ts                          |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/somefile.d.ts                      |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/subdir/somefile.d.ts               |                                                                                              |           |
| /users/somefile.d.ts                                                                         |                                                                                              |           |
| /users/dir/somefile.d.ts                                                                     |                                                                                              |           |
| /users/dir/subdir/somefile.d.ts                                                              |                                                                                              |           |
| /users/username/somefile.d.ts                                                                |                                                                                              |           |
| /users/username/dir/somefile.d.ts                                                            |                                                                                              |           |
| /users/username/dir/subdir/somefile.d.ts                                                     |                                                                                              |           |
| /users/username/folderAtRoot/somefile.d.ts                                                   |                                                                                              |           |
| /users/username/folderAtRoot/dir/somefile.d.ts                                               |                                                                                              |           |
| /users/username/folderAtRoot/dir/subdir/somefile.d.ts                                        |                                                                                              |           |
| /users/username/folderAtRoot/folder1/somefile.d.ts                                           |                                                                                              |           |
| /users/username/folderAtRoot/folder1/dir/somefile.d.ts                                       |                                                                                              |           |
| /users/username/folderAtRoot/folder1/dir/subdir/somefile.d.ts                                |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/somefile.d.ts                                   |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/dir/somefile.d.ts                               |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/dir/subdir/somefile.d.ts                        |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/somefile.d.ts                           |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/dir/somefile.d.ts                       |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/dir/subdir/somefile.d.ts                |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/somefile.d.ts                   |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/somefile.d.ts               |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/subdir/somefile.d.ts        |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/somefile.d.ts           |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/somefile.d.ts       |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/subdir/somefile.d.ts |                                                                                              |           |
| /user/somefile.d.ts                                                                          |                                                                                              |           |
| /user/dir/somefile.d.ts                                                                      |                                                                                              |           |
| /user/dir/subdir/somefile.d.ts                                                               |                                                                                              |           |
| /user/username/somefile.d.ts                                                                 |                                                                                              |           |
| /user/username/dir/somefile.d.ts                                                             |                                                                                              |           |
| /user/username/dir/subdir/somefile.d.ts                                                      |                                                                                              |           |
| /user/username/folderAtRoot/somefile.d.ts                                                    |                                                                                              |           |
| /user/username/folderAtRoot/dir/somefile.d.ts                                                |                                                                                              |           |
| /user/username/folderAtRoot/dir/subdir/somefile.d.ts                                         |                                                                                              |           |
| /user/username/folderAtRoot/folder1/somefile.d.ts                                            | /user/username/folderAtRoot/folder1                                                          | false     |
| /user/username/folderAtRoot/folder1/dir/somefile.d.ts                                        | /user/username/folderAtRoot/folder1/dir                                                      | true      |
| /user/username/folderAtRoot/folder1/dir/subdir/somefile.d.ts                                 | /user/username/folderAtRoot/folder1/dir                                                      | true      |
| /user/username/folderAtRoot/folder1/folder2/somefile.d.ts                                    | /user/username/folderAtRoot/folder1/folder2                                                  | true      |
| /user/username/folderAtRoot/folder1/folder2/dir/somefile.d.ts                                | /user/username/folderAtRoot/folder1/folder2/dir                                              | true      |
| /user/username/folderAtRoot/folder1/folder2/dir/subdir/somefile.d.ts                         | /user/username/folderAtRoot/folder1/folder2/dir                                              | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/somefile.d.ts                            | /user/username/folderAtRoot/folder1/folder2/folder3                                          | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/dir/somefile.d.ts                        | /user/username/folderAtRoot/folder1/folder2/folder3                                          | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/dir/subdir/somefile.d.ts                 | /user/username/folderAtRoot/folder1/folder2/folder3                                          | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/somefile.d.ts                    | /user/username/folderAtRoot/folder1/folder2/folder3                                          | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/somefile.d.ts                | /user/username/folderAtRoot/folder1/folder2/folder3                                          | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/subdir/somefile.d.ts         | /user/username/folderAtRoot/folder1/folder2/folder3                                          | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/somefile.d.ts            | /user/username/folderAtRoot/folder1/folder2/folder3                                          | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/somefile.d.ts        | /user/username/folderAtRoot/folder1/folder2/folder3                                          | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/subdir/somefile.d.ts | /user/username/folderAtRoot/folder1/folder2/folder3                                          | true      |

## RootDirForResolution: /user/username/folderAtRoot/folder1/folder2/folder3

Root: /user/username/folderAtRoot/folder1/folder2/folder3

| Location                                                                                     | getDirectoryToWatchFailedLookupLocation                                                      | Recursive |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | --------- |
| /somefile.d.ts                                                                               |                                                                                              |           |
| /dir/somefile.d.ts                                                                           |                                                                                              |           |
| /dir/subdir/somefile.d.ts                                                                    |                                                                                              |           |
| /folderAtRoot/somefile.d.ts                                                                  |                                                                                              |           |
| /folderAtRoot/dir/somefile.d.ts                                                              |                                                                                              |           |
| /folderAtRoot/dir/subdir/somefile.d.ts                                                       |                                                                                              |           |
| /folderAtRoot/folder1/somefile.d.ts                                                          |                                                                                              |           |
| /folderAtRoot/folder1/dir/somefile.d.ts                                                      |                                                                                              |           |
| /folderAtRoot/folder1/dir/subdir/somefile.d.ts                                               |                                                                                              |           |
| /folderAtRoot/folder1/folder2/somefile.d.ts                                                  |                                                                                              |           |
| /folderAtRoot/folder1/folder2/dir/somefile.d.ts                                              |                                                                                              |           |
| /folderAtRoot/folder1/folder2/dir/subdir/somefile.d.ts                                       |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/somefile.d.ts                                          |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/dir/somefile.d.ts                                      |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/dir/subdir/somefile.d.ts                               |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/somefile.d.ts                                  |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/dir/somefile.d.ts                              |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/dir/subdir/somefile.d.ts                       |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/somefile.d.ts                          |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/somefile.d.ts                      |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/subdir/somefile.d.ts               |                                                                                              |           |
| /users/somefile.d.ts                                                                         |                                                                                              |           |
| /users/dir/somefile.d.ts                                                                     |                                                                                              |           |
| /users/dir/subdir/somefile.d.ts                                                              |                                                                                              |           |
| /users/username/somefile.d.ts                                                                |                                                                                              |           |
| /users/username/dir/somefile.d.ts                                                            |                                                                                              |           |
| /users/username/dir/subdir/somefile.d.ts                                                     |                                                                                              |           |
| /users/username/folderAtRoot/somefile.d.ts                                                   |                                                                                              |           |
| /users/username/folderAtRoot/dir/somefile.d.ts                                               |                                                                                              |           |
| /users/username/folderAtRoot/dir/subdir/somefile.d.ts                                        |                                                                                              |           |
| /users/username/folderAtRoot/folder1/somefile.d.ts                                           |                                                                                              |           |
| /users/username/folderAtRoot/folder1/dir/somefile.d.ts                                       |                                                                                              |           |
| /users/username/folderAtRoot/folder1/dir/subdir/somefile.d.ts                                |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/somefile.d.ts                                   |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/dir/somefile.d.ts                               |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/dir/subdir/somefile.d.ts                        |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/somefile.d.ts                           |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/dir/somefile.d.ts                       |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/dir/subdir/somefile.d.ts                |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/somefile.d.ts                   |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/somefile.d.ts               |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/subdir/somefile.d.ts        |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/somefile.d.ts           |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/somefile.d.ts       |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/subdir/somefile.d.ts |                                                                                              |           |
| /user/somefile.d.ts                                                                          |                                                                                              |           |
| /user/dir/somefile.d.ts                                                                      |                                                                                              |           |
| /user/dir/subdir/somefile.d.ts                                                               |                                                                                              |           |
| /user/username/somefile.d.ts                                                                 |                                                                                              |           |
| /user/username/dir/somefile.d.ts                                                             |                                                                                              |           |
| /user/username/dir/subdir/somefile.d.ts                                                      |                                                                                              |           |
| /user/username/folderAtRoot/somefile.d.ts                                                    |                                                                                              |           |
| /user/username/folderAtRoot/dir/somefile.d.ts                                                |                                                                                              |           |
| /user/username/folderAtRoot/dir/subdir/somefile.d.ts                                         |                                                                                              |           |
| /user/username/folderAtRoot/folder1/somefile.d.ts                                            | /user/username/folderAtRoot/folder1                                                          | false     |
| /user/username/folderAtRoot/folder1/dir/somefile.d.ts                                        | /user/username/folderAtRoot/folder1/dir                                                      | true      |
| /user/username/folderAtRoot/folder1/dir/subdir/somefile.d.ts                                 | /user/username/folderAtRoot/folder1/dir                                                      | true      |
| /user/username/folderAtRoot/folder1/folder2/somefile.d.ts                                    | /user/username/folderAtRoot/folder1/folder2                                                  | false     |
| /user/username/folderAtRoot/folder1/folder2/dir/somefile.d.ts                                | /user/username/folderAtRoot/folder1/folder2/dir                                              | true      |
| /user/username/folderAtRoot/folder1/folder2/dir/subdir/somefile.d.ts                         | /user/username/folderAtRoot/folder1/folder2/dir                                              | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/somefile.d.ts                            | /user/username/folderAtRoot/folder1/folder2/folder3                                          | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/dir/somefile.d.ts                        | /user/username/folderAtRoot/folder1/folder2/folder3/dir                                      | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/dir/subdir/somefile.d.ts                 | /user/username/folderAtRoot/folder1/folder2/folder3/dir                                      | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/somefile.d.ts                    | /user/username/folderAtRoot/folder1/folder2/folder3/folder4                                  | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/somefile.d.ts                | /user/username/folderAtRoot/folder1/folder2/folder3/folder4                                  | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/subdir/somefile.d.ts         | /user/username/folderAtRoot/folder1/folder2/folder3/folder4                                  | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/somefile.d.ts            | /user/username/folderAtRoot/folder1/folder2/folder3/folder4                                  | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/somefile.d.ts        | /user/username/folderAtRoot/folder1/folder2/folder3/folder4                                  | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/subdir/somefile.d.ts | /user/username/folderAtRoot/folder1/folder2/folder3/folder4                                  | true      |

## RootDirForResolution: /user/username/folderAtRoot/folder1/folder2/folder3/folder4

Root: /user/username/folderAtRoot/folder1/folder2/folder3/folder4

| Location                                                                                     | getDirectoryToWatchFailedLookupLocation                                                      | Recursive |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | --------- |
| /somefile.d.ts                                                                               |                                                                                              |           |
| /dir/somefile.d.ts                                                                           |                                                                                              |           |
| /dir/subdir/somefile.d.ts                                                                    |                                                                                              |           |
| /folderAtRoot/somefile.d.ts                                                                  |                                                                                              |           |
| /folderAtRoot/dir/somefile.d.ts                                                              |                                                                                              |           |
| /folderAtRoot/dir/subdir/somefile.d.ts                                                       |                                                                                              |           |
| /folderAtRoot/folder1/somefile.d.ts                                                          |                                                                                              |           |
| /folderAtRoot/folder1/dir/somefile.d.ts                                                      |                                                                                              |           |
| /folderAtRoot/folder1/dir/subdir/somefile.d.ts                                               |                                                                                              |           |
| /folderAtRoot/folder1/folder2/somefile.d.ts                                                  |                                                                                              |           |
| /folderAtRoot/folder1/folder2/dir/somefile.d.ts                                              |                                                                                              |           |
| /folderAtRoot/folder1/folder2/dir/subdir/somefile.d.ts                                       |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/somefile.d.ts                                          |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/dir/somefile.d.ts                                      |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/dir/subdir/somefile.d.ts                               |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/somefile.d.ts                                  |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/dir/somefile.d.ts                              |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/dir/subdir/somefile.d.ts                       |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/somefile.d.ts                          |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/somefile.d.ts                      |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/subdir/somefile.d.ts               |                                                                                              |           |
| /users/somefile.d.ts                                                                         |                                                                                              |           |
| /users/dir/somefile.d.ts                                                                     |                                                                                              |           |
| /users/dir/subdir/somefile.d.ts                                                              |                                                                                              |           |
| /users/username/somefile.d.ts                                                                |                                                                                              |           |
| /users/username/dir/somefile.d.ts                                                            |                                                                                              |           |
| /users/username/dir/subdir/somefile.d.ts                                                     |                                                                                              |           |
| /users/username/folderAtRoot/somefile.d.ts                                                   |                                                                                              |           |
| /users/username/folderAtRoot/dir/somefile.d.ts                                               |                                                                                              |           |
| /users/username/folderAtRoot/dir/subdir/somefile.d.ts                                        |                                                                                              |           |
| /users/username/folderAtRoot/folder1/somefile.d.ts                                           |                                                                                              |           |
| /users/username/folderAtRoot/folder1/dir/somefile.d.ts                                       |                                                                                              |           |
| /users/username/folderAtRoot/folder1/dir/subdir/somefile.d.ts                                |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/somefile.d.ts                                   |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/dir/somefile.d.ts                               |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/dir/subdir/somefile.d.ts                        |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/somefile.d.ts                           |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/dir/somefile.d.ts                       |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/dir/subdir/somefile.d.ts                |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/somefile.d.ts                   |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/somefile.d.ts               |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/subdir/somefile.d.ts        |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/somefile.d.ts           |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/somefile.d.ts       |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/subdir/somefile.d.ts |                                                                                              |           |
| /user/somefile.d.ts                                                                          |                                                                                              |           |
| /user/dir/somefile.d.ts                                                                      |                                                                                              |           |
| /user/dir/subdir/somefile.d.ts                                                               |                                                                                              |           |
| /user/username/somefile.d.ts                                                                 |                                                                                              |           |
| /user/username/dir/somefile.d.ts                                                             |                                                                                              |           |
| /user/username/dir/subdir/somefile.d.ts                                                      |                                                                                              |           |
| /user/username/folderAtRoot/somefile.d.ts                                                    |                                                                                              |           |
| /user/username/folderAtRoot/dir/somefile.d.ts                                                |                                                                                              |           |
| /user/username/folderAtRoot/dir/subdir/somefile.d.ts                                         |                                                                                              |           |
| /user/username/folderAtRoot/folder1/somefile.d.ts                                            | /user/username/folderAtRoot/folder1                                                          | false     |
| /user/username/folderAtRoot/folder1/dir/somefile.d.ts                                        | /user/username/folderAtRoot/folder1/dir                                                      | true      |
| /user/username/folderAtRoot/folder1/dir/subdir/somefile.d.ts                                 | /user/username/folderAtRoot/folder1/dir                                                      | true      |
| /user/username/folderAtRoot/folder1/folder2/somefile.d.ts                                    | /user/username/folderAtRoot/folder1/folder2                                                  | false     |
| /user/username/folderAtRoot/folder1/folder2/dir/somefile.d.ts                                | /user/username/folderAtRoot/folder1/folder2/dir                                              | true      |
| /user/username/folderAtRoot/folder1/folder2/dir/subdir/somefile.d.ts                         | /user/username/folderAtRoot/folder1/folder2/dir                                              | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/somefile.d.ts                            | /user/username/folderAtRoot/folder1/folder2/folder3                                          | false     |
| /user/username/folderAtRoot/folder1/folder2/folder3/dir/somefile.d.ts                        | /user/username/folderAtRoot/folder1/folder2/folder3/dir                                      | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/dir/subdir/somefile.d.ts                 | /user/username/folderAtRoot/folder1/folder2/folder3/dir                                      | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/somefile.d.ts                    | /user/username/folderAtRoot/folder1/folder2/folder3/folder4                                  | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/somefile.d.ts                | /user/username/folderAtRoot/folder1/folder2/folder3/folder4/dir                              | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/subdir/somefile.d.ts         | /user/username/folderAtRoot/folder1/folder2/folder3/folder4/dir                              | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/somefile.d.ts            | /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5                          | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/somefile.d.ts        | /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5                          | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/subdir/somefile.d.ts | /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5                          | true      |

## RootDirForResolution: /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

Root: /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5

| Location                                                                                     | getDirectoryToWatchFailedLookupLocation                                                      | Recursive |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | --------- |
| /somefile.d.ts                                                                               |                                                                                              |           |
| /dir/somefile.d.ts                                                                           |                                                                                              |           |
| /dir/subdir/somefile.d.ts                                                                    |                                                                                              |           |
| /folderAtRoot/somefile.d.ts                                                                  |                                                                                              |           |
| /folderAtRoot/dir/somefile.d.ts                                                              |                                                                                              |           |
| /folderAtRoot/dir/subdir/somefile.d.ts                                                       |                                                                                              |           |
| /folderAtRoot/folder1/somefile.d.ts                                                          |                                                                                              |           |
| /folderAtRoot/folder1/dir/somefile.d.ts                                                      |                                                                                              |           |
| /folderAtRoot/folder1/dir/subdir/somefile.d.ts                                               |                                                                                              |           |
| /folderAtRoot/folder1/folder2/somefile.d.ts                                                  |                                                                                              |           |
| /folderAtRoot/folder1/folder2/dir/somefile.d.ts                                              |                                                                                              |           |
| /folderAtRoot/folder1/folder2/dir/subdir/somefile.d.ts                                       |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/somefile.d.ts                                          |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/dir/somefile.d.ts                                      |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/dir/subdir/somefile.d.ts                               |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/somefile.d.ts                                  |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/dir/somefile.d.ts                              |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/dir/subdir/somefile.d.ts                       |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/somefile.d.ts                          |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/somefile.d.ts                      |                                                                                              |           |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/subdir/somefile.d.ts               |                                                                                              |           |
| /users/somefile.d.ts                                                                         |                                                                                              |           |
| /users/dir/somefile.d.ts                                                                     |                                                                                              |           |
| /users/dir/subdir/somefile.d.ts                                                              |                                                                                              |           |
| /users/username/somefile.d.ts                                                                |                                                                                              |           |
| /users/username/dir/somefile.d.ts                                                            |                                                                                              |           |
| /users/username/dir/subdir/somefile.d.ts                                                     |                                                                                              |           |
| /users/username/folderAtRoot/somefile.d.ts                                                   |                                                                                              |           |
| /users/username/folderAtRoot/dir/somefile.d.ts                                               |                                                                                              |           |
| /users/username/folderAtRoot/dir/subdir/somefile.d.ts                                        |                                                                                              |           |
| /users/username/folderAtRoot/folder1/somefile.d.ts                                           |                                                                                              |           |
| /users/username/folderAtRoot/folder1/dir/somefile.d.ts                                       |                                                                                              |           |
| /users/username/folderAtRoot/folder1/dir/subdir/somefile.d.ts                                |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/somefile.d.ts                                   |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/dir/somefile.d.ts                               |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/dir/subdir/somefile.d.ts                        |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/somefile.d.ts                           |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/dir/somefile.d.ts                       |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/dir/subdir/somefile.d.ts                |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/somefile.d.ts                   |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/somefile.d.ts               |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/subdir/somefile.d.ts        |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/somefile.d.ts           |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/somefile.d.ts       |                                                                                              |           |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/subdir/somefile.d.ts |                                                                                              |           |
| /user/somefile.d.ts                                                                          |                                                                                              |           |
| /user/dir/somefile.d.ts                                                                      |                                                                                              |           |
| /user/dir/subdir/somefile.d.ts                                                               |                                                                                              |           |
| /user/username/somefile.d.ts                                                                 |                                                                                              |           |
| /user/username/dir/somefile.d.ts                                                             |                                                                                              |           |
| /user/username/dir/subdir/somefile.d.ts                                                      |                                                                                              |           |
| /user/username/folderAtRoot/somefile.d.ts                                                    |                                                                                              |           |
| /user/username/folderAtRoot/dir/somefile.d.ts                                                |                                                                                              |           |
| /user/username/folderAtRoot/dir/subdir/somefile.d.ts                                         |                                                                                              |           |
| /user/username/folderAtRoot/folder1/somefile.d.ts                                            | /user/username/folderAtRoot/folder1                                                          | false     |
| /user/username/folderAtRoot/folder1/dir/somefile.d.ts                                        | /user/username/folderAtRoot/folder1/dir                                                      | true      |
| /user/username/folderAtRoot/folder1/dir/subdir/somefile.d.ts                                 | /user/username/folderAtRoot/folder1/dir                                                      | true      |
| /user/username/folderAtRoot/folder1/folder2/somefile.d.ts                                    | /user/username/folderAtRoot/folder1/folder2                                                  | false     |
| /user/username/folderAtRoot/folder1/folder2/dir/somefile.d.ts                                | /user/username/folderAtRoot/folder1/folder2/dir                                              | true      |
| /user/username/folderAtRoot/folder1/folder2/dir/subdir/somefile.d.ts                         | /user/username/folderAtRoot/folder1/folder2/dir                                              | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/somefile.d.ts                            | /user/username/folderAtRoot/folder1/folder2/folder3                                          | false     |
| /user/username/folderAtRoot/folder1/folder2/folder3/dir/somefile.d.ts                        | /user/username/folderAtRoot/folder1/folder2/folder3/dir                                      | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/dir/subdir/somefile.d.ts                 | /user/username/folderAtRoot/folder1/folder2/folder3/dir                                      | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/somefile.d.ts                    | /user/username/folderAtRoot/folder1/folder2/folder3/folder4                                  | false     |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/somefile.d.ts                | /user/username/folderAtRoot/folder1/folder2/folder3/folder4/dir                              | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/subdir/somefile.d.ts         | /user/username/folderAtRoot/folder1/folder2/folder3/folder4/dir                              | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/somefile.d.ts            | /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5                          | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/somefile.d.ts        | /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir                      | true      |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/subdir/somefile.d.ts | /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir                      | true      |

## RootDirForResolution: undefined

Root: undefined

| Location                                                                                     | getDirectoryToWatchFailedLookupLocation                                                      | Recursive |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | --------- |
| /somefile.d.ts                                                                               |                                                                                              |           |
| /dir/somefile.d.ts                                                                           |                                                                                              |           |
| /dir/subdir/somefile.d.ts                                                                    |                                                                                              |           |
| /folderAtRoot/somefile.d.ts                                                                  |                                                                                              |           |
| /folderAtRoot/dir/somefile.d.ts                                                              |                                                                                              |           |
| /folderAtRoot/dir/subdir/somefile.d.ts                                                       |                                                                                              |           |
| /folderAtRoot/folder1/somefile.d.ts                                                          |                                                                                              |           |
| /folderAtRoot/folder1/dir/somefile.d.ts                                                      |                                                                                              |           |
| /folderAtRoot/folder1/dir/subdir/somefile.d.ts                                               | /folderAtRoot/folder1/dir/subdir                                                             | false     |
| /folderAtRoot/folder1/folder2/somefile.d.ts                                                  |                                                                                              |           |
| /folderAtRoot/folder1/folder2/dir/somefile.d.ts                                              | /folderAtRoot/folder1/folder2/dir                                                            | false     |
| /folderAtRoot/folder1/folder2/dir/subdir/somefile.d.ts                                       | /folderAtRoot/folder1/folder2/dir/subdir                                                     | false     |
| /folderAtRoot/folder1/folder2/folder3/somefile.d.ts                                          | /folderAtRoot/folder1/folder2/folder3                                                        | false     |
| /folderAtRoot/folder1/folder2/folder3/dir/somefile.d.ts                                      | /folderAtRoot/folder1/folder2/folder3/dir                                                    | false     |
| /folderAtRoot/folder1/folder2/folder3/dir/subdir/somefile.d.ts                               | /folderAtRoot/folder1/folder2/folder3/dir/subdir                                             | false     |
| /folderAtRoot/folder1/folder2/folder3/folder4/somefile.d.ts                                  | /folderAtRoot/folder1/folder2/folder3/folder4                                                | false     |
| /folderAtRoot/folder1/folder2/folder3/folder4/dir/somefile.d.ts                              | /folderAtRoot/folder1/folder2/folder3/folder4/dir                                            | false     |
| /folderAtRoot/folder1/folder2/folder3/folder4/dir/subdir/somefile.d.ts                       | /folderAtRoot/folder1/folder2/folder3/folder4/dir/subdir                                     | false     |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/somefile.d.ts                          | /folderAtRoot/folder1/folder2/folder3/folder4/folder5                                        | false     |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/somefile.d.ts                      | /folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir                                    | false     |
| /folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/subdir/somefile.d.ts               | /folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/subdir                             | false     |
| /users/somefile.d.ts                                                                         |                                                                                              |           |
| /users/dir/somefile.d.ts                                                                     |                                                                                              |           |
| /users/dir/subdir/somefile.d.ts                                                              |                                                                                              |           |
| /users/username/somefile.d.ts                                                                |                                                                                              |           |
| /users/username/dir/somefile.d.ts                                                            |                                                                                              |           |
| /users/username/dir/subdir/somefile.d.ts                                                     | /users/username/dir/subdir                                                                   | false     |
| /users/username/folderAtRoot/somefile.d.ts                                                   |                                                                                              |           |
| /users/username/folderAtRoot/dir/somefile.d.ts                                               | /users/username/folderAtRoot/dir                                                             | false     |
| /users/username/folderAtRoot/dir/subdir/somefile.d.ts                                        | /users/username/folderAtRoot/dir/subdir                                                      | false     |
| /users/username/folderAtRoot/folder1/somefile.d.ts                                           | /users/username/folderAtRoot/folder1                                                         | false     |
| /users/username/folderAtRoot/folder1/dir/somefile.d.ts                                       | /users/username/folderAtRoot/folder1/dir                                                     | false     |
| /users/username/folderAtRoot/folder1/dir/subdir/somefile.d.ts                                | /users/username/folderAtRoot/folder1/dir/subdir                                              | false     |
| /users/username/folderAtRoot/folder1/folder2/somefile.d.ts                                   | /users/username/folderAtRoot/folder1/folder2                                                 | false     |
| /users/username/folderAtRoot/folder1/folder2/dir/somefile.d.ts                               | /users/username/folderAtRoot/folder1/folder2/dir                                             | false     |
| /users/username/folderAtRoot/folder1/folder2/dir/subdir/somefile.d.ts                        | /users/username/folderAtRoot/folder1/folder2/dir/subdir                                      | false     |
| /users/username/folderAtRoot/folder1/folder2/folder3/somefile.d.ts                           | /users/username/folderAtRoot/folder1/folder2/folder3                                         | false     |
| /users/username/folderAtRoot/folder1/folder2/folder3/dir/somefile.d.ts                       | /users/username/folderAtRoot/folder1/folder2/folder3/dir                                     | false     |
| /users/username/folderAtRoot/folder1/folder2/folder3/dir/subdir/somefile.d.ts                | /users/username/folderAtRoot/folder1/folder2/folder3/dir/subdir                              | false     |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/somefile.d.ts                   | /users/username/folderAtRoot/folder1/folder2/folder3/folder4                                 | false     |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/somefile.d.ts               | /users/username/folderAtRoot/folder1/folder2/folder3/folder4/dir                             | false     |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/subdir/somefile.d.ts        | /users/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/subdir                      | false     |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/somefile.d.ts           | /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5                         | false     |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/somefile.d.ts       | /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir                     | false     |
| /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/subdir/somefile.d.ts | /users/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/subdir              | false     |
| /user/somefile.d.ts                                                                          |                                                                                              |           |
| /user/dir/somefile.d.ts                                                                      |                                                                                              |           |
| /user/dir/subdir/somefile.d.ts                                                               |                                                                                              |           |
| /user/username/somefile.d.ts                                                                 |                                                                                              |           |
| /user/username/dir/somefile.d.ts                                                             |                                                                                              |           |
| /user/username/dir/subdir/somefile.d.ts                                                      | /user/username/dir/subdir                                                                    | false     |
| /user/username/folderAtRoot/somefile.d.ts                                                    |                                                                                              |           |
| /user/username/folderAtRoot/dir/somefile.d.ts                                                | /user/username/folderAtRoot/dir                                                              | false     |
| /user/username/folderAtRoot/dir/subdir/somefile.d.ts                                         | /user/username/folderAtRoot/dir/subdir                                                       | false     |
| /user/username/folderAtRoot/folder1/somefile.d.ts                                            | /user/username/folderAtRoot/folder1                                                          | false     |
| /user/username/folderAtRoot/folder1/dir/somefile.d.ts                                        | /user/username/folderAtRoot/folder1/dir                                                      | false     |
| /user/username/folderAtRoot/folder1/dir/subdir/somefile.d.ts                                 | /user/username/folderAtRoot/folder1/dir/subdir                                               | false     |
| /user/username/folderAtRoot/folder1/folder2/somefile.d.ts                                    | /user/username/folderAtRoot/folder1/folder2                                                  | false     |
| /user/username/folderAtRoot/folder1/folder2/dir/somefile.d.ts                                | /user/username/folderAtRoot/folder1/folder2/dir                                              | false     |
| /user/username/folderAtRoot/folder1/folder2/dir/subdir/somefile.d.ts                         | /user/username/folderAtRoot/folder1/folder2/dir/subdir                                       | false     |
| /user/username/folderAtRoot/folder1/folder2/folder3/somefile.d.ts                            | /user/username/folderAtRoot/folder1/folder2/folder3                                          | false     |
| /user/username/folderAtRoot/folder1/folder2/folder3/dir/somefile.d.ts                        | /user/username/folderAtRoot/folder1/folder2/folder3/dir                                      | false     |
| /user/username/folderAtRoot/folder1/folder2/folder3/dir/subdir/somefile.d.ts                 | /user/username/folderAtRoot/folder1/folder2/folder3/dir/subdir                               | false     |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/somefile.d.ts                    | /user/username/folderAtRoot/folder1/folder2/folder3/folder4                                  | false     |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/somefile.d.ts                | /user/username/folderAtRoot/folder1/folder2/folder3/folder4/dir                              | false     |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/subdir/somefile.d.ts         | /user/username/folderAtRoot/folder1/folder2/folder3/folder4/dir/subdir                       | false     |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/somefile.d.ts            | /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5                          | false     |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/somefile.d.ts        | /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir                      | false     |
| /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/subdir/somefile.d.ts | /user/username/folderAtRoot/folder1/folder2/folder3/folder4/folder5/dir/subdir               | false     |

