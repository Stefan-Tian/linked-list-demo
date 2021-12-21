import useAnimationProcess from '../hooks/useAnimationProcess';
import DLLNode from './DLLNode';

enum AnimationStep {
  NotStarted = -1,
  CreateNode = 0,
  Unshift = 1,
  ConnectOldHeadToNew = 2,
  UpdateHead = 3,
  ConnectNewHeadToOld = 4,
}

const animationDurations = [500, 600, 600, 600, 3000];

const instructionsMap: Record<number, string> = {
  [AnimationStep.CreateNode]: 'Create a new node.',
  [AnimationStep.ConnectOldHeadToNew]:
    'Set the prev pointer of head to new node.',
  [AnimationStep.UpdateHead]: 'Update head to be the new node.',
  [AnimationStep.ConnectNewHeadToOld]:
    'Set the next pointer of new node to old head.',
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

const list = new Array(3).fill(0).map((_, idx) => idx + 2);
const DLLUnshift = () => {
  const { animationStep, startAnimationProcess, setAnimationStep } =
    useAnimationProcess(animationDurations);

  const handleClickNextStep = () => {
    if (animationStep === AnimationStep.ConnectNewHeadToOld) {
      setAnimationStep(AnimationStep.NotStarted);
    } else {
      setAnimationStep((prevStep) => prevStep + 1);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center">
        <ol className="mr-16 text-left">
          <h1 className="text-blue-800 text-2xl mb-6 font-bold">UNSHIFT</h1>
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
              ...(animationStep >= AnimationStep.Unshift && {
                transform: `translateY(120px)`,
              }),
            }}
          >
            <DLLNode
              isNew={true}
              number={1}
              isHead={animationStep >= AnimationStep.UpdateHead}
              showNextPointer={
                animationStep >= AnimationStep.ConnectNewHeadToOld
              }
            />
          </div>
          <div
            className="flex items-center justify-center mb-12 ransition-transform duration-500"
            style={{
              ...(animationStep >= AnimationStep.Unshift && {
                transform: `translateX(160px)`,
              }),
            }}
          >
            {list.map((num, idx) => (
              <DLLNode
                key={num}
                number={num}
                isHead={
                  idx === 0 && animationStep < AnimationStep.ConnectOldHeadToNew
                }
                isOldHead={
                  idx === 0 &&
                  animationStep >= AnimationStep.ConnectOldHeadToNew
                }
                isTail={idx === list.length - 1}
                showHeadPrevPointer={
                  idx === 0 &&
                  animationStep >= AnimationStep.ConnectOldHeadToNew
                }
              />
            ))}
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
                : animationStep === AnimationStep.ConnectNewHeadToOld
                ? 'reset'
                : 'next step'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DLLUnshift;
