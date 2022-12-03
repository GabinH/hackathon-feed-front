import { Emoji } from "./emoji";
import { Share } from "./icons/share";
import { Dots } from "./icons/dots";
import { getLightColor } from "./utils";
import moment from "moment";
import { sendRequest } from "./fetch";
import { useMyContext } from "./provider";
import { useState } from "react";
import { Menu } from "./menu";
import { SERVER_URL } from "./constants";

export const Card = ({ item }: any) => {
  const { userId, handleReaction, handleStop, setHoveredItem } = useMyContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lightColor = getLightColor(item.type);
  const link = "https://wefight.co/fr-FR/living_with/vik_da/article/dermatite-eczema-atopique";

  const isNew = moment(item.date).isAfter(moment().subtract("3", "day"));

  const title = item.title || "Hello there";

  const handleReactionClick = (type: string) => {
    sendRequest({
      url: `${SERVER_URL}/reaction`,
      body: {
        postId: item._id,
        reactionType: type,
        userId: userId
      },
      method: "POST"
    });
    handleReaction(item._id, type, userId);
  };

  const handleEventClick = (eventType: string) => {
    sendRequest({
      url: `${SERVER_URL}/event`,
      body: {
        postId: item._id,
        type: eventType,
        userId: userId
      },
      method: "POST"
    });
  };

  const handleStopClick = () => {
    sendRequest({
      url: `${SERVER_URL}/event`,
      body: {
        postId: item._id,
        type: "stop",
        userId: userId
      },
      method: "POST"
    });
    setIsMenuOpen(false);
    handleStop(item._id);
  };

  return (
    <>
      <div
        onMouseEnter={() => {
          setHoveredItem(item);
        }}
        onMouseLeave={() => {
          setHoveredItem(null);
        }}
      >
        <div className="flex text-lg font-bold">
          <span className="flex-grow truncate">{item.highlight ? `⭐ ${title} ⭐` : title}</span>
          {isNew && (
            <div className="relative z-10 flex w-2/5 rotate-12 justify-center rounded-lg bg-cyan-200">
              💡 New
            </div>
          )}
        </div>
        <button
          className={`flex flex-grow flex-row items-center space-x-2 p-2`}
          onClick={() => {
            handleEventClick("click");
            window.open(link, "_blank");
          }}
        >
          <div>
            {item.image ? (
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-full uppercase ${lightColor}`}
              >
                <img className="h-16 w-16 rounded-full object-center" src={item.image} alt="" />
              </div>
            ) : item.type === "content" ? (
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-full uppercase ${lightColor}`}
              >
                <img
                  className="h-16 w-16 rounded-full object-center"
                  src={"/POCnewsFeedFront/assets/vik.png"}
                  alt=""
                />
              </div>
            ) : (
              item.type === "testimony" && (
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-full uppercase ${lightColor}`}
                >
                  {item && (
                    <img
                      className="h-16 w-16 rounded-full object-center"
                      src={`https://robohash.org/${item._id}?set=set5`}
                      alt=""
                    />
                  )}
                </div>
              )
            )}
          </div>
          <div className="overflow-hidden text-ellipsis text-left text-sm text-gray-500">
            {Array.isArray(item.content) ? (
              <div className="flex flex-col">
                {item.content.slice(0, 2).map((x: string) => {
                  return (
                    <div key={x} className="speech-bubble z-50 m-2 p-2">
                      {x}
                    </div>
                  );
                })}
              </div>
            ) : (
              item.content
            )}
          </div>
        </button>
        <div className="flex flex-row justify-end space-x-2 border-t-2 border-gray-300 pt-2">
          <div className="flex-grow justify-center space-x-2">
            <Emoji
              onClick={handleReactionClick}
              item={item}
              lightColor={lightColor}
              symbol="👍"
              type="like"
            />
            <Emoji
              onClick={handleReactionClick}
              item={item}
              lightColor={lightColor}
              symbol="❤"
              type="heart"
            />
            <Emoji
              onClick={handleReactionClick}
              item={item}
              lightColor={lightColor}
              symbol="😢"
              type="sad"
            />
            <Emoji
              onClick={handleReactionClick}
              item={item}
              lightColor={lightColor}
              symbol="🤞"
              type="crossfinger"
            />
            <Emoji
              onClick={handleReactionClick}
              item={item}
              lightColor={lightColor}
              symbol="👏"
              type="applause"
            />
          </div>
          <button
            onClick={async () => {
              handleEventClick("share");
              await navigator.clipboard.writeText(link);
              alert("Lien copié 🤓");
            }}
          >
            <Share />
          </button>
          <div className="flex">
            <button className="flex" onClick={() => setIsMenuOpen(true)}>
              <Dots />
            </button>
            <Menu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen}>
              <ul className="flex flex-col divide-y">
                <li
                  className="flex justify-center p-2 hover:cursor-pointer active:bg-gray-200"
                  onClick={handleStopClick}
                >
                  Stop
                </li>
                <li
                  className="flex justify-center p-2 hover:cursor-pointer active:bg-gray-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Hello
                </li>
              </ul>
            </Menu>
          </div>
        </div>
      </div>
    </>
  );
};
