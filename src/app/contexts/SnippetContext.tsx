"use client";
import { Snippet } from "@/lib/types/snippet";
import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

interface SnippetContextType {
  selectedTargets: Element[];
  setSelectedTargets: React.Dispatch<React.SetStateAction<Element[]>>;
  snippets: Snippet[];
  setSnippets: React.Dispatch<React.SetStateAction<Snippet[]>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}
interface SnippetContextProviderProps {
  children: React.ReactNode;
}

const SnippetContext = createContext<SnippetContextType | undefined>(undefined);

export const SnippetContextProvider: React.FC<SnippetContextProviderProps> = ({
  children,
}) => {
  const [selectedTargets, setSelectedTargets] = useState<Element[]>([]);
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <SnippetContext.Provider
      value={{
        isLoading,
        setIsLoading,
        snippets,
        setSnippets,
        selectedTargets,
        setSelectedTargets,
      }}
    >
      {children}
    </SnippetContext.Provider>
  );
};

export const useSnippetContext = () => {
  const context = useContext(SnippetContext);
  if (!context) {
    throw new Error(
      "useSnippetContext must be used within a SnippetContextProvider"
    );
  }

  return context;
};
