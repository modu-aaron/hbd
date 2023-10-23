import Navbar from "@/components/Navbar";
import Providers from "@/components/Provider";

export default function DetailLayout(props: { children: React.ReactNode }) {
  return (
    <div
      style={{ height: "100dvh" }}
      className={`max-w-6xl flex flex-col mx-auto px-2 selection:bg-gray-50 dark:selection:bg-gray-800`}
    >
      <Providers>
        <Navbar />
        {props.children}
      </Providers>
    </div>
  );
}
