// @strict: true
// @strictNullChecks: true, false
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/11920

if (null === undefined) {
}
if (null == undefined) {
}

declare const str: string;
declare const strOrNull: string | null;
declare const strOrUndef: string | undefined;
declare const strOrNullUndef: string | null | undefined;

if (str === null) {
}
if (str === undefined) {
}
if (str == null) {
}
if (str == undefined) {
}

switch (str) {
  case null:
  case undefined:
  case "a":
  default:
}

if (strOrNull === null) {
}
if (strOrNull === undefined) {
}
if (strOrNull == null) {
}
if (strOrNull == undefined) {
}

switch (strOrNull) {
  case null:
  case undefined:
  case "a":
  default:
}

if (strOrUndef === null) {
}
if (strOrUndef === undefined) {
}
if (strOrUndef == null) {
}
if (strOrUndef == undefined) {
}

switch (strOrUndef) {
  case null:
  case undefined:
  case "a":
  default:
}

if (strOrNullUndef === null) {
}
if (strOrNullUndef === undefined) {
}
if (strOrNullUndef == null) {
}
if (strOrNullUndef == undefined) {
}

switch (strOrNullUndef) {
  case null:
  case undefined:
  case "a":
  default:
}

if (typeof str === undefined) {
}
if (typeof strOrNull === undefined) {
}
if (typeof strOrUndef === undefined) {
}
if (typeof strOrNullUndef === undefined) {
}
