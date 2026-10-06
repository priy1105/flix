import { FrontendRendererArgs } from "@streamlit/component-v2-lib";
import { FC, ReactElement } from "react";
import FleetDeskApp from "./FleetDeskApp.jsx";

export type MyComponentStateShape = {
  event: Record<string, unknown> | null;
};

export type MyComponentDataShape = {
  payload: Record<string, any>;
};

export type MyComponentProps = Pick<
  FrontendRendererArgs<MyComponentStateShape, MyComponentDataShape>,
  "setTriggerValue"
> & MyComponentDataShape;

const MyComponent: FC<MyComponentProps> = ({
  payload,
  setTriggerValue,
}): ReactElement => (
  <FleetDeskApp payload={payload} setTriggerValue={setTriggerValue} />
);

export default MyComponent;
