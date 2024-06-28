import { FileMeta, isDownloadable } from "../file-meta"

describe("File Meta Type and Interface Test Suite", () => {

    it("should return true if status is available", () => {
        const testMeta: FileMeta = {
            device: "somedevice",
            name: "some name",
            path: "some path",
            status: "available",
        }

        expect(isDownloadable(testMeta)).toBeTruthy();
    });

    it("should return false if status is not available", () => {
        const testMeta: FileMeta = {
            device: "somedevice",
            name: "some name",
            path: "some path",
            status: "available",
        }

        expect(isDownloadable(testMeta)).toBeTruthy();
    });
})