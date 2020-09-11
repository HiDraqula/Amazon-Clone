import React, { forwardRef } from 'react';
import './CheckoutProduct.css'
import { useStateValue } from "../StateProvider";

import StarIcon from '@material-ui/icons/Star';


const CheckoutProduct = forwardRef(({ id, image, title, price, rating, hideButton }, ref) => {
    // function CheckoutProduct({ id, image, title, price, rating, hideButton }) {
    const [{ basket }, dispatch] = useStateValue();

    const removeFromBasket = () => {
        // remove the item from the basket
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: id,
        })
    }

    return (
        <div className='checkoutProduct' ref={ref}>
            <img className='checkoutProduct__image' src={image} />

            <div className='checkoutProduct__info'>
                <p className='checkoutProduct__title'>{title}</p>
                <p className="checkoutProduct__price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
                <div className="checkoutProduct__rating star">
                    {Array(rating)
                        .fill()
                        .map((_, i) => (
                            <StarIcon key={i} />
                            // <p key={i}>⭐</p>
                        ))}
                </div>
                {!hideButton && (<button className="accent-btn" onClick={removeFromBasket}>Remove from Basket</button>)}
            </div>
        </div>
    )
})

export default CheckoutProduct
