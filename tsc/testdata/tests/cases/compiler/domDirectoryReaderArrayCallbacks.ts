// @strict: true
// @target: es2015
// @lib: es2015,dom

declare const reader: FileSystemDirectoryReader;
reader.readEntries(entries => entries.length);
reader.readEntries(async (entries: FileSystemEntry[]) => {});
new Promise<readonly FileSystemEntry[]>(resolve => reader.readEntries(resolve));
