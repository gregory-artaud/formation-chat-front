import {
  Editor,
  EditorProvider,
  Extension,
  useCurrentEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import {
  PaperPlaneRight,
  Plus,
  TextB,
  TextItalic,
  TextStrikethrough,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { FC, ReactNode } from "react";

export const Chatbox: FC<{ sendMessage: (content: string) => void }> = ({
  sendMessage,
}) => {
  const onSendMessage = (editor: Editor) => {
    sendMessage(editor.getHTML());
    editor.commands.clearContent();
  };
  const CustomEnterBehavior = Extension.create({
    name: "customEnterBehavior",

    addKeyboardShortcuts() {
      return {
        Enter: ({ editor }) => {
          if (!editor.isEmpty) {
            onSendMessage(editor);
          }
          return true;
        },
        "Shift-Enter": () => {
          return false;
        },
      };
    },
  });
  const extensions = [StarterKit, Placeholder, CustomEnterBehavior];

  return (
    <div className="flex flex-col border border-gray-300 rounded-md min-h-[120px] transition-all duration-200 ease-in-out focus-within:border-gray-400 focus-within:shadow-[0_0_8px_-2px_rgba(0,0,0,0.1),0_6px_20px_-3px_rgba(0,0,0,0.2)]">
      <EditorProvider
        extensions={extensions}
        slotBefore={<EditorMenuBar />}
        slotAfter={<SendBar onSendMessage={onSendMessage} />}
        editorContainerProps={{ className: "flex-1 flex flex-col" }}
        editorProps={{
          attributes: {
            class: "flex-1 text-sm focus:outline-none px-3 py-2",
          },
        }}
      />
    </div>
  );
};

const EditorMenuBar = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <div className="bg-[#f8f8f8] h-10 rounded-t-md flex items-center gap-2 px-2">
      <OptionButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive("bold")}
      >
        <TextB size={20} weight="bold" />
      </OptionButton>
      <OptionButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive("italic")}
      >
        <TextItalic size={20} weight="bold" />
      </OptionButton>
      <OptionButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        isActive={editor.isActive("strike")}
      >
        <TextStrikethrough size={20} weight="bold" />
      </OptionButton>
    </div>
  );
};

const SendBar: FC<{ onSendMessage: (editor: Editor) => void }> = ({
  onSendMessage,
}) => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }
  const canSend = !editor.isEmpty;

  return (
    <div className="flex items-center justify-between h-10 rounded-b-md px-2">
      <button className="rounded-full bg-[#f8f8f8] p-1 cursor-pointer">
        <Plus size={20} />
      </button>
      <button
        className={cn(
          "flex items-center justify-center p-1 rounded-sm w-8 h-7 transition-all duration-200 ease-in-out",
          {
            "bg-[#007a5a] cursor-pointer hover:bg-[#007a5ae0]": canSend,
          },
        )}
        disabled={!canSend}
        onClick={() => onSendMessage(editor)}
      >
        <PaperPlaneRight
          size={16}
          weight="fill"
          color={canSend ? "white" : "gray"}
        />
      </button>
    </div>
  );
};

const OptionButton: FC<{
  children: ReactNode;
  onClick: () => void;
  isActive: boolean;
}> = ({ children, onClick, isActive }) => {
  return (
    <button
      className={cn(
        "flex items-center justify-center aspect-square rounded rounded-sm h-7 cursor-pointer",
        {
          "bg-[#1d1c1d21] hover:bg-[#1d1c1d31]": isActive,
        },
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
