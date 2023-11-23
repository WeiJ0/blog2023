export const preloadJS = (url: string, as: string) => {
  const link = document.createElement("link");
  link.rel = "preload";
  link.href = url;
  link.as = as;
  document.head.appendChild(link);
};

export const loadJS = (src: string, async: boolean, defer: boolean) => {
  const script = document.createElement("script");
  script.src = src;
  script.async = async;
  script.defer = defer;
  document.head.appendChild(script);
};
