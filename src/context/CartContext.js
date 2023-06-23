import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [cart, setCart] = useState(null);
    const [isUpdatingCart, setUpdatingCart] = useState(false);

    const fetchCart = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/cart`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${user?.accessToken}`
                }
            });
            if (response.ok) {
                const result = await response.json();
                setCart(result?.active ? result : []);
            }
          } catch (error) {
            console.log(error);
            return false;
          }
    }

    const updateCart = async (updatedArticlesCart) => {
        try {
            let link = "http://localhost:8080/api/v1/cart/";
            if (cart?.id) link = link + cart.id;
            console.log('2', cart.articlesCart);
            const response = await fetch(link, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?.accessToken}`
                },
                body: JSON.stringify({
                    articlesCart: updatedArticlesCart ? updatedArticlesCart : cart.articlesCart
                })
            });
            if (response.ok) {
                const result = await response.json();
                console.log(result);
                setCart(result?.active ? result : []);
            }
          } catch (error) {
            console.log(error);
            return false;
          } finally {
            setUpdatingCart(false);
          }
    }

    const updateQuantity = async (id, type = "plus") => {
        setUpdatingCart(true);
         const articlesCart = cart.articlesCart.map(item => {
            if (item.id !== id) return item;
            else {
                let quantity = item.quantity;
                if (quantity === 0 && type === "minus") return item;
                quantity = type === "plus" ? quantity + 1 : quantity - 1;
                return {
                    ...item,
                    quantity
                }
            }
         });
         updateCart(articlesCart);
    }

    const addItem = async (article) => {
        setUpdatingCart(true);
        let articlesCart = {...cart?.articlesCart};
        if (articlesCart?.length > 0) {
            const isArticleInCart = articlesCart.find(item => item.article.id === article.id);
            if (isArticleInCart) {
                articlesCart = articlesCart.map(item => {
                    if(item.article.id === article.id) {
                        return {
                            ...item,
                            quantity: item.quantity + 1
                        }
                    } else return item;
                })
            } else {
                let newItem = {
                    id: new Date().getMilliseconds(),
                    article,
                    quantity: 1
                };
                if (cart.id) {
                    newItem['cartId'] = cart.id;
                }
                articlesCart.push(newItem);
            }
        } else articlesCart = [{
            id: new Date().getMilliseconds(),
            article,
            quantity: 1
        }];
        return updateCart(articlesCart);
    }

    const removeItem = async (id) => {
        try {
            setUpdatingCart(true);
            const response = await fetch(`http://localhost:8080/api/v1/cart/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${user?.accessToken}`
                }
            });
            if (response.ok) {
                const result = await response.json();
                console.log(result);
                setCart(result?.active ? result : []);
            }
          } catch (error) {
            console.log(error);
            return false;
          } finally {
            setUpdatingCart(false);
          }
    }

    useEffect(() => {
        if (user?.accessToken) {
            fetchCart();
        }
    }, [user])
    

    return <CartContext.Provider value={{ cart, isUpdatingCart, updateQuantity, addItem, removeItem }}>{children}</CartContext.Provider>
}