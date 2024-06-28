import { ascendingOrder, capitalizeWord, makeColumns } from "../column";

describe("Column Test Suite", () => {
    it("should capitalize a word", () => {
        const testWord = "elephant";
        expect(capitalizeWord(testWord)).toBe("Elephant");
    });

    it("should make a column from given array of objects", () => {
        const testColumn = {
            key: "testKey",
            order: 1,
        }
        expect(makeColumns([testColumn])).toStrictEqual([{
            key: testColumn.key,
            label: "TestKey",
            order: 1,
        }]);
    });

    it("should order columns in ascending order", () => {
        const testColumns = [
            {
                key: "testKey",
                order: 3,
            },
            {
                key: "testKey2",
                order: 1,
            },
        ];
        expect(makeColumns(testColumns).sort(ascendingOrder)).toStrictEqual(
            [
                {
                    key: "testKey2",
                    label: "TestKey2",
                    order: 1,
                },
                {
                    key: "testKey",
                    label: "TestKey",
                    order: 3,
                },
            ]
        );
    });
})