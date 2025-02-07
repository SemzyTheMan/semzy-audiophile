import { useEffect, useState } from "react";

const Details = () => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const tempDetails = JSON.parse(localStorage.getItem("userDetails"));
    if (tempDetails) {
      setUserDetails(tempDetails);
    }
  }, []);

  return { userDetails };
};

export default Details;
