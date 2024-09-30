import { ImageResponse } from "next/og";
import { Inter } from "next/font/google";
import { APP_URL } from "@/constants/Constants";

export const runtime = "edge";

// Image metadata
export const alt = APP_URL.replace("https://", "");
export const size = {
  width: 1200,
  height: 630,
};
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const contentType = "image/png";

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          fontFamily: inter.style.fontFamily,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {APP_URL}
      </div>
    ),
    {
      ...size,
    }
  );
}
