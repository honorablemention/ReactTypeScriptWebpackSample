import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import SelectAll from ".."
import React from "react";
import userEvent  from "@testing-library/user-event";

describe("SelectAll Component Test Suite", () => {
    it("should call onChange when user clicks", async () => {
        const mockOnChange = jest.fn();
        const user = userEvent.setup();
        const { getByTestId } = render(<SelectAll isChecked={false} onChange={mockOnChange} />);
        const e = getByTestId("select-all");
        await user.click(e);
        expect(mockOnChange).toHaveBeenCalledTimes(1);
    });

    it("element should be checked if prop set to true", async () => {
        const mockOnChange = jest.fn();
        const { getByTestId} = render(<SelectAll isChecked={true} onChange={mockOnChange} />);
        const e = getByTestId("select-all");
        expect(e).toBeChecked();
    });

    it("element should not be checked if prop set to false", async () => {
        const mockOnChange = jest.fn();
        const { getByTestId} = render(<SelectAll isChecked={false} onChange={mockOnChange} />);
        const e = getByTestId("select-all");
        expect(e).not.toBeChecked();
    });
})