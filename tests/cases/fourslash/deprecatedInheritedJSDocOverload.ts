
//// interface PartialObserver<T> {}
//// interface Subscription {}
//// interface Unsubscribable {}
//// 
//// export interface Subscribable<T> {
////   subscribe(observer?: PartialObserver<T>): Unsubscribable;
////   /** @deprecated Base deprecation 1 */
////   subscribe(next: null | undefined, error: null | undefined, complete: () => void): Unsubscribable;
////   /** @deprecated Base deprecation 2 */
////   subscribe(next: null | undefined, error: (error: any) => void, complete?: () => void): Unsubscribable;
////   /** @deprecated Base deprecation 3 */
////   subscribe(next: (value: T) => void, error: null | undefined, complete: () => void): Unsubscribable;
////   subscribe(next?: (value: T) => void, error?: (error: any) => void, complete?: () => void): Unsubscribable;
//// }

//// interface ThingWithDeprecations<T> extends Subscribable<T> {
////    subscribe(observer?: PartialObserver<T>): Subscription;
////    /** @deprecated 'real' deprecation */
////    subscribe(next: null | undefined, error: null | undefined, complete: () => void): Subscription;
////    /** @deprecated 'real' deprecation */
////    subscribe(next: null | undefined, error: (error: any) => void, complete?: () => void): Subscription;
//// }

//// declare const a: ThingWithDeprecations<void>
//// a.subscribe/**/(() => {
////   console.log('something happened');
//// });

verify.baselineQuickInfo();