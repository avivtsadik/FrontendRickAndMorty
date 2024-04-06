import { useEffect } from "react";

const WithLogHoc = (WrappedComponent: React.FC) => {
  const WithInitialLog = () => {
    useEffect(() => {
      console.log("initial component log Hoc");

      return () => {
        console.log("component log Hoc unmounted");
      };
    }, []);
    return <WrappedComponent />;
  };
  return WithInitialLog;
};
export default WithLogHoc;
