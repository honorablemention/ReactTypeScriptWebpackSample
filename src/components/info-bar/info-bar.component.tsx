/**
 * ##NOTE: Houses the SelectAll checkbox, Download button, and Selected Count
 */

import { FunctionComponent, useEffect, useRef } from "react";
import SelectAll from "../select-all";
import * as selectAllStyles from "../select-all/select-all.module.css";
import React from "react";
import { FileMetaList, isDownloadable } from "../../types/file-meta";
import SelectedCount from "../selected-count";
import Download from "../download";
import * as styles from "./info-bar.module.css";

type Props = {
  data: FileMetaList;
  onSelectAll: () => void;
  selected: string[];
};
const InfoBar: FunctionComponent<Props> = (props) => {
  const { data, onSelectAll, selected } = props;

  const checkboxRef = useRef<HTMLInputElement>(null);

  /**
   * ##NOTE: Returns the items that are downloadable - selected AND have status "available"
   */
  const getDownloadable = (d: FileMetaList, selected: string[]): FileMetaList =>
    d.filter(
      (i) => selected.includes(`${i.device}${i.path}`) && isDownloadable(i),
    );

  /**
   * ##NOTE: This is a React-ism and actually took a bit of time to figure out. Apparently, React doesn't handle this in the same
   * way it handles others.
   *
   * Basically, when ever the data or selected length changes, set the indeterminate state.
   */
  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate =
        selected.length > 0 && selected.length < data.length;
    }
  }, [selected.length, data.length]);

  return (
    <div className={styles.infoBar}>
      <SelectAll
        className={selectAllStyles.checkBox}
        ref={checkboxRef}
        isChecked={selected.length === data.length}
        onChange={onSelectAll}
      />
      <SelectedCount
        numSelected={selected.length}
        style={{ width: "fit-content" }}
      />
      <Download downloadableItems={getDownloadable(data, selected)} />
    </div>
  );
};

export default InfoBar;
