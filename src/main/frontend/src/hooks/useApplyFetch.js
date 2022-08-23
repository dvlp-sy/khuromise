import { useState, useEffect } from "react";

const useApplyFetch = (url) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((res) => setData(res));
  }, [url]);

  return data;
};

export default useApplyFetch;
