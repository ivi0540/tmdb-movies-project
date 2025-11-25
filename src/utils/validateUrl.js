const validateUrl = (url) => {
  if (!url || typeof url !== "string") {
    return false;
  }
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return false;
  }
  // eslint-disable-next-line no-script-url
  if (url.includes("javascript:") || url.includes("data:")) {
    return false;
  }
  if (url.includes(" ")) {
    return false;
  }
  return true;
};

export { validateUrl };
