import React from 'react';
import { Dialog as AriaDialog } from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { polymorphicFactory, PolymorphicProps } from './polymorphicFactory';
import { useProps } from './useProps';
import { useStyles } from './useStyles';

interface DialogProps {
  children?: React.ReactNode;
  classNames?: Record<string, string>;
  styles?: Record<string, React.CSSProperties>;
}

const defaultProps: Partial<DialogProps> = {};

const dialogTv = tv({ base: 'p-4 rounded bg-white shadow' });

export const Dialog = polymorphicFactory<DialogProps, HTMLDivElement, 'div'>(
  (props: PolymorphicProps<any, DialogProps> & { ref?: React.Ref<HTMLDivElement> }) => {
    const p = useProps('Dialog', defaultProps, props);
    const { className, style, classNames, styles, children, ...others } = p;
    const { className: cx, style: sx } = useStyles('Dialog', {
      className,
      style,
      classNames,
      styles,
      tv: dialogTv,
    });
    return (
      <AriaDialog {...others} ref={props.ref} className={cx} style={sx}>
        {children}
      </AriaDialog>
    );
  }
);

Dialog.extend = (input: any) => input;
