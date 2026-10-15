//// [tests/cases/compiler/domDirectoryReaderArrayCallbacks.ts] ////

//// [domDirectoryReaderArrayCallbacks.ts]
declare const reader: FileSystemDirectoryReader;
reader.readEntries(entries => entries.length);
reader.readEntries(async (entries: FileSystemEntry[]) => {});
new Promise<readonly FileSystemEntry[]>(resolve => reader.readEntries(resolve));


//// [domDirectoryReaderArrayCallbacks.js]
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
reader.readEntries(entries => entries.length);
reader.readEntries((entries) => __awaiter(void 0, void 0, void 0, function* () { }));
new Promise(resolve => reader.readEntries(resolve));
