import ProductDetailsDialog from "@/components/client-view/product-details";
import ClientProductTile from "@/components/client-view/product-tile";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { addToCart, getCartItems } from "@/store/clientStore/cart-slice";
import { getProductDetails } from "@/store/clientStore/product-slice";
import {
  getSearchResults,
  resetSearchResults,
} from "@/store/clientStore/search-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

function SearchProduct() {
  const [key, setKey] = useState("");
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { searchResults } = useSelector((state) => state.shopSearch);
  const { cartItems } = useSelector((state) => state.shoppingCart);
  const { user } = useSelector((state) => state.auth);
  const { productDetails } = useSelector((state) => state.clientProduct);
  const { toast } = useToast();

  useEffect(() => {
    if (key && key.trim() !== "" && key.trim().length > 3) {
      setTimeout(() => {
        setSearchParams(new URLSearchParams(`?key=${key}`));
        dispatch(getSearchResults(key));
      }, 1000);
    } else {
      setSearchParams(new URLSearchParams(`?key=${key}`));
      dispatch(resetSearchResults());
    }
  }, [key]);

  function handleAddToCart(getCurrentProductId, getQuantityStock) {
    console.log(cartItems);
    let getCartItem = cartItems.items || [];
    if (getCartItem.length) {
      const indexOfCurrentItem = getCartItem.findIndex(
        (item) => item.productId === getCurrentProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItem[indexOfCurrentItem].quantity;
        if (getQuantity + 1 > getQuantityStock) {
          toast({
            title: `Chỉ thêm được ${getQuantity} sản phẩm cho sản phẩm này`,
            variant: "destructive",
          });

          return;
        }
      }
    }

    console.log(getCurrentProductId);
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(getCartItems(user?.id));
        toast({
          title: "Thêm vào giỏ hàng thành công",
        });
      }
    });
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(getProductDetails(getCurrentProductId));
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  console.log(searchResults, "search results");

  return (
    <div className="container mx-auto md:px-6 px-4 py-8">
      <div className="flex justify-center mb-8">
        <div className="w-full flex items-center">
          <Input
            value={key}
            name="key"
            onChange={(event) => setKey(event.target.value)}
            className="py-6"
            placeholder="Nhập tên sản phẩm"
          />
        </div>
      </div>
      {/* 13:05:32 */}
      {!searchResults.length ? (
        <h1 className="text-4xl font-extrabold">Không tìm thấy sản phẩm</h1>
      ) : null}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {searchResults.map((item) => (
          <ClientProductTile
            handleAddToCart={handleAddToCart}
            product={item}
            handleGetProductDetails={handleGetProductDetails}
          />
        ))}
      </div>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default SearchProduct;
