/**
 * ##NOTE: Download component conditionally renders the download button if there are downloadable items selected.
 * Calls the window.alert when clicked.
 */
import React, { CSSProperties } from "react";
import { FunctionComponent } from "react";
import { FileMetaList } from "../../types/file-meta";
import * as styles from "./download.module.css";
type Props = {
  className?: string;
  downloadableItems: FileMetaList;
  style?: CSSProperties;
};
const Download: FunctionComponent<Props> = (props) => {
  const { className = "", downloadableItems, style = {} } = props;
  const handleOnClick = () =>
    window.alert(
      `${downloadableItems.map((d) => `${d.device} ${d.path}`).join("\n\n")}`,
    );

  return downloadableItems.length > 0 ? (
    <button
      data-testid={"download-button"}
      className={`${styles.button} ${className}`}
      disabled={downloadableItems.length === 0}
      onClick={handleOnClick}
      role={"button"}
      style={style}
    >
      <span data-testid={"download-button-label"}>⬇️ Download Selected {downloadableItems.length}</span>
    </button>
  ) : null;
};

export default Download;
