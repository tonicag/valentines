"use client";

import HeartBackground from "@/app/(homepage)/components/HeartBackground";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";

type Step = {
  question: string;
  image: string;
  yesText: string;
  noText: string;
};

export type QuestionProps = {
  steps: Step[];
  finalStep: Partial<Step>;
};
export default function Question({ steps, finalStep }: QuestionProps) {
  const [emojiCount, setEmojiCount] = useState<number>(30);

  const [step, setStep] = useState<number>(0);
  const [isFinalStep, setIsFinalStep] = useState<boolean>(false);

  const yesButtonRef = useRef<HTMLButtonElement>(null);

  const lastStep = steps[step] || steps[steps.length - 1];

  const onNoClick = useCallback(() => {
    const yesBtn = yesButtonRef.current as HTMLElement;
    const screenWidth = window.innerWidth;
    const currentWidth = parseFloat(window.getComputedStyle(yesBtn).width);
    const currentHeight = parseFloat(window.getComputedStyle(yesBtn).height);
    const currentFontSize = parseFloat(
      window.getComputedStyle(yesBtn).fontSize
    );

    if (currentWidth < screenWidth * 0.9) {
      yesBtn.style.height = `${currentHeight * 1.5}px`;
      yesBtn.style.fontSize = `${currentFontSize * 1.5}px`;
    }
    setStep(step + 1);
  }, [step]);

  const onYesClick = useCallback(() => {
    setIsFinalStep(true);
    setEmojiCount(50);
  }, [step]);

  return (
    <>
      <HeartBackground itemCount={emojiCount} />
      {isFinalStep ? (
        <div className="flex flex-col justify-center items-center gap-4 z-10">
          <p className="bg-pink-100 rounded-lg p-2 text-2xl font-bold">
            {finalStep?.question}
          </p>
          {finalStep.image && (
            <Image
              src={finalStep.image}
              alt="heart"
              width={350}
              height={350}
              className="border-4 border-pink-100 max-w-[350px] w-full h-auto rounded-lg mb-4"
            />
          )}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-4 z-10 p-2">
          <p className="bg-pink-100 rounded-lg p-2 text-2xl font-bold text-center">
            {lastStep.question}
          </p>
          <Image
            src={lastStep.image}
            alt="heart"
            width={350}
            height={350}
            className="border-4 border-pink-100 max-w-[350px] w-full h-auto rounded-lg "
          />
          <div className="flex flex-wrap items-center gap-4 justify-center">
            <Button
              ref={yesButtonRef}
              onClick={onYesClick}
              className="h-20 bg-green-500 shadow-lg hover:bg-green-600 font-semibold text-lg text-white"
            >
              {lastStep.yesText}
            </Button>
            {step <= steps.length - 1 && (
              <Button
                onClick={onNoClick}
                className="h-20 bg-red-500 shadow-lg hover:bg-red-600 font-semibold text-lg text-white"
              >
                {lastStep.noText}
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
