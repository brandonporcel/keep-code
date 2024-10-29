"use client";
import { useEffect, useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Form from "./form";
import { saveSnippet, updateSnippet } from "@/actions/actions";
import { snippetFormSchema } from "@/lib/schemas/snippet.schema";
import { Snippet, SnippetFile } from "@/lib/types/snippet";
import { getSnippetFormStateDefault } from "@/lib/mocks/snippet.mock";
import { useSnippetContext } from "@/app/contexts/SnippetContext";

type DialogFormOpenerProps = {
  snippet?: Snippet;
  onClose?: () => void;
};
export function DialogFormOpener({ snippet, onClose }: DialogFormOpenerProps) {
  const { snippets, setSnippets } = useSnippetContext();
  const [isOpen, setIsOpen] = useState(false);
  const [formState, setFormState] = useState<Snippet>(
    getSnippetFormStateDefault(crypto.randomUUID())
  );

  const [errors, setErrors] = useState<Record<string, string | null>>({});

  const handleOpen = (snippet?: Snippet) => {
    let item = snippet;
    if (!item) item = getSnippetFormStateDefault(crypto.randomUUID());
    setFormState(item);
    setIsOpen(true);
  };

  const handleSnippetUpdate = (updatedSnippet: Snippet, isNew = false) => {
    setSnippets((prevSnippets) => {
      if (isNew) {
        return [...prevSnippets, updatedSnippet];
      }
      return prevSnippets.map((snippet) =>
        snippet.id === updatedSnippet.id ? updatedSnippet : snippet
      );
    });
  };

  const handleClose = async () => {
    setIsOpen(false);
    onClose?.();

    const isForCreate = !snippet;
    const hasFiles = formState.files.some((file) => file.code.trim());

    if (isForCreate && !hasFiles) return;

    let updatedExistingFiles: SnippetFile[] = [];
    let updatedNewFiles: SnippetFile[] = [];

    if (!isForCreate) {
      const snippetToEdit = snippets.find(({ id }) => id === formState.id);
      if (!snippetToEdit) return;

      const previousFileIds = new Set(
        snippetToEdit.files.map((file) => file.id)
      );
      updatedExistingFiles = formState.files.filter(({ id }) =>
        previousFileIds.has(id)
      );
      updatedNewFiles = formState.files.filter(
        ({ id }) => !previousFileIds.has(id)
      );

      updateSnippet({
        snippet: {
          id: formState.id,
          private: formState.private,
          title: formState.title,
          files: formState.files,
        },
        updatedExistingFiles,
        updatedNewFiles,
      });
    } else {
      await saveSnippet({
        snippet: {
          id: formState.id,
          private: formState.private,
          title: formState.title,
          files: formState.files,
        },
      });
    }

    handleSnippetUpdate(formState, isForCreate);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));

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

  useEffect(() => {
    if (snippet) {
      handleOpen();
      setFormState(snippet);
    }
  }, [snippet]);

  return (
    <>
      {!snippet && (
        <Button className="w-full" onClick={() => handleOpen()}>
          New snippet
        </Button>
      )}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          className="min-w-[60%] hide-close-btn max-h-[95%]"
          onCloseAutoFocus={handleClose}
        >
          <DialogTitle className="none" />
          <Form
            handleChange={handleChange}
            formState={formState}
            setFormState={setFormState}
            errors={errors}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
