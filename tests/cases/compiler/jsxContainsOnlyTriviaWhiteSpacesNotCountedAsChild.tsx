// @jsx: preserve
// @strict: true

namespace JSX {
  export interface ElementChildrenAttribute {
    children: {};
  }
  export interface Element<P, T> { props: P; type: T; }
}

interface Props {
  className?: string | undefined;
}

function NoticeList(props: Props) {
  return null;
}

<NoticeList className="my-notice-list">
</NoticeList>;

<NoticeList className="my-notice-list">

</NoticeList>;