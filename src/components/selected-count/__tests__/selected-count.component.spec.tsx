import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import SelectedCount from "..";
import React from "react";
import { screen } from "@testing-library/dom";

describe("SelectedCount Component Test Suite", () => {
    it("should display \'none\' message if count is 0", () => {
        const testNoneMessage = "testNoneMessage";
        const { queryByText } = render(<SelectedCount noneMessage={testNoneMessage} numSelected={0} />);
        expect(queryByText(testNoneMessage)).toBeTruthy();
    });

    it("should display selected message if count is at least 1", () => {
        const testNoneMessage = "testNoneMessage";
        const testCount = 2;
        const { queryByText } = render(<SelectedCount noneMessage={testNoneMessage} numSelected={testCount} />);
        expect(queryByText(`Selected ${testCount}`)).toBeTruthy();
    });

});