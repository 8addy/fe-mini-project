import {
  Button,
  CircularProgress,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./SingleArticle.css";
import { CartContext } from "context/CartContext";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import { ADMIN_ROLE_ID, CLIENT_ROLE_ID } from "constants/constants";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const generateImage = `https://source.unsplash.com/random/?article,shoes,`;

const SingleArticle = (props) => {
  const { article, roleId, editArticle, deleteArticle } = props;
  const { addItem, isUpdatingCart } = useContext(CartContext);

  return (
    <Grid item xs={6} md={3}>
      {article ? (
        <div className="single_article_container">
          <div className="article_image_container">
            <img
              alt={article.reference}
              src={generateImage + article.reference}
            />
            {article.quantity > 0 ? (
              <div>{article.quantity}</div>
            ) : (
              <div>
                <DoNotDisturbAltIcon /> Out of stock
              </div>
            )}
          </div>
          <div className="article_details_container">
            <Typography
              textAlign="left"
              fontWeight="200"
              color={"#777"}
              fontSize={14}
            >
              {article.reference}
            </Typography>
            <Typography textAlign="left" fontWeight="100">
              {article.designation}
            </Typography>
            <div className="article_details_container_footer">
              <Typography textAlign="left" fontWeight="600" color="primary">
                {article.prix.toFixed(2)} DH
              </Typography>
              {roleId === CLIENT_ROLE_ID && (
                <Button
                  disabled={isUpdatingCart || !(article.quantity > 0)}
                  sx={{ marginTop: 1 }}
                  onClick={() => addItem(article)}
                  aria-label="add to cart"
                  size="small"
                  variant="outlined"
                  color="primary"
                >
                  Add to cart{" "}
                  {isUpdatingCart ? (
                    <CircularProgress size={25} className="cart_icon" />
                  ) : (
                    <ShoppingCartIcon className="cart_icon" />
                  )}
                </Button>
              )}
            </div>
            {roleId === ADMIN_ROLE_ID && (
              <div className="footer_admin_btns">
                <Button
                  sx={{ marginRight: 1 }}
                  startIcon={<EditIcon sx={{ color: "#FFF" }} />}
                  style={{ background: "green", color: "#FFF" }}
                  onClick={editArticle}
                >
                  Edit
                </Button>
                <Button
                  startIcon={<DeleteIcon sx={{ color: "#FFF" }} />}
                  style={{ background: "red", color: "#FFF" }}
                  onClick={deleteArticle}
                >
                  Remove
                </Button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          <Skeleton
            sx={{ borderTopLeftRadius: 5, borderTopRightRadius: 5 }}
            height={200}
            variant="rectangular"
          />
          <Skeleton sx={{ marginTop: 0.3 }} height={63} variant="rectangular" />
        </>
      )}
    </Grid>
  );
};

export default SingleArticle;
