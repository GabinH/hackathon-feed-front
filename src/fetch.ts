import { useState, useEffect } from "react";
import { useMyContext } from "./provider";

interface Props {
  body?: any;
  controller?: AbortController;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  url: string;
}

export const sendRequest = async <T>({ body, controller, method = "GET", url }: Props) => {
  const options: RequestInit = {
    cache: "default",
    headers: new Headers({ "Content-Type": "application/json" }),
    method: method,
    // TODO GHI : take care of CORS
    mode: "cors"
  };
  if (controller) {
    options.signal = controller.signal;
  }
  if (method === "POST" || method === "PUT") {
    options.body = JSON.stringify(body);
  }
  const response = await fetch(url, options);
  return (await response.json()) as T;
};

interface RequestProps {
  body?: BodyInit;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  url: string;
}

export const useRequest = <T>({ body, method, url }: RequestProps) => {
  const [data, setData] = useState<T | undefined | null>();
  const [isLoading, setIsLoading] = useState(false);
  const [refreshData, setRefreshData] = useState(new Date().getTime());

  const { userId } = useMyContext();

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    const fetchFunction = async () => {
      try {
        const data = await sendRequest<T>({
          body,
          controller,
          method,
          url
        });
        setData(data);
      } catch (error) {
        console.log("Request error : ", error);
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFunction().catch((error) => console.log("Fetch error : ", error));

    return () => {
      controller.abort();
      setIsLoading(false);
    };
  }, [refreshData, userId]);

  return {
    data,
    isLoading,
    refresh: () => setRefreshData(new Date().getTime())
  };
};
