import React from "react";
import Viewer from "./components/viewer";
import sampleData from "./sample_data.json";
import { FileMetaList, validateList } from "./types/file-meta";
import { matchW } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";

/**
 * ##NOTE: The top-level App component. This reads in the sample data from a JSON file, validates it, and displays an
 * error component (a simple div) or the Viewer component.
 *
 * I wanted there to be a way to specify the display order of the columnns; this isn't worked out through completion, though,
 * so, if that order changes the data will be incorrectly displayed. This would be one way to make the display more flexible.
 */
const App = (): JSX.Element => {
  return pipe(
    sampleData,
    validateList,
    matchW(
      (e) => <div>Invalid data: {JSON.stringify(e)}</div>,
      (s: FileMetaList) => (
        <Viewer
          columnOrder={[
            { key: "name", order: 1 },
            { key: "device", order: 2 },
            { key: "path", order: 3 },
            { key: "status", order: 4 },
          ]}
          data={s}
        />
      ),
    ),
  );
};

export default App;
