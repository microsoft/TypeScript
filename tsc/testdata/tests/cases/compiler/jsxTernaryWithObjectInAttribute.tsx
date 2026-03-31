// @jsx: preserve
// @noEmit: true
// @strict: true

declare function memo<T>(f: T): T;
declare const HoverCardText: (p: { label: any; text: any; className?: string }) => null;
declare const DEFAULT_NULL_VALUE: string;
declare function t(key: string, params?: Record<string, any>): string;
declare function nf(v: any, opts: { precision: number; rounding: string }): string;

export const Example = memo(function Example() {
  const isLogin = true;

  return (
    <div>
      <div>{t('label')}</div>
      {!isLogin ? (
        DEFAULT_NULL_VALUE
      ) : (
        <HoverCardText
          className="test"
          label={
            <div>
              {t('some.key', {
                s1: nf(1, { precision: 2, rounding: 'down' }),
                s2: nf(2, { precision: 2, rounding: 'down' }),
              })}
            </div>
          }
          text={
            <div>
              {nf(0, { precision: 2, rounding: 'down' })} USDT
            </div>
          }
        ></HoverCardText>
      )}
    </div>
  );
});
