/* Ganti nilai foto: dengan file sendiri, misalnya foto:'img/gayo.jpg'
   Navbar, footer, keranjang & data produk dipakai SEMUA halaman (header/footer tetap, isi tengah ganti) */
const PRODUK=[
{id:1,nama:'Gayo Aceh',asal:'Aceh Tengah',proses:'Full Washed',harga:95000,foto:'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=70',warna:'#1e3a32'},
{id:2,nama:'Toraja Sapan',asal:'Sulawesi Selatan',proses:'Honey',harga:110000,foto:'https://images.unsplash.com/photo-1524350876685-274059332603?auto=format&fit=crop&w=800&q=70',warna:'#8f2a2f'},
{id:3,nama:'Kintamani',asal:'Bali',proses:'Natural',harga:98000,foto:'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=800&q=70',warna:'#3b2a20'},
{id:4,nama:'Flores Bajawa',asal:'NTT',proses:'Washed',harga:105000,foto:'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=70',warna:'#4a6b3a'},
{id:5,nama:'Java Preanger',asal:'Jawa Barat',proses:'Natural',harga:85000,foto:'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=70',warna:'#6b4423'},
{id:6,nama:'Wamena',asal:'Papua',proses:'Washed',harga:120000,foto:'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=70',warna:'#b07a1c'}];
const rp=n=>'Rp '+n.toLocaleString('id-ID');
const ambil=()=>{try{return JSON.parse(localStorage.getItem('cart'))||{}}catch(e){return {}}};
const simpan=c=>{try{localStorage.setItem('cart',JSON.stringify(c))}catch(e){}};
const MENU=[['index','Beranda'],['produk','Produk'],['tentang','Tentang'],['kontak','Kontak']];
const hal=document.body.dataset.page;

document.getElementById('nav').innerHTML=`<nav class="navbar navbar-expand-lg navbar-dark sticky-top"><div class="container">
<a class="navbar-brand fs-4" href="index.html">Sangrai<span class="text-warning">.id</span></a>
<button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#menu" aria-label="Buka menu"><span class="navbar-toggler-icon"></span></button>
<div class="collapse navbar-collapse" id="menu"><ul class="navbar-nav ms-auto align-items-lg-center">
${MENU.map(m=>`<li class="nav-item"><a class="nav-link ${m[0]===hal?'active':''}" href="${m[0]}.html">${m[1]}</a></li>`).join('')}
<li class="nav-item ms-lg-3"><button class="btn btn-cherry btn-sm" data-bs-toggle="offcanvas" data-bs-target="#keranjang">Keranjang <span id="jml" class="badge text-bg-light">0</span></button></li></ul></div></div></nav>`;

document.getElementById('foot').innerHTML=`<div class="container py-5"><div class="row g-4">
<div class="col-md-5"><h3 class="h4 text-white">Sangrai<span class="text-warning">.id</span></h3><p>Biji kopi sangrai dari petani Nusantara, dikirim paling lambat 3 hari setelah disangrai.</p></div>
<div class="col-6 col-md-3"><h4 class="h6 text-white">Menu</h4><ul class="list-unstyled">${MENU.map(m=>`<li><a href="${m[0]}.html">${m[1]}</a></li>`).join('')}</ul></div>
<div class="col-6 col-md-4"><h4 class="h6 text-white">Hubungi kami</h4><p class="mb-0">halo@sangrai.id<br>WhatsApp 0812-0000-0000<br>Senin sampai Sabtu, 08.00 sampai 17.00</p></div></div>
<hr class="border-secondary mt-4"><p class="small mb-0">&copy; <span id="thn"></span> Sangrai.id. Tugas UAS Pemrograman Web oleh MAS YUDI (NIM 252011198).</p></div>`;
document.getElementById('thn').textContent=new Date().getFullYear();

document.body.insertAdjacentHTML('beforeend',`<div class="offcanvas offcanvas-end" id="keranjang" tabindex="-1"><div class="offcanvas-header"><h2 class="h5 mb-0">Keranjang belanja</h2><button class="btn-close" data-bs-dismiss="offcanvas" aria-label="Tutup"></button></div><div class="offcanvas-body" id="isi"></div></div>
<div class="toast-container position-fixed bottom-0 end-0 p-3"><div id="toast" class="toast text-bg-success" role="status" data-bs-delay="1800"><div class="toast-body">Kopi ditambahkan ke keranjang.</div></div></div>`);

function gambar(){const c=ambil();let n=0,t=0,h='';
PRODUK.forEach(p=>{const q=c[p.id]||0;if(q){n+=q;t+=q*p.harga;h+=`<li class="list-group-item d-flex justify-content-between"><span>${p.nama} x${q}</span><span>${rp(p.harga*q)}</span></li>`}});
document.getElementById('jml').textContent=n;
document.getElementById('isi').innerHTML=n?`<ul class="list-group mb-3">${h}</ul><p class="d-flex justify-content-between fw-bold"><span>Total</span><span>${rp(t)}</span></p><a href="kontak.html" class="btn btn-cherry w-100 mb-2">Lanjut pesan</a><button class="btn btn-outline-secondary w-100" onclick="kosong()">Kosongkan</button>`:'<p class="text-muted">Keranjang masih kosong. Pilih kopi dulu di halaman Produk.</p>'}
function tambah(id){const c=ambil();c[id]=(c[id]||0)+1;simpan(c);gambar();bootstrap.Toast.getOrCreateInstance(document.getElementById('toast')).show()}
function kosong(){simpan({});gambar()}

function tampil(el,list){el.innerHTML=list.length?list.map(p=>`<div class="col-6 col-lg-4"><div class="card h-100"><div class="thumb" style="background:${p.warna}"><img src="${p.foto}" alt="Kopi ${p.nama} dari ${p.asal}" loading="lazy" onerror="this.remove()"></div><div class="card-body"><span class="badge text-bg-light border">${p.asal}</span><h3 class="h5 mt-2">${p.nama}</h3><p class="small text-muted mb-2">Proses ${p.proses}, 250 g</p><div class="d-flex justify-content-between align-items-center"><strong>${rp(p.harga)}</strong><button class="btn btn-sm btn-cherry" onclick="tambah(${p.id})">Tambah</button></div></div></div></div>`).join(''):'<p class="text-muted">Kopi yang kamu cari belum ada.</p>'}
gambar();
