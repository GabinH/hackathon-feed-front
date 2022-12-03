import { MutableRefObject, useEffect } from "react";

export const useClickAwayListener = (
  ref: MutableRefObject<HTMLElement | null>,
  onClickAway: () => void
) => {
  useEffect(() => {
    // TODO GHI : typing
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickAway();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
};

export const getTypeColor = (type: string) => {
  switch (type) {
    case "article":
      return "border-colorArticle";
    case "questionnaire":
      return "border-colorQuestionnaire";
    case "qdj":
      return "border-colorQdj";
    case "testimony":
      return "border-colorTestimony";
    case "content":
      return "border-colorContent";
  }
};

export const getLightColor = (type: string) => {
  switch (type) {
    case "article":
      return "bg-colorArticle-light";
    case "questionnaire":
      return "bg-colorQuestionnaire-light";
    case "qdj":
      return "bg-colorQdj-light";
    case "testimony":
      return "bg-colorTestimony-light";
    case "content":
      return "bg-colorContent-light";
  }
};
