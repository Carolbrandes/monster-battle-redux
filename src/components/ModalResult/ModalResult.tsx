import { Box, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import { Result, Winner } from '../../models/interfaces/monster.interface';

interface IProps {
  open: boolean;
  handleClose: () => void;
  battleresult: Result | null;
}

interface IWinnerAttr {
  type: string;
  value: number;
}

export const ModalResult = ({ open, handleClose, battleresult }: IProps) => {
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  if (battleresult) {
    const { winner }: Result | any = battleresult;
    const { name, imageUrl }: Winner = winner;

    const renderAttributes = () => {
      let attrs: IWinnerAttr[] = [];

      for (let prop in winner) {
        if (prop != 'name' && prop != 'imageUrl' && prop != 'id') {
          attrs = [...attrs, { type: prop, value: winner[prop] }];
        }
      }

      return (
        attrs?.length &&
        attrs.map((atributte: IWinnerAttr) => (
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <b>{atributte.type}:</b> {atributte.value}
          </Typography>
        ))
      );
    };

    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Result:
          </Typography>
          <img src={imageUrl} alt={name} />
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {name} Win!!!!!
          </Typography>

          <div>{renderAttributes()}</div>
        </Box>
      </Modal>
    );
  }

  return null;
};
