import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemTitle,
} from "@/components/ui/item";
import Image from "next/image";
import Link from "next/link";

const contents: { title: string; href: string }[] = [
  {
    title: "Context Demo",
    href: "/context-demo",
  },
  {
    title: "Component & Function Props Demo",
    href: "/component-and-function-props",
  },
];

export default function Page() {
  return (
    <div className="flex max-h-screen flex-col items-center justify-center gap-2">
      {contents.map((content) => (
        <Item key={content.href} variant={"outline"} className="w-full">
          <ItemContent>
            <ItemTitle>{content.title}</ItemTitle>
          </ItemContent>
          <ItemActions>
            <Button asChild>
              <Link href={content.href}>Go to demo</Link>
            </Button>
          </ItemActions>
        </Item>
      ))}
    </div>
  );
}
