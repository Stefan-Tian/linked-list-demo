import { useState } from 'react';
import useAnimationProcess from '../hooks/useAnimationProcess';
import DLLNode from './DLLNode';

enum AnimationStep {
  NotStarted = -1,
  UpdateNodeVal = 0,
  IncreaseFreqForNode = 1,
  MoveNodeToIncreasedList = 2,
  UpdateMinFreq = 3,
  RemoveNodeFromOldFreqList = 4,
  IncreaseFreqBy1 = 5,
  AddNodeToNewFreqList = 6,
  RemoveHeadFromMinFreqList = 7,
  RemoveNodeFromKeyNodeMap = 8,
  AddNewNodeToKeyNodeMap = 9,
  GetOrCreateFreqListOf1AndPushInNewNode = 10,
  UpdateMinFreqTo1 = 11,
}

const animationDurations = [500, 1000, 600, 600, 600, 600, 3000];

const instructionsMap: Record<number, string> = {
  [AnimationStep.UpdateNodeVal]: 'Update node value.',
  [AnimationStep.IncreaseFreqForNode]:
    'Increase the frequency of the node by 1.',
  [AnimationStep.MoveNodeToIncreasedList]:
    'Move node to increased frequency list.',
  [AnimationStep.UpdateMinFreq]:
    'Increase the minimum frequency by 1 since freq 2 is empty.',
  [AnimationStep.RemoveNodeFromOldFreqList]:
    'Remove node form old frequency list.',
  [AnimationStep.IncreaseFreqBy1]: 'Increase freq of the accessed node by 1.',
  [AnimationStep.AddNodeToNewFreqList]: 'Push node into new frequency list.',
  [AnimationStep.RemoveHeadFromMinFreqList]:
    'Remove the head of the minimum frequency list.',
  [AnimationStep.RemoveNodeFromKeyNodeMap]: 'Remove node from key node map.',
  [AnimationStep.AddNewNodeToKeyNodeMap]: 'Add new node to key node map',
  [AnimationStep.GetOrCreateFreqListOf1AndPushInNewNode]:
    'Get or create frequency list of 1 and push in the new node.',
  [AnimationStep.UpdateMinFreqTo1]: 'Update the minimum frequency to 1.',
};

const instructions = Object.values(instructionsMap);

interface Node {
  key: number;
  val: number;
  freq: number;
}

const nList: Node[] = [
  { key: 1, val: 1, freq: 2 },
  { key: 2, val: 2, freq: 3 },
  { key: 3, val: 3, freq: 3 },
  { key: 4, val: 4, freq: 3 },
  { key: 5, val: 5, freq: 4 },
];

