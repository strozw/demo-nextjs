import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemTitle,
} from "@/components/ui/item";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex max-h-screen flex-col items-center justify-center p-24 gap-2">
      <Item variant={"outline"} className="w-full">
        <ItemContent>
          <ItemTitle>Context Demo</ItemTitle>
        </ItemContent>
        <ItemActions>
          <Button asChild>
            <Link href={"/context-demo"}>Go to demo</Link>
          </Button>
        </ItemActions>
      </Item>
    </div>
  );
}
