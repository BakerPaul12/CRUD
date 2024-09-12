import React, { useState } from 'react';
import axios from 'axios';

const ProductForm = ({ onSave }) => {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: 0
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8080/api/products', product)
            .then(response => {
                console.log("Product added successfully:", response.data);
                setProduct({ name: '', description: '', price: 0 }); // Resetowanie formularza
                onSave(); // Wywołanie funkcji, aby odświeżyć listę produktów
            })
            .catch(error => {
                console.error("There was an error adding the product!", error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Product name"
                value={product.name}
                onChange={(e) => setProduct({ ...product, name: e.target.value })}
                required
            />
            <input
                type="text"
                placeholder="Description"
                value={product.description}
                onChange={(e) => setProduct({ ...product, description: e.target.value })}
                required
            />
            <input
                type="number"
                placeholder="Price"
                value={product.price}
                onChange={(e) => setProduct({ ...product, price: e.target.value })}
                required
            />
            <button type="submit">Add Product</button>
        </form>
    );
};

export default ProductForm;
