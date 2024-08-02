const checkTextDirection = (s: string) => {
  // Regular expression to match RTL characters
  const rtlPattern =
    /[\u0590-\u05FF\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB1D-\uFDFF\uFE70-\uFEFF]/;
  return rtlPattern.test(s);
};

export default checkTextDirection;
