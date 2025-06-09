import React from 'react';
import { factory } from './factory';

export type PolymorphicProps<C extends React.ElementType, Props> = Props & { component?: C } & Omit<
    React.ComponentPropsWithoutRef<C>,
    keyof Props
  >;

export function polymorphicFactory<Props, Ref, D extends React.ElementType = 'div'>(
  component: (
    props: PolymorphicProps<D, Props> & { ref?: React.Ref<Ref> }
  ) => React.ReactElement | null
) {
  return factory<PolymorphicProps<D, Props>, Ref>(component);
}
