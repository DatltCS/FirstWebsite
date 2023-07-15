let cart = [];
const addToCart = async (id) => {
    let storage = localStorage.getItem('cart');
    if (storage) {
        cart = JSON.parse(storage);
    };

    let product = findProductById(id);
    let quantity = parseInt(document.getElementById('quantity').value,10);

    let item = cart.find(c => c.product.productId == id);
    if (item) {
        item.quantity += quantity;
    } else {
        cart.push({ product, quantity: quantity });
    };
    localStorage.setItem('cart', JSON.stringify(cart));
    showCart(cart);
};

const showCart = (myCart) => {
    let cartBody = document.getElementById('cart-body');
    cartBody.innerHTML = ``;
    myCart.map(item => {
        cartBody.innerHTML += `
        <div class="card mb-3">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${item.product.productImages + "/1.png"}" class="img-fluid rounded-start">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${item.product.productName}</h5>
                        <p class="card-text">Đơn giá : ${item.product.productPrice}</p>
                        <p class="card-text">Số lượng : ${item.quantity}</p>
                        <a href="javascript:void(0);" onclick="removeItemById(${item.product.productId})" class="btn btn-danger">Remove</a>
                    </div>
                </div>
            </div>
        </div>
        `;
    });
    tongTien();
};

const removeItemById = (id) => {
    let storage = localStorage.getItem('cart');
    if (storage) {
        cart = JSON.parse(storage);
    };
    cart = cart.filter(i => i.product.productId != id);
    localStorage.setItem('cart', JSON.stringify(cart));
    showCart(cart);
    if (cart.length == 0) {
        localStorage.removeItem('cart');
    }
}

// phần này là slide show của Trang chủ
var buttonHome = document.getElementById('pills-home-tab');
// gán thêm sự kiện window.onload tại trang home tải lên đầu tiên :v
buttonHome.onclick = window.onload = function () {
    let homeSlideShow = document.getElementById('home-slide-show');
    homeSlideShow.innerHTML = ``;
    homeSlideShow.innerHTML += `
        <div class="carousel-item active" data-bs-interval="3000" >
            <div class="img-slideShow" style="background-image: url('${product[product.length - 1].productImages + "/1.png"}');"></div>
            <div class="carousel-caption d-none d-md-block bg-light text-dark">
                <h5>${product[product.length - 1].productName}</h5>
                <p>${product[product.length - 1].description}</p>
            </div>
        </div>
    `;
    // ông nhìn ở đoạn interval thì đó là số giây chuyển slide tính = mili giây
    // index trừ 2 vì lệch số id vs mảng và bỏ thằng ở trên
    for (let index = product.length - 2; index >= product.length - 3; index--) {
        homeSlideShow.innerHTML += `
        <div class="carousel-item" data-bs-interval="3000" >
            <div class="img-slideShow" style="background-image: url('${product[index].productImages + "/1.png"}');"></div>
            <div class="carousel-caption d-none d-md-block bg-light text-dark">
                <h5>${product[index].productName}</h5>
                <p>${product[index].description}</p>
            </div>
        </div>
    `;
    };
};
//hàm in ra cateItem
const showItem = (categoryId) => {
    let buttonCateItem = document.getElementById('cateItem');
    let listItem = document.getElementById('list-item');
    listItem.innerHTML = ``;
    buttonCateItem.innerHTML = `<button type="button" class="list-group-item list-group-item-action active" onclick="showItem(${categoryId})">Tất cả</button>`;
    categoryItem.map(item => {
        if (item.cateId == categoryId) {
            buttonCateItem.innerHTML += `
            <button type="button" class="list-group-item list-group-item-action" onclick="showItemById(${item.itemId})">${item.itemName}</button>
            `;
            let productItems = findItemById(item.itemId);
            productItems.map(index => {
                listItem.innerHTML += `
                <div class="col">
                    <div class="card mb-3">
                        <img src="${index.productImages + "/1.png"}" class="card-img-top">
                        <div class="card-body">
                            <h5 class="card-title">${index.productName}</h5>
                            <p class="card-text text-danger">${index.productPrice} VNĐ</p>
                            <a onclick="openDetail(${index.productId})" role="button" class="btn btn-primary" data-bs-toggle="modal" href="#exampleModal">Xem chi tiết</a>
                        </div>
                    </div>
                </div>
                `;
            });
        };
    });
};

const findItemById = (itemId) => {
    let listProduct = [];
    product.map(item => {
        if (item.itemId == itemId) {
            listProduct.push(item);
        };
    });
    return listProduct;
};

const findProductById = (productId) => {
    let productItem;
    product.map(item => {
        if (item.productId == productId) {
            productItem = item;
        };
    });
    return productItem;
};

const showItemById = (itemId) => {
    let listItem = document.getElementById('list-item');
    listItem.innerHTML = ``;
    let productItems = findItemById(itemId);
    productItems.map(index => {
        listItem.innerHTML += `
            <div class="col">
                <div class="card mb-3">
                    <img src="${index.productImages + "/1.png"}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${index.productName}</h5>
                        <p class="card-text text-danger">${index.productPrice} VNĐ</p>
                        <a onclick="openDetail(${index.productId})" role="button" class="btn btn-primary" data-bs-toggle="modal" href="#exampleModal">Xem chi tiết</a>
                    </div>
                </div>
            </div>
        `;
    });
};

