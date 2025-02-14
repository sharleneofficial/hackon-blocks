/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface IEREBRUSREGISTRYInterface extends utils.Interface {
  contractName: "IEREBRUSREGISTRY";
  functions: {
    "getWifiDetails(uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "getWifiDetails",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "getWifiDetails",
    data: BytesLike
  ): Result;

  events: {};
}

export interface IEREBRUSREGISTRY extends BaseContract {
  contractName: "IEREBRUSREGISTRY";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IEREBRUSREGISTRYInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    getWifiDetails(
      nodeID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber, string]>;
  };

  getWifiDetails(
    nodeID: BigNumberish,
    overrides?: CallOverrides
  ): Promise<[BigNumber, string]>;

  callStatic: {
    getWifiDetails(
      nodeID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber, string]>;
  };

  filters: {};

  estimateGas: {
    getWifiDetails(
      nodeID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    getWifiDetails(
      nodeID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
