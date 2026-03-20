/**
 * K2M Swalayan - Image Configuration Manager
 * Menggunakan localStorage untuk menyimpan URL gambar yang dikustomisasi admin.
 * Semua halaman mengimpor file ini dan memanggil applyImages() saat load.
 */

const K2M_IMAGES_KEY = 'k2m_images_config';

/** Daftar gambar default — dipakai jika admin belum mengubah apa pun */
const DEFAULT_IMAGES = {
    // === BERANDA (index.html) ===
    hero_bg: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=1600&q=80',
    about_img: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=800&q=80',
    facilities_img1: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=600&q=80',
    facilities_img2: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80',
    contact_map: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80',

    // === PRODUK (produk.html) ===
    product_hero: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=80',
    product_cat_sembako: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=75',
    product_cat_frozen: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=400&q=75',
    product_cat_household: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=75',
    product_cat_snack: 'https://images.unsplash.com/photo-1565920740657-b03ee6d2b286?w=400&q=75',
    product1_img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=75',
    product2_img: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=400&q=75',
    product4_img: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=75',
    product5_img: 'https://images.unsplash.com/photo-1565920740657-b03ee6d2b286?w=400&q=75',
    product6_img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=75',

    // === TENTANG (tentang.html) ===
    about_hero: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=1600&q=80',
    about_owner: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=75',

    // === FASILITAS (fasilitas.html) ===
    facilities_hero: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1600&q=80',
    facilities_parking: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=600&q=80',
    facilities_payment: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80',

    // === KONTAK (kontak.html) ===
    kontak_hero: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?w=1600&q=80',
    kontak_map: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80',
};

/** Ambil config gambar yang tersimpan (gabung default + override dari localStorage) */
function getImages() {
    try {
        const saved = localStorage.getItem(K2M_IMAGES_KEY);
        if (saved) {
            return { ...DEFAULT_IMAGES, ...JSON.parse(saved) };
        }
    } catch (e) { /* ignore */ }
    return { ...DEFAULT_IMAGES };
}

/** Simpan seluruh config gambar ke localStorage */
function saveImages(config) {
    try {
        localStorage.setItem(K2M_IMAGES_KEY, JSON.stringify(config));
        return true;
    } catch (e) {
        return false;
    }
}

/** Reset semua gambar ke default */
function resetImages() {
    try {
        localStorage.removeItem(K2M_IMAGES_KEY);
        return true;
    } catch (e) {
        return false;
    }
}

/**
 * Terapkan gambar ke elemen halaman berdasarkan data-img-key attribute.
 * Setiap elemen yang perlu gambar dinamis cukup punya: data-img-key="hero_bg"
 * Untuk background-image: tambah data-img-type="bg"
 * Untuk src: data-img-type="src" (default)
 */
function applyImages() {
    const images = getImages();
    document.querySelectorAll('[data-img-key]').forEach(el => {
        const key = el.getAttribute('data-img-key');
        const type = el.getAttribute('data-img-type') || 'src';
        const url = images[key];
        if (!url) return;

        if (type === 'bg') {
            // Pertahankan gradient jika ada
            const existingBg = el.style.backgroundImage;
            const hasGradient = existingBg && existingBg.includes('gradient');
            if (hasGradient) {
                // Ganti hanya URL gambar, pertahankan gradient
                el.style.backgroundImage = existingBg.replace(/url\(['"]?[^'")\s]+['"]?\)/, `url('${url}')`);
            } else {
                el.style.backgroundImage = `url('${url}')`;
            }
        } else {
            el.src = url;
        }
    });
}

// Auto-apply saat DOM siap
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyImages);
} else {
    applyImages();
}
