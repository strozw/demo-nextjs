"use client";

import {
  createContext,
  ReactNode,
  startTransition,
  use,
  useState,
  useTransition,
} from "react";

export const DemoContext = createContext<
  | {
      data: number | Promise<number>;
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
  const refetchAction = useDemoContext().refetchDataAction;

  return () => {
    startTransition(() => {
      refetchAction();
    });
  };
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
  initialDataPromise: Promise<number>;
  refetchDataAction: () => Promise<number>;
}) {
  const [data, setDataPromise] = useState<Promise<number> | number>(
    initialDataPromise,
  );
  const [isRefetching, startTransition] = useTransition();

  return (
    <DemoContext.Provider
      value={{
        data,
        refetchDataAction: () => {
          startTransition(async () => {
            const newData = await refetchDataAction();
            setDataPromise(newData);
          });
        },
        isRefetching,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
}
