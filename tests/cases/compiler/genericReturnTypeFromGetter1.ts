//@module: amd
export interface A<T> {
   new (dbSet: DbSet<T>): T;
}
export class DbSet<T> {
    _entityType: A;
  get entityType() { return this._entityType; }  // used to ICE without return type annotation
}
