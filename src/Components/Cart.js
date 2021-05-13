// --aqui ira todo lo de la comanda
import React, { Fragment } from 'react'
import './Cart.css'
import ProductCard from './ProductCard'

const Cart = ({cart, setCart, product}) => {

  // definiendo variables para hacer la suma
  const productPrice = cart.reduce((subtotal, currentProduct) => subtotal + currentProduct.price * currentProduct.qty, 0);
  const taxPrice = productPrice * 0.16;
  const totalPrice = productPrice + taxPrice;

  const createOrder = () => {
    // console.log("product inside create Order", products)
    // const userObject = JSON.parse(localStorage.getItem('access'));
    localStorage.setItem('pedido', JSON.stringify(cart));
    console.log('pedido', cart);

  }

  const handleSubmit= (e)=>{
    e.preventDefault()
    axios.post('http://localhost:8080/order', {
      id_user,
      client,
      productid,
      qty
    }).then(response => {
      console.log('axios post order response:', response)
      if (response.data.status = 200){
        console.log('axios orden:', response.data)
        localStorage.setItem('orden creada', JSON.stringify(response.data))
      }else {
        console.log('error, no pude hacer pedido')
      }
      authHeader()
    })
  }






  return (
    <div className='cart-content'>
      <h3>soy la comanda</h3>
      {cart.length === 0 ?(<div>orden vacia</div>) : (cart.map((product => <ProductCard key={product._id} product={product} cart={cart} setCart={setCart} /> )))}
      {cart.length !== 0 &&(
            <Fragment>
            <div>
            <div>Precio productos</div>
            <div>${productPrice.toFixed(2)}</div>
            </div>
            <div>
            <div>Precio IVA</div>
            <div>${taxPrice.toFixed(2)}</div>
            </div>
            <div>
            <div><strong>TOTAL</strong></div>
            <div>${totalPrice.toFixed(2)}</div>
            </div>
            {/* <div className=''>
              <button onClick={() => alert('POR AHORA UN CHECKOUT')}>Enviar a Cocina</button>
            </div> */}
            </Fragment>
          )}
          {cart.length > 0 &&(
            <div >
              <button type= 'submit' onClick={() => createOrder(product)}>Hacer pedido</button>
            </div>
          )}

    </div>
  )
}

export default Cart
