import React from 'react';
import AddToCart from "./AddToCart";

interface User {
    id: number;
    name: string;
}

const ProductCard = async () => {

    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    const users: User[] = await response.json();

  return (
    <div>
        <AddToCart />
        <ul>

        {
            users.map(d => <li key={d.id}>{d.name}</li>)
        }
        </ul>
    </div>
  )
}

export default ProductCard