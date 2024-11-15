import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
const { REACT_APP_API_KEY } = process.env;

const useGetLockerDetail = () => {
  const [lockerData, setLockerData] = useState([]);
  const [isLockerDataLoading, setIsLockerDataLoading] = useState(false);
  const [isApproving, setIsApproving] = useState(false);

  const getLockerData = useCallback(async () => {
    setIsLockerDataLoading(true);
    try {
      const res = await axios.get(
        `${REACT_APP_API_KEY}/api/phr/healthLocker/allLockerDocuments`
      );
      setLockerData(res.data?.reverse());
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error, "error");
    } finally {
      setIsLockerDataLoading(false);
    }
  }, []);

  const onApproveLocker = async (id) => {
    setIsApproving(true);
    try {
      await axios.post(
        `${REACT_APP_API_KEY}/api/phr/healthLocker/approve/healthLockerDocument`,
        { id: id }
      );
      toast.success("Details Verified Successfully !");
      getLockerData();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setIsApproving(false);
    }
  };

  useEffect(() => {
    getLockerData();
  }, [getLockerData]);

  return {
    lockerData,
    onApproveLocker,
    isApproving,
    isLockerDataLoading,
  };
};

export default useGetLockerDetail;
