import React from 'react';

const ProductItem = ({ product, onEdit, onDelete }) => {
    return (
        <li>
            <div>
                <strong>{product.name}</strong> - ${product.price}
            </div>
            <div>
                <button onClick={() => onEdit(product)}>Edit</button>
                <button onClick={() => onDelete(product.id)}>Delete</button>
            </div>
        </li>
    );
};

export default ProductItem;
