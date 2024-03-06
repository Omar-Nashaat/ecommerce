import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { tokenContext } from './token';
import Loader from '../Components/Loader/Loader';


export const counterContext = createContext();
export default function SecondProvider({ children }) {

    const { token } = useContext(tokenContext);
    const [numOfCartItems, setNumOfCartItems] = useState(0)
    const [totalCartPrice, setTotalCartPrice] = useState(0)
    const [allProducts, setAllProducts] = useState(null)
    const [cartId, setCartId] = useState(null)
    const [userId, setUserID] = useState(null)


    function addProductTCart(id) {
        axios.post('https://ecommerce.routemisr.com/api/v1/cart', {
            "productId": id
        }, {
            headers: { token: localStorage.getItem('tkn') }
        }).then((res) => {
            toast.success('Added to cart', { duration: 2000, position: 'top-center' })
            getUserCart();

            return true;
        }).catch((err) => {
            toast.error('Error occured', { duration: 2000, position: 'top-center' });

            return false;
        })
    }

    function getUserCart() {
        axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
            headers: { token: localStorage.getItem('tkn') }
        }).then((res) => {
            setAllProducts(res.data.data.products);
            setNumOfCartItems(res.data.numOfCartItems);
            setTotalCartPrice(res.data.data.totalCartPrice);
            setCartId(res.data.data._id);
            setUserID(res.data.datacartOwner);
            localStorage.setItem("userID",res.data.data.cartOwner);
            // console.log(res.data);

        }).catch((err) => {
            // console.log('failed', err);
            <Loader />
        })
    }

    async function updateCount(id, newCount) {
        const booleanFlag = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
            "count": newCount
        }, {
            headers: {
                token: localStorage.getItem("tkn")
            }
        }).then((res) => {
            setTotalCartPrice(res.data.data.totalCartPrice);
            setNumOfCartItems(res.data.numOfCartItems);
            setAllProducts(res.data.data.products);

            return true;
        }).catch((err) => {
            return false;
        })

        return booleanFlag;
    }

    function deleteProduct(id) {
        const booleanFlag = axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
            headers: {
                token: localStorage.getItem("tkn")
            }
        }).then((res) => {
            setAllProducts(res.data.data.products);
            setNumOfCartItems(res.data.numOfCartItems);
            setTotalCartPrice(res.data.data.totalCartPrice);

            return true;
        }).catch((err) => {
            return false;
        })

        return booleanFlag;
    }

    function clearCart() {
        const booleanFlag = axios.delete('https://ecommerce.routemisr.com/api/v1/cart/', {
            headers: {
                token: localStorage.getItem("tkn")
            }
        }).then(() => {
            setAllProducts([]);
            setNumOfCartItems("");
            setTotalCartPrice(0);
            return true;
        }).catch(() => {
            return false;
        })

        return booleanFlag;
    }

    useEffect(() => {
        getUserCart();
    }, []);

    return <counterContext.Provider value={{
        numOfCartItems,
        totalCartPrice,
        allProducts,
        addProductTCart,
        getUserCart,
        updateCount,
        deleteProduct,
        clearCart,
        cartId,
    }}>
        {children}
    </counterContext.Provider>
}