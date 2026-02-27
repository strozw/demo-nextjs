import { ClientComponent, ClientComponentProps } from "./client-component";
import { clientFunction, renderComponent } from "./client-functions";
import { ServerComponent, ServerComponentProps } from "./server-components";
import { serverFunction } from "./server-function";
import { useClientTime } from "./use-client-time";

export default function Page() {
  return (
    <Container
      clientFunction={clientFunction}
      ClientComponent={ClientComponent}
      ServerComponent={ServerComponent}
    />
  );
}

export function Container({
  clientFunction,
  ClientComponent,
  ServerComponent,
}: {
  clientFunction: () => void;
  ClientComponent: React.ComponentType<ClientComponentProps>;
  ServerComponent: React.ComponentType<ServerComponentProps>;
}) {
  return (
    <div className="space-y-4">
      <ClientComponent
        clientAction={clientFunction}
        serverAction={serverFunction}
        useClientTime={useClientTime}
        renderComponent={renderComponent}
      />
      <ServerComponent
        clientAction={clientFunction}
        serverAction={serverFunction}
        renerComponent={() => <span>by Server</span>}
      />
    </div>
  );
}
