import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { counterContext } from '../../Context/second';
import Loader from '../Loader/Loader';
import EmptyAnimation from '../EmtyAnimation/EmptyAnimation';
import { wishContext } from '../../Context/wishlist';

export default function UserAllOrders() {

    const [UserAllOrders, setUserAllOrders] = useState(null)
    const { userId } = useContext(wishContext)

    function getUserOrders() {
        const userId = localStorage.getItem("userID")
        axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
            .then((res) => {
                setUserAllOrders(res.data)
                console.log(res.data)
            }).catch((err) => {
                console.log("failed", err);
            })
    }

    useEffect(() => {
        getUserOrders();
    }, [])

    if (!UserAllOrders) {
        return <Loader />
    }

    return <>
        <div className="container">
            <div>
                <h1 className='mt-2 text-center'>All Your Orders</h1>
                <div className='d-flex justify-content-between container'>
                </div>
                <hr />
                <div className="container text-center">
                    <div className='row'>
                        {UserAllOrders.map((order, idx) => <div key={idx} className="col-md-4">
                            <div className='bg-body-secondary order m-2 p-2'>
                                <h5><i className="fa-solid fa-clock pe-2"></i>Order Date : {order.createdAt.slice(0, 10)}</h5>
                                <h5><i class="fa-solid fa-hand-holding-dollar pe-2"></i>Total Price : {order.totalOrderPrice}</h5>
                                <h5><i class="fa-solid fa-list-ol pe-2"></i>Number of items : {order.cartItems.length}</h5>
                                <h5><i class="fa-solid fa-credit-card pe-2"></i>Payment Method : {order.paymentMethodType}</h5>
                            </div>
                        </div>)}
                    </div>
                </div>
            </div>
        </div >
    </>
}
