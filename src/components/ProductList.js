import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        axios.get('http://localhost:8080/api/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the products!", error);
            });
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/api/products/${id}`)
            .then(() => {
                fetchProducts(); // Odśwież listę produktów po usunięciu
            })
            .catch(error => {
                console.error("There was an error deleting the product!", error);
            });
    };

    const handleUpdate = (product) => {
        setEditingProduct(product);
    };

    const handleSaveEdit = () => {
        axios.put(`http://localhost:8080/api/products/${editingProduct.id}`, editingProduct)
            .then(() => {
                setEditingProduct(null); // Zamknij tryb edycji
                fetchProducts(); // Odśwież listę produktów
            })
            .catch(error => {
                console.error("There was an error updating the product!", error);
            });
    };

    return (
        <div>
            <h2>Product List</h2>
            <ul>
                {products.length > 0 ? (
                    products.map(product => (
                        <li key={product.id}>
                            {product.name} - ${product.price}
                            <button onClick={() => handleUpdate(product)}>Edit</button>
                            <button onClick={() => handleDelete(product.id)}>Delete</button>
                        </li>
                    ))
                ) : (
                    <p>No products available</p>
                )}
            </ul>
            {editingProduct && (
                <div>
                    <h3>Edit Product</h3>
                    <input
                        type="text"
                        value={editingProduct.name}
                        onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    />
                    <input
                        type="text"
                        value={editingProduct.description}
                        onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                    />
                    <input
                        type="number"
                        value={editingProduct.price}
                        onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                    />
                    <button onClick={handleSaveEdit}>Save</button>
                    <button onClick={() => setEditingProduct(null)}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default ProductList;
