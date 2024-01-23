import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";
import { Message } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(date: Date): string {
  return format(date, "HH:mm");
}

export function getInitials(name: string): string {
  // Divide o nome em palavras
  const palavras = name.split(" ");

  // Obtém a inicial de cada palavra
  const iniciais = palavras.map((palavra) => palavra[0]);

  // Junta as iniciais novamente
  const resultado = `${iniciais[0]}${iniciais[1]}`;

  return resultado;
}

export function ensureHttps(url: string) {
  // Check if the URL starts with "http://"
  if (url.startsWith("http://")) {
    // Replace "http" with "https"
    return url.replace(/^http:\/\//, "https://");
  }
  // If the URL starts with "https://", no modification needed
  else if (url.startsWith("https://")) {
    return url;
  }
  // If the URL doesn't start with either, assume HTTPS and prepend it
  else {
    return "https://" + url;
  }
}

export function downloadMessages(messages: Message[], fileName: string): void {
  const content = JSON.stringify(messages, null, 2);
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = fileName + ".txt";

  document.body.appendChild(a);
  a.click();

  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
