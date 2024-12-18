import { current } from "@reduxjs/toolkit";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-item-content";
import { FormatPrice } from "@/helpers/utilities";
import { useNavigate } from "react-router-dom";

function UserCartWrapper({ cartItems, setOpenCartSheet }) {
  const navigate = useNavigate();
  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  return (
    <SheetContent classNmae="sm:max-w-md">
      <SheetHeader>
        <SheetTitle>Giỏ hàng của bạn</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4">
        {cartItems && cartItems.length > 0
          ? cartItems.map((item) => <UserCartItemsContent cartItem={item} />)
          : null}
      </div>
      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Tổng tiền</span>
          <span className="font-bold">{FormatPrice(totalCartAmount)}</span>
        </div>
      </div>
      <Button
        onClick={() => {
          navigate("/client/checkout");
          setOpenCartSheet(false);
        }}
        className="w-full mt-5"
      >
        Thanh toán
      </Button>
    </SheetContent>
  );
}

export default UserCartWrapper;
