import { useCallback, useState } from "react";

const useHttps = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSucceed, setSucceed] = useState({
    status: false,
    token: "",
    message: "",
    dataUser: "",
  });

  const SendRequest = useCallback(async (requestConfig) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

      if (!response.ok) {
        throw new Error("Request failed.");
      }

      const data = await response.json();

      setSucceed((prev) => {
        return {
          ...prev,
          status: true,
          token: data.token ? data.token : "",
          message: data.message ? data.message : data.msg,
          dataUser: data.data?data.data.profile_data : "",
        };
      });
    } catch (e) {
      setError(e.message || "Something went wrong .");
    }
    setLoading(false);
  }, []);

  return {
    isLoading,
    error,
    isSucceed,
    SendRequest,
  };
};

export default useHttps;
