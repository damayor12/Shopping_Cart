// import React from 'react'

import { useEffect, useState } from "react";
import { Button, Col, Form, FormControl, Image, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { CartState } from "../context/Context";
import Rating from "./Rating";






const Cart = () => {

  const {
    state: { cart },
    dispatch,
  } = CartState();
  console.log('Current state', cart)
  const [total, setTotal] = useState();

  useEffect(() => {
    setTotal(cart.reduce((acc, current) => acc + Number(current.price) * current.qty, 0));
  }, [cart]);

  
  return (
    <div className="home">
      <div className="productContainer" style={{ paddingTop: 10 }}>
        <ListGroup>
          {cart.map((prod) => (
            <ListGroup.Item key={prod.id}>
              <Row>
                <Col md={2}>
                  <Image src={prod.image} alt={prod.name} fluid rounded />
                </Col>
                <Col md={2}>
                  $ <span>{prod.name}</span>
                </Col>
                <Col md={2}>
                  <span>{prod.price}</span>
                </Col>
                <Col md={2}>
                  <span>
                    <Rating rating={prod.ratings} />
                  </span>
                </Col>
                <Col md={2}>
                  <Form.Control 
                  as="select" 
                  value={prod.qty}
                  onChange={(e) => 
                    dispatch({
                      type: 'CHANGE_CART_QTY',
                      payload: {
                        id: prod.id,
                        qty: e.target.value
                    },
                  })}
                   >
                    {[...Array(prod.inStock)].map((_, x) => (
                      <option key={x + 1}>{x + 1}</option>
                    ))}
                  </Form.Control>
                </Col>
                <Col md={2}>
                  <Button
                    type="button"
                    variant="light"
                    onClick={()=> 
                      dispatch({
                       type: "REMOVE_FROM_CART",
                       payload: prod
                    })}
                    >
                    <AiFillDelete fontSize="20px"/>
                  </Button>
                  
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <div className="filters summary">
        <span className="title">Subtotal {cart.length} items</span>
        <span style={{ fontWeight: 700, fontSize: 20 }}> Total: $ {total}</span>
        <Button type="button" disabled={cart.length === 0}>
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
}

export default Cart