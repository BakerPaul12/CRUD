import React, { useState } from 'react';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';

const App = () => {
    const [refresh, setRefresh] = useState(false);

    const handleSave = () => {
        setRefresh(!refresh); // Toggle refresh state to trigger re-render
    };

    return (
        <div>
            <ProductForm onSave={handleSave} />
            <ProductList key={refresh} /> {/* Use key to force re-render */}
        </div>
    );
};

export default App;
