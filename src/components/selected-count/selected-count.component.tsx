/**
 * ##NOTE: SelectedCount component displays the message showing the user how many items are selected
 * Optionally can pass in class names or style. Could also have made the default/0 case message a prop.
 */
import React, { CSSProperties } from "react";
import { FunctionComponent } from "react";

type Props = {
  className?: string;
  noneMessage?: string;
  numSelected: number;
  style?: CSSProperties;
};
const SelectedCount: FunctionComponent<Props> = (props) => {
  const { className = "", noneMessage = "None selected", numSelected, style = {} } = props;
  return (
    <div className={className} style={style}>
      {numSelected === 0 ? `${noneMessage}`: `Selected ${numSelected}`}
    </div>
  );
};

export default SelectedCount;
