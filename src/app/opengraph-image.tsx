import { ImageResponse } from "next/og";
import { APP_URL } from "@/constants/Constants";
import Image from "next/image";

export const runtime = "edge";

// Image metadata
export const alt = APP_URL.replace("https://", "");
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Opengraphimage() {
  return new ImageResponse(
    (
      <Image
        src={"/public/icon/icon-512x512.png"}
        alt={alt}
        width={size.width}
        height={size.height}
      />
    )
  );
}
