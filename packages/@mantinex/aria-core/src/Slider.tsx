import React from 'react';
import { Slider as AriaSlider, SliderThumb, SliderTrack } from 'react-aria-components';
import { tv } from 'tailwind-variants';
import { polymorphicFactory, PolymorphicProps } from './polymorphicFactory';
import { useProps } from './useProps';
import { useStyles } from './useStyles';

interface SliderProps {
  value?: number;
  defaultValue?: number;
  minValue?: number;
  maxValue?: number;
  step?: number;
  classNames?: Record<string, string>;
  styles?: Record<string, React.CSSProperties>;
}

const defaultProps: Partial<SliderProps> = { minValue: 0, maxValue: 100 };

const sliderTv = tv({
  slots: {
    root: 'flex w-full touch-none select-none',
    track: 'h-2 bg-gray-200 rounded',
    thumb: 'h-4 w-4 bg-blue-600 rounded-full -mt-1',
  },
});

export const Slider = polymorphicFactory<SliderProps, HTMLDivElement, 'div'>(
  (props: PolymorphicProps<any, SliderProps> & { ref?: React.Ref<HTMLDivElement> }) => {
    const p = useProps('Slider', defaultProps, props);
    const { className, style, classNames, styles, ...others } = p;
    const root = useStyles('Slider', {
      className,
      style,
      classNames,
      styles,
      tv: sliderTv,
      slot: 'root',
    });
    const trackStyles = useStyles('Slider', {
      classNames,
      styles,
      tv: sliderTv,
      slot: 'track',
    });
    const thumbStyles = useStyles('Slider', {
      classNames,
      styles,
      tv: sliderTv,
      slot: 'thumb',
    });

    return (
      <AriaSlider {...others} ref={props.ref} className={root.className} style={root.style}>
        <SliderTrack className={trackStyles.className} style={trackStyles.style}>
          <SliderThumb className={thumbStyles.className} style={thumbStyles.style} />
        </SliderTrack>
      </AriaSlider>
    );
  }
);

Slider.extend = (input: any) => input;
