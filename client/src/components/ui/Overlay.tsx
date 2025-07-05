import { setIsOpenModal } from "../../redux/features/books/bookSlice";
import { useAppDispatch } from "../../redux/hooks";

const Overlay = () => {
  const dispatch = useAppDispatch();

  return (
    <div
      onClick={() => dispatch(setIsOpenModal(false))}
      className='h-screen max-sm:rounded-md w-full absolute z-40 top-0 right-0 bottom-0 bg-black opacity-25'
    ></div>
  );
};

export default Overlay;
