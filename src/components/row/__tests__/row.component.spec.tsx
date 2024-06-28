import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import React from "react";
import { Selectable } from "../../../types/selectable";
import { FileMeta } from "../../../types/file-meta";
import Row from "../row.component";
import userEvent  from "@testing-library/user-event";

describe("Row Component Test Suite", () => {
    it("should call onClick with correct arguments when row is initially unselected when row is clicked", async () => {
        const user = userEvent.setup();
        const mockOnClick = jest.fn();
        const testItem: Selectable<FileMeta> = { 
            item: {
                name: "testName",
                device: "testDevice",
                path: "testPath",
                status: "available",
            }, 
            isSelected: false
        };

        const { queryByTestId } = render(<Row item={testItem} onClick={mockOnClick} />);
        const row = queryByTestId("row");
        await user.click(row as HTMLElement);
        expect(mockOnClick).toHaveBeenCalledTimes(1);
        expect(mockOnClick).toHaveBeenCalledWith({ item: testItem.item, isSelected: false });
    });

    it("should call onClick with correct arguments when row is initially unselected when checkbox is clicked", async () => {
        const user = userEvent.setup();
        const mockOnClick = jest.fn();
        const testItem: Selectable<FileMeta> = { 
            item: {
                name: "testName",
                device: "testDevice",
                path: "testPath",
                status: "available",
            }, 
            isSelected: false
        };

        const { queryByTestId } = render(<Row item={testItem} onClick={mockOnClick} />);
        const checkBox = queryByTestId("row-checkbox");
        await user.click(checkBox as HTMLElement);
        expect(mockOnClick).toHaveBeenCalledTimes(1);
        expect(mockOnClick).toHaveBeenCalledWith({ item: testItem.item, isSelected: false });
    });

    it("should call onClick with correct arguments when row is initially selected when clicked", async () => {
        const user = userEvent.setup();
        const mockOnClick = jest.fn();
        const testItem: Selectable<FileMeta> = { 
            item: {
                name: "testName",
                device: "testDevice",
                path: "testPath",
                status: "available",
            }, 
            isSelected: true
        };

        const { queryByTestId } = render(<Row item={testItem} onClick={mockOnClick} />);
        const row = queryByTestId("row");
        await user.click(row as HTMLElement);
        expect(mockOnClick).toHaveBeenCalledTimes(1);
        expect(mockOnClick).toHaveBeenCalledWith({ item: testItem.item, isSelected: true });
    });

    it("should call onClick with correct arguments when row is initially selected when checkbox is clicked", async () => {
        const user = userEvent.setup();
        const mockOnClick = jest.fn();
        const testItem: Selectable<FileMeta> = { 
            item: {
                name: "testName",
                device: "testDevice",
                path: "testPath",
                status: "available",
            }, 
            isSelected: true
        };

        const { queryByTestId } = render(<Row item={testItem} onClick={mockOnClick} />);
        const checkBox = queryByTestId("row-checkbox");
        await user.click(checkBox as HTMLElement);
        expect(mockOnClick).toHaveBeenCalledTimes(1);
        expect(mockOnClick).toHaveBeenCalledWith({ item: testItem.item, isSelected: true });
    });

    it("should show input checkbox as unchecked when item is not selected", async () => {
        const mockOnClick = jest.fn();
        const testItem: Selectable<FileMeta> = { 
            item: {
                name: "testName",
                device: "testDevice",
                path: "testPath",
                status: "available",
            }, 
            isSelected: false
        };

        const { queryByTestId } = render(<Row item={testItem} onClick={mockOnClick} />);
        const input = queryByTestId("row-checkbox");
        expect(input).not.toBeChecked();
    });

    it("should show input checkbox as checked when item is selected", async () => {
        const mockOnClick = jest.fn();
        const testItem: Selectable<FileMeta> = { 
            item: {
                name: "testName",
                device: "testDevice",
                path: "testPath",
                status: "available",
            }, 
            isSelected: true
        };

        const { queryByTestId } = render(<Row item={testItem} onClick={mockOnClick} />);
        const input = queryByTestId("row-checkbox");
        expect(input).toBeChecked();
    });

    it("should render a green dot emoji 🟢 if status is \'available\'", async () => {
        const mockOnClick = jest.fn();
        const testItem: Selectable<FileMeta> = { 
            item: {
                name: "testName",
                device: "testDevice",
                path: "testPath",
                status: "available",
            }, 
            isSelected: true
        };

        const { queryByTestId } = render(<Row item={testItem} onClick={mockOnClick} />);
        const input = queryByTestId("status-column");
        const contents = input?.innerHTML;
        const contentsIsString = typeof input?.innerHTML === "string";
        const hasGreen = contentsIsString && Array.from(contents as unknown as string).includes("🟢");
        expect(hasGreen).toBeTruthy();
    });

    it("should render status as capitalized", async () => {
        const mockOnClick = jest.fn();
        const testItem: Selectable<FileMeta> = { 
            item: {
                name: "testName",
                device: "testDevice",
                path: "testPath",
                status: "scheduled"
            }, 
            isSelected: true
        };

        const { queryByTestId } = render(<Row item={testItem} onClick={mockOnClick} />);
        const input = queryByTestId("status-column");
        const contents = input?.innerHTML;
        expect(contents).toBe("Scheduled");
    });
})