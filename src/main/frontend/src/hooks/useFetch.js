import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState([{ id: 0 }]);

  useEffect(() => {
    axios
      .get(url)
      .then((res) => res.json())
      .then((res) => setData(res));
  }, [url]);

  return data;
};

export default useFetch;
