import { Button } from "@nextui-org/button";
import Link from "next/link";

export default function Home() {
  {
    const backgroundImageStyle = {
      backgroundImage:
        "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1772&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      backgroundSize: "cover", // You can customize other background properties here
      height: "100vh", // Set the height as needed
    };

    return (
      <div
        style={backgroundImageStyle}
        className="flex justify-center items-center flex-col w-full mx-auto"
      >
        <h1>
          <span className="text-center mx-auto text-white text-3xl mb-5">View Energy Dashboard</span>
        </h1>

        <Button className="mt-5 bg-white rounded-sm shadow-md dark:bg-black">
          <Link href="/monitor">View Dashboard</Link>
        </Button>
      </div>
    );
  }
}
