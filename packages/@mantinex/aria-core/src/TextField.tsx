import React from 'react';
import { TextField as AriaTextField, Input, Label } from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { polymorphicFactory, PolymorphicProps } from './polymorphicFactory';
import { useProps } from './useProps';
import { useStyles } from './useStyles';

interface TextFieldProps {
  label?: React.ReactNode;
  size?: 'sm' | 'md';
  classNames?: Record<string, string>;
  styles?: Record<string, React.CSSProperties>;
}

const defaultProps: Partial<TextFieldProps> = { size: 'md' };

const textFieldTv = tv({
  slots: {
    root: 'flex flex-col gap-1',
    label: 'font-medium',
    input: 'border rounded px-2 py-1',
  },
  variants: {
    size: {
      sm: { input: 'text-sm' },
      md: { input: 'text-base' },
    },
  },
  defaultVariants: { size: 'md' },
});

export const TextField = polymorphicFactory<TextFieldProps, HTMLInputElement, 'div'>(
  (props: PolymorphicProps<any, TextFieldProps> & { ref?: React.Ref<HTMLInputElement> }) => {
    const p = useProps('TextField', defaultProps, props);
    const { className, style, classNames, styles, label, size, ...others } = p;
    const root = useStyles('TextField', {
      className,
      style,
      classNames,
      styles,
      tv: textFieldTv,
      variantProps: { size },
      slot: 'root',
    });
    const labelStyles = useStyles('TextField', {
      classNames,
      styles,
      tv: textFieldTv,
      variantProps: { size },
      slot: 'label',
    });
    const inputStyles = useStyles('TextField', {
      classNames,
      styles,
      tv: textFieldTv,
      variantProps: { size },
      slot: 'input',
    });

    return (
      <AriaTextField {...others} className={root.className} style={root.style}>
        {label && <Label className={labelStyles.className} style={labelStyles.style}>{label}</Label>}
        <Input ref={props.ref} className={inputStyles.className} style={inputStyles.style} />
      </AriaTextField>
    );
  }
);

TextField.extend = (input: any) => input;
