declare const katex: {
  render(
    expression: string,
    element: HTMLElement,
    options?: {
      displayMode?: boolean;
      output?: "html" | "mathml" | "htmlAndMathml";
      throwOnError?: boolean;
      strict?: "ignore" | "warn" | "error" | boolean;
    }
  ): void;
};

export default katex;
