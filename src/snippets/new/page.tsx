import { redirect } from "next/navigation";
import { db } from "@/db";

export default function SnippetCreatePage() {
  async function createSnippet(formData: FormData) {
    // will be serve  r action
    "use server";
    // need to validate user input
    const title = formData.get("title") as string;
    const code = formData.get("code") as string;
    // create record in db
    const snippet = await db.snippet.create({
      data: { title, code },
    });
    console.log(snippet);

    redirect("/");
  }

  return (
    <form action={createSnippet}>
      <h3 className="font-bold m-3">Create a Snippet</h3>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <label htmlFor="title" className="w-12">
            Title
          </label>
          <input
            type="text"
            name="title"
            className="border rounded p-2 w-full"
          />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <label htmlFor="code" className="w-12">
            Code
          </label>
          <input
            type="textarea"
            name="code"
            className="border rounded p-2 w-full"
          />
        </div>
      </div>
      <button type="submit" className="rounded p-2 bg-blue-200">
        Submit
      </button>
    </form>
  );
}