const openDetail = (id) => {
    let productDetail = document.getElementById('productDetail');
    productDetail.innerHTML = ``;
    let product = findProductById(id);
    productDetail.innerHTML = `
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Sản phẩm : ${product.productId}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="card mb-3">
            <img src="${product.productImages + "/1.png"}" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${product.productName}</h5>
                <p class="card-text text-danger">Đơn giá : ${product.productPrice} VNĐ</p>
                <p class="card-text text-info">${product.description}</p>
            </div>
        </div>
        <div class="modal-footer">
            <div class="row align-items-center">
                <label for="quantity" class="col-sm-6 col-form-label">Số lượng :</label>
                <div class="col-sm-6">
                    <input type="number" class="form-control" id="quantity" min="1" max="10" value="1">
                </div>
            </div>
            <button type="button" onclick="addToCart(${product.productId})" class="btn btn-success">Đặt hàng</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
    `;
};

const tongTien = () => {
    let storage = localStorage.getItem('cart');
    if (storage) {
        cart = JSON.parse(storage);
    };
    let tongCong = 0;
    cart.map(item => {
        if (cart.length != 0) {
            tongCong += item.quantity * item.product.productPrice;
        } else {
            tongCong = 0;
        };
    });
    let pTongCong = document.getElementById('tongCong');
    pTongCong.innerText = "Tổng cộng : " + tongCong.toString() +" VNĐ";
};

const thanhToan = () => {
    let storage = localStorage.getItem('cart');
    if (storage) {
        cart = JSON.parse(storage);
    };
    cart = cart.filter(p => p == 0)
    localStorage.removeItem('cart');
    showCart(cart);
};

//PHẦN DỮ LIỆU VỀ SẢN PHẨM

// dữ liệu danh mục sản phẩm
const category = [
    { id: 1, categoryName: 'Thời trang nam' },
    { id: 2, categoryName: 'Thời trang nữ' },
    { id: 3, categoryName: 'Thời trang trẻ em' }
];
// dữ liệu mỗi danh mục có những loại sản phẩm nào
const categoryItem = [
    { itemId: 1, cateId: 1, itemName: "Áo vest" },
    { itemId: 2, cateId: 1, itemName: "Quần dài / Quần Âu" },
    { itemId: 3, cateId: 1, itemName: "Áo sơ mi" },
    { itemId: 4, cateId: 1, itemName: "Cà vạt & Nơ cổ" },
    { itemId: 5, cateId: 2, itemName: "Áo" },
    { itemId: 6, cateId: 2, itemName: "Áo khoác & Vest" },
    { itemId: 7, cateId: 2, itemName: "Quần Jeans" },
    { itemId: 8, cateId: 2, itemName: "Chân váy" },
    { itemId: 9, cateId: 3, itemName: "Áo bé gái" },
    { itemId: 10, cateId: 3, itemName: "Quần bé gái" },
    { itemId: 11, cateId: 3, itemName: "Áo bé trai" },
    { itemId: 12, cateId: 3, itemName: "Quần bé trai" }
];
// dữ liệu sản phẩm 
const product = [
    { productId: 1, itemId: 1, productName: 'Áo vest nam body kiểu Hàn Quốc đơn giản phong cách', productPrice: 300000, productImages: '../static/img/Nam_Vest/1', description: 'Mẫu trơn, Phong cách Hàn Quốc, Chất liệu Poly, Xuất xứ Việt Nam' },
    { productId: 2, itemId: 1, productName: 'Vest trung niên Hồng Ngọc', productPrice: 750000, productImages: '../static/img/Nam_Vest/2', description: 'Mẫu trơn, Chất liệu Tuyt Silk, Xuất xứ Việt Nam' },
    { productId: 3, itemId: 1, productName: 'Vest nam công sở', productPrice: 419000, productImages: '../static/img/Nam_Vest/3', description: 'Màu đen / xanh than, Chất liệu Tuyết Hàn, Xuất xứ Việt Nam' },
    { productId: 4, itemId: 1, productName: 'Vest nam balzer', productPrice: 199000, productImages: '../static/img/Nam_Vest/4', description: 'Màu đen, Chất liệu vải tây cao cấp, Xuất xứ Việt Nam' },
    { productId: 5, itemId: 2, productName: 'Quần Jogger Nam', productPrice: 79000, productImages: '../static/img/Quan_Nam/1', description: 'Chất liệu thun Umi, Xuất xứ Việt Nam' },
    { productId: 6, itemId: 2, productName: 'Quần âu nam Galvin', productPrice: 300000, productImages: '../static/img/Quan_Nam/2', description: 'Chất liệu Tuyết Hàn, Xuất xứ Việt Nam' },
    { productId: 7, itemId: 2, productName: 'Quần Nỉ Bông Nam', productPrice: 300000, productImages: '../static/img/Quan_Nam/3', description: 'Mẫu trơn, Hoạ tiết in, Chất liệu Nỉ Bông, Xuất xứ Việt Nam' },
    { productId: 8, itemId: 2, productName: 'Quần âu nam Kante', productPrice: 115000, productImages: '../static/img/Quan_Nam/4', description: 'Mẫu trơn, Chất liệu Tuyết Hàn, Xuất xứ Việt Nam' },
    { productId: 9, itemId: 3, productName: 'Áo Sơ Mi Nam Dài Tay', productPrice: 229000, productImages: '../static/img/Somi_Nam/1', description: 'Mẫu trơn, Chất liệu Cotton, Xuất xứ Việt Nam' }
];
// ảnh là để .png dùm tui nhaaa :(
