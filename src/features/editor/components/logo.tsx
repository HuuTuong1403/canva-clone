import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/">
      <div className="size-8 shrink-0 relative">
        <Image
          src="/logo.svg"
          fill
          alt="Logo"
          className="shrink-0 hover:opacity-75 transition"
        />
      </div>
    </Link>
  );
};
