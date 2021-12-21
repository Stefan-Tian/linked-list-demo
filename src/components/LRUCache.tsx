import { useState } from 'react';
import useAnimationProcess from '../hooks/useAnimationProcess';
import DLLNode from './DLLNode';

enum AnimationStep {
  NotStarted = -1,
  RemoveNodeFromList = 0,
  AddNodeToTail = 1,
  AddNewNodeToTail = 2,
  ShiftTheList = 3,
  RemoveTheOldHeadInKeyNodeMap = 4,
  AddNewNodeToKeyNodeMap = 5,
}

const animationDurations = [500, 1000, 600, 600, 600, 600, 3000];

const instructionsMap: Record<number, string> = {
  [AnimationStep.RemoveNodeFromList]: 'Remove node from the list.',
  [AnimationStep.AddNodeToTail]: 'Add node to the tail of the list.',
  [AnimationStep.AddNewNodeToTail]: 'Add new node to the tail of the list.',
  [AnimationStep.ShiftTheList]:
    'Shift the list since the max capacity is reached.',
  [AnimationStep.RemoveTheOldHeadInKeyNodeMap]:
    'Remove the old head in key node map.',
  [AnimationStep.AddNewNodeToKeyNodeMap]: 'Add new node to key node map.',
};

const instructions = Object.values(instructionsMap);

interface Node {
  key: number;
  val: number;
}

const nList: Node[] = [
  { key: 1, val: 1 },
  { key: 2, val: 2 },
  { key: 3, val: 3 },
  { key: 4, val: 4 },
  { key: 5, val: 5 },
];

const dll = nList.map(({ val }) => val);

const LRUCache = () => {
  const { animationStep, setAnimationStep } =
    useAnimationProcess(animationDurations);
  const [nodeList, setNodeList] = useState(nList);
  const [dlList, setDlList] = useState(dll);

  const handleClickNextStep = () => {
    if (animationStep === AnimationStep.AddNewNodeToKeyNodeMap) {
      setAnimationStep(AnimationStep.NotStarted);
      setNodeList(nList);
    } else {
      setAnimationStep((prevStep) => {
        const newStep = prevStep + 1;

        if (newStep === AnimationStep.RemoveNodeFromList) {
          const updatedDLList = [1, 2, 3, 5];
          setDlList(updatedDLList);
        }

        if (newStep === AnimationStep.AddNodeToTail) {
          const updatedDLList = [1, 2, 3, 5, 4];
          setDlList(updatedDLList);
        }

        if (newStep === AnimationStep.AddNewNodeToTail) {
          const updatedDLList = [1, 2, 3, 5, 4, 6];
          setDlList(updatedDLList);
        }

        if (newStep === AnimationStep.ShiftTheList) {
          const updatedDLList = [2, 3, 5, 4, 6];
          setDlList(updatedDLList);
        }

        if (newStep === AnimationStep.RemoveTheOldHeadInKeyNodeMap) {
          const updatedNodeList = [
            { key: 2, val: 2 },
            { key: 3, val: 3 },
            { key: 4, val: 4 },
            { key: 5, val: 5 },
          ];
          setNodeList(updatedNodeList);
        }

        if (newStep === AnimationStep.RemoveTheOldHeadInKeyNodeMap) {
          const updatedNodeList = [
            { key: 2, val: 2 },
            { key: 3, val: 3 },
            { key: 4, val: 4 },
            { key: 5, val: 5 },
          ];
          setNodeList(updatedNodeList);
        }

        if (newStep === AnimationStep.AddNewNodeToKeyNodeMap) {
          const updatedNodeList = [
            { key: 2, val: 2 },
            { key: 3, val: 3 },
            { key: 4, val: 4 },
            { key: 5, val: 5 },
            { key: 6, val: 6 },
          ];
          setNodeList(updatedNodeList);
        }

        return newStep;
      });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center">
        <div>
          <ol className="mr-16 text-left mb-6">
            <h1 className="text-blue-800 text-2xl mb-1 font-bold">
              Get - node with key = 4
            </h1>
            {instructions.slice(0, 2).map((instruction, idx) => (
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
          <ol className="mr-16 text-left mb-6">
            <h1 className="text-blue-800 text-2xl mb-1 font-bold">
              Put - new node with key = 6, value = 6
            </h1>
            {instructions.slice(2).map((instruction, idx) => (
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
        </div>
        <div className="flex flex-col items-start mt-12 relative">
          <h5 className="text-slate-600 text-xl mb-2 font-bold">Capacity: 5</h5>
          <div className="mb-6">
            <h5 className="text-slate-600 text-xl mb-4 font-bold">
              Key-Node map:
            </h5>
            <div className="flex">
              {nodeList.map(({ key, val }) => (
                <div
                  key={key}
                  className="flex items-center mr-10 transition-all"
                >
                  <div className="w-4 text-2xl mr-4">{key}:</div>
                  <div className="text-xl font-bold h-24 w-24 shadow-md rounded-md bg-white flex flex-col items-center justify-center">
                    <span>
                      <span className="font-normal w-10 inline-block text-blue-600">
                        val:
                      </span>{' '}
                      {val}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-6">
            <h5 className="text-slate-600 text-xl mb-4 font-bold">
              Doubly linked list:
            </h5>
            <div className="flex items-center mb-4">
              {dlList.map((node, idx) => {
                return (
                  <DLLNode
                    key={node}
                    isHead={idx === 0}
                    number={node}
                    isTail={idx === nodeList.length - 1}
                  />
                );
              })}
            </div>
          </div>

          <div className="flex w-full justify-between">
            <button
              className="border-blue-800 w-48 border-2 text-blue-800 px-12 py-4 rounded-md hover:border-blue-600 hover:text-blue-600"
              onClick={handleClickNextStep}
            >
              {animationStep === AnimationStep.NotStarted
                ? 'step by step'
                : animationStep === AnimationStep.AddNewNodeToKeyNodeMap
                ? 'reset'
                : 'next step'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LRUCache;
