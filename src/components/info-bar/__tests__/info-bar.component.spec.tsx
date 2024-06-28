import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import React from "react";
import { FileMetaList } from "../../../types/file-meta";
import InfoBar from "..";

describe("InfoBar Component Test Suite", () => {
    it("should show SelectAll in determinate state when number of selected is less than the total number of items", () => {
        const testItems: FileMetaList = [
            { name: "testname1", device: "testDevice1", path: "testPath1", status: "available"},
            { name: "testname2", device: "testDevice2", path: "testPath2", status: "available" }
        ];
        const mockOnSelectAll = jest.fn();
        const testSelected = [`${testItems[0].device}${testItems[0].path}`];
        const { queryByTestId } = render(<InfoBar data={testItems} onSelectAll={mockOnSelectAll} selected={testSelected} />);
        const e = queryByTestId("select-all")as HTMLInputElement;
        expect(e).not.toBeChecked();
        expect(e.indeterminate).toBeTruthy();
    });

    it("should show SelectAll in checked state when number of selected is equal to the total number of items", () => {
        const testItems: FileMetaList = [
            { name: "testname1", device: "testDevice1", path: "testPath1", status: "available"},
            { name: "testname2", device: "testDevice2", path: "testPath2", status: "available" }
        ];
        const mockOnSelectAll = jest.fn();
        const testSelected = [`${testItems[0].device}${testItems[0].path}`, `${testItems[1].device}${testItems[1].path}`];
        const { queryByTestId } = render(<InfoBar data={testItems} onSelectAll={mockOnSelectAll} selected={testSelected} />);
        const e = queryByTestId("select-all")as HTMLInputElement;
        expect(e).toBeChecked();
        expect(e.indeterminate).toBeFalsy();
    });

    it("should show SelectAll in unchecked state when number of selected is none", () => {
        const testItems: FileMetaList = [
            { name: "testname1", device: "testDevice1", path: "testPath1", status: "available"},
            { name: "testname2", device: "testDevice2", path: "testPath2", status: "available" }
        ];
        const mockOnSelectAll = jest.fn();
        const testSelected: string[] = [];
        const { queryByTestId } = render(<InfoBar data={testItems} onSelectAll={mockOnSelectAll} selected={testSelected} />);
        const e = queryByTestId("select-all")as HTMLInputElement;
        expect(e).not.toBeChecked();
        expect(e.indeterminate).toBeFalsy();
    });
})