// CSS Module declarations for Tailwind CSS
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

// Tailwind CSS directives type definitions
declare module 'tailwindcss/base' {
  const content: any;
  export default content;
}

declare module 'tailwindcss/components' {
  const content: any;
  export default content;
}

declare module 'tailwindcss/utilities' {
  const content: any;
  export default content;
}
