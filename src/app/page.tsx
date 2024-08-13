import { Button } from "@/components/ui/button";
import Sidebar from "@/components/sidebar/sidebar";
import { DialogForm } from "@/components/form/dialog-form";

export default function Home() {
  return (
    <div className="flex">
      <span className="min-w-20" />
      <Sidebar />
      <div className="w-full">
        <div className="my-8 mb-4 mx-auto w-[600px]">
          <DialogForm />
        </div>
        <div className={`ml-8`}>
          <div className="h-16">
            <Button>Hello</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
