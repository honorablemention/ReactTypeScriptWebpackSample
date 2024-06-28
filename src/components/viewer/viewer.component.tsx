/**
 * ##NOTE: This is the main top-levelcomponent.
 */

import { FunctionComponent, useState } from "react";
import { FileMeta, FileMetaList } from "../../types/file-meta";
import React from "react";
import Row from "../row";
import { Selectable } from "../../types/selectable";
import { ascendingOrder, makeColumns } from "../../types/column";
import Header from "../header";
import InfoBar from "../info-bar";
import * as styles from "./viewer.module.css";

type Props = {
  data: FileMetaList;
  columnOrder: { key: string; order: number }[];
};
const Viewer: FunctionComponent<Props> = (props) => {
  const { columnOrder, data } = props;
  /**
   * ##NOTE: using a composite of the device+path values to keep track of what is selected
   */
  const [selected, setSelected] = useState<string[]>([]);

  /**
   * ##NOTE: sets the 'selected' items state accordingly; when the user clicks a row or checkbox.
   * If not selected, add it to the array. (selection)
   * If it is, filter it out (de-selection).
   */
  const handleSelection = ({ item, isSelected }: Selectable<FileMeta>) => {
    if (!isSelected) {
      setSelected((prev) => [...prev, `${item.device}${item.path}`]);
    } else {
      setSelected(selected.filter((v) => v !== `${item.device}${item.path}`));
    }
  };

  /**
   * ##NOTE: sets the 'selected' items state accordinlgly when the user clicks select all.
   * If all items are already selected, de-select all.
   * Else - add all data elements
   */
  const handleSelectAll = () => {
    if (selected.length === data.length) {
      setSelected([]);
    } else {
      setSelected(data.map(({ device, path }) => `${device}${path}`));
    }
  };

  const isSelected = ({ device, path }: FileMeta) =>
    selected.includes(`${device}${path}`);

  return (
    <div className={styles.viewer}>
      <InfoBar data={data} onSelectAll={handleSelectAll} selected={selected} />
      <div>
        <Header columns={makeColumns(columnOrder).sort(ascendingOrder)} />
        {data.map((v) => {
          return (
            <Row
              columnOrder={columnOrder}
              key={v.device + v.path}
              item={{ item: v, isSelected: isSelected(v) }}
              onClick={handleSelection}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Viewer;
