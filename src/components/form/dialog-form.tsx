"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Form from "./form";
import { saveSnippet } from "@/actions/actions";
import { snippetFormSchema } from "@/lib/schemas/snippet.schema";
import { z } from "zod";
import { Snippet } from "@/lib/types/snippet";

const defaultValues = {
  title: "",
  filename: "",
  code: "",
};

type DialogFormProps = {
  snippet?: Snippet;
};
export function DialogForm({ snippet }: DialogFormProps) {
  console.log("snippet to edit", snippet);
  const [isOpen, setIsOpen] = useState(false);
  const [formState, setFormState] = useState(defaultValues);
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = async () => {
    setIsOpen(false);
    saveSnippet({
      snippet: {
        id: "",
        private: true,
        title: formState.title,
        files: [
          {
            id: "",
            code: formState.code,
            name: formState.filename,
          },
        ],
      },
    });
  };

  const handleChange = (e: any) => {
    const { name, value, code } = e.target;

    setFormState((prevState) => ({ ...prevState, code, [name]: value }));

    try {
      snippetFormSchema.parse(formState);
      setErrors({ ...errors, [name]: null });
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: err.errors[0]?.message,
        }));
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full" onClick={handleOpen}>
          New snippet
        </Button>
      </DialogTrigger>
      <DialogContent
        className="min-w-[50%] hide-close-btn max-h-[90%]"
        onCloseAutoFocus={handleClose}
      >
        <DialogTitle className="none" />
        <Form
          handleChange={handleChange}
          formState={formState}
          errors={errors}
        />
      </DialogContent>
    </Dialog>
  );
}
