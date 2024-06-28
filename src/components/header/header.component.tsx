/**
 * ##NOTE: Header for the Viewer "table"
 * Includes an optional prop to conditionally add the extra "spacer" element that represents the column of the checkbox.
 * If the "table" isn't selectable then that would not render; I was not able to finish conditionally setting the CSS class but that would
 * be the idea.
 */
import React from "react";
import { FunctionComponent } from "react";
import { Column } from "../../types/column";
import * as styles from "./header.module.css";
type Props = {
  columns: Column[];
  selectable?: boolean;
};
const Header: FunctionComponent<Props> = (props) => {
  const { columns, selectable = true } = props;

  return (
    <div className={styles.header}>
      <div className={styles.headerRow}>
        {selectable && <div data-testid={"selectable"} className={styles.headerCell} />}
        {columns.map((c) => (
          <div data-testid={`selectable-${c.key}`} key={c.key} className={styles.headerCell}>
            {c.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Header;
