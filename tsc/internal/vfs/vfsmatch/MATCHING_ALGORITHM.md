# Glob Matching Algorithm Specification

This document is a formal algorithmic specification of the file-path glob matching
logic. An implementation conforming to this specification must produce identical
results for all inputs. All subroutine errors are propagated as errors of the
calling routine unless stated otherwise.

---

## 1. Definitions

**Path** — A normalized, `/`-separated absolute file path (e.g., `/project/src/index.ts`).

**Path component** — A single segment between `/` delimiters (e.g., `src`, `index.ts`). The leading `/` produces the root component, which is the empty string `""`.

**Spec** — A user-provided glob string (e.g., `src/**/*.ts`), before compilation.

**Base path** — The absolute directory against which relative specs are resolved.

**Usage mode** — One of three modes that alter matching semantics:
- **Files** — Matches complete file paths.
- **Directories** — Matches directory prefixes for traversal pruning.
- **Exclude** — Matches paths to be excluded.

**Component kind** — One of:
- **Literal** — Contains no `*` or `?` characters.
- **Wildcard** — Contains at least one `*` or `?` character.
- **DoubleAsterisk** — The exact string `**`.

**Character** — A single Unicode scalar value (codepoint). See Section 9 for the precise character-boundary requirements that apply during segment matching.

**Segment kind** — One of:
- **SegLiteral** — An exact literal substring.
- **SegStar** — Matches zero or more characters excluding `/`.
- **SegQuestion** — Matches exactly one character excluding `/`.

**Pattern** — A compiled spec consisting of a component list, a usage mode, and a case-sensitivity flag.

---

## 2. Helper Predicates

**IS_HIDDEN_PATH**(_component_)

> 1. If the length of _component_ is 0, return **false**.
> 2. If the first character of _component_ is `"."`, return **true**.
> 3. Return **false**.

**IS_PACKAGE_FOLDER**(_component_)

> 1. If _component_ equals `"node_modules"` (case-insensitive), return **true**.
> 2. If _component_ equals `"bower_components"` (case-insensitive), return **true**.
> 3. If _component_ equals `"jspm_packages"` (case-insensitive), return **true**.
> 4. Return **false**.

**ENSURE_TRAILING_SLASH**(_s_)

> 1. If the length of _s_ is 0, return _s_.
> 2. If the last character of _s_ is `"/"`, return _s_.
> 3. Return _s_ concatenated with `"/"`.

**STRINGS_EQUAL**(_a_, _b_, _caseSensitive_)

> 1. If _caseSensitive_ is **true**, return whether _a_ and _b_ are byte-for-byte identical.
> 2. Return whether _a_ and _b_ are equal under Unicode case folding.

**IS_IMPLICIT_GLOB**(_component_)

> 1. If _component_ contains any of the characters `"."`, `"*"`, or `"?"`, return **false**.
> 2. Return **true**.

---

## 3. Spec Normalization

**NORMALIZE_SPEC**(_spec_, _basePath_)

> 1. Let _components_ be the result of resolving _spec_ against _basePath_ into an ordered list of normalized path components. The first element is the absolute root prefix (e.g., `"/home"`). The resolution uses `/` as the path separator, resolves `.` and `..` segments, and collapses consecutive separators.
> 2. If the last character of _components_\[0\] is `"/"`, remove it.
> 3. Return _components_.

---

## 4. Segment Parsing

**PARSE_SEGMENTS**(_string_)

> 1. Let _segments_ be an empty list.
> 2. Let _start_ be 0.
> 3. For each index _i_ from 0 to the length of _string_ − 1:
>    1. If _string_\[_i_\] is `"*"` or `"?"`, then:
>       1. If _i_ > _start_, append a **SegLiteral** segment with value _string_\[_start_.._i_\] to _segments_.
>       2. If _string_\[_i_\] is `"*"`, append a **SegStar** segment to _segments_.
>       3. Otherwise, append a **SegQuestion** segment to _segments_.
>       4. Set _start_ to _i_ + 1.
> 4. If _start_ < length of _string_, append a **SegLiteral** segment with value _string_\[_start_..\] to _segments_.
> 5. Return _segments_.

