/**
 * ===========================================
 * UNAI JEWELLERS COLLECTION PAGE
 * Search + Filter + Image Preview
 * ===========================================
 */

document.addEventListener("DOMContentLoaded", () => {

    renderOrnaments(JEWELLERY_INVENTORY);

    const searchInput = document.getElementById("catalogSearchInput");
    const categoryFilter = document.getElementById("catalogCategoryFilter");

    function filterProducts() {

        const query = searchInput.value.toLowerCase().trim();
        const category = categoryFilter.value;

        const filtered = JEWELLERY_INVENTORY.filter(item => {

            const matchesSearch =
                item.name.toLowerCase().includes(query) ||
                item.category.toLowerCase().includes(query);

            const matchesCategory =
                category === "ALL" ||
                item.category === category;

            return matchesSearch && matchesCategory;

        });

        renderOrnaments(filtered);
    }

    searchInput.addEventListener("input", filterProducts);
    categoryFilter.addEventListener("change", filterProducts);

});


/* ===========================================
   Render Jewellery Cards
=========================================== */

function renderOrnaments(products) {

    const container = document.getElementById("showroomGridContainer");

    container.innerHTML = "";

    if (products.length === 0) {

        container.innerHTML = `
        <div class="col-12 text-center py-5">

            <i class="fa-solid fa-search fa-3x text-warning mb-3"></i>

            <h3>No Jewellery Found</h3>

            <p class="text-muted">
                Try searching Gold or Silver.
            </p>

        </div>
        `;

        return;
    }

    products.forEach(item => {

        container.innerHTML += `

        <div class="col-sm-6 col-md-4 col-lg-3" data-aos="fade-up">

            <div class="card shadow-sm border-0 collection-card h-100"
                 onclick="openImage('${item.id}')">

                <img
                    src="${item.primaryImage}"
                    class="card-img-top"
                    alt="${item.name}"
                    style="height:330px;object-fit:cover;">

                <div class="card-body text-center">

                    <h5 class="mb-2">
                        ${item.name}
                    </h5>

                    <span class="badge bg-warning text-dark px-3 py-2">
                        ${item.category}
                    </span>

                </div>

            </div>

        </div>

        `;
    });

}


/* ===========================================
   Image Preview Modal
=========================================== */

function openImage(id) {

    const item = JEWELLERY_INVENTORY.find(product => product.id === id);

    if (!item) return;

    document.getElementById("modalImage").src = item.primaryImage;

    document.getElementById("modalTitle").textContent = item.name;

    document.getElementById("modalCategory").textContent = item.category;

    document.getElementById("modalWhatsapp").href =
        `https://wa.me/919999999999?text=Hello Unai Jewellers, I am interested in ${encodeURIComponent(item.name)}`;

    const modal = new bootstrap.Modal(document.getElementById("imageModal"));

    modal.show();

}