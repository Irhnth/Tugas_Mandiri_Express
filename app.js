const express = require('express');
const app = express();
const PORT = 3000;

// Middleware agar Express bisa membaca request body berformat JSON
app.use(express.json());

// Simulasi Tabel Produk menggunakan Array
let products = [];
let autoIncrementId = 1;

// ==========================================
// ENDPOINTS
// ==========================================

// 1. GET /api/products : Menampilkan semua produk
app.get('/api/products', (req, res) => {
    res.status(200).json({
        message: "Berhasil mengambil data produk",
        data: products
    });
});

// GET /api/products/:id : Menampilkan SATU produk berdasarkan ID
app.get('/api/products/:id', (req, res) => {
    // Tangkap ID dari URL dan ubah menjadi angka (integer)
    const productId = parseInt(req.params.id);
    
    // Cari produk di dalam array berdasarkan ID
    const product = products.find(p => p.id === productId);

    // Jika produk tidak ditemukan, kirim status 404 (Not Found)
    if (!product) {
        return res.status(404).json({ message: "Produk tidak ditemukan" });
    }

    // Jika ditemukan, kirim data produk tersebut
    res.status(200).json({
        message: "Berhasil mengambil detail produk",
        data: product
    });
});

// 2. POST /api/products : Menambah produk baru
app.post('/api/products', (req, res) => {
    const { name, price, stock, category } = req.body;

    // Validasi input sederhana
    if (!name || price === undefined || stock === undefined || !category) {
        return res.status(400).json({ message: "Semua field (name, price, stock, category) wajib diisi!" });
    }

    const newProduct = {
        id: autoIncrementId++, // Auto Increment
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

// 3. PUT /api/products/:id : Mengupdate data produk (Harga/Stok)
app.put('/api/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const { price, stock } = req.body;

    // Cari produk berdasarkan ID
    const product = products.find(p => p.id === productId);

    if (!product) {
        return res.status(404).json({ message: "Produk tidak ditemukan" });
    }

    // Update harga jika ada di request body
    if (price !== undefined) {
        product.price = price;
    }
    
    // Update stok jika ada di request body
    if (stock !== undefined) {
        product.stock = stock;
    }

    res.status(200).json({
        message: "Produk berhasil diupdate",
        data: product
    });
});

// 4. DELETE /api/products/:id : Menghapus produk berdasarkan ID
app.delete('/api/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    
    // Cari index produk
    const productIndex = products.findIndex(p => p.id === productId);

    if (productIndex === -1) {
        return res.status(404).json({ message: "Produk tidak ditemukan" });
    }

    // Hapus dari array
    const deletedProduct = products.splice(productIndex, 1);

    res.status(200).json({
        message: "Produk berhasil dihapus",
        data: deletedProduct[0]
    });
});

// ==========================================
// JALANKAN SERVER
// ==========================================
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});