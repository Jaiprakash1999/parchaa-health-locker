import useGetLockerDetail from "./hooks/useGetLockerDetail";

function App() {
  const { lockerData, onApproveLocker, isApproving, isLockerDataLoading } =
    useGetLockerDetail();

  return (
    <div className="m-5 text-sm">
      <div className="flex text-lg font-semibold items-center justify-center m-5">
        Health Locker Data
      </div>
      <div className="border rounded">
        <div className="flex py-2 gap-10  text-base font-medium px-2 w-full border-b">
          <div className="w-[5%]">ID</div>
          <div className="w-[20%]">Abha Address</div>
          <div className="w-[20%]">Care Context Reference</div>
          <div className="w-[20%]">HIP Id</div>
          <div className="w-[15%]">File Date</div>
          <div className="w-[20%]">Actions</div>
        </div>
        {isLockerDataLoading ? (
          <div className="flex justify-center p-4">Loading... </div>
        ) : (
          <>
            {lockerData.length > 0 ? (
              lockerData.map((data) => {
                const {
                  id,
                  hipId,
                  abhaAddress,
                  careContextReference,
                  verified,
                  fileDate,
                } = data || {};

                return (
                  <div
                    className="flex px-2 py-2 gap-10 last:border-none items-center border-b"
                    key={id}
                  >
                    <div className="w-[5%]">{id}</div>
                    <div className="w-[20%] ">{abhaAddress}</div>
                    <div className="w-[20%]">{careContextReference}</div>
                    <div className="w-[20%]">{hipId}</div>
                    <div className="w-[15%]">{fileDate || "--"}</div>
                    <div className="w-[20%]">
                      <button
                        onClick={() => onApproveLocker(id)}
                        disabled={verified || isApproving}
                        className="active:bg-[#1C64F2] w-1/2 h-10 disabled:border-[#C6C7C9] flex items-center hover:border-2 hover:border-[#4C6AF7] border justify-center disabled:border disabled:bg-[#F9FAFB] disabled:text-[#A2A3A7]  border-[#4C6AF7] item-center py-2 rounded-lg text-sm text-[#4C6AF7]"
                      >
                        {verified ? "Verified" : "Verify"}
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex justify-center p-5">No Data Found !</div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
