export const createBem = (styles: Record<string, string>, block: string) => {
  return (element?: string, modifier?: string) => {
    let className = block;
    if (element) className += `__${element}`;
    if (modifier) className += `--${modifier}`;
    return styles[className];
  };
};
