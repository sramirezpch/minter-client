import Navbar from "./Navbar/";

export default function ({ children }: any) {
  return (
    <div className="min-h-screen">
      <Navbar />
      {children}
    </div>
  );
}
