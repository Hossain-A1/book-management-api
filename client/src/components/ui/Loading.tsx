import { SpinnerCircularSplit } from "spinners-react";

const Loading = () => {
  return (
    <div className='flex items-center justify-center h-screen'>
      <SpinnerCircularSplit
        size={50}
        thickness={100}
        speed={100}
        color='#36ad47'
        secondaryColor='rgba(0, 0, 0, 0.44)'
      />
    </div>
  );
};

export default Loading;
