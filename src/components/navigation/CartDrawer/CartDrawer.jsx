import { Box, Button, Drawer, Grid, Typography, IconButton, CircularProgress} from '@mui/material';
import { CartContext } from 'context/CartContext';
import { GlobalContext } from 'context/GlobalContext'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import React, { useContext } from 'react';
import './CartDrawer.css';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const CartDrawer = () => {
    const { isDrawerOpen, handleDrawer } = useContext(GlobalContext);
    const { cart, updateQuantity, removeItem, isUpdatingCart } = useContext(CartContext);

    const quantityUpdater = (quantity) => {
        return (
            <div className='quantity_updater'>
                <ExpandMoreIcon className={`cart_icon ${quantity.quantity === 0 ? 'cart_icon_disable' : ''}`} onClick={() => updateQuantity(quantity.id, 'minus')} />
                <div className='quantity'>{quantity.quantity}</div>
                <ExpandLessIcon className='cart_icon' onClick={() => updateQuantity(quantity.id, 'plus')} />
            </div>
        )
    }

    const articlesList = () => {
        return cart?.articlesCart.map(item => {
            return (
                <Grid container className='cart_article' padding={2} key={item.id}>
                    <Grid item xs={4} md={3.2}>
                        <div className='cart_article_image_container'>
                            <CloseIcon className='cart_delete_icon' color='#FFF' onClick={() => removeItem(item.id)} />
                            <img alt={item?.article?.reference} src={`https://source.unsplash.com/random/?article,shoes,` + item?.article?.reference} />
                        </div>
                    </Grid>
                    <Grid item xs={8} md={8.8}>
                        <div className='cart_article_details'>
                            <Typography textAlign="left" fontWeight="200" color={"#777"} fontSize={14}>{item.article.reference}</Typography>
                            <Typography textAlign="left" fontWeight="600">{`${item.quantity} x ${item.article.designation}`}</Typography>
                            {quantityUpdater(item)}
                            <Typography textAlign="right" fontWeight="600" color="primary">{`${(item.quantity * item.article.prix).toFixed(2)} DH`}</Typography>
                        </div>
                    </Grid>
                </Grid>
            )
        })
    }

    const subTotal = cart?.articlesCart?.reduce((acc, curr) => acc + (curr.quantity * curr.article.prix), 0) || 0;

  return (
    <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={handleDrawer}
        PaperProps={{
            sx: {
              backgroundColor: "#e8e8e8",
            }
          }}
        >
            <Box
                sx={{ width: 500 }}
                role="presentation"
            >
                <div className='drawer_header'>
                    <Grid container>
                        <Grid item xs={8} md={10.5}>
                            <div className='left_header'>
                                <ShoppingCartIcon className='cart_icon' color='primary' />
                                <Typography ml={2} textAlign="left" fontWeight="100">Cart</Typography>
                            </div>
                        </Grid>
                        <Grid item xs={4} md={1.5}>
                            <div className='right_header'>
                                <Button size="small" color='primary' style={{ height: '100%' }} onClick={handleDrawer}>
                                    <CloseIcon className='cart_icon' color='#777' />
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                </div>

                {
                    isUpdatingCart ? (
                        <Box mt={5} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <div className='drawer_body'>
                            {
                                cart?.articlesCart?.length > 0 ? articlesList() : (
                                    <Typography textAlign='center' mt={2} fontWeight="100" color="#777">No Articles added to cart</Typography>
                                )
                            }
                        </div>
                        )
                    }
                {!isUpdatingCart && (cart?.articlesCart?.length > 0) && (<div className='drawer_footer'>
                    <Typography textAlign='left' fontWeight="200" color="#777">Sub-total</Typography>
                    <Typography textAlign='right' fontWeight="600" fontSize={20}>{subTotal?.toFixed(2)} Dh</Typography>
                </div>)}
            </Box>
    </Drawer>
  )
}

export default CartDrawer