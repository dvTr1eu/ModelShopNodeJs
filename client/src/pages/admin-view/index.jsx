import UploadProductImage from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { addFeatureImages, getFeatureImages } from "@/store/common-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminIndex() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImage, setUploadedImage] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);

  function handleUploadFeatureImage() {
    dispatch(addFeatureImages(uploadedImage)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImage("");
      }
    });
  }

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div>
      <UploadProductImage
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImage={uploadedImage}
        setUploadedImage={setUploadedImage}
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
        isCustomStyle={true}
        // isEdit={currentEditId !== null}
      />
      <Button onClick={handleUploadFeatureImage} className="mt-5">
        Tải lên
      </Button>
      <div className="flex flex-col gap-4 mt-5">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((featureImgItem) => (
              <div>
                <img
                  src={featureImgItem.image}
                  className="w-full h-[300px] object-cover rounded-t-lg"
                />
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default AdminIndex;
