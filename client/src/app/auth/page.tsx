"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AuthLogin from "@/components/auth/AuthLogin";
import AuthRegister from "@/components/auth/AuthRegister";

function AuthPage() {
  return (
    <div className="flex justify-center items-center p-2 w-4/12 bg-orange-50 border border-black/10 rounded">
      <Tabs defaultValue="login" className="w-full">
        <TabsList>
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <AuthLogin />
        </TabsContent>
        <TabsContent value="register">
          <AuthRegister />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default AuthPage;
