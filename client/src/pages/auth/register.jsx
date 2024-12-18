import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import CommonForm from "@/components/common/form";
import { registerFormControl } from "@/config";
import { useDispatch } from "react-redux";
import { register } from "@/store/auth-slice";
import { useToast } from "@/hooks/use-toast";

const initialState = {
  username: "",
  email: "",
  password: "",
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function onSubmit(e) {
    e.preventDefault();
    dispatch(register(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
        navigate("/auth/login");
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  console.log(formData);

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Tạo mới tài khoản
        </h1>
        <p className="mt-2">
          Bạn đã có tài khoản
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/login"
          >
            Đăng nhập
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={registerFormControl}
        buttonText={"Đăng ký"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthRegister;