---

## 5. Pattern Compilation

**COMPILE_PATTERN**(_spec_, _basePath_, _usage_, _caseSensitive_)

> 1. Let _components_ be the result of NORMALIZE_SPEC(_spec_, _basePath_).
> 2. If the last element of _components_ is `"**"` and _usage_ is not **Exclude**, return **failure**. (The pattern compiles to nothing.)
> 3. If IS_IMPLICIT_GLOB(last element of _components_) is **true** (note: this check is applied to the _normalized_ component, not the raw spec string), then:
>    1. Append `"**"` to _components_.
>    2. Append `"*"` to _components_.
> 4. Let _compiledComponents_ be an empty list.
> 5. For each _part_ in _components_:
>    1. If _part_ is `"**"`, append a **DoubleAsterisk** component to _compiledComponents_.
>    2. Otherwise, if _part_ contains no `"*"` or `"?"` characters, append a **Literal** component with value _part_ to _compiledComponents_.
>    3. Otherwise, append a **Wildcard** component with segments PARSE_SEGMENTS(_part_) to _compiledComponents_.
> 6. Return a pattern with component list _compiledComponents_, usage mode _usage_, and case-sensitivity flag _caseSensitive_.

---

## 6. Path Component Extraction

**NEXT_PATH_COMPONENT**(_path_, _offset_)

> 1. If _offset_ ≥ length of _path_, return (**none**, _offset_, **false**).
> 2. If _offset_ is 0 and _path_\[0\] is `"/"`, return (`""`, 1, **true**).
> 3. While _offset_ < length of _path_ and _path_\[_offset_\] is `"/"`, increment _offset_.
> 4. If _offset_ ≥ length of _path_, return (**none**, _offset_, **false**).
> 5. Let _start_ be _offset_.
> 6. While _offset_ < length of _path_ and _path_\[_offset_\] is not `"/"`, increment _offset_.
> 7. Return (_path_\[_start_.._offset_\], _offset_, **true**).

---

## 7. Full-Path Matching

**MATCH_PATH**(_pattern_, _path_)

> 1. Return the result of MATCH_PATH_INNER(_pattern_, _path_, 0, 0, **false**).

**MATCH_PATH_PREFIX**(_pattern_, _path_)

> 1. Return the result of MATCH_PATH_INNER(_pattern_, _path_, 0, 0, **true**).

**MATCH_PATH_INNER**(_pattern_, _path_, _pathOffset_, _compIdx_, _prefixOnly_)

> 1. Let _components_ be the component list of _pattern_.
> 2. Let _usage_ be the usage mode of _pattern_.
> 3. Let _caseSensitive_ be the case-sensitivity flag of _pattern_.
> 4. Loop:
>    1. Let (_part_, _nextOffset_, _ok_) be the result of NEXT_PATH_COMPONENT(_path_, _pathOffset_).
>    2. If _ok_ is **false**, then:
>       1. If _prefixOnly_ is **true**, return **true**.
>       2. Return the result of PATTERN_SATISFIED(_components_, _compIdx_).
>    3. If _compIdx_ ≥ length of _components_, then:
>       1. If _usage_ is **Exclude** and _prefixOnly_ is **false**, return **true**.
>       2. Return **false**.
>    4. Let _comp_ be _components_\[_compIdx_\].
>    5. If the kind of _comp_ is **DoubleAsterisk**, then:
>       1. Let _skipResult_ be the result of MATCH_PATH_INNER(_pattern_, _path_, _pathOffset_, _compIdx_ + 1, _prefixOnly_).
>       2. If _skipResult_ is **true**, return **true**.
>       3. If _usage_ is not **Exclude**, then:
>          1. If IS_HIDDEN_PATH(_part_) is **true**, return **false**.
>          2. If IS_PACKAGE_FOLDER(_part_) is **true**, return **false**.
>       4. Set _pathOffset_ to _nextOffset_.
>       5. Continue the loop.
>    6. If the kind of _comp_ is **Literal**, then:
>       1. If STRINGS_EQUAL(_comp_.value, _part_, _caseSensitive_) is **false**, return **false**.
>    7. If the kind of _comp_ is **Wildcard**, then:
>       1. If _usage_ is not **Exclude** and IS_PACKAGE_FOLDER(_part_) is **true**, return **false**.
>       2. If the result of MATCH_WILDCARD(_pattern_, _comp_.segments, _part_) is **false**, return **false**.
>    8. Set _pathOffset_ to _nextOffset_.
>    9. Increment _compIdx_.

