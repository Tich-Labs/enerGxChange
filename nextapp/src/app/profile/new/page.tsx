import type { Metadata } from "next";
import Step1Form from "./Step1Form";

export const metadata: Metadata = {
  title: "Profile Creation — enerG·X·change",
  description: "Create your profile to start exchanging",
};

export default function Step1() {
  return <Step1Form />;
}
