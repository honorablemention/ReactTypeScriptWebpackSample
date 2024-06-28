/**
 * ##NOTE: The SelectAll component is a forwardRef (another React-ism) so that the parent has access to the element;
 * so that it can properly handle the indeterminate state.
 */
import React, { CSSProperties, forwardRef } from "react";

type Props = {
  className?: string;
  isChecked: boolean;
  onChange: (e: any) => void;
  style?: CSSProperties;
};

const SelectAll = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { className = "", isChecked, onChange, style = {} } = props;

  return (
    <input
      data-testid={"select-all"}
      checked={isChecked}
      className={className}
      ref={ref}
      type={"checkbox"}
      onChange={onChange}
      style={style}
    />
  );
});

export default SelectAll;
