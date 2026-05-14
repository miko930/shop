import { useCallback, useState } from 'react';
import { IconUpload, IconX, IconPhoto } from '@tabler/icons-react';

export default function ImageUpload({ currentUrl, onUpload, onRemove }) {
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleFile = useCallback(
    async (file) => {
      if (!file || !file.type.startsWith('image/')) return;
      setUploading(true);
      try {
        await onUpload(file);
      } catch (err) {
        console.error('Upload failed:', err);
      } finally {
        setUploading(false);
      }
    },
    [onUpload]
  );

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      handleFile(file);
    },
    [handleFile]
  );

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => setDragOver(false);

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  if (currentUrl) {
    return (
      <div className="relative overflow-hidden rounded-xl border border-border">
        <img
          src={currentUrl}
          alt="Product"
          className="h-40 w-full object-cover"
        />
        <button
          type="button"
          onClick={onRemove}
          className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 shadow-sm transition-colors hover:bg-white"
        >
          <IconX size={14} />
        </button>
      </div>
    );
  }

  return (
    <label
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 transition-all ${
        dragOver
          ? 'border-teal bg-teal-light'
          : 'border-border hover:border-teal/40 hover:bg-bg'
      } ${uploading ? 'opacity-60 pointer-events-none' : ''}`}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="hidden"
      />
      {uploading ? (
        <>
          <div className="mb-2 h-8 w-8 animate-spin rounded-full border-2 border-teal border-t-transparent" />
          <p className="text-xs font-semibold text-gray">Uploading...</p>
        </>
      ) : (
        <>
          <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-light text-teal">
            {dragOver ? <IconPhoto size={24} /> : <IconUpload size={24} />}
          </div>
          <p className="text-xs font-semibold text-gray">
            {dragOver ? 'Drop image here' : 'Click or drag image to upload'}
          </p>
        </>
      )}
    </label>
  );
}
