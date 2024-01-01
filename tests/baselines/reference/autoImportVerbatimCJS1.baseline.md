// === Auto Imports ===
```ts
// @Filename: /a.ts
/*|*/
```

## From completions

- `coolName` from `"./cool-name"`
- `explode` from `"./cool-name"`
- `isAbsolute` from `"path"`
- `join` from `"path"`
- `normalize` from `"path"`
- `path` from `"path"`
- `resolve` from `"path"`

```ts
import coolName = require("./cool-name");

coolName
```

```ts
import coolName = require("./cool-name");

coolName.explode
```

```ts
import path = require("path");

path.isAbsolute
```

```ts
import path = require("path");

path.join
```

```ts
import path = require("path");

path.normalize
```

```ts
import path = require("path");

path
```

```ts
import path = require("path");

path.resolve
```

## From codefixes

### When marker text is `normalize`

Add import from "path"

```ts
import path = require("path");

path.normalize
```

### When marker text is `join`

Add import from "path"

```ts
import path = require("path");

path.join
```

### When marker text is `path`

Add import from "path"

```ts
import path = require("path");

path
```

### When marker text is `explode`

Add import from "./cool-name"

```ts
import coolName = require("./cool-name");

coolName.explode
```

