import bugImageUrl from "../../assets/bug.svg";
import ideaImageUrl from "../../assets/idea.svg";
import thoughtImageUrl from "../../assets/thought.svg";
import { useState } from "react";
import { FeedBackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedBackContentStep } from "./Steps/FeedbackContentStep";
import { FeedBackSucessStep } from "./Steps/FeedbackSucessStep";

export const feedbackTypes = {
  BUG: {
    title: "Problema",
    image: {
      source: bugImageUrl,
      alt: "Imagem de um inseto",
    },
  },
  IDEA: {
    title: "Idea",
    image: {
      source: ideaImageUrl,
      alt: "Imagem de uma lampada",
    },
  },
  OTHER: {
    title: "Outro",
    image: {
      source: thoughtImageUrl,
      alt: "Imagem de um balao de pensamento",
    },
  },
};

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm() {
  const [feedBackType, setFeedBackType] = useState<FeedbackType | null>(null);
  const [feedBackSend, setFeedBackSent] = useState(false);

  function handleRestartFeedBack() {
    setFeedBackSent(false);
    setFeedBackType(null);
  }

  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
      { feedBackSend ? (
        <FeedBackSucessStep 
          onFeedBackRestartRequested = {handleRestartFeedBack}
        />
      ) : (
        <>
          {!feedBackType ? (
            <FeedBackTypeStep onFeedBackTypeChanges={setFeedBackType} />
          ) : (
            <FeedBackContentStep
              feedBackType={feedBackType}
              onFeedBackRestartRequested={handleRestartFeedBack}
              onFeedBackSent={() => setFeedBackSent(true)}
            />
          )}
        </>
      )}
      <footer className="text-xs text-neutral-400">
        Feito com ♥ pela{" "}
        <a
          className="underline underline-offset-2"
          href="https://rocketseat.com.br"
        >
          Rocketseat
        </a>
      </footer>
    </div>
  );
}
