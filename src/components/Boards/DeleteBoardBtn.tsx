import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DialogButton from '../layouts/DialogButton';
import { IBoard } from '../../interfaces/apiInterfaces';
import { getSubstring } from '../../utils/functions';
import { useTranslation } from 'react-i18next';
import { useDeleteBoardMutation } from '../../store/services/boardsService';
import DialogControls from '../layouts/DialogControls';

const DeleteBoardBtn = ({ board }: { board: IBoard }) => {
  const { t } = useTranslation();
  const token = localStorage.getItem('token-rss') as string;

  const [deleteBoard] = useDeleteBoardMutation();

  const handleDeleteBoard = async (id: string) => {
    await deleteBoard({ id, token }).unwrap();
  };

  return (
    <DialogButton
      type="delete_board"
      message={t(`forms.delete_board.description`, {
        title: getSubstring(board.title),
      })}
      btn={(handleOpen) => (
        <IconButton
          sx={{ position: 'absolute', right: 0, bottom: 0 }}
          aria-label="delete"
          color="warning"
          onClick={handleOpen}
        >
          <DeleteIcon />
        </IconButton>
      )}
      form={(handleClose) => (
        <DialogControls
          onConfirm={() => {
            handleDeleteBoard(board.id);
            handleClose();
          }}
          onCancel={handleClose}
        />
      )}
    />
  );
};

export default DeleteBoardBtn;