"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Pin, Trash2Icon } from "lucide-react";
import CreateCodeContainer from "../editor/CreateCodeContainer";
import { PrivateSwitch } from "../editor/PrivateSwitch";
import FileSelector from "../filters/file-selector";
import { gistDataDefault } from "@/lib/mocks/snippet.mock";
import { Button } from "../ui/button";
import { z } from "zod";
import { snippetFormSchema } from "@/lib/schemas/snippet.schema";
import { SnippetHardcode } from "@/lib/types/snippet";

const defaultValues = {
  title: "",
  filename: "",
  code: "",
};

type FormProps = {
  handleChange: (e: any) => void;
  formState: SnippetHardcode;
  errors: Record<string, string | null>;
};
export default function Form({ handleChange, formState, errors }: FormProps) {
  // const [formState, setFormState] = useState(defaultValues);
  // const [errors, setErrors] = useState<Record<string, string | null>>({});

  // const handleChange = (e: any) => {
  //   const { name, value, code } = e.target;
  //   setFormState((prevState) => ({ ...prevState, [name]: value }));

  //   try {
  //     snippetFormSchema.parse(formState);
  //     setErrors({ ...errors, [name]: null });
  //   } catch (err) {
  //     if (err instanceof z.ZodError) {
  //       setErrors((prevErrors) => ({
  //         ...prevErrors,
  //         [name]: err.errors[0]?.message,
  //       }));
  //     }
  //   }
  // };

  // Manejadores de otros eventos si es necesario
  const handleFileChange = (file: any) => {
    // Maneja el cambio del archivo aquí
  };

  const handlePrivateSwitchChange = (isPrivate: any) => {
    console.log({ isPrivate });
    // Maneja el cambio del switch privado aquí
  };

  return (
    <form>
      <div className="flex items-center justify-between gap-4 mb-4">
        <Input
          name="title"
          value={formState.title}
          placeholder="Title"
          onChange={handleChange}
          className="border-0 focus-visible:ring-0 placeholder:text-xl text-xl"
          ctnClassName="w-full"
        />

        <Pin className="cursor-pointer" size={32} />
      </div>
      {errors.title && <p className="text-red-500 text-xs">{errors.title}</p>}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Input
            name="filename"
            value={formState.filename}
            placeholder="filename.ts"
            onChange={handleChange}
            className="w-max"
          />
          <Trash2Icon className="cursor-pointer" size={18} color="#ef4444" />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <h3>x files</h3>
            <FileSelector
              gistData={gistDataDefault}
              selectedFileId={null}
              onChange={handleFileChange}
            />
          </div>
          <Button>+</Button>
        </div>
      </div>

      <CreateCodeContainer
        value={formState.code || ""}
        handleOnChange={(value) => {
          handleChange({
            target: { code: value },
          });
          // console.log("value", value);
          // setFormState({ ...formState, code: value || "" });
        }}
        selectedFileName={formState.filename || ""}
      />
    </form>
  );
}
