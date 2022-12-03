import { useMyContext } from "./provider";
import { useState } from "react";

export const Emoji = ({ item, lightColor, symbol, type, onClick }: any) => {
  const { userId } = useMyContext();
  const [isHover, setIsHover] = useState(false);

  const isClickByMe =
    item.reaction[type] && item.reaction[type].some((id: string) => id === userId);

  return (
    <>
      <button
        onClick={() => onClick(type)}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <span className={`emoji rounded-tl-lg ${isClickByMe ? lightColor : ""} p-2`} role="img">
          {symbol}
          {item.reaction[type] ? item.reaction[type].length : 0}
        </span>
      </button>
      {isHover && item.reaction[type] && (
        <div className="absolute mb-5 flex -space-x-4 rounded-full border-2 border-gray-400 bg-gray-50 p-1">
          {item.reaction[type].slice(0, Math.max(4, item.reaction[type].length)).map((likerId) => {
            return likerId ? (
              <img
                key={likerId}
                className="h-10 w-10 rounded-full border-2 border-white bg-red-300 dark:border-gray-800"
                src={`https://robohash.org/${likerId.split("|")[0]}?set=set5`}
                alt=""
              />
            ) : null;
          })}
        </div>
      )}
    </>
  );
};