**PATTERN_SATISFIED**(_components_, _compIdx_)

> 1. For each index _i_ from _compIdx_ to length of _components_ − 1:
>    1. If the kind of _components_\[_i_\] is not **DoubleAsterisk**, return **false**.
> 2. Return **true**.

---

## 8. Wildcard Component Matching

**MATCH_WILDCARD**(_pattern_, _segments_, _string_)

> 1. Let _usage_ be the usage mode of _pattern_.
> 2. Let _caseSensitive_ be the case-sensitivity flag of _pattern_.
> 3. If _usage_ is not **Exclude**, then:
>    1. If the length of _segments_ > 0, then:
>       1. Let _firstKind_ be the kind of _segments_\[0\].
>       2. If (_firstKind_ is **SegStar** or _firstKind_ is **SegQuestion**) and IS_HIDDEN_PATH(_string_) is **true**, return **false**.
> 4. Let _matched_ be the result of MATCH_SEGMENTS(_segments_, _string_, _caseSensitive_).
> 5. If _matched_ is **false**, return **false**.
> 6. Let _accepted_ be the result of SHOULD_ACCEPT_MIN_JS(_pattern_, _segments_, _string_).
> 7. Return _accepted_.

---

## 9. Segment Matching

In this section, all string positions refer to **character** (codepoint) boundaries.
Implementations must advance by full codepoints, not by encoding units (e.g., not
by individual bytes in UTF-8, nor by individual code units in UTF-16). "Increment
_sIdx_" means advance _sIdx_ past the next character (one codepoint). Likewise,
"length of _s_" is the number of characters, and _s_\[_sIdx_\] is the character
at position _sIdx_.

The original TypeScript implementation uses ECMAScript regexes without the `u` flag,
which operate on UTF-16 code units; a conforming implementation may match on
codepoints instead, as the difference is only observable for supplementary-plane
characters (U+10000 and above) in filenames.

**MATCH_SEGMENTS**(_segments_, _s_, _caseSensitive_)

> 1. Let _segIdx_ be 0.
> 2. Let _sIdx_ be 0.
> 3. Let _starSegIdx_ be −1.
> 4. Let _starSIdx_ be 0.
> 5. While _sIdx_ < length of _s_:
>    1. If _segIdx_ < length of _segments_, then:
>       1. Let _seg_ be _segments_\[_segIdx_\].
>       2. If the kind of _seg_ is **SegLiteral**, then:
>          1. Let _lit_ be the value of _seg_.
>          2. If _sIdx_ + length of _lit_ ≤ length of _s_ and STRINGS_EQUAL(_lit_, _s_\[_sIdx_.._sIdx_+len(_lit_)\], _caseSensitive_) is **true**, then:
>             1. Set _sIdx_ to _sIdx_ + length of _lit_.
>             2. Increment _segIdx_.
>             3. Continue the loop.
>       3. If the kind of _seg_ is **SegQuestion**, then:
>          1. If _s_\[_sIdx_\] is not `"/"`, then:
>             1. Increment _sIdx_.
>             2. Increment _segIdx_.
>             3. Continue the loop.
>       4. If the kind of _seg_ is **SegStar**, then:
>          1. Set _starSegIdx_ to _segIdx_.
>          2. Set _starSIdx_ to _sIdx_.
>          3. Increment _segIdx_.
>          4. Continue the loop.
>    2. If _starSegIdx_ ≥ 0 and _starSIdx_ < length of _s_ and _s_\[_starSIdx_\] is not `"/"`, then:
>       1. Increment _starSIdx_.
>       2. Set _sIdx_ to _starSIdx_.
>       3. Set _segIdx_ to _starSegIdx_ + 1.
>       4. Continue the loop.
>    3. Return **false**.
> 6. While _segIdx_ < length of _segments_ and the kind of _segments_\[_segIdx_\] is **SegStar**:
>    1. Increment _segIdx_.
> 7. Return _segIdx_ ≥ length of _segments_.

