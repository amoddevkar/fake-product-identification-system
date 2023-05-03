import { useCallback, useMemo } from "react";

export default function ButtonGroup(props) {
  const { onSelectionChange, items, selectedRole } = props;
  const onClickHandler = useCallback(
    (e) => {
      onSelectionChange({ text: e.target.getAttribute("data-text") });
    },
    [onSelectionChange]
  );
  const buttonItems = useMemo(() => {
    return items.map((btnItem) => {
      var selectionClass = selectedRole === btnItem.text ? " selected" : "";
      return (
        <div
          className={"bg-btn" + selectionClass}
          data-text={btnItem.text}
          onClick={onClickHandler}
        >
          {btnItem.text}
        </div>
      );
    });
  }, [items, onSelectionChange, selectedRole]);

  return <div className="button-group">{buttonItems}</div>;
}
