import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import adminProductSlice from "./admin/product-slice";
import adminOrderSlice from "./admin/order-slice";

import clientProductSlice from "./clientStore/product-slice";
import shoppingCartSlice from "./clientStore/cart-slice";
import shopAddressSlice from "./clientStore/address-slice";
import shopOrderSlice from "./clientStore/order-slice";
import shopSearchSlice from "./clientStore/search-slice";
import shopReviewSlice from "./clientStore/review-slice";
import commonFeatureSlice from "./common-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProduct: adminProductSlice,
    adminOrder: adminOrderSlice,

    clientProduct: clientProductSlice,
    shoppingCart: shoppingCartSlice,
    shopAddress: shopAddressSlice,
    shopOrder: shopOrderSlice,
    shopSearch: shopSearchSlice,
    shopReview: shopReviewSlice,
    commonFeature: commonFeatureSlice,
  },
});

export default store;
