// @strictNullChecks: true
declare function openFile(): void
declare function closeFile(): void
declare function someOperation(): {}

var result: {}
openFile()
try {
  result = someOperation()
} finally {
  closeFile()
}

result // should not error here