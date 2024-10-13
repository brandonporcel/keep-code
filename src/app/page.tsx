import Sidebar from "@/components/sidebar/sidebar";
import { DialogFormOpener } from "@/components/form/dialog-form";
import SelectorArea from "@/components/selector-area";

export default function Home() {
  return (
    <div className="flex">
      <span className="min-w-20" />
      <Sidebar />
      <div className="w-full wrapper-of-all">
        <div className="my-8 mb-4 mx-auto w-[600px]">
          <DialogFormOpener />
        </div>
        <div className="mt-16">
          <SelectorArea />
        </div>
      </div>
    </div>
  );
}
