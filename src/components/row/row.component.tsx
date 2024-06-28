/**
 * ##NOTE Row component for the Viewer "table"
 * It uses the same grid layout as the Header; could use some follow-on work there to remove some redundancy.
 * As mentioned, I was attempting to make this agnostic to the order of the data by providing an explicit order field which would be
 * used to set the "cell" values.
 */
import { FunctionComponent } from "react";
import { FileMeta } from "../../types/file-meta";
import React from "react";
import { Selectable } from "../../types/selectable";
import * as styles from "./row.module.css";
import { capitalizeWord } from "../../types/column";

type Props = {
  columnOrder?: { key: string; order: number }[];
  item: Selectable<FileMeta>;
  onClick: (e: Selectable<FileMeta>) => void;
};
const Row: FunctionComponent<Props> = (props) => {
  const {
    columnOrder = [],
    item: { item, isSelected },
    onClick,
  } = props;

  /**
   * ##NOTE: Required since it is nicer to have the entire row _and_ checkbox be clickable; but we don't want two events;
   * This checks for the target type and conditionally calls the callback prop if it was a row click.
   */
  const handleRowClick = (e: any) => {
    const { target = {} } = e;
    const { type = "" } = target;
    type !== "checkbox" && onClick({ item, isSelected });
  };

  /**
   * ##NOTE: Straight-forward handler for when the checkbox is clicked
   */
  const handleInputClick = (_: any) => {
    onClick({ item, isSelected });
  };

  return (
    <div
      data-testid={"row"}
      className={`${styles.rowContainer} ${isSelected ? styles.rowSelected : ""}`}
      onClick={handleRowClick}
    >
      <div className={styles.row}>
        <input
          data-testid={"row-checkbox"}
          className={styles.checkBox}
          checked={isSelected}
          onChange={handleInputClick}
          type={"checkbox"}
        />
      </div>
      <div className={styles.row}>
        <div className={styles.rowElement}>{item.name}</div>
      </div>
      <div className={styles.row}>
        <div className={styles.rowElement}>{item.device}</div>
      </div>
      <div className={styles.row}>
        <div className={styles.rowElement}>{item.path}</div>
      </div>
      <div className={styles.row}>
        <div className={styles.rowElement}>
          <span data-testid={"status-column"}>
            {item.status === "available" ? "🟢" : ""}
            {capitalizeWord(item.status)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Row;
