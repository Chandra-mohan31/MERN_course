import React,{useState,useEffect} from 'react';
import "../styles.css";
import {API} from "../backend";
import Base from "./Base";
import Card from './Card';
import { loadCart } from './helper/carthelper';


function Cart() {

    
    const [products,setProducts] = useState([]);

    const [reload, setReload] = useState(false);

    useEffect(()=>{
        setProducts(loadCart())
    },[reload])

    const loadAllProducts = () => {
        return(
        <div>
            <h2>This is to load products</h2>
            {products.map((product,index)=>{
                return(
                    <Card key={index} product={product} removeFromCart={true} addToCart={false} setReload={setReload} reload={reload} />
                )

            })}
        </div>
        )
    }

    const loadCheckout  = () => {
        return(
            <div>
            <h2 className="text-white">This is for checkout</h2>
            </div>
        )
        
    }


    return (
        <Base footerstyle={{positon:"absolute",bottom: 0,right: 0,left: 0}} title="Cart Page" description="ready for the checkout">
            <div className="row text-white">
            
                <div className="col-6">{loadAllProducts()}</div>
                <div className="col-6">{loadCheckout()}</div>
            </div>
        </Base>
    )
}

export default Cart