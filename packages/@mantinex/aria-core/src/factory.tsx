import React from 'react';

export function identity<T>(value: T): T {
  return value;
}

export function factory<Props, Ref>(
  component: (props: Props & { ref?: React.Ref<Ref> }) => React.ReactElement | null
) {
  const Component = (props: Props & { ref?: React.Ref<Ref> }) => component(props);
  (Component as any).extend = identity;
  (Component as any).withProps = (fixed: Partial<Props>) => {
    const Extended = (p: Props & { ref?: React.Ref<Ref> }) => (
      <Component {...fixed} {...(p as any)} />
    );
    (Extended as any).extend = (Component as any).extend;
    return Extended as any;
  };
  return Component as any;
}
