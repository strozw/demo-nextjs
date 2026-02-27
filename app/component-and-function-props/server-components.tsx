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

export interface ServerComponentProps {
  clientAction: () => void;
  serverAction: () => Promise<string>;
  renerComponent: () => React.ReactNode;
}

export function ServerComponent({
  clientAction,
  serverAction,
  renerComponent,
}: ServerComponentProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Server Component</CardTitle>
        <CardDescription>
          This component is rendered on the server side.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Item variant={"outline"}>
          <ItemContent>
            <ItemTitle>renderComponent</ItemTitle>
          </ItemContent>
          <ItemContent>{renerComponent()}</ItemContent>
        </Item>
      </CardContent>
      <CardFooter>
        <ButtonGroup>
          <Button type="button" onClick={clientAction}>
            Client Function
          </Button>
          <ButtonGroupSeparator />
          <Button
            type="button"
            onClick={async () => {
              "use server";
              const result = await serverAction();
              console.log(result);
            }}
          >
            Server Function
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}
