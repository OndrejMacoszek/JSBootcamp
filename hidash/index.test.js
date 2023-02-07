const { forEach, map } = require("./index");
const assert = require("assert");

const test = (desc, fn) => {
  console.log("----", desc);
  try {
    fn();
  } catch (err) {
    console.log(err.message);
  }
};

test("Test of forEach function", () => {
  let sum = 0;
  forEach([1, 2, 3], (value) => {
    sum += value;
  });

  assert.strictEqual(sum, 6, "Expected summing array to equals 6");
});

test("Test of map function", () => {
  const result = map([1, 2, 3], (value) => {
    return value * 2;
  });

  assert.deepStrictEqual(result, [2, 4, 6]);

  //   assert.strictEqual(result[0], 2);
  //   assert.strictEqual(result[1], 4);
  //   assert.strictEqual(result[2], 6);
});
