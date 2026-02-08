const tableItems = [
  "A1",
  "A2",
  "A3",
  "A4",
  "B1",
  "B2",
  "B3",
  "B4",
  "C1",
  "C2",
  "C3",
  "RED1",
  "RED2",
  "GREEN1",
  "GREEN2",
];

const items = tableItems.map((item) => {
  console.log(item.indexOf(item));
  return item;
});
// console.log(items);
console.log(tableItems.indexOf("B1"));
