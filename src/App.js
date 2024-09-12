import React, { useState } from 'react';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';

const App = () => {
    const [refresh, setRefresh] = useState(false);

    const handleSave = () => {
        setRefresh(!refresh);
    };

    return (
        <div>
            <ProductForm onSave={handleSave} />
            <ProductList key={refresh} /> {}
        </div>
    );
};

export default App;
