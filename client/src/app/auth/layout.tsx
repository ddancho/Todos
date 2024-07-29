const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div className="flex justify-center mt-10">{children}</div>;
};

export default AuthLayout;
