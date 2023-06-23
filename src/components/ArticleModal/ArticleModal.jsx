import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ArticleModal = (props) => {
  const { isArticleModalOpen, closeModal, articleToUpdate, user, updateStateArticle, deleteArticleId } = props;

  const [details, setDetails] = useState({
    reference: "",
    designation: "",
    prix: "",
    quantity: "",
  });
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (articleToUpdate) {
      setDetails({ ...articleToUpdate });
    }
  }, [articleToUpdate]);

  const updateFields = (e) =>
    setDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
      try {
          setUpdating(true);
          let url = "http://localhost:8080/api/v1/articles/";
          if (!articleToUpdate) url = url + "new";
          else url = url + `${articleToUpdate.id}`;
          const response = await fetch(url, {
              method: articleToUpdate ? 'PUT' : 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${user?.accessToken}`
              },
              body: JSON.stringify(details)
          });
          if (response.ok) {
              const result = await response.json();
              if(articleToUpdate) updateStateArticle(result);
              closeModal();
              return true;
          } else return false;
        } catch (error) {
          console.log(error);
          return false;
        } finally {
          setUpdating(false);
        }
  };

  const handleDelete = async () => {
    try {
        setUpdating(true);
        let url = `http://localhost:8080/api/v1/articles/${deleteArticleId}`;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user?.accessToken}`
            }
        });
        if (response.ok) {
            updateStateArticle(null, deleteArticleId);
            closeModal();
            return true;
        } else return false;
      } catch (error) {
        console.log(error);
        return false;
      } finally {
        setUpdating(false);
      }
  }

  const formBox = () => {
     return (
     <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h4"
          textAlign="left"
        >
          Add new article
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          name="reference"
          label="Reference"
          type="text"
          id="reference"
          value={details.reference}
          onChange={updateFields}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="designation"
          label="Designation"
          type="text"
          id="designation"
          value={details.designation}
          onChange={updateFields}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="prix"
          label="Price"
          type="number"
          id="prix"
          value={details.prix}
          onChange={updateFields}
          InputProps={{ inputProps: { min: 0 } }}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="quantity"
          label="Quantity"
          type="number"
          id="quantity"
          value={details.quantity}
          onChange={updateFields}
          InputProps={{ inputProps: { min: 0 } }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleSubmit}
        >
          {articleToUpdate ? "Save" : "Add"}
        </Button>
      </Box>
     )
  }

  const confirmDelete = () => {
    return (
      <Box sx={style}>
        <Typography
          variant="h6"
          component="h4"
          textAlign="left"
        >
          Removing Article with ID: {deleteArticleId}
        </Typography>
        <Typography
          variant="h6"
          component="h6"
          textAlign="left"
        >
          Are you sure?
        </Typography>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="remove_confirmation_btns">
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2, mx: 4, background: '#777' }}
            onClick={closeModal}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2, mx: 4, background: 'red' }}
            onClick={handleDelete}
          >
            Yes
          </Button>
        </div>
    </Box>
    )
  }

  return (
    <Modal
      open={isArticleModalOpen}
      onClose={updating ? null : closeModal}
      aria-labelledby="modal-modal-article"
    >
      {deleteArticleId ? confirmDelete() : formBox()}
    </Modal>
  );
};

export default ArticleModal;
