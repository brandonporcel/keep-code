import { Snippet } from "@/lib/types/snippet";
import React from "react";

type FormCtnProps = {
  snippet?: Snippet;
};
export default function FormCtn({ snippet }: FormCtnProps) {
  console.log("snipept formctn", snippet);
  return <div>form-ctn</div>;
}
