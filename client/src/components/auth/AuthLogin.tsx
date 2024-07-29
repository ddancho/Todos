"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserSignInSchema, UserSignIn } from "@/types/userSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { authLoginService } from "@/services/auth";
import { createSessionService } from "@/services/session";
import { toast } from "react-hot-toast";
import { useUserContext } from "@/hooks/useUserContext";

function AuthLogin() {
  const router = useRouter();
  const { setUser } = useUserContext();

  const form = useForm<UserSignIn>({
    resolver: zodResolver(UserSignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (signInData: UserSignIn) => {
    try {
      const { user, apiResponse } = await authLoginService(signInData);
      if (user === undefined) {
        toast.error("SignIn failed. Try again later.");
        form.reset();
        return;
      }

      const res = await createSessionService(user);
      if (res.status === "error") {
        toast.error("SignIn failed. Try again later.");
        form.reset();
        return;
      }

      setUser(user);

      toast.success("You are successfully signed in.");
      form.reset();

      router.push("/");
    } catch (error) {
      toast.error("Ups, this is serious, call admin.");
      form.reset();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 ">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-slate-100 focus-visible:ring-1 text-black focus-visible:ring-offset-0"
                      placeholder="Enter Email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 ">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      className="bg-slate-100 focus-visible:ring-1 text-black focus-visible:ring-offset-0"
                      placeholder="Enter Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={form.formState.isSubmitting} className="w-full">
              Sign In
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default AuthLogin;
