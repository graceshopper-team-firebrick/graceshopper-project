import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router'
import { fetchBook } from '../store/SingleProduct';
import {addItem, setCounter} from "../store/Cart"

/**
 * COMPONENT
 */
export const SingleProduct = () => {

  // User and cart information
  const user = useSelector((state) => state.auth);
  const books = useSelector((state) => state.cart);

  // this will get the id from router '/products/:productId'
  const productId = useParams().productId;
  const book = useSelector(state => state.singleProduct);

  //next step fetch single book with dispatch.

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBook(productId))
  }, [dispatch]);

  return (
    <div className='container col-md-6 mt-5'>
        <div className='row'>
        <div className='col-3 mb-2'>
        <img
        src={book.cover} />
        </div>
        <div className='col ms-5'>
        <p>{'Author : '+book.author}</p>
        <h3 >{book.title}</h3>
        </div>
        <div>
        {/* <a className="btn btn-info text-white">Add To Cart</a> */}
        <a className="btn btn-info text-white me-2" onClick={() => {
              dispatch(addItem(user.id,book,1))
              dispatch(setCounter(books))
            }}>Add To Cart</a>
        <div style={{ display: "inline-block"}}>
        <span className="col ms-2 price badge rounded-pill bg-warning text-dark d-flex align-items-center" style={{ height: "55px"}}>
          {"$"}
          {Number.parseFloat(book.price).toFixed(2)}
        </span>
        </div>
        </div>

        </div>


    </div>
  )
}


export default SingleProduct;
