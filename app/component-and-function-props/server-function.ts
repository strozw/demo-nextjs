"use server";

export async function serverFunction() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return "This is a server function return value!";
}
