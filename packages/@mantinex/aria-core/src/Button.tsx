import React from 'react';
import { Button as AriaButton } from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { polymorphicFactory, PolymorphicProps } from './polymorphicFactory';
import { useProps } from './useProps';
import { useStyles } from './useStyles';

interface ButtonProps {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary';
  classNames?: Record<string, string>;
  styles?: Record<string, React.CSSProperties>;
}

const defaultProps: Partial<ButtonProps> = { variant: 'primary' };

const buttonTv = tv({
  base: 'px-2 py-1 rounded',
  variants: {
    variant: {
      primary: 'bg-blue-600 text-white',
      secondary: 'bg-gray-200 text-gray-900',
    },
  },
  defaultVariants: { variant: 'primary' },
});

export const Button = polymorphicFactory<ButtonProps, HTMLButtonElement, 'button'>(
  (props: PolymorphicProps<any, ButtonProps> & { ref?: React.Ref<HTMLButtonElement> }) => {
    const p = useProps('Button', defaultProps, props);
    const { component = 'button', variant, className, style, classNames, styles, children, ...others } = p;
    const { className: cx, style: sx } = useStyles('Button', {
      className,
      style,
      classNames,
      styles,
      tv: buttonTv,
      variantProps: { variant },
    });
    return (
      <AriaButton {...others} elementType={component} className={cx} style={sx} ref={props.ref}>
        {children}
      </AriaButton>
    );
  }
);

Button.extend = (input: any) => input;
