// @noEmit: true
// @allowJs: true
// @checkJs: true
// @Filename: lovefield-ts.d.ts
// bug #27352, crashes from github.com/google/lovefield
declare namespace lf {
  export interface Transaction {
    attach(query: query.Builder): Promise<Array<Object>>
    begin(scope: Array<schema.Table>): Promise<void>
    commit(): Promise<void>
    exec(queries: Array<query.Builder>): Promise<Array<Array<Object>>>
    rollback(): Promise<void>
    stats(): TransactionStats
  }
}
// @Filename: lovefield.js
lf.Transaction = function() {};
/**
 * @param {!Array<!lf.schema.Table>} scope
 * @return {!IThenable}
 */
lf.Transaction.prototype.begin = function(scope) {};
