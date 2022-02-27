export const GetURLSearchParamsMethod  = (value) => {
  const { search } = window.location;
  const params = new URLSearchParams(search);
  return params.get(value);
};