---

## 10. `.min.js` Default Exclusion

**SHOULD_ACCEPT_MIN_JS**(_pattern_, _segments_, _filename_)

> 1. Let _usage_ be the usage mode of _pattern_.
> 2. If _usage_ is not **Files**, return **true**.
> 3. If the result of HAS_MIN_JS_SUFFIX(_filename_, _pattern_.caseSensitive) is **false**, return **true**.
> 4. If the result of PATTERN_MENTIONS_MIN_SUFFIX(_segments_, _pattern_.caseSensitive) is **true**, return **true**.
> 5. Return **false**.

**HAS_MIN_JS_SUFFIX**(_filename_, _caseSensitive_)

> 1. Let _suffix_ be `".min.js"`.
> 2. If length of _filename_ < length of _suffix_, return **false**.
> 3. Let _tail_ be the last 7 characters of _filename_.
> 4. If _caseSensitive_ is **true**, return whether _tail_ equals `".min.js"`.
> 5. Return whether _tail_ equals `".min.js"` under Unicode case folding.

**PATTERN_MENTIONS_MIN_SUFFIX**(_segments_, _caseSensitive_)

> 1. For each _seg_ in _segments_:
>    1. If the kind of _seg_ is not **SegLiteral**, continue.
>    2. Let _lit_ be the value of _seg_.
>    3. If _caseSensitive_ is **false**, let _lit_ be the lowercase form of _lit_.
>    4. If _lit_ contains the substring `".min.js"` or `".min."`, return **true**.
> 2. Return **false**.

---

## 11. Composite Matchers

**MATCH_FILE**(_path_, _includePatterns_, _excludePatterns_, _hadIncludes_)

> 1. For each _pattern_ in _excludePatterns_:
>    1. If the result of MATCH_PATH(_pattern_, _path_) is **true**, return (0, **false**).
> 2. If length of _includePatterns_ is 0, then:
>    1. If _hadIncludes_ is **true**, return (0, **false**).
>    2. Return (0, **true**).
> 3. For each index _i_ from 0 to length of _includePatterns_ − 1:
>    1. If the result of MATCH_PATH(_includePatterns_\[_i_\], _path_) is **true**, return (_i_, **true**).
> 4. Return (0, **false**).

**MATCH_DIRECTORY**(_path_, _includePatterns_, _excludePatterns_, _hadIncludes_)

> 1. For each _pattern_ in _excludePatterns_:
>    1. If the result of MATCH_PATH(_pattern_, _path_) is **true**, return **false**.
> 2. If length of _includePatterns_ is 0, then:
>    1. If _hadIncludes_ is **true**, return **false**.
>    2. Return **true**.
> 3. For each _pattern_ in _includePatterns_:
>    1. If the result of MATCH_PATH_PREFIX(_pattern_, _path_) is **true**, return **true**.
> 4. Return **false**.

**MATCH_SPEC**(_patterns_, _path_)

> 1. For each _pattern_ in _patterns_:
>    1. If the result of MATCH_PATH(_pattern_, _path_) is **true**, return **true**.
> 2. Return **false**.

**MATCH_SPEC_INDEX**(_patterns_, _path_)

> 1. For each index _i_ from 0 to length of _patterns_ − 1:
>    1. If the result of MATCH_PATH(_patterns_\[_i_\], _path_) is **true**, return _i_.
> 2. Return −1.

---

## 12. Pattern Set Compilation

**COMPILE_PATTERNS**(_specs_, _basePath_, _usage_, _caseSensitive_)

