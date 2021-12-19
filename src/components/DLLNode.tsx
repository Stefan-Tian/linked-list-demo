interface Props {
  number: number;
  isNew?: boolean;
  isHead?: boolean;
  isTail?: boolean;
  isOldHead?: boolean;
  isOldTail?: boolean;
  showTailNextPointer?: boolean;
  showPrevPointer?: boolean;
  showHeadPrevPointer?: boolean;
  showNextPointer?: boolean;
  hideNextPointer?: boolean;
  hidePrevPointer?: boolean;
  isUnknown?: boolean;
  forceShow?: boolean;
}

const activeText = 'font-normal text-blue-600';
const obsoleteText = 'font-normal text-gray-400';
const DLLNode = ({
  isNew,
  number,
  isHead,
  isTail,
  isOldHead,
  isOldTail,
  showTailNextPointer,
  showPrevPointer,
  showHeadPrevPointer,
  showNextPointer,
  hideNextPointer,
  hidePrevPointer,
  isUnknown,
  forceShow,
}: Props) => {
  const nodeClass = () => {
    let classes =
      'node text-xl font-bold h-24 w-24 shadow-md rounded-md bg-white flex flex-col items-center justify-center transition-all';
    if (!isNew) classes += ' mx-8';
    if (showTailNextPointer || showNextPointer) classes += ' next-pointer';
    if (showHeadPrevPointer || showPrevPointer) classes += ' prev-pointer';
    if (hideNextPointer) classes += ' hide-next-pointer';
    if (hidePrevPointer) classes += ' hide-prev-pointer';
    if (isUnknown && !forceShow) classes += ' opaque';
    if (forceShow) classes += ' show';
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
  showHeadPrevPointer: false,
  showNextPointer: false,
  hideNextPointer: false,
  hidePrevPointer: false,
  isUnknown: false,
  forceShow: false,
};

export default DLLNode;
