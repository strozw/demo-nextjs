"use client";

import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemTitle,
} from "@/components/ui/item";
import {
  useDemoData,
  useIsRefetching,
  useRefetchDemoData,
} from "./demo-context";
import { useOptimistic } from "react";

export function DemoClient() {
  const data = useDemoData();
  const [optimistic] = useOptimistic(data);

  const refetch = useRefetchDemoData();

  const isRefetching = useIsRefetching();

  return (
    <div>
      <Item className="w-full">
        <ItemContent>
          <ItemTitle>
            Demo Data: <div className="w-4">{optimistic}</div>
          </ItemTitle>
        </ItemContent>
        <ItemActions>
          <Button
            type="button"
            onClick={() => refetch()}
            disabled={isRefetching}
          >
            Refetch
          </Button>
        </ItemActions>
      </Item>
    </div>
  );
}

export function DemoDataView() {}
