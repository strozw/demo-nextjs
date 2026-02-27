"use client";

import { createContext, ReactNode, use, useState, useTransition } from "react";

type DemoData = number | Promise<number>;

export const DemoContext = createContext<
  | {
      data: DemoData;
      refetchDataAction: () => void;
      isRefetching: boolean;
    }
  | undefined
>(undefined);

export function useDemoContext() {
  const value = use(DemoContext);

  if (!value) {
    throw new Error(
      "useDemoContext must be used within a DemoContext.Provider",
    );
  }

  return value;
}

export function useDemoData() {
  const data = useDemoContext().data;

  return data instanceof Promise ? use(data) : data;
}

export function useRefetchDemoData() {
  return useDemoContext().refetchDataAction;
}

export function useIsRefetching() {
  return useDemoContext().isRefetching;
}

export function DemoContextProvider({
  children,
  initialDataPromise,
  refetchDataAction,
}: {
  children: ReactNode;
  initialDataPromise: DemoData;
  refetchDataAction: () => DemoData;
}) {
  const [data, setData] = useState(initialDataPromise);
  const [isRefetching, startTransition] = useTransition();

  return (
    <DemoContext.Provider
      value={{
        data,
        refetchDataAction: () => {
          startTransition(async () => {
            const newData = await refetchDataAction();
            setData(newData);
          });
        },
        isRefetching,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
}
