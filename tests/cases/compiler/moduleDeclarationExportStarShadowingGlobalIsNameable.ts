// @declaration: true
// @filename: model/index.ts
export * from "./account";

// @filename: model/account.ts
export interface Account {
    myAccNum: number;
}
interface Account2 {
    myAccNum: number;
}
export { Account2 as Acc };

// @filename: index.ts
declare global {
    interface Account {
        someProp: number;
    }
    interface Acc {
        someProp: number;
    }
}
import * as model from "./model";
export const func = (account: model.Account, acc2: model.Acc) => {};
