import { useState, useEffect } from "react";
import useAnimationProcess from "../hooks/useAnimationProcess";
import DLLNode from "./DLLNode";

enum AnimationStep {
  NotStarted = -1,
  TraverseToIndexToDelete = 0,
  GetPrevNode = 1,
  GetNextNode = 2,
  UpdateNextOfPrevNodeToNextNode = 3,
  UpdatePrevOfNextNodeToPrevNode = 4,
  SetPrevAndNextOfNodeToDeleteToNull = 5,
}

const animationDurations = [500, 1000, 600, 600, 600, 600, 3000];

const instructionsMap: Record<number, string> = {
  [AnimationStep.TraverseToIndexToDelete]: "Traverse to input index",
  [AnimationStep.GetPrevNode]: "Get previous node from current node",
  [AnimationStep.GetNextNode]: "Get next node from current node",
  [AnimationStep.UpdateNextOfPrevNodeToNextNode]:
    "Update next pointer of previous node to next node",
  [AnimationStep.UpdatePrevOfNextNodeToPrevNode]:
    "Update prev pointer of next node to previous node",
  [AnimationStep.SetPrevAndNextOfNodeToDeleteToNull]:
    "Set both prev/next pointers of current node to null",
};

const instructions = Object.values(instructionsMap);

const list = [4, 5];
const DLLDelete = () => {
  const { animationStep, startAnimationProcess, setAnimationStep } =
    useAnimationProcess(animationDurations);
  const [currNode, setCurrNode] = useState(-1);

  const handleClickNextStep = () => {
    if (animationStep === AnimationStep.SetPrevAndNextOfNodeToDeleteToNull) {
      setAnimationStep(AnimationStep.NotStarted);
      setCurrNode(-1);
    } else {
      setAnimationStep((prevStep) => prevStep + 1);
    }
  };

  useEffect(() => {
    if (animationStep === AnimationStep.TraverseToIndexToDelete) {
      let interval = setInterval(() => {
        setCurrNode((prevNode) => {
          if (prevNode === 3) {
            clearInterval(interval);
            return prevNode;
          }

          return prevNode + 1;
        });
      }, 400);
    }
  }, [animationStep]);

  return (
    <div>
      <div className="flex items-center justify-center">
        <ol className="mr-16 text-left">
          <h1 className="text-blue-800 text-2xl mb-6 font-bold pl-2">
            DELETE - index 2
          </h1>
          {instructions.map((instruction, idx) => (
            <li
              key={instruction}
              className={`text-2xl leading-10 ${
                instruction === (instructionsMap[animationStep] as string)
                  ? "text-slate-800"
                  : "text-slate-400"
              }`}
            >
              {idx + 1}. {instruction}
            </li>
          ))}
        </ol>
        <div className="flex flex-col items-start mt-12 relative">
          <div className="flex items-center justify-center mb-12">
            <DLLNode number={1} isHead={true} />
            <DLLNode
              number={2}
              forceShow={
                currNode === 2 || animationStep >= AnimationStep.GetPrevNode
              }
              adjustNextPointerPosition={
                animationStep >= AnimationStep.UpdateNextOfPrevNodeToNextNode
              }
            />

            <DLLNode
              number={3}
              forceShow={
                currNode === 3 &&
                animationStep < AnimationStep.UpdateNextOfPrevNodeToNextNode
              }
              isUnknown={true}
              style={{
                ...(animationStep >=
                  AnimationStep.UpdateNextOfPrevNodeToNextNode && {
                  transform: `translateY(-120px)`,
                }),
              }}
              hideNextPointer={
                animationStep ===
                AnimationStep.SetPrevAndNextOfNodeToDeleteToNull
              }
              hidePrevPointer={
                animationStep ===
                AnimationStep.SetPrevAndNextOfNodeToDeleteToNull
              }
            />
            <div
              className="flex items-center justify-center ml-8 transition-transform duration-500"
              style={{
                ...(animationStep >=
                  AnimationStep.UpdateNextOfPrevNodeToNextNode && {
                  transform: `translateX(-160px)`,
                }),
              }}
            >
              {list.map((num, idx) => (
                <DLLNode
                  key={num}
                  number={num}
                  isUnknown={
                    idx === 0 && animationStep < AnimationStep.GetNextNode
                  }
                  forceShow={
                    idx === 0 && animationStep >= AnimationStep.GetNextNode
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
                ? "step by step"
                : animationStep ===
                  AnimationStep.SetPrevAndNextOfNodeToDeleteToNull
                ? "reset"
                : "next step"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DLLDelete;
