"use client";

import { useState, useCallback } from "react";

interface EditableTextProps {
  value: string;
  placeholder?: string;
  onSave: (value: string) => void;
  editing?: boolean;
  onEditStart?: () => void;
  onEditEnd?: () => void;
  multiline?: boolean;
  className?: string;
  editClassName?: string;
}

export function EditableField({
  value,
  placeholder = "Double click to edit...",
  onSave,
  editing: controlledEditing,
  onEditStart,
  onEditEnd,
  multiline,
  className = "text-sm text-foreground",
  editClassName,
}: EditableTextProps) {
  const [internalEditing, setInternalEditing] = useState(false);
  const editing = controlledEditing ?? internalEditing;

  const startEdit = useCallback(() => {
    setInternalEditing(true);
    onEditStart?.();
  }, [onEditStart]);

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setInternalEditing(false);
      onEditEnd?.();
      onSave(e.target.value);
    },
    [onSave, onEditEnd]
  );

  if (editing) {
    const cls = `w-full bg-transparent outline-none ${editClassName || className}`;

    if (multiline) {
      return (
        <textarea
          autoFocus
          defaultValue={value}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={`${cls} min-h-16 resize-none`}
        />
      );
    }

    return (
      <input
        autoFocus
        defaultValue={value}
        onBlur={handleBlur}
        onKeyDown={(e) => e.key === "Enter" && (e.target as HTMLInputElement).blur()}
        className={cls}
      />
    );
  }

  return (
    <p className={`${className} cursor-text`} onDoubleClick={startEdit}>
      {value || placeholder}
    </p>
  );
}
