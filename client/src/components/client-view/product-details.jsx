import { FormatPrice } from "@/helpers/utilities";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { StarIcon } from "lucide-react";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getCartItems } from "@/store/clientStore/cart-slice";
import { useToast } from "@/hooks/use-toast";
import { setProductDetails } from "@/store/clientStore/product-slice";
import { Label } from "../ui/label";
import StarRatingComponent from "../common/star-rating";
import { useEffect, useState } from "react";
import { addReview, getReview } from "@/store/clientStore/review-slice";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shoppingCart);
  const { reviews } = useSelector((state) => state.shopReview);
  const { toast } = useToast();

  function handleRatingChange(getRating) {
    setRating(getRating);
  }

  function handleAddToCart(getCurrentProductId, getQuantityStock) {
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

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMsg("");
  }

  function handleAddReview() {
    dispatch(
      addReview({
        productId: productDetails?.productId,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((data) => {
      if (data.payload.success) {
        dispatch(getReview(productDetails?._id));
        toast({
          title: "Đánh giá sản phẩm thành công",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) {
      dispatch(getReview(productDetails?._id));
    }
  }, [productDetails]);

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 0;

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="grid grid-cols-2 gap-5 sm:p-12 max-w-[1000px] sm:max-w-[80vw] lg:max-w-5xl">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.productname}
            className="aspect-square object-cover w-[400px] h-[400px]"
          />
        </div>
        <div className="">
          <div>
            <h2 className="text-2xl font-extrabold">
              {productDetails?.productname}
            </h2>
            <p className="text-muted-foreground text-xl mb-5 mt-4">
              {productDetails?.description}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p
              className={`text-2xl font-bold text-primary ${
                productDetails?.salePrice > 0 ? "line-through" : ""
              }`}
            >
              {FormatPrice(productDetails?.price)}
            </p>
            {productDetails?.salePrice > 0 ? (
              <p className="text-2xl font-bold text-primary">
                {FormatPrice(productDetails?.salePrice)}
              </p>
            ) : null}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-0.5">
              <StarRatingComponent rating={averageReview} />
            </div>
            <span className="text-muted-foreground">
              ({averageReview.toFixed(2)})
            </span>
          </div>
          {}
          <div className="mt-5 mb-5">
            {productDetails?.quantity === 0 ? (
              <Button className="opacity-60 cursor-not-allowed">
                Hết hàng
              </Button>
            ) : (
              <Button
                onClick={() =>
                  handleAddToCart(productDetails?._id, productDetails?.quantity)
                }
              >
                Thêm vào giỏ hàng
              </Button>
            )}
          </div>
          <Separator />
          <div className="max-h-[300px] overflow-auto">
            <h2 className="text-xl font-bold mt-4">Đánh giá</h2>
            <div className="grid gap-6">
              {reviews && reviews.length > 0 ? (
                reviews.map((reviewItem) => (
                  <div className="flex gap-4">
                    <Avatar className="w-10 h-10 border">
                      <AvatarFallback>
                        {reviewItem?.userName[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{reviewItem?.userName}</h3>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <StarRatingComponent rating={reviewItem?.reviewValue} />
                      </div>
                      <p className="text-muted-foreground">
                        {reviewItem?.reviewMsg}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <h2>Chưa có bài viết đánh giá nào</h2>
              )}
            </div>
            <div className="mt-10 flex-col flex gap-2 ml-2 mr-2">
              <Label>Chọn đánh giá</Label>
              <div className="flex gap-1">
                <StarRatingComponent
                  rating={rating}
                  handleRatingChange={handleRatingChange}
                />
              </div>
              <Input
                name="reviewMsg"
                value={reviewMsg}
                onChange={(event) => setReviewMsg(event.target.value)}
                placeholder="Viết đánh giá của bạn"
              />
              <Button
                onClick={handleAddReview}
                disabled={reviewMsg.trim() === ""}
              >
                Đăng
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
