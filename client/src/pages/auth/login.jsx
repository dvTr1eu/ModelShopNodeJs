import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import CommonForm from "@/components/common/form";
import { loginFormControl } from "@/config";
import { login } from "@/store/auth-slice";
import { useToast } from "@/hooks/use-toast";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(e) {
    e.preventDefault();
    dispatch(login(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Đăng nhập vào tài khoản của bạn
        </h1>
        <p className="mt-2">
          Bạn chưa có tài khoản?
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/register"
          >
            Đăng ký
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControl}
        buttonText={"Đăng nhập"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthLogin;
