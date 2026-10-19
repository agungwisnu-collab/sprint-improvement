"use client";

import { useCallback, useEffect, useState } from "react";
import Cropper, { type Area } from "react-easy-crop";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

export type CropAspect = "free" | "1:1" | "16:9" | "4:3" | "1.91:1";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  imageSrc: string;
  aspect?: CropAspect;
  circular?: boolean;
  /** Output edge length (px) for 1:1; longer side for non-square ratios. Default 1024. */
  outputSize?: number;
  /** "image/jpeg" (default) or "image/png" */
  outputType?: "image/jpeg" | "image/png";
  /** JPEG quality 0..1 (default 0.9). Ignored for PNG. */
  outputQuality?: number;
  title?: string;
  description?: string;
  onCropComplete: (blob: Blob) => Promise<void> | void;
}

const ASPECT_RATIOS: Record<Exclude<CropAspect, "free">, number> = {
  "1:1": 1,
  "16:9": 16 / 9,
  "4:3": 4 / 3,
  "1.91:1": 1.91,
};

export function ImageCropperDialog({
  open,
  onOpenChange,
  imageSrc,
  aspect = "1:1",
  circular = false,
  outputSize = 1024,
  outputType = "image/jpeg",
  outputQuality = 0.9,
  title = "Crop image",
  description,
  onCropComplete,
}: Props) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState<Area | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setCroppedArea(null);
      setError(null);
    }
  }, [open, imageSrc]);

  const onAreaComplete = useCallback((_: Area, areaPixels: Area) => {
    setCroppedArea(areaPixels);
  }, []);

  async function handleApply() {
    if (!croppedArea) return;
    setBusy(true);
    setError(null);
    try {
      const blob = await renderCroppedBlob(
        imageSrc,
        croppedArea,
        outputSize,
        outputType,
        outputQuality
      );
      await onCropComplete(blob);
      onOpenChange(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Crop failed");
    } finally {
      setBusy(false);
    }
  }

  const aspectValue = aspect === "free" ? undefined : ASPECT_RATIOS[aspect];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div className="space-y-3">
          <div className="relative h-72 w-full overflow-hidden rounded-lg bg-muted">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={aspectValue}
              cropShape={circular ? "round" : "rect"}
              showGrid={!circular}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onAreaComplete}
              restrictPosition={aspect !== "free"}
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Zoom</Label>
            <input
              type="range"
              min={1}
              max={3}
              step={0.05}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full accent-primary"
              aria-label="Zoom"
            />
          </div>
          {error && <p className="text-xs text-destructive">{error}</p>}
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={busy}>
              Cancel
            </Button>
            <Button type="button" onClick={handleApply} disabled={busy || !croppedArea}>
              {busy ? (
                <>
                  <Loader2 className="mr-1 size-3 animate-spin" /> Saving…
                </>
              ) : (
                "Apply"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

async function renderCroppedBlob(
  src: string,
  area: Area,
  outputSize: number,
  type: "image/jpeg" | "image/png",
  quality: number
): Promise<Blob> {
  const img = await loadImage(src);
  const canvas = document.createElement("canvas");
  // Preserve the cropped area's aspect: longer side = outputSize.
  const ratio = area.width / area.height;
  let w: number;
  let h: number;
  if (ratio >= 1) {
    w = outputSize;
    h = Math.round(outputSize / ratio);
  } else {
    h = outputSize;
    w = Math.round(outputSize * ratio);
  }
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not supported");
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, area.x, area.y, area.width, area.height, 0, 0, w, h);
  return await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("Encode failed"))),
      type,
      type === "image/jpeg" ? quality : undefined
    );
  });
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = src;
  });
}
