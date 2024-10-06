export const CustomCheckbox = (props: any) => {
  return (
    <input
      readOnly
      type="checkbox"
      checked={props.checked}
      style={{
        width: "18px",
        height: "18px",
        accentColor: props.checked ? "var(--green-9)" : "var(--gray-5)"
      }}
    />
  );
};