> 1. Let _patterns_ be an empty list.
> 2. For each _spec_ in _specs_:
>    1. Let _result_ be the result of COMPILE_PATTERN(_spec_, _basePath_, _usage_, _caseSensitive_).
>    2. If _result_ is not **failure**, append _result_ to _patterns_.
> 3. Return _patterns_.

**COMPILE_FILE_MATCHER**(_includeSpecs_, _excludeSpecs_, _basePath_, _caseSensitive_)

> 1. Let _includePatterns_ be the result of COMPILE_PATTERNS(_includeSpecs_, _basePath_, **Files**, _caseSensitive_).
> 2. Let _excludePatterns_ be the result of COMPILE_PATTERNS(_excludeSpecs_, _basePath_, **Exclude**, _caseSensitive_).
> 3. Let _hadIncludes_ be whether length of _includeSpecs_ > 0.
> 4. Return (_includePatterns_, _excludePatterns_, _hadIncludes_).

**COMPILE_DIRECTORY_MATCHER**(_includeSpecs_, _excludeSpecs_, _basePath_, _caseSensitive_)

> 1. Let _includePatterns_ be the result of COMPILE_PATTERNS(_includeSpecs_, _basePath_, **Directories**, _caseSensitive_).
> 2. Let _excludePatterns_ be the result of COMPILE_PATTERNS(_excludeSpecs_, _basePath_, **Exclude**, _caseSensitive_).
> 3. Let _hadIncludes_ be whether length of _includeSpecs_ > 0.
> 4. Return (_includePatterns_, _excludePatterns_, _hadIncludes_).

---

## 13. Base Path Computation

**GET_BASE_PATHS**(_rootPath_, _includeSpecs_, _caseSensitive_)

> 1. Let _basePaths_ be a list containing _rootPath_.
> 2. If _includeSpecs_ is empty, return _basePaths_.
> 3. Let _includeBasePaths_ be an empty list.
> 4. For each _spec_ in _includeSpecs_:
>    1. Let _absolute_ be the result of resolving _spec_ to an absolute normalized path against _rootPath_.
>    2. Let _basePath_ be GET_INCLUDE_BASE_PATH(_absolute_).
>    3. Append _basePath_ to _includeBasePaths_.
> 5. Sort _includeBasePaths_ using a string comparator that is case-insensitive if _caseSensitive_ is **false**.
> 6. For each _candidate_ in _includeBasePaths_:
>    1. If no element of _basePaths_ is a path-prefix of _candidate_ (respecting _caseSensitive_), append _candidate_ to _basePaths_.
> 7. Return _basePaths_.

**GET_INCLUDE_BASE_PATH**(_absoluteSpec_)

> 1. Let _wildcardOffset_ be the index of the first `"*"` or `"?"` character in _absoluteSpec_.
> 2. If _wildcardOffset_ < 0, then:
>    1. If _absoluteSpec_ has a file extension (contains `"."`), return the parent directory of _absoluteSpec_.
>    2. Return _absoluteSpec_.
> 3. Return the substring of _absoluteSpec_ up to and including the last `"/"` before _wildcardOffset_.

---

## 14. Directory Traversal

**READ_DIRECTORY**(_host_, _currentDir_, _path_, _extensions_, _excludeSpecs_, _includeSpecs_, _caseSensitive_, _depth_)

The _host_ must provide the following operations:
- **Realpath**(_path_) — Resolves symlinks and returns the canonical absolute path.
- **GetAccessibleEntries**(_path_) — Returns the sorted lists of files and subdirectories in the directory at _path_.

