import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const SearchModal = (props) => {
    const { open, searchModalHandler, searchingHandler } = props;
    const [value, setValue] = useState('');
    return (
        <Modal
            open={open}
            onClose={searchModalHandler}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Search articles
                </Typography>
                <TextField
                    margin="normal"
                    sx={{ marginTop: 4 }}
                    required
                    fullWidth
                    id="search"
                    label="Search"
                    name="search"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    autoFocus
                />
                <Button sx={{ marginTop: 4 }} fullWidth variant="contained" onClick={() => searchingHandler(value)}>Search</Button>
            </Box>
        </Modal>
  )
}

export default SearchModal