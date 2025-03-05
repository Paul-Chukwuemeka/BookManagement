import { FallingLines } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="w-full absolute top-0 left-0 h-full flex justify-center items-center">
      <FallingLines
        color="#4fa94d"
        width="100"
        visible={true}
        ariaLabel="falling-circles-loading"
      />
    </div>
  );
};

export default Loading;
