import React from 'react';
import { Switch as AriaSwitch } from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { polymorphicFactory, PolymorphicProps } from './polymorphicFactory';
import { useProps } from './useProps';
import { useStyles } from './useStyles';

interface SwitchProps {
  children?: React.ReactNode;
  classNames?: Record<string, string>;
  styles?: Record<string, React.CSSProperties>;
  isSelected?: boolean;
  defaultSelected?: boolean;
}

const defaultProps: Partial<SwitchProps> = {};

const switchTv = tv({ base: 'flex items-center gap-1' });

export const Switch = polymorphicFactory<SwitchProps, HTMLInputElement, 'label'>(
  (props: PolymorphicProps<any, SwitchProps> & { ref?: React.Ref<HTMLInputElement> }) => {
    const p = useProps('Switch', defaultProps, props);
    const { className, style, classNames, styles, children, ...others } = p;
    const { className: cx, style: sx } = useStyles('Switch', {
      className,
      style,
      classNames,
      styles,
      tv: switchTv,
    });
    return (
      <AriaSwitch {...others} ref={props.ref} className={cx} style={sx}>
        {children}
      </AriaSwitch>
    );
  }
);

Switch.extend = (input: any) => input;
