interface Props {
  number: number;
  isNew?: boolean;
  isHead?: boolean;
  isTail?: boolean;
  isOldHead?: boolean;
  isOldTail?: boolean;
  showTailNextPointer?: boolean;
  showPrevPointer?: boolean;
}

const activeText = "font-normal text-blue-600";
const obsoleteText = "font-normal text-gray-400";
const DLLNode = ({
  isNew,
  number,
  isHead,
  isTail,
  isOldHead,
  isOldTail,
  showTailNextPointer,
  showPrevPointer,
}: Props) => {
  const nodeClass = () => {
    let classes =
      "node text-xl font-bold h-24 w-24 shadow-md rounded-md bg-white flex flex-col items-center justify-center";
    if (!isNew) classes += " mx-8";
    if (showTailNextPointer) classes += " next-pointer";
    if (showPrevPointer) classes += " prev-pointer";
    return classes;
  };

  return (
    <div className={nodeClass()}>
      {number}
      {isHead ? <span className={activeText}>head</span> : null}
      {isTail ? <span className={activeText}>tail</span> : null}
      {isOldHead ? <span className={obsoleteText}>old head</span> : null}
      {isOldTail ? <span className={obsoleteText}>old tail</span> : null}
    </div>
  );
};

DLLNode.defaultProps = {
  isNew: false,
  isHead: false,
  isTail: false,
  isOldHead: false,
  isOldTail: false,
  showTailNextPointer: false,
  showPrevPointer: false,
};

export default DLLNode;
