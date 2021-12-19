import useAnimationProcess from '../hooks/useAnimationProcess';
import DLLNode from './DLLNode';

enum AnimationStep {
  NotStarted = -1,
  SetTailToPrevNode = 0,
  SetNextPointerOfNewTailToNull = 1,
  SetPrevPointerOfOldTailToNull = 2,
}

const animationDurations = [500, 500, 3000];

const instructionsMap: Record<number, string> = {
  [AnimationStep.SetTailToPrevNode]:
    'Set new tail to be the previous node of old tail',
  [AnimationStep.SetNextPointerOfNewTailToNull]:
    'Update next pointer of new tail to null',
  [AnimationStep.SetPrevPointerOfOldTailToNull]:
    'Update prev pointer of old tail to null',
};

const instructions = Object.values(instructionsMap);

const list = [1, 2, 3, 4];
const DLLPop = () => {
  const { animationStep, startAnimationProcess, setAnimationStep } =
    useAnimationProcess(animationDurations);

  const handleClickNextStep = () => {
    if (animationStep === AnimationStep.SetPrevPointerOfOldTailToNull) {
      setAnimationStep(AnimationStep.NotStarted);
    } else {
      setAnimationStep((prevStep) => prevStep + 1);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center">
        <ol className="mr-16 text-left">
          <h1 className="text-blue-800 text-2xl mb-6 font-bold pl-2">POP</h1>
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
                isHead={idx === 0}
                isTail={
                  animationStep >= AnimationStep.SetTailToPrevNode
                    ? idx === list.length - 2
                    : idx === list.length - 1
                }
                hideNextPointer={
                  animationStep >=
                    AnimationStep.SetNextPointerOfNewTailToNull &&
                  idx === list.length - 2
                }
                hidePrevPointer={
                  animationStep >=
                    AnimationStep.SetPrevPointerOfOldTailToNull &&
                  idx === list.length - 1
                }
                forceShow={
                  animationStep >= AnimationStep.SetTailToPrevNode &&
                  idx === list.length - 2
                }
                isUnknown={
                  animationStep >=
                    AnimationStep.SetNextPointerOfNewTailToNull &&
                  idx === list.length - 1
                }
                isOldTail={
                  animationStep >= AnimationStep.SetTailToPrevNode &&
                  idx === list.length - 1
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
                : animationStep === AnimationStep.SetPrevPointerOfOldTailToNull
                ? 'reset'
                : 'next step'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DLLPop;
