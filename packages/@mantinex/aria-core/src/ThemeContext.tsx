import React from 'react';

export interface ComponentConfig {
  defaultProps?: Record<string, any>;
  classNames?: Record<string, string>;
  styles?: Record<string, React.CSSProperties>;
  tv?: any;
}

export interface AriaTheme {
  components: Record<string, ComponentConfig>;
}

const defaultTheme: AriaTheme = { components: {} };

export const ThemeContext = React.createContext<AriaTheme>(defaultTheme);

export interface ThemeProviderProps {
  theme?: Partial<AriaTheme>;
  children: React.ReactNode;
}

export function ThemeProvider({ theme, children }: ThemeProviderProps) {
  const parent = React.useContext(ThemeContext);
  const value: AriaTheme = {
    components: { ...parent.components, ...theme?.components },
  };
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return React.useContext(ThemeContext);
}
