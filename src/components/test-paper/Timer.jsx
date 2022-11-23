import { useEffect, useState } from "react";

export function Timer({ startTime, linkExpiryDateTime, allowedDuration }) {
  const [reload, setReload] = useState(0);
  const [paperEndTime, setPaperEndTime] = useState();
  useEffect(() => {
    const id = setInterval(() => {
      setReload((prev) => prev + 1);
    }, [500]);
    return () => {
      clearInterval(id);
    };
  }, []);

  useEffect(() => {
    if ((startTime, allowedDuration, linkExpiryDateTime)) {
      const defaultAllowedDurationInMs =
        new Date(startTime).getTime() + allowedDuration * 60 * 1000;
      const remainingLinkExpiryTime = new Date(linkExpiryDateTime).getTime();

      const endtime = Math.min(
        defaultAllowedDurationInMs,
        remainingLinkExpiryTime
      );

      setPaperEndTime(endtime);
    }
  }, [allowedDuration, linkExpiryDateTime, startTime]);

  function formatTime(timeInMilliSecond) {
    const hrs = Math.floor(timeInMilliSecond / (1000 * 60 * 60));
    let remainingTimeInMs = timeInMilliSecond % (1000 * 60 * 60);

    const minutes = Math.floor(remainingTimeInMs / (1000 * 60));
    remainingTimeInMs = remainingTimeInMs % (1000 * 60);

    const seconds = Math.floor(remainingTimeInMs / 1000);
    return `${String(hrs).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")} hrs`;
  }

  return (
    <div className="text-center bg-warning p-2 m-2 fw-bold">
      {paperEndTime && (
        <div>{formatTime(paperEndTime - new Date().getTime())}</div>
      )}
    </div>
  );
}
