const express = require('express');
const app = express();
const PORT = 3000;


app.use(express.json());


let products = [];
let autoIncrementId = 1;


app.get('/api/products', (req, res) => {
    res.status(200).json({
        message: "Berhasil mengambil data produk",
        data: products
    });
});


app.get('/api/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);

    if (!product) {
        return res.status(404).json({ message: "Produk tidak ditemukan" });
    }

    res.status(200).json({
        message: "Berhasil mengambil detail produk",
        data: product
    });
});

app.post('/api/products', (req, res) => {
    const { name, price, stock, category } = req.body;

    if (!name || price === undefined || stock === undefined || !category) {
        return res.status(400).json({ message: "Semua field (name, price, stock, category) wajib diisi!" });
    }

    const newProduct = {
        id: autoIncrementId++, 
        name: name,
        price: price,
        stock: stock,
        category: category
    };

    products.push(newProduct);

    res.status(201).json({
        message: "Produk berhasil ditambahkan",
        data: newProduct
    });
});

app.put('/api/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const { price, stock } = req.body;

    
    const product = products.find(p => p.id === productId);

    if (!product) {
        return res.status(404).json({ message: "Produk tidak ditemukan" });
    }
    if (price !== undefined) {
        product.price = price;
    }
    if (stock !== undefined) {
        product.stock = stock;
    }
    res.status(200).json({
        message: "Produk berhasil diupdate",
        data: product
    });
});

app.delete('/api/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex(p => p.id === productId);

    if (productIndex === -1) {
        return res.status(404).json({ message: "Produk tidak ditemukan" });
    }
    const deletedProduct = products.splice(productIndex, 1);

    res.status(200).json({
        message: "Produk berhasil dihapus",
        data: deletedProduct[0]
    });
});


app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});