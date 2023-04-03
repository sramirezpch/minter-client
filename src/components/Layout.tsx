import Navbar from "./Navbar";

export const Layout = ({ children }: any) => {
  return (
    <div className="min-h-screen">
      <Navbar />
      {children}
    </div>
  );
};
