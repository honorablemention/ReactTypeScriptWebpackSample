import { render } from "@testing-library/react"
import Header from "../header.component"
import React from "react";

describe("Header Component Test Suite", () => {
    it("should render rows", async () => {
        const testColumns = [
            {
                key: "name",
                label: "Name",
                order: 1,
            },
            {
                key: "device",
                label: "Device",
                order: 2
            }
        ];
        const { getByText } = render(<Header columns={testColumns} />);
        expect(getByText(testColumns[0].label)).toBeTruthy();
        expect(getByText(testColumns[1].label)).toBeTruthy();

    })
})