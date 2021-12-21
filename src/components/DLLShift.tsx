import useAnimationProcess from '../hooks/useAnimationProcess';
import DLLNode from './DLLNode';

enum AnimationStep {
  NotStarted = -1,
  SetHeadToNextNode = 0,
  SetPrevPointerOfNewHeadToNull = 1,
  SetNextPointerOfOldHeadToNull = 2,
}

const animationDurations = [500, 500, 3000];

const instructionsMap: Record<number, string> = {
  [AnimationStep.SetHeadToNextNode]:
    'Set new head to be the next node of old head',
  [AnimationStep.SetPrevPointerOfNewHeadToNull]:
    'Update prev pointer of new head to null',
  [AnimationStep.SetNextPointerOfOldHeadToNull]:
    'Update next pointer of old head to null',
};

const instructions = Object.values(instructionsMap);

const list = [1, 2, 3, 4];
const DLLShift = () => {
  const { animationStep, startAnimationProcess, setAnimationStep } =
    useAnimationProcess(animationDurations);

  const handleClickNextStep = () => {
    if (animationStep === AnimationStep.SetNextPointerOfOldHeadToNull) {
      setAnimationStep(AnimationStep.NotStarted);
    } else {
      setAnimationStep((prevStep) => prevStep + 1);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center">
        <ol className="mr-16 text-left">
          <h1 className="text-blue-800 text-2xl mb-6 font-bold">SHIFT</h1>
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
          <div className="flex items-center justify-center mb-12">
            {list.map((num, idx) => (
              <DLLNode
                key={num}
                number={num}
                isHead={
                  animationStep >= AnimationStep.SetHeadToNextNode
                    ? idx === 1
                    : idx === 0
                }
                isTail={idx === list.length - 1}
                isOldHead={
                  animationStep >= AnimationStep.SetHeadToNextNode && idx === 0
                }
                hideNextPointer={
                  animationStep >=
                    AnimationStep.SetNextPointerOfOldHeadToNull && idx === 0
                }
                hidePrevPointer={
                  animationStep >=
                    AnimationStep.SetPrevPointerOfNewHeadToNull && idx === 1
                }
                forceShow={
                  animationStep >= AnimationStep.SetHeadToNextNode && idx === 1
                }
                isUnknown={
                  animationStep >=
                    AnimationStep.SetPrevPointerOfNewHeadToNull && idx === 0
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
                : animationStep === AnimationStep.SetNextPointerOfOldHeadToNull
                ? 'reset'
                : 'next step'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DLLShift;
