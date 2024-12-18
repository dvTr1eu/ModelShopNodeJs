import { MinusIcon, PlusIcon, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { FormatPrice } from "@/helpers/utilities";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartItem } from "@/store/clientStore/cart-slice";
import { data } from "autoprefixer";
import { useToast } from "@/hooks/use-toast";

function UserCartItemsContent({ cartItem }) {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shoppingCart);
  const { productList } = useSelector((state) => state.clientProduct);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function handleCartItemDelete(getCartItem) {
    dispatch(
      deleteCartItem({ userId: user?.id, productId: getCartItem?.productId })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Xóa sản phẩm thành công",
        });
      }
    });
  }

  function handleUpdateQuantity(getCartItem, typeOfAction) {
    if (typeOfAction == "plus") {
      let getCart = cartItems.items || [];
      if (getCart.length) {
        const indexOfCurrentCartItem = getCart.findIndex(
          (item) => item.productId === getCartItem?.productId
        );

        const getCurrentProductIndex = productList.findIndex(
          (product) => product._id === getCartItem?.productId
        );
        const getQuantityStock = productList[getCurrentProductIndex].quantity;

        if (indexOfCurrentCartItem > -1) {
          const getQuantity = getCart[indexOfCurrentCartItem].quantity;
          if (getQuantity + 1 > getQuantityStock) {
            toast({
              title: `Chỉ thêm được ${getQuantity} sản phẩm cho sản phẩm này`,
              variant: "destructive",
            });

            return;
          }
        }
      }
    }

    dispatch(
      updateCartItem({
        userId: user?.id,
        productId: getCartItem?.productId,
        quantity:
          typeOfAction === "plus"
            ? getCartItem?.quantity + 1
            : getCartItem?.quantity - 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: "Cập nhật số lượng thành công",
        });
      }
    });
  }

  return (
    <div className="flex items-center space-x-4">
      <img
        src={cartItem?.image}
        alt={cartItem?.productname}
        className="w-20 h-20 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="font-extrabold">{cartItem?.productname}</h3>
        <div className="flex items-center gap-2 mt-1">
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full"
            size="icon"
            disabled={cartItem?.quantity === 1}
            onClick={() => handleUpdateQuantity(cartItem, "minus")}
          >
            <MinusIcon className="w-4 h-4" />
            <span className="sr-only">Giảm</span>
          </Button>
          <span className="font-semibold">{cartItem?.quantity}</span>
          <Button
            variant="outline"
            className="h-8 w-8 rounded-full"
            size="icon"
            onClick={() => handleUpdateQuantity(cartItem, "plus")}
          >
            <PlusIcon className="w-4 h-4" />
            <span className="sr-only">Tăng</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          {FormatPrice(
            (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
              cartItem?.quantity
          )}
        </p>
        <Trash
          onClick={() => handleCartItemDelete(cartItem)}
          className="cursor-pointer mt-1"
          size={15}
        />
      </div>
    </div>
  );
}

export default UserCartItemsContent;
