// @strict: true
// @target: es2017

declare const database: unique symbol;
declare const models: {
    user: { create(entity?: object): void };
    [database]: { create(name: string, entity: object, id?: string): void };
};

for (const [, model] of Object.entries(models)) {
    model.create({});
}
