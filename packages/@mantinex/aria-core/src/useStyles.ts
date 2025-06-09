import clsx from 'clsx';
import { useTheme } from './ThemeContext';

interface StyleOptions {
  className?: string;
  style?: React.CSSProperties;
  classNames?: Record<string, string>;
  styles?: Record<string, React.CSSProperties>;
  tv?: any;
  slot?: string;
  variantProps?: Record<string, any>;
}

export function useStyles(name: string, options: StyleOptions) {
  const theme = useTheme();
  const themeConfig = theme.components[name] || {};
  const slot = options.slot || 'root';
  const tvFn: any = options.tv || themeConfig.tv;
  const tvResult: any = tvFn ? tvFn(options.variantProps || {}) : undefined;
  const slotClass =
    typeof tvResult === 'string' ? tvResult : tvResult ? tvResult[slot] : undefined;
  return {
    className: clsx(slotClass, themeConfig.classNames?.[slot], options.classNames?.[slot], options.className),
    style: { ...themeConfig.styles?.[slot], ...options.styles?.[slot], ...options.style },
  };
}
