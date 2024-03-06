import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from './images/freshcart-logo.svg'
import { counterContext } from '../../Context/second';
import { tokenContext } from '../../Context/token';
import { useSelector } from 'react-redux';
import { wishContext } from '../../Context/wishlist';


export default function Navbar() {

  let nav = useNavigate()

  const { counter, numOfCartItems } = useContext(counterContext);
  const { numOfWishItems } = useContext(wishContext);
  const { token, setToken } = useContext(tokenContext);

  function logOut() {
    localStorage.removeItem("tkn")
    setToken(null)
    nav("/login")
  }

  // const { length } = useSelector(function (store) { return store.cartCounter })

  return <>

    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <Link className="navbar-brand" to={'home'}>
          <img src={logo} alt="logo" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {token ? <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to={'home'}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to={'home'}>Products</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to={'categories'}>Categroies</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to={'brands'}>Brands</Link>
            </li>

            {token ? <li className="nav-item position-relative">
              <Link className="nav-link" aria-current="page" to={'wishlist'}>Wishlist</Link>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {numOfWishItems ? numOfWishItems : ""}
              </span>
            </li> : null}

            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to={'allOrders'}>All Orders</Link>
            </li>

          </ul> : null}

        </div>
        <ul className='ms-auto navbar-nav align-items-center gap-1'>
          {token ? <li className="nav-item position-relative">
            <Link className="nav-link" aria-current="page" to={'cart'}><i className="fa-solid fa-cart-shopping fs-5 text-main"></i></Link>
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {numOfCartItems ? numOfCartItems : ""}
            </span>
          </li> : null}

          <li className="nav-item">
            <i className="fa-brands fa-instagram m-2"></i>
            <i className="fa-brands fa-facebook m-2"></i>
            <i className="fa-brands fa-tiktok m-2"></i>
            <i className="fa-brands fa-twitterm-2"></i>
            <i className="fa-brands fa-linkedin m-2"></i>
            <i className="fa-brands fa-youtube m-2"></i>
          </li>

          {!token ? <><li className="nav-item">
            <Link className="nav-link" aria-current="page" to={'login'}>Login</Link>
          </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to={'register'}>Register</Link>
            </li></> : null}
          {token ? <li className="nav-item">
            <button className="nav-link" onClick={logOut}>SignOut</button>
          </li> : null}
        </ul>
      </div>
    </nav>


  </>
}
