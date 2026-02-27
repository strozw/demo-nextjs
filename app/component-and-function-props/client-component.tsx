"use client";

import { Button } from "@/components/ui/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@/components/ui/button-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Item, ItemContent, ItemTitle } from "@/components/ui/item";
import { useTransition } from "react";

export interface ClientComponentProps {
  clientAction: () => void;
  serverAction: () => Promise<string>;
  useClientTime: () => string;
  renderComponent: () => React.ReactNode;
}

export function ClientComponent({
  clientAction,
  serverAction,
  useClientTime,
  renderComponent,
}: ClientComponentProps) {
  const [isPending, startTransition] = useTransition();

  const count = useClientTime();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Client Component</CardTitle>
        <CardDescription>
          This component is rendered on the client side.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Item variant={"outline"}>
            <ItemContent>
              <ItemTitle>useClientTime</ItemTitle>
            </ItemContent>
            <ItemContent className="w-[4em]">{count}</ItemContent>
          </Item>
          <Item variant={"outline"}>
            <ItemContent>
              <ItemTitle>renderComponent</ItemTitle>
            </ItemContent>
            <ItemContent>{renderComponent()}</ItemContent>
          </Item>
        </div>
      </CardContent>
      <CardFooter>
        <ButtonGroup>
          <Button
            type="button"
            onClick={() => {
              clientAction();
            }}
          >
            Client Function
          </Button>
          <ButtonGroupSeparator />
          <Button
            type="button"
            disabled={isPending}
            onClick={() => {
              startTransition(async () => {
                const result = await serverAction();

                window.alert(result);
              });
            }}
          >
            Server Function
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}
