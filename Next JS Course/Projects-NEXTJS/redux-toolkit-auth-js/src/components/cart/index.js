"use client"

import { useDispatch, useSelector } from "react-redux"
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { removeFromCart } from "@/store/slices/cart-slice";

export default function cart ()
{
  const {
    cart
  } = useSelector((state) => state);
  const dispatch=useDispatch();

  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    setTotalAmount(cart.cartItems.reduce((acc, curr) => acc + curr?.price, 0))
  }, cart.cartItems)

  if (!cart?.cartItems.length) return < h1 className = "text-4xl font-sans font-extrabold p-10 text-center" > Cart Is Empty </h1>

function handleRemoveFromCart(getCurrentItemsId){
  dispatch(removeFromCart(getCurrentItemsId));
}

return <div className="bg-white">
  <div className=" max-w-7xl mx-auto ">
    <h2 className="text-3xl font-extrabold text-[#333]">Cart</h2>
<div className="overflow-y-auto">

  <table className="  border-collapse mt-12 w-full">
    <thead > 
      <tr>
      <th className="text-base text-gray-700 p-4">Title</th>
      <th >Price</th>
      <th >Remove</th>
      </tr>
      </thead>
      <tbody className="whitespace-nowrap divide-y">
        {cart?.cartItems.map((items)=><tr>
          <td className="py-5 px-4">
            <div className="flex items-center gap-6 w-max">
              <div className="h-36 shrink-0">
                <img src={items.thumbnail} alt={items.title} className="w-full h-full object-contain"></img>
              </div>
          <div>
            <p className="text-lg font-bold text-black">{items.title}</p>
          </div>
          </div>

          </td>
          <td><p>{items.price}</p></td>
          <td><Button onClick={()=>handleRemoveFromCart(items.id)}>Remove</Button></td>
        </tr>)}
      </tbody>  
      </table>
      <div className="max-w-xl ml-auto">
      <p className="text-lg font-bold">Total = <span>{totalAmount}</span></p>
      </div>
</div>

  </div>
   
</div>
}