const fList = [[], [1], [2, 3, 4], [5]];
const LFUCache = () => {
  const { animationStep, setAnimationStep } =
    useAnimationProcess(animationDurations);
  const [nodeList, setNodeList] = useState(nList);
  const [freqList, setFreqList] = useState(fList);
  const [minFreq, setMinFreq] = useState(2);

  const handleClickNextStep = () => {
    if (animationStep === AnimationStep.UpdateMinFreqTo1) {
      setAnimationStep(AnimationStep.NotStarted);
      setNodeList(nList);
      setFreqList(fList);
    } else {
      setAnimationStep((prevStep) => {
        const newStep = prevStep + 1;
        if (newStep === AnimationStep.UpdateNodeVal) {
          const newNodeList = [
            { key: 1, val: 6, freq: 2 },
            { key: 2, val: 2, freq: 3 },
            { key: 3, val: 3, freq: 3 },
            { key: 4, val: 4, freq: 3 },
            { key: 5, val: 5, freq: 4 },
          ];
          setNodeList(newNodeList);
        }

        if (newStep === AnimationStep.IncreaseFreqForNode) {
          const newNodeList = [
            { key: 1, val: 6, freq: 3 },
            { key: 2, val: 2, freq: 3 },
            { key: 3, val: 3, freq: 3 },
            { key: 4, val: 4, freq: 3 },
            { key: 5, val: 5, freq: 4 },
          ];
          setNodeList(newNodeList);
        }

        if (newStep === AnimationStep.MoveNodeToIncreasedList) {
          const updatedFreqList = [[], [], [2, 3, 1], [4], [5]];
          setFreqList(updatedFreqList);
        }

        if (newStep === AnimationStep.UpdateMinFreq) {
          setMinFreq(3);
        }

        if (newStep === AnimationStep.RemoveNodeFromOldFreqList) {
          const updatedFreqList = [[], [], [3, 1], [5]];
          setFreqList(updatedFreqList);
        }

        if (newStep === AnimationStep.IncreaseFreqBy1) {
          const newNodeList = [
            { key: 1, val: 6, freq: 3 },
            { key: 3, val: 3, freq: 3 },
            { key: 4, val: 4, freq: 3 },
            { key: 2, val: 2, freq: 4 },
            { key: 5, val: 5, freq: 4 },
          ];
          setNodeList(newNodeList);
        }

        if (newStep === AnimationStep.AddNodeToNewFreqList) {
          const updatedFreqList = [[], [], [3, 1], [5, 2]];
          setFreqList(updatedFreqList);
        }

        if (newStep === AnimationStep.RemoveHeadFromMinFreqList) {
          const updatedFreqList = [[], [], [1], [5, 2]];
          setFreqList(updatedFreqList);
        }

        if (newStep === AnimationStep.RemoveNodeFromKeyNodeMap) {
          const newNodeList = [
            { key: 1, val: 6, freq: 3 },
            { key: 4, val: 4, freq: 3 },
            { key: 2, val: 2, freq: 4 },
            { key: 5, val: 5, freq: 4 },
          ];
          setNodeList(newNodeList);
        }

        if (newStep === AnimationStep.AddNewNodeToKeyNodeMap) {
          const newNodeList = [
            { key: 6, val: 7, freq: 1 },
            { key: 1, val: 6, freq: 3 },
            { key: 4, val: 4, freq: 3 },
            { key: 2, val: 2, freq: 4 },
            { key: 5, val: 5, freq: 4 },
          ];
          setNodeList(newNodeList);
        }

        if (newStep === AnimationStep.GetOrCreateFreqListOf1AndPushInNewNode) {
          const updatedFreqList = [[6], [], [], [1], [5, 2]];
          setFreqList(updatedFreqList);
        }

        if (newStep === AnimationStep.UpdateMinFreqTo1) {
          setMinFreq(1);
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
              Put - update node with key = 1 to value = 6
            </h1>
            {instructions.slice(0, 4).map((instruction, idx) => (
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
              Get - node with key = 2
            </h1>
            {instructions.slice(4, 7).map((instruction, idx) => (
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
          <ol className="mr-16 text-left">
            <h1 className="text-blue-800 text-2xl mb-1 font-bold">
              Put - new node with key = 6, value = 7
            </h1>
            {instructions.slice(7).map((instruction, idx) => (
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
          <h5 className="text-slate-600 text-xl mb-2 font-bold">
            Minimum Frequency: <span className="text-blue-700">{minFreq}</span>
          </h5>
          <div className="mb-6">
            <h5 className="text-slate-600 text-xl mb-4 font-bold">
              Key-Node map:
            </h5>
            <div className="flex">
              {nodeList.map(({ key, val, freq }) => (
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
                    <span>
                      <span className="font-normal w-10 inline-block text-blue-600">
                        freq:
                      </span>{' '}
                      {freq}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-6">
            <h5 className="text-slate-600 text-xl mb-4 font-bold">
              Freqency-List map:
            </h5>
            <div>
              {freqList.map((list, idx) => {
                const freq = idx + 1;

                if (list.length === 0) return null;
                return (
                  <div className="flex items-center mb-4" key={freq}>
                    <div className="w-4 text-2xl mr-4">{freq}:</div>
                    <div className="flex items-center justify-center">
                      {list.map((key, nodeIdx) => {
                        const node = nodeList.find(
                          (node) => node.key === key
                        ) as Node;

                        return (
                          <DLLNode
                            key={node.key}
                            isHead={nodeIdx === 0}
                            number={node.val}
                            isTail={nodeIdx === list.length - 1}
                          />
                        );
                      })}
                    </div>
                  </div>
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
                : animationStep === AnimationStep.UpdateMinFreqTo1
                ? 'reset'
                : 'next step'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LFUCache;
