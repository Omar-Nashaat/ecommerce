import React, { useContext } from 'react'
import { useQuery } from 'react-query';
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import Loader from '../Loader/Loader';
import axios from 'axios';
import { counterContext } from '../../Context/second';
import Slider from 'react-slick';

export default function ProductDetails() {

    const { addProductTCart } = useContext(counterContext)

    const { id } = useParams();

    function getProductDetails() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    }

    const { isLoading, data, isError, isFetching } = useQuery(`productDetails+${id}`, getProductDetails)

    if (isLoading) {
        return <Loader />
    }

    if (isError) {
        return <Navigate to='/notFound' />
    }

    const productData = data.data.data;

    async function addProduct(id) {
        await addProductTCart(id);
    }

    const settings = {
        dots: true,
        fade: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        waitForAnimate: false
      };

    return <>
        <div className="container">
            <div className="row align-items-center">
                <div className="col-md-3">
                    <figure>
                        {/* <img src={productData.imageCover} alt={productData.title} className='w-100' /> */}
                        <Slider {...settings}>
                            {productData.images.map((img,index)=>(
                                <img
                                key={index}
                                src={img}
                                alt={`slide ${index}`}
                                className='w-100 cursor-pointer'
                                />
                            ))}
                        </Slider>
                    </figure>
                </div>
                <div className="col-md-9">
                    <figcaption>
                        <div className='d-flex justify-content-between'>
                            <div>
                                <h2>{productData.title}</h2>
                                <p>{productData.description}</p>
                            </div>
                            <div>
                                <p><button className='btn btn-success mt-4'>Price : {productData.price} LE</button></p>
                                <p><button className='btn btn-danger'>Rating : {productData.ratingsAverage} <i className="fa-solid fa-star pt-1 ps-1" style={{ color: '#FFD43B' }} /></button></p>
                            </div>
                        </div>
                        <button className='btn btn-success w-100' onClick={() => addProduct(productData.id)}>Add to cart +</button>
                    </figcaption>
                </div>
            </div>
        </div>
    </>
}
