import "@testing-library/jest-dom";
import React from "react";
import Download from "../download.component";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import userEvent  from "@testing-library/user-event";
import { FileMetaList } from "../../../types/file-meta";

describe("Download Component Test Suite", () => {
    beforeEach(() => {
        jest.spyOn(window, "alert").mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });
    it("should not render if it has no items", () => {
        const { container } = render(<Download downloadableItems={[]} />);
        expect(container).toBeEmptyDOMElement();

    });

    it("should render if it has at least one item", () => {
        const { queryByTestId } = render(<Download downloadableItems={[{ name: "testname", device: "testDevice", path: "testPath", status: "available"}]} />);
        expect(queryByTestId("download-button")).toBeTruthy();
    });

    it("should correctly render the count of downloadable items", async () => {
        const testItems: FileMetaList = [
            { name: "testname1", device: "testDevice1", path: "testPath1", status: "available"},
            { name: "testname2", device: "testDevice2", path: "testPath2", status: "available" }
        ];
        const { queryByTestId } = render(
            <Download downloadableItems={testItems} />
        );
        const label = queryByTestId("download-button-label")?.innerHTML.toString() || "";
        expect(Array.from(label)).toContain(`${testItems.length}`);
    });

    it("should call display browser alert with expected message when clicked", async () => {
        // ###NOTE: Should move out the logic that is creating the message to its own function; or pass in as a prop
        const testDevice1 = "testDevice1";
        const testDevice2 = "testDevice2";

        const testPath1 = "testPath1";
        const testPath2 = "testPath2";

        const testItems: FileMetaList = [
            { name: "testname1", device: testDevice1, path: testPath1, status: "available"},
            { name: "testname2", device: testDevice2, path: testPath2, status: "available" }
        ];
        const user = userEvent.setup();
        render(<Download  downloadableItems={testItems} />);
        const button = screen.getByTestId("download-button");
        await user.click(button);
        expect(window.alert).toHaveBeenCalledWith(`${testDevice1} ${testPath1}\n\n${testDevice2} ${testPath2}`);
      });

      it("should apply the passed className and style to the button", () => {
        /**
         * ###NOTE: Need to work out why CSS modules aren't being mapped correctly by webpack for jest
         */
        const testDevice1 = "testDevice1";
        const testDevice2 = "testDevice2";
        const testPath1 = "testPath1";
        const testPath2 = "testPath2";
        const testItems: FileMetaList = [
            { name: "testname1", device: testDevice1, path: testPath1, status: "available"},
            { name: "testname2", device: testDevice2, path: testPath2, status: "available" }
        ];
        const testClassName = "testClass";
        const testStyle = { backgroundColor: "red" };
  
        const { getByTestId } = render(<Download className={testClassName} downloadableItems={testItems} style={testStyle}/>);
        const button = getByTestId("download-button");
        expect(button).toHaveClass(testClassName);
        expect(button).toHaveStyle("background-color: red");
      });

})