import { useState } from "react";
import { delay } from "../utils";

const ANIMATION_NOT_STARTED = -1;

const useAnimationProcess = (durations: number[]) => {
  const [animationStep, setAnimationStep] = useState<number>(
    ANIMATION_NOT_STARTED
  );

  const startAnimationProcess = async () => {
    await durations.reduce(async (previousPromise, duration) => {
      await previousPromise;
      setAnimationStep((prevStep) => prevStep + 1);
      await delay(duration);
    }, Promise.resolve());

    setAnimationStep(ANIMATION_NOT_STARTED);
  };

  return { animationStep, startAnimationProcess, setAnimationStep };
};

export default useAnimationProcess;
