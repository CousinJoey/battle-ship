import { foo } from "./main.js";

test("Returns sum", () => {
    expect(foo(2,2)).toBe(4);
});

test("Returns error", () => {
    expect(foo(2,2)).toBe(0);
});

test("Returns correct value again", () => {
    expect(foo(4,4)).toBe(8);
});