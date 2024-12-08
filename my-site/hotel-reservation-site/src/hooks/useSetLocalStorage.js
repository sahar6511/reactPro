import { useEffect, useState } from "react";

const useSetLocalStorage = (key) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const dataFromLocalStorage = JSON.parse(localStorage.getItem(key));
    if (dataFromLocalStorage === null) {
      localStorage.setItem(key, JSON.stringify(data));
    } else {
      var index = -1;
      for (let i = 0; i < dataFromLocalStorage.length; i++) {
        const element = dataFromLocalStorage[i];
        if (element.id === data.id) {
          element.adultCount = data.adultCount;
          index = i;
          break;
        }
      }
      if (index === -1 && data.length !== 0) {
        dataFromLocalStorage.push(data);
      }
      localStorage.setItem(key, JSON.stringify(dataFromLocalStorage));
    }
  }, [data]);
  return [data, setData];
};
export default useSetLocalStorage;