> 1. Let _path_ be the normalized form of _path_.
> 2. Let _currentDir_ be the normalized form of _currentDir_.
> 3. Let _absolutePath_ be the concatenation of _currentDir_, `"/"`, and _path_ (normalized).
> 4. Let (_fileIncludes_, _fileExcludes_, _fileHadIncludes_) be the result of COMPILE_FILE_MATCHER(_includeSpecs_, _excludeSpecs_, _absolutePath_, _caseSensitive_).
> 5. Let (_dirIncludes_, _dirExcludes_, _dirHadIncludes_) be the result of COMPILE_DIRECTORY_MATCHER(_includeSpecs_, _excludeSpecs_, _absolutePath_, _caseSensitive_).
> 6. Let _resultBuckets_ be a list of empty lists, with length equal to max(length of _fileIncludes_, 1).
> 7. Let _visited_ be an empty set of strings.
> 8. Let _basePaths_ be the result of GET_BASE_PATHS(_path_, _includeSpecs_, _caseSensitive_).
> 9. For each _basePath_ in _basePaths_:
>    1. Let _baseAbsolute_ be the concatenation of _currentDir_, `"/"`, and _basePath_ (normalized).
>    2. Perform VISIT(_host_, _basePath_, _baseAbsolute_, _depth_, _extensions_, _fileIncludes_, _fileExcludes_, _fileHadIncludes_, _dirIncludes_, _dirExcludes_, _dirHadIncludes_, _caseSensitive_, _visited_, _resultBuckets_).
> 10. Return the concatenation of all lists in _resultBuckets_, in order.

**VISIT**(_host_, _path_, _absolutePath_, _depth_, _extensions_, _fileIncludes_, _fileExcludes_, _fileHadIncludes_, _dirIncludes_, _dirExcludes_, _dirHadIncludes_, _caseSensitive_, _visited_, _resultBuckets_)

> 1. Let _realPath_ be the result of _host_.Realpath(_absolutePath_).
> 2. Let _canonicalPath_ be the canonical form of _realPath_ under the file system's case-sensitivity rules.
> 3. If _visited_ contains _canonicalPath_, return.
> 4. Add _canonicalPath_ to _visited_.
> 5. Let _entries_ be the result of _host_.GetAccessibleEntries(_absolutePath_).
> 6. Let _absPrefix_ be ENSURE_TRAILING_SLASH(_absolutePath_).
> 7. Let _pathPrefix_ be ENSURE_TRAILING_SLASH(_path_).
> 8. For each _file_ in _entries_.files:
>    1. If _extensions_ is non-empty and the file extension of _file_ is not in _extensions_, continue.
>    2. Let _absFile_ be _absPrefix_ concatenated with _file_.
>    3. Let (_index_, _matched_) be the result of MATCH_FILE(_absFile_, _fileIncludes_, _fileExcludes_, _fileHadIncludes_).
>    4. If _matched_ is **true**, append _pathPrefix_ concatenated with _file_ to _resultBuckets_\[_index_\].
> 9. If _depth_ is finite (i.e., not the sentinel value representing unlimited depth), then:
>    1. Decrement _depth_.
>    2. If _depth_ is 0, return.
> 10. For each _dir_ in _entries_.directories:
>     1. Let _absDir_ be _absPrefix_ concatenated with _dir_.
>     2. If the result of MATCH_DIRECTORY(_absDir_, _dirIncludes_, _dirExcludes_, _dirHadIncludes_) is **false**, continue.
>     3. Perform VISIT(_host_, _pathPrefix_ concatenated with _dir_, _absDir_, _depth_, _extensions_, _fileIncludes_, _fileExcludes_, _fileHadIncludes_, _dirIncludes_, _dirExcludes_, _dirHadIncludes_, _caseSensitive_, _visited_, _resultBuckets_).

---

## 15. Invariants

The following properties hold for all conforming implementations:

1. COMPILE_PATTERN returns **failure** for any include or directory spec whose last component is `"**"`.
2. When the pattern is exhausted but path components remain, exclude patterns return **true** and all other patterns return **false**.
3. MATCH_SEGMENTS is guaranteed **O(n·m)** where _n_ is the string length and _m_ is the segment count.
4. The `.min.js` default exclusion applies only under **Files** usage mode and only to wildcard components.
5. Symlink cycles are detected through real-path canonicalization in VISIT and cause the directory to be skipped.
6. Excludes are always evaluated before includes in MATCH_FILE and MATCH_DIRECTORY.
7. For include patterns, wildcard components reject package folders; literal components do not.
8. For include patterns, `**` does not descend into hidden paths or package folders.
9. For include patterns, a wildcard component whose first segment is **SegStar** or **SegQuestion** does not match hidden path components.
