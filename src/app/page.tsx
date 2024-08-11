import { Button } from "@/components/ui/button";
import Sidebar from "@/components/sidebar/sidebar";

export default function Home() {
  return (
    <div className="flex">
      <span className="min-w-20" />
      <Sidebar />
      <div className="w-full">
        <div className="my-8 mb-4 mx-auto w-[600px]">
          <Button className="w-full">New snippet</Button>
        </div>
        <div className={`mx-auto w-[1744px]`}>
          <div className="h-32">
            <Button>Hello</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
