import { Fragment, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import CommonForm from "@/components/common/form";
import { addProductFormElement } from "@/config";
import UploadProductImage from "@/components/admin-view/image-upload";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  getAllProduct,
} from "@/store/admin/product-slice";
import { useToast } from "@/hooks/use-toast";
import AdminProductTile from "@/components/admin-view/product-tile";

const initialFormData = {
  image: null,
  productname: "",
  description: "",
  category: "",
  size: "",
  price: "",
  salePrice: "",
  quantity: "",
};

function AdminProduct() {
  const [openCreateProduct, setOpenCreateProduct] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImage, setUploadedImage] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);

  const { productList } = useSelector((state) => state.adminProduct);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(e) {
    e.preventDefault();
    currentEditId !== null
      ? dispatch(editProduct({ id: currentEditId, formData })).then((data) => {
          console.log(data, "edit");
          if (data?.payload?.success) {
            dispatch(getAllProduct());
            setFormData(initialFormData);
            setOpenCreateProduct(false);
            setCurrentEditId(null);
          }
        })
      : dispatch(
          addNewProduct({
            ...formData,
            image: uploadedImage,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            dispatch(getAllProduct());
            setOpenCreateProduct(false);
            setImageFile(null);
            setFormData(initialFormData);
            toast({
              title: "Thêm mới sản phẩm thành công",
            });
          }
        });
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }
  function handleDelete(getCurrentProductId) {
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data?.payload.success) {
        dispatch(getAllProduct());
      }
    });
  }

  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);

  console.log(formData, "productList");

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProduct(true)}>
          Thêm mới sản phẩm
        </Button>
      </div>
      {/* View sản phẩm */}
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((productItem) => (
              <AdminProductTile
                setFormData={setFormData}
                setOpenCreateProduct={setOpenCreateProduct}
                setCurrentEditId={setCurrentEditId}
                product={productItem}
                handleDelete={handleDelete}
              />
            ))
          : null}
      </div>
      <Sheet
        open={openCreateProduct}
        onOpenChange={() => {
          setOpenCreateProduct(false);
          setCurrentEditId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditId !== null
                ? "Chỉnh sửa thông tin sản phẩm"
                : "Thêm mới sản phẩm"}
            </SheetTitle>
          </SheetHeader>
          <UploadProductImage
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImage={uploadedImage}
            setUploadedImage={setUploadedImage}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            isEdit={currentEditId !== null}
          />
          <div className="py-6">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              buttonText={currentEditId !== null ? "Lưu" : "Thêm"}
              formControls={addProductFormElement}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
}

export default AdminProduct;
