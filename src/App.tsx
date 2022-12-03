import { useEffect } from "react";
import { Card } from "./Card";
import { Calendar } from "./icons/calendar";
import { Questionnaire } from "./icons/questionnaire";
import { Article } from "./icons/article";
import { User } from "./icons/user";
import { Rocket } from "./icons/rocket";
import { getTypeColor } from "./utils";
import { useRequest } from "./fetch";
import { useMyContext } from "./provider";
import { useLocation } from "react-router-dom";
import { SERVER_URL } from "./constants";

export const App = () => {
  const { userId, userName, hoveredItem, setPosts, posts } = useMyContext();
  const requester = useRequest<any>({
    url: `${SERVER_URL}/posts/${userId}`
  });
  const search = useLocation().search;
  const debugParam = new URLSearchParams(search).get("debug");

  useEffect(() => {
    const interval = setInterval(() => {
      if (debugParam === "true") {
        requester.refresh();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setPosts(requester.data || []);
  }, [requester.data]);

  let debug = "invisible";
  if (debugParam === "true") {
    debug = "";
  }

  return (
    <div className="flex">
      <div className="flex w-1/5 "></div>
      <div className="flex w-3/5 items-center justify-center">
        <div className="size mt-5 flex flex-col rounded border-2 border-black bg-white">
          <div className="h-2/12 m-2 flex items-center justify-center border-b-2 border-black p-2 text-3xl font-bold underline">
            <div className="flex w-4/6 items-center justify-center">
              {userId && (
                <img
                  className="h-16 w-16 rounded-full bg-red-300 object-center"
                  src={`https://robohash.org/${userId?.split("|")[0]}?set=set5`}
                  alt=""
                />
              )}
              {userName}
            </div>
            <div className="flex w-1/6 items-center justify-center">
              <button
                className="flex items-center justify-center p-2"
                onClick={() => requester.refresh()}
              >
                <svg className="flex h-10 w-10 items-center justify-center fill-colorArticle p-2 active:fill-green-300">
                  <path d="M13.5 2c-5.621 0-10.211 4.443-10.475 10h-3.025l5 6.625 5-6.625h-2.975c.257-3.351 3.06-6 6.475-6 3.584 0 6.5 2.916 6.5 6.5s-2.916 6.5-6.5 6.5c-1.863 0-3.542-.793-4.728-2.053l-2.427 3.216c1.877 1.754 4.389 2.837 7.155 2.837 5.79 0 10.5-4.71 10.5-10.5s-4.71-10.5-10.5-10.5z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="scrollbar-hide m-2 h-3/5 flex-grow space-y-2 overflow-y-scroll rounded p-2">
            {posts.map((item: any, index) => {
              const borderColor = getTypeColor(item.type);

              return (
                <div
                  className={`h-8/12 flex flex-col rounded border-2 border-l-8 ${borderColor} p-3`}
                  key={index}
                >
                  <Card item={item} />
                </div>
              );
            })}
          </div>
          <div className="h-4/12 m-2 flex flex flex-row items-center justify-center space-x-12 border-t-2 border-black">
            <User />
            <Calendar />
            <Rocket />
            <Questionnaire />
            <Article />
          </div>
        </div>
      </div>
      <div className={`mt-5 w-1/5 space-y-4 ${debug}`}>
        <div className="flex flex-col">
          <h3 className="text-lg font-bold">Card Id:</h3>
          <h3>{hoveredItem?._id}</h3>
          <p>
            <b className="font-bold">view: </b>
            {hoveredItem?.event?.view}
          </p>
          <p>
            <b className="font-bold">click: </b>
            {hoveredItem?.event?.click}
          </p>
          <p>
            <b className="font-bold">share: </b>
            {hoveredItem?.event?.share}
          </p>
          <p>
            <b className="font-bold">stop: </b>
            {hoveredItem?.event?.stop}
          </p>
          <br />
          <br />
          <h5 className="text-lg font-bold">Weights</h5>
          <p>
            <b className="font-bold">Total: </b>
            {hoveredItem?.weight}
          </p>
          <p>
            <b className="font-bold">dateWeight: </b>
            {hoveredItem?.weightDetail?.dateWeight}
          </p>
          <p>
            <b className="font-bold">clickWeight: </b>
            {hoveredItem?.weightDetail?.clickWeight}
          </p>
          <p>
            <b className="font-bold">viewWeight: </b>
            {hoveredItem?.weightDetail?.viewWeight}
          </p>
          <p>
            <b className="font-bold">shareWeight: </b>
            {hoveredItem?.weightDetail?.shareWeight}
          </p>
          <p>
            <b className="font-bold">reactionWeight: </b>
            {hoveredItem?.weightDetail?.reactionWeight}
          </p>
          <p>
            <b className="font-bold">highlightWeight: </b>
            {hoveredItem?.weightDetail?.highlightWeight}
          </p>
        </div>
      </div>
    </div>
  );
};
