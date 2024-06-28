import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { registerRestaurant } from "@/api/register-management";

const signUpForm = z.object({
  localName: z.string(),
  managerName: z.string(),
  phone: z.string(),
  email: z.string().email(),
});

type SignUpForm = z.infer<typeof signUpForm>;

export function SignUp() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpForm>();
  const { mutateAsync: registerManagementFn } = useMutation({
    mutationFn: registerRestaurant,
  });
  async function handleSignUp(data: SignUpForm) {
    try {
      await registerManagementFn({
        email: data.email,
        localName: data.localName,
        managerName: data.managerName,
        phone: data.phone,
      });
      toast.success("Registred with success", {
        action: {
          label: "Sign In",
          onClick: () => navigate(`/sign-in?email=${data.email}`),
        },
      });
    } catch {
      toast.error("Something went wrong");
    }
  }
  return (
    <>
      <Helmet title="Register" />
      <div className="p-8 ">
        <Button asChild className="absolute right-8 top-8" variant={"link"}>
          <Link to="/sign-in">Sign In</Link>
        </Button>
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className=" flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Become a member and start managing your apps
            </p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(handleSignUp)}>
            <div className="space-y-2">
              <Label htmlFor="localName"> App name</Label>
              <Input type="text" id="localName" {...register("localName")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="managerName">Manager Name</Label>
              <Input
                type="text"
                id="managerName"
                {...register("managerName")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email"> Your email</Label>
              <Input type="email" id="email" {...register("email")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone"> Your phone</Label>
              <Input type="tel" id="phone" {...register("phone")} />
            </div>

            <Button className="w-full" type="submit" disabled={isSubmitting}>
              Finish registration
            </Button>
            <p className="leanding-relaxed px-6 text-center  text-sm text-muted-foreground">
              By clicking the button, you agree to our{" "}
              <a href="" className="underline underline-offset-4">
                terms and conditions
              </a>{" "}
              and{" "}
              <a href="" className="underline underline-offset-4">
                privacy policy
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
