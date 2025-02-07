import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface RootState {
  all: {
    loginTrigger: boolean;
  };
}
const useGetDetails = () => {
  const [userDetails, setUserDetails] = useState(null);
  const loggedIn = useSelector((state: RootState) => state.all.loginTrigger);

 
  useEffect(() => {
    const tempDetails = JSON.parse(localStorage.getItem("userDetails"));
    if (tempDetails) {
      setUserDetails(tempDetails);
    }
  }, [loggedIn]);

  return { userDetails };
};

export default useGetDetails;
