import { createContext, useContext, useEffect, useState } from "react";
import { v1 as uuidv1 } from "uuid";
import { sendRequest } from "./fetch";
import { SERVER_URL } from "./constants";

const MyContext = createContext(null);

export const MyProvider = ({ children }: any) => {
  const [userId, setUserId] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [userName, setUserName] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let currentUserId = userId || window.localStorage.getItem("USER_ID");
    if (!currentUserId) {
      sendRequest<any>({
        url: `${SERVER_URL}/random-name`
      }).then((data) => {
        setUserName(data.name);
        currentUserId = `${uuidv1()}|${data.name}`;
        window.localStorage.setItem("USER_ID", currentUserId);
      });
    } else {
      setUserName(currentUserId.split("|")[1]);
    }
    setUserId(currentUserId);
  }, []);

  const handleReaction = (postId: string, type: string, userId: string) => {
    const newPosts = [...posts];
    for (const post of newPosts) {
      if (post._id === postId) {
        const reactions = Object.keys(post.reaction);
        for (const reactionType of reactions) {
          if (reactionType !== "total") {
            const index = post.reaction[reactionType].indexOf(userId);
            if (index > -1) {
              post.reaction[reactionType].splice(index, 1);
            } else if (reactionType === type) {
              post.reaction[reactionType].push(userId);
            }
          }
        }
      }
    }
    setPosts(newPosts);
  };

  const handleStop = (postId) => {
    const newPosts = [];
    for (const post of posts) {
      if (post._id !== postId) {
        newPosts.push(post);
      }
    }
    setPosts(newPosts);
  };

  return (
    <MyContext.Provider
      value={{
        userId: userId,
        posts,
        setPosts,
        handleReaction,
        handleStop,
        userName,
        hoveredItem,
        setHoveredItem
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  const ctx = useContext(MyContext);
  if (!ctx) {
    throw new Error("Bolosse");
  }
  return ctx;
};
