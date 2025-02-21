// export interface TransactionEvent {
//   network: string;
//   from: string;
//   to: string;
//   amount: string;
//   token: string;
//   contractAddress?: string;
// }

export class TransactionEvent {
  network: string;
  from: string;
  to: string;
  amount: string;
  token: string;
  contractAddress?: string;

  constructor(
    network: string,
    from: string,
    to: string,
    amount: string,
    token: string,
    contractAddress?: string
  ) {
    this.network = network;
    this.from = from;
    this.to = to;
    this.amount = amount;
    this.token = token;
    this.contractAddress = contractAddress;
  }
}
