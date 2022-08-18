import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState([{ id: 0 }]);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((res) => setData(res));
  }, [url]);

  return data;
};

export default useFetch;
