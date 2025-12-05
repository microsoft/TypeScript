/// <reference path='fourslash.ts' />

// @Filename: /src/utils/old.ts
////export const helper = () => 42;

// @Filename: /src/utils/__tests__/helper.test.ts
////jest.mock("../old");
////jest.requireActual("../old");
////import { helper } from "../old";

verify.getEditsForFileRename({
    oldPath: "/src/utils/old.ts",
    newPath: "/src/utils/new.ts",
    newFileContents: {
        "/src/utils/__tests__/helper.test.ts":
`jest.mock("../new");
jest.requireActual("../new");
import { helper } from "../new";`,
    },
    preferences: {
        updateImportsInTestFrameworkCalls: true,
    },
});
