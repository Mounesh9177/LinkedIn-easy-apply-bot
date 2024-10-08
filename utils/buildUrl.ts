const buildUrl = (base: string, searchParams: { [x: string]: string }): URL => {
  const url = new URL(base);

  for (const key in searchParams) {
    url.searchParams.append(key, searchParams[key]);
  }

  return url;
};

export default buildUrl;
