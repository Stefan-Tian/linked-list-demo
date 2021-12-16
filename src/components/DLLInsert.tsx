import useAnimationProcess from '../hooks/useAnimationProcess';
import DLLNode from './DLLNode';

enum AnimationStep {
  NotStarted = -1,
  CreateNode = 0,
  TraverseToIndexToInsert = 1,
  MoveNodeToPosition = 2,
  SetNextPointerOfPrevNodeToNewNode = 3,
  SetPrevPointerOfNextNodeToNewNode = 4,
  SetPrevPointerOfNewNodeToPrevNode = 5,
  SetNextPointerOfNewNodeToNextNode = 6,
}

const animationDurations = [500, 600, 600, 600, 600, 3000];

const instructionsMap: Record<number, string> = {
  [AnimationStep.CreateNode]: 'Create a new node.',
  [AnimationStep.TraverseToIndexToInsert]: 'Traverse to input index - 1 node',
  [AnimationStep.SetNextPointerOfPrevNodeToNewNode]:
    'Update next pointer of the previous node to new node',
  [AnimationStep.SetPrevPointerOfNextNodeToNewNode]:
    'Update prev pointer of the next node to new node',
  [AnimationStep.SetPrevPointerOfNewNodeToPrevNode]:
    'Update prev pointer of new node to previous node',
  [AnimationStep.SetNextPointerOfNewNodeToNextNode]:
    'Update next pointer of new node to next node',
};

const instructions = Object.values(instructionsMap);

const computePlaceholderNodeClass = (step: number) => {
  if (step === AnimationStep.NotStarted) {
    return '';
  }

  return 'invisible';
};

const computeCreatedNodeClass = (step: number) => {
  let classes = '';
  if (step === AnimationStep.CreateNode) return classes;

  if (step === AnimationStep.NotStarted) {
    classes += ' hidden';
  } else {
    classes += 'new-node transition-transform duration-500';
  }

  return classes;
};

const list = [3, 4];
const DLLInsert = () => {
  const { animationStep, startAnimationProcess, setAnimationStep } =
    useAnimationProcess(animationDurations);

  const handleClickNextStep = () => {
    if (animationStep === AnimationStep.SetNextPointerOfNewNodeToNextNode) {
      setAnimationStep(AnimationStep.NotStarted);
    } else {
      setAnimationStep((prevStep) => prevStep + 1);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center">
        <ol className="mr-16 text-left">
          <h1 className="text-blue-800 text-2xl mb-6 font-bold pl-2">
            INSERT - index 1, value 2
          </h1>
          {instructions.map((instruction, idx) => (
            <li
              key={instruction}
              className={`text-2xl leading-10 ${
                instruction === (instructionsMap[animationStep] as string)
                  ? 'text-slate-800'
                  : 'text-slate-400'
              }`}
            >
              {idx + 1}. {instruction}
            </li>
          ))}
        </ol>
        <div className="flex flex-col items-start mt-12 relative">
          <div
            className={`h-24 w-24 text-slate-400 flex items-center justify-center border-2 mb-6 ${computePlaceholderNodeClass(
              animationStep
            )}`}
          >
            ?
          </div>
          <div
            className={`new-node h-24 w-24 mb-6 ${computeCreatedNodeClass(
              animationStep
            )}`}
            style={{
              ...(animationStep >= AnimationStep.MoveNodeToPosition && {
                transform: `translate(160px, 118px)`,
              }),
            }}
          >
            <DLLNode
              isNew={true}
              number={2}
              showPrevPointer={
                animationStep >= AnimationStep.SetPrevPointerOfNewNodeToPrevNode
              }
              showNextPointer={
                animationStep >= AnimationStep.SetNextPointerOfNewNodeToNextNode
              }
            />
          </div>
          <div className="flex items-center justify-center mb-12">
            <DLLNode
              number={1}
              isHead={true}
              hideNextPointer={
                animationStep === AnimationStep.MoveNodeToPosition
              }
            />
            <div
              className="flex items-center justify-center ml-8 transition-transform duration-500"
              style={{
                ...(animationStep >= AnimationStep.MoveNodeToPosition && {
                  transform: `translateX(160px)`,
                }),
              }}
            >
              {list.map((num, idx) => (
                <DLLNode
                  key={num}
                  number={num}
                  isHead={false}
                  hidePrevPointer={
                    idx === 0 &&
                    (animationStep === AnimationStep.MoveNodeToPosition ||
                      animationStep ===
                        AnimationStep.SetNextPointerOfPrevNodeToNewNode)
                  }
                  showPrevPointer={idx === 0}
                  isTail={idx === list.length - 1}
                />
              ))}
            </div>
          </div>
          <div className="flex w-full justify-between">
            <button
              className="bg-blue-800 w-48 py-4 rounded-md text-white hover:bg-blue-600"
              onClick={startAnimationProcess}
            >
              start animation
            </button>
            <button
              className="border-blue-800 w-48 border-2 text-blue-800 px-12 py-4 rounded-md hover:border-blue-600 hover:text-blue-600"
              onClick={handleClickNextStep}
            >
              {animationStep === AnimationStep.NotStarted
                ? 'step by step'
                : animationStep ===
                  AnimationStep.SetNextPointerOfNewNodeToNextNode
                ? 'reset'
                : 'next step'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DLLInsert;
