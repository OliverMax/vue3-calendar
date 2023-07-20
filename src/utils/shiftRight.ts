export default function shiftRight<T>(arr: T, times: number = 1): T {
  const res = [];

  let newIndex;
  arr.forEach((value, index) => {
    newIndex = index + times;

    if (newIndex > (arr.length - 1)) {
      res[(newIndex - arr.length)] = value;
    } else {
      res[newIndex] = value;
    }
  });

  return res;
}
