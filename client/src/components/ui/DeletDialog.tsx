import { setIsDeleteModal } from "../../redux/features/books/bookSlice";
import { useAppDispatch } from "../../redux/hooks";
type DeletDialogProps = {
  onConfirmDelete: () => void;
};

const DeletDialog: React.FC<DeletDialogProps> = ({ onConfirmDelete }) => {
  const dispatch = useAppDispatch();

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      <div className='bg-white shadow-lg rounded p-6 space-y-4'>
        <h2 className='text-lg font-semibold'>
          Are you sure you want to delete?
        </h2>
        <div className='flex justify-end gap-4'>
          <button
            onClick={() => {
              dispatch(setIsDeleteModal(false)); // just close modal
            }}
            className='px-4 py-2 bg-gray-200 rounded hover:bg-gray-300'
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirmDelete(); // delete directly
              dispatch(setIsDeleteModal(false)); // close modal
            }}
            className='px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700'
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletDialog;
