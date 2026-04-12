import { redirect } from "next/navigation";
import { components } from "@/lib/registry-data";

export default function Home() {
  redirect(`/components/${components[0].name}`);
}
