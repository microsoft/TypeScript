/// <reference path="fourslash.ts" />
// @experimentalDecorators: true

// @Filename: /project/libraries/dtos/tsconfig.json
// { }

// @Filename: /project/libraries/dtos/src/book.entity.ts
////@Entity()
////export class BookEntity {
////    id: number
////}

// @Filename: /project/libraries/dtos/src/user.entity.ts
////import { Entity } from "mikro-orm"
////@Entity()
////export class UserEntity {
////    id: number
////}

// @Filename: /project/common/temp/node_modules/.registry.npmjs.org/mikro-orm/3.4.1_pg@7.18.2/node_modules/mikro-orm/package.json
////{ "name": "mikro-orm", "version": "3.4.1", "typings": "dist/index.d.ts" }

// @Filename: /project/common/temp/node_modules/.registry.npmjs.org/mikro-orm/3.4.1_pg@7.18.2/node_modules/mikro-orm/dist/index.d.ts
////export * from "./decorators";

// @Filename: /project/common/temp/node_modules/.registry.npmjs.org/mikro-orm/3.4.1_pg@7.18.2/node_modules/mikro-orm/dist/decorators/index.d.ts
////export * from "./entity";

// @Filename: /project/common/temp/node_modules/.registry.npmjs.org/mikro-orm/3.4.1_pg@7.18.2/node_modules/mikro-orm/dist/decorators/entity.d.ts
////export declare function Entity(): Function;

// @link: /project/common/temp/node_modules/.registry.npmjs.org/mikro-orm/3.4.1_pg@7.18.2/node_modules/mikro-orm -> /project/libraries/dtos/node_modules/mikro-orm


goTo.file("/project/libraries/dtos/src/book.entity.ts");
verify.importFixAtPosition([
    getImportFixContent("mikro-orm"),
    getImportFixContent("mikro-orm/dist/decorators"),
    getImportFixContent("mikro-orm/dist/decorators/entity"),
]);

function getImportFixContent(from: string) {
    return `import { Entity } from "${from}";

@Entity()
export class BookEntity {
    id: number
}`;
}
