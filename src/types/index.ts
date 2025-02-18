interface SolscanBlock {
  blockTime: number,
  slot: number,
  txHash: string,
  fee: number,
  status: string,
  signer: Array<string>,
  parsedInstruction: [[Object]],
  sol_value: string,
  extra_data: object,
  programIds: Array<string>
}

interface Snipers {
  block_id: number,
  trans_id: string,
  block_time: number,
  activity_type: string,
  from_address: string,
  sources: string[],
  platform: string[],
  amount_info: {
    token1: string,
    token1_decimals: number,
    amount1: number,
    token2: string,
    token2_decimals: number,
    amount2: number,
    routers: []
  },
  value: number
}

export {
  SolscanBlock,
  Snipers
}