export const capitalize = (str: string) => {
  let strings = str.split(" ");
  strings = strings.map((word) => {
    let words = word.split("");
    words = words.slice(1, words.length);
    words.unshift(word[0].toUpperCase());

    return words.join("");
  });
  return strings.join(" ");
};
