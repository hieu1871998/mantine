# aria-core

Minimal example of polymorphic components and styles API using React Aria Components.
Class names are generated with [tailwind-variants](https://github.com/nextui-org/tailwind-variants).

This package now includes a small set of components built with React Aria:

- `Button`
- `TextField`
- `Checkbox`
- `Switch`
- `Dialog`
- `Slider`

Each component exposes a static `extend` helper to define theme defaults and works with the `ThemeProvider`.
Components use the experimental `ref` prop pattern from React 19 instead of `forwardRef`.
