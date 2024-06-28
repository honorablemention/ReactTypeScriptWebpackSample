export type Column = {
  key: string;
  label: string;
  order: number;
};

export const capitalizeWord = (s: string) =>
  s.substring(0, 1).toUpperCase() + s.substring(1);

export const makeColumns = (keys: { key: string; order: number }[]): Column[] =>
  keys.map(({ key, order }) => ({
    label: capitalizeWord(key),
    key,
    order,
  }));

export const ascendingOrder = (a: Column, b: Column) =>
  a.order > b.order ? 1 : -1;
