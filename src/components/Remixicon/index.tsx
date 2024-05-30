function RemixiconComponent(props: { name: string | null }) {
  if (!props.name) return null;
  return <i className={props.name} />;
}

export default RemixiconComponent;
