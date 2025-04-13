export const getUniqueValues = <T>(values: T[]) => {
  return Array.from(new Set(values)).sort();
};
