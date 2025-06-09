import { useTheme } from './ThemeContext';

export function useProps<T extends Record<string, any>>(
  name: string,
  defaults: Partial<T>,
  props: T
): T {
  const theme = useTheme();
  const context = theme.components[name]?.defaultProps as Partial<T> | undefined;
  return { ...defaults, ...context, ...props } as T;
}
