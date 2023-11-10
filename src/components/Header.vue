<template lang="">
      <div class="container-fluid header-background">
    <header class="container">
      <div class="top-header">
        <div class="row">
          <div class="col-md-6">
            <!-- d -->
          </div>
          <div class="col-md-6 col-sm-12 d-flex justify-content-around">
            <div class="email">
              <p>
                <span><i class="fa-solid fa-envelope"></i></span>
                <a href="mailto: developerfaisal32@gmail.com"
                  >developerfaisal32@gmail.com</a
                >
              </p>
            </div>
            <div class="translation">
              <select>
                <option>UZ</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="main-header">
        <div class="row">
          <div class="col-md-6 col-sm-12 d-flex justify-content-between">
            <div class="logo">
              <h3><router-link to="/">FStore</router-link></h3>
            </div>
            <div class="dropdown">
              <button
                class="btn category-btn dropdown-toggle"
                type="button"
                id="top-header-category"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img src="/images/manu.png" alt="" /> Category
              </button>
              <ul
                class="dropdown-menu top-header-category-menu"
                aria-labelledby="top-header-category"
              >
                <li><a class="dropdown-item" href="#">Smartphone</a></li>
                <li>
                  <a class="dropdown-item" href="#">Computer & Notebook</a>
                </li>
                <li><a class="dropdown-item" href="#">Television</a></li>
                <li><a class="dropdown-item" href="#">Smart Watch</a></li>
                <li><a class="dropdown-item" href="#">Earbuds</a></li>
                <li><a class="dropdown-item" href="#">AC</a></li>
                <li><a class="dropdown-item" href="#">Refrigerator</a></li>
                <li><a class="dropdown-item" href="#">WashingMachine</a></li>
                <li><a class="dropdown-item" href="#">Smartphone</a></li>
              </ul>
            </div>
            <div class="heart-cart heart-cart-m">
              <a class="favorite_border">
                <img src="/images/favorite_border.png" alt="" />
              </a>
              <a class="shopping_cart">
                <img src="/images/./shopping_cart.png" alt="" />
              </a>
            </div>
          </div>
          <div class="col-md-6 col-sm-12 d-flex justify-content-between">
            <div class="search-input search-input-lg">
              <form action="">
                <input type="search" placeholder="search here" class="search" />
                <button>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_0_232)">
                      <path
                        d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_0_232">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </button>
              </form>
            </div>
            <div class="heart-cart heart-cart-b">
              <a class="favorite_border">
                <img src="/images/favorite_border.png" alt="" />
              </a>
              <a class="shopping_cart">
                <img src="/images/./shopping_cart.png" alt="" />
              </a>
            </div>
            <div class="profile">
              <button
                class="btn dropdown-toggle"
                type="button"
                id="top-header-user"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Profile
              </button>

              <ul
                class="dropdown-menu top-header-user-menu"
                aria-labelledby="top-header-user"
              >
                <li> <router-link class="dropdown-item" to="/login">Login</router-link> </li>
                <li> <router-link class="dropdown-item" to="/register">Register</router-link> </li>
                <li> <router-link class="dropdown-item" to="/profile">Profile</router-link> </li>
                <li> <router-link class="dropdown-item" to="/profile/order-history">Oder History</router-link> </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>
<script>
export default {
    
}
</script>
<style lang="">
    
</style>