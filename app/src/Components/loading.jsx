import { Hourglass } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="w-full absolute top-0 left-0 h-full flex justify-center items-center">
      <Hourglass
        visible={true}
        height="40"
        width="40"
        ariaLabel="hourglass-loading"
        wrapperStyle={{}}
        wrapperClass=""
        colors={["#0ea5e9", "#72a1ed"]}
      />
    </div>
  );
};

export default Loading;
