import React from 'react';
import { Checkbox as AriaCheckbox } from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { polymorphicFactory, PolymorphicProps } from './polymorphicFactory';
import { useProps } from './useProps';
import { useStyles } from './useStyles';

interface CheckboxProps {
  children?: React.ReactNode;
  classNames?: Record<string, string>;
  styles?: Record<string, React.CSSProperties>;
  isSelected?: boolean;
  defaultSelected?: boolean;
}

const defaultProps: Partial<CheckboxProps> = {};

const checkboxTv = tv({ base: 'flex items-center gap-1' });

export const Checkbox = polymorphicFactory<CheckboxProps, HTMLInputElement, 'label'>(
  (props: PolymorphicProps<any, CheckboxProps> & { ref?: React.Ref<HTMLInputElement> }) => {
    const p = useProps('Checkbox', defaultProps, props);
    const { className, style, classNames, styles, children, ...others } = p;
    const { className: cx, style: sx } = useStyles('Checkbox', {
      className,
      style,
      classNames,
      styles,
      tv: checkboxTv,
    });
    return (
      <AriaCheckbox {...others} ref={props.ref} className={cx} style={sx}>
        {children}
      </AriaCheckbox>
    );
  }
);

Checkbox.extend = (input: any) => input;
